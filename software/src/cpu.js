// Computer opponent for 1 PLAYER mode. It "presses buttons" through the same
// state/pressed interface as PlayerInput, so it plays by the same rules.
import { TUNING } from './config.js';
import { BUTTONS } from './input.js';

export const CPU_LEVELS = {
  easy: { react: 0.42, aggro: 0.45, block: 0.2, timing: 0.16, mash: 4.5, grab: 0.25 },
  normal: { react: 0.26, aggro: 0.6, block: 0.45, timing: 0.09, mash: 7, grab: 0.35 },
  hard: { react: 0.14, aggro: 0.75, block: 0.7, timing: 0.045, mash: 9.5, grab: 0.45 },
};

const rnd = Math.random;

export class CpuInput {
  constructor(scene, index, level = 'normal') {
    this.scene = scene; this.index = index;
    this.L = CPU_LEVELS[level] || CPU_LEVELS.normal;
    this.state = {}; this.prev = {}; this.pressed = {};
    for (const b of BUTTONS) { this.state[b] = false; this.prev[b] = false; this.pressed[b] = false; }
    this.hold = {};        // button -> seconds left to hold
    this.think = 0.5;      // seconds until the next decision
    this.mashT = 0;
    this.lockPress = null;
    this.last = scene.time.now;
  }

  get me() { return this.scene.fighters[this.index]; }
  get opp() { return this.scene.fighters[1 - this.index]; }

  tap(b, t = 0.05) { this.hold[b] = Math.max(this.hold[b] || 0, t); }
  holdFor(b, t) { this.hold[b] = t; }
  release(...bs) { for (const b of bs) this.hold[b] = 0; }
  dir(toward) { // 'right'/'left' toward (+1) or away (-1) from the opponent
    const right = this.opp.x > this.me.x;
    return (toward > 0) === right ? 'right' : 'left';
  }

  update() {
    const now = this.scene.time.now;
    const dt = Math.min(0.05, (now - this.last) / 1000); this.last = now;
    if (this.me && this.opp && this.scene.phase === 'fight') this.decide(dt);
    else this.hold = {};
    const s = {};
    for (const b of BUTTONS) {
      s[b] = (this.hold[b] || 0) > 0;
      if (this.hold[b] > 0) this.hold[b] -= dt;
    }
    for (const b of BUTTONS) {
      this.pressed[b] = s[b] && !this.prev[b];
      this.prev[b] = s[b];
      this.state[b] = s[b];
    }
  }

  mash(dt) {
    this.mashT -= dt;
    if (this.mashT <= 0) {
      this.mashT = 1 / (this.L.mash * (0.8 + rnd() * 0.4));
      const b = ['light', 'heavy', 'grab'][Math.floor(rnd() * 3)];
      if (!this.prev[b]) this.tap(b, 0.03);
    }
  }

  decide(dt) {
    const me = this.me; const opp = this.opp; const L = this.L;
    const G = this.scene.grapple.active;

    // ---- grapples: lock-up timing ring, pins ----
    if (G && G.type === 'lockup' && (G.att === me || G.def === me)) {
      if (this.lockPress === null) this.lockPress = TUNING.lockupWindow + (rnd() * 2 - 1) * L.timing * 1.6;
      if (G.t >= this.lockPress) this.tap('grab', 0.06);
      // pick the throw direction while the ring closes
      if (G.att === me && !this.throwDir) this.throwDir = ['fwd', 'fwd', 'back', 'down', 'neutral'][Math.floor(rnd() * 5)];
      if (this.throwDir) this.holdDirection(this.throwDir);
      return;
    }
    this.lockPress = null;
    if (G && G.type === 'pin' && (G.pinner === me || G.vic === me)) { this.release('left', 'right', 'down'); this.mash(dt); return; }
    if (G && G.type !== 'lockup' && (G.att === me || G.vic === me)) { this.throwDir = null; return; }
    this.throwDir = null;

    // ---- stuck states: mash out ----
    if (['down', 'dizzy', 'webbed'].includes(me.state)) { this.release('left', 'right', 'block'); this.mash(dt); return; }
    if (me.state === 'hang') { if (me.t > 0.6 + rnd()) this.tap('down'); return; }

    // react to an incoming strike by blocking (only a reaction-time later)
    const dist = Math.abs(opp.x - me.x);
    if (opp.state === 'strike' && dist < 150 && me.neutral) {
      if (this.blockRoll === undefined) this.blockRoll = rnd() < L.block;
      if (this.blockRoll && opp.t > L.react * 0.5) {
        this.release('left', 'right');
        if (opp.strikeAnim === 'strike-low') { this.holdFor('down', 0.25); this.holdFor('block', 0.25); } else this.holdFor('block', 0.25);
        return;
      }
    } else this.blockRoll = undefined;

    this.think -= dt;
    if (this.think > 0) return;
    this.think = L.react * (0.6 + rnd() * 0.8);
    if (!me.neutral && me.state !== 'jump') return;
    this.release('block', 'down');

    const reach = 70 + me.st.reach * 8;
    // baby oil on the floor: go get it
    const B = this.scene.caveEvents && this.scene.caveEvents.bottle;
    if (B && B.landed && Math.abs(B.img.x - me.x) < 260 && rnd() < 0.7) {
      const toward = B.img.x > me.x ? 'right' : 'left';
      this.release('left', 'right'); this.holdFor(toward, this.think + 0.05); return;
    }
    // opponent down: pin or pick up
    if (opp.isDown && opp.hp > 0) {
      if (dist < 90 && opp.t > 0.25) { if (rnd() < 0.6) this.holdFor('down', 0.15); this.tap('grab', 0.06); return; }
      this.release('left', 'right'); this.holdFor(this.dir(1), this.think + 0.05); return;
    }
    // opponent stunned and close: free throw
    if (opp.stunned && dist < reach + 25) {
      this.holdDirection(['fwd', 'back', 'neutral'][Math.floor(rnd() * 3)]);
      this.tap('grab', 0.06); return;
    }
    // too far: close in (sometimes jump in)
    if (dist > reach + 30) {
      this.release('left', 'right');
      if (rnd() < 0.08 && me.grounded) { this.holdFor(this.dir(1), 0.4); this.tap('up', 0.06); return; }
      if (rnd() < L.aggro + 0.25) this.holdFor(this.dir(1), this.think + 0.05);
      return;
    }
    // in range: pick an action
    this.release('left', 'right');
    const r = rnd();
    if (r < L.grab * L.aggro) { this.tap('grab', 0.06); return; }
    if (r < L.aggro) {
      const s = rnd();
      if (s < 0.5) this.tap('light');
      else if (s < 0.8) this.tap('heavy');
      else { this.holdFor('down', 0.2); this.tap('light'); }
      return;
    }
    if (r < L.aggro + 0.15) { this.holdFor(this.dir(-1), 0.25); return; }   // step back
    if (r < L.aggro + 0.25) { this.holdFor('block', 0.3); return; }
    // otherwise wait a beat
  }

  holdDirection(d) {
    this.release('left', 'right', 'down');
    if (d === 'down') this.holdFor('down', 0.3);
    else if (d === 'fwd') this.holdFor(this.dir(1), 0.3);
    else if (d === 'back') this.holdFor(this.dir(-1), 0.3);
  }
}

