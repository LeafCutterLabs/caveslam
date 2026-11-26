// Random cave events (spec section 13): cave-in, cave spider, baby oil.
// One at a time, every 20-40 seconds.
import { W, FLOOR_Y, TUNING, WALL_L, WALL_R } from './config.js';

const rand = (a, b) => a + Math.random() * (b - a);

function canvasTex(scene, key, w, h, draw) {
  if (scene.textures.exists(key)) return;
  const t = scene.textures.createCanvas(key, w, h);
  draw(t.getContext());
  t.refresh();
}

export class CaveEvents {
  constructor(scene) {
    this.scene = scene;
    this.next = rand(TUNING.eventMin, TUNING.eventMax);
    this.busy = false;
    this.thread = scene.add.graphics().setDepth(19);
    this.overlays = new Map();   // fighter -> {web, shine}
    this.makePlaceholders();
    scene.events.on('webfree', (f) => this.webFree(f));
  }

  makePlaceholders() {
    const s = this.scene;
    canvasTex(s, 'ph:stalactite', 60, 160, (c) => {
      c.beginPath(); c.moveTo(6, 0); c.lineTo(54, 0); c.lineTo(32, 156); c.closePath();
      c.fillStyle = '#9c4b2d'; c.fill(); c.lineWidth = 4; c.strokeStyle = '#3a2018'; c.stroke();
      c.beginPath(); c.moveTo(18, 10); c.lineTo(30, 120); c.lineWidth = 4; c.strokeStyle = '#df7f42'; c.stroke();
    });
    canvasTex(s, 'ph:spider', 120, 160, (c) => {
      c.lineWidth = 5; c.strokeStyle = '#3a2018'; c.lineCap = 'round';
      for (let k = 0; k < 4; k++) for (const d of [-1, 1]) {
        c.beginPath(); c.moveTo(60, 80); c.lineTo(60 + d * 38, 62 + k * 12); c.lineTo(60 + d * 54, 92 + k * 14); c.stroke();
      }
      c.beginPath(); c.ellipse(60, 70, 26, 22, 0, 0, Math.PI * 2); c.fillStyle = '#4a2338'; c.fill(); c.stroke();
      c.beginPath(); c.ellipse(60, 100, 18, 15, 0, 0, Math.PI * 2); c.fill(); c.stroke();
      for (const x of [52, 68]) { c.beginPath(); c.arc(x, 102, 4, 0, Math.PI * 2); c.fillStyle = '#ffc23a'; c.fill(); }
    });
    canvasTex(s, 'ph:oil', 40, 60, (c) => {
      c.fillStyle = '#f2e6d0'; c.strokeStyle = '#3a2018'; c.lineWidth = 3;
      c.fillRect(15, 2, 10, 10); c.strokeRect(15, 2, 10, 10);
      c.beginPath(); c.roundRect ? c.roundRect(5, 12, 30, 45, 10) : c.rect(5, 12, 30, 45); c.fillStyle = '#f5c542'; c.fill(); c.stroke();
      c.fillStyle = '#f29ab5'; c.fillRect(9, 26, 22, 16);
      c.fillStyle = 'rgba(255,255,255,0.8)'; c.fillRect(10, 16, 4, 30);
    });
  }

  frames(name, n, fallback) {
    const art = this.scene.art.seq(name, n);
    return art.length ? art : [{ key: fallback }];
  }

  update(dt, live) {
    // overlays follow their wrestlers
    for (const [f, o] of this.overlays) {
      if (o.web) o.web.setPosition(f.sprite.x, f.y - 6).setFlipX(f.facing < 0);
      if (o.shine) {
        o.shine.setPosition(f.sprite.x, f.y - 6).setVisible(f.oiledT > 0);
        if (f.oiledT <= 0) { o.shine.destroy(); o.shine = null; }
      }
    }
    for (const f of this.scene.fighters) {
      if (f.oiledT > 0 && !(this.overlays.get(f) || {}).shine) {
        const o = this.overlays.get(f) || {};
        const a = this.scene.anims.get('fx_oil-shine');
        o.shine = this.scene.add.sprite(f.x, f.y, a.frames[0].textureKey, a.frames[0].textureFrame).setOrigin(0.5, 0.9375).setDepth(12).setAlpha(0.9);
        o.shine.play('fx_oil-shine');
        this.overlays.set(f, o);
      }
    }
    if (this.bottle) this.updateBottle(dt);
    if (!live || this.busy) return;
    this.next -= dt;
    if (this.next <= 0) this.trigger();
  }

  trigger(type) {
    if (this.busy) return;
    const types = ['rumble', 'spider', 'oil'];
    type = type || types[Math.floor(Math.random() * types.length)];
    this.busy = true;
    this.next = rand(TUNING.eventMin, TUNING.eventMax);
    if (type === 'rumble') this.rumble();
    else if (type === 'spider') this.spider();
    else this.oil();
  }

  done() { this.busy = false; }

  // ---------- cave-in ----------
  rumble() {
    const sc = this.scene;
    sc.banner('ui_text-rumble', 'CAVE-IN!', 1.0);
    sc.cameras.main.shake(1500, 0.005);
    const xs = sc.fighters.map((f) => Phaser.Math.Clamp(f.x + rand(-25, 25), WALL_L + 40, WALL_R - 40));
    xs.push(rand(WALL_L + 60, WALL_R - 60), rand(WALL_L + 60, WALL_R - 60));
    const hitOnce = new Set();
    xs.forEach((x, i) => {
      const delay = i * 130;
      sc.time.delayedCall(delay, () => {
        const wa = sc.anims.get('fx_warning-shadow').frames[0];
        const sh = sc.add.sprite(x, FLOOR_Y + 2, wa.textureKey, wa.textureFrame).setDepth(8).setScale(0.3).setAlpha(0.8);
        sh.play('fx_warning-shadow');
        sc.tweens.add({ targets: sh, scale: 1, duration: 1100 });
        sc.time.delayedCall(1100, () => {
          const fr = this.frames('stage_cave_stalactite-fall', 3, 'ph:stalactite');
          const st = sc.add.image(x, -90, fr[0].key, fr[0].frame).setOrigin(0.5, 1).setDepth(18);
          if (fr[1]) st.setTexture(fr[1].key, fr[1].frame);
          sc.tweens.add({
            targets: st, y: FLOOR_Y + 10, duration: 280, ease: 'Quad.easeIn',
            onComplete: () => {
              sh.destroy(); st.destroy();
              sc.fx('fx_rock-shatter', x, FLOOR_Y - 40);
              sc.sfx('hitHeavy');
              for (const f of sc.fighters) {
                if (hitOnce.has(f) || Math.abs(f.x - x) > 46 || f.state === 'ko' || f.state === 'win') continue;
                hitOnce.add(f);
                this.stalactiteHits(f);
              }
              if (i === xs.length - 1) this.done();
            },
          });
        });
      });
    });
  }

  stalactiteHits(f) {
    const sc = this.scene;
    if (sc.grapple.busy(f)) sc.grapple.breakUp();
    const guarded = f.state === 'block' || (f.state === 'crouch' && f.animKey === 'block-crouch');
    if (guarded) {
      f.damage(3);
      if (f.state === 'block') f.play('block-overhead', true);
      sc.fx('fx_rock-shatter', f.x, f.y - f.def.height - 10, 0.7);
      sc.callout('BLOCKED', f.x, f.y - f.def.height - 30, '#f7dab5');
      return;
    }
    if (f.state === 'down') { f.damage(5); return; }
    f.damage(9);
    if (f.state === 'webbed') this.webFree(f);
    f.knockdown(Math.random() < 0.5 ? 1 : -1, 0.5);
    if (f.hp <= 0) f.downFace = 'lying-up';
  }

  // ---------- cave spider ----------
  spider() {
    const sc = this.scene;
    const live = sc.fighters.filter((f) => f.state !== 'ko');
    const target = live[Math.floor(Math.random() * live.length)];
    const x = Phaser.Math.Clamp(target.x + rand(-60, 60), WALL_L + 60, WALL_R - 60);
    const desc = this.frames('stage_cave_spider_descend', 4, 'ph:spider');
    const shoot = this.frames('stage_cave_spider_shoot', 3, 'ph:spider');
    const climb = this.frames('stage_cave_spider_climb', 2, 'ph:spider');
    const sp = sc.add.image(x, -170, desc[0].key, desc[0].frame).setOrigin(0.5, 0).setDepth(19);
    const cycle = (fr, ms) => { let i = 0; return sc.time.addEvent({ delay: ms, loop: true, callback: () => { i = (i + 1) % fr.length; sp.setTexture(fr[i].key, fr[i].frame); } }); };
    let anim = cycle(desc, 110);
    const drawThread = () => { this.thread.clear().lineStyle(2, 0xf4f1ea, 0.8).lineBetween(x, 0, x, sp.y + 10); };
    sc.callout('CAVE SPIDER!', x, 60, '#d9b3ff');
    sc.tweens.add({
      targets: sp, y: 40, duration: 1000, ease: 'Sine.easeOut', onUpdate: drawThread,
      onComplete: () => {
        anim.remove(); anim = cycle(shoot, 150);
        sc.time.delayedCall(330, () => {
          const aimX = target.x; const aimY = target.y - target.def.height * 0.55;
          const wf = sc.anims.get('fx_web-shot').frames[0];
          const shot = sc.add.sprite(x, sp.y + 120, wf.textureKey, wf.textureFrame).setDepth(19);
          shot.play({ key: 'fx_web-shot', repeat: -1 });
          sc.tweens.add({
            targets: shot, x: aimX, y: aimY, duration: 380,
            onComplete: () => {
              shot.destroy();
              const ok = Math.abs(target.x - aimX) < 60 && target.invulnT <= 0 && !['script', 'down', 'ko', 'win', 'knockdown', 'getup'].includes(target.state);
              if (ok) this.web(target);
              else sc.callout('MISSED!', aimX, aimY - 40, '#d9b3ff');
            },
          });
          anim.remove(); anim = cycle(climb, 140);
          sc.tweens.add({ targets: sp, y: -180, duration: 900, delay: 300, onUpdate: drawThread, onComplete: () => { anim.remove(); sp.destroy(); this.thread.clear(); this.done(); } });
        });
      },
    });
  }

  web(f) {
    const sc = this.scene;
    f.webbedT = TUNING.webTime; f.vx = 0; f.vy = 0; f.y = FLOOR_Y; f.sprite.setAngle(0);
    f.setState('webbed', 'webbed');
    const a = sc.anims.get('fx_web-wrap').frames[0];
    const o = this.overlays.get(f) || {};
    if (o.web) o.web.destroy();
    o.web = sc.add.sprite(f.x, f.y, a.textureKey, a.textureFrame).setOrigin(0.5, 0.9375).setDepth(12);
    this.overlays.set(f, o);
    sc.callout('WEBBED! MASH!', f.x, f.y - f.def.height - 40, '#f4f1ea');
  }

  webFree(f) {
    const o = this.overlays.get(f);
    if (o && o.web) {
      const fr = this.scene.art.get('fx_web-wrap_03');
      if (fr) o.web.setTexture(fr.key, fr.frame);
      const w = o.web; o.web = null;
      this.scene.tweens.add({ targets: w, alpha: 0, duration: 250, onComplete: () => w.destroy() });
    }
  }

  // ---------- baby oil ----------
  oil() {
    const sc = this.scene;
    const fr = this.frames('stage_item_oil-bottle', 2, 'ph:oil');
    const x = rand(WALL_L + 80, WALL_R - 80);
    const b = sc.add.image(x, -60, fr[0].key, fr[0].frame).setOrigin(0.5, 1).setDepth(11);
    this.bottle = { img: b, fr, t: 0, landed: false };
    sc.callout('BABY OIL!', x, 70, '#ffe680');
    sc.tweens.add({ targets: b, y: FLOOR_Y, duration: 600, ease: 'Bounce.easeOut', onComplete: () => { if (this.bottle) this.bottle.landed = true; } });
  }

  updateBottle(dt) {
    const B = this.bottle; const sc = this.scene;
    B.t += dt;
    const i = Math.floor(B.t * 4) % B.fr.length;
    B.img.setTexture(B.fr[i].key, B.fr[i].frame);
    if (B.fr.length === 1) B.img.setAngle(Math.sin(B.t * 6) * 6);
    if (B.landed) {
      for (const f of sc.fighters) {
        if (f.neutral && f.grounded && Math.abs(f.x - B.img.x) < 40) {
          B.img.destroy(); this.bottle = null;
          f.setState('oilapply', 'oil-apply');
          sc.fx('fx_oil-splash', f.x, f.y - f.def.height * 0.6);
          sc.banner('ui_text-oiled', `${f.def.name} OILED UP!`, 1.0);
          this.done();
          return;
        }
      }
    }
    if (B.t > 12) { const img = B.img; this.bottle = null; sc.tweens.add({ targets: img, alpha: 0, duration: 400, onComplete: () => img.destroy() }); this.done(); }
  }

  clearAll() {
    for (const [, o] of this.overlays) { if (o.web) o.web.destroy(); if (o.shine) o.shine.destroy(); }
    this.overlays.clear();
    if (this.bottle) { this.bottle.img.destroy(); this.bottle = null; }
    this.busy = false;
  }
}
