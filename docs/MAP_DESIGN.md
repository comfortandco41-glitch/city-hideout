# Map Design — CITY HIDEOUT

## 1. Map 1: Downtown Metro Plaza (`downtown_plaza`)
- **Dimensions**: `1600 × 1120 px` (`50 × 35` tiles at `32px` grid).
- **Recommended Seekers**: `1 Seeker` (supports `1` or `2`).
- **Seeker Spawn Zone**: North-West Precinct (`x: 64, y: 64, w: 192, h: 160`). Locked during the 10-second `HIDER_HEAD_START` countdown.
- **Hider Spawn Zone**: Central Plaza Square (`x: 680, y: 460, w: 240, h: 200`).
- **City-Center Escape Objective**: Signal Beacon at `(800, 560)`, interaction radius `76 px`, surrounded by four brick sightline-breaker walls (`w_pc1`–`w_pc4`) so hiders have tactical routes in and out.
- **Hiding Locations (18 Total)**:
  - `hs_1`–`hs_5`: North Boulevard (Dumpster, Newsstand Kiosk, Payphone Booth, Supply Crate, Hotel Service Container).
  - `hs_6`–`hs_12`: Mid-City & Central Plaza (West Alley Drain Grate, Substation Bin, North/East Plaza Hedges, Plaza Ticket Kiosk, East Alley Manhole, Noodle Bar Freight Crate).
  - `hs_13`–`hs_18`: South Industrial & Canal Row (Auto Shop Container, Cinema Dumpster, Hardware Phone Booth, West/East Canal Water Tunnels, Cargo Lock Heavy Crate).

## 2. Map 2: Harbor Shipping District (`harbor_district`)
- **Dimensions**: `1760 × 1200 px`.
- **Recommended Seekers**: `2 Seekers` (supports `1` or `2`).
- **City-Center Escape Objective**: Harbor Control Radio Tower at `(880, 600)`.
- **Hiding Locations (20 Total)**: Distributed across Customs House, Dry Dock, Ice House, Central Dock Planks, Smelter Works, and South Slipway Flood Tunnels (`hh_1`–`hh_20`).

## 3. Collision & Line-of-Sight Rules
- Solid buildings, brick barriers, and water canals block movement (`circleIntersectsRect`) and block line-of-sight interactions (`hasLineOfSight`).
- Seekers cannot eliminate hiders or inspect hiding spots through walls.
