# CAVE SLAM Asset Manifest

## Character references

Paths below are relative to the project root. Use the PNG reference when
preparing a render prompt. The game loader skips the `study/` folders.

| Wrestler | Original study in `media/` | Local PNG reference |
| --- | --- | --- |
| Goblin | `media/Goblin Character Study Sheet.webp` | `assets/characters/goblin/study/goblin_study_sheet.png` |
| Muscle Dwarf | `media/Muscle Dwarf Character Study.webp` | `assets/characters/dwarf/study/dwarf_study_sheet.png` |
| Mole Man | `media/Mole Man Character Study Sheet.png` | `assets/characters/mole/study/mole_study_sheet.png` |
| Lizard Man | `media/Lizard Man Character Study Sheet.webp` | `assets/characters/lizard/study/lizard_study_sheet.png` |

`media/Fantasy Wrestler Lineup.webp` is the group reference.

## Movement pass

The [art brief](../CAVE_SLAM_ASSET_PROMPTS.md#17-smooth-movement-pass--in-between-frames-added-after-the-first-build) specifies the movement updates. The Goblin set was re-rendered as a complete set of 151 sprites and portraits, including both movement tiers. Muscle Dwarf was also re-rendered as a complete set of 154 sprites and portraits. Mole Man was re-rendered as a complete set of 154 sprites and portraits. Lizard Man now has all 156 sprites and portraits, including the completed movement pass.

The table shows the status of the movement animations in the game.

| Tier | Action | Goblin | Muscle Dwarf | Mole Man | Lizard Man |
| --- | --- | --- | --- | --- | --- |
| 1 | `idle` | Complete | Complete | Complete | Complete |
| 1 | `walk-fwd` | Complete | Complete | Complete | Complete |
| 1 | `walk-back` | Complete | Complete | Complete | Complete |
| 1 | `crouch` | Complete | Complete | Complete | Complete |
| 1 | `jump` | Complete | Complete | Complete | Complete |
| 1 | `land` | Complete | Complete | Complete | Complete |
| 1 | `turn` | Complete | Complete | Complete | Complete |
| 1 | `block` | Complete | Complete | Complete | Complete |
| 2 | `getup` | Complete | Complete | Complete | Complete |
| 2 | `hit-high` | Complete | Complete | Complete | Complete |
| 2 | `stalactite-hang` | Complete | Complete | Complete | Complete |
| 2 | `wall-jump` | Complete | Complete | Complete | Complete |
| | **Renders needed** | **0** | **0** | **0** | **0** |

**All four wrestlers have both movement tiers installed.**

## Game assets

Paths in this table are relative to `assets/`.

| File | Status | Notes |
| --- | --- | --- |
| characters/mole/base/mole_base_block_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_block_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_block_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_crouch_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_crouch_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_crouch_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_crouch_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_getup_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_getup_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_getup_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_getup_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_hit-high_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_hit-high_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_hit-high_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_hit-high_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_idle_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_idle_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_idle_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_idle_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_idle_05.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_idle_06.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_jump_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_jump_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_jump_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_jump_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_jump_05.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_jump_06.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_jump_07.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_jump_08.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_knockdown_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_knockdown_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_knockdown_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_knockdown_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_ko_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_land_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_land_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_lying-down_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_lying-up_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_oil-apply_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_oil-apply_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_oil-apply_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_oil-apply_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_stalactite-hang_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_stalactite-hang_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_stalactite-hang_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_stalactite-hang_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_strike-air_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_strike-air_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_strike-air_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_strike-heavy_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_strike-heavy_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_strike-heavy_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_strike-heavy_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_strike-heavy_05.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_strike-light_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_strike-light_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_strike-light_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_strike-low_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_strike-low_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_strike-low_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_strike-low_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_turn_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_turn_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_turn_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-back_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-back_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-back_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-back_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-back_05.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-back_06.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-back_07.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-back_08.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-back_09.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-back_10.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-fwd_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-fwd_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-fwd_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-fwd_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-fwd_05.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-fwd_06.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-fwd_07.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-fwd_08.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-fwd_09.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_walk-fwd_10.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_wall-bounce_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_wall-bounce_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_wall-bounce_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_wall-jump_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_wall-jump_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_wall-jump_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_wall-jump_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_wall-jump_05.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_win_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_win_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_win_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/base/mole_base_win_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_grab-behind_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_grab-behind_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_grab-behind_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_grab-ground_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_grab-ground_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_grab-ground_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_hold-struggle_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_hold-struggle_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_lockup_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_lockup_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_lockup_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_pin-hold_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_pin-hold_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_pin_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_pin_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_reversal_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_reversal_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_reversal_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_reversal_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_slip_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/grab/mole_grab_slip_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/portrait/mole_portrait_hurt_01.png | done | Fresh Mole Man render. 160 x 160 PNG. |
| characters/mole/portrait/mole_portrait_icon_01.png | done | Fresh Mole Man render. 64 x 64 PNG. |
| characters/mole/portrait/mole_portrait_select_01.png | done | Fresh Mole Man render. 160 x 160 PNG. |
| characters/mole/portrait/mole_portrait_vs_01.png | done | Fresh Mole Man render. 320 x 400 PNG. |
| characters/mole/throw/mole_throw_body-slam_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_body-slam_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_body-slam_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_body-slam_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_body-slam_05.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_boulder-roll_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_boulder-roll_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_boulder-roll_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_boulder-roll_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_rollup_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_rollup_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_rollup_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_rollup_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_tunnel-suplex_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_tunnel-suplex_02.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_tunnel-suplex_03.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_tunnel-suplex_04.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_tunnel-suplex_05.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_tunnel-suplex_06.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_tunnel-suplex_07.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/throw/mole_throw_tunnel-suplex_08.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/thrown/mole_thrown_headlock-bent_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/thrown/mole_thrown_kick-out_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/thrown/mole_thrown_lifted_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/thrown/mole_thrown_overhead_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/thrown/mole_thrown_pinned-struggle_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/thrown/mole_thrown_pinned_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/thrown/mole_thrown_slam-impact_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/thrown/mole_thrown_spin_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/thrown/mole_thrown_squeezed_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/thrown/mole_thrown_suplex-arc_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/thrown/mole_thrown_tail-wrapped_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/mole/thrown/mole_thrown_upside-down_01.png | done | Fresh Mole Man render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_block_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_block_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_block_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_crouch_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_crouch_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_crouch_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_crouch_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_getup_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_getup_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_getup_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_getup_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_hit-high_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_hit-high_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_hit-high_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_hit-high_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_idle_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_idle_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_idle_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_idle_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_idle_05.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_idle_06.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_jump_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_jump_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_jump_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_jump_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_jump_05.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_jump_06.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_jump_07.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_jump_08.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_knockdown_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_knockdown_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_knockdown_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_knockdown_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_ko_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_land_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_land_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_lying-down_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_lying-up_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_oil-apply_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_oil-apply_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_oil-apply_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_oil-apply_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_stalactite-hang_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_stalactite-hang_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_stalactite-hang_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_stalactite-hang_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_strike-air_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_strike-air_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_strike-air_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_strike-heavy_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_strike-heavy_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_strike-heavy_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_strike-heavy_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_strike-heavy_05.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_strike-light_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_strike-light_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_strike-light_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_strike-low_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_strike-low_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_strike-low_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_strike-low_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_turn_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_turn_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_turn_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-back_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-back_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-back_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-back_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-back_05.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-back_06.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-back_07.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-back_08.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-back_09.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-back_10.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-fwd_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-fwd_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-fwd_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-fwd_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-fwd_05.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-fwd_06.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-fwd_07.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-fwd_08.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-fwd_09.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_walk-fwd_10.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_wall-bounce_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_wall-bounce_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_wall-bounce_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_wall-jump_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_wall-jump_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_wall-jump_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_wall-jump_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_wall-jump_05.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_win_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_win_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_win_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/base/dwarf_base_win_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_grab-behind_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_grab-behind_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_grab-behind_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_grab-ground_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_grab-ground_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_grab-ground_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_hold-struggle_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_hold-struggle_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_lockup_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_lockup_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_lockup_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_pin-hold_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_pin-hold_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_pin_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_pin_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_reversal_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_reversal_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_reversal_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_reversal_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_slip_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/grab/dwarf_grab_slip_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/portrait/dwarf_portrait_hurt_01.png | done | Fresh Muscle Dwarf render. 160 x 160 PNG. |
| characters/dwarf/portrait/dwarf_portrait_icon_01.png | done | Fresh Muscle Dwarf render. 64 x 64 PNG. |
| characters/dwarf/portrait/dwarf_portrait_select_01.png | done | Fresh Muscle Dwarf render. 160 x 160 PNG. |
| characters/dwarf/portrait/dwarf_portrait_vs_01.png | done | Fresh Muscle Dwarf render. 320 x 400 PNG. |
| characters/dwarf/throw/dwarf_throw_anvil-drop_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_anvil-drop_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_anvil-drop_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_anvil-drop_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_anvil-drop_05.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_anvil-drop_06.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_body-slam_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_body-slam_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_body-slam_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_body-slam_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_body-slam_05.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_keg-press_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_keg-press_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_keg-press_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_keg-press_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_keg-press_05.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_keg-press_06.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_rollup_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_rollup_02.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_rollup_03.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/throw/dwarf_throw_rollup_04.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/thrown/dwarf_thrown_headlock-bent_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/thrown/dwarf_thrown_kick-out_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/thrown/dwarf_thrown_lifted_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/thrown/dwarf_thrown_overhead_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/thrown/dwarf_thrown_pinned-struggle_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/thrown/dwarf_thrown_pinned_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/thrown/dwarf_thrown_slam-impact_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/thrown/dwarf_thrown_spin_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/thrown/dwarf_thrown_squeezed_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/thrown/dwarf_thrown_suplex-arc_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/thrown/dwarf_thrown_tail-wrapped_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/dwarf/thrown/dwarf_thrown_upside-down_01.png | done | Fresh Muscle Dwarf render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_block_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_block_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_block_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_crouch_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_crouch_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_crouch_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_crouch_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_getup_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_getup_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_getup_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_getup_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_hit-high_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_hit-high_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_hit-high_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_hit-high_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_idle_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_idle_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_idle_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_idle_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_idle_05.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_idle_06.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_jump_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_jump_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_jump_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_jump_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_jump_05.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_jump_06.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_jump_07.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_jump_08.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_knockdown_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_knockdown_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_knockdown_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_knockdown_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_ko_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_land_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_land_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_lying-down_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_lying-up_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_oil-apply_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_oil-apply_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_oil-apply_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_oil-apply_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_stalactite-hang_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_stalactite-hang_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_stalactite-hang_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_stalactite-hang_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_strike-air_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_strike-air_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_strike-air_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_strike-heavy_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_strike-heavy_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_strike-heavy_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_strike-heavy_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_strike-heavy_05.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_strike-light_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_strike-light_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_strike-light_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_strike-low_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_strike-low_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_strike-low_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_strike-low_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_turn_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_turn_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_turn_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-back_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-back_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-back_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-back_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-back_05.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-back_06.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-back_07.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-back_08.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-back_09.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-back_10.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-fwd_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-fwd_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-fwd_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-fwd_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-fwd_05.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-fwd_06.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-fwd_07.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-fwd_08.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-fwd_09.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_walk-fwd_10.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_wall-bounce_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_wall-bounce_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_wall-bounce_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_wall-jump_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_wall-jump_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_wall-jump_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_wall-jump_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_wall-jump_05.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_win_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_win_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_win_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/base/goblin_base_win_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_grab-behind_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_grab-behind_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_grab-behind_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_grab-ground_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_grab-ground_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_grab-ground_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_hold-struggle_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_hold-struggle_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_lockup_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_lockup_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_lockup_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_pin-hold_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_pin-hold_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_pin_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_pin_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_reversal_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_reversal_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_reversal_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_reversal_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_slip_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/grab/goblin_grab_slip_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/portrait/goblin_portrait_hurt_01.png | done | Fresh Goblin render. 160 x 160 PNG. |
| characters/goblin/portrait/goblin_portrait_icon_01.png | done | Fresh Goblin render. 64 x 64 PNG. |
| characters/goblin/portrait/goblin_portrait_select_01.png | done | Fresh Goblin render. 160 x 160 PNG. |
| characters/goblin/portrait/goblin_portrait_vs_01.png | done | Fresh Goblin render. 320 x 400 PNG. |
| characters/goblin/throw/goblin_throw_body-slam_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_body-slam_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_body-slam_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_body-slam_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_body-slam_05.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_rollup_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_rollup_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_rollup_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_rollup_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_snap-ddt_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_snap-ddt_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_snap-ddt_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_snap-ddt_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_stalactite-drop_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_stalactite-drop_02.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_stalactite-drop_03.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_stalactite-drop_04.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/throw/goblin_throw_stalactite-drop_05.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/thrown/goblin_thrown_headlock-bent_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/thrown/goblin_thrown_kick-out_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/thrown/goblin_thrown_lifted_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/thrown/goblin_thrown_overhead_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/thrown/goblin_thrown_pinned-struggle_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/thrown/goblin_thrown_pinned_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/thrown/goblin_thrown_slam-impact_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/thrown/goblin_thrown_spin_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/thrown/goblin_thrown_squeezed_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/thrown/goblin_thrown_suplex-arc_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/thrown/goblin_thrown_tail-wrapped_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| characters/goblin/thrown/goblin_thrown_upside-down_01.png | done | Fresh Goblin render. 192 x 192 PNG. |
| stage/cave/stage_cave_wall.png | done | 1280 x 540 opaque RGB PNG. Draft pending art approval. |
| stage/cave/stage_cave_ground.png | done | 1280 x 100 PNG. Separate walkable floor layer with a transparent top edge. Draft pending art approval. |
| characters/goblin/goblin_atlas-0.png | done | Phaser atlas with untrimmed frames. |
| characters/goblin/goblin_atlas-0.webp | done | Phaser atlas with untrimmed frames. |
| characters/goblin/goblin_atlas-0.json | done | Phaser atlas with untrimmed frames. |
| characters/goblin/goblin_atlas-1.png | done | Phaser atlas with untrimmed frames. |
| characters/goblin/goblin_atlas-1.webp | done | Phaser atlas with untrimmed frames. |
| characters/goblin/goblin_atlas-1.json | done | Phaser atlas with untrimmed frames. |
| characters/goblin/goblin_anims.json | done | Animation frames verified against atlas keys. Playback rates provisional. |
| characters/goblin/goblin_hitboxes.json | done | Initial hurtboxes, attack and grab boxes, and attach points. Gameplay tuning pending. |
| characters/dwarf/dwarf_atlas-0.png | done | Phaser atlas with untrimmed frames. |
| characters/dwarf/dwarf_atlas-0.webp | done | Phaser atlas with untrimmed frames. |
| characters/dwarf/dwarf_atlas-0.json | done | Phaser atlas with untrimmed frames. |
| characters/dwarf/dwarf_atlas-1.png | done | Phaser atlas with untrimmed frames. |
| characters/dwarf/dwarf_atlas-1.webp | done | Phaser atlas with untrimmed frames. |
| characters/dwarf/dwarf_atlas-1.json | done | Phaser atlas with untrimmed frames. |
| characters/dwarf/dwarf_anims.json | done | Animation frame references verified. Playback rates provisional. |
| characters/dwarf/dwarf_hitboxes.json | done | First-pass collision boxes and attachment points for gameplay tuning. |
| fx/fx_hit-light_01.png | done | 80 x 80 production PNG. |
| fx/fx_hit-light_02.png | done | 80 x 80 production PNG. |
| fx/fx_hit-light_03.png | done | 80 x 80 production PNG. |
| fx/fx_hit-heavy_01.png | done | 120 x 120 production PNG. |
| fx/fx_hit-heavy_02.png | done | 120 x 120 production PNG. |
| fx/fx_hit-heavy_03.png | done | 120 x 120 production PNG. |
| fx/fx_dust_01.png | done | 160 x 80 production PNG. |
| fx/fx_dust_02.png | done | 160 x 80 production PNG. |
| fx/fx_dust_03.png | done | 160 x 80 production PNG. |
| fx/fx_dust_04.png | done | 160 x 80 production PNG. |
| fx/fx_dizzy-bats_01.png | done | 80 x 40 production PNG. |
| fx/fx_dizzy-bats_02.png | done | 80 x 40 production PNG. |
| fx/fx_dizzy-bats_03.png | done | 80 x 40 production PNG. |
| fx/fx_dizzy-bats_04.png | done | 80 x 40 production PNG. |
| fx/fx_burrow-mound_01.png | done | 120 x 60 production PNG. |
| fx/fx_burrow-mound_02.png | done | 120 x 60 production PNG. |
| fx/fx_burrow-mound_03.png | done | 120 x 60 production PNG. |
| fx/fx_dirt-spray_01.png | done | 120 x 120 production PNG. |
| fx/fx_dirt-spray_02.png | done | 120 x 120 production PNG. |
| fx/fx_dirt-spray_03.png | done | 120 x 120 production PNG. |
| fx/fx_debris_01.png | done | 40 x 40 production PNG. |
| fx/fx_debris_02.png | done | 40 x 40 production PNG. |
| fx/fx_debris_03.png | done | 40 x 40 production PNG. |
| fx/fx_shadow_01.png | done | 120 x 20 production PNG. |
| fx/fx_sweat_01.png | done | 40 x 40 production PNG. |
| fx/fx_sweat_02.png | done | 40 x 40 production PNG. |
| fx/fx_warning-shadow_01.png | done | 80 x 20 production PNG. |
| fx/fx_warning-shadow_02.png | done | 80 x 20 production PNG. |
| fx/fx_rock-shatter_01.png | done | 120 x 120 production PNG. |
| fx/fx_rock-shatter_02.png | done | 120 x 120 production PNG. |
| fx/fx_rock-shatter_03.png | done | 120 x 120 production PNG. |
| fx/fx_rock-shatter_04.png | done | 120 x 120 production PNG. |
| fx/fx_web-shot_01.png | done | 80 x 80 production PNG. |
| fx/fx_web-shot_02.png | done | 80 x 80 production PNG. |
| fx/fx_web-shot_03.png | done | 80 x 80 production PNG. |
| fx/fx_web-wrap_01.png | done | 192 x 192 production PNG. |
| fx/fx_web-wrap_02.png | done | 192 x 192 production PNG. |
| fx/fx_web-wrap_03.png | done | 192 x 192 production PNG. |
| fx/fx_oil-splash_01.png | done | 120 x 120 production PNG. |
| fx/fx_oil-splash_02.png | done | 120 x 120 production PNG. |
| fx/fx_oil-splash_03.png | done | 120 x 120 production PNG. |
| fx/fx_oil-shine_01.png | done | 192 x 192 production PNG. |
| fx/fx_oil-shine_02.png | done | 192 x 192 production PNG. |
| fx/fx_oil-shine_03.png | done | 192 x 192 production PNG. |
| stage/cave/stage_cave_crystals_01.png | done | 1280 x 540 production PNG. |
| stage/cave/stage_cave_crystals_02.png | done | 1280 x 540 production PNG. |
| stage/cave/stage_cave_crystals_03.png | done | 1280 x 540 production PNG. |
| stage/cave/stage_cave_torch_01.png | done | 40 x 80 production PNG. |
| stage/cave/stage_cave_torch_02.png | done | 40 x 80 production PNG. |
| stage/cave/stage_cave_torch_03.png | done | 40 x 80 production PNG. |
| stage/cave/stage_cave_torch_04.png | done | 40 x 80 production PNG. |
| stage/cave/stage_cave_drip_01.png | done | 20 x 40 production PNG. |
| stage/cave/stage_cave_drip_02.png | done | 20 x 40 production PNG. |
| stage/cave/stage_cave_drip_03.png | done | 20 x 40 production PNG. |
| stage/cave/stage_cave_stalactite-fall_01.png | done | 60 x 160 production PNG. |
| stage/cave/stage_cave_stalactite-fall_02.png | done | 60 x 160 production PNG. |
| stage/cave/stage_cave_stalactite-fall_03.png | done | 60 x 160 production PNG. |
| stage/stage_item_oil-bottle_01.png | done | 40 x 60 production PNG. |
| stage/stage_item_oil-bottle_02.png | done | 40 x 60 production PNG. |
| stage/cave/stage_cave_vignette.png | done | 960 x 540 production PNG. |
| stage/cave/stage_cave_foreground.png | done | 1280 x 125 production PNG. |
| audio/sfx_footstep.ogg | done | Synthesized original audio, 0.15 seconds. |
| audio/sfx_footstep.mp3 | done | Synthesized original audio, 0.15 seconds. |
| audio/sfx_jump.ogg | done | Synthesized original audio, 0.25 seconds. |
| audio/sfx_jump.mp3 | done | Synthesized original audio, 0.25 seconds. |
| audio/sfx_land.ogg | done | Synthesized original audio, 0.33 seconds. |
| audio/sfx_land.mp3 | done | Synthesized original audio, 0.33 seconds. |
| audio/sfx_strike-whoosh.ogg | done | Synthesized original audio, 0.26 seconds. |
| audio/sfx_strike-whoosh.mp3 | done | Synthesized original audio, 0.26 seconds. |
| audio/sfx_hit-light.ogg | done | Synthesized original audio, 0.18 seconds. |
| audio/sfx_hit-light.mp3 | done | Synthesized original audio, 0.18 seconds. |
| audio/sfx_hit-heavy.ogg | done | Synthesized original audio, 0.34 seconds. |
| audio/sfx_hit-heavy.mp3 | done | Synthesized original audio, 0.34 seconds. |
| audio/sfx_block.ogg | done | Synthesized original audio, 0.19 seconds. |
| audio/sfx_block.mp3 | done | Synthesized original audio, 0.19 seconds. |
| audio/sfx_grapple.ogg | done | Synthesized original audio, 0.19 seconds. |
| audio/sfx_grapple.mp3 | done | Synthesized original audio, 0.19 seconds. |
| audio/sfx_grapple-perfect.ogg | done | Synthesized original audio, 0.85 seconds. |
| audio/sfx_grapple-perfect.mp3 | done | Synthesized original audio, 0.85 seconds. |
| audio/sfx_throw.ogg | done | Synthesized original audio, 0.45 seconds. |
| audio/sfx_throw.mp3 | done | Synthesized original audio, 0.45 seconds. |
| audio/sfx_slam.ogg | done | Synthesized original audio, 0.61 seconds. |
| audio/sfx_slam.mp3 | done | Synthesized original audio, 0.61 seconds. |
| audio/sfx_pin-count.ogg | done | Synthesized original audio, 0.68 seconds. |
| audio/sfx_pin-count.mp3 | done | Synthesized original audio, 0.68 seconds. |
| audio/sfx_reversal.ogg | done | Synthesized original audio, 0.83 seconds. |
| audio/sfx_reversal.mp3 | done | Synthesized original audio, 0.83 seconds. |
| audio/sfx_kick-out.ogg | done | Synthesized original audio, 0.28 seconds. |
| audio/sfx_kick-out.mp3 | done | Synthesized original audio, 0.28 seconds. |
| audio/sfx_round-start.ogg | done | Synthesized original audio, 0.98 seconds. |
| audio/sfx_round-start.mp3 | done | Synthesized original audio, 0.98 seconds. |
| audio/sfx_fight.ogg | done | Synthesized original audio, 0.82 seconds. |
| audio/sfx_fight.mp3 | done | Synthesized original audio, 0.82 seconds. |
| audio/sfx_ko.ogg | done | Synthesized original audio, 0.96 seconds. |
| audio/sfx_ko.mp3 | done | Synthesized original audio, 0.96 seconds. |
| audio/sfx_cave-rumble.ogg | done | Synthesized original audio, 2.20 seconds. |
| audio/sfx_cave-rumble.mp3 | done | Synthesized original audio, 2.20 seconds. |
| audio/sfx_rock-impact.ogg | done | Synthesized original audio, 0.75 seconds. |
| audio/sfx_rock-impact.mp3 | done | Synthesized original audio, 0.75 seconds. |
| audio/sfx_web-shot.ogg | done | Synthesized original audio, 0.34 seconds. |
| audio/sfx_web-shot.mp3 | done | Synthesized original audio, 0.34 seconds. |
| audio/sfx_web-break.ogg | done | Synthesized original audio, 0.15 seconds. |
| audio/sfx_web-break.mp3 | done | Synthesized original audio, 0.15 seconds. |
| audio/sfx_oil-splash.ogg | done | Synthesized original audio, 0.41 seconds. |
| audio/sfx_oil-splash.mp3 | done | Synthesized original audio, 0.41 seconds. |
| audio/sfx_burrow.ogg | done | Synthesized original audio, 0.68 seconds. |
| audio/sfx_burrow.mp3 | done | Synthesized original audio, 0.68 seconds. |
| audio/sfx_ui-move.ogg | done | Synthesized original audio, 0.68 seconds. |
| audio/sfx_ui-move.mp3 | done | Synthesized original audio, 0.68 seconds. |
| audio/sfx_ui-confirm.ogg | done | Synthesized original audio, 0.75 seconds. |
| audio/sfx_ui-confirm.mp3 | done | Synthesized original audio, 0.75 seconds. |
| audio/music_title.ogg | done | Synthesized original audio, 30.64 seconds. |
| audio/music_title.mp3 | done | Synthesized original audio, 30.64 seconds. |
| audio/music_match.ogg | done | Synthesized original audio, 30.97 seconds. |
| audio/music_match.mp3 | done | Synthesized original audio, 30.97 seconds. |
| characters/lizard/base/lizard_base_idle_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_idle_02.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-fwd_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_walk-fwd_02.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-fwd_03.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-fwd_04.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-fwd_05.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-fwd_06.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_strike-low_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_strike-low_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_strike-low_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_strike-low_04.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_strike-air_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_strike-air_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_strike-air_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_hit-high_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_hit-high_02.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_knockdown_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_knockdown_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_knockdown_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_knockdown_04.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_lying-up_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_lying-down_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_wall-bounce_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_wall-bounce_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_wall-bounce_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/mole/mole_atlas-0.png | done | Phaser atlas with untrimmed frames. |
| characters/mole/mole_atlas-0.webp | done | Phaser atlas with untrimmed frames. |
| characters/mole/mole_atlas-0.json | done | Phaser atlas with untrimmed frames. |
| characters/mole/mole_atlas-1.png | done | Phaser atlas with untrimmed frames. |
| characters/mole/mole_atlas-1.webp | done | Phaser atlas with untrimmed frames. |
| characters/mole/mole_atlas-1.json | done | Phaser atlas with untrimmed frames. |
| characters/mole/mole_anims.json | done | Animation references verified. Playback rates provisional. |
| characters/mole/mole_hitboxes.json | done | First-pass collision boxes and attachment points for playtesting. |
| characters/lizard/base/lizard_base_strike-light_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_strike-light_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_strike-light_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_strike-heavy_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_strike-heavy_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_strike-heavy_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_strike-heavy_04.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_strike-heavy_05.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_wall-jump_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_wall-jump_02.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_wall-jump_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_stalactite-hang_01.png | done | Original hanging pose aligned to the grip. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_stalactite-hang_02.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_win_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_win_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_win_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_win_04.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_ko_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/thrown/lizard_thrown_spin_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/thrown/lizard_thrown_squeezed_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/thrown/lizard_thrown_slam-impact_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/thrown/lizard_thrown_pinned_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/thrown/lizard_thrown_pinned-struggle_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/thrown/lizard_thrown_kick-out_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_oil-apply_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_oil-apply_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_oil-apply_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_oil-apply_04.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_slip_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_slip_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/portrait/lizard_portrait_select_01.png | done | 160 x 160 portrait PNG. |
| characters/lizard/portrait/lizard_portrait_vs_01.png | done | 320 x 400 portrait PNG. |
| characters/lizard/portrait/lizard_portrait_icon_01.png | done | 64 x 64 portrait PNG. |
| characters/lizard/portrait/lizard_portrait_hurt_01.png | done | 160 x 160 portrait PNG. |
| ui/ui_healthbar_frame.png | done | 400 x 40 production PNG. |
| ui/ui_stamina_frame.png | done | 300 x 20 production PNG. |
| ui/ui_timer_frame.png | done | 80 x 60 production PNG. |
| ui/ui_pin-meter_frame.png | done | 240 x 30 production PNG. |
| ui/ui_select_frame.png | done | 180 x 180 production PNG. |
| ui/ui_select_cursor-p1.png | done | 180 x 180 production PNG. |
| ui/ui_select_cursor-p2.png | done | 180 x 180 production PNG. |
| ui/ui_healthbar_fill.png | done | 375 x 20 production PNG. |
| ui/ui_healthbar_fill-low.png | done | 375 x 20 production PNG. |
| ui/ui_stamina_fill.png | done | 290 x 10 production PNG. |
| ui/ui_timing-ring_01.png | done | 120 x 120 production PNG. |
| ui/ui_timing-ring_02.png | done | 120 x 120 production PNG. |
| ui/ui_timing-ring_03.png | done | 120 x 120 production PNG. |
| ui/ui_timing-ring_04.png | done | 120 x 120 production PNG. |
| ui/ui_timing-perfect_01.png | done | 120 x 120 production PNG. |
| ui/ui_timing-perfect_02.png | done | 120 x 120 production PNG. |
| ui/ui_text-round1.png | done | 400 x 80 production PNG. |
| ui/ui_text-pin-1.png | done | 120 x 120 production PNG. |
| ui/ui_text-round2.png | done | 400 x 80 production PNG. |
| ui/ui_text-pin-2.png | done | 120 x 120 production PNG. |
| ui/ui_text-round3.png | done | 400 x 80 production PNG. |
| ui/ui_text-pin-3.png | done | 120 x 120 production PNG. |
| ui/ui_text-fight.png | done | 400 x 120 production PNG. |
| ui/ui_text-ko.png | done | 320 x 160 production PNG. |
| ui/ui_text-reversal.png | done | 320 x 80 production PNG. |
| ui/ui_text-rumble.png | done | 400 x 80 production PNG. |
| ui/ui_text-oiled.png | done | 320 x 80 production PNG. |
| ui/ui_title_logo.png | done | 640 x 240 production PNG. |
| ui/ui_tag-p1.png | done | 40 x 20 production PNG. |
| ui/ui_tag-p2.png | done | 40 x 20 production PNG. |
| ui/ui_pin-meter_marker.png | done | 20 x 40 production PNG. |
| ui/ui_mash-prompt_01.png | done | 80 x 80 production PNG. |
| ui/ui_mash-prompt_02.png | done | 80 x 80 production PNG. |
| ui/ui_select_locked.png | done | 180 x 180 production PNG. |
| characters/lizard/base/lizard_base_crouch_01.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_crouch_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_jump_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_jump_02.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_jump_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_jump_04.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_jump_05.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_block_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_block_02.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/grab/lizard_grab_lockup_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_lockup_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_lockup_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_grab-behind_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_grab-behind_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_grab-behind_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_grab-ground_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_grab-ground_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_grab-ground_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_hold-struggle_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_hold-struggle_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_pin_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_pin_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_pin-hold_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_pin-hold_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_reversal_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_reversal_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_reversal_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/grab/lizard_grab_reversal_04.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_body-slam_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_body-slam_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_body-slam_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_body-slam_04.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_body-slam_05.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_rollup_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_rollup_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_rollup_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_rollup_04.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/thrown/lizard_thrown_lifted_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/thrown/lizard_thrown_upside-down_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/thrown/lizard_thrown_overhead_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/thrown/lizard_thrown_suplex-arc_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/thrown/lizard_thrown_headlock-bent_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/thrown/lizard_thrown_tail-wrapped_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_basilisk-bomb_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_basilisk-bomb_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_basilisk-bomb_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_basilisk-bomb_04.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_basilisk-bomb_05.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_basilisk-bomb_06.png | done | 192 x 192 transparent PNG, baseline row 180. |
| stage/screen_title_bg.png | done | 960 x 540 production PNG. |
| stage/screen_select_bg.png | done | 960 x 540 production PNG. |
| stage/screen_vs_bg.png | done | 960 x 540 production PNG. |
| stage/cave/stage_cave_wall-left.png | done | 120 x 540 production PNG. |
| stage/cave/stage_cave_wall-right.png | done | 120 x 540 production PNG. |
| stage/cave/stage_cave_stalactites.png | done | 960 x 120 production PNG. |
| stage/cave/stage_cave_floor.png | done | 1280 x 75 production PNG. |
| characters/lizard/throw/lizard_throw_tail-whip-suplex_01.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_tail-whip-suplex_02.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_tail-whip-suplex_03.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_tail-whip-suplex_04.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_tail-whip-suplex_05.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_tail-whip-suplex_06.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_tail-whip-suplex_07.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/throw/lizard_throw_tail-whip-suplex_08.png | done | 192 x 192 transparent PNG, baseline row 180. |
| characters/lizard/base/lizard_base_block_03.png | done | Original pose renumbered for the movement pass. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_crouch_03.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_crouch_04.png | done | Original pose renumbered for the movement pass. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_getup_01.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_getup_02.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_getup_03.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_getup_04.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_hit-high_03.png | done | Original pose renumbered for the movement pass. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_hit-high_04.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_idle_03.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_idle_04.png | done | Original pose renumbered for the movement pass. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_idle_05.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_idle_06.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_jump_06.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_jump_07.png | done | Original pose renumbered for the movement pass. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_jump_08.png | done | Original pose renumbered for the movement pass. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_land_01.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_land_02.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_stalactite-hang_03.png | done | Original hanging pose aligned to the grip. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_stalactite-hang_04.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_turn_01.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_turn_02.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_turn_03.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-back_01.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-back_02.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-back_03.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-back_04.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-back_05.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-back_06.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-back_07.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-back_08.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-back_09.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-back_10.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-fwd_07.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-fwd_08.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-fwd_09.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_walk-fwd_10.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_wall-jump_04.png | done | Movement pass render. 192 x 192 transparent PNG. |
| characters/lizard/base/lizard_base_wall-jump_05.png | done | Original pose renumbered for the movement pass. 192 x 192 transparent PNG. |
| characters/lizard/lizard_atlas-0.png | done | Phaser atlas with untrimmed frames. |
| characters/lizard/lizard_atlas-0.webp | done | Phaser atlas with untrimmed frames. |
| characters/lizard/lizard_atlas-0.json | done | Phaser atlas with untrimmed frames. |
| characters/lizard/lizard_atlas-1.png | done | Phaser atlas with untrimmed frames. |
| characters/lizard/lizard_atlas-1.webp | done | Phaser atlas with untrimmed frames. |
| characters/lizard/lizard_atlas-1.json | done | Phaser atlas with untrimmed frames. |
| characters/lizard/lizard_anims.json | done | Movement frame counts, rates, and atlas references verified. |
| characters/lizard/lizard_hitboxes.json | done | First-pass collision boxes and attachment points for playtesting. |
| stage/cave/stage_cave_banner_01.png | done | 80 x 120 production PNG. |
| stage/cave/stage_cave_banner_02.png | done | 80 x 120 production PNG. |
| stage/cave/stage_cave_banner_03.png | done | 80 x 120 production PNG. |
| stage/cave/stage_cave_banner_04.png | done | 80 x 120 production PNG. |
| stage/cave/stage_cave_spider_descend_01.png | done | 120 x 160 production PNG. |
| stage/cave/stage_cave_spider_descend_02.png | done | 120 x 160 production PNG. |
| stage/cave/stage_cave_spider_descend_03.png | done | 120 x 160 production PNG. |
| stage/cave/stage_cave_spider_descend_04.png | done | 120 x 160 production PNG. |
| stage/cave/stage_cave_spider_shoot_01.png | done | 120 x 160 production PNG. |
| stage/cave/stage_cave_spider_shoot_02.png | done | 120 x 160 production PNG. |
| stage/cave/stage_cave_spider_shoot_03.png | done | 120 x 160 production PNG. |
| stage/cave/stage_cave_spider_climb_01.png | done | 120 x 160 production PNG. |
| stage/cave/stage_cave_spider_climb_02.png | done | 120 x 160 production PNG. |
| stage/cave/stage_cave_crowd_01.png | done | 1280 x 200 production PNG. |
| stage/cave/stage_cave_crowd_02.png | done | 1280 x 200 production PNG. |
| stage/cave/stage_cave_crowd_cheer_01.png | done | 1280 x 200 production PNG. |
| stage/cave/stage_cave_crowd_cheer_02.png | done | 1280 x 200 production PNG. |
| fx/fx_atlas.png | done | Phaser JSON Hash atlas with untrimmed frames. |
| fx/fx_atlas.webp | done | Phaser JSON Hash atlas with untrimmed frames. |
| fx/fx_atlas.json | done | Phaser JSON Hash atlas with untrimmed frames. |
| ui/ui_atlas.png | done | Phaser JSON Hash atlas with untrimmed frames. |
| ui/ui_atlas.webp | done | Phaser JSON Hash atlas with untrimmed frames. |
| ui/ui_atlas.json | done | Phaser JSON Hash atlas with untrimmed frames. |
| stage/cave/stage_cave_atlas.png | done | Phaser JSON Hash atlas with untrimmed frames. |
| stage/cave/stage_cave_atlas.webp | done | Phaser JSON Hash atlas with untrimmed frames. |
| stage/cave/stage_cave_atlas.json | done | Phaser JSON Hash atlas with untrimmed frames. |
