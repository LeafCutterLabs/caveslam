import { W, H, CHARACTERS } from '../config.js';
import { BODY, TITLE_FONT, wrestlerPic, MenuInput } from './common.js';

export class VsScene extends Phaser.Scene {
  constructor() { super('Vs'); }
  init(data) { this.data2 = data; }
  create() {
    const art = this.registry.get('art');
    const bg = art.getAny('screen_vs_bg');
    if (bg) this.add.image(W / 2, H / 2, bg.key, bg.frame);
    else {
      const g = this.add.graphics();
      g.fillStyle(0x4a2216, 1).fillRect(0, 0, W, H);
      g.fillStyle(0x2a120c, 1).fillTriangle(W * 0.58, 0, W, 0, W, H).fillTriangle(W * 0.58, 0, W, H, W * 0.42, H);
      g.lineStyle(8, 0xffb347, 1).lineBetween(W * 0.58, 0, W * 0.42, H);
    }
    const { p1, p2 } = this.data2;
    const hasVs = (c) => !!art.getAny(`${c}_portrait_vs`);
    const a = wrestlerPic(this, art, p1, 'vs', 220, hasVs(p1) ? 280 : 330, hasVs(p1) ? 400 : 300);
    const b = wrestlerPic(this, art, p2, 'vs', W - 220, hasVs(p2) ? 280 : 330, hasVs(p2) ? 400 : 300).setFlipX(true);
    a.x -= 400; b.x += 400;
    this.tweens.add({ targets: a, x: a.x + 400, duration: 350, ease: 'Back.easeOut' });
    this.tweens.add({ targets: b, x: b.x - 400, duration: 350, ease: 'Back.easeOut' });
    this.add.text(220, H - 50, CHARACTERS[p1].name, { ...TITLE_FONT, fontFamily: 'Impact, Arial Black, sans-serif', fontSize: '30px', fontStyle: 'bold', color: '#ff9a52' }).setOrigin(0.5);
    this.add.text(W - 220, H - 50, CHARACTERS[p2].name, { ...TITLE_FONT, fontFamily: 'Impact, Arial Black, sans-serif', fontSize: '30px', fontStyle: 'bold', color: '#9fe870' }).setOrigin(0.5);
    const vs = this.add.text(W / 2, H / 2, 'VS', { ...TITLE_FONT, fontFamily: 'Impact, Arial Black, sans-serif', fontSize: '110px', fontStyle: 'bold' }).setOrigin(0.5).setScale(3).setAlpha(0);
    this.tweens.add({ targets: vs, scale: 1, alpha: 1, duration: 300, delay: 300, ease: 'Back.easeOut' });
    this.menu = new MenuInput(this);
    this.time.delayedCall(2400, () => this.go());
  }
  go() { if (!this.gone) { this.gone = true; this.scene.start('Fight', this.data2); } }
  update() { this.menu.update(); if (this.time.now > 600 && (this.menu.confirm(0) || this.menu.confirm(1))) this.go(); }
}
