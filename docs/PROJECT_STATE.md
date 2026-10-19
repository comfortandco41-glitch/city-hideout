# Project State — CITY HIDEOUT

## Current Milestone
- **Milestone**: Asset Pack Integration & Visual Overhaul Complete (`Pixel_16_interiors_v2_free`, `PixelSpaces Free Pack`, `fantasy_ [version 2.0]`, and `sprites/music/sounds` pack).

## Implemented Features
- **5 Playable Pixel-Art Character Archetypes**:
  1. `Leo (Urban Scout)` (`Pre-made NPCs/Male.png` + `Backpack_blue.png`)
  2. `Maya (Parkour Runner)` (`Pre-made NPCs/Female.png` + `Skateboard_green.png`)
  3. `Bloop (Toxic Green Slime)` (`sprites/toxic_green_slime.png`)
  4. `Nyx (Void Purple Slime)` (`sprites/void_purple_slime.png`)
  5. `Vanguard (Dark Armored Knight)` (`sprites/dark_armored_knight.png` — default Seeker skin with horned helm, crimson cape, and broadsword).
- **Cutaway Building Interiors & Fantasy/Urban Scenery (`src/game/maps.ts`, `src/game/pixelSprites.ts`)**:
  - Buildings render cutaway interior floors (`kitchen_tile` checkerboard, `wood_floor` oak planks, `carpet_blue`, `carpet_red`) furnished with PixelSpaces beds, bunkbeds, bookshelves, sofas, coffee tables, kitchen counters, refrigerators, bathtubs, laptops, stairs, flowerpots, and trophies.
  - Outdoor areas feature Autumn Fantasy Park turf & trees (`autumn_fantasy_tileset.png`), green trees (`Tree_medium.png`), wooden/stone canal bridges (`bridgeHorizontal`/`bridgeVertical`), railway tracks (`railway_.png`), wooden fences (`fencesAndWalls`), spinning `fantasy_shiny_coin.png`, and `mystic_exotic_fruits.png`.
  - Hiding places upgraded to include Oak Wardrobes (`Cabinet_1.png`), Elevator Doors (`Elevator_closed.png`), Velvet Curtain Alcoves (`Curtain_medium_red_closed.png`), Walk-in Refrigerators (`Refrigerator_large_white.png`), Plush Couch Forts (`Couch_large_2_blue.png`), Moving Packages (`Moving_package_large.png`), and Crystal Fountains (`cave_ [fountain].png`).
- **Core Gameplay, Guest Sessions, Multiplayer & Mobile Touch Controls**: Preserved and verified across all tests.

## Next Recommended Task
- Add an optional indoor-only mansion map or additional collectible power-ups if desired.
