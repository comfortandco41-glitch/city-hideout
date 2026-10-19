# Multiplayer & Guest Session Architecture — CITY HIDEOUT

## 1. Transport & Server Authority
- **Transport**: WebSocket (`ws`) attached to the HTTP Express server on Port `3000` at `/ws`, plus REST endpoints `/api/guest/session` and `/api/rooms/:code`.
- **Server Authority**: `/server.ts` runs a 25Hz (`40ms`) authoritative loop (`stepAuthoritativeMatch`) and validates:
  - Room creation, 6-character Room Code generation, and room membership.
  - Role assignment (`1` or `2` Seekers, remaining players Hiders).
  - Authoritative 10-second `HIDER_HEAD_START` countdown (Seekers physically constrained to `seekerSpawnZone` and blocked from eliminating/inspecting).
  - Single-capacity hiding spot occupancy (`state.hidingOccupancy`).
  - Line-of-sight and range checks (`<= 58px` direct catch, `<= 64px` hiding inspection with `600ms` cooldown).
  - 3-stage × 15s Escape Beacon progress and interruption reset.

## 2. Guest Identity, Sessions & Privacy
- **Zero-Registration Access**: Players join immediately via **Play as Guest** without email, password, or third-party OAuth.
- **Anti-Spoofing & Reserved Name Protection**:
  - The server generates a unique `guest_<hex>` ID and cryptographic 18-byte `token`. Clients authenticate via `token`, never by asserting an arbitrary `playerId`.
  - Display names are validated by `validateGuestDisplayName()` (2–18 alphanumeric characters, rejecting reserved system names such as `admin`, `system`, `server`, `moderator`, `root`, `official`).
- **Persistence & Reconnection**:
  - Guest session tokens and control settings are stored in `localStorage` (`ch_guest_token`, `ch_guest_name`, `ch_joy_sens`).
  - If a player briefly disconnects or reloads the browser, sending `auth_guest` with the stored token automatically re-binds their player slot in their active room.
  - Clearing browser data, uninstalling, or switching devices resets the local guest identity.
