// The cave battleground. Uses stage art when it exists, simple shapes when not.
import { W, H, WALL_L, WALL_R, GRIPS, CHARACTERS } from './config.js';
import { maybeImage } from './assets.js';

export class Stage {
  constructor(scene, kingCid) {
    this.scene = scene;
    const art = scene.art;
    this.t = 0;
    const wall = maybeImage(scene, art, 'stage_cave_wall', W / 2, H / 2);
    if (wall) this.wall = wall.setDepth(0);
    else {
      const g = scene.add.graphics().setDepth(0);
      g.fillGradientStyle(0x2a120c, 0x2a120c, 0x633424, 0x633424, 1); g.fillRect(0, 0, W, H);
    }
    this.crystals = art.seq('stage_cave_crystals', 3).map((f) => scene.add.image(W / 2, H / 2, f.key, f.frame).setDepth(1).setAlpha(0));

    // crowd on the ledges
    this.crowd = art.seq('stage_cave_crowd', 2);
    this.cheerFrames = art.seq('stage_cave_crowd_cheer', 2);
    if (this.crowd.length) this.crowdImg = scene.add.image(W / 2, 330, this.crowd[0].key, this.crowd[0].frame).setOrigin(0.5, 1).setDepth(1).setAlpha(0.95);
    this.cheerT = 0;

    // banner of the tribe that rules the cave
    if (kingCid) {
      const ch = CHARACTERS[kingCid];
      const b = maybeImage(scene, art, `stage_cave_banner_0${ch.banner}`, W / 2, 30);
      if (b) b.setOrigin(0.5, 0).setDepth(2);
      else {
        const g = scene.add.graphics().setDepth(2);
        g.fillStyle(ch.palette.cloth, 1).fillRect(W / 2 - 34, 30, 68, 96);
        g.fillTriangle(W / 2 - 34, 126, W / 2 + 34, 126, W / 2, 106);
        g.lineStyle(3, 0x3a2018, 1).strokeRect(W / 2 - 34, 30, 68, 96);
        g.fillStyle(0xeea038, 1).fillCircle(W / 2, 70, 14);
        scene.add.text(W / 2, 70, ch.name[0], { font: 'bold 16px monospace', color: '#3a2018' }).setOrigin(0.5).setDepth(2);
      }
    }

    // torches
    this.torch = art.seq('stage_cave_torch', 4);
    this.torches = [130, W - 130].map((x) => {
      if (this.torch.length) return scene.add.image(x, 250, this.torch[0].key, this.torch[0].frame).setDepth(2);
      const glow = scene.add.circle(x, 238, 34, 0xffb347, 0.18).setDepth(2);
      scene.add.rectangle(x, 262, 8, 34, 0x633424).setDepth(2).setStrokeStyle(2, 0x3a2018);
      const flame = scene.add.ellipse(x, 238, 16, 26, 0xffb347).setDepth(2).setStrokeStyle(2, 0x3a2018);
      scene.tweens.add({ targets: [flame, glow], scaleX: 0.8, scaleY: 1.15, yoyo: true, repeat: -1, duration: 140 });
      return null;
    });

    // ceiling stalactites + the two grips wrestlers can hang from
    const st = maybeImage(scene, art, 'stage_cave_stalactites', W / 2, 0);
    if (st) st.setOrigin(0.5, 0).setDepth(4);
    const g = scene.add.graphics().setDepth(4);
    for (const gr of GRIPS) {
      if (!st) {
        g.fillStyle(0x9c4b2d, 1).fillTriangle(gr.x - 22, 0, gr.x + 22, 0, gr.x, gr.y + 26);
        g.lineStyle(3, 0x3a2018, 1).strokeTriangle(gr.x - 22, 0, gr.x + 22, 0, gr.x, gr.y + 26);
      }
      // worn grip band
      g.fillStyle(0xdc9544, 0.9).fillRect(gr.x - 9, gr.y - 6, 18, 8);
      g.lineStyle(2, 0x3a2018, 1).strokeRect(gr.x - 9, gr.y - 6, 18, 8);
    }

    // side rock walls
    for (const [name, x, ox] of [['stage_cave_wall-left', 0, 0], ['stage_cave_wall-right', W, 1]]) {
      const img = maybeImage(scene, art, name, x, 0);
      if (img) img.setOrigin(ox, 0).setDepth(5);
      else {
        const r = scene.add.graphics().setDepth(5);
        const x0 = ox ? WALL_R : 0;
        r.fillStyle(0x4a2216, 1).fillRect(x0, 0, WALL_L, H);
        r.lineStyle(3, 0x3a2018, 1).lineBetween(ox ? WALL_R : WALL_L, 0, ox ? WALL_R : WALL_L, H);
        for (let y = 40; y < H; y += 90) r.lineStyle(2, 0x2e140c, 1).lineBetween(x0 + 8, y, x0 + WALL_L - 10, y + 30);
      }
    }

    const ground = maybeImage(scene, art, 'stage_cave_ground', W / 2, 440);
    if (ground) ground.setOrigin(0.5, 0).setDepth(6);
    else scene.add.rectangle(0, 450, W, 90, 0x9c4b2d).setOrigin(0).setDepth(6).setStrokeStyle(4, 0x3a2018);
    const floor = maybeImage(scene, art, 'stage_cave_floor', W / 2, H);
    if (floor) floor.setOrigin(0.5, 1).setDepth(7);
    const fg = maybeImage(scene, art, 'stage_cave_foreground', W / 2, H);
    if (fg) fg.setOrigin(0.5, 1).setDepth(26);
    const vig = maybeImage(scene, art, 'stage_cave_vignette', W / 2, H / 2);
    if (vig) vig.setDepth(27);

    // dripping water
    this.drip = art.seq('stage_cave_drip', 3);
    scene.time.addEvent({ delay: 2600, loop: true, callback: () => this.dripOnce() });
  }

  dripOnce() {
    const sc = this.scene;
    const x = 120 + Math.random() * (W - 240);
    const d = this.drip.length
      ? sc.add.image(x, 110, this.drip[0].key, this.drip[0].frame).setDepth(3)
      : sc.add.ellipse(x, 110, 5, 8, 0xbfe3ff, 0.8).setDepth(3);
    sc.tweens.add({ targets: d, y: 460, duration: 900, ease: 'Quad.easeIn', delay: 300, onComplete: () => d.destroy() });
  }

  cheer() { this.cheerT = 2; }

  update(dt, avgX) {
    this.t += dt;
    if (this.wall) this.wall.x = W / 2 - (avgX - W / 2) * 0.06;
    if (this.crystals.length) {
      const p = (Math.sin(this.t * 1.5) + 1) / 2 * (this.crystals.length - 1);
      this.crystals.forEach((c, i) => c.setAlpha(Math.max(0, 1 - Math.abs(p - i))));
    }
    if (this.torch.length) {
      const i = Math.floor(this.t * 9) % this.torch.length;
      this.torches.forEach((t) => t && t.setTexture(this.torch[i].key, this.torch[i].frame));
    }
    if (this.crowdImg) {
      this.cheerT -= dt;
      const set = this.cheerT > 0 && this.cheerFrames.length ? this.cheerFrames : this.crowd;
      const i = Math.floor(this.t * (this.cheerT > 0 ? 6 : 1.5)) % set.length;
      this.crowdImg.setTexture(set[i].key, set[i].frame);
    }
  }
}
