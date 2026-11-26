// On-screen touch controls for phones and tablets: a see-through d-pad in the
// bottom-left corner of the screen and LIGHT / HEAVY / GRAB / BLOCK in the
// bottom-right. They are page elements laid over the game, sized to the screen
// (not the game picture), so on wide phones they sit in the side space beside
// the game. They drive Player 1 in menus and fights; II pauses a fight.
// Shown automatically on touch screens; ?touch forces them on, ?touch=0 hides them.

export const TOUCH = {
  enabled: false,
  state: { left: false, right: false, up: false, down: false, light: false, heavy: false, grab: false, block: false },
};

const BTNS = [
  { b: 'light', label: 'LIGHT', dx: -1, dy: 0 },
  { b: 'heavy', label: 'HEAVY', dx: 0, dy: -1 },
  { b: 'grab', label: 'GRAB', dx: 1, dy: 0 },
  { b: 'block', label: 'BLOCK', dx: 0, dy: 1 },
];

const CSS = `
#touch { position: absolute; inset: 0; pointer-events: none; z-index: 5; font-family: monospace; display: none; }
#touch.on { display: block; }
#touch .c { position: absolute; border-radius: 50%; box-sizing: border-box; display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.13); border: 2px solid rgba(255,255,255,0.38); color: rgba(255,255,255,0.75); font-weight: bold; }
#touch .c.lit { background: rgba(255,255,255,0.42); border-color: rgba(255,255,255,0.85); color: #fff; }
#touch .knob { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.22); }
#touch .arrow { position: absolute; width: 0; height: 0; opacity: 0.4; }
#touch .arrow.lit { opacity: 0.85; }
#touch .quit { position: absolute; display: none; padding: 12px 22px; background: rgba(156,75,45,0.9); border: 2px solid #ffcf5a;
  border-radius: 10px; color: #fff; font-weight: bold; font-size: 18px; transform: translate(-50%, -50%); white-space: nowrap; }
#touch .msg { position: absolute; left: 50%; transform: translateX(-50%); color: #ffcf5a; font-weight: bold; text-align: center;
  text-shadow: 0 0 4px #1a0a05, 0 0 4px #1a0a05; white-space: nowrap; display: none; }
`;

function wantTouch() {
  const q = new URLSearchParams(location.search).get('touch');
  if (q === '0') return false;
  if (q !== null) return true;
  return (navigator.maxTouchPoints || 0) > 0 || 'ontouchstart' in window
    || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
}

const el = (cls, parent, text = '') => { const d = document.createElement('div'); d.className = cls; d.textContent = text; parent.appendChild(d); return d; };

export function initTouch(game) {
  const frame = document.getElementById('frame') || document.body;
  const style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);
  const root = el('', frame); root.id = 'touch';
  const pad = el('c', root);
  const knob = el('knob', pad);
  const arrows = { up: el('arrow', pad), down: el('arrow', pad), left: el('arrow', pad), right: el('arrow', pad) };
  const btns = BTNS.map((d) => ({ ...d, node: el('c', root, d.label) }));
  const pause = el('c', root, 'II');
  const quit = el('quit', root, 'QUIT TO TITLE');
  const rotate = el('msg', root, 'Turn your phone sideways'); rotate.style.top = '45%'; rotate.style.fontSize = '28px';
  const tip = el('msg', root, 'Full screen: tap Share, then Add to Home Screen');

  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const standalone = navigator.standalone || (window.matchMedia && window.matchMedia('(display-mode: fullscreen), (display-mode: standalone)').matches);
  const urlTouch = new URLSearchParams(location.search).get('touch');
  TOUCH.enabled = wantTouch();

  // ---- layout (in page pixels, relative to the frame) ----
  let L = null;
  function layout() {
    const fw = frame.clientWidth; const fh = frame.clientHeight;
    const cs = getComputedStyle(frame);
    const pl = parseFloat(cs.paddingLeft) || 0; const pr = parseFloat(cs.paddingRight) || 0;
    const pt = parseFloat(cs.paddingTop) || 0; const pb = parseFloat(cs.paddingBottom) || 0;
    const w = fw - pl - pr; const h = fh - pt - pb;
    const R = Math.min(h * 0.2, w * 0.13, 105);           // d-pad radius
    const r = Math.min(h * 0.085, w * 0.055, 44);         // button radius
    const m = Math.max(10, h * 0.035);                    // margin from the screen edge
    const padC = { x: pl + m + R, y: pt + h - m - R };
    const spread = r * 1.75;
    const btnC = { x: pl + w - m - r - spread, y: pt + h - m - r - spread };
    const canvas = game.canvas && game.canvas.getBoundingClientRect();
    const fr = frame.getBoundingClientRect();
    const cv = canvas ? { x: canvas.left - fr.left, y: canvas.top - fr.top, w: canvas.width, h: canvas.height } : { x: pl, y: pt, w, h };
    L = { R, r, padC, btnC, spread, cv, pauseC: { x: cv.x + cv.w / 2, y: cv.y + cv.h * 0.155 }, pr: Math.max(16, r * 0.55) };

    const place = (n, x, y, rad) => { n.style.left = `${x - rad}px`; n.style.top = `${y - rad}px`; n.style.width = n.style.height = `${rad * 2}px`; };
    place(pad, padC.x, padC.y, R);
    const k = R * 0.36; knob.style.width = knob.style.height = `${k * 2}px`;
    const a = R * 0.17; const off = R * 0.62;
    const arrowCss = (n, dir) => {
      const s = n.style; s.borderStyle = 'solid'; s.borderColor = 'transparent';
      const cx = R + (dir === 'left' ? -off : dir === 'right' ? off : 0); const cy = R + (dir === 'up' ? -off : dir === 'down' ? off : 0);
      if (dir === 'up') { s.borderWidth = `0 ${a}px ${a * 1.4}px`; s.borderBottomColor = '#fff'; }
      if (dir === 'down') { s.borderWidth = `${a * 1.4}px ${a}px 0`; s.borderTopColor = '#fff'; }
      if (dir === 'left') { s.borderWidth = `${a}px ${a * 1.4}px ${a}px 0`; s.borderRightColor = '#fff'; }
      if (dir === 'right') { s.borderWidth = `${a}px 0 ${a}px ${a * 1.4}px`; s.borderLeftColor = '#fff'; }
      const wpx = dir === 'up' || dir === 'down' ? a * 2 : a * 1.4; const hpx = dir === 'up' || dir === 'down' ? a * 1.4 : a * 2;
      s.left = `${cx - wpx / 2 - 2}px`; s.top = `${cy - hpx / 2 - 2}px`;
    };
    for (const d of Object.keys(arrows)) arrowCss(arrows[d], d);
    for (const b of btns) { b.x = btnC.x + b.dx * spread; b.y = btnC.y + b.dy * spread; place(b.node, b.x, b.y, r); b.node.style.fontSize = `${Math.max(9, r * 0.32)}px`; }
    place(pause, L.pauseC.x, L.pauseC.y, L.pr); pause.style.fontSize = `${L.pr * 0.7}px`;
    quit.style.left = `${cv.x + cv.w / 2}px`; quit.style.top = `${cv.y + cv.h * 0.72}px`;
    tip.style.top = `${cv.y + 4}px`; tip.style.fontSize = `${Math.max(11, Math.min(15, cv.w * 0.016))}px`;
  }

  // ---- pointers ----
  const pointers = new Map();   // id -> {x, y} in frame pixels
  const toFrame = (e) => { const fr = frame.getBoundingClientRect(); return { x: e.clientX - fr.left, y: e.clientY - fr.top }; };
  let padVec = null;
  function compute() {
    const s = TOUCH.state;
    for (const k of Object.keys(s)) s[k] = false;
    padVec = null;
    if (!L) return;
    for (const p of pointers.values()) {
      const dx = p.x - L.padC.x; const dy = p.y - L.padC.y; const d = Math.hypot(dx, dy);
      if (d < L.R * 1.7 && p.x < L.cv.x + L.cv.w / 2) {
        if (d > L.R * 0.18) {
          padVec = { x: dx / d, y: dy / d, d: Math.min(d, L.R) };
          s.right = s.right || padVec.x > 0.38; s.left = s.left || padVec.x < -0.38;
          s.up = s.up || padVec.y < -0.45; s.down = s.down || padVec.y > 0.45;
        }
        continue;
      }
      let best = null; let bd = L.r * 1.4;
      for (const b of btns) { const d2 = Math.hypot(p.x - b.x, p.y - b.y); if (d2 < bd) { bd = d2; best = b; } }
      if (best) s[best.b] = true;
    }
  }
  const fight = () => { const f = game.scene.getScene('Fight'); return f && game.scene.isActive('Fight') && f.fighters ? f : null; };
  const near = (p, c, rad) => Math.hypot(p.x - c.x, p.y - c.y) < rad;
  function down(e) {
    if (e.pointerType === 'touch' && !TOUCH.enabled && urlTouch !== '0') { TOUCH.enabled = true; layout(); }
    if (!TOUCH.enabled || (e.pointerType === 'mouse' && urlTouch === null)) return;
    const p = toFrame(e);
    const f = fight();
    if (f && L && near(p, L.pauseC, L.pr + 14)) { f.togglePause(); return; }
    if (f && f.paused) {
      const q = quit.getBoundingClientRect(); const fr = frame.getBoundingClientRect();
      if (p.x > q.left - fr.left && p.x < q.right - fr.left && p.y > q.top - fr.top && p.y < q.bottom - fr.top) { f.quit(); return; }
    }
    pointers.set(e.pointerId, p); compute();
    if (e.cancelable) e.preventDefault();
  }
  function move(e) { if (pointers.has(e.pointerId)) { pointers.set(e.pointerId, toFrame(e)); compute(); } }
  function up(e) {
    if (pointers.delete(e.pointerId)) compute();
    if (TOUCH.enabled && e.pointerType === 'touch') goFullscreen();
  }
  window.addEventListener('pointerdown', down, { passive: false });
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  window.addEventListener('pointercancel', up);
  window.addEventListener('blur', () => { pointers.clear(); compute(); });
  document.addEventListener('contextmenu', (e) => { if (TOUCH.enabled) e.preventDefault(); });

  let triedFull = false;
  function goFullscreen() {
    if (triedFull || standalone) return;
    triedFull = true;
    const d = document.documentElement;
    try {
      const req = d.requestFullscreen || d.webkitRequestFullscreen;
      if (req && !document.fullscreenElement) { const r = req.call(d); if (r && r.catch) r.catch(() => {}); }
      if (screen.orientation && screen.orientation.lock) screen.orientation.lock('landscape').catch(() => {});
    } catch (err) { /* not allowed here */ }
  }

  // ---- draw state every frame ----
  let lastKey = '';
  function tick() {
    requestAnimationFrame(tick);
    root.classList.toggle('on', TOUCH.enabled);
    if (!TOUCH.enabled) return;
    const key = `${frame.clientWidth}x${frame.clientHeight}:${game.canvas ? game.canvas.style.width + game.canvas.style.marginLeft + game.canvas.style.marginTop : ''}`;
    if (key !== lastKey) { lastKey = key; layout(); }
    const s = TOUCH.state;
    for (const d of Object.keys(arrows)) arrows[d].classList.toggle('lit', s[d]);
    pad.classList.toggle('lit', !!padVec);
    const k = L.R * 0.36;
    const kx = L.R - k + (padVec ? padVec.x * padVec.d * 0.55 : 0); const ky = L.R - k + (padVec ? padVec.y * padVec.d * 0.55 : 0);
    knob.style.left = `${kx - 2}px`; knob.style.top = `${ky - 2}px`;
    for (const b of btns) b.node.classList.toggle('lit', s[b.b]);
    const f = fight();
    pause.style.display = f ? 'flex' : 'none';
    quit.style.display = f && f.paused ? 'block' : 'none';
    rotate.style.display = window.innerHeight > window.innerWidth * 1.05 ? 'block' : 'none';
    tip.style.display = ios && !standalone && game.scene.isActive('Title') ? 'block' : 'none';
  }
  requestAnimationFrame(tick);
}
