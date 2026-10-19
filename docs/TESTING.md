# Testing Plan & Verification Report — CITY HIDEOUT

## 1. Acceptance Criteria & Automated Unit Tests (`src/game/rules.test.ts`)
Executed via Node's native test runner (`node --test src/game/rules.test.ts`):
- **Movement & Speed Ratio**: Verified Seeker speed (`240 px/s`) is exactly `1.5×` Hider speed (`160 px/s`), Seekers are locked in `seekerSpawnZone` during the 10-second `HIDER_HEAD_START`, and Hiders move freely while colliding with solid walls.
- **Hiding System**: Verified Hiders can enter valid unoccupied hiding spots within range, single-capacity spots reject a second occupant, hidden players cannot walk normally, and exiting or being eliminated frees the hiding spot's occupancy.
- **Seeker Elimination & Inspection**: Verified Seeker cannot eliminate or inspect during the 10s head start, inspecting an empty hiding object does not eliminate distant players, and inspecting an occupied hiding object eliminates the hidden hider and triggers Seeker Victory when no living hiders remain.
- **3-Stage × 15s Escape Objective**: Verified holding the City-Center Beacon for 15 uninterrupted seconds completes Stage `1/3`, interrupting progress at `7s` into Stage `2/3` resets current stage progress to `0s` while preserving Stage `1/3`, and completing Stage `3/3` immediately awards Hider Victory.
- **Guest Display Name Validation**: Verified reserved system identities (`Admin`, `SYSTEM_HOST`) are rejected while valid guest names (`PixelRunner42`) pass.
- **Exhaustive Hiding Spot Exit Movement (All 38 Spots)**: Verified entering and exiting every hiding spot across both `downtown_plaza` (18 spots) and `harbor_district` (20 spots) places the player in a wall-free coordinate and allows immediate movement.

## 2. Browser, Mobile & Multi-Client Verification (`playwright-cli`)
- **Desktop Viewport (`1440×900`)**: Title screen renders live pixel-art city tour + SVG emblem; clicking **Play as Guest** enters `'playing'` immediately with 10s head-start countdown and unobstructed HUD.
- **Mobile Viewport (`390×844` & Landscape)**: Virtual thumb joystick and contextual right-side action buttons (`HIDE INSIDE`, `HOLD BEACON`, `INSPECT OBJECT`, `ELIMINATE HIDER`) render cleanly with `>=56px` touch targets.
- **Online Multiplayer Lobby**: Creating an online room over WebSocket (`/ws`) generates a 6-character Room Code and synchronizes room state.
