import { W, H } from './config.js';
import { discoverAssets } from './assets.js';
import { BootScene } from './scenes/BootScene.js';
import { TitleScene } from './scenes/TitleScene.js';
import { SelectScene } from './scenes/SelectScene.js';
import { VsScene } from './scenes/VsScene.js';
import { FightScene } from './scenes/FightScene.js';
import { ResultScene } from './scenes/ResultScene.js';
import { InspectScene } from './scenes/InspectScene.js';
import { SettingsScene } from './scenes/SettingsScene.js';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: W,
  height: H,
  backgroundColor: '#1c0b06',
  pixelArt: false,
  antialias: true,
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  input: { gamepad: true },
  scene: [],
});
game.registry.set('showLabels', false);  // true = print the action name on placeholder frames
window.caveSlam = game;

// Ask the server which art files exist, then boot.
discoverAssets().then((discovery) => {
  game.registry.set('discovery', discovery);
  for (const [k, S] of [['Title', TitleScene], ['Select', SelectScene], ['Vs', VsScene], ['Fight', FightScene], ['Result', ResultScene], ['Settings', SettingsScene]]) game.scene.add(k, S, false);
  game.scene.add('Inspect', InspectScene, false);
  game.scene.add('Boot', BootScene, true);
});
