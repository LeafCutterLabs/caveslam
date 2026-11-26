// Settings: remap each player's keys. Two keys per action, saved in the
// browser (localStorage), with a reset to defaults. Keyboard only, like the game.
import { W, H } from '../config.js';
import { BUTTONS, SLOTS, loadBindings, saveBindings, defaultBindings, keyLabel } from '../input.js';
import { BODY, TITLE_FONT, background } from './common.js';

const NAMES = { left: 'Move left', right: 'Move right', up: 'Jump / hang', down: 'Crouch', light: 'Light strike', heavy: 'Heavy strike', grab: 'Grab', block: 'Block' };
const ROW0 = 150; const ROW_H = 34;
const COLS = [380, 500, 680, 800];   // P1 key 1, P1 key 2, P2 key 1, P2 key 2

export class SettingsScene extends Phaser.Scene {
  constructor() { super('Settings'); }

  create() {
    const art = this.registry.get('art');
    background(this, art, 'screen_select_bg');
    this.add.rectangle(0, 0, W, H, 0x120804, 0.7).setOrigin(0);
    this.add.text(W / 2, 40, 'CONTROLS', { ...TITLE_FONT, fontSize: '40px' }).setOrigin(0.5);
    this.add.text((COLS[0] + COLS[1]) / 2, ROW0 - 50, 'PLAYER 1', { ...BODY, font: 'bold 18px monospace', color: '#ff9a52' }).setOrigin(0.5);
    this.add.text((COLS[2] + COLS[3]) / 2, ROW0 - 50, 'PLAYER 2', { ...BODY, font: 'bold 18px monospace', color: '#9fe870' }).setOrigin(0.5);
    COLS.forEach((x, i) => this.add.text(x, ROW0 - 26, `key ${(i % 2) + 1}`, { ...BODY, font: '12px monospace', color: '#c9a98a' }).setOrigin(0.5));

    this.binds = loadBindings();
    this.cells = BUTTONS.map((b, r) => {
      this.add.text(120, ROW0 + r * ROW_H, NAMES[b], { ...BODY, font: 'bold 16px monospace' }).setOrigin(0, 0.5);
      return COLS.map((x) => this.add.text(x, ROW0 + r * ROW_H, '', { ...BODY, font: 'bold 16px monospace' }).setOrigin(0.5));
    });
    this.warn = BUTTONS.map((b, r) => this.add.text(80, ROW0 + r * ROW_H, '', { ...BODY, font: 'bold 16px monospace', color: '#ff6b5a' }).setOrigin(0.5));
    const extraY = ROW0 + BUTTONS.length * ROW_H + 20;
    this.extras = [
      this.add.text(W / 2 - 130, extraY, 'Reset to defaults', { ...BODY, font: 'bold 16px monospace' }).setOrigin(0.5),
      this.add.text(W / 2 + 130, extraY, 'Back', { ...BODY, font: 'bold 16px monospace' }).setOrigin(0.5),
    ];
    this.box = this.add.rectangle(0, 0, 110, 28).setStrokeStyle(3, 0xffcf5a);
    this.note = this.add.text(W / 2, H - 62, '', { ...BODY, font: '14px monospace', color: '#ffcf5a' }).setOrigin(0.5);
    this.add.text(W / 2, H - 14, [
      'Arrows move   Enter change key   Backspace/Delete clear key   Esc back',
      'Saved in this browser. Gamepads keep their fixed buttons. Esc, Space and Enter stay menu keys.',
    ].join('\n'), { ...BODY, font: '12px monospace', align: 'center' }).setOrigin(0.5, 1);

    this.row = 0; this.col = 0; this.listening = false;
    this.input.keyboard.on('keydown', (e) => this.onKey(e));
    this.refresh();
  }

  onKey(e) {
    e.preventDefault && e.preventDefault();
    const code = e.keyCode;
    const KC = Phaser.Input.Keyboard.KeyCodes;
    if (this.listening) {
      this.listening = false;
      if (code === KC.ESC) { this.note.setText('Cancelled'); return this.refresh(); }
      return this.assign(code);
    }
    const onGrid = this.row < BUTTONS.length;
    if (code === KC.ESC) return this.scene.start('Title');
    if (code === KC.UP) { this.row = (this.row + BUTTONS.length) % (BUTTONS.length + 1); if (this.row === BUTTONS.length) this.col = Math.min(this.col, 1); }
    else if (code === KC.DOWN) { this.row = (this.row + 1) % (BUTTONS.length + 1); if (this.row === BUTTONS.length) this.col = this.col < 2 ? 0 : 1; }
    else if (code === KC.LEFT) this.col = (this.col + (onGrid ? 3 : 1)) % (onGrid ? 4 : 2);
    else if (code === KC.RIGHT) this.col = (this.col + 1) % (onGrid ? 4 : 2);
    else if (code === KC.ENTER || code === KC.SPACE) {
      if (onGrid) { this.listening = true; this.note.setText(`Press a key for P${this.col < 2 ? 1 : 2} ${NAMES[BUTTONS[this.row]]} (Esc cancels)`); }
      else if (this.col === 0) { this.binds = defaultBindings(); saveBindings(this.binds); this.note.setText('Default keys restored'); }
      else return this.scene.start('Title');
    } else if ((code === KC.BACKSPACE || code === KC.DELETE) && onGrid) {
      const [p, s] = this.cell();
      this.binds[p][BUTTONS[this.row]][s] = null; saveBindings(this.binds); this.note.setText('Key cleared');
    }
    this.refresh();
  }

  cell() { return [this.col < 2 ? 0 : 1, this.col % 2]; }

  assign(code) {
    const [p, s] = this.cell();
    const action = BUTTONS[this.row];
    let moved = '';
    // a key can only do one thing: take it off anything else first
    for (let pp = 0; pp < 2; pp++) for (const b of BUTTONS) for (let ss = 0; ss < SLOTS; ss++) {
      if (this.binds[pp][b][ss] === code && !(pp === p && b === action && ss === s)) {
        this.binds[pp][b][ss] = null;
        moved = ` (removed from P${pp + 1} ${NAMES[b]})`;
      }
    }
    this.binds[p][action][s] = code;
    saveBindings(this.binds);
    this.note.setText(`P${p + 1} ${NAMES[action]} = ${keyLabel(code)}${moved}`);
    this.refresh();
  }

  refresh() {
    BUTTONS.forEach((b, r) => {
      this.cells[r].forEach((t, c) => {
        const p = c < 2 ? 0 : 1; const s = c % 2;
        const sel = r === this.row && c === this.col;
        t.setText(sel && this.listening ? '...' : keyLabel(this.binds[p][b][s]));
        t.setColor(sel ? '#ffcf5a' : '#f7dab5');
      });
      const empty = [0, 1].filter((p) => this.binds[p][b].every((k) => k === null || k === undefined));
      this.warn[r].setText(empty.length ? '!' : '');
    });
    this.extras.forEach((t, i) => t.setColor(this.row === BUTTONS.length && this.col === i ? '#ffcf5a' : '#c9a98a'));
    if (this.row < BUTTONS.length) this.box.setPosition(COLS[this.col], ROW0 + this.row * ROW_H).setSize(110, 28);
    else { const t = this.extras[this.col]; this.box.setPosition(t.x, t.y).setSize(t.width + 24, 30); }
    this.box.setStrokeStyle(3, this.listening ? 0xffffff : 0xffcf5a);
    const anyEmpty = this.warn.some((w) => w.text);
    if (anyEmpty && !this.listening && !this.note.text.startsWith('P')) this.note.setText('! = an action with no key for a player');
  }
}
