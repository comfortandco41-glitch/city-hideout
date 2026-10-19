# Technical Architecture — CITY HIDEOUT

## 1. Engine & Cross-Platform Strategy
Prior to implementation, we evaluated engine targets for desktop, browser, Android, and iOS compatibility:
- **Selected Stack**: TypeScript + HTML5 `Canvas2D` (`image-rendering: pixelated`) + React 19 UI Shell + Express/Node.js + `ws` WebSocket Server.
- **Why this stack**: Runs natively in desktop browsers, mobile browsers (Android Chrome / iOS Safari), desktop wrappers (Electron/Tauri), and mobile wrappers (Capacitor for Android APK/AAB and iOS WKWebView) over standard HTTPS/WSS on Port `3000` with zero binary plugin incompatibilities.

## 2. Module Responsibilities
- `/src/game/maps.ts`: Declarative map geometry, roads, 2.5D building walls, spawn zones, central beacon coordinates, and 18–20 data-driven hiding spot configurations per map.
- `/src/game/rules.ts`: Pure deterministic state machine (`MatchState`), movement & wall slide physics (`resolvePlayerMovement`), line-of-sight raycasts (`hasLineOfSight`), hiding occupancy (`attemptEnterHidingSpot`, `attemptExitHidingSpot`), seeker catch & inspection (`attemptDirectElimination`, `attemptInspectHidingSpot`), 3-stage objective (`stepAuthoritativeMatch`), contextual action resolver (`getAvailableContextualActions`), guest name validator (`validateGuestDisplayName`), and AI bot policies (`stepBotAI`).
- `/src/game/pixelSprites.ts`: Crisp integer-aligned Canvas2D pixel-art renderer and zero-GC pre-allocated particle ring buffer (`MAX_PARTICLES = 64`).
- `/src/game/sound.ts`: Web Audio API procedural sound synthesizer.
- `/server.ts`: Authoritative Express + WebSocket multiplayer server managing guest sessions, 6-character room codes, and the 25Hz authoritative simulation loop.
- `/src/components/MobileControls.tsx`: Adaptive virtual joystick + role-contextual touch action buttons.
- `/src/components/LobbyModal.tsx` & `/src/components/GameModals.tsx`: Accessible modal dialogs for room creation/joining, pause settings, and end-of-match telemetry.

## 3. Decoupled 60 FPS Canvas & React HUD
- The `<canvas>` element is mounted once on startup inside `src/App.tsx`.
- Simulation state is stored in `matchStateRef` and mutated inside `requestAnimationFrame` with clamped `dt <= 0.05s`.
- React HUD state (`hud`) is synchronized at `~10Hz` so React reconciliation never stalls the 60 FPS canvas loop.
