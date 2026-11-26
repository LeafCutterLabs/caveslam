// Shared bits for the menu scenes.
import { PlayerInput } from '../input.js';

const KING_KEY = 'caveSlamKing';
export function getKing() { try { return localStorage.getItem(KING_KEY) || null; } catch (e) { return null; } }
export function setKing(cid) { try { localStorage.setItem(KING_KEY, cid); } catch (e) { /* storage blocked */ } }

export const TITLE_FONT = { fontFamily: 'Impact, Arial Black, sans-serif', fontSize: '64px', fontStyle: 'bold', color: '#ffcf5a', stroke: '#3a2018', strokeThickness: 12 };
export const BODY = { font: '15px monospace', color: '#f7dab5', stroke: '#1a0a05', strokeThickness: 4 };

// Menu input from both players: keyboard + gamepads. Enter/Space also confirm.
export class MenuInput {
  constructor(scene) {
    this.p = [new PlayerInput(scene, 0), new PlayerInput(scene, 1)];
    this.enter = scene.input.keyboard.addKey('ENTER');
    this.space = scene.input.keyboard.addKey('SPACE');
    this.esc = scene.input.keyboard.addKey('ESC');
  }
  update() { this.p.forEach((i) => i.update()); }
  confirm(i) { const q = this.p[i].pressed; return q.grab || q.light || (i === 0 && Phaser.Input.Keyboard.JustDown(this.space)) || (i === 1 && Phaser.Input.Keyboard.JustDown(this.enter)); }
  back(i) { return this.p[i].pressed.heavy; }
  pressed(i, b) { return this.p[i].pressed[b]; }
  any() { return this.p.some((x) => Object.values(x.pressed).some(Boolean)) || this.enter.isDown || this.space.isDown; }
  escape() { return Phaser.Input.Keyboard.JustDown(this.esc); }
}

// Background helper: art if present, else warm gradient.
export function background(scene, art, key) {
  const f = art.getAny(key) || art.getAny('stage_cave_wall');
  if (f) {
    const img = scene.add.image(480, 270, f.key, f.frame);
    if (!art.getAny(key)) img.setTint(0x886655);
    return img;
  }
  const g = scene.add.graphics();
  g.fillGradientStyle(0x2a120c, 0x2a120c, 0x633424, 0x633424, 1); g.fillRect(0, 0, 960, 540);
  return g;
}

// A wrestler picture: portrait art if present, else their idle frame.
export function wrestlerPic(scene, art, cid, kind, x, y, h) {
  const p = art.getAny(`${cid}_portrait_${kind}`);
  if (p) { const img = scene.add.image(x, y, p.key, p.frame); img.setScale(h / img.height); return img; }
  const fr = scene.anims.get(`${cid}_idle`).frames[0];
  const img = scene.add.image(x, y, fr.textureKey, fr.textureFrame);
  img.setScale(h / 150);
  return img;
}
