// Frame inspector: step through every drawn frame of a wrestler, one key press
// at a time, with size guides and automatic checks against the spec
// (feet on row 180, in-game height, nothing cropped off the 192x192 cell).
import { W, H, CHAR_IDS, CHARACTERS, BASE_ANIMS, GRAB_ANIMS, GENERIC_THROWS, SIG_THROWS, THROWN_POSES, EXTRA_ANIMS } from '../config.js';
import { charFrame, baseCount } from '../assets.js';

const pad = (n) => String(n).padStart(2, '0');
const TXT = { font: '12px monospace', color: '#f7dab5', stroke: '#1a0a05', strokeThickness: 3 };
const FEET_ROW = 180;

// Animations where the feet are expected to be off the baseline.
const AIRBORNE = new Set(['base:jump:2', 'base:jump:3', 'base:jump:4', 'base:strike-air', 'base:wall-jump',
  'base:stalactite-hang', 'base:knockdown:1', 'base:knockdown:2', 'throw:stalactite-drop', 'thrown:lifted',
  'thrown:upside-down', 'thrown:overhead', 'thrown:suplex-arc', 'thrown:spin', 'thrown:tail-wrapped', 'thrown:squeezed']);
// Animations where the full standing height should match the spec.
const STANDING = new Set(['idle', 'walk-fwd', 'walk-back', 'block', 'strike-light', 'hit-high', 'win', 'oil-apply',
  'lockup', 'grab-behind', 'hold-struggle', 'slip']);

export class InspectScene extends Phaser.Scene {
  constructor() { super('Inspect'); }

  init(data) { this.cid = (data && data.cid) || 'goblin'; this.returnTo = (data && data.returnTo) || 'Title'; }

  create() {
    this.art = this.registry.get('art');
    this.hitboxes = this.cache.json.get(`json:${this.cid}_hitboxes`) || {};
    this.zoom = 2; this.ghost = true; this.playing = false; this.playT = 0;
    this.buildList();
    this.pos = 0;

    this.add.rectangle(0, 0, W, H, 0x22140e).setOrigin(0);
    this.g = this.add.graphics().setDepth(5);
    this.ghostImg = this.add.image(0, 0, '__DEFAULT').setOrigin(0.5, 1).setAlpha(0.28).setTint(0x88ccff).setDepth(1);
    this.img = this.add.image(0, 0, '__DEFAULT').setOrigin(0.5, 1).setDepth(2);
    this.info = this.add.text(560, 120, '', TXT).setDepth(10);
    this.title = this.add.text(560, 92, '', { ...TXT, font: 'bold 16px monospace', color: '#ffd27a' }).setDepth(10);
    this.help = this.add.text(10, H - 6, [
      'Right/Left or ]/[  next/prev frame (runs through every animation)    Down/Up  next/prev animation',
      'Space play/pause   F next flagged frame   G idle ghost   Z zoom   C change wrestler   I or Esc back',
    ].join('\n'), { ...TXT, font: '12px monospace' }).setOrigin(0, 1).setDepth(10);
    this.strip = this.add.container(0, 0).setDepth(6);

    const kb = this.input.keyboard;
    const on = (keys, fn) => keys.forEach((k) => kb.on(`keydown-${k}`, fn));
    on(['RIGHT', 'D', 'CLOSED_BRACKET'], () => this.step(1));
    on(['LEFT', 'A', 'OPEN_BRACKET'], () => this.step(-1));
    on(['DOWN', 'S', 'PAGE_DOWN'], () => this.stepAnim(1));
    on(['UP', 'W', 'PAGE_UP'], () => this.stepAnim(-1));
    on(['SPACE'], () => { this.playing = !this.playing; this.playT = 0; this.show(); });
    on(['F'], () => this.nextFlagged());
    on(['G'], () => { this.ghost = !this.ghost; this.show(); });
    on(['Z'], () => { this.zoom = this.zoom === 2 ? 1 : 2; this.show(); });
    on(['C'], () => this.scene.restart({ cid: CHAR_IDS[(CHAR_IDS.indexOf(this.cid) + 1) % CHAR_IDS.length], returnTo: this.returnTo }));
    on(['I', 'ESC'], () => { this.scene.stop(); this.scene.resume(this.returnTo); });
    this.show();
  }

  // One entry per drawn frame, in spec order.
  buildList() {
    const cid = this.cid;
    // base animations use as many frames as exist on disk (smooth-movement pass),
    // and the new movement animations are listed even before their art exists
    const base = {};
    for (const [a, d] of Object.entries(BASE_ANIMS)) { const c = baseCount(this.art, cid, a, d, (k, x) => x); base[a] = { frames: c.n, fps: c.fps }; }
    for (const [a, d] of Object.entries(EXTRA_ANIMS)) {
      const real = this.art.seq(`${cid}_base_${a}`, 24).length;
      base[a] = { frames: Math.max(real, d.frames), fps: d.fps, extra: true };
    }
    const groups = [
      ['base', base], ['grab', GRAB_ANIMS],
      ['throw', Object.fromEntries(Object.entries({ ...GENERIC_THROWS, ...SIG_THROWS[cid] }).map(([k, n]) => [k, { frames: n, fps: 10 }]))],
      ['thrown', Object.fromEntries(THROWN_POSES.map((p) => [p, { frames: 1, fps: 2 }]))],
    ];
    this.list = []; this.animStarts = [];
    for (const [cat, defs] of groups) {
      for (const [action, d] of Object.entries(defs)) {
        const start = this.list.length;
        for (let i = 1; i <= d.frames; i++) {
          const ref = charFrame(this, this.art, cid, cat, action, i, d.frames);
          const e = { cat, action, i, n: d.frames, fps: d.fps || 10, ref, name: `${cid}_${cat}_${action}_${pad(i)}`, animStart: start };
          e.m = this.measure(e);
          this.list.push(e);
        }
        this.animStarts.push(start);
      }
    }
    this.flagged = this.list.filter((e) => e.m.flags.length).length;
  }

  // Alpha bounds of the frame in 192x192 cell pixels, plus spec checks.
  measure(e) {
    const tex = this.textures.get(e.ref.key);
    const fr = tex.get(e.ref.frame);
    const placeholder = e.ref.key.startsWith('ph:');
    const cw = fr.realWidth || fr.width; const ch = fr.realHeight || fr.height;
    const c = document.createElement('canvas'); c.width = cw; c.height = ch;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    const ox = fr.data && fr.data.spriteSourceSize ? fr.data.spriteSourceSize.x : 0;
    const oy = fr.data && fr.data.spriteSourceSize ? fr.data.spriteSourceSize.y : 0;
    ctx.drawImage(fr.source.image, fr.cutX, fr.cutY, fr.cutWidth, fr.cutHeight, ox, oy, fr.cutWidth, fr.cutHeight);
    const px = ctx.getImageData(0, 0, cw, ch).data;
    let x0 = cw, y0 = ch, x1 = -1, y1 = -1;
    for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
      if (px[(y * cw + x) * 4 + 3] > 24) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    const empty = x1 < 0;
    const box = empty ? null : { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
    const flags = [];
    if (!placeholder) {
      if (cw !== 192 || ch !== 192) flags.push(`cell is ${cw}x${ch}, spec says 192x192`);
      if (empty) flags.push('frame is empty');
      else {
        if (x0 <= 0 || y0 <= 0 || x1 >= cw - 1 || y1 >= ch - 1) flags.push('touches the cell edge (may be cropped)');
        const air = AIRBORNE.has(`${e.cat}:${e.action}`) || (e.action === 'jump' && e.i > 1 && e.i < e.n) || (e.action === 'knockdown' && e.i <= 2);
        if (!air && Math.abs(y1 + 1 - FEET_ROW) > 3) flags.push(`feet at row ${y1 + 1}, spec says ${FEET_ROW}`);
        const want = CHARACTERS[this.cid].height;
        const got = FEET_ROW - y0;
        if (STANDING.has(e.action) && Math.abs(got - want) / want > 0.12) flags.push(`standing height ${got}px, spec says ~${want}px`);
      }
    }
    return { cw, ch, box, flags, placeholder };
  }

  step(d) { this.playing = false; this.pos = (this.pos + d + this.list.length) % this.list.length; this.show(); }

  stepAnim(d) {
    this.playing = false;
    const cur = this.animStarts.indexOf(this.list[this.pos].animStart);
    this.pos = this.animStarts[(cur + d + this.animStarts.length) % this.animStarts.length];
    this.show();
  }

  nextFlagged() {
    for (let k = 1; k <= this.list.length; k++) {
      const p = (this.pos + k) % this.list.length;
      if (this.list[p].m.flags.length) { this.pos = p; this.playing = false; this.show(); return; }
    }
  }

  show() {
    const e = this.list[this.pos];
    const z = this.zoom;
    const feetY = z === 2 ? 470 : 440;
    const cx = 280;
    this.img.setTexture(e.ref.key, e.ref.frame).setScale(z).setPosition(cx, feetY + (192 - FEET_ROW) * z);
    const idle = this.list[0];
    this.ghostImg.setTexture(idle.ref.key, idle.ref.frame).setScale(z).setPosition(cx, feetY + (192 - FEET_ROW) * z).setVisible(this.ghost && this.pos !== 0);

    // guides
    const g = this.g; g.clear();
    const left = cx - 96 * z; const top = feetY - FEET_ROW * z;
    g.lineStyle(1, 0xffff66, 0.7).strokeRect(left, top, 192 * z, 192 * z);                 // 192 cell
    g.lineStyle(2, 0x33e0ff, 0.9).lineBetween(left - 30, feetY, left + 192 * z + 30, feetY); // feet row 180
    const want = CHARACTERS[this.cid].height;
    g.lineStyle(2, 0x66ff66, 0.9).lineBetween(left - 30, feetY - want * z, left + 192 * z + 30, feetY - want * z); // spec height
    const m = e.m;
    if (m.box) g.lineStyle(1, 0xff66ff, 0.9).strokeRect(left + m.box.x * z, top + m.box.y * z, m.box.w * z, m.box.h * z);
    const hb = this.hitboxes[e.name] || {};
    const rect = (r, col) => { if (r) g.lineStyle(2, col, 0.9).strokeRect(left + r.x * z, top + r.y * z, r.w * z, r.h * z); };
    rect(hb.hurtbox, 0x4f8cff); rect(hb.hitbox, 0xff3b30); rect(hb.grabBox, 0xff9f0a);
    if (hb.attach) g.fillStyle(0xffffff, 1).fillCircle(left + hb.attach.x * z, top + hb.attach.y * z, 4);

    // text
    const src = m.placeholder ? 'PLACEHOLDER (no art yet)' : e.ref.frame ? `atlas ${e.ref.key.replace('atlas:', '')}` : 'single file';
    const animNo = this.animStarts.indexOf(e.animStart) + 1;
    this.title.setText(`${CHARACTERS[this.cid].name}  ${e.cat} / ${e.action}`);
    const lines = [
      `frame ${e.i} of ${e.n}        animation ${animNo}/${this.animStarts.length}`,
      `${e.name}`,
      `source: ${src}`,
      '',
      `cell size:     ${m.cw} x ${m.ch}`,
      m.box ? `content box:   x ${m.box.x}  y ${m.box.y}  w ${m.box.w}  h ${m.box.h}` : 'content box:   (empty)',
      m.box ? `feet row:      ${m.box.y + m.box.h}   (spec 180)` : '',
      m.box ? `height:        ${FEET_ROW - m.box.y}px above feet line   (spec ~${want})` : '',
      '',
      m.placeholder ? '' : m.flags.length ? `WORTH A LOOK:\n - ${m.flags.join('\n - ')}` : 'checks: OK',
      '',
      `${this.flagged} of ${this.list.filter((x) => !x.m.placeholder).length} frames flagged (F = next)`,
      this.playing ? 'PLAYING (Space to pause)' : '',
      '',
      'yellow: 192 cell     cyan: feet row 180',
      'green: spec height   pink: content box',
      'faint blue: idle 01 ghost for size compare',
      'hitboxes: blue hurt, red hit, orange grab',
    ];
    this.info.setText(lines.join('\n'));
    this.info.setColor(m.flags.length ? '#ffd0c0' : '#f7dab5');
    this.drawStrip(e);
  }

  drawStrip(e) {
    this.strip.removeAll(true);
    const n = e.n; const s = 0.42; const size = 192 * s;
    const total = n * (size + 6);
    let x = Math.max(10, (W - total) / 2);
    for (let i = 0; i < n; i++) {
      const fe = this.list[e.animStart + i];
      const cur = fe === e;
      const bg = this.add.rectangle(x, 8, size, size, cur ? 0x6a3a1c : 0x3a2018).setOrigin(0).setStrokeStyle(cur ? 3 : 1, fe.m.flags.length ? 0xff5040 : cur ? 0xffd27a : 0x7a5030);
      const im = this.add.image(x, 8, fe.ref.key, fe.ref.frame).setOrigin(0).setScale(s).setAlpha(fe.m.placeholder ? 0.5 : 1);
      this.strip.add([bg, im]);
      x += size + 6;
    }
  }

  update(time, deltaMs) {
    if (!this.playing) return;
    const e = this.list[this.pos];
    this.playT += deltaMs / 1000;
    if (this.playT >= 1 / e.fps) {
      this.playT = 0;
      this.pos = e.animStart + (e.i % e.n);
      this.show();
    }
  }
}
