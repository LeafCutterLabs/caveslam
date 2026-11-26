import { W, H, CHARACTERS } from '../config.js';
import { BODY, TITLE_FONT, MenuInput, background, setKing } from './common.js';

export class ResultScene extends Phaser.Scene {
  constructor() { super('Result'); }
  init(data) { this.d = data; }
  create() {
    const art = this.registry.get('art');
    background(this, art, 'stage_cave_wall');
    this.add.rectangle(0, 0, W, H, 0x000000, 0.35).setOrigin(0);
    const { winner, winnerIdx, cpu } = this.d;
    setKing(winner);
    const ch = CHARACTERS[winner];
    const ban = art.getAny(`stage_cave_banner_0${ch.banner}`);
    if (ban) this.add.image(W / 2, 20, ban.key, ban.frame).setOrigin(0.5, 0).setScale(1.2);
    const s = this.add.sprite(W / 2, 430, '__DEFAULT').setOrigin(0.5, 0.9375).setScale(1.6);
    s.play(`${winner}_win`);
    this.add.text(W / 2, 200, `${winnerIdx && cpu ? 'CPU' : `P${winnerIdx + 1}`} ${ch.name}`, { ...TITLE_FONT, fontFamily: 'Impact, Arial Black, sans-serif', fontSize: '44px', fontStyle: 'bold', color: winnerIdx ? '#9fe870' : '#ff9a52' }).setOrigin(0.5);
    this.add.text(W / 2, 250, `THE ${ch.name} TRIBE RULES THE CAVE!`, { ...BODY, font: 'bold 20px monospace', color: '#ffcf5a' }).setOrigin(0.5);
    this.add.text(W / 2, H - 20, 'GRAB rematch  ·  LIGHT character select  ·  HEAVY title', { ...BODY, font: '14px monospace' }).setOrigin(0.5, 1);
    this.menu = new MenuInput(this);
    this.t0 = this.time.now;
  }
  update() {
    const m = this.menu; m.update(); const cpu = this.d.cpu || null;
    if (this.time.now - this.t0 < 800) return;
    for (const p of [0, 1]) {
      if (m.pressed(p, 'grab')) return this.scene.start('Vs', { p1: this.d.p1, p2: this.d.p2, cpu });
      if (m.pressed(p, 'light')) return this.scene.start('Select', { practice: false, cpu });
      if (m.pressed(p, 'heavy')) return this.scene.start('Title');
    }
  }
}
