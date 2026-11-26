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
import { initTouch } from './touch.js';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: W,
  height: H,
  backgroundColor: '#1c0b06',
  pixelArt: false,
  antialias: true,
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  input: { gamepad: true, activePointers: 5 },
  scene: [],
});
// Phones: size the game to the part of the screen that is actually visible.
// Safari's 100vh includes the area under its toolbars, which pushed the bottom
// of the game (and the touch controls) off screen.
function fitToScreen() {
  const frame = document.getElementById('frame');
  const vv = window.visualViewport;
  if (frame && vv) {
    frame.style.width = `${Math.round(vv.width)}px`;
    frame.style.height = `${Math.round(vv.height)}px`;
    frame.style.top = `${Math.round(vv.offsetTop)}px`;
    frame.style.left = `${Math.round(vv.offsetLeft)}px`;
  }
  window.scrollTo(0, 0);
  game.scale.refresh();
}
const refit = () => { fitToScreen(); setTimeout(fitToScreen, 250); setTimeout(fitToScreen, 700); };
window.addEventListener('resize', refit);
window.addEventListener('orientationchange', refit);
if (window.visualViewport) { window.visualViewport.addEventListener('resize', refit); window.visualViewport.addEventListener('scroll', fitToScreen); }
document.addEventListener('fullscreenchange', refit);
refit();
initTouch(game);   // on-screen controls for phones (page elements over the game)

game.registry.set('showLabels', false);  // true = print the action name on placeholder frames
window.caveSlam = game;

// Ask the server which art files exist, then boot.
discoverAssets().then((discovery) => {
  game.registry.set('discovery', discovery);
  for (const [k, S] of [['Title', TitleScene], ['Select', SelectScene], ['Vs', VsScene], ['Fight', FightScene], ['Result', ResultScene], ['Settings', SettingsScene]]) game.scene.add(k, S, false);
  game.scene.add('Inspect', InspectScene, false);
  game.scene.add('Boot', BootScene, true);
});
