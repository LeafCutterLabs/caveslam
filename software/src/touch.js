// On-screen touch controls for phones and tablets: a see-through d-pad on the
// left and four action buttons on the right. They drive Player 1 everywhere
// (menus and fights), plus a pause button in fights.
// Shown automatically on touch screens; add ?touch to the URL to force them on
// (or ?touch=0 to hide them).
import { W, H } from './config.js';

export const TOUCH = {
  enabled: false,
  state: { left: false, right: false, up: false, down: false, light: false, heavy: false, grab: false, block: false },
};

function wantTouch() {
  const q = new URLSearchParams(location.search).get('touch');
  if (q === '0') return false;
  if (q !== null) return true;
  return (navigator.maxTouchPoints || 0) > 0 || 'ontouchstart' in window
    || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
}

const PAD = { x: 122, y: 418, r: 84, zone: 150 };
const BTN_R = 40;
const BUTTONS = [
  { b: 'light', label: 'LIGHT', x: 772, y: 428 },
  { b: 'heavy', label: 'HEAVY', x: 846, y: 360 },
  { b: 'grab', label: 'GRAB', x: 912, y: 428 },
  { b: 'block', label: 'BLOCK', x: 846, y: 492 },
];
const PAUSE = { x: 480, y: 84, r: 22 };
const QUIT = { x: 480, y: 380, w: 200, h: 56 };

export class TouchScene extends Phaser.Scene {
  constructor() { super('Touch'); }

  create() {
    TOUCH.enabled = wantTouch();
    this.g = this.add.graphics();
    const lbl = { font: 'bold 13px monospace', color: '#ffffff' };
    this.labels = BUTTONS.map((d) => this.add.text(d.x, d.y, d.label, lbl).setOrigin(0.5).setAlpha(0.7));
    this.pauseLbl = this.add.text(PAUSE.x, PAUSE.y, 'II', { ...lbl, font: 'bold 16px monospace' }).setOrigin(0.5).setAlpha(0.7);
    this.quitLbl = this.add.text(QUIT.x, QUIT.y, 'QUIT TO TITLE', { ...lbl, font: 'bold 18px monospace' }).setOrigin(0.5);
    this.rotate = this.add.text(W / 2, H / 2, 'Turn your phone sideways', {
      font: 'bold 34px monospace', color: '#ffcf5a', stroke: '#1a0a05', strokeThickness: 8, backgroundColor: '#1a0a05cc', padding: { x: 20, y: 14 },
    }).setOrigin(0.5).setVisible(false);
    this.input.addPointer(4);
    // a touch anywhere turns the controls on (for touch laptops etc.)
    this.input.on('pointerdown', (p) => {
      if (p.wasTouch && !TOUCH.enabled && new URLSearchParams(location.search).get('touch') !== '0') TOUCH.enabled = true;
      if (!TOUCH.enabled) return;
      this.tapButtons(p);
    });
    this.input.on('pointerup', () => this.goFullscreen());
    this.scene.bringToTop();
  }

  goFullscreen() {
    if (!TOUCH.enabled || this.triedFull) return;
    this.triedFull = true;
    const sc = this.scale;
    try {
      if (sc.fullscreen && sc.fullscreen.available && !sc.isFullscreen) sc.startFullscreen();
      if (screen.orientation && screen.orientation.lock) screen.orientation.lock('landscape').catch(() => {});
    } catch (e) { /* not allowed here */ }
  }

  fight() {
    const f = this.scene.get('Fight');
    return f && this.scene.isActive('Fight') && f.fighters ? f : null;
  }

  // one-shot taps: pause / quit
  tapButtons(p) {
    const f = this.fight();
    if (!f) return;
    if (Math.hypot(p.x - PAUSE.x, p.y - PAUSE.y) < PAUSE.r + 14) { f.togglePause(); return; }
    if (f.paused && Math.abs(p.x - QUIT.x) < QUIT.w / 2 && Math.abs(p.y - QUIT.y) < QUIT.h / 2) f.quit();
  }

  update() {
    const s = TOUCH.state;
    for (const k of Object.keys(s)) s[k] = false;
    const g = this.g; g.clear();
    const on = TOUCH.enabled;
    const f = on ? this.fight() : null;
    this.labels.forEach((t) => t.setVisible(on));
    this.pauseLbl.setVisible(!!f);
    this.quitLbl.setVisible(!!(f && f.paused));
    this.rotate.setVisible(on && window.innerHeight > window.innerWidth * 1.05);
    if (!on) return;
    this.scene.bringToTop();

    let padVec = null;
    for (const p of this.input.manager.pointers) {
      if (!p.isDown) continue;
      const dx = p.x - PAD.x; const dy = p.y - PAD.y;
      const d = Math.hypot(dx, dy);
      if (d < PAD.zone && p.x < W / 2) {
        if (d > 16) {
          padVec = { x: dx / d, y: dy / d, d: Math.min(d, PAD.r) };
          s.right = s.right || padVec.x > 0.38; s.left = s.left || padVec.x < -0.38;
          s.up = s.up || padVec.y < -0.45; s.down = s.down || padVec.y > 0.45;
        }
        continue;
      }
      let best = null; let bd = BTN_R * 1.35;
      for (const btn of BUTTONS) { const bd2 = Math.hypot(p.x - btn.x, p.y - btn.y); if (bd2 < bd) { bd = bd2; best = btn; } }
      if (best) s[best.b] = true;
    }

    // d-pad
    g.fillStyle(0xffffff, 0.1).fillCircle(PAD.x, PAD.y, PAD.r);
    g.lineStyle(2, 0xffffff, 0.35).strokeCircle(PAD.x, PAD.y, PAD.r);
    const arrow = (ax, ay, lit) => {
      const cx = PAD.x + ax * PAD.r * 0.62; const cy = PAD.y + ay * PAD.r * 0.62;
      const px = -ay; const py = ax; const sz = 15;
      g.fillStyle(0xffffff, lit ? 0.7 : 0.3);
      g.fillTriangle(cx + ax * sz, cy + ay * sz, cx - ax * sz * 0.6 + px * sz, cy - ay * sz * 0.6 + py * sz, cx - ax * sz * 0.6 - px * sz, cy - ay * sz * 0.6 - py * sz);
    };
    arrow(0, -1, s.up); arrow(0, 1, s.down); arrow(-1, 0, s.left); arrow(1, 0, s.right);
    const kx = padVec ? PAD.x + padVec.x * padVec.d * 0.55 : PAD.x; const ky = padVec ? PAD.y + padVec.y * padVec.d * 0.55 : PAD.y;
    g.fillStyle(0xffffff, padVec ? 0.4 : 0.22).fillCircle(kx, ky, 30);

    // action buttons
    for (const btn of BUTTONS) {
      const lit = s[btn.b];
      g.fillStyle(0xffffff, lit ? 0.45 : 0.14).fillCircle(btn.x, btn.y, BTN_R);
      g.lineStyle(2, 0xffffff, lit ? 0.8 : 0.4).strokeCircle(btn.x, btn.y, BTN_R);
    }
    this.labels.forEach((t, i) => t.setAlpha(s[BUTTONS[i].b] ? 1 : 0.65));

    if (f) {
      g.fillStyle(0xffffff, 0.14).fillCircle(PAUSE.x, PAUSE.y, PAUSE.r);
      g.lineStyle(2, 0xffffff, 0.4).strokeCircle(PAUSE.x, PAUSE.y, PAUSE.r);
      if (f.paused) {
        g.fillStyle(0x9c4b2d, 0.85).fillRoundedRect(QUIT.x - QUIT.w / 2, QUIT.y - QUIT.h / 2, QUIT.w, QUIT.h, 10);
        g.lineStyle(2, 0xffcf5a, 0.9).strokeRoundedRect(QUIT.x - QUIT.w / 2, QUIT.y - QUIT.h / 2, QUIT.w, QUIT.h, 10);
      }
    }
  }
}
