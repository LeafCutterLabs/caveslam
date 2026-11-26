// Asset discovery, loading, placeholders and animation building.
//
// The art in ../assets is still being generated, so nothing here assumes a file
// exists. At boot the game asks the local server for a list of every file under
// assets/ (serve.ps1 / serve.py provide /__assets.json). If that list is not
// available it falls back to trying every file name from the spec. Any frame
// that is missing is replaced by a drawn placeholder, so new art shows up on the
// next page reload with no code change.

import {
  ASSET_ROOT, CHAR_IDS, CHARACTERS, BASE_ANIMS, GRAB_ANIMS, GENERIC_THROWS, SIG_THROWS,
  THROWN_POSES, PORTRAITS, STAGE_FILES, FX_FILES, UI_FILES, SMOOTH, EXTRA_ANIMS,
} from './config.js';

const pad = (n) => String(n).padStart(2, '0');

// ---------- the full list of files the spec asks for ----------
export function expectedFiles() {
  const out = [];
  const add = (dir, name) => out.push({ key: name, path: `${dir}/${name}.png` });
  for (const c of CHAR_IDS) {
    const d = `characters/${c}`;
    for (const [a, def] of Object.entries(BASE_ANIMS))
      for (let i = 1; i <= def.frames; i++) add(`${d}/base`, `${c}_base_${a}_${pad(i)}`);
    for (const [a, def] of Object.entries(GRAB_ANIMS))
      for (let i = 1; i <= def.frames; i++) add(`${d}/grab`, `${c}_grab_${a}_${pad(i)}`);
    const throws = { ...GENERIC_THROWS, ...SIG_THROWS[c] };
    for (const [a, n] of Object.entries(throws))
      for (let i = 1; i <= n; i++) add(`${d}/throw`, `${c}_throw_${a}_${pad(i)}`);
    for (const p of THROWN_POSES) add(`${d}/thrown`, `${c}_thrown_${p}_01`);
    for (const p of Object.keys(PORTRAITS)) add(`${d}/portrait`, `${c}_portrait_${p}_01`);
  }
  const addGroup = (dir, list) => {
    for (const [name, n] of list) {
      if (n === 0) add(dir, name);
      else for (let i = 1; i <= n; i++) add(dir, `${name}_${pad(i)}`);
    }
  };
  addGroup('stage/cave', STAGE_FILES.filter(([n]) => !n.startsWith('screen_') && !n.startsWith('stage_item')));
  addGroup('stage', STAGE_FILES.filter(([n]) => n.startsWith('screen_') || n.startsWith('stage_item')));
  addGroup('fx', FX_FILES);
  addGroup('ui', UI_FILES);
  return out;
}

// ---------- discovery ----------
export async function discoverAssets() {
  // /__assets.json comes from the local dev server; assets-list.json is a
  // static copy written at deploy time for hosts like GitHub Pages.
  for (const url of ['/__assets.json', 'assets-list.json']) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list)) return { mode: 'listing', files: list };
      }
    } catch (e) { /* no listing here */ }
  }
  return { mode: 'probe', files: null };
}

// Queue loads on a Phaser loader. Returns info about what was queued.
export function queueAssets(load, discovery) {
  const info = { mode: discovery.mode, atlases: [], json: [], images: 0, expected: expectedFiles().length };
  load.setPath(ASSET_ROOT);
  if (discovery.mode === 'listing') {
    const files = discovery.files.map((f) => f.replace(/\\/g, '/'));
    const set = new Set(files);
    const seen = new Set();
    for (const f of files) {
      if (f.includes('/study/') || f.startsWith('study/')) continue;
      const base = f.slice(f.lastIndexOf('/') + 1);
      const m = base.match(/^(.*)\.(png|webp|json)$/i);
      if (!m) continue;
      const name = m[1]; const ext = m[2].toLowerCase();
      if (ext === 'json') {
        if (/_atlas(-\d+)?$/.test(name)) {
          const dir = f.slice(0, f.length - base.length);
          const img = set.has(`${dir}${name}.webp`) ? `${dir}${name}.webp` : `${dir}${name}.png`;
          if (set.has(img)) { load.atlas(`atlas:${name}`, img, f); info.atlases.push(`atlas:${name}`); }
        } else {
          load.json(`json:${name}`, f); info.json.push(name);
        }
        continue;
      }
      if (/_atlas(-\d+)?$/.test(name)) continue;  // atlas images load with their json
      if (seen.has(name)) continue;
      // prefer png when both png and webp of a single frame exist
      if (ext === 'webp' && set.has(f.replace(/\.webp$/i, '.png'))) continue;
      seen.add(name);
      load.image(name, f);
      info.images++;
    }
  } else {
    // No listing: try every file name from the spec, plus atlases and json.
    // Missing files just raise a loader error, which we ignore.
    for (const { key, path } of expectedFiles()) { load.image(key, path); }
    for (const c of CHAR_IDS) {
      for (const page of [0, 1]) {
        const name = `${c}_atlas-${page}`;
        const path = `characters/${c}/${name}`;
        load.atlas(`atlas:${name}`, `${path}.png`, `${path}.json`);
        info.atlases.push(`atlas:${name}`);
      }
      load.json(`json:${c}_anims`, `characters/${c}/${c}_anims.json`);
      load.json(`json:${c}_hitboxes`, `characters/${c}/${c}_hitboxes.json`);
    }
    for (const a of ['stage/cave/stage_cave_atlas', 'fx/fx_atlas', 'ui/ui_atlas']) {
      const n = a.slice(a.lastIndexOf('/') + 1);
      load.atlas(`atlas:${n}`, `${a}.png`, `${a}.json`);
    }
  }
  load.setPath('');
  return info;
}

// ---------- frame lookup ----------
// Maps a frame name (file name without extension) to {key, frame}.
export class ArtIndex {
  constructor(scene) {
    this.scene = scene;
    this.atlasFrames = new Map();
    for (const key of scene.textures.getTextureKeys()) {
      if (!key.startsWith('atlas:')) continue;
      const tex = scene.textures.get(key);
      for (const fname of tex.getFrameNames()) {
        const clean = fname.replace(/\.(png|webp)$/i, '');
        if (!this.atlasFrames.has(clean)) this.atlasFrames.set(clean, { key, frame: fname });
      }
    }
    this.realCount = 0;
  }
  has(name) {
    return this.scene.textures.exists(name) || this.atlasFrames.has(name);
  }
  get(name) {
    if (this.scene.textures.exists(name)) return { key: name };
    return this.atlasFrames.get(name) || null;
  }
  // a single-file asset that may or may not have a _01 suffix
  getAny(name) { return this.get(name) || this.get(`${name}_01`); }
  // frames name_01..name_NN that exist (stops at first gap)
  seq(name, max = 12) {
    const out = [];
    for (let i = 1; i <= max; i++) {
      const f = this.get(`${name}_${pad(i)}`);
      if (!f) break;
      out.push(f);
    }
    return out;
  }
  countExpected() {
    let have = 0;
    const missing = {};
    for (const { key } of expectedFiles()) {
      if (this.has(key)) have++;
      else {
        const grp = key.split('_')[0];
        missing[grp] = (missing[grp] || 0) + 1;
      }
    }
    return { have, total: expectedFiles().length, missing };
  }
}

// ---------- placeholder character frames ----------
// A simple cartoon figure in the character's palette, posed per action, so the
// game is playable and readable before the real frames exist.

const OUTLINE = '#3a2018';
const hex = (n) => '#' + n.toString(16).padStart(6, '0');

function poseFor(action, i, n) {
  const t = n > 1 ? (i - 1) / (n - 1) : 0;    // 0..1 through the animation
  const alt = i % 2 === 0;
  const P = { rot: 0, lean: 0, crouch: 0, armF: 65, armB: 55, legF: 10, legB: -10, lift: 0, ball: false, xEyes: false, mouth: false };
  const s = (o) => Object.assign(P, o);
  switch (action) {
    case 'idle': s({ lift: alt ? 3 : 0, armF: 70 }); break;
    case 'walk-fwd': { const ph = [[25, -20], [5, -5], [-20, 25], [-5, 5], [25, -15], [5, -5]][(i - 1) % 6]; s({ legF: ph[0], legB: ph[1], armF: 70 + ph[1] * 0.6, armB: 60 + ph[0] * 0.6 }); break; }
    case 'crouch': s({ crouch: i === 1 ? 0.25 : 0.42, lean: 18, armF: 85, armB: 75, legF: 35, legB: -25 }); break;
    case 'jump': s([{ crouch: 0.25 }, { legF: 50, legB: 20, armF: 140 }, { ball: true }, { legF: 15, legB: -10, armF: 120 }, { crouch: 0.25 }][i - 1] || {}); break;
    case 'block': s({ armF: 150, armB: 140, lean: -5 }); break;
    case 'strike-light': s(i === 2 ? { armF: 95, lean: 12 } : i === 1 ? { armF: 160, armB: 40 } : {}); break;
    case 'strike-heavy': s([{ armF: 20, armB: 120, lean: -12 }, { lean: 18, armF: 70 }, { lean: 28, armF: 100, armB: 100, legF: 35 }, { lean: 20, armF: 110, legF: 25 }, {}][i - 1] || {}); break;
    case 'strike-low': s(i === 1 ? { crouch: 0.35, lean: 20 } : i === 4 ? { crouch: 0.25 } : { crouch: 0.4, lean: 25, legF: 85, armF: 30, armB: 30 }); break;
    case 'strike-air': s(i === 2 ? { legF: 95, legB: 80, lean: -25, armF: 150, armB: 150 } : { legF: 50, legB: 30 }); break;
    case 'hit-high': s({ lean: i === 1 ? -22 : -12, armF: 30, armB: -20, legF: 20, legB: -25 }); break;
    case 'knockdown': s({ rot: [-25, -55, -90, -85][i - 1] || -90, lift: [40, 25, 0, 6][i - 1] || 0, armF: 160, armB: 140 }); break;
    case 'lying-up': case 'slam-impact': case 'pinned': s({ rot: -90, armF: action === 'pinned' ? 150 : 40, armB: 20 }); break;
    case 'pinned-struggle': s({ rot: -90, armF: 160, legF: 45, legB: -30 }); break;
    case 'kick-out': s({ rot: -60, armF: 170, armB: 150, lift: 10 }); break;
    case 'lying-down': s({ rot: 90, armF: 120, armB: 120 }); break;
    case 'ko': s({ rot: -90, xEyes: true, armF: 160, armB: 10 }); break;
    case 'wall-bounce': s({ lean: -25, armF: 150, armB: 160, legF: 25, legB: -15 }); break;
    case 'wall-jump': s({ legF: -60, legB: 30, armF: 120, lean: 10 }); break;
    case 'stalactite-hang': s({ armF: 178, armB: 175, legF: alt ? 25 : -10, legB: alt ? 5 : -25 }); break;
    case 'win': s({ armF: alt ? 175 : 150, armB: alt ? 150 : 175, mouth: true }); break;
    case 'oil-apply': s([{ armF: 95 }, { armF: 175, armB: 160 }, { armF: 60, armB: 30, lean: 5 }, { armF: 150, armB: 150, mouth: true }][i - 1] || {}); break;
    case 'lockup': s({ armF: 95 - t * 5, armB: 85, lean: 8 + t * 12, legF: 25, legB: -25 }); break;
    case 'grab-behind': s({ armF: 90, armB: 90, lean: 10 + t * 8 }); break;
    case 'grab-ground': s({ lean: 55 - t * 45, armF: 30 + t * 40, armB: 30 + t * 40, crouch: 0.2 * (1 - t) }); break;
    case 'hold-struggle': s({ armF: 100, armB: 95, lean: alt ? 14 : 8, mouth: true }); break;
    case 'pin': case 'pin-hold': s({ rot: 90, lift: 26, armF: 100, armB: 90, mouth: action === 'pin-hold' }); break;
    case 'reversal': s([{ lean: -15, armF: 150 }, { crouch: 0.3, lean: 40 }, { lean: 10, rot: 0, armF: 90 }, { armF: 95, armB: 95, lean: 12 }][i - 1] || {}); break;
    case 'slip': s(i === 1 ? { armF: 120, armB: 110, lean: -10, mouth: true } : { lean: 35, armF: 90, armB: 70, legF: 40, legB: -30 }); break;
    // thrown poses (victim drawn alone)
    case 'lifted': s({ legF: 25, legB: -20, armF: 150, armB: 20, mouth: true }); break;
    case 'upside-down': s({ rot: 180, armF: 30, armB: 10 }); break;
    case 'overhead': s({ rot: -90, armF: 10, armB: -10 }); break;
    case 'suplex-arc': s({ rot: -135, armF: 160, armB: 150 }); break;
    case 'headlock-bent': s({ lean: 70, armF: 10, armB: -10 }); break;
    case 'tail-wrapped': case 'squeezed': s({ armF: 5, armB: -5, mouth: true }); break;
    case 'spin': s({ ball: true }); break;
    case 'throw:boulder-roll': s(i === 2 ? { ball: true } : i === 1 ? { crouch: 0.4, lean: 40 } : { armF: 90, armB: 85, lean: 15 }); break;
    case 'throw:stalactite-drop': s([{ armF: 178, armB: 175 }, { armF: 160, armB: 150, lean: -30 }, { ball: true }, { rot: 90, armF: 90, armB: 90, lift: 10 }, { rot: 90, armF: 100, armB: 100, lift: 22 }][i - 1] || {}); break;
    default:
      // throw animations: arms progress from forward to overhead and down again
      if (action.startsWith('throw:')) {
        const arc = Math.sin(t * Math.PI);
        s({ armF: 90 + arc * 85, armB: 85 + arc * 80, lean: 10 + t * 25 - arc * 25, crouch: t > 0.8 ? 0.25 : 0 });
      }
  }
  return P;
}

function drawFigure(ctx, cid, action, i, n, label) {
  const ch = CHARACTERS[cid];
  const pal = ch.palette;
  const h = ch.height;
  const P = poseFor(action, i, n);
  const isDwarf = cid === 'dwarf';
  const torsoW = h * (isDwarf ? 0.5 : cid === 'lizard' ? 0.3 : cid === 'mole' ? 0.34 : 0.26);
  const headR = h * (isDwarf ? 0.15 : cid === 'goblin' ? 0.13 : 0.1);
  const legLen = h * (isDwarf ? 0.3 : 0.42) * (1 - P.crouch);
  const torsoLen = h - legLen / (1 - P.crouch || 1) * (1 - P.crouch) - headR * 2 - h * P.crouch * 0.2;
  const limbW = Math.max(9, h * (isDwarf ? 0.12 : 0.08));
  const armLen = h * (isDwarf ? 0.34 : cid === 'goblin' ? 0.4 : 0.36);

  ctx.save();
  ctx.clearRect(0, 0, 192, 192);
  // whole-body rotation (lying, inverted...) around the body's middle
  const cx = 96; const feetY = 180;
  const midY = feetY - h / 2;
  const rad = (P.rot * Math.PI) / 180;
  const shift = Math.abs(Math.sin(rad)) * (h / 2 - torsoW / 2) - P.lift;
  ctx.translate(cx, midY + shift);
  ctx.rotate(rad);
  ctx.translate(-cx, -midY);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';

  const stroke = (w, col) => { ctx.lineWidth = w + 6; ctx.strokeStyle = OUTLINE; ctx.stroke(); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.stroke(); };
  const limb = (x0, y0, ang, len, w, col) => {
    const a = (ang * Math.PI) / 180;
    const x1 = x0 + Math.sin(a) * len; const y1 = y0 + Math.cos(a) * len;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); stroke(w, col);
    return [x1, y1];
  };

  if (P.ball) {
    const r = h * 0.3;
    ctx.beginPath(); ctx.arc(cx, feetY - r - 10, r, 0, Math.PI * 2);
    ctx.fillStyle = hex(cid === 'mole' ? pal.hair : pal.skin); ctx.fill();
    ctx.lineWidth = 5; ctx.strokeStyle = OUTLINE; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx + r * 0.45, feetY - r - 18, r * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = '#fff'; ctx.fill();
    ctx.restore();
    return;
  }

  const hipY = feetY - legLen;
  const leanRad = (P.lean * Math.PI) / 180;
  // legs
  const legCol = hex(isDwarf ? pal.cloth : pal.skin);
  if (cid === 'lizard') { // tail
    ctx.beginPath(); ctx.moveTo(cx - 8, hipY); ctx.quadraticCurveTo(cx - 60, hipY + 10, cx - 80, feetY - 4);
    stroke(14, hex(pal.skin));
  }
  limb(cx - 6, hipY, -P.legB, legLen, limbW + 2, legCol);
  limb(cx + 6, hipY, P.legF, legLen, limbW + 2, legCol);

  // torso, leaning around the hip
  ctx.save();
  ctx.translate(cx, hipY); ctx.rotate(leanRad); ctx.translate(-cx, -hipY);
  const topY = hipY - torsoLen;
  // back arm (behind torso)
  const shY = topY + torsoLen * 0.15;
  limb(cx - torsoW * 0.2, shY, P.armB, armLen, limbW, hex(pal.skin));
  // torso shape
  ctx.beginPath();
  ctx.ellipse(cx, (topY + hipY) / 2, torsoW / 2, torsoLen / 2 + 4, 0, 0, Math.PI * 2);
  ctx.fillStyle = hex(pal.skin); ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = OUTLINE; ctx.stroke();
  if (cid === 'lizard') { // belly
    ctx.beginPath(); ctx.ellipse(cx + torsoW * 0.18, (topY + hipY) / 2, torsoW / 4, torsoLen / 2.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = hex(pal.light); ctx.fill();
  }
  // trunks / loincloth + belt
  ctx.fillStyle = hex(pal.cloth);
  ctx.fillRect(cx - torsoW / 2, hipY - 14, torsoW, 18);
  ctx.strokeRect(cx - torsoW / 2, hipY - 14, torsoW, 18);
  ctx.beginPath(); ctx.arc(cx + 4, hipY - 12, 5, 0, Math.PI * 2); ctx.fillStyle = '#eea038'; ctx.fill(); ctx.stroke();

  // head
  const hx = cx + torsoW * 0.1; const hy = topY - headR + 6;
  if (cid === 'goblin') { // ears
    ctx.beginPath(); ctx.moveTo(hx - 4, hy - 4); ctx.lineTo(hx - headR * 2.2, hy - headR * 1.1); ctx.lineTo(hx - 2, hy + 6); ctx.closePath();
    ctx.fillStyle = hex(pal.skin); ctx.fill(); ctx.stroke();
  }
  if (cid === 'lizard' || cid === 'mole' || cid === 'goblin' || isDwarf) { // crest / fur / hair
    ctx.beginPath();
    for (let k = 0; k < 4; k++) { const a = Math.PI * (1.05 + k * 0.22); ctx.moveTo(hx + Math.cos(a) * headR, hy + Math.sin(a) * headR); ctx.lineTo(hx + Math.cos(a) * headR * 1.6, hy + Math.sin(a) * headR * 1.6); }
    ctx.lineWidth = 7; ctx.strokeStyle = hex(pal.hair); ctx.stroke();
  }
  ctx.beginPath(); ctx.arc(hx, hy, headR, 0, Math.PI * 2);
  ctx.fillStyle = hex(pal.skin); ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = OUTLINE; ctx.stroke();
  if (isDwarf) { // beard
    ctx.beginPath(); ctx.moveTo(hx - headR * 0.6, hy + 2); ctx.quadraticCurveTo(hx + headR * 0.4, hy + headR * 2.3, hx + headR * 1.0, hy + 2); ctx.closePath();
    ctx.fillStyle = hex(pal.accent); ctx.fill(); ctx.stroke();
  }
  // snout / nose
  if (cid === 'mole' || cid === 'goblin' || cid === 'lizard') {
    ctx.beginPath(); ctx.ellipse(hx + headR * 1.05, hy + 3, headR * (cid === 'lizard' ? 0.7 : 0.55), headR * 0.28, 0.15, 0, Math.PI * 2);
    ctx.fillStyle = hex(cid === 'mole' ? 0xdd7d68 : cid === 'goblin' ? pal.accent : pal.skin); ctx.fill(); ctx.stroke();
  }
  // eye
  if (P.xEyes) {
    ctx.beginPath(); ctx.moveTo(hx + 2, hy - 8); ctx.lineTo(hx + 10, hy); ctx.moveTo(hx + 10, hy - 8); ctx.lineTo(hx + 2, hy);
    ctx.lineWidth = 3; ctx.strokeStyle = OUTLINE; ctx.stroke();
  } else {
    ctx.beginPath(); ctx.arc(hx + headR * 0.45, hy - headR * 0.25, 3.2, 0, Math.PI * 2);
    ctx.fillStyle = cid === 'goblin' ? '#c8261e' : OUTLINE; ctx.fill();
  }
  if (P.mouth) { ctx.beginPath(); ctx.arc(hx + headR * 0.55, hy + headR * 0.5, 4, 0, Math.PI * 2); ctx.fillStyle = OUTLINE; ctx.fill(); }
  // front arm
  const [fx, fy] = limb(cx + torsoW * 0.2, shY, P.armF, armLen, limbW, hex(pal.skin));
  ctx.beginPath(); ctx.arc(fx, fy, limbW * 0.75, 0, Math.PI * 2);
  ctx.fillStyle = hex(cid === 'mole' ? 0xf7dab5 : pal.skin); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = OUTLINE; ctx.stroke();
  ctx.restore();
  ctx.restore();

  // small tag so missing frames are easy to spot while testing
  if (label) {
    ctx.font = 'bold 10px monospace'; ctx.fillStyle = 'rgba(255,240,200,0.55)';
    ctx.textAlign = 'center'; ctx.fillText(label, 96, 12);
  }
}

// Returns {key, frame?} for a character frame, making a placeholder if needed.
export function charFrame(scene, art, cid, cat, action, i, n) {
  const name = `${cid}_${cat}_${action}_${pad(i)}`;
  const real = art.get(name) || (n === 1 ? art.get(`${cid}_${cat}_${action}`) : null);
  if (real) return real;
  const key = `ph:${name}`;
  if (!scene.textures.exists(key)) {
    const tex = scene.textures.createCanvas(key, 192, 192);
    const poseName = cat === 'throw' ? `throw:${action}` : action;
    drawFigure(tex.getContext(), cid, poseName, i, n, scene.game.registry.get('showLabels') ? `${action} ${i}` : '');
    tex.refresh();
  }
  return { key };
}

// ---------- procedural fx placeholders ----------
function drawFx(ctx, name, w, h, i, n) {
  const t = n > 1 ? (i - 1) / (n - 1) : 0;
  ctx.clearRect(0, 0, w, h);
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const cx = w / 2; const cy = h / 2;
  const star = (r, spikes, fill) => {
    ctx.beginPath();
    for (let k = 0; k < spikes * 2; k++) {
      const rr = k % 2 ? r * 0.45 : r; const a = (k / (spikes * 2)) * Math.PI * 2 + t;
      ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
    }
    ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = OUTLINE; ctx.stroke();
  };
  const puff = (x, y, r, col) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = OUTLINE; ctx.stroke(); };
  if (name.includes('hit-light')) { star(w * 0.42 * (0.6 + t * 0.4), 7, '#fbd997'); star(w * 0.2, 7, '#ffffff'); }
  else if (name.includes('hit-heavy')) { star(w * 0.46 * (0.6 + t * 0.4), 9, '#df7f42'); star(w * 0.24, 9, '#f7dab5'); }
  else if (name.includes('dust') || name.includes('burrow') || name.includes('rock-shatter')) {
    ctx.globalAlpha = 1 - t * 0.6;
    for (let k = 0; k < 5; k++) puff(cx + (k - 2) * w * 0.16 * (1 + t), h * 0.65 - (k % 2) * h * 0.12, h * (0.16 + t * 0.12), k % 2 ? '#9c4b2d' : '#b8784a');
    if (name.includes('rock')) for (let k = 0; k < 5; k++) { ctx.fillStyle = '#633424'; ctx.fillRect(cx + Math.cos(k * 1.3) * w * 0.4 * t, cy + Math.sin(k * 1.3) * h * 0.4 * t - 10, 10, 10); }
  } else if (name.includes('dirt-spray') || name.includes('debris')) {
    for (let k = 0; k < 7; k++) puff(cx + Math.cos(k) * w * 0.35 * (0.3 + t), cy - Math.abs(Math.sin(k * 2)) * h * 0.4 * (0.3 + t) + h * 0.2, w * 0.06, '#7a4a2a');
  } else if (name.includes('dizzy')) {
    for (let k = 0; k < 3; k++) { const a = (k / 3) * Math.PI * 2 + t * Math.PI; const x = cx + Math.cos(a) * w * 0.35; const y = cy + Math.sin(a) * h * 0.3;
      ctx.beginPath(); ctx.moveTo(x - 9, y - 3); ctx.lineTo(x, y + 2); ctx.lineTo(x + 9, y - 3); ctx.lineWidth = 4; ctx.strokeStyle = '#3a2018'; ctx.stroke(); }
  } else if (name.includes('shadow') || name.includes('warning')) {
    ctx.beginPath(); ctx.ellipse(cx, cy, w * 0.45 * (0.7 + t * 0.3), h * 0.4, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(40,15,8,0.55)'; ctx.fill();
  } else if (name.includes('sweat')) { puff(cx - 8, cy, 5, '#cfe8ff'); puff(cx + 8, cy - 8, 4, '#cfe8ff'); }
  else if (name.includes('web-shot')) { puff(cx, cy, w * 0.25, '#f4f1ea'); }
  else if (name.includes('web-wrap')) {
    ctx.strokeStyle = 'rgba(245,242,235,0.85)'; ctx.lineWidth = 3;
    for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.moveTo(40 + k * 4, 70 + k * 14); ctx.quadraticCurveTo(96, 60 + k * 16 + (k % 2 ? 18 : -10), 152 - k * 4, 74 + k * 13); ctx.stroke(); }
    if (i === 3) ctx.clearRect(80, 0, 30, 192);
  } else if (name.includes('oil-splash') || name.includes('oil-shine')) {
    for (let k = 0; k < 6; k++) { const a = k * 1.05 + t; const r = w * (0.15 + t * 0.25);
      ctx.save(); ctx.translate(cx + Math.cos(a) * r, cy + Math.sin(a) * r); ctx.fillStyle = name.includes('shine') ? '#ffffff' : '#f5c542';
      ctx.beginPath(); ctx.moveTo(0, -7); ctx.lineTo(2, -2); ctx.lineTo(7, 0); ctx.lineTo(2, 2); ctx.lineTo(0, 7); ctx.lineTo(-2, 2); ctx.lineTo(-7, 0); ctx.lineTo(-2, -2); ctx.fill(); ctx.restore(); }
  } else { star(Math.min(w, h) * 0.4, 6, '#dc9544'); }
}

// Ensures fx frames exist: real ones, else procedural. Returns frame list.
export function fxFrames(scene, art, name, n, w, h) {
  const real = art.seq(name, n || 1);
  if (real.length) return real;
  const single = art.get(name);
  if (single) return [single];
  const out = [];
  for (let i = 1; i <= Math.max(1, n); i++) {
    const key = `ph:${name}_${pad(i)}`;
    if (!scene.textures.exists(key)) {
      const tex = scene.textures.createCanvas(key, w, h);
      drawFx(tex.getContext(), name, w, h, i, Math.max(1, n));
      tex.refresh();
    }
    out.push({ key });
  }
  return out;
}

// ---------- animations ----------
function mkAnim(scene, key, frames, fps, repeat, extra = {}) {
  if (scene.anims.exists(key)) scene.anims.remove(key);
  scene.anims.create({ key, frames, frameRate: fps, repeat, ...extra });
}

function jsonOverrides(scene, cid) {
  const data = scene.cache.json.get(`json:${cid}_anims`);
  const map = {};
  const list = Array.isArray(data) ? data : data && Array.isArray(data.anims) ? data.anims : [];
  for (const a of list) if (a && a.key) map[a.key] = a;
  return map;
}

// How many frames a base animation has (the spec count, or more if more real
// frames exist on disk) and the rate to play them at.
export function baseCount(art, cid, a, d, rate, ov = {}) {
  const real = art.seq(`${cid}_base_${a}`, 24).length;
  const n = Math.max(d.frames, real);
  const sm = SMOOTH[a];
  const js = ov[`${cid}_${a}`];
  let fps;
  if (js && js.frameRate && js.frames === n) fps = js.frameRate;
  else if (n === d.frames) fps = rate(a, d.fps);
  else if (sm && n === sm.frames) fps = sm.fps;
  else fps = d.fps * n / d.frames;
  return { n, fps };
}

// Does this wrestler have real frames for a new movement animation?
const ALIASES = ['run', 'block-crouch', 'hit-low', 'dizzy', 'webbed', 'block-overhead', 'lockup-win', 'lockup-lose'];
const META = {};
// Extra touches from anims.json for an animation key like 'dizzy' or 'grab_lockup-lose'.
export function animMeta(cid, key) { return META[`${cid}_${key}`] || {}; }

export function hasExtra(art, cid, a) { return art.seq(`${cid}_base_${a}`, 1).length > 0; }

export function buildAnimations(scene, art) {
  for (const cid of CHAR_IDS) {
    const ov = jsonOverrides(scene, cid);
    // anims.json keys may or may not include the category (goblin_lockup / goblin_grab_lockup)
    const rate = (k, d) => {
      const alts = [k, k.replace(/^(grab|throw)_/, ''), k.replace(/^thrown_/, 'thrown-')];
      for (const a of alts) { const o = ov[`${cid}_${a}`]; if (o && o.frameRate) return o.frameRate; }
      return d;
    };
    const frames = (cat, action, n) => {
      const out = [];
      for (let i = 1; i <= n; i++) out.push(charFrame(scene, art, cid, cat, action, i, n));
      return out;
    };
    // base animations take however many real frames exist (more = smoother)
    for (const [a, d] of Object.entries(BASE_ANIMS)) {
      const { n, fps } = baseCount(art, cid, a, d, (k, x) => rate(k, x), ov);
      mkAnim(scene, `${cid}_${a}`, frames('base', a, n), fps, d.repeat, d.yoyo && n === 2 ? { yoyo: true } : {});
    }
    for (const [a, d] of Object.entries(GRAB_ANIMS))
      mkAnim(scene, `${cid}_grab_${a}`, frames('grab', a, d.frames), rate(`grab_${a}`, d.fps), d.repeat);
    const throws = { ...GENERIC_THROWS, ...SIG_THROWS[cid] };
    for (const [a, n] of Object.entries(throws))
      mkAnim(scene, `${cid}_throw_${a}`, frames('throw', a, n), rate(`throw_${a}`, 10), 0);
    for (const p of THROWN_POSES)
      mkAnim(scene, `${cid}_thrown_${p}`, frames('thrown', p, 1), 1, 0);  // single pose

    // reuse animations (spec "0 - reuse" rows)
    const walkAnim = scene.anims.get(`${cid}_walk-fwd`);
    const walk = walkAnim.frames.map((f) => ({ key: f.textureKey, frame: f.textureFrame }));
    mkAnim(scene, `${cid}_walk-back`, [...walk].reverse(), walkAnim.frameRate, -1);
    mkAnim(scene, `${cid}_run`, walk, walkAnim.frameRate * 2, -1);
    const crouch = scene.anims.get(`${cid}_crouch`).frames.at(-1);
    mkAnim(scene, `${cid}_block-crouch`, [{ key: crouch.textureKey, frame: crouch.textureFrame }], 1, 0);
    mkAnim(scene, `${cid}_hit-low`, frames('base', 'hit-high', 2), 10, 0);
    const kd = frames('base', 'knockdown', 4);
    mkAnim(scene, `${cid}_getup`, [kd[2], kd[1], kd[0]], 9, 0);
    // dedicated movement animations replace the reuses once their frames exist
    for (const [a, d] of Object.entries(EXTRA_ANIMS)) {
      const real = art.seq(`${cid}_base_${a}`, 24);
      if (!real.length) continue;
      const n = Math.max(real.length, d.frames);
      mkAnim(scene, `${cid}_${a}`, frames('base', a, n), real.length === d.frames ? d.fps : d.fps * n / d.frames, d.repeat);
    }
    const idle1 = frames('base', 'idle', 2)[0];
    mkAnim(scene, `${cid}_dizzy`, [idle1], 1, 0);
    mkAnim(scene, `${cid}_webbed`, [idle1], 1, 0);
    const lock = frames('grab', 'lockup', 3);
    mkAnim(scene, `${cid}_grab_lockup-win`, [lock[2]], 1, 0);
    mkAnim(scene, `${cid}_grab_lockup-lose`, [lock[1]], 1, 0);
    // Extra animations defined in <char>_anims.json (run, crouch block, hit-low,
    // dizzy, webbed, overhead block, lock-up win/lose). They point at existing
    // frames and add touches (lean, offset, effect, follow-on animation).
    for (const alias of ALIASES) {
      const o = ov[`${cid}_${alias}`];
      const key = alias.startsWith('lockup-') ? `${cid}_grab_${alias}` : `${cid}_${alias}`;
      META[key] = {};
      if (!o || !o.prefix) continue;
      const nums = Array.isArray(o.frameNumbers) && o.frameNumbers.length ? o.frameNumbers
        : Array.from({ length: o.frames || 1 }, (_, i) => i + 1);
      const fr = nums.map((i) => art.get(`${o.prefix}${pad(i)}`));
      if (fr.some((f) => !f)) continue;
      mkAnim(scene, key, fr, o.frameRate || 10, o.repeat ?? 0);
      META[key] = { rotate: o.rotate, offsetX: o.offsetX, fx: o.fx, next: o.next, speed: o.speed };
    }
  }
  // fx anims
  for (const [name, n, w, h] of FX_FILES) {
    const fr = fxFrames(scene, art, name, n, w, h);
    const loop = /dizzy|shine|web-wrap|warning/.test(name);
    mkAnim(scene, name, fr, loop ? 8 : 14, loop ? -1 : 0);
  }
}

// Visual helper for UI/stage images: returns a Phaser image if the art exists, else null.
export function maybeImage(scene, art, name, x, y) {
  const f = art.getAny(name);
  if (!f) return null;
  return scene.add.image(x, y, f.key, f.frame);
}
