// Hit, hurt and grab boxes from assets/characters/<char>/<char>_hitboxes.json.
// Boxes are in 192x192 frame pixels for a wrestler facing right; the sprite
// origin puts frame pixel (96, 180) on the wrestler's feet.
// Frames without data fall back to a body-sized box (hurt) or to the old
// distance checks (hit, grab), so missing or partial data never breaks a fight.

const FX = 96, FY = 180;

// Name of the art frame a sprite is showing, e.g. goblin_base_strike-light_02.
export function frameName(sprite) {
  const f = sprite && sprite.frame;
  if (!f) return '';
  const key = f.texture.key;
  if (key.startsWith('atlas:')) return String(f.name).replace(/\.(png|webp)$/i, '');
  return key.replace(/^ph:/, '');
}

function data(scene, cid) {
  return scene.cache.json.get(`json:${cid}_hitboxes`) || null;
}

// Box for one frame name, in world space for a fighter at (x, y) facing `facing`.
export function toWorld(b, x, y, facing) {
  const left = facing > 0 ? x - FX + b.x : x + FX - (b.x + b.w);
  return { x: left, y: y - FY + b.y, w: b.w, h: b.h };
}

export function boxesFor(f, name = frameName(f.sprite)) {
  const d = data(f.scene, f.cid);
  return (d && d[name]) || null;
}

// Body box used when a frame has no hurtbox drawn.
function defaultHurt(f) {
  const h = f.def.height;
  const crouched = f.state === 'crouch' || f.state === 'down';
  const hh = crouched ? h * 0.6 : h;
  const w = Math.max(48, h * 0.42);
  return { x: f.x - w / 2, y: f.y - hh, w, h: hh };
}

export function hurtBox(f) {
  const b = boxesFor(f);
  return b && b.hurtbox ? toWorld(b.hurtbox, f.x, f.sprite.y, f.facing) : defaultHurt(f);
}

// Hitbox on the frame being shown now, or null if this frame has none.
export function hitBox(f) {
  const b = boxesFor(f);
  return b && b.hitbox ? toWorld(b.hitbox, f.x, f.sprite.y, f.facing) : null;
}

// Does this strike animation have any hitbox data at all?
export function strikeHasBoxes(f, anim) {
  const d = data(f.scene, f.cid);
  if (!d) return false;
  const pre = `${f.cid}_base_${anim}_`;
  return Object.keys(d).some((k) => k.startsWith(pre) && d[k].hitbox);
}

// Grab reach: the grab box of the frame where the hands close (lock-up, from
// behind, off the ground), placed at the attacker's position. null = no data.
export function grabBox(f, kind = 'lockup') {
  const d = data(f.scene, f.cid);
  if (!d) return null;
  const pre = `${f.cid}_grab_${kind}_`;
  const k = Object.keys(d).sort().find((n) => n.startsWith(pre) && d[n].grabBox);
  return k ? toWorld(d[k].grabBox, f.x, f.y, f.facing) : null;
}

export function overlap(a, b) {
  return !!a && !!b && a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
}

// Practice-mode overlay (B): blue hurt, red hit, orange grab reach.
export class BoxDebug {
  constructor(scene) {
    this.scene = scene; this.on = false;
    this.g = scene.add.graphics().setDepth(95);
  }
  toggle() { this.on = !this.on; if (!this.on) this.g.clear(); return this.on; }
  draw(fighters) {
    if (!this.on) return;
    const g = this.g; g.clear();
    const rect = (r, c) => { if (r) { g.lineStyle(2, c, 1); g.strokeRect(r.x, r.y, r.w, r.h); } };
    for (const f of fighters) {
      rect(hurtBox(f), 0x4f8cff);
      rect(hitBox(f), 0xff3b30);
      if (f.neutral) rect(grabBox(f), 0xff9f0a);
    }
  }
}
