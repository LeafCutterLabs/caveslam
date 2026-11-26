// A wrestler on the cave floor. Handles its own movement, strikes and recovery.
// Grapples, throws and pins are run by the fight scene (grapple.js), which puts
// the fighter in the 'script' state while it drives the sprite.
import { CHARACTERS, FLOOR_Y, WALL_L, WALL_R, ORIGIN_X, ORIGIN_Y, TUNING, GRIPS } from './config.js';
import { hasExtra } from './assets.js';

const NEUTRAL = new Set(['idle', 'walk', 'crouch', 'block', 'land']);
// states an opponent can be hit by strikes in
const HITTABLE = new Set(['idle', 'walk', 'crouch', 'block', 'land', 'jump', 'hit', 'strike', 'dizzy', 'webbed', 'hang', 'whiff', 'slip', 'roll', 'oilapply', 'getup-late']);

const STRIKES = {
  'strike-light': { active: 2, reach: 70, dmg: 4, stam: 5 },
  'strike-heavy': { active: 3, reach: 84, dmg: 8, stam: 12 },
  'strike-low': { active: 2, reach: 84, dmg: 5, stam: 8 },
  'strike-air': { active: 2, reach: 80, dmg: 7, stam: 8 },
};

export class Fighter {
  constructor(scene, cid, x, facing, playerIndex) {
    this.scene = scene;
    this.cid = cid;
    this.def = CHARACTERS[cid];
    this.st = this.def.stats;
    this.idx = playerIndex;
    this.x = x; this.y = FLOOR_Y; this.vx = 0; this.vy = 0;
    this.facing = facing;
    this.maxHp = 70 + this.st.toughness * 16;
    this.hp = this.maxHp;
    this.stamina = 100;
    this.speed = 110 + this.st.speed * 28;
    this.state = 'idle'; this.t = 0;
    this.oiledT = 0; this.webbedT = 0; this.invulnT = 0; this.downTime = 0; this.turnT = 0;
    const art = scene.registry.get('art');
    this.hasLand = hasExtra(art, cid, 'land');
    this.hasTurn = hasExtra(art, cid, 'turn');
    this.shadow = scene.add.ellipse(x, FLOOR_Y, this.def.height * 0.55, 14, 0x2a0f08, 0.45).setDepth(9);
    this.sprite = scene.add.sprite(x, this.y, '__DEFAULT').setOrigin(ORIGIN_X, ORIGIN_Y).setDepth(10);
    this.play('idle');
  }

  get grounded() { return this.y >= FLOOR_Y - 0.5 && this.vy >= 0; }
  get neutral() { return NEUTRAL.has(this.state); }
  get stunned() { return ['hit', 'dizzy', 'webbed'].includes(this.state); }
  get isDown() { return this.state === 'down'; }
  get hittable() { return HITTABLE.has(this.state) && this.invulnT <= 0; }
  get grabbable() { return this.invulnT <= 0 && (this.neutral || ['hit', 'dizzy', 'webbed', 'strike', 'whiff', 'slip', 'oilapply'].includes(this.state)) && this.grounded; }

  play(key, restart = false) {
    const full = `${this.cid}_${key}`;
    this.animKey = key;
    this.sprite.setAngle(0);
    this.sprite.play(full, !restart);
  }

  setState(s, anim, restart = true) {
    // let a turn-around finish before idle/walk take over the sprite
    if (this.turnT > 0 && (s === 'idle' || s === 'walk')) { this.state = s; this.t = 0; if (anim) this.pendingAnim = anim; return; }
    this.turnT = 0;
    this.state = s; this.t = 0; this.hitDone = false;
    if (anim) this.play(anim, restart);
  }

  // show one frame of an animation without playing it
  showFrame(key, i) {
    const anim = this.scene.anims.get(`${this.cid}_${key}`);
    const fr = anim && anim.frames[Math.max(0, Math.min(i, anim.frames.length - 1))];
    if (!fr) return;
    this.sprite.anims.stop();
    this.animKey = key;
    this.sprite.setTexture(fr.textureKey, fr.textureFrame);
  }

  faceToward(opp) { if (opp && Math.abs(opp.x - this.x) > 4) this.facing = opp.x > this.x ? 1 : -1; }

  mashed(inp) {
    const p = inp.pressed;
    return (p.light ? 1 : 0) + (p.heavy ? 1 : 0) + (p.grab ? 1 : 0) + (p.block ? 1 : 0) + (p.up ? 1 : 0) + (p.left ? 1 : 0) + (p.right ? 1 : 0);
  }

  // ---- per-frame ----
  update(dt, inp, opp) {
    this.t += dt;
    if (this.invulnT > 0) this.invulnT -= dt;
    if (this.oiledT > 0) { this.oiledT -= dt; }
    if (this.turnT > 0) {
      this.turnT -= dt;
      if (this.turnT <= 0 && (this.state === 'idle' || this.state === 'walk')) this.play(this.pendingAnim && this.pendingAnim !== 'turn' ? this.pendingAnim : this.state === 'walk' ? 'walk-fwd' : 'idle');
    }
    if (!['strike', 'script'].includes(this.state)) this.stamina = Math.min(100, this.stamina + 14 * dt);
    const back = this.facing > 0 ? inp.state.left : inp.state.right;
    const fwd = this.facing > 0 ? inp.state.right : inp.state.left;
    this.inputDir = inp.state.down ? 'down' : fwd ? 'fwd' : back ? 'back' : 'neutral';
    this.blocking = false;

    switch (this.state) {
      case 'idle': case 'walk': case 'crouch': case 'block': case 'land': {
        if (this.state === 'land' && this.t < (this.hasLand ? 0.14 : 0.08)) break;
        const was = this.facing;
        this.faceToward(opp);
        if (was !== this.facing && this.hasTurn && (this.state === 'idle' || this.state === 'walk')) {
          this.pendingAnim = this.state === 'walk' ? this.animKey : 'idle';
          this.play('turn', true); this.turnT = 3 / 18;
        }
        if (inp.pressed.grab) { this.vx = 0; this.scene.grapple.tryGrab(this, opp, this.inputDir); break; }
        if (inp.pressed.up) { this.jump(fwd ? 1 : back ? -1 : 0); break; }
        if (inp.state.down) {
          if (inp.pressed.heavy && this.cid === 'mole' && this.stamina >= 20) { this.scene.grapple.boulderRoll(this, opp); break; }
          if (inp.pressed.light || inp.pressed.heavy) { this.strike('strike-low'); break; }
          this.vx = 0;
          this.blocking = inp.state.block;
          const a = inp.state.block ? 'block-crouch' : 'crouch';
          if (this.state !== 'crouch') this.setState('crouch', a);
          else if (this.animKey !== a) this.play(a);
          break;
        }
        if (inp.pressed.light) { this.strike('strike-light'); break; }
        if (inp.pressed.heavy) { this.strike(this.stamina >= 12 ? 'strike-heavy' : 'strike-light'); break; }
        if (inp.state.block) {
          this.vx = 0; this.blocking = true;
          if (this.state !== 'block') this.setState('block', 'block');
          break;
        }
        if (fwd || back) {
          const oilBoost = this.oiledT > 0 ? 1.1 : 1;
          this.vx = (fwd ? 1 : -0.7) * this.speed * this.facing * oilBoost;
          const a = fwd ? 'walk-fwd' : 'walk-back';
          if (this.state !== 'walk' || this.animKey !== a) this.setState('walk', a, false);
        } else {
          this.vx = 0;
          if (this.state !== 'idle') this.setState('idle', 'idle', false);
        }
        break;
      }
      case 'jump': {
        if (inp.pressed.up) {
          const grip = this.nearGrip();
          if (grip) { this.hang(grip); break; }
          const wall = this.x <= WALL_L + 34 ? 1 : this.x >= WALL_R - 34 ? -1 : 0;
          if (wall && !this.wallJumped) { this.wallJump(wall); break; }
        }
        if ((inp.pressed.light || inp.pressed.heavy) && !this.airStrike) {
          this.airStrike = true; this.hitDone = false; this.play('strike-air', true);
        }
        if (this.airStrike) this.checkHit(opp, 'strike-air');
        if (this.grounded && this.t > 0.05) { this.airStrike = false; this.vx = 0; this.land(); }
        break;
      }
      case 'walljump':
        if (this.t > 0.25) { this.state = 'jump'; this.t = 0.1; }
        if (this.grounded && this.t > 0.05) { this.vx = 0; this.land(); }
        break;
      case 'hang': {
        this.vx = 0; this.vy = 0;
        this.x = this.grip.x; this.y = this.grip.y + this.def.height * 1.12;
        if (inp.pressed.grab && this.cid === 'goblin' && opp && Math.abs(opp.x - this.x) < 170 && opp.grounded && opp.state !== 'down') {
          this.scene.grapple.stalactiteDrop(this, opp); break;
        }
        if (inp.pressed.light || inp.pressed.heavy || inp.pressed.grab) {
          this.state = 'jump'; this.t = 0.1; this.airStrike = true; this.hitDone = false; this.play('strike-air', true);
          this.vx = (opp && opp.x > this.x ? 1 : -1) * 160; this.facing = Math.sign(this.vx);
          break;
        }
        if (inp.pressed.down || this.t > 3) { this.state = 'jump'; this.t = 0.1; this.showJumpFrame(); }
        break;
      }
      case 'strike': {
        this.checkHit(opp, this.strikeAnim);
        if (!this.sprite.anims.isPlaying) this.setState(this.strikeAnim === 'strike-low' ? 'crouch' : 'idle', this.strikeAnim === 'strike-low' ? 'crouch' : 'idle');
        break;
      }
      case 'whiff': case 'slip':
        this.vx *= 0.85;
        if (this.t > (this.state === 'slip' ? 0.55 : 0.35)) this.setState('idle', 'idle');
        break;
      case 'hit':
        this.vx *= 0.85;
        if (this.t > this.stun) this.setState('idle', 'idle');
        break;
      case 'dizzy':
        this.vx = 0;
        this.sprite.setAngle(Math.sin(this.t * 14) * 6);
        this.t += this.mashed(inp) * 0.05;
        if (this.t > 1.4) { this.sprite.setAngle(0); this.setState('idle', 'idle'); }
        break;
      case 'webbed':
        this.vx = 0;
        this.webbedT -= dt + this.mashed(inp) * 0.12;
        this.sprite.x = this.x + Math.sin(this.t * 40) * 2;
        if (this.webbedT <= 0) { this.scene.events.emit('webfree', this); this.setState('idle', 'idle'); }
        break;
      case 'oilapply':
        this.vx = 0;
        if (!this.sprite.anims.isPlaying || this.t > 1.2) { this.oiledT = TUNING.oilTime; this.setState('idle', 'idle'); }
        break;
      case 'knockdown':
        if (this.grounded && this.t > 0.1) {
          this.vx = 0;
          this.scene.fx('fx_dust', this.x, FLOOR_Y - 20);
          this.scene.cameras.main.shake(120, 0.006);
          this.goDown(this.downFace || 'lying-up');
        }
        break;
      case 'wallbounce':
        if (this.t > 0.3) { this.vx = -this.bounceDir * 140; this.vy = -200; this.y -= 1; this.setState('knockdown', 'knockdown'); this.showFrame('knockdown', 1); }
        break;
      case 'down':
        this.vx = 0;
        this.downTime -= this.mashed(inp) * 0.07;
        if (this.hp <= 0) break;
        if (this.t > this.downTime) { this.setState('getup', 'getup'); }
        break;
      case 'getup':
        if (!this.sprite.anims.isPlaying || this.t > 0.6) { this.invulnT = 0.45; this.setState('idle', 'idle'); }
        break;
      case 'script': case 'ko': case 'win': case 'frozen':
        break;
    }

    if (this.state !== 'script') this.physics(dt);
    this.sync();
  }

  physics(dt) {
    if (this.state === 'hang') return;
    if (!this.grounded || this.vy < 0) this.vy += TUNING.gravity * dt;
    this.x += this.vx * dt; this.y += this.vy * dt;
    if (this.y >= FLOOR_Y) { this.y = FLOOR_Y; if (this.vy > 0) this.vy = 0; }
    const half = 26;
    if (this.x < WALL_L + half || this.x > WALL_R - half) {
      const dir = this.x < WALL_L + half ? -1 : 1;
      this.x = Phaser.Math.Clamp(this.x, WALL_L + half, WALL_R - half);
      // thrown hard into the rock wall
      if (this.state === 'knockdown' && Math.abs(this.vx) > 260 && !this.bounced) {
        this.bounced = true; this.bounceDir = dir;
        this.hp = Math.max(0, this.hp - 4);
        this.scene.fx('fx_debris', this.x + dir * 20, this.y - this.def.height * 0.6);
        this.scene.cameras.main.shake(140, 0.008);
        this.vx = 0; this.vy = 0;
        this.setState('wallbounce', 'wall-bounce');
      }
    }
    if (this.state === 'jump' && !this.airStrike) this.showJumpFrame();
  }

  sync() {
    if (this.state !== 'webbed') this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.setFlipX(this.facing < 0);
    this.shadow.setPosition(this.x, FLOOR_Y + 2);
    const air = (FLOOR_Y - this.y) / 200;
    this.shadow.setScale(1 - Math.min(air, 0.6)).setAlpha(0.45 - Math.min(air, 0.3));
    // oiled wrestlers shine
    if (this.oiledT > 0) this.sprite.setTint(Phaser.Display.Color.GetColor(255, 255, 200 + Math.round(Math.sin(this.scene.time.now / 90) * 40)));
    else if (this.state === 'webbed') this.sprite.setTint(0xe8e8f0);
    else this.sprite.clearTint();
    this.sprite.setAlpha(this.invulnT > 0 && this.state !== 'script' ? 0.6 + Math.sin(this.scene.time.now / 40) * 0.3 : 1);
  }

  // Pick the jump frame from the arc: takeoff, (push-off), rising...falling.
  // Works for the original 5 frames and the 8-frame smooth set.
  showJumpFrame() {
    const anim = this.scene.anims.get(`${this.cid}_jump`);
    const n = anim ? anim.frames.length : 5;
    let i;
    if (this.t < 0.07) i = 0;
    else if (n >= 8 && this.t < 0.13) i = 1;
    else {
      const start = n >= 8 ? 2 : 1; const end = n - 2;   // last frame is the landing
      const p = Phaser.Math.Clamp((this.vy + TUNING.jumpV) / (2 * TUNING.jumpV), 0, 0.999);
      i = Math.min(end, start + Math.floor(p * (end - start + 1)));
    }
    this.showFrame('jump', i);
  }

  land() {
    this.setState('land');
    if (this.hasLand) this.play('land', true);
    else { const a = this.scene.anims.get(`${this.cid}_jump`); this.showFrame('jump', a ? a.frames.length - 1 : 4); }
  }

  nearGrip() {
    for (const g of GRIPS) {
      const handY = this.y - this.def.height * 1.12;
      if (Math.abs(this.x - g.x) < 40 && handY < g.y + 70) return g;
    }
    return null;
  }

  hang(grip) {
    this.grip = grip; this.vx = 0; this.vy = 0;
    this.setState('hang', 'stalactite-hang');
  }

  wallJump(dir) {
    this.wallJumped = true;
    this.facing = dir; this.vx = dir * this.speed * 1.2; this.vy = -TUNING.jumpV * 0.9;
    this.setState('walljump', 'wall-jump');
  }

  jump(dir) {
    this.vy = -TUNING.jumpV; this.y -= 1;
    this.vx = dir * this.speed * 0.8 * this.facing;
    this.airStrike = false; this.wallJumped = false;
    this.setState('jump');
    this.showFrame('jump', 0);
  }

  strike(anim) {
    this.vx = 0; this.strikeAnim = anim;
    this.stamina = Math.max(0, this.stamina - STRIKES[anim].stam);
    this.setState('strike', anim);
  }

  goDown(face = 'lying-up') {
    this.vx = 0; this.vy = 0; this.y = FLOOR_Y; this.bounced = false;
    this.downTime = 0.75 + (5 - this.st.speed) * 0.16;
    this.setState('down', face);
    this.sprite.setAngle(0);
    if (this.hp <= 0) this.scene.onKO(this);
  }

  knockdown(fromFacing, power = 1) {
    this.vy = -380 * power; this.y -= 1; this.vx = fromFacing * 240 * power;
    this.facing = -fromFacing; this.bounced = false; this.downFace = 'lying-up';
    this.setState('knockdown', 'knockdown');
  }

  checkHit(opp, anim) {
    if (this.hitDone || !opp) return;
    const s = STRIKES[anim];
    const cur = this.sprite.anims.currentFrame;
    if (!cur || cur.index < s.active) return;
    this.hitDone = true;
    const reach = s.reach + this.st.reach * 6;
    const dx = (opp.x - this.x) * this.facing;
    const dy = Math.abs(opp.y - this.y);
    if (dx < -10 || dx > reach || dy > 110) return;
    if (!opp.hittable) return;
    opp.takeHit(this, anim);
  }

  takeHit(att, anim) {
    const s = STRIKES[anim];
    const heavy = anim !== 'strike-light';
    const hx = this.x - att.facing * 20; const hy = this.y - this.def.height * (anim === 'strike-low' ? 0.2 : 0.7);
    const canBlock = this.grounded && (this.state === 'block' || (this.state === 'crouch' && this.animKey === 'block-crouch'));
    const lowOk = anim !== 'strike-low' || this.state === 'crouch';
    const airOk = anim !== 'strike-air' || this.state === 'block';
    if (canBlock && lowOk && airOk) {
      this.vx = att.facing * 160; this.x += att.facing * 8;
      this.stamina = Math.max(0, this.stamina - 4);
      this.scene.fx('fx_hit-light', hx, hy, 0.6);
      this.scene.sfx('block');
      return;
    }
    const pow = 0.75 + att.st.power * 0.1;
    this.damage(Math.round(s.dmg * pow));
    this.scene.fx(heavy ? 'fx_hit-heavy' : 'fx_hit-light', hx, hy);
    this.scene.sfx(heavy ? 'hitHeavy' : 'hitLight');
    if (this.state === 'hang') { this.state = 'jump'; this.t = 0.1; }
    if (anim === 'strike-low' || anim === 'strike-air' || (heavy && !this.grounded)) {
      this.knockdown(att.facing, anim === 'strike-air' ? 1.1 : 0.7);
      this.scene.cameras.main.shake(90, 0.004);
    } else {
      this.stun = heavy ? 0.6 : 0.35; this.vx = att.facing * (heavy ? 200 : 120);
      this.setState('hit', heavy ? 'hit-high' : 'hit-low');
    }
    if (this.hp <= 0 && this.state !== 'knockdown') this.knockdown(att.facing, 0.8);
  }

  damage(n) {
    if (this.scene.practice) { this.hp = Math.max(1, this.hp - n); if (this.hp <= 1) this.hp = this.maxHp; return; }
    this.hp = Math.max(0, this.hp - n);
  }

  isPlaceholderFrame() {
    const f = this.sprite.frame;
    return f && f.texture.key.startsWith('ph:');
  }

  destroy() { this.sprite.destroy(); this.shadow.destroy(); }
}
