# Cave Slam — game code

Local two-player cave wrestling in Phaser 3 (3.90, bundled in `lib/`, works offline).

## Run it (Windows)

Double-click `start.bat`. It starts a small local server (PowerShell, nothing
to install) and opens http://localhost:8080/software/. Close the black server
window to stop. Alternative: `python serve.py`. Opening `index.html` directly
does not work (browsers block images from `file://`).

## New art

At startup the game reads every file under `../assets/` (the server lists them
at `/__assets.json`). Any frame or image that is missing is drawn as a simple
placeholder. Drop new art in with the spec's file name and **press F5**.
**Smoother movement:** section 17 of `CAVE_SLAM_ASSET_PROMPTS.md` lists the
in-between frames to render. The game counts the frames on disk, so a longer
set (idle 01-06, jump 01-08...) plays automatically at the new rate, and the
new `walk-back`, `land`, `turn` and `getup` animations replace the old reuses
as soon as their frames exist.
Single PNGs win over atlas frames with the same name, so a regenerated frame
shows up even before the atlas is repacked. Stage, effects, UI text, portraits,
spider, oil bottle and stalactites all switch to real art the same way.

## Controls

| | P1 | P2 | Gamepad |
| --- | --- | --- | --- |
| Move | A D | Left Right | Stick / d-pad |
| Jump | W | Up | B or up |
| Crouch | S | Down | Down |
| Light strike | F | , or Numpad 1 | X |
| Heavy strike | G | . or Numpad 2 | Y |
| Grab | H | / or Numpad 3 | A |
| Block | R | M or Numpad 0 | Bumpers |

These are the defaults. **Settings: Keys** on the title menu remaps them: two
keys per action for each player, arrows to move, Enter then press the new key,
Backspace/Delete to clear, plus Reset to defaults. Changes save in the browser
(localStorage) and apply right away. A key can only have one job, so assigning
it removes it from wherever it was. Gamepad buttons are fixed.

Menus: move, GRAB or LIGHT to pick, HEAVY to go back, Esc to leave. In a fight
Esc pauses (Q quits to the title).

## How it plays

- **Run:** double-tap forward and keep holding it.
- **Hitboxes:** strikes land where the art's fist, claw or tail touches the
  opponent's body, and grabs reach as far as the hands do in the lock-up art
  (from each wrestler's `_hitboxes.json`). Frames without boxes fall back to a
  body-sized box, so long-reach wrestlers really do reach further.
- **Lock-up:** GRAB next to a facing opponent. A ring shrinks; both players
  press GRAB as it closes. Better timing wins. Direction held by the winner:
  forward = signature slam, back = slam behind you (Dwarf: Keg Press, Lizard:
  Basilisk Bomb), down = roll-up into a pin, nothing = body slam.
- **Reversal:** if the defender's press is PERFECT and the attacker's isn't,
  the defender reverses and throws instead.
- **Strikes set up grabs:** a stunned, dizzy or webbed opponent can be thrown
  with no lock-up. Grabbing someone from behind skips the lock-up too.
  Low sweep (Down+strike) and air strikes knock down. Block stops strikes,
  not grabs.
- **Downed opponent:** Down+GRAB pins, GRAB alone picks them up (stunned).
  Downed players mash to get up faster.
- **Pins:** tug-of-war meter. Pinner mashes to hold, pinned player mashes to
  escape (harder at low health/stamina). Stay on PINNED through 1-2-3 to win
  the round.
- **Cave:** jump under a stalactite with a worn grip band and press Up to hang;
  Up at a rock wall wall-jumps; knockdowns into the wall bounce off it.
- **Specials:** Mole Man Down+Heavy = Boulder Roll (grabs on hit, dizzy on a
  miss). Goblin GRAB while hanging above the opponent = Stalactite Drop into a
  pin.
- **Rounds:** best of 3, 99 seconds, KO or pinfall (time out: most health
  wins). The winner's tribe banner hangs in the cave for the next match.
- **Cave events** (one every 20-40 s): cave-in (block or get knocked down),
  cave spider (webs a wrestler; mash to break free, they're open to free
  throws), baby oil (grab it first: grabs slip off you for 10 s).

## Testing tools

- **Practice** (title menu): no timer, health refills. E = random cave event,
  1 / 2 / 3 = cave-in / spider / oil, B = show hit/hurt/grab boxes
  (blue body, red strike, orange grab reach), I = frame inspector.
- **Frame inspector** (title menu, or I in practice): step through every frame
  one key press at a time with size checks. Right/Left frame, Down/Up
  animation, Space play, F next flagged frame, G idle ghost, Z zoom,
  C change wrestler, Esc back.
- URL shortcuts: `?p1=goblin&p2=dwarf` jumps straight into a match,
  `?practice&p1=mole&p2=lizard` straight into practice.

## Files

- `src/config.js` — stats, animation list, file lists, tuning numbers
- `src/assets.js` — finding/loading art, placeholders, animations
- `src/fighter.js` — movement, strikes, knockdowns, hanging, wall moves
- `src/grapple.js` — lock-ups, reversals, throw scripts, pins, specials
- `src/events.js` — cave-in, spider, baby oil
- `src/stage.js` — cave layers
- `src/input.js` — keyboard + gamepad
- `src/scenes/` — Boot, Title, Select, Vs, Fight, Result, Inspect, Settings

Sound files are present in `../assets/audio/`, but the game does not preload
them yet. Balance tuning and sprite sizing checks are also pending.
