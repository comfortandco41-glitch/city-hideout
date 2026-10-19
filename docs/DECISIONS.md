# Architectural Decisions — CITY HIDEOUT

## ADR-01: HTML5 Canvas2D + TypeScript + WebSocket (`ws`) over Native Desktop-Only Binary Engine
- **Context**: The game must support Windows desktop, browser gameplay, Android mobile, and iOS mobile with identical authoritative rules and pixel-art rendering, while running inside the Cloud Run / Node.js container on Port `3000`.
- **Alternatives Considered**:
  1. Godot 4 GDScript native export.
  2. TypeScript + HTML5 `Canvas2D` (`image-rendering: pixelated`) + React 19 Shell + Node.js Authoritative WebSocket Server (`ws`).
- **Decision**: Use TypeScript + HTML5 `Canvas2D` + Express/WebSocket (`server.ts`).
- **Consequences**: Instant browser playability across desktop, Android, and iOS without SharedArrayBuffer/WASM header restrictions; shared TypeScript module (`src/game/rules.ts`) runs identically on the authoritative server and in offline local matches; deterministic unit testing via Node's native test runner (`node --test`).

## ADR-02: Zero-GC Particle Ring Buffer & Decoupled 10Hz HUD Sync
- **Context**: Modest mobile hardware and software-rendered headless browsers suffer frame drops if React state updates run at 60Hz or if particles allocate objects every frame.
- **Decision**: Pre-allocate a fixed 64-particle ring buffer in `src/game/pixelSprites.ts` and sync React HUD state at `~10Hz` while keeping `<canvas>` simulation at 60 FPS.
- **Consequences**: Smooth framerate, low battery consumption on mobile, and instant screenshot responsiveness in automated browser checks.

## ADR-03: Cryptographic Server Guest Tokens (`ch_guest_token`)
- **Context**: Guest play must not require email/password, yet clients must not be able to forge another player's ID or impersonate system accounts.
- **Decision**: Issue a server-generated 18-byte hex token on first connection (`/api/guest/session` or `auth_guest` WS handshake) mapped to a server-assigned `guest_<hex>` ID, and validate display names against a reserved-word blocklist.
