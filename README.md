# CITY HIDEOUT — Online Multiplayer Pixel-Art Hide-and-Seek

**CITY HIDEOUT** is a cross-platform 2D pixel-art urban hide-and-seek game playable instantly as a Guest in your browser, desktop, or mobile device, with real-time authoritative WebSocket multiplayer rooms and offline AI bot matches.

## Core Features
- **Instant Play as Guest**: Zero registration, email, or password required. Automatically provisions a server-verified guest session token with customizable display name validation.
- **Two Urban Pixel-Art Maps**:
  - **Downtown Metro Plaza**: Compact city center with 18 interactive hiding places (dumpsters, newsstand kiosks, phone booths, drainage grates, hedges, and canal culverts).
  - **Harbor Shipping District**: Large industrial port with 20 hiding places and 1- or 2-Seeker mode support.
- **Authoritative Match Rules**:
  - **10-Second Hider Head Start**: Seekers are locked inside the Precinct Deploy Zone while Hiders scatter and hide.
  - **1.5× Seeker Speed**: Hiders move at 100% (`160 px/s`); Seekers move at 150% (`240 px/s`).
  - **Data-Driven Hiding**: Single-capacity hiding objects (`1 hider per object`).
  - **Close-Range Catch & Hiding Inspection**: Seekers catch visible hiders in range or inspect hiding objects to eliminate hidden occupants.
  - **3-Stage Escape Beacon Objective**: Hiders win by holding the City-Center Beacon for **3 stages × 15 uninterrupted seconds** (`45s` total). Interruption resets only the current stage.
- **Adaptive Mobile Touch Controls**: Left virtual thumb joystick with configurable sensitivity + right-hand contextual action buttons that appear only when an interaction is valid.

## Controls

| Action | Desktop (Keyboard) | Mobile / Touch |
| :--- | :--- | :--- |
| **Move** | `WASD` or `Arrow Keys` | Left Virtual Thumb Joystick |
| **Hide / Exit Hiding** | `E` or `Space` | Contextual `HIDE INSIDE` / `EXIT HIDING` Button |
| **Inspect / Eliminate (Seeker)** | `E` or `Space` | Contextual `INSPECT OBJECT` / `ELIMINATE HIDER` Button |
| **Hold Escape Beacon (Hider)** | Hold `F` (or click prompt) | Hold or Tap `HOLD BEACON` Button |
| **Pause / Settings** | `Esc` or `P` | Top-Right Pause Icon Button |
| **Mute Audio** | `M` | Top-Right Audio Icon Button |

## Running Locally & Testing
```bash
# Install dependencies
npm install

# Run unit tests (Node native test runner)
npm test

# Start full-stack Express + WebSocket + Vite server on port 3000
npm run dev
```

## Hosting & Joining a Friend's Multiplayer Session
1. Click **Multiplayer Room & Setup** on the Title Screen.
2. Click **Create Room & Generate Code** to receive a 6-character Room Code (e.g., `K7M9P2`).
3. Share the code with friends on desktop or mobile—they enter the code under **Join Room** and click **Join Room**.
4. The Host selects the map, 1 or 2 Seekers, optional AI bots, and clicks **Launch Online Match Now**.
