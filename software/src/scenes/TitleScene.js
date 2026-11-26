import { W, H } from '../config.js';
import { MenuInput, TITLE_FONT, BODY, background, getKing } from './common.js';
import { CHARACTERS } from '../config.js';
import { BUTTONS, loadBindings, keyLabel } from '../input.js';

const ITEMS = ['2 PLAYER FIGHT', 'PRACTICE', 'SETTINGS: KEYS', 'FRAME INSPECTOR', 'CONTROLS'];
const TIPS = [
  'Grab near opponent: lock-up. Press GRAB again when the ring closes.',
  '  Hold forward = signature slam, back = slam behind / 2nd signature,',
  '  down = roll-up pin, nothing = body slam. Perfect press as defender = REVERSAL.',
  'Strikes stun: grab a stunned, dizzy or webbed opponent for a free throw.',
  'Downed opponent: Down+Grab = pin (both mash!), Grab = pick them up.',
  'Jump under a worn stalactite and press Up to hang. Up at a wall = wall jump.',
  'Mole Man: Down+Heavy = Boulder Roll.  Goblin: Grab while hanging = Stalactite Drop.',
];
const PAD = { left: 'Stick/d-pad', right: 'Stick/d-pad', up: 'B or up', down: 'Down', light: 'X', heavy: 'Y', grab: 'A', block: 'Bumpers' };
const ROWNAME = { left: 'Left', right: 'Right', up: 'Jump', down: 'Crouch', light: 'Light', heavy: 'Heavy', grab: 'Grab', block: 'Block' };
function controlsText() {
  const bnd = loadBindings();
  const keys = (p, b) => bnd[p][b].filter((k) => k !== null && k !== undefined).map(keyLabel).join(' or ') || '(none)';
  const rows = BUTTONS.map((b) => `${ROWNAME[b].padEnd(8)}${keys(0, b).padEnd(20)}${keys(1, b).padEnd(24)}${PAD[b]}`);
  return ['        P1 keys             P2 keys                 Gamepad', ...rows, '', ...TIPS, '', 'Change keys in SETTINGS: KEYS.'].join('\n');
}

export class TitleScene extends Phaser.Scene {
  constructor() { super('Title'); }
  create() {
    const art = this.registry.get('art');
    this.art = art;
    background(this, art, 'screen_title_bg');
    const logo = art.getAny('ui_title_logo');
    if (logo) this.add.image(W / 2, 140, logo.key, logo.frame);
    else this.add.text(W / 2, 130, 'CAVE SLAM', { ...TITLE_FONT, fontFamily: 'Impact, Arial Black, sans-serif', fontSize: '96px', fontStyle: 'bold' }).setOrigin(0.5);
    const king = getKing();
    if (king) this.add.text(W / 2, 222, `The ${CHARACTERS[king].name} tribe rules the cave`, { ...BODY, color: '#ffcf5a' }).setOrigin(0.5);
    this.items = ITEMS.map((t, i) => this.add.text(W / 2, 280 + i * 40, t, { ...BODY, font: 'bold 24px monospace' }).setOrigin(0.5));
    this.sel = 0;
    const cov = art.countExpected();
    this.add.text(10, H - 8, `Art found: ${cov.have}/${cov.total} files. Missing frames use placeholders; press F5 after new art lands.`, { ...BODY, font: '12px monospace' }).setOrigin(0, 1);
    this.controls = this.add.container(0, 0, [
      this.add.rectangle(0, 0, W, H, 0x120804, 0.94).setOrigin(0),
      this.add.text(40, 22, controlsText(), { ...BODY, font: '15px monospace', lineSpacing: 3 }),
      this.add.text(W / 2, H - 30, 'press any button', { ...BODY }).setOrigin(0.5),
    ]).setVisible(false).setDepth(10);
    this.menu = new MenuInput(this);
    this.refresh();
  }
  refresh() { this.items.forEach((t, i) => t.setColor(i === this.sel ? '#ffcf5a' : '#c9a98a').setText((i === this.sel ? '> ' : '  ') + ITEMS[i] + (i === this.sel ? ' <' : '  '))); }
  update() {
    const m = this.menu; m.update();
    if (this.controls.visible) { if (m.any() && this.time.now > this.shownAt + 250) this.controls.setVisible(false); return; }
    for (const i of [0, 1]) {
      if (m.pressed(i, 'up')) { this.sel = (this.sel + ITEMS.length - 1) % ITEMS.length; this.refresh(); }
      if (m.pressed(i, 'down')) { this.sel = (this.sel + 1) % ITEMS.length; this.refresh(); }
      if (m.confirm(i)) return this.choose();
    }
  }
  choose() {
    if (this.sel === 0) this.scene.start('Select', { practice: false });
    else if (this.sel === 1) this.scene.start('Select', { practice: true });
    else if (this.sel === 2) this.scene.start('Settings');
    else if (this.sel === 3) { this.scene.pause(); this.scene.launch('Inspect', { cid: 'goblin', returnTo: 'Title' }); }
    else { this.controls.setVisible(true); this.shownAt = this.time.now; }
  }
}
