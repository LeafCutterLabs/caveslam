# Cave Slam — Asset Generation Handoff for Codex

This file is the single source of truth for generating every sprite in Cave Slam.
The four originals are in `media/`. The [asset manifest](assets/manifest.md#character-references)
lists their exact filenames and the PNG reference locations used below. The
sheets define the character designs and art style for the game.

---

## 1. Required workflow (follow for EVERY asset)

Consistency matters more than speed. Do not batch-generate from memory.

**Before each asset:**

1. Re-open the character sheet for that character:
   - `assets/characters/dwarf/study/dwarf_study_sheet.png`
   - `assets/characters/mole/study/mole_study_sheet.png`
   - `assets/characters/goblin/study/goblin_study_sheet.png`
   - `assets/characters/lizard/study/lizard_study_sheet.png`
2. Re-read that character's lock list in Section 3 (height, palette, outline,
   costume details, facing).
3. Attach the character sheet as the reference image for the generation.
   For frame 02 and later in an animation, also attach the previous frame.
   If the image generator cannot open a local Windows path, use a chat
   attachment of the same file as the image reference.

**After each asset:**

4. Run the consistency check:
   - [ ] Correct in-game height (Section 3), feet on baseline row 180 of 192
   - [ ] Colors match the character's palette swatches (Section 3)
   - [ ] Costume details present (see lock list)
   - [ ] Faces right
   - [ ] Transparent background (no parchment), same bold dark-brown outline and
     cel shading as the sheet
   - [ ] Nothing cropped off the 192 × 192 canvas
5. If any check fails, regenerate. Do not "fix later."
6. Save with the exact file name from this document.
7. Add a line to `assets/manifest.md`: file name, status (done / redo), notes.

**Order of work:** finish one character completely (all categories) before
starting the next. Recommended order: goblin, dwarf, mole, lizard. Stage,
effects and UI can be done any time (Section 10 explains their style reference).

---

## 2. Global rules

**Art style (taken from the character sheets):** hand-drawn 2D cartoon
illustration in the style of a modern arcade fighting game. Bold, even
dark-brown outlines (about #3a2018, never pure black), flat cel shading with one
shadow tone and one highlight tone per material, chunky exaggerated muscular
anatomy, warm earthy colors with gold accents. Clean and readable, NOT pixel art,
NOT photorealistic, no painterly blur.

**Style prefix — start every character prompt with this, word for word:**

> Hand-drawn 2D cartoon fighting game sprite, same art style as the attached
> character sheet: bold dark-brown outlines, flat cel shading, chunky muscular
> anatomy, warm earthy colors. Side view facing right, single character centered
> on a 192x192 canvas, feet on the same baseline near the bottom, transparent
> background, no parchment, no text, no labels, no ground shadow. Match the
> attached character sheet exactly: same proportions, colors, costume, face and
> outline weight.

**Generating at size:** image tools rarely output 192 × 192 directly. Generate
large (square, 1024 × 1024 or similar) with the character filling the same share
of the frame every time, then downscale to 192 × 192 with high-quality
(Lanczos) resampling. Never nearest-neighbor; this is not pixel art.

**File naming:** `<character>_<category>_<action>_<frame>.png`
- character: `dwarf`, `mole`, `goblin`, `lizard`
- category: `base`, `grab`, `throw`, `thrown`, `portrait`
- frame: two digits, `01`, `02` …
- Example: `goblin_base_walk-fwd_03.png`

**Folders:**
```
assets/
  characters/<character>/study/      (the provided character sheet)
  characters/<character>/base/
  characters/<character>/grab/
  characters/<character>/throw/
  characters/<character>/thrown/
  characters/<character>/portrait/
  stage/cave/
  fx/
  ui/
```

**Opponent dummy:** in grab and throw frames, the attacker is drawn ALONE. The
opponent is added in code using the "thrown" poses. Draw the attacker's hands
gripping empty space where the opponent's body would be, unless a prompt says
otherwise.

---

## 3. Character lock lists

Paste the matching block into `{CHARACTER}` in every prompt. Heights are the
in-game height in pixels on the 192 × 192 canvas; keep them exact so the cast
reads at the right sizes side by side. Palette hex codes are sampled from each
sheet's swatches.

### dwarf — Muscle Dwarf  (in-game height ~112 px, the shortest)
> Muscle Dwarf: short and extremely muscular, about 4.5 heads tall, almost as
> wide as he is tall, huge chest, arms and fists. Tan skin. Wild orange-red hair
> and a huge orange-red beard with thick braids bound by gold rings, heavy brows,
> big nose. Dark brown wrestling trunks; dark brown studded belt with a round gold
> buckle showing crossed hammers; studded dark brown wristbands with gold studs;
> brown boots with cream cross-wrapped straps. Rugged, tough, brawler attitude.
> Palette: #633424 #ac441e #e35d1c #f7996a #fdddaf #58261b #91604c #eea038

### mole — Mole Man  (in-game height ~150 px)
> Mole Man: hulking, feral burrowing brute, about 7.5 heads tall, thick muscular
> build with orange-rust skin. Heavy dark-brown spiky fur over his head, back,
> shoulders, forearms and shins. Long pink mole snout with white whiskers, small
> fierce eyes, two big buck teeth. Huge curved pale-yellow claws on his hands.
> Cream cloth wraps on wrists and ankles; dark brown belt with a gold ring buckle;
> dark plum-brown loincloth; bare clawed feet. Aggressive, animalistic.
> Palette: #673b2c #9c4b2d #df7f42 #dd7d68 #f7dab5 #66372b #dc9544

### goblin — Goblin  (in-game height ~126 px)
> Goblin: lean and sinewy, about 5.5 heads tall, long limbs, hunched agile stance.
> Yellow-green skin. Huge pointed ears with orange inner ears, spiky dark plum
> hair, long hooked orange nose, wide toothy grin with sharp teeth, red eyes.
> Ragged plum loincloth with a gold ring on the belt; plum wrist wraps with cream
> bands; plum and cream foot wraps, bare toes and clawed fingers. Mischievous,
> scrappy.
> Palette: #633146 #887a1c #c7a61f #fbce6d #f17930 #fbd1a0 #824f38 #7b3540

### lizard — Lizard Man  (in-game height ~165 px, the tallest)
> Lizard Man: powerful athletic gladiator build, about 7.5 heads tall. Green
> scales with a yellow belly and chest, orange-red crest spines running from his
> head down his back and along a long, thick tail that reaches the floor. Sharp
> teeth, clawed hands. Brown leather chest harness with gold rings; studded brown
> wrist cuffs; brown belt with a round gold buckle showing a dragon emblem; dark
> red loincloth; tall brown lace-up boots with gold laces. Cold, warrior attitude.
> Palette: #5c5418 #93861f #ecb04c #fbd997 #be462e #70271f #60382d #934f23 #d7982d

---

## 4. Prompt template

```
[STYLE PREFIX]
Character: {CHARACTER}
Animation: {ANIMATION NAME}, frame {N} of {TOTAL}.
Pose: {FRAME DESCRIPTION}
```

Generate frames in order. For each, attach the character sheet and the previous
frame, and keep everything except the described movement identical.

---

## 5. Shared animations — every character (category: base)

Run each row for all four characters. Character-specific notes are in brackets.
Rows marked **0 — reuse** are NOT generated; the game builds them in code from
other frames, as noted.

| Action (file name) | Frames | Frame-by-frame pose |
| --- | --- | --- |
| idle | 2 | 01 fighting stance, knees bent, arms up ready to grapple · 02 chest raised in a breath. Loops back and forth. [lizard: tail sways slightly] |
| walk-fwd | 6 | Stalking walk forward in grapple stance: 01 right foot forward · 02 passing · 03 left foot forward · 04 passing · 05 right foot forward, weight shifting · 06 back to start |
| walk-back | 0 — reuse | walk-fwd played in reverse |
| run | 0 — reuse | walk-fwd played at double speed, sprite tilted forward a few degrees |
| crouch | 2 | 01 dropping into crouch · 02 full low crouch, arms forward, guard up (also used as the crouching block) |
| jump | 5 | 01 knees bent takeoff · 02 rising, legs tucking · 03 peak, tucked · 04 falling, legs extending · 05 landing, knees bent |
| block | 2 | 01 raising forearms in front of face · 02 full guard, braced |
| block-crouch | 0 — reuse | crouch frame 02 |
| strike-light | 3 | Quick chop: 01 wind up · 02 hand extended (contact) · 03 recover. [dwarf: forearm smash] [goblin: slap] |
| strike-heavy | 5 | Big strike: 01 wind up · 02 lunge · 03 contact · 04 follow-through · 05 recover. [dwarf: headbutt] [mole: claw swipe] [goblin: spinning kick] [lizard: tail lash] |
| strike-low | 4 | Low sweep: 01 crouch · 02 leg/tail extends · 03 full extension · 04 recover |
| strike-air | 3 | Airborne attack: 01 tuck · 02 full extension (dropkick or body splash) · 03 retract |
| hit-high | 2 | 01 head snaps back from a hit · 02 staggering, off balance |
| hit-low | 0 — reuse | hit-high frames |
| knockdown | 4 | 01 knocked off feet, airborne · 02 falling backward · 03 back hits the cave floor · 04 bounce |
| lying-up | 1 | Flat on back, face up, limp |
| lying-down | 1 | Flat on stomach, face down |
| getup | 0 — reuse | knockdown frames 03–01 played in reverse, then idle |
| dizzy | 0 — reuse | idle frame 01 wobbling side to side in code, with fx_dizzy-bats circling the head |
| wall-bounce | 3 | Thrown into the cave wall: 01 back slamming into rock · 02 squashed against the wall · 03 rebounding forward |
| wall-jump | 3 | 01 foot planted on the cave wall · 02 pushing off · 03 airborne, launching back toward the opponent |
| stalactite-hang | 2 | Hanging by both hands from a stalactite above, legs swinging, 2-frame loop |
| win | 4 | Victory celebration, also used as the taunt [dwarf: double-bicep flex, belt raised] [mole: roaring, beating his chest, claws raised] [goblin: wiggling tongue, backflip into pose] [lizard: crest flares, arms crossed, tongue flick] |
| ko | 1 | Defeated, flat on back, eyes as Xs |

**Total: 53 frames per character.**

---

## 6. Grab animations — every character (category: grab)

| Action | Frames | Frame-by-frame pose |
| --- | --- | --- |
| lockup | 3 | Collar-and-elbow tie-up: 01 reaching forward with both arms · 02 hands gripping (one at neck height, one at elbow height of an invisible opponent) · 03 straining, pushing forward |
| lockup-win | 0 — reuse | lockup frame 03, slid forward in code |
| lockup-lose | 0 — reuse | lockup frame 02, slid backward in code, then hit-high |
| grab-behind | 3 | 01 stepping behind · 02 arms wrapping a waist from behind · 03 locked waist lock |
| grab-ground | 3 | Picking up a downed opponent: 01 bending over · 02 hands grabbing at floor level · 03 hauling upward to standing height |
| hold-struggle | 2 | Holding an opponent in a submission, straining, 2-frame loop |
| pin | 2 | Lying across an opponent for a pin, 01 and 02 slight pressing motion |
| pin-hold | 2 | Pressing down hard to keep a struggling opponent pinned, straining face, 2-frame loop |
| reversal | 4 | Countering a grab: 01 twisting loose from the opponent's grip · 02 ducking under the opponent's arm · 03 spinning behind · 04 locking a grip on the opponent (flows straight into one of their own throws) |

**Total: 19 frames per character.**

---

## 7. Throws (category: throw)

### Generic — every character

| Action | Frames | Frame-by-frame pose |
| --- | --- | --- |
| body-slam | 5 | 01 scooping arms under an opponent · 02 lifting chest-high · 03 opponent turned horizontal at shoulder height · 04 slamming downward · 05 crouched over after impact |
| rollup | 4 | 01 grabbing low · 02 rolling backward · 03 on back, legs hooking · 04 holding the pin |

### Signature — two per character for version one

Describe only the attacker's body; the opponent is drawn in code. Where a move
spins or flips, ONE tucked frame is drawn and the game rotates it.

**dwarf**
- `throw_anvil-drop` (piledriver, 6 frames): 01 grabbing opponent's waist, bent over · 02 lifting upside-down · 03 opponent held inverted, head down between his knees · 04 jumping up · 05 dropping to sit-out · 06 sitting on the ground after impact
- `throw_keg-press` (press slam, 6 frames): 01 grabbing low · 02 lifting to chest · 03 pressing overhead, arms straight · 04 holding overhead, showing off · 05 throwing down forward · 06 recovering stance

**mole**
- `throw_tunnel-suplex` (8 frames): 01 diving into the ground · 02 only claws visible above dirt · 03 head popping up · 04 bursting out of a dirt mound, arms wrapped around a waist from behind · 05 lifting backward · 06 bridged arch, upside-down behind · 07 bridge at impact · 08 rolling back to feet
- `throw_boulder-roll` (rolling charge, 4 frames): 01 crouching, curling up · 02 tucked into a tight spiky furry ball, claws and snout tucked in (the game spins this frame while it rolls across the screen, kicking up fx_dirt-spray) · 03 uncurling on impact, claws out · 04 claws clamped onto an invisible opponent's waist. On a hit, the game goes straight into a grapple; on a miss, he skids to a stop dizzy

**goblin**
- `throw_snap-ddt` (4 frames): 01 hooking a front headlock · 02 kicking legs forward · 03 falling backward · 04 flat on back after impact
- `throw_stalactite-drop` (moonsault, 5 frames): 01 hanging from a stalactite · 02 letting go, arching back · 03 tucked in a ball mid-air (the game rotates this frame for the backflip) · 04 belly-down splash, arms and legs spread · 05 lying across opponent

**lizard**
- `throw_tail-whip-suplex` (8 frames): 01 turning his back · 02 tail lashing out · 03 tail coiled around an invisible waist · 04 tail lifting high overhead · 05 tail swinging over his shoulder · 06 slamming forward into the ground · 07 tail uncoiling · 08 turning back to face forward
- `throw_basilisk-bomb` (chokeslam, 6 frames): 01 hand gripping an invisible throat · 02 lifting high, arm fully extended · 03 hold at max height, crest flared · 04 slamming downward · 05 crouched over impact · 06 standing tall

**Saved for a later version (do NOT generate now):** dwarf Forge Bomb and Beard
Lariat; mole Claw Clinch and Dig Driver; goblin Gnaw-and-Roll and Hurricanrana;
lizard Coil Crush and Gator Roll.

**Total: 18–23 frames per character** (goblin 18, dwarf 21, mole 21, lizard 23).

---

## 8. Being thrown — every character (category: thrown)

These single frames are reused by every throw in code. Draw the character ALONE.

| Action | Pose |
| --- | --- |
| lifted | Grabbed around the waist, feet off the ground, arms flailing |
| upside-down | Fully inverted, head down, legs straight up (piledriver position) |
| overhead | Horizontal, belly up, limbs dangling (press-slam position) |
| suplex-arc | Bent backward, mid-arc |
| headlock-bent | Bent forward at the waist, head lowered (DDT setup) |
| tail-wrapped | Arms pinned at the sides, squeezed at the waist (Lizard Man's tail grab) |
| spin | Tumbling in mid-air, curled |
| squeezed | Crushed in a bear hug, pained face, arms pinned |
| slam-impact | Flat against the ground at impact, body bent from the force |
| pinned | Flat on back, shoulders down, one arm raised struggling |
| pinned-struggle | Second frame of the pin struggle: legs kicking, shoulders twisting (alternates with pinned) |
| kick-out | Bursting out of a pin, shoulder lifted off the ground, arms flung up |

Files: `<character>_thrown_<action>_01.png`. **Total: 12 frames per character.**
[lizard: tail limp in all thrown poses] [goblin: ears flopping] [dwarf: beard flying]

---

## 9. Portraits (category: portrait)

Do NOT use the side-view rule here; these face the viewer. Base them on the
"Head / Expressions" row of the character sheet.

| Action | Size | Prompt |
| --- | --- | --- |
| select | 160 × 160 | Head and shoulders, three-quarter view, confident expression (use the sheet's first expression), flat dark-brown background |
| vs | 320 × 400 | Waist-up dramatic pose, lit warmly from below by torchlight, roaring expression (the sheet's open-mouth expression), transparent background |
| icon | 64 × 64 | Head only, three-quarter view, simple readable face |
| hurt | 160 × 160 | Same framing as select, using the sheet's hurt expression, plus a bruise (KO screen) |

---

## 10. Stage — cave battleground (`assets/stage/cave/`)

There is no wrestling ring. The fight happens on open cave floor, with rock walls
at the left and right edges of the screen and stalactites hanging overhead.

**Style reference:** generate `stage_cave_wall` first. Once approved, attach it
(and one character sheet, for outline weight and palette) to EVERY other stage,
effect and UI prompt, the same way character frames use their sheet.

**Style prefix for stage art (replaces the character prefix):**

> Hand-drawn 2D cartoon fighting game background in the same art style as the
> attached character sheets: bold dark-brown outlines (thinner than on the
> characters), flat cel shading, warm earthy palette of deep browns, rust and
> burnt orange with gold accents. Side-scrolling parallax layer, seen straight on
> from the side. Slightly lower contrast and less detailed than the characters
> so the wrestlers stand out. No characters unless asked, no text.

Shared background palette (from the sheets): deep brown #58261b, dark brown
#633424, rust #9c4b2d, burnt orange #df7f42, amber gold #dc9544, warm cream
#f7dab5, outline #3a2018. Glows are warm amber-gold, not blue.

| File | Size | Prompt |
| --- | --- | --- |
| stage_cave_wall.png | 1280 × 540 | Far back wall of a huge underground cavern: layered dark-brown and rust rock with deep cracks and ledges, big stalactites along the top edge, a few veins of glowing amber-gold crystal. Warm torchlight glowing from lower left and right, fading to deep brown shadow at the top. Middle and lower area darker and simpler, where wrestlers fight. Fully opaque. |
| stage_cave_crystals_01–03.png | 1280 × 540 | Only the amber-gold crystal veins from stage_cave_wall, in the same positions, transparent background; three brightness levels for a slow pulse |
| stage_cave_crowd_01–02.png | 1280 × 200 | Rock ledges packed with small rival-tribe spectators drawn in the style of the character sheets: red-bearded dwarves, furry orange mole folk with pink snouts, green goblins with plum hair and big ears, green lizard folk with orange crests, plus a few bats. Darker and slightly desaturated so they sit behind the action. Transparent background; frame 02 has arms raised |
| stage_cave_crowd_cheer_01–02.png | 1280 × 200 | Same crowd, wildly excited, fists pumping, for big slams |
| stage_cave_ground.png | 1280 × 100 | Uneven cave floor of packed brown dirt and flat rust-colored stone slabs where the fight happens, seen from the side at a slight angle |
| stage_cave_wall-left.png, stage_cave_wall-right.png | 120 × 540 | Rough brown rock walls at the screen edges that wrestlers bounce off and get thrown into, outlined like the characters, transparent background |
| stage_cave_stalactites.png | 960 × 120 | Hanging rust-brown stalactites across the ceiling; two thicker ones with a worn grip area that wrestlers can hang from; transparent background |
| stage_cave_banner_01–04.png | 80 × 120 | Tattered cloth banner for the tribe that controls the cave, each using that wrestler's colors and emblem: 01 dwarf (dark brown cloth, gold crossed hammers), 02 mole (rust cloth, three gold claw slashes), 03 goblin (plum cloth, gold pointed-ear symbol), 04 lizard (dark red cloth, gold dragon emblem). Transparent background |
| stage_cave_torch_01–04.png | 40 × 80 | Wall torch with a wrapped wooden handle and a cartoon flame, 4-frame flicker loop, transparent background |
| stage_cave_floor.png | 1280 × 75 | Foreground strip of dirt, small puddles and scattered bones, transparent top edge |
| stage_cave_drip_01–03.png | 20 × 40 | Water drop forming and falling |
| stage_cave_foreground.png | 1280 × 125 | Dark brown foreground stalagmites at the left and right edges only, transparent middle |
| stage_cave_vignette.png | 960 × 540 | Deep-brown vignette fading to transparent in the center (can also be done in code) |

**Screens (same stage style prefix):**

| File | Size | Prompt |
| --- | --- | --- |
| screen_title_bg.png | 960 × 540 | Grand cave entrance lit by torches, the four tribe banners hanging from the rock, dramatic warm light, empty space in the upper middle for the logo |
| screen_select_bg.png | 960 × 540 | Dim cave chamber with four stone alcoves, one per tribe, each lit by a torch, darker in the middle where the selection boxes sit |
| screen_vs_bg.png | 960 × 540 | Cave background split diagonally into two halves with a glowing amber crack between them, space on the left and right for the two VS portraits |

## 11. Effects (`assets/fx/`)

Effects use the stage style reference, with cartoon outlines and cel shading,
transparent backgrounds, and no character.

| File | Size | Prompt |
| --- | --- | --- |
| fx_hit-light_01–03 | 80 × 80 | Small cream-and-amber cartoon impact burst |
| fx_hit-heavy_01–03 | 120 × 120 | Large burnt-orange and cream star-shaped impact burst with brown outline |
| fx_dust_01–04 | 160 × 80 | Brown cartoon dust cloud puffing outward from a body slam |
| fx_dizzy-bats_01–04 | 80 × 40 | Three tiny cartoon bats circling in a loop |
| fx_burrow-mound_01–03 | 120 × 60 | Brown dirt mound rising from the ground (Mole Man) |
| fx_dirt-spray_01–03 | 120 × 120 | Brown dirt clods spraying upward |
| fx_debris_01–03 | 40 × 40 | Small rust-brown rocks falling from the ceiling |
| fx_shadow_01 | 120 × 20 | Soft dark-brown oval shadow, semi-transparent (can also be drawn in code) |
| fx_sweat_01–02 | 40 × 40 | Cartoon sweat drops flying off a straining wrestler |

---

## 12. UI (`assets/ui/`)

Style prefix for UI:

> Hand-drawn 2D cartoon fighting game interface element in the same art style as
> the attached character sheets: bold dark-brown outlines, flat cel shading,
> carved rust-brown stone with gold trim, bold readable shapes, transparent
> background.

| File | Size | Prompt |
| --- | --- | --- |
| ui_healthbar_frame | 400 × 40 | Carved stone health bar frame, empty interior |
| ui_healthbar_fill | 375 × 20 | Amber-gold fill strip (red version: ui_healthbar_fill-low) |
| ui_stamina_frame | 300 × 20 | Smaller stone frame for the stamina bar |
| ui_stamina_fill | 290 × 10 | Cream fill strip |
| ui_timer_frame | 80 × 60 | Stone plaque for the round timer |
| ui_timing-ring_01–04 | 120 × 120 | Glowing ring shrinking inward for the grapple timing window |
| ui_timing-perfect_01–02 | 120 × 120 | Bright flash for a perfect grapple press |
| ui_text-round1, round2, round3 | 400 × 80 | "ROUND 1" etc. in chunky carved-stone letters |
| ui_text-fight | 400 × 120 | "FIGHT!" in fiery carved letters |
| ui_text-ko | 320 × 160 | "K.O." cracking stone letters |
| ui_text-pin-1, pin-2, pin-3 | 120 × 120 | Big numbers 1, 2, 3 for the pin count |
| ui_pin-meter_frame | 240 × 30 | Stone tug-of-war bar shown during a pin |
| ui_pin-meter_marker | 20 × 40 | Marker that slides toward "pinned" or "escape" as both players mash |
| ui_mash-prompt_01–02 | 80 × 80 | Flashing "MASH!" button icon shown to both players during pins and holds |
| ui_text-reversal | 320 × 80 | "REVERSAL!" in carved letters, flashed when a counter lands |
| ui_select_frame | 180 × 180 | Character select box, stone border |
| ui_select_cursor-p1, -p2 | 180 × 180 | Glowing cursor border, P1 burnt orange, P2 green |
| ui_select_locked | 180 × 180 | Semi-transparent dark overlay with a small padlock, shown over a wrestler the other player already picked |
| ui_tag-p1, ui_tag-p2 | 40 × 20 | Small "P1" / "P2" marker shown above each wrestler during the fight |
| ui_title_logo | 640 × 240 | "CAVE SLAM" logo, stone letters with stalactites dripping off |

---

## 13. Cave events (random hazards and pickups)

Three random events add chaos to a match. Only one event happens at a time, every
20–40 seconds (tune in playtesting). Event art uses the stage style prefix and
style reference from Section 10, except the per-character poses, which use the character prefix and
the full Section 1 workflow.

### Cave rumble (falling stalactites)
The screen shakes, warning shadows appear on the floor, then stalactites crash
down. A wrestler who blocks with arms overhead takes reduced damage; anyone caught
unguarded is knocked down. A grapple in progress is broken up.

| File | Size | Prompt |
| --- | --- | --- |
| stage_cave_stalactite-fall_01–03 | 60 × 160 | A single rust-brown stalactite: 01 cracking loose from the ceiling · 02 falling · 03 hitting the floor |
| fx_warning-shadow_01–02 | 80 × 20 | Dark oval shadow on the floor, growing larger, pulsing |
| fx_rock-shatter_01–04 | 120 × 120 | Stalactite shattering into rock chunks and dust |
| ui_text-rumble | 400 × 80 | "CAVE-IN!" in cracked, shaking stone letters |

Per character (category: base):
| Action | Frames | Pose |
| --- | --- | --- |
| block-overhead | 0 — reuse | block frames, with fx_rock-shatter bursting above the head |

### Cave spider
A big cave spider drops from the ceiling on a silk thread, shoots a web at one
wrestler (chosen at random) and climbs away. The webbed wrestler is stuck for a
few seconds and can mash to break free faster. The other player gets free grabs.

| File | Size | Prompt |
| --- | --- | --- |
| stage_cave_spider_descend_01–04 | 120 × 160 | Big hairy cartoon cave spider, dark plum-brown with glowing amber eyes, lowering on a silk thread, legs twitching |
| stage_cave_spider_shoot_01–03 | 120 × 160 | 01 rearing back · 02 shooting web from its spinnerets · 03 recoil |
| stage_cave_spider_climb_01–02 | 120 × 160 | Climbing back up its thread |
| fx_web-shot_01–03 | 80 × 80 | Glob of sticky white web flying through the air |
| fx_web-wrap_01–03 | 192 × 192 | Web strands wrapped around a wrestler-sized space, transparent middle; 03 = torn and breaking apart. Layered over the webbed wrestler in code |

Per character (category: base):
| Action | Frames | Pose |
| --- | --- | --- |
| webbed | 0 — reuse | idle frame 01, shaking in code, with fx_web-wrap layered on top |

### Baby oil
A bottle of baby oil drops in at a random spot. Whoever reaches it first coats
themselves. While oiled (about 10 seconds), the opponent's grabs often slip off.
The oiled wrestler shines.

| File | Size | Prompt |
| --- | --- | --- |
| stage_item_oil-bottle_01–02 | 40 × 60 | Plump plastic bottle of baby oil with a plain pink label and no brand name, glinting (2-frame sparkle) |
| fx_oil-splash_01–03 | 120 × 120 | Shiny golden oil splashing outward |
| fx_oil-shine_01–03 | 192 × 192 | Small white sparkle glints scattered over a wrestler-sized space, transparent background. Layered over the oiled wrestler in code (plus a glossy tint) |
| ui_text-oiled | 320 × 80 | "OILED UP!" in glossy letters |

Per character (category: base / grab):
| Action | Frames | Pose |
| --- | --- | --- |
| base_oil-apply | 4 | Grabbing the bottle and slathering oil on: 01 snatching bottle · 02 squeezing it over head · 03 rubbing arms and chest · 04 flexing, shiny |
| grab_slip | 2 | Attacker's grab sliding off a slippery opponent: 01 hands slipping, surprised · 02 stumbling forward, empty-handed |

---

## 14. Game rules that affect assets

- **Story:** subterranean creatures wrestle for control of the cave. There is
  no ring, ropes or turnbuckles. The fight is on open cave floor, bounded by rock
  walls, with grab-able stalactites overhead.
- **Focus:** grabs, slams and timing-based grapples. Strikes only set up grabs.
- **King of the Hill:** one cave, one scenario. The background shows the banner
  of whoever won the last match (stage_cave_banner_01–04), as the tribes fight
  for control of the cave complex.
- **Winning:** a match ends by KO (health bar empty) or by pinfall.
- **Pins:** a pin is a tug-of-war. The pinned player mashes to escape while the
  pinner presses back to hold them down; the pin meter shows who is winning. If
  the marker stays on "pinned" through the 1-2-3 count, the pinner wins.
- **Reversals:** if the defender also hits the grapple timing perfectly, they
  reverse the move and throw the attacker instead (grab_reversal frames).
- **No finishers or super moves** for the first version.
- **Cave events:** cave rumble, cave spider and baby oil happen at random, one at
  a time (Section 13).
- **No computer opponent:** two players only.
- **Controls:** keyboard (two players can share one) and gamepads through the
  browser's Gamepad API, which Phaser supports. No mouse controls.

- **2 players, local:** both players on one device.
- **Character select:** each player picks one of the four wrestlers. Once a
  wrestler is picked (or highlighted and confirmed) by one player, that wrestler
  is grayed out and locked for the other player (ui_select_locked overlay plus a
  gray tint in code). No mirror matches, so no alternate palettes are needed.
- **Facing:** P1 starts on the left facing right; P2 starts on the right and is
  flipped with setFlipX(true).

**Wrestler stats (1–5), for the game code:**

| Wrestler | Speed | Power | Grapple | Toughness | Reach | Role |
| --- | --- | --- | --- | --- | --- | --- |
| Goblin | 5 | 2 | 2 | 2 | 3 | Speedster: fastest mover, quick dives, but loses straight lock-ups and can't take many slams |
| Muscle Dwarf | 3 | 4 | 3 | 4 | 2 | All-rounder: solid at everything, short reach |
| Mole Man | 3 | 3 | 4 | 3 | 2 | Wild animal: aggressive, burrows and rolls to get in close, claw holds hard to escape |
| Lizard Man | 1 | 5 | 4 | 5 | 5 | Tank: slowest mover, longest reach and most health, slow to get back up |

---

## 15. Phaser export (target engine: Phaser 3)

Generate individual frames as described above, then pack them for Phaser.

**Texture atlases:**
- Pack each character's frames into one atlas: `<character>_atlas.png` +
  `<character>_atlas.json`, in Phaser's JSON Hash format (TexturePacker
  "Phaser 3" export, or the free-tex-packer CLI).
- Frame keys in the JSON = the file name without `.png`
  (e.g. `goblin_base_walk-fwd_03`), so animations can be built by prefix.
- Atlas size: max 2048 × 2048 per sheet; split into `_atlas-0`, `_atlas-1` if needed.
- Do NOT trim transparent space when packing. Every frame must stay a full
  192 × 192 cell so the feet baseline never shifts.
- Export atlases as WebP (quality ~85) with a PNG fallback to keep the download small.
- Pack stage, fx and UI into their own atlases: `stage_cave_atlas`,
  `fx_atlas`, `ui_atlas`. Large single backgrounds (stage_cave_wall) can stay
  as standalone PNGs.

**Sprite origin:** set every character sprite's origin to `(0.5, 0.9375)`,
which is the feet baseline at row 180 of 192. Use `setFlipX(true)` for the
wrestler facing left; never generate left-facing art.

**Render settings:** this is smooth illustrated art, not pixel art. Use
`pixelArt: false` and `antialias: true`, with a base resolution of 960 × 540
scaled by `Phaser.Scale.FIT`.

**Animation data:** create `assets/characters/<character>/<character>_anims.json`
listing each animation's key, frame prefix, frame count, frame rate and whether
it loops, e.g.:

```json
{ "key": "goblin_walk-fwd", "prefix": "goblin_base_walk-fwd_", "frames": 6, "frameRate": 10, "repeat": -1 }
```

Animations marked "0 — reuse" in Sections 5–7 and 13 get their own entries
here that point at the reused frames, with a `reverse`, `speed`, `rotate`,
`offsetX` or `fx` field describing what the code does to them.

**Hitboxes:** create `<character>_hitboxes.json` with, for each attack, grab
and throw frame, a hurtbox and an optional hitbox or grab box as
`{ x, y, w, h }` in 192 × 192 frame pixels. Grab frames also need an
`attach` point `{ x, y }` marking where the thrown opponent's body is placed.

**Audio:** export sound effects and music as both `.ogg` and `.mp3`, since
Phaser loads whichever the browser supports.

---

## 16. Totals

| Group | Goblin | Dwarf | Mole | Lizard |
| --- | --- | --- | --- | --- |
| base | 53 | 53 | 53 | 53 |
| grab | 19 | 19 | 19 | 19 |
| throw | 18 | 21 | 21 | 23 |
| thrown | 12 | 12 | 12 | 12 |
| events (oil-apply, grab_slip) | 6 | 6 | 6 | 6 |
| portrait | 4 | 4 | 4 | 4 |
| **Total** | **112** | **115** | **115** | **117** |

**All four wrestlers: about 460 frames.** Plus about 25 stage, 30 effect,
34 UI and 35 cave-event assets, roughly 585 images in all.

---

## 17. Smooth movement pass — in-between frames (added after the first build)

The first playtest showed the basic movement is too choppy: idle has 2 frames,
crouch and block jump straight to their end pose, the jump arc has big gaps,
walking backward is just walk-fwd reversed, and turning around is an instant
flip. This pass adds in-between frames and four new movement animations.

The local server discovers new art on refresh. Stage and install one complete
animation at a time. The game reads frames in order, and a gap can cause an old
atlas frame or a placeholder to appear during playback.

**Rules for this pass (on top of Section 1):**

1. **Renumber, don't append.** Each animation below lists its new frame count
   and says which new frame number each existing frame becomes. Copy the kept
   frames to a working folder outside `assets/` and renumber the copies first
   (for example `goblin_base_idle_02.png` becomes `goblin_base_idle_04.png`).
   Generate only the missing numbers, then install the complete sequence.
   Never redraw a frame that is kept.
2. For each new in-between, attach the character sheet **plus the kept frames
   on both sides of it** (the one before and the one after), and describe it as
   halfway between them. Keep everything identical except the movement.
3. Same consistency check as Section 1, step 4. Pay extra attention to the
   feet: in-betweens must keep the same baseline (row 180) and the same
   in-game height as their neighbours, so the figure doesn't pop up and down.
4. When an animation is done for a character, re-pack that character's atlas
   and update `<character>_anims.json` with the new `frames` count and the
   `frameRate` from the table (the game also works without the json update).
5. Add a line per file to `assets/manifest.md` as usual.

**Order of work:** goblin first (his art is complete, so the result can be
checked in-game right away with the Frame Inspector), then dwarf, mole, lizard
as each character's base set is finished. Do tier 1 for a character before
tier 2.

### 17.1 Tier 1 — core movement (every character, category: base)

Use the Section 4 prompt template. "Kept" frames are the existing ones,
renamed as shown; "new" frames are generated.

| Action (file name) | Old → new frames | Play rate | Frame-by-frame (kept frames marked K) |
| --- | --- | --- | --- |
| idle | 2 → 6, loops | 8 fps | 01 **K (old 01)** fighting stance · 02 chest starting to rise, shoulders lifting slightly · 03 inhaling, chest higher, hands drifting up a little · 04 **K (old 02)** chest at its highest · 05 exhaling, chest lowering, knees bending slightly · 06 almost back to the stance, slightly lower than 01 so the loop settles into 01. No yoyo: 06 flows back into 01. [lizard: tail sways one way over 01–03 and back over 04–06] [goblin: ears bob a frame behind the chest] [dwarf: beard braids swing a frame behind the chest] |
| walk-fwd | 6 → 10, loops | 15 fps | Regenerate as a 10-frame stalking cycle; keep 01 as **K (old 01)**, right foot forward, and use the old 02–06 as references for pose and spacing. 01 right foot forward, contact · 02 weight settling onto right foot, body lowest · 03 left foot passing under body · 04 left foot reaching forward, body highest · 05 left heel touching down · 06 left foot forward, contact (mirror of 01) · 07 weight settling onto left foot, body lowest · 08 right foot passing · 09 right foot reaching forward, body highest · 10 right heel about to touch down (flows into 01). Hands stay up in grapple stance throughout, bobbing with the body. The new 02–06 overwrite the old files with those numbers, so copy the old 02–06 outside `assets/` first if you want them as references. |
| walk-back | NEW, 10, loops | 15 fps | Cautious backward shuffle in grapple stance, still facing right, weight on the back foot, chin tucked: 01 left (back) foot reaching backward, toe touching · 02 weight shifting back onto left foot · 03 right foot sliding back past it · 04 right foot reaching back · 05 right toe touching down · 06 weight shifting onto right foot · 07 left foot sliding back · 08 left foot reaching back · 09 left toe touching down · 10 settling (flows into 01). Shorter steps than walk-fwd. Replaces the "walk-fwd reversed" reuse. |
| crouch | 2 → 4 | 24 fps (plays once, holds last) | 01 knees starting to bend, hips dropping · 02 **K (old 01)** dropping into crouch · 03 almost fully down, arms coming forward · 04 **K (old 02)** full low crouch, guard up (still used as crouch-block). |
| jump | 5 → 8 | follows the jump arc in code | 01 **K (old 01)** knees bent, takeoff · 02 NEW legs extending, pushing off the floor, toes just leaving the ground, arms swinging up · 03 **K (old 02)** rising, legs tucking · 04 NEW rising, almost fully tucked, near the peak · 05 **K (old 03)** peak, tucked · 06 NEW starting to fall, legs beginning to extend, arms out for balance · 07 **K (old 04)** falling, legs extending · 08 **K (old 05)** landing, knees bent. |
| land | NEW, 2 | 14 fps | Landing recovery after a jump or drop: 01 heavy landing, knees deeply bent, arms out and down for balance, body low (lower than crouch 02) · 02 rising back toward the fighting stance, about halfway between 01 and idle 01. Played right after jump 08. |
| turn | NEW, 3 | 18 fps | Pivoting to face the opponent when they jump over or cross under. Still a right-facing sprite (the game flips the old facing away first): 01 body seen mostly from behind, three-quarter back view, head already turning right, guard half up · 02 body seen from the front, three-quarter front view, mid-pivot, feet shuffling · 03 almost side-on facing right, settling into the fighting stance (one step before idle 01). |
| block | 2 → 3 | 22 fps (plays once, holds last) | 01 **K (old 01)** raising forearms in front of face · 02 NEW forearms nearly in place, shoulders hunching, knees bracing · 03 **K (old 02)** full guard, braced. |

**Tier 1 total: 34 new frames per character** (idle 4, walk-fwd 9 (02–10
regenerated), walk-back 10, crouch 2, jump 3, land 2, turn 3, block 1).

### 17.2 Tier 2 — recovery and air movement (every character, category: base)

| Action (file name) | Old → new frames | Play rate | Frame-by-frame (kept frames marked K) |
| --- | --- | --- | --- |
| getup | NEW, 4 | 12 fps | Getting up after being knocked down (replaces "knockdown played in reverse"): 01 flat on back, rolling onto one side, one hand planted · 02 pushing up onto one knee, other hand on the floor · 03 rising from the knee, guard coming up · 04 almost standing, settling into the fighting stance. [lizard: tail pushes against the floor in 01–02, he is slower to rise, so his 02–03 are more laboured] [mole: claws dig into the dirt in 01–02] |
| hit-high | 2 → 4 | 16 fps | 01 **K (old 01)** head snaps back · 02 NEW head and shoulders thrown further back, arms flung out · 03 **K (old 02)** staggering, off balance · 04 NEW catching balance, guard coming back up (one step before idle 01). |
| stalactite-hang | 2 → 4, loops | 6 fps | 01 **K (old 01)** hanging, legs swung forward · 02 NEW legs swinging back through the middle, hanging straight down · 03 **K (old 02)** legs swung back · 04 NEW legs swinging forward through the middle (flows into 01). Hands stay exactly on the same grip spot in every frame. |
| wall-jump | 3 → 5 | 18 fps | 01 **K (old 01)** foot planted on the cave wall · 02 NEW knee bent, body coiled against the wall · 03 **K (old 02)** pushing off · 04 NEW legs straightening, body leaving the wall, arms swinging toward the opponent · 05 **K (old 03)** airborne, launching back toward the opponent. |

**Tier 2 total: 10 new frames per character** (getup 4, hit-high 2,
stalactite-hang 2, wall-jump 2).

### 17.3 Not needed

- **run:** the game has no run move yet, so the reused walk-fwd is fine.
- Strikes, grabs and throws: their timing is driven by the move, not the
  frame count, and they read fine at their current counts. Revisit after
  playtesting.

### 17.4 Updated per-character totals

| Group | Goblin | Dwarf | Mole | Lizard |
| --- | --- | --- | --- | --- |
| Section 16 total | 112 | 115 | 115 | 117 |
| Tier 1 net additions | +29 | +29 | +29 | +29 |
| Tier 2 smooth movement | +10 | +10 | +10 | +10 |
| **New total** | **151** | **154** | **154** | **156** |

Each wrestler needs 44 renders. Five of the Tier 1 walk-forward renders
replace existing files, so each wrestler gains 39 files overall.

Example `<character>_anims.json` entries after this pass:

```json
{ "key": "goblin_idle", "prefix": "goblin_base_idle_", "frames": 6, "frameRate": 8, "repeat": -1 },
{ "key": "goblin_walk-back", "prefix": "goblin_base_walk-back_", "frames": 10, "frameRate": 15, "repeat": -1 },
{ "key": "goblin_land", "prefix": "goblin_base_land_", "frames": 2, "frameRate": 14, "repeat": 0 },
{ "key": "goblin_turn", "prefix": "goblin_base_turn_", "frames": 3, "frameRate": 18, "repeat": 0 }
```

Remove the old `"reverse": true` entries for walk-back and getup once the
dedicated frames exist.
