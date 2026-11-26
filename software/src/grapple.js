// Grapples: lock-ups with the timing ring, reversals, throws, pins, Mole Man's
// boulder roll and Goblin's stalactite drop. The fight scene owns one manager.
import { FLOOR_Y, W, TUNING, CHARACTERS } from './config.js';

// ---------- throw scripts ----------
// Each step: attacker shows frame f of `anim` (default the throw), victim shows
// thrown pose v at (dx, dy) from the attacker (dx toward the victim's side),
// rotated ang degrees. impact = damage multiplier applied on that step.
function throwSteps(name, A) {
  const H = A.def.height;
  const a = `throw_${name}`;
  switch (name) {
    case 'body-slam': return [
      { anim: a, f: 0, v: 'squeezed', dx: 46, t: 0.14 },
      { anim: a, f: 1, v: 'lifted', dx: 36, dy: -34, t: 0.14 },
      { anim: a, f: 2, v: 'overhead', dx: 10, dy: -H * 0.75, t: 0.22 },
      { anim: a, f: 3, v: 'overhead', dx: 50, dy: -40, t: 0.1 },
      { anim: a, f: 4, v: 'slam-impact', dx: 66, t: 0.4, impact: 13 },
    ];
    case 'rollup': return [
      { anim: a, f: 0, v: 'headlock-bent', dx: 44, t: 0.14 },
      { anim: a, f: 1, v: 'spin', dx: 20, dy: -30, ang: -90, t: 0.16 },
      { anim: a, f: 2, v: 'pinned', dx: 40, t: 0.14 },
      { anim: a, f: 3, v: 'pinned', dx: 40, t: 0.15, impact: 4, end: 'pin' },
    ];
    case 'anvil-drop': return [
      { anim: a, f: 0, v: 'headlock-bent', dx: 44, t: 0.14 },
      { anim: a, f: 1, v: 'upside-down', dx: 30, dy: -50, t: 0.16 },
      { anim: a, f: 2, v: 'upside-down', dx: 14, dy: -H * 0.45, t: 0.24 },
      { anim: a, f: 3, v: 'upside-down', dx: 14, dy: -H * 0.45 - 50, ay: -50, t: 0.16 },
      { anim: a, f: 4, v: 'upside-down', dx: 14, dy: -H * 0.25, ay: 0, t: 0.1 },
      { anim: a, f: 5, v: 'slam-impact', dx: 44, t: 0.45, impact: 20 },
    ];
    case 'keg-press': return [
      { anim: a, f: 0, v: 'squeezed', dx: 44, t: 0.12 },
      { anim: a, f: 1, v: 'lifted', dx: 24, dy: -40, t: 0.15 },
      { anim: a, f: 2, v: 'overhead', dx: 0, dy: -(H + 15), t: 0.22 },
      { anim: a, f: 3, v: 'overhead', dx: 0, dy: -(H + 25), t: 0.4 },
      { anim: a, f: 4, v: 'overhead', dx: 70, dy: -60, t: 0.12 },
      { anim: a, f: 5, v: 'slam-impact', dx: 90, t: 0.45, impact: 19 },
    ];
    case 'tunnel-suplex': return [
      { anim: a, f: 0, vAnim: 'hit-high', t: 0.2, fx: 'fx_burrow-mound' },
      { anim: a, f: 1, vAnim: 'hit-high', t: 0.25, teleportBehind: true, fx: 'fx_dirt-spray' },
      { anim: a, f: 2, vAnim: 'hit-high', t: 0.15 },
      { anim: a, f: 3, v: 'lifted', dx: 36, t: 0.16 },
      { anim: a, f: 4, v: 'suplex-arc', dx: 10, dy: -70, ang: -40, t: 0.14 },
      { anim: a, f: 5, v: 'upside-down', dx: -30, dy: -60, t: 0.12 },
      { anim: a, f: 6, v: 'slam-impact', dx: -60, t: 0.4, impact: 18 },
      { anim: a, f: 7, v: 'slam-impact', dx: -60, t: 0.15 },
    ];
    case 'snap-ddt': return [
      { anim: a, f: 0, v: 'headlock-bent', dx: 40, t: 0.16 },
      { anim: a, f: 1, v: 'headlock-bent', dx: 40, ang: 20, t: 0.14 },
      { anim: a, f: 2, v: 'headlock-bent', dx: 36, ang: 70, t: 0.14 },
      { anim: a, f: 3, v: 'slam-impact', dx: 40, t: 0.4, impact: 16, end: 'attackerDown' },
    ];
    case 'tail-whip-suplex': return [
      { anim: a, f: 0, vAnim: 'hit-high', t: 0.14 },
      { anim: a, f: 1, vAnim: 'hit-high', t: 0.12 },
      { anim: a, f: 2, v: 'tail-wrapped', dx: 90, t: 0.16 },
      { anim: a, f: 3, v: 'tail-wrapped', dx: 40, dy: -H * 0.9, t: 0.2 },
      { anim: a, f: 4, v: 'spin', dx: -20, dy: -H, ang: 180, t: 0.14 },
      { anim: a, f: 5, v: 'slam-impact', dx: 90, t: 0.35, impact: 19 },
      { anim: a, f: 6, v: 'slam-impact', dx: 90, t: 0.12 },
      { anim: a, f: 7, v: 'slam-impact', dx: 90, t: 0.12 },
    ];
    case 'basilisk-bomb': return [
      { anim: a, f: 0, v: 'squeezed', dx: 46, t: 0.14 },
      { anim: a, f: 1, v: 'lifted', dx: 46, dy: -H * 0.45, t: 0.16 },
      { anim: a, f: 2, v: 'lifted', dx: 46, dy: -H * 0.65, t: 0.35 },
      { anim: a, f: 3, v: 'overhead', dx: 56, dy: -30, t: 0.1 },
      { anim: a, f: 4, v: 'slam-impact', dx: 60, t: 0.4, impact: 20 },
      { anim: a, f: 5, v: 'slam-impact', dx: 60, t: 0.15 },
    ];
    default: return throwSteps('body-slam', A);
  }
}

const THROW_NAMES = {
  'body-slam': 'BODY SLAM', rollup: 'ROLL-UP', 'anvil-drop': 'ANVIL DROP', 'keg-press': 'KEG PRESS',
  'tunnel-suplex': 'TUNNEL SUPLEX', 'boulder-roll': 'BOULDER ROLL', 'snap-ddt': 'SNAP DDT',
  'stalactite-drop': 'STALACTITE DROP', 'tail-whip-suplex': 'TAIL-WHIP SUPLEX', 'basilisk-bomb': 'BASILISK BOMB',
};

function pickThrow(att, dir) {
  const c = CHARACTERS[att.cid];
  if (dir === 'fwd') return { name: c.sig1 };
  if (dir === 'down') return { name: 'rollup' };
  if (dir === 'back') {
    if (c.sig2 === 'keg-press' || c.sig2 === 'basilisk-bomb') return { name: c.sig2 };
    return { name: 'body-slam', behind: true };   // slam them behind you
  }
  return { name: 'body-slam' };
}

const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => t * t * (3 - 2 * t);

export class GrappleManager {
  constructor(scene) {
    this.scene = scene;
    this.active = null;
    this.ring = scene.add.graphics().setDepth(35);
    this.pinG = scene.add.graphics().setDepth(60);
    this.pinText = scene.add.text(W / 2, 112, '', { font: 'bold 15px monospace', color: '#f7dab5', stroke: '#3a2018', strokeThickness: 4 }).setOrigin(0.5).setDepth(61);
  }

  busy(f) { return this.active && (this.active.att === f || this.active.vic === f || this.active.def === f); }

  reach(att) { return 60 + att.st.reach * 9; }

  // ---------- grabbing ----------
  tryGrab(att, opp, dir) {
    if (this.active || !opp) return;
    const sc = this.scene;
    const dist = Math.abs(opp.x - att.x);
    att.stamina = Math.max(0, att.stamina - 4);
    // downed opponent: pin (hold down) or pick them up
    if (opp.isDown && opp.t > 0.2 && opp.hp > 0 && dist < 100) {
      if (dir === 'down') return this.startPin(att, opp, 0.62);
      return this.runThrow(att, opp, [
        { anim: 'grab_grab-ground', f: 0, v: 'pinned', dx: dist * 0.9, t: 0.15 },
        { anim: 'grab_grab-ground', f: 1, v: 'pinned', dx: 46, t: 0.15 },
        { anim: 'grab_grab-ground', f: 2, v: 'lifted', dx: 46, dy: -20, t: 0.2, end: 'standStun' },
      ], null);
    }
    if (dist > this.reach(att) || !opp.grabbable || Math.abs(opp.y - att.y) > 40) {
      att.setState('whiff'); att.showFrame('grab_lockup', 0);
      return;
    }
    // oiled opponents are slippery
    if (opp.oiledT > 0 && Math.random() < TUNING.oilSlipChance) {
      att.vx = att.facing * 160; att.setState('slip', 'grab_slip');
      sc.fx('fx_oil-splash', (att.x + opp.x) / 2, att.y - att.def.height * 0.5, 0.6);
      sc.callout('SLIPPED!', (att.x + opp.x) / 2, att.y - 150, '#ffe680');
      return;
    }
    // stunned, webbed or dizzy: free throw
    if (opp.stunned) {
      opp.sprite.setAngle(0);
      if (opp.state === 'webbed') sc.events.emit('webfree', opp);
      return this.doThrow(att, opp, dir);
    }
    // from behind (opponent facing away): waist lock, no lock-up contest
    if (opp.facing === att.facing) {
      const t = pickThrow(att, dir);
      const pre = [
        { anim: 'grab_grab-behind', f: 0, vAnim: 'hit-high', t: 0.1 },
        { anim: 'grab_grab-behind', f: 1, v: 'squeezed', dx: 40, t: 0.1 },
        { anim: 'grab_grab-behind', f: 2, v: 'squeezed', dx: 40, t: 0.12 },
      ];
      opp.facing = -att.facing;
      return this.runThrow(att, opp, [...pre, ...this.orient(throwSteps(t.name, att), t)], t.name);
    }
    this.startLockup(att, opp);
  }

  orient(steps, t) {
    if (!t.behind) return steps;
    return steps.map((s, i) => (i >= 2 && s.dx !== undefined ? { ...s, dx: -s.dx } : s));
  }

  doThrow(att, vic, dir, prefix = []) {
    const t = pickThrow(att, dir);
    return this.runThrow(att, vic, [...prefix, ...this.orient(throwSteps(t.name, att), t)], t.name);
  }

  // ---------- lock-up with the timing ring ----------
  startLockup(att, def) {
    const gap = 30 + (att.def.height + def.def.height) * 0.13;
    const mid = Phaser.Math.Clamp((att.x + def.x) / 2, 120, W - 120);
    att.x = mid - att.facing * gap / 2; def.x = mid + att.facing * gap / 2;
    def.facing = -att.facing;
    for (const f of [att, def]) { f.state = 'script'; f.vx = 0; f.vy = 0; f.y = FLOOR_Y; f.showFrame('grab_lockup', 0); f.sync(); }
    this.active = { type: 'lockup', att, def, t: 0, pa: null, pd: null };
    this.scene.sfx('grab');
  }

  updateLockup(dt, L) {
    const sc = this.scene;
    L.t += dt;
    const win = TUNING.lockupWindow;
    const ia = sc.inputOf(L.att); const id = sc.inputOf(L.def);
    if (ia.pressed.grab && L.pa === null) { L.pa = L.t; this.pressFx(L.att, L.pa); }
    if (id.pressed.grab && L.pd === null) { L.pd = L.t; this.pressFx(L.def, L.pd); }
    const f = L.t < 0.15 ? 0 : L.t < 0.4 ? 1 : 2;
    L.att.showFrame('grab_lockup', f); L.def.showFrame('grab_lockup', f);
    // strain back and forth
    const wob = Math.sin(L.t * 18) * 2;
    L.att.sprite.x = L.att.x + wob; L.def.sprite.x = L.def.x + wob;
    this.drawRing(L);
    const done = L.t > win + TUNING.goodWindow || (L.pa !== null && L.pd !== null && L.t > win - 0.05);
    if (done) { this.ring.clear(); if (this.ringImg) this.ringImg.setVisible(false); this.resolveLockup(L); }
  }

  quality(press) {
    if (press === null) return 0;
    const d = Math.abs(press - TUNING.lockupWindow);
    return d <= TUNING.perfectWindow ? 2 : d <= TUNING.goodWindow ? 1 : 0;
  }

  pressFx(f, press) {
    const q = this.quality(press);
    const label = q === 2 ? 'PERFECT!' : q === 1 ? 'GOOD' : press < TUNING.lockupWindow ? 'EARLY' : 'LATE';
    this.scene.callout(label, f.x, f.y - f.def.height - 40, q === 2 ? '#ffe14a' : q === 1 ? '#f7dab5' : '#d08060');
    if (q === 2) this.scene.flashPerfect(f.x, f.y - f.def.height * 0.6);
  }

  drawRing(L) {
    const g = this.ring; g.clear();
    const x = (L.att.x + L.def.x) / 2; const y = FLOOR_Y - Math.max(L.att.def.height, L.def.def.height) - 60;
    const p = Math.min(1, L.t / TUNING.lockupWindow);
    const r = 70 - 48 * p;
    g.fillStyle(0x1a0a05, 0.5).fillCircle(x, y, 26);
    g.lineStyle(4, 0xffe14a, 1).strokeCircle(x, y, 22);
    g.lineStyle(6, p >= 1 ? 0xffffff : 0xdc9544, 1).strokeCircle(x, y, Math.max(r, 22));
    const art = this.scene.art.seq('ui_timing-ring', 4);
    if (art.length) {
      if (!this.ringImg) this.ringImg = this.scene.add.image(0, 0, art[0].key, art[0].frame).setDepth(36);
      const fr = art[Math.min(art.length - 1, Math.floor(p * art.length))];
      this.ringImg.setTexture(fr.key, fr.frame).setPosition(x, y).setVisible(true);
    }
    if (!this.ringLabel) this.ringLabel = this.scene.add.text(0, 0, 'GRAB!', { font: 'bold 12px monospace', color: '#ffe14a', stroke: '#3a2018', strokeThickness: 3 }).setOrigin(0.5).setDepth(37);
    this.ringLabel.setPosition(x, y + 38).setVisible(true);
  }

  resolveLockup(L) {
    if (this.ringLabel) this.ringLabel.setVisible(false);
    const { att, def } = L;
    const qa = this.quality(L.pa); const qd = this.quality(L.pd);
    this.active = null;
    // defender nails a perfect press the attacker didn't: reversal
    if (qd === 2 && qa < 2) {
      this.scene.banner('ui_text-reversal', 'REVERSAL!', 0.8);
      const pre = [
        { anim: 'grab_reversal', f: 0, vAnim: 'hit-high', t: 0.12 },
        { anim: 'grab_reversal', f: 1, vAnim: 'hit-high', t: 0.1 },
        { anim: 'grab_reversal', f: 2, vAnim: 'hit-high', t: 0.12, teleportBehind: true },
        { anim: 'grab_reversal', f: 3, v: 'squeezed', dx: 40, t: 0.14 },
      ];
      return this.doThrow(def, att, this.scene.dirOf(def), pre);
    }
    let attWins;
    if (qa !== qd) attWins = qa > qd;
    else attWins = att.st.grapple + att.stamina / 60 + Math.random() * 1.6 >= def.st.grapple + def.stamina / 60 + Math.random() * 1.6;
    if (attWins) return this.doThrow(att, def, this.scene.dirOf(att), [{ anim: 'grab_lockup-win', f: 0, v: 'squeezed', dx: 44, t: 0.12 }]);
    // attacker loses the lock-up: shoved back, briefly open
    att.state = 'idle';
    att.vx = -att.facing * 260; att.stun = 0.45;
    att.setState('hit', 'hit-high');
    def.setState('idle', 'grab_lockup-win');
    this.scene.time.delayedCall(250, () => { if (def.state === 'idle') def.play('idle'); });
    this.scene.sfx('block');
  }

  // ---------- throw runner ----------
  runThrow(att, vic, steps, name) {
    att.state = 'script'; vic.state = 'script';
    att.vx = att.vy = vic.vx = vic.vy = 0; att.y = FLOOR_Y;
    vic.facing = -att.facing;
    att.stamina = Math.max(0, att.stamina - 10);
    this.active = { type: 'throw', att, vic, steps, i: -1, t: 0, name };
    if (name && THROW_NAMES[name] && name !== 'body-slam') this.scene.callout(THROW_NAMES[name], att.x, FLOOR_Y - att.def.height - 70, '#ffb347', 1.2);
    this.nextStep(this.active);
  }

  nextStep(T) {
    T.i++; T.t = 0;
    const s = T.steps[T.i];
    if (!s) return this.endThrow(T);
    const { att, vic } = T;
    if (s.teleportBehind) {
      const side = Math.sign(att.x - vic.x) || 1;
      att.x = Phaser.Math.Clamp(vic.x - side * 46, 100, W - 100);
      att.facing = vic.x > att.x ? 1 : -1;
      vic.facing = -vic.facing; // victim is now facing away
    }
    att.showFrame(s.anim, s.f);
    if (s.ay !== undefined) T.ay0 = att.y;
    T.from = { x: vic.x, y: vic.y, ang: vic.sprite.angle };
    if (s.v) { vic.showFrame(`thrown_${s.v}`, 0); vic.facing = -att.facing; }
    else if (s.vAnim && vic.animKey !== s.vAnim) { vic.play(s.vAnim); }
    if (s.fx) this.scene.fx(s.fx, att.x, FLOOR_Y - 20);
    if (s.impact) {
      const pow = 0.75 + att.st.power * 0.1;
      vic.damage(Math.round(s.impact * pow));
      this.scene.impact(Phaser.Math.Clamp(att.x + (s.dx || 0) * att.facing, 60, W - 60), FLOOR_Y, s.impact >= 15);
    }
  }

  updateThrow(dt, T) {
    const s = T.steps[T.i];
    T.t += dt;
    const k = ease(Math.min(1, T.t / s.t));
    const { att, vic } = T;
    if (s.ay !== undefined) att.y = FLOOR_Y + lerp(T.ay0 - FLOOR_Y, s.ay, k);
    if (s.v) {
      const tx = Phaser.Math.Clamp(att.x + (s.dx || 0) * att.facing, 60, W - 60);
      const ty = FLOOR_Y + (s.dy || 0) + (att.y - FLOOR_Y);
      vic.x = lerp(T.from.x, tx, k); vic.y = Math.min(FLOOR_Y, lerp(T.from.y, ty, k));
      vic.sprite.setAngle(lerp(T.from.ang, (s.ang || 0) * att.facing, k));
    }
    att.sync(); vic.sync();
    if (T.t >= s.t) this.nextStep(T);
  }

  endThrow(T) {
    const { att, vic } = T;
    const end = T.steps[T.steps.length - 1].end;
    this.active = null;
    att.sprite.setAngle(0); vic.sprite.setAngle(0);
    att.y = FLOOR_Y;
    if (end === 'standStun') {
      vic.y = FLOOR_Y; vic.stun = 0.8; vic.setState('hit', 'hit-high');
      att.setState('idle', 'idle');
      return;
    }
    vic.goDown('lying-up');
    if (vic.hp <= 0) { att.setState('idle', 'idle'); return; }
    if (end === 'pin') return this.startPin(att, vic, 0.75);
    if (end === 'attackerDown') { att.goDown('lying-up'); att.downTime = 0.35; return; }
    att.setState('idle', 'idle');
  }

  // ---------- pins: tug-of-war ----------
  startPin(pinner, vic, m) {
    pinner.state = 'script'; vic.state = 'script';
    pinner.vx = vic.vx = 0; pinner.y = vic.y = FLOOR_Y;
    pinner.x = vic.x; pinner.play('grab_pin-hold');
    vic.showFrame('thrown_pinned', 0);
    this.active = { type: 'pin', pinner, vic, att: pinner, m, count: 0, shown: 0, t: 0 };
    this.scene.sfx('grab');
  }

  updatePin(dt, P) {
    const sc = this.scene;
    const ip = sc.inputOf(P.pinner); const iv = sc.inputOf(P.vic);
    const pp = P.pinner.mashed(ip); const vp = P.vic.mashed(iv);
    P.t += dt;
    P.m += pp * 0.03 * (0.8 + P.pinner.st.grapple * 0.1) + dt * 0.06;
    const hpFrac = P.vic.hp / P.vic.maxHp;
    P.m -= vp * 0.055 * (0.35 + 0.65 * hpFrac) * (0.6 + 0.4 * P.vic.stamina / 100) * (0.8 + P.vic.st.toughness * 0.05);
    P.m = Math.min(1, P.m);
    if (vp) P.vic.showFrame(P.vic.animKey === 'thrown_pinned' ? 'thrown_pinned-struggle' : 'thrown_pinned', 0);
    P.pinner.sync(); P.vic.sync();
    if (P.m > 0.5) {
      P.count += dt / TUNING.pinCount;
      const n = Math.floor(P.count);
      if (n > P.shown && n <= 3) { P.shown = n; sc.pinNumber(n); }
      if (P.count >= 3) { this.drawPin(P); this.clearPin(); this.active = null; sc.onPinfall(P.pinner, P.vic); return; }
    }
    if (P.m <= 0) return this.kickOut(P);
    this.drawPin(P);
  }

  drawPin(P) {
    const g = this.pinG; g.clear();
    const x = W / 2 - 120; const y = 130;
    const fr = this.scene.art.getAny('ui_pin-meter_frame');
    g.fillStyle(0x3a2018, 0.95).fillRect(x - 4, y - 4, 248, 30);
    g.fillStyle(0x6fbf3a, 0.85).fillRect(x, y, 120, 22);
    g.fillStyle(0xc0392b, 0.85).fillRect(x + 120, y, 120, 22);
    const mx = x + 240 * Phaser.Math.Clamp(P.m, 0, 1);
    g.fillStyle(0xffe14a, 1).fillRect(mx - 5, y - 8, 10, 38);
    g.lineStyle(2, 0x3a2018, 1).strokeRect(mx - 5, y - 8, 10, 38);
    if (fr && !this.pinFrameImg) this.pinFrameImg = this.scene.add.image(W / 2, y + 11, fr.key, fr.frame).setDepth(60);
    if (this.pinFrameImg) this.pinFrameImg.setVisible(true);
    const flash = Math.floor(this.scene.time.now / 160) % 2;
    this.pinText.setText(`ESCAPE  ${flash ? 'MASH!' : '     '}  PINNED`);
  }

  clearPin() { this.pinG.clear(); this.pinText.setText(''); if (this.pinFrameImg) this.pinFrameImg.setVisible(false); }

  kickOut(P) {
    const { pinner, vic } = P;
    this.clearPin(); this.active = null;
    vic.showFrame('thrown_kick-out', 0);
    this.scene.callout('KICK OUT!', vic.x, FLOOR_Y - 140, '#8fe05a');
    pinner.knockdown(-pinner.facing, 0.5);
    this.scene.time.delayedCall(300, () => { if (vic.state === 'script') { vic.invulnT = 0.5; vic.setState('getup', 'getup'); } });
  }

  // ---------- Mole Man: boulder roll ----------
  boulderRoll(att, opp) {
    if (this.active) return;
    att.state = 'script'; att.vx = 0; att.stamina -= 20;
    att.showFrame('throw_boulder-roll', 0);
    this.active = { type: 'roll', att, opp, t: 0, spray: 0 };
    this.scene.callout('BOULDER ROLL', att.x, FLOOR_Y - 200, '#ffb347');
  }

  updateRoll(dt, R) {
    const { att, opp } = R;
    R.t += dt;
    if (R.t < 0.18) { att.sync(); return; }
    att.showFrame('throw_boulder-roll', 1);
    att.x += att.facing * 430 * dt;
    att.sprite.setOrigin(0.5, 0.75).setAngle(att.sprite.angle + att.facing * 900 * dt);
    att.sprite.y = att.y - 0.1875 * 192;
    att.sprite.x = att.x; att.shadow.setPosition(att.x, FLOOR_Y + 2);
    R.spray += dt;
    if (R.spray > 0.15) { R.spray = 0; this.scene.fx('fx_dirt-spray', att.x - att.facing * 30, FLOOR_Y - 30, 0.6); }
    const hit = opp && Math.abs(opp.x - att.x) < 54 && opp.grounded && opp.invulnT <= 0 && (opp.grabbable || opp.isDown === false && opp.state === 'jump');
    const wall = att.x < 110 || att.x > W - 110;
    if (hit || wall || R.t > 1.3) {
      att.sprite.setOrigin(0.5, 0.9375).setAngle(0);
      att.x = Phaser.Math.Clamp(att.x, 100, W - 100);
      this.active = null;
      if (hit) {
        opp.sprite.setAngle(0);
        const steps = throwSteps('body-slam', att).slice(1);
        return this.runThrow(att, opp, [
          { anim: 'throw_boulder-roll', f: 2, v: 'squeezed', dx: 40, t: 0.12 },
          { anim: 'throw_boulder-roll', f: 3, v: 'squeezed', dx: 40, t: 0.2 },
          ...steps.map((s) => (s.impact ? { ...s, impact: 15 } : s)),
        ], 'boulder-roll');
      }
      att.setState('dizzy', 'dizzy');
      this.scene.dizzyBats(att);
    }
  }

  // ---------- Goblin: stalactite drop (moonsault from a hang) ----------
  stalactiteDrop(att, opp) {
    att.state = 'script';
    this.active = { type: 'drop', att, opp, t: 0, x0: att.x, y0: att.y, phase: 0 };
    att.showFrame('throw_stalactite-drop', 0);
    this.scene.callout('STALACTITE DROP', att.x, 80, '#ffb347');
  }

  updateDrop(dt, D) {
    const { att, opp } = D;
    D.t += dt;
    if (D.t < 0.12) { att.showFrame('throw_stalactite-drop', 0); }
    else if (D.t < 0.24) { att.showFrame('throw_stalactite-drop', 1); }
    else if (D.t < 0.6) {
      const k = ease((D.t - 0.24) / 0.36);
      att.showFrame('throw_stalactite-drop', 2);
      att.x = lerp(D.x0, opp.x, k);
      att.y = lerp(D.y0, FLOOR_Y - 40, k) - Math.sin(k * Math.PI) * 60;
      att.sprite.setOrigin(0.5, 0.6).setAngle(-att.facing * 360 * k);
      att.sprite.x = att.x; att.sprite.y = att.y - 0.3375 * 192;
      att.sprite.setFlipX(att.facing < 0);
      return;
    } else if (!D.landed) {
      D.landed = true;
      att.sprite.setOrigin(0.5, 0.9375).setAngle(0);
      att.y = FLOOR_Y;
      const ok = Math.abs(opp.x - att.x) < 70 && opp.grounded && opp.invulnT <= 0 && (opp.grabbable || opp.isDown);
      if (!ok) { this.active = null; att.goDown('lying-down'); this.scene.impact(att.x, FLOOR_Y, false); return; }
      att.showFrame('throw_stalactite-drop', 3);
      opp.state = 'script'; opp.showFrame('thrown_slam-impact', 0); opp.y = FLOOR_Y;
      opp.damage(Math.round(16 * (0.75 + att.st.power * 0.1)));
      this.scene.impact(opp.x, FLOOR_Y, true);
    } else if (D.t > 0.85) {
      this.active = null;
      if (opp.hp <= 0) { opp.goDown('lying-up'); att.setState('idle', 'idle'); return; }
      opp.goDown('lying-up');
      att.showFrame('throw_stalactite-drop', 4);
      return this.startPin(att, opp, 0.7);
    }
    att.sync(); opp.sync();
  }

  // ---------- frame update ----------
  update(dt) {
    const A = this.active;
    if (!A) return;
    if (A.type === 'lockup') this.updateLockup(dt, A);
    else if (A.type === 'throw') this.updateThrow(dt, A);
    else if (A.type === 'pin') this.updatePin(dt, A);
    else if (A.type === 'roll') this.updateRoll(dt, A);
    else if (A.type === 'drop') this.updateDrop(dt, A);
  }

  // Cave-in breaks up whatever grapple is happening.
  breakUp() {
    const A = this.active;
    if (!A) return false;
    this.active = null;
    this.ring.clear(); if (this.ringImg) this.ringImg.setVisible(false); if (this.ringLabel) this.ringLabel.setVisible(false);
    this.clearPin();
    for (const f of [A.att, A.def, A.vic, A.pinner]) {
      if (!f || f.state !== 'script') continue;
      f.sprite.setOrigin(0.5, 0.9375).setAngle(0);
      if (f.y < FLOOR_Y - 5) { f.state = 'knockdown'; f.vy = 0; f.play('knockdown'); }
      else { f.y = FLOOR_Y; f.stun = 0.4; f.setState('hit', 'hit-high'); }
    }
    return true;
  }
}
