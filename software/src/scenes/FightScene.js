// The match: two wrestlers, best of three rounds, KO or pinfall, cave events.
import { W, H, FLOOR_Y, TUNING, CHARACTERS, PLAYER_COLORS } from '../config.js';
import { Fighter } from '../fighter.js';
import { PlayerInput } from '../input.js';
import { CpuInput } from '../cpu.js';
import { GrappleManager } from '../grapple.js';
import { CaveEvents } from '../events.js';
import { Stage } from '../stage.js';
import { getKing } from './common.js';
import { BoxDebug } from '../hitboxes.js';

const EMPTY = { state: {}, pressed: {} };
const TXT = { font: 'bold 14px monospace', color: '#f7dab5', stroke: '#3a2018', strokeThickness: 4 };

export class FightScene extends Phaser.Scene {
  constructor() { super('Fight'); }

  init(data) {
    this.cids = [data.p1 || 'goblin', data.p2 || 'dwarf'];
    this.practice = !!data.practice;
    this.cpu = data.cpu || null;   // CPU difficulty for player 2, or null
  }

  create() {
    this.art = this.registry.get('art');
    this.stage = new Stage(this, getKing());
    this.fighters = [
      new Fighter(this, this.cids[0], 300, 1, 0),
      new Fighter(this, this.cids[1], W - 300, -1, 1),
    ];
    this.inputs = [new PlayerInput(this, 0), this.cpu ? new CpuInput(this, 1, this.cpu) : new PlayerInput(this, 1)];
    this.grapple = new GrappleManager(this);
    this.caveEvents = new CaveEvents(this);
    this.wins = [0, 0];
    this.round = 1;
    this.paused = false;
    this.buildHud();

    const kb = this.input.keyboard;
    kb.on('keydown-ESC', () => this.togglePause());
    kb.on('keydown-Q', () => { if (this.paused) this.quit(); });
    if (this.practice) {
      kb.on('keydown-E', () => this.caveEvents.trigger());
      kb.on('keydown-ONE', () => this.caveEvents.trigger('rumble'));
      kb.on('keydown-TWO', () => this.caveEvents.trigger('spider'));
      kb.on('keydown-THREE', () => this.caveEvents.trigger('oil'));
      this.boxDebug = new BoxDebug(this);
      kb.on('keydown-B', () => this.boxDebug.toggle());
      kb.on('keydown-I', () => { this.scene.pause(); this.scene.launch('Inspect', { cid: this.fighters[0].cid, returnTo: 'Fight' }); });
    }
    this.startRound();
  }

  // ---------- helpers used by fighters / grapples / events ----------
  inputOf(f) { return this.inputs[f.idx]; }

  dirOf(f) {
    const s = this.inputs[f.idx].state;
    const fwd = f.facing > 0 ? s.right : s.left; const back = f.facing > 0 ? s.left : s.right;
    return s.down ? 'down' : fwd ? 'fwd' : back ? 'back' : 'neutral';
  }

  fx(name, x, y, scale = 1) {
    const a = this.anims.get(name);
    if (!a) return;
    const s = this.add.sprite(x, y, a.frames[0].textureKey, a.frames[0].textureFrame).setDepth(20).setScale(scale);
    s.play(name);
    s.once('animationcomplete', () => s.destroy());
  }

  sfx(key) {
    // Plays a sound if one with this key has been loaded (no audio exists yet).
    if (this.cache.audio && this.cache.audio.exists(key)) this.sound.play(key);
  }

  callout(text, x, y, color = '#f7dab5', dur = 0.8) {
    const t = this.add.text(Phaser.Math.Clamp(x, 90, W - 90), y, text, { ...TXT, font: 'bold 18px monospace', color }).setOrigin(0.5).setDepth(70);
    this.tweens.add({ targets: t, y: y - 30, alpha: 0, duration: dur * 1000, ease: 'Quad.easeIn', onComplete: () => t.destroy() });
  }

  banner(key, text, dur = 1, y = H * 0.4) {
    const f = this.art.getAny(key);
    const obj = f ? this.add.image(W / 2, y, f.key, f.frame)
      : this.add.text(W / 2, y, text, { fontFamily: 'Impact, Arial Black, sans-serif', fontSize: '56px', fontStyle: 'bold', color: '#ffcf5a', stroke: '#3a2018', strokeThickness: 10 }).setOrigin(0.5);
    obj.setDepth(80).setScale(0.4).setAlpha(0);
    this.tweens.add({ targets: obj, scale: 1, alpha: 1, duration: 180, ease: 'Back.easeOut' });
    this.tweens.add({ targets: obj, alpha: 0, delay: dur * 1000, duration: 250, onComplete: () => obj.destroy() });
    return obj;
  }

  flashPerfect(x, y) {
    const fr = this.art.seq('ui_timing-perfect', 2);
    const o = fr.length ? this.add.image(x, y, fr[0].key, fr[0].frame) : this.add.circle(x, y, 40, 0xffffff, 0.8);
    o.setDepth(36);
    this.tweens.add({ targets: o, scale: 1.8, alpha: 0, duration: 300, onComplete: () => o.destroy() });
  }

  impact(x, y, big) {
    this.fx('fx_dust', x, y - 30, big ? 1.2 : 0.9);
    if (big) this.fx('fx_hit-heavy', x, y - 50, 0.8);
    this.cameras.main.shake(big ? 220 : 140, big ? 0.012 : 0.007);
    this.stage.cheer();
    this.sfx('slam');
  }

  pinNumber(n) { this.banner(`ui_text-pin-${n}`, String(n), 0.6, H * 0.36); }

  dizzyBats(f) {
    const a = this.anims.get('fx_dizzy-bats');
    const s = this.add.sprite(f.x, f.y - f.def.height, a.frames[0].textureKey, a.frames[0].textureFrame).setDepth(21);
    s.play('fx_dizzy-bats');
    const ev = this.time.addEvent({ delay: 16, loop: true, callback: () => {
      s.setPosition(f.sprite.x, f.y - f.def.height - 8);
      if (f.state !== 'dizzy') { s.destroy(); ev.remove(); }
    } });
  }

  // ---------- HUD ----------
  buildHud() {
    this.hudG = this.add.graphics().setDepth(90);
    const art = this.art;
    this.hud = this.fighters.map((f, i) => {
      const left = i === 0;
      const x = left ? 20 : W - 20;
      const o = {};
      const icon = art.getAny(`${f.cid}_portrait_icon`);
      const ix = left ? x + 24 : x - 24;
      if (icon) o.icon = this.add.image(ix, 64, icon.key, icon.frame).setDisplaySize(44, 44).setDepth(91).setFlipX(!left);
      o.name = this.add.text(left ? x + 52 : x - 52, 50, `${i && this.cpu ? 'CPU' : `P${i + 1}`} ${f.def.name}`, { ...TXT, color: i ? '#9fe870' : '#ff9a52' }).setOrigin(left ? 0 : 1, 0).setDepth(91);
      const frame = art.getAny('ui_healthbar_frame');
      if (frame) o.frame = this.add.image(left ? x : x, 24, frame.key, frame.frame).setOrigin(left ? 0 : 1, 0.5).setDepth(92).setFlipX(!left).setScale(0.95);
      const fill = art.getAny('ui_healthbar_fill'); const fillLow = art.getAny('ui_healthbar_fill-low');
      if (fill) { o.fill = this.add.image(left ? x + 12 : x - 12, 24, fill.key, fill.frame).setOrigin(left ? 0 : 1, 0.5).setDepth(91).setFlipX(!left); o.fillRefs = [fill, fillLow || fill]; }
      return o;
    });
    this.timerText = this.add.text(W / 2, 30, '99', { font: 'bold 30px monospace', color: '#ffcf5a', stroke: '#3a2018', strokeThickness: 6 }).setOrigin(0.5).setDepth(92);
    const tf = art.getAny('ui_timer_frame');
    if (tf) this.add.image(W / 2, 30, tf.key, tf.frame).setDepth(91);
    this.tags = this.fighters.map((f, i) => {
      const tg = i && this.cpu ? null : art.getAny(`ui_tag-p${i + 1}`);
      return tg ? this.add.image(0, 0, tg.key, tg.frame).setDepth(30)
        : this.add.text(0, 0, i && this.cpu ? 'CPU' : `P${i + 1}`, { ...TXT, color: i ? '#9fe870' : '#ff9a52' }).setOrigin(0.5).setDepth(30);
    });
    if (this.practice) {
      this.add.text(W / 2, H - 6, 'PRACTICE  E random event (1 cave-in, 2 spider, 3 oil)  B hitboxes  I frame inspector  Esc pause/quit', { font: '12px monospace', color: '#f7dab5', stroke: '#3a2018', strokeThickness: 3 }).setOrigin(0.5, 1).setDepth(92);
      this.timerText.setText('--');
    }
  }

  drawHud() {
    const g = this.hudG; g.clear();
    this.fighters.forEach((f, i) => {
      const left = i === 0; const o = this.hud[i];
      const bw = 360; const x = left ? 32 : W - 32 - bw;
      const frac = Math.max(0, f.hp / f.maxHp);
      if (!o.frame) { g.fillStyle(0x3a2018, 1).fillRect(x - 4, 14, bw + 8, 22); g.fillStyle(0x58261b, 1).fillRect(x, 18, bw, 14); }
      if (o.fill) {
        const ref = frac < 0.3 ? o.fillRefs[1] : o.fillRefs[0];
        o.fill.setTexture(ref.key, ref.frame);
        const fw = o.fill.frame.realWidth;
        o.fill.setCrop(left ? 0 : fw * (1 - frac), 0, fw * frac, o.fill.frame.realHeight);
        if (!left) o.fill.setCrop(0, 0, fw * frac, o.fill.frame.realHeight);
      } else {
        g.fillStyle(frac < 0.3 ? 0xc0392b : 0xdc9544, 1).fillRect(left ? x : x + bw * (1 - frac), 18, bw * frac, 14);
      }
      // stamina
      const sw = 200; const sx = left ? 32 : W - 32 - sw;
      g.fillStyle(0x3a2018, 1).fillRect(sx - 2, 38, sw + 4, 9);
      g.fillStyle(0xf7dab5, 1).fillRect(left ? sx : sx + sw * (1 - f.stamina / 100), 40, sw * f.stamina / 100, 5);
      // round wins
      for (let k = 0; k < TUNING.roundsToWin; k++) {
        const px = left ? 260 + k * 18 : W - 260 - k * 18;
        g.fillStyle(k < this.wins[i] ? 0xffcf5a : 0x3a2018, 1).fillCircle(px, 60, 6);
        g.lineStyle(2, 0x3a2018, 1).strokeCircle(px, 60, 6);
      }
      if (f.oiledT > 0) { g.fillStyle(0xffe680, 1).fillRect(left ? 32 : W - 32 - 60 * f.oiledT / TUNING.oilTime, 75, 60 * f.oiledT / TUNING.oilTime, 4); }
      this.tags[i].setPosition(f.sprite.x, Math.max(16, f.y - f.def.height - 18));
    });
  }

  // ---------- rounds ----------
  startRound() {
    this.roundOver = false;
    this.phase = 'intro';
    this.timeLeft = TUNING.roundTime;
    this.grapple.breakUp();
    this.caveEvents.clearAll();
    const [a, b] = this.fighters;
    a.x = 300; b.x = W - 300;
    for (const f of this.fighters) {
      f.y = FLOOR_Y; f.vx = f.vy = 0; f.hp = f.maxHp; f.stamina = 100; f.oiledT = 0; f.webbedT = 0; f.invulnT = 0;
      f.sprite.setOrigin(0.5, 0.9375).setAngle(0);
      f.setState('frozen', 'idle');
    }
    a.facing = 1; b.facing = -1;
    if (this.practice) { this.phase = 'fight'; for (const f of this.fighters) f.setState('idle', 'idle'); return; }
    this.banner(`ui_text-round${Math.min(this.round, 3)}`, `ROUND ${this.round}`, 1.0);
    this.time.delayedCall(1300, () => {
      this.banner('ui_text-fight', 'FIGHT!', 0.7);
      this.phase = 'fight';
      for (const f of this.fighters) f.setState('idle', 'idle');
    });
  }

  onKO(victim) {
    if (this.roundOver) return;
    if (this.practice) { victim.hp = victim.maxHp; return; }
    this.roundOver = true; this.phase = 'over';
    this.grapple.breakUp();
    victim.setState('ko', 'ko');
    this.banner('ui_text-ko', 'K.O.', 1.6);
    this.cameras.main.shake(300, 0.012);
    const winner = this.fighters.find((f) => f !== victim);
    this.time.delayedCall(1400, () => this.endRound(winner));
  }

  onPinfall(pinner, vic) {
    if (this.practice) {
      this.callout('PINFALL!', vic.x, FLOOR_Y - 160, '#ffcf5a', 1.2);
      vic.goDown('lying-up'); pinner.setState('idle', 'idle');
      return;
    }
    this.roundOver = true; this.phase = 'over';
    vic.setState('ko', 'thrown_pinned');
    this.banner('ui_text-pin-3', 'PINFALL!', 1.6);
    this.time.delayedCall(1000, () => this.endRound(pinner));
  }

  timeUp() {
    this.roundOver = true; this.phase = 'over';
    this.grapple.breakUp();
    const [a, b] = this.fighters;
    const fa = a.hp / a.maxHp; const fb = b.hp / b.maxHp;
    this.banner(null, 'TIME!', 1.4);
    this.time.delayedCall(1300, () => this.endRound(fa === fb ? null : fa > fb ? a : b));
  }

  endRound(winner) {
    for (const f of this.fighters) if (f.state !== 'ko' && f !== winner) { f.sprite.setAngle(0); }
    if (winner) {
      this.wins[winner.idx]++;
      winner.y = FLOOR_Y; winner.sprite.setOrigin(0.5, 0.9375).setAngle(0);
      winner.setState('win', 'win');
      this.callout(`${winner.def.name} WINS THE ROUND`, W / 2, H * 0.55, '#ffcf5a', 1.8);
    } else this.callout('DRAW', W / 2, H * 0.55, '#f7dab5', 1.6);
    this.time.delayedCall(2300, () => {
      const champ = this.wins.findIndex((w) => w >= TUNING.roundsToWin);
      if (champ >= 0) {
        this.scene.start('Result', { winner: this.cids[champ], loser: this.cids[1 - champ], winnerIdx: champ, p1: this.cids[0], p2: this.cids[1], cpu: this.cpu });
        return;
      }
      this.round++;
      this.startRound();
    });
  }

  togglePause() {
    this.paused = !this.paused;
    if (this.paused) {
      this.pauseBox = this.add.container(0, 0, [
        this.add.rectangle(0, 0, W, H, 0x000000, 0.6).setOrigin(0),
        this.add.text(W / 2, H / 2, 'PAUSED\n\nEsc or II  resume\nQ          quit to title', { font: 'bold 22px monospace', color: '#f7dab5', align: 'center', stroke: '#3a2018', strokeThickness: 5 }).setOrigin(0.5),
      ]).setDepth(200);
      this.tweens.pauseAll(); this.time.paused = true;
    } else {
      if (this.pauseBox) this.pauseBox.destroy();
      this.tweens.resumeAll(); this.time.paused = false;
    }
  }

  quit() { this.time.paused = false; this.tweens.resumeAll(); this.scene.start('Title'); }

  // ---------- main loop ----------
  update(time, deltaMs) {
    if (this.paused) return;
    const dt = Math.min(deltaMs / 1000, 1 / 20);
    this.inputs.forEach((inp) => inp.update());
    const [a, b] = this.fighters;
    const live = this.phase === 'fight';
    a.update(dt, live ? this.inputs[0] : EMPTY, b);
    b.update(dt, live ? this.inputs[1] : EMPTY, a);
    this.grapple.update(dt);
    // bodies don't overlap on the ground
    if (a.grounded && b.grounded && a.state !== 'script' && b.state !== 'script' && !a.isDown && !b.isDown) {
      const minD = 50; const d = b.x - a.x;
      if (Math.abs(d) < minD) { const push = (minD - Math.abs(d)) / 2 * Math.sign(d || 1); a.x -= push; b.x += push; a.sync(); b.sync(); }
    }
    this.stage.update(dt, (a.x + b.x) / 2);
    this.caveEvents.update(dt, live && !this.grapple.active);
    if (live && !this.practice) {
      this.timeLeft -= dt;
      if (this.timeLeft <= 0) { this.timeLeft = 0; this.timeUp(); }
      this.timerText.setText(String(Math.ceil(this.timeLeft)));
    }
    this.drawHud();
    if (this.boxDebug) this.boxDebug.draw(this.fighters);
  }
}
