// Cave Slam: game data taken from CAVE_SLAM_ASSET_PROMPTS.md (sections 3, 5-14).

export const W = 960;
export const H = 540;
export const FLOOR_Y = 468;          // feet baseline on screen
export const WALL_L = 70;            // inner edge of the left rock wall
export const WALL_R = W - 70;        // inner edge of the right rock wall
export const ASSET_ROOT = '../assets/';

// Origin that puts row 180 of a 192 frame on the floor (spec section 15).
export const ORIGIN_X = 0.5;
export const ORIGIN_Y = 0.9375;

export const CHAR_IDS = ['goblin', 'dwarf', 'mole', 'lizard'];

export const CHARACTERS = {
  goblin: {
    name: 'GOBLIN', height: 126,
    stats: { speed: 5, power: 2, grapple: 2, toughness: 2, reach: 3 },
    role: 'Speedster: fastest mover, quick dives, loses straight lock-ups',
    palette: { skin: 0xc7a61f, dark: 0x633146, cloth: 0x7b3540, accent: 0xf17930, light: 0xfbce6d, hair: 0x633146 },
    sig1: 'snap-ddt', sig2: 'stalactite-drop', banner: 3,
    lightName: 'slap', heavyName: 'spinning kick',
  },
  dwarf: {
    name: 'MUSCLE DWARF', height: 112,
    stats: { speed: 3, power: 4, grapple: 3, toughness: 4, reach: 2 },
    role: 'All-rounder: solid at everything, short reach',
    palette: { skin: 0xf7996a, dark: 0x58261b, cloth: 0x633424, accent: 0xe35d1c, light: 0xfdddaf, hair: 0xe35d1c },
    sig1: 'anvil-drop', sig2: 'keg-press', banner: 1,
    lightName: 'forearm smash', heavyName: 'headbutt',
  },
  mole: {
    name: 'MOLE MAN', height: 150,
    stats: { speed: 3, power: 3, grapple: 4, toughness: 3, reach: 2 },
    role: 'Wild animal: burrows and rolls in close, claw holds hard to escape',
    palette: { skin: 0xdf7f42, dark: 0x673b2c, cloth: 0x66372b, accent: 0xdd7d68, light: 0xf7dab5, hair: 0x673b2c },
    sig1: 'tunnel-suplex', sig2: 'boulder-roll', banner: 2,
    lightName: 'claw jab', heavyName: 'claw swipe',
  },
  lizard: {
    name: 'LIZARD MAN', height: 165,
    stats: { speed: 1, power: 5, grapple: 4, toughness: 5, reach: 5 },
    role: 'Tank: slowest mover, longest reach, most health, slow to get up',
    palette: { skin: 0x93861f, dark: 0x5c5418, cloth: 0x70271f, accent: 0xbe462e, light: 0xfbd997, hair: 0xbe462e },
    sig1: 'tail-whip-suplex', sig2: 'basilisk-bomb', banner: 4,
    lightName: 'claw chop', heavyName: 'tail lash',
  },
};

// Every drawn animation, by category. frames = count of files expected.
// fps / repeat are defaults; <char>_anims.json in assets can override them.
export const BASE_ANIMS = {
  idle: { frames: 2, fps: 3, repeat: -1, yoyo: true },
  'walk-fwd': { frames: 6, fps: 10, repeat: -1 },
  crouch: { frames: 2, fps: 14, repeat: 0 },
  jump: { frames: 5, fps: 10, repeat: 0 },
  block: { frames: 2, fps: 16, repeat: 0 },
  'strike-light': { frames: 3, fps: 16, repeat: 0 },
  'strike-heavy': { frames: 5, fps: 13, repeat: 0 },
  'strike-low': { frames: 4, fps: 14, repeat: 0 },
  'strike-air': { frames: 3, fps: 12, repeat: 0 },
  'hit-high': { frames: 2, fps: 10, repeat: 0 },
  knockdown: { frames: 4, fps: 12, repeat: 0 },
  'lying-up': { frames: 1, fps: 1, repeat: 0 },
  'lying-down': { frames: 1, fps: 1, repeat: 0 },
  'wall-bounce': { frames: 3, fps: 12, repeat: 0 },
  'wall-jump': { frames: 3, fps: 12, repeat: 0 },
  'stalactite-hang': { frames: 2, fps: 4, repeat: -1 },
  win: { frames: 4, fps: 8, repeat: -1 },
  ko: { frames: 1, fps: 1, repeat: 0 },
  'oil-apply': { frames: 4, fps: 5, repeat: 0 },
};

export const GRAB_ANIMS = {
  lockup: { frames: 3, fps: 10, repeat: 0 },
  'grab-behind': { frames: 3, fps: 10, repeat: 0 },
  'grab-ground': { frames: 3, fps: 8, repeat: 0 },
  'hold-struggle': { frames: 2, fps: 6, repeat: -1 },
  pin: { frames: 2, fps: 4, repeat: -1 },
  'pin-hold': { frames: 2, fps: 6, repeat: -1 },
  reversal: { frames: 4, fps: 12, repeat: 0 },
  slip: { frames: 2, fps: 8, repeat: 0 },
};

export const GENERIC_THROWS = { 'body-slam': 5, rollup: 4 };
export const SIG_THROWS = {
  dwarf: { 'anvil-drop': 6, 'keg-press': 6 },
  mole: { 'tunnel-suplex': 8, 'boulder-roll': 4 },
  goblin: { 'snap-ddt': 4, 'stalactite-drop': 5 },
  lizard: { 'tail-whip-suplex': 8, 'basilisk-bomb': 6 },
};

export const THROWN_POSES = ['lifted', 'upside-down', 'overhead', 'suplex-arc', 'headlock-bent',
  'tail-wrapped', 'spin', 'squeezed', 'slam-impact', 'pinned', 'pinned-struggle', 'kick-out'];

export const PORTRAITS = { select: [160, 160], vs: [320, 400], icon: [64, 64], hurt: [160, 160] };

// Stage / fx / ui files: [name, frameCount (0 = single file, no suffix), w, h]
export const STAGE_FILES = [
  ['stage_cave_wall', 0, 1280, 540], ['stage_cave_crystals', 3, 1280, 540],
  ['stage_cave_crowd', 2, 1280, 200], ['stage_cave_crowd_cheer', 2, 1280, 200],
  ['stage_cave_ground', 0, 1280, 100], ['stage_cave_wall-left', 0, 120, 540],
  ['stage_cave_wall-right', 0, 120, 540], ['stage_cave_stalactites', 0, 960, 120],
  ['stage_cave_banner', 4, 80, 120], ['stage_cave_torch', 4, 40, 80],
  ['stage_cave_floor', 0, 1280, 75], ['stage_cave_drip', 3, 20, 40],
  ['stage_cave_foreground', 0, 1280, 125], ['stage_cave_vignette', 0, 960, 540],
  ['screen_title_bg', 0, 960, 540], ['screen_select_bg', 0, 960, 540], ['screen_vs_bg', 0, 960, 540],
  ['stage_cave_stalactite-fall', 3, 60, 160], ['stage_cave_spider_descend', 4, 120, 160],
  ['stage_cave_spider_shoot', 3, 120, 160], ['stage_cave_spider_climb', 2, 120, 160],
  ['stage_item_oil-bottle', 2, 40, 60],
];

export const FX_FILES = [
  ['fx_hit-light', 3, 80, 80], ['fx_hit-heavy', 3, 120, 120], ['fx_dust', 4, 160, 80],
  ['fx_dizzy-bats', 4, 80, 40], ['fx_burrow-mound', 3, 120, 60], ['fx_dirt-spray', 3, 120, 120],
  ['fx_debris', 3, 40, 40], ['fx_shadow', 1, 120, 20], ['fx_sweat', 2, 40, 40],
  ['fx_warning-shadow', 2, 80, 20], ['fx_rock-shatter', 4, 120, 120], ['fx_web-shot', 3, 80, 80],
  ['fx_web-wrap', 3, 192, 192], ['fx_oil-splash', 3, 120, 120], ['fx_oil-shine', 3, 192, 192],
];

export const UI_FILES = [
  ['ui_healthbar_frame', 0, 400, 40], ['ui_healthbar_fill', 0, 375, 20], ['ui_healthbar_fill-low', 0, 375, 20],
  ['ui_stamina_frame', 0, 300, 20], ['ui_stamina_fill', 0, 290, 10], ['ui_timer_frame', 0, 80, 60],
  ['ui_timing-ring', 4, 120, 120], ['ui_timing-perfect', 2, 120, 120],
  ['ui_text-round1', 0, 400, 80], ['ui_text-round2', 0, 400, 80], ['ui_text-round3', 0, 400, 80],
  ['ui_text-fight', 0, 400, 120], ['ui_text-ko', 0, 320, 160],
  ['ui_text-pin-1', 0, 120, 120], ['ui_text-pin-2', 0, 120, 120], ['ui_text-pin-3', 0, 120, 120],
  ['ui_pin-meter_frame', 0, 240, 30], ['ui_pin-meter_marker', 0, 20, 40], ['ui_mash-prompt', 2, 80, 80],
  ['ui_text-reversal', 0, 320, 80], ['ui_select_frame', 0, 180, 180], ['ui_select_cursor-p1', 0, 180, 180],
  ['ui_select_cursor-p2', 0, 180, 180], ['ui_select_locked', 0, 180, 180], ['ui_tag-p1', 0, 40, 20],
  ['ui_tag-p2', 0, 40, 20], ['ui_title_logo', 0, 640, 240], ['ui_text-rumble', 0, 400, 80],
  ['ui_text-oiled', 0, 320, 80],
];

// Gameplay tuning
export const TUNING = {
  roundTime: 99,
  roundsToWin: 2,
  gravity: 1700,
  jumpV: 720,
  eventMin: 20, eventMax: 40,      // seconds between cave events
  lockupWindow: 0.85,              // seconds for the shrinking timing ring
  goodWindow: 0.17,                // |press - target| for a good press
  perfectWindow: 0.075,            // |press - target| for a perfect press
  pinCount: 1.0,                   // seconds per pin count number
  oilTime: 10, webTime: 3.2, oilSlipChance: 0.6,
};

export const PLAYER_COLORS = [0xe35d1c, 0x6fbf3a]; // P1 burnt orange, P2 green

// Stalactites with a worn grip area that wrestlers can hang from (x, tip y).
export const GRIPS = [{ x: 300, y: 130 }, { x: 660, y: 130 }];

// Smoother movement (CAVE_SLAM_ASSET_PROMPTS.md, section 17). When a wrestler
// has this many real frames for an animation, the game plays them at this rate.
// Any other larger count found on disk is played at a rate that keeps the
// original timing. Nothing changes until the new frames exist.
export const SMOOTH = {
  idle: { frames: 6, fps: 8, repeat: -1 },
  'walk-fwd': { frames: 10, fps: 15, repeat: -1 },
  crouch: { frames: 4, fps: 24, repeat: 0 },
  jump: { frames: 8, fps: 14, repeat: 0 },
  block: { frames: 3, fps: 22, repeat: 0 },
  'hit-high': { frames: 4, fps: 16, repeat: 0 },
  'stalactite-hang': { frames: 4, fps: 6, repeat: -1 },
  'wall-jump': { frames: 5, fps: 18, repeat: 0 },
};

// New movement animations. Used only when their frames exist; until then the
// game falls back to the old reuse (walk-fwd reversed, knockdown reversed, ...).
export const EXTRA_ANIMS = {
  'walk-back': { frames: 10, fps: 15, repeat: -1 },
  land: { frames: 2, fps: 14, repeat: 0 },
  turn: { frames: 3, fps: 18, repeat: 0 },
  getup: { frames: 4, fps: 12, repeat: 0 },
};
