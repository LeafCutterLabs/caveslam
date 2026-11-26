// Character select: each player picks a different wrestler (no mirror matches).
import { W, H, CHAR_IDS, CHARACTERS, PLAYER_COLORS } from '../config.js';
import { MenuInput, BODY, TITLE_FONT, background, wrestlerPic } from './common.js';

const STAT_NAMES = ['speed', 'power', 'grapple', 'toughness', 'reach'];

export class SelectScene extends Phaser.Scene {
  constructor() { super('Select'); }
  init(data) { this.practice = !!(data && data.practice); this.cpu = (data && data.cpu) || null; }

  create() {
    const art = this.registry.get('art');
    this.art = art;
    background(this, art, 'screen_select_bg');
    this.add.text(W / 2, 40, this.practice ? 'PRACTICE: PICK YOUR WRESTLERS' : this.cpu ? `1 PLAYER VS CPU (${this.cpu.toUpperCase()})` : 'CHOOSE YOUR WRESTLER', { ...TITLE_FONT, fontFamily: 'Impact, Arial Black, sans-serif', fontSize: '34px', fontStyle: 'bold' }).setOrigin(0.5);
    this.slots = CHAR_IDS.map((cid, i) => {
      const x = W / 2 + (i - 1.5) * 196; const y = 200;
      const fr = art.getAny('ui_select_frame');
      const box = fr ? this.add.image(x, y, fr.key, fr.frame) : this.add.rectangle(x, y, 176, 176, 0x3a2018, 0.85).setStrokeStyle(5, 0x9c4b2d);
      const pic = wrestlerPic(this, art, cid, 'select', x, y + (art.getAny(`${cid}_portrait_select`) ? 0 : 10), 150);
      const name = this.add.text(x, y + 104, CHARACTERS[cid].name, { ...BODY, font: 'bold 16px monospace' }).setOrigin(0.5);
      const lockArt = art.getAny('ui_select_locked');
      const lock = lockArt ? this.add.image(x, y, lockArt.key, lockArt.frame) : this.add.rectangle(x, y, 176, 176, 0x000000, 0.55);
      lock.setVisible(false).setDepth(3);
      const lockText = this.add.text(x, y + 60, '', { ...BODY, font: 'bold 18px monospace' }).setOrigin(0.5).setDepth(3);
      return { cid, x, y, box, pic, name, lock, lockText };
    });
    this.cursors = [0, 1].map((p) => {
      const key = art.getAny(`ui_select_cursor-p${p + 1}`);
      const c = key ? this.add.image(0, 0, key.key, key.frame) : this.add.rectangle(0, 0, 188 - p * 12, 188 - p * 12).setStrokeStyle(5, PLAYER_COLORS[p]);
      c.setDepth(4);
      const tag = this.add.text(0, 0, p && this.cpu ? 'CPU' : `P${p + 1}`, { ...BODY, font: 'bold 18px monospace', color: p ? '#9fe870' : '#ff9a52' }).setOrigin(0.5).setDepth(5);
      return { c, tag };
    });
    this.pos = [0, 3];
    this.locked = [null, null];
    this.info = [0, 1].map((p) => this.add.text(p ? W - 40 : 40, 318, '', { ...BODY, font: '14px monospace', align: p ? 'right' : 'left', wordWrap: { width: 380 } }).setOrigin(p ? 1 : 0, 0));
    this.add.text(W / 2, H - 12, 'move left/right  ·  GRAB or LIGHT to pick  ·  HEAVY to change  ·  Esc back', { ...BODY, font: '12px monospace' }).setOrigin(0.5, 1);
    this.menu = new MenuInput(this);
    if (this.cpu) this.cursors[1].c.setAlpha(0.35);
    this.refresh();
  }

  refresh() {
    this.cursors.forEach((cur, p) => {
      const s = this.slots[this.pos[p]];
      cur.c.setPosition(s.x, s.y);
      cur.tag.setPosition(s.x + (p ? 70 : -70), s.y - 76);
      cur.c.setAlpha(this.locked[p] ? 1 : 0.85);
    });
    this.slots.forEach((s) => {
      const by = this.locked.indexOf(s.cid);
      const taken = by >= 0;
      s.lock.setVisible(taken);
      s.lockText.setText(taken ? `${by && this.cpu ? 'CPU' : `P${by + 1}`} PICKED` : '').setColor(by === 1 ? '#9fe870' : '#ff9a52');
      s.pic.setTint(taken ? 0x777777 : 0xffffff);
    });
    this.info.forEach((t, p) => {
      const cid = this.slots[this.pos[p]].cid; const c = CHARACTERS[cid];
      const pips = STAT_NAMES.map((k) => `${k.padEnd(10)} ${'#'.repeat(c.stats[k])}${'.'.repeat(5 - c.stats[k])}`);
      t.setText([`${p && this.cpu ? 'CPU' : `P${p + 1}`}: ${c.name}${this.locked[p] ? '  (READY)' : ''}`, c.role, '', ...pips].join('\n'));
      t.setColor(this.locked[p] ? '#ffcf5a' : '#f7dab5');
    });
  }

  update() {
    const m = this.menu; m.update();
    if (m.escape()) return this.scene.start('Title');
    if (this.starting) return;
    for (const p of (this.cpu ? [0] : [0, 1])) {
      if (!this.locked[p]) {
        if (m.pressed(p, 'left')) { this.pos[p] = (this.pos[p] + 3) % 4; this.refresh(); }
        if (m.pressed(p, 'right')) { this.pos[p] = (this.pos[p] + 1) % 4; this.refresh(); }
        if (m.confirm(p)) {
          const cid = this.slots[this.pos[p]].cid;
          if (this.locked[1 - p] === cid) { this.cameras.main.shake(100, 0.004); continue; }
          this.locked[p] = cid; this.refresh();
          const s = this.slots[this.pos[p]];
          this.tweens.add({ targets: s.pic, scale: s.pic.scale * 1.1, yoyo: true, duration: 120 });
        }
      } else if (m.back(p)) { this.locked[p] = null; this.refresh(); }
    }
    // the CPU picks a different wrestler once player 1 has locked in
    if (this.cpu && this.locked[0] && !this.locked[1] && !this.cpuPicking) {
      this.cpuPicking = true;
      const options = this.slots.map((s, i) => i).filter((i) => this.slots[i].cid !== this.locked[0]);
      const pick = options[Math.floor(Math.random() * options.length)];
      let hops = 4 + Math.floor(Math.random() * 3);
      const hop = () => {
        if (!this.locked[0]) { this.cpuPicking = false; return; }
        if (hops-- > 0) { this.pos[1] = options[hops % options.length]; this.refresh(); this.time.delayedCall(110, hop); return; }
        this.pos[1] = pick; this.locked[1] = this.slots[pick].cid; this.cursors[1].c.setAlpha(1); this.refresh();
      };
      hop();
    }
    if (this.cpu && !this.locked[0] && this.locked[1]) { this.locked[1] = null; this.refresh(); }
    if (this.locked[0] && this.locked[1]) {
      this.starting = true;
      this.time.delayedCall(700, () => {
        const data = { p1: this.locked[0], p2: this.locked[1], practice: this.practice, cpu: this.cpu };
        this.scene.start(this.practice ? 'Fight' : 'Vs', data);
      });
    }
  }
}
