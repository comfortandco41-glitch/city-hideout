# Development Roadmap — CITY HIDEOUT

| Milestone | Priority | Dependencies | Acceptance Criteria | Status |
| :--- | :--- | :--- | :--- | :--- |
| **M0 — Repository & Architecture** | P0 | None | Inspect repo, establish TypeScript + Canvas2D + WS stack, create all required docs. | `DONE` |
| **M1 — Local Playable Prototype** | P0 | M0 | 1.5× Seeker speed, 10s head-start lock, data-driven hiding, direct catch, inspection, 3×15s objective, win/loss states. | `DONE` |
| **M2 — Map & Visual Polish** | P1 | M1 | 18–20 hiding places per map, integer pixel-art rendering, building facades, procedural Web Audio SFX, particle bursts. | `DONE` |
| **M3 — Guest Play & Multiplayer Lobby** | P1 | M1 | Prominent Play as Guest, guest display name validation, server session token, 6-char room codes, host controls. | `DONE` |
| **M4 — Authoritative Multiplayer Gameplay** | P1 | M3 | 25Hz server loop, position/role/hiding/objective/elimination sync, 1- and 2-seeker modes. | `DONE` |
| **M5 — Mobile Controls & UX** | P1 | M2 | Virtual joystick, role-adaptive contextual buttons, >=48px touch targets, configurable sensitivity, pause menu. | `DONE` |
| **M6 — Reliability & Cross-Platform Browser Verification** | P1 | M4, M5 | Reconnect handling, unit test suite (`node:test`), desktop & mobile viewport Playwright verification. | `DONE` |
| **M7 — Release & Export Preparation** | P2 | M6 | Production build verification, Android/iOS/Desktop export documentation in `DEPLOYMENT.md`. | `DONE` |
