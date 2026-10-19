# Changelog — CITY HIDEOUT

## [1.1.1] — 2026-10-19
### Fixed
- **Post-Hiding Movement & Wall Clearance (`src/game/maps.ts`, `src/game/rules.ts`, `src/App.tsx`)**:
  - Repositioned hiding spots across both `downtown_plaza` (18 spots) and `harbor_district` (20 spots) so no hiding spot center overlaps or crowds building walls.
  - Added `preHideX`/`preHideY` tracking and `findNearestCollisionFreePoint` resolution in `attemptExitHidingSpot` so exiting any hiding spot always places the player at a verified collision-free coordinate.
  - Added automatic wall depenetration in `resolvePlayerMovement` and blurred focus on contextual HUD action buttons.

## [1.1.0] — 2026-10-19
### Added
- **Asset Pack Integration (`Pixel_16_interiors_v2_free`, `PixelSpaces Free Pack`, `fantasy_ [version 2.0]`, `sprites/sounds` pack)**:
  - Added 5 selectable pixel-art character archetypes (`Leo - Urban Scout`, `Maya - Parkour Runner`, `Bloop - Toxic Green Slime`, `Nyx - Void Purple Slime`, `Vanguard - Dark Armored Knight`) on the Title Screen and in the Multiplayer Lobby.
  - Upgraded buildings with cutaway interior rooms (checkerboard kitchen tiles, oak floors, blue/red rugs) and 23+ interior furniture props (sofas, beds, bunkbeds, bookshelves, fridges, counters, bathtubs, laptops, stairs, trophies).
  - Added Fantasy v2.0 & Autumn tileset features: canal bridges, railway tracks, stone fountains, wooden fences, green & autumn trees, spinning gold coins, and mystic exotic fruits.
  - Upgraded hiding objects with wardrobes, elevators, velvet curtains, refrigerators, couch forts, moving packages, and fountain basins.

## [1.0.0] — 2026-10-18
### Added
- Initial playable release of **CITY HIDEOUT** with authoritative 10s head start, 1.5× seeker speed, 18–20 hiding spots, 3×15s escape beacon, Play as Guest, 6-character online room codes, and mobile touch controls.
