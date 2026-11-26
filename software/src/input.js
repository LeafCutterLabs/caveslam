// Keyboard + gamepad input for one player, plus the on-screen touch controls
// for player 1 (touch.js). No mouse controls (spec section 14).
import { TOUCH } from './touch.js';
// Default keys per player and action: up to two keys each (Phaser key names).
export const DEFAULT_KEYMAPS = [
  // P1: WASD + F G H, R block
  { left: ['A'], right: ['D'], up: ['W'], down: ['S'], light: ['F'], heavy: ['G'], grab: ['H'], block: ['R'] },
  // P2: arrows + numpad 1 2 3 0, or , . / and M
  { left: ['LEFT'], right: ['RIGHT'], up: ['UP'], down: ['DOWN'],
    light: ['NUMPAD_ONE', 'COMMA'], heavy: ['NUMPAD_TWO', 'PERIOD'], grab: ['NUMPAD_THREE', 'FORWARD_SLASH'], block: ['NUMPAD_ZERO', 'M'] },
];
export const BUTTONS = ['left', 'right', 'up', 'down', 'light', 'heavy', 'grab', 'block'];
export const SLOTS = 2;
const STORE_KEY = 'caveSlamKeys';

// Bindings are stored as key codes: [player][action] = [code, code|null]
export function defaultBindings() {
  const KC = Phaser.Input.Keyboard.KeyCodes;
  return DEFAULT_KEYMAPS.map((m) => {
    const o = {};
    for (const b of BUTTONS) { o[b] = m[b].map((n) => KC[n]); while (o[b].length < SLOTS) o[b].push(null); }
    return o;
  });
}

export function loadBindings() {
  const def = defaultBindings();
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!Array.isArray(saved)) return def;
    return def.map((d, p) => {
      const o = {};
      for (const b of BUTTONS) {
        const v = saved[p] && saved[p][b];
        o[b] = Array.isArray(v) ? [...v.slice(0, SLOTS)] : d[b];
        while (o[b].length < SLOTS) o[b].push(null);
      }
      return o;
    });
  } catch (e) { return def; }
}

export function saveBindings(bindings) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(bindings)); return true; } catch (e) { return false; }
}

// Readable name for a key code.
export function keyLabel(code) {
  if (code === null || code === undefined) return '-';
  const KC = Phaser.Input.Keyboard.KeyCodes;
  const name = Object.keys(KC).find((k) => KC[k] === code);
  if (!name) return `Key ${code}`;
  const nice = { FORWARD_SLASH: '/', BACK_SLASH: '\\', COMMA: ',', PERIOD: '.', SEMICOLON: ';', QUOTES: "'", OPEN_BRACKET: '[',
    CLOSED_BRACKET: ']', MINUS: '-', PLUS: '=', BACKTICK: '`', LEFT: 'Left', RIGHT: 'Right', UP: 'Up', DOWN: 'Down', SPACE: 'Space' };
  if (nice[name]) return nice[name];
  const digits = { ZERO: 0, ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, SIX: 6, SEVEN: 7, EIGHT: 8, NINE: 9 };
  const m = name.match(/^(NUMPAD_)?(ZERO|ONE|TWO|THREE|FOUR|FIVE|SIX|SEVEN|EIGHT|NINE)$/);
  if (m) return `${m[1] ? 'Num ' : ''}${digits[m[2]]}`;
  return name.replace(/^NUMPAD_/, 'Num ').replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export class PlayerInput {
  constructor(scene, index) {
    this.scene = scene;
    this.index = index;
    const kb = scene.input.keyboard;
    this.keys = {};
    const binds = loadBindings()[index];
    for (const b of BUTTONS) this.keys[b] = binds[b].filter((k) => k !== null && k !== undefined).map((k) => kb.addKey(k, true));
    this.state = {}; this.prev = {}; this.pressed = {};
    for (const b of BUTTONS) { this.state[b] = false; this.prev[b] = false; this.pressed[b] = false; }
  }

  pad() {
    const gp = this.scene.input.gamepad;
    if (!gp || !gp.total) return null;
    return gp.getPad(this.index) || null;
  }

  update() {
    const s = {};
    for (const b of BUTTONS) s[b] = this.keys[b].some((k) => k.isDown);
    const p = this.pad();
    if (p) {
      const ax = p.leftStick ? p.leftStick.x : 0; const ay = p.leftStick ? p.leftStick.y : 0;
      s.left = s.left || p.left || ax < -0.4;
      s.right = s.right || p.right || ax > 0.4;
      s.up = s.up || p.up || ay < -0.6 || p.B;          // B = jump
      s.down = s.down || p.down || ay > 0.6;
      s.grab = s.grab || p.A;                           // A = grab
      s.light = s.light || p.X;                         // X = light strike
      s.heavy = s.heavy || p.Y;                         // Y = heavy strike
      s.block = s.block || p.L1 > 0 || p.R1 > 0;        // bumpers = block
    }
    if (this.index === 0 && TOUCH.enabled) for (const b of BUTTONS) s[b] = s[b] || TOUCH.state[b];
    for (const b of BUTTONS) {
      this.pressed[b] = s[b] && !this.prev[b];
      this.prev[b] = s[b];
      this.state[b] = s[b];
    }
  }
}
