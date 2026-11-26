import { W, H } from '../config.js';
import { discoverAssets, queueAssets, ArtIndex, buildAnimations } from '../assets.js';

export class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  init() { this.discovery = this.registry.get('discovery'); }

  preload() {
    const bar = this.add.rectangle(W / 2 - 200, H / 2, 0, 16, 0xdc9544).setOrigin(0, 0.5);
    this.add.rectangle(W / 2, H / 2, 404, 20).setStrokeStyle(2, 0xf7dab5);
    const txt = this.add.text(W / 2, H / 2 + 30, 'Loading cave art...', { font: '16px monospace', color: '#f7dab5' }).setOrigin(0.5);
    this.load.on('progress', (p) => { bar.width = 400 * p; });
    this.load.on('loaderror', () => {});  // missing files become placeholders
    const info = queueAssets(this.load, this.discovery);
    this.registry.set('loadInfo', info);
    txt.setText(info.mode === 'listing' ? `Loading ${info.images} art files...` : 'Probing for art files...');
  }

  create() {
    const art = new ArtIndex(this);
    this.registry.set('art', art);
    buildAnimations(this, art);
    const q = new URLSearchParams(location.search);
    if (q.get('p1') || q.get('practice') !== null) this.scene.start('Fight', { p1: q.get('p1') || 'goblin', p2: q.get('p2') || 'dwarf', practice: q.get('practice') !== null, cpu: q.get('cpu') || null });
    else this.scene.start('Title');
  }
}
