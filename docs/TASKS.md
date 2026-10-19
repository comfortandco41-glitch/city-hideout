# Task Backlog — CITY HIDEOUT

| Task ID | Description | Dependencies | Acceptance Criteria | Status |
| :--- | :--- | :--- | :--- | :--- |
| **T-01** | Repository inspection & core documentation structure | None | All required `/docs/*.md`, `AGENTS.md`, `README.md` created without duplicates. | `DONE` |
| **T-02** | Pure game rules engine (`src/game/rules.ts`) | T-01 | 1.5× seeker speed, 10s countdown lock, wall collision, line-of-sight check. | `DONE` |
| **T-03** | Data-driven hiding system (`18–20` spots) | T-02 | Single capacity, enter/exit validation, occupancy cleared on elimination. | `DONE` |
| **T-04** | Seeker direct elimination & hiding inspection | T-03 | Close-range catch, empty vs. occupied inspection feedback, wall blocking. | `DONE` |
| **T-05** | 3-Stage × 15s City-Center Escape Beacon | T-02 | 3 stages of 15s each; interruption resets active stage only; Stage 3 triggers Hider win. | `DONE` |
| **T-06** | Guest Play & Session Token validation | T-02 | Prominent Play as Guest CTA, reserved name blocking, local + server token persistence. | `DONE` |
| **T-07** | Authoritative WebSocket Server & Room Codes | T-06 | Create/join 6-char room code, sync state across clients, 1- and 2-seeker support. | `DONE` |
| **T-08** | Adaptive Mobile Touch Controls | T-02 | Left virtual joystick + right contextual action buttons showing only valid actions. | `DONE` |
| **T-09** | Automated Unit Tests & Browser Verification | T-07, T-08 | `node --test` passes 100%; desktop & mobile browser captures verified. | `DONE` |
