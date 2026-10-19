import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_MATCH_CONFIG,
  getPlayerSpeed,
  validateGuestDisplayName,
  createInitialMatchState,
  startAuthoritativeMatch,
  resolvePlayerMovement,
  attemptEnterHidingSpot,
  attemptExitHidingSpot,
  attemptDirectElimination,
  attemptInspectHidingSpot,
  setObjectiveInteraction,
  stepAuthoritativeMatch,
  isPositionWallFree,
  findNearestCollisionFreePoint,
} from './rules.ts';
import { MAPS } from './maps.ts';

function seedTwoPlayers() {
  const state = createInitialMatchState('TEST01', 'p1');
  state.players['p1'] = {
    id: 'p1',
    name: 'SeekerOne',
    role: 'seeker',
    isBot: false,
    alive: true,
    x: 100,
    y: 100,
    vx: 0,
    vy: 0,
    facing: 'down',
    hiddenInSpotId: null,
    interactingWithObjective: false,
    eliminationsCount: 0,
    inspectionsCount: 0,
    objectiveSecondsContributed: 0,
    lastInspectAt: 0,
    connected: true,
    colorIndex: 0,
  };
  state.players['p2'] = {
    id: 'p2',
    name: 'HiderTwo',
    role: 'hider',
    isBot: false,
    alive: true,
    x: 750,
    y: 520,
    vx: 0,
    vy: 0,
    facing: 'down',
    hiddenInSpotId: null,
    interactingWithObjective: false,
    eliminationsCount: 0,
    inspectionsCount: 0,
    objectiveSecondsContributed: 0,
    lastInspectAt: 0,
    connected: true,
    colorIndex: 1,
  };
  startAuthoritativeMatch(state, 'seeker');
  return state;
}

test('Movement tests: Seeker moves at 1.5x Hider speed and respects walls and head-start lock', () => {
  const hiderSpeed = getPlayerSpeed('hider', DEFAULT_MATCH_CONFIG);
  const seekerSpeed = getPlayerSpeed('seeker', DEFAULT_MATCH_CONFIG);
  assert.equal(seekerSpeed, hiderSpeed * 1.5);

  const state = seedTwoPlayers();
  const map = MAPS[state.config.mapId];

  // During 10s head start, Seeker is locked inside seekerSpawnZone
  const seeker = state.players['p1'];
  seeker.x = map.seekerSpawnZone.x + map.seekerSpawnZone.width - 14;
  const lockedMove = resolvePlayerMovement(seeker, 1, 0, 0.05, state, map);
  assert.ok(lockedMove.x <= map.seekerSpawnZone.x + map.seekerSpawnZone.width - 13);

  // Hiders can move freely during head start
  const hider = state.players['p2'];
  const startX = hider.x;
  const hiderMove = resolvePlayerMovement(hider, 1, 0, 0.05, state, map);
  assert.ok(hiderMove.x > startX);
});

test('Hiding tests: Single-capacity enforcement, movement lock while hidden, and exit behavior', () => {
  const state = seedTwoPlayers();
  state.players['p3'] = {
    ...state.players['p2'],
    id: 'p3',
    name: 'HiderThree',
  };

  const map = MAPS[state.config.mapId];
  const spot = map.hidingSpots[0]; // hs_1
  state.players['p2'].x = spot.x + spot.width / 2;
  state.players['p2'].y = spot.y + spot.height / 2 + 20;
  state.players['p3'].x = spot.x + spot.width / 2;
  state.players['p3'].y = spot.y + spot.height / 2 + 20;

  const enter1 = attemptEnterHidingSpot(state, 'p2', spot.id);
  assert.equal(enter1.ok, true);
  assert.equal(state.players['p2'].hiddenInSpotId, spot.id);
  assert.equal(state.hidingOccupancy[spot.id], 'p2');

  // Second hider cannot enter occupied single-capacity object
  const enter2 = attemptEnterHidingSpot(state, 'p3', spot.id);
  assert.equal(enter2.ok, false);

  // Hidden player cannot walk around normally
  const moveWhileHidden = resolvePlayerMovement(state.players['p2'], 1, 1, 0.05, state, map);
  assert.equal(moveWhileHidden.x, state.players['p2'].x);
  assert.equal(moveWhileHidden.y, state.players['p2'].y);

  // Exit frees occupancy
  const exitRes = attemptExitHidingSpot(state, 'p2');
  assert.equal(exitRes.ok, true);
  assert.equal(state.hidingOccupancy[spot.id], null);
});

test('Elimination & Inspection tests: Head-start protection, range check, empty vs occupied inspection', () => {
  const state = seedTwoPlayers();
  const map = MAPS[state.config.mapId];
  const spot = map.hidingSpots[0];

  // Seeker cannot eliminate during 10s head start
  state.players['p1'].x = state.players['p2'].x;
  state.players['p1'].y = state.players['p2'].y;
  const earlyElim = attemptDirectElimination(state, 'p1');
  assert.equal(earlyElim.ok, false);

  // Advance past 10-second countdown
  for (let i = 0; i < 105; i++) {
    stepAuthoritativeMatch(state, 0.1);
  }
  assert.equal(state.lifecycle, 'MATCH_ACTIVE');

  // Inspect empty hiding spot -> does not eliminate anyone
  state.players['p1'].x = spot.x + spot.width / 2;
  state.players['p1'].y = spot.y + spot.height / 2 + 24;
  const emptyInspect = attemptInspectHidingSpot(state, 'p1', spot.id, 5000);
  assert.equal(emptyInspect.ok, true);
  assert.equal(emptyInspect.foundPlayerId, null);
  assert.equal(state.players['p2'].alive, true);

  // Hider hides in spot -> Seeker inspects -> Hider eliminated & spot freed & Seeker wins
  state.players['p2'].x = spot.x + spot.width / 2;
  state.players['p2'].y = spot.y + spot.height / 2 + 20;
  assert.equal(attemptEnterHidingSpot(state, 'p2', spot.id).ok, true);

  const occupiedInspect = attemptInspectHidingSpot(state, 'p1', spot.id, 7000);
  assert.equal(occupiedInspect.ok, true);
  assert.equal(occupiedInspect.foundPlayerId, 'p2');
  assert.equal(state.players['p2'].alive, false);
  assert.equal(state.hidingOccupancy[spot.id], null);
  assert.equal(state.lifecycle, 'MATCH_COMPLETED');
  assert.equal(state.winner, 'seekers');
});

test('Objective tests: 3 stages x 15 uninterrupted seconds, interruption resets active stage only, Stage 3 wins', () => {
  const state = seedTwoPlayers();
  const map = MAPS[state.config.mapId];

  // Move hider to City-Center Beacon
  state.players['p2'].x = map.objective.x;
  state.players['p2'].y = map.objective.y;
  assert.equal(setObjectiveInteraction(state, 'p2', true).ok, true);

  // Hold for 15 seconds -> Stage 1 completed
  for (let i = 0; i < 155; i++) {
    stepAuthoritativeMatch(state, 0.1);
  }
  assert.equal(state.objectiveCompletedStages, 1);

  // Hold for 7 seconds into Stage 2, then interrupt -> Stage 2 resets to 0, Stage 1 stays completed
  for (let i = 0; i < 70; i++) {
    stepAuthoritativeMatch(state, 0.1);
  }
  assert.ok(state.objectiveCurrentStageProgress > 6);
  setObjectiveInteraction(state, 'p2', false);
  stepAuthoritativeMatch(state, 0.1);
  assert.equal(state.objectiveCompletedStages, 1);
  assert.equal(state.objectiveCurrentStageProgress, 0);

  // Resume and complete Stages 2 and 3 (30 seconds)
  setObjectiveInteraction(state, 'p2', true);
  for (let i = 0; i < 305; i++) {
    stepAuthoritativeMatch(state, 0.1);
  }
  assert.equal(state.objectiveCompletedStages, 3);
  assert.equal(state.lifecycle, 'MATCH_COMPLETED');
  assert.equal(state.winner, 'hiders');
});

test('Guest identity validation: Rejects reserved system identities and accepts valid guest names', () => {
  assert.equal(validateGuestDisplayName('Admin').valid, false);
  assert.equal(validateGuestDisplayName('SYSTEM_HOST').valid, false);
  assert.equal(validateGuestDisplayName('PixelRunner42').valid, true);
});

test('Exhaustive Hiding Spot Exit Movement test: All 38 hiding spots across both maps allow free movement after exiting', () => {
  for (const mapId of ['downtown_plaza', 'harbor_district'] as const) {
    const state = seedTwoPlayers();
    state.config.mapId = mapId;
    const map = MAPS[mapId];
    const hider = state.players['p2'];

    for (const spot of map.hidingSpots) {
      const centerX = spot.x + spot.width / 2;
      const centerY = spot.y + spot.height / 2;
      const entry = findNearestCollisionFreePoint(centerX, centerY + 20, map, 14);
      hider.x = entry.x;
      hider.y = entry.y;
      hider.hiddenInSpotId = null;
      state.hidingOccupancy[spot.id] = null;

      const enterRes = attemptEnterHidingSpot(state, 'p2', spot.id);
      assert.equal(enterRes.ok, true, `Failed to enter ${spot.id} on ${mapId}: ${enterRes.reason}`);

      const exitRes = attemptExitHidingSpot(state, 'p2');
      assert.equal(exitRes.ok, true, `Failed to exit ${spot.id} on ${mapId}`);
      assert.equal(
        isPositionWallFree(hider.x, hider.y, 13, map),
        true,
        `Player stuck in wall after exiting ${spot.id} on ${mapId} at (${hider.x}, ${hider.y})`
      );

      // Verify player can move in at least one cardinal direction after exiting
      const dirs = [
        { ix: 1, iy: 0 },
        { ix: -1, iy: 0 },
        { ix: 0, iy: 1 },
        { ix: 0, iy: -1 },
      ];
      let movedDist = 0;
      for (const d of dirs) {
        const moved = resolvePlayerMovement(hider, d.ix, d.iy, 0.05, state, map);
        movedDist = Math.max(movedDist, Math.hypot(moved.x - hider.x, moved.y - hider.y));
      }
      assert.ok(movedDist > 4, `Player unable to move after exiting ${spot.id} on ${mapId}`);
    }
  }
});
