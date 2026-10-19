export type HidingSpotType =
  | 'trash_bin'
  | 'water_tunnel'
  | 'drainage_entrance'
  | 'large_crate'
  | 'bush'
  | 'storage_container'
  | 'kiosk'
  | 'phone_booth'
  | 'cabinet_wardrobe'
  | 'elevator_shaft'
  | 'curtain_alcove'
  | 'refrigerator_box'
  | 'couch_fort'
  | 'moving_package'
  | ' bathtub_curtain'
  | 'fountain_basin';

export type CharacterSkinId =
  | 'male_scout'
  | 'female_runner'
  | 'dark_knight'
  | 'toxic_slime'
  | 'void_slime';

export interface HidingSpotConfig {
  id: string;
  type: HidingSpotType;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  capacity: number;
  canInspect: boolean;
  canEliminateOccupant: boolean;
  interactionRange: number;
}

export interface WallRect {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  kind: 'building' | 'brick_wall' | 'hedge_wall' | 'water_canal' | 'fence' | 'interior_wall';
  label?: string;
  roofColor?: string;
  wallColor?: string;
}

export interface MapRoad {
  x: number;
  y: number;
  width: number;
  height: number;
  kind:
    | 'asphalt'
    | 'alley'
    | 'plaza'
    | 'dock_planks'
    | 'wood_floor'
    | 'kitchen_tile'
    | 'carpet_blue'
    | 'carpet_red'
    | 'grass_patch'
    | 'autumn_grass'
    | 'bridge_h'
    | 'bridge_v'
    | 'railway';
}

export type PropType =
  | 'tree_green'
  | 'tree_autumn'
  | 'house_red_roof'
  | 'house_beige_roof'
  | 'bed_red'
  | 'bed_yellow'
  | 'bunkbed_green'
  | 'bookshelf'
  | 'couch_blue'
  | 'couch_red'
  | 'coffee_table'
  | 'kitchen_counter'
  | 'kitchen_sink'
  | 'fridge_white'
  | 'bathtub'
  | 'toilet'
  | 'laptop_desk'
  | 'flowerpot'
  | 'fountain'
  | 'shiny_coin'
  | 'exotic_fruit'
  | 'skateboard'
  | 'trophy'
  | 'stairs'
  | 'door_open'
  | 'window_square';

export interface MapProp {
  id: string;
  type: PropType;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export type MapId = 'downtown_plaza' | 'harbor_district';

export interface MapConfig {
  id: MapId;
  name: string;
  subtitle: string;
  theme: 'urban_interiors' | 'harbor_fantasy';
  recommendedSeekers: 1 | 2;
  width: number;
  height: number;
  tileSize: number;
  seekerSpawnZone: { x: number; y: number; width: number; height: number };
  seekerSpawns: Array<{ x: number; y: number }>;
  hiderSpawnZone: { x: number; y: number; width: number; height: number };
  hiderSpawns: Array<{ x: number; y: number }>;
  objective: {
    id: string;
    label: string;
    x: number;
    y: number;
    radius: number;
    interactionRange: number;
  };
  roads: MapRoad[];
  walls: WallRect[];
  props: MapProp[];
  hidingSpots: HidingSpotConfig[];
  streetlights: Array<{ x: number; y: number }>;
}

export const CHARACTER_SKINS: Array<{
  id: CharacterSkinId;
  name: string;
  packSource: string;
  description: string;
  roleHint: string;
}> = [
  {
    id: 'male_scout',
    name: 'Leo (Urban Scout)',
    packSource: 'PixelSpaces Free Pack / Pre-made NPCs/Male.png',
    description: 'Streetwear jacket, blue backpack & sneakers',
    roleHint: 'Hider / All-Rounder',
  },
  {
    id: 'female_runner',
    name: 'Maya (Parkour Runner)',
    packSource: 'PixelSpaces Free Pack / Pre-made NPCs/Female.png',
    description: 'Crimson hoodie, ribbon ponytail & green skateboard',
    roleHint: 'Hider / Objective Runner',
  },
  {
    id: 'toxic_slime',
    name: 'Bloop (Toxic Green Slime)',
    packSource: 'sprites/toxic_green_slime.png',
    description: 'Bouncy emerald gelatinous creature with glowing core',
    roleHint: 'Stealth Hider',
  },
  {
    id: 'void_slime',
    name: 'Nyx (Void Purple Slime)',
    packSource: 'sprites/void_purple_slime.png',
    description: 'Shadowy arcane slime with mystic fruit aura',
    roleHint: 'Hider / Seeker',
  },
  {
    id: 'dark_knight',
    name: 'Vanguard (Dark Armored Knight)',
    packSource: 'sprites/dark_armored_knight.png',
    description: 'Plumed steel helm, crimson cape & broadsword',
    roleHint: 'Default Seeker Skin',
  },
];

export const MAPS: Record<MapId, MapConfig> = {
  downtown_plaza: {
    id: 'downtown_plaza',
    name: 'PixelSpaces Metro & Interiors',
    subtitle: 'Cutaway furnished apartments, autumn park, canal bridges & central beacon (18 hiding spots)',
    theme: 'urban_interiors',
    recommendedSeekers: 1,
    width: 1600,
    height: 1120,
    tileSize: 32,
    seekerSpawnZone: { x: 64, y: 64, width: 192, height: 160 },
    seekerSpawns: [
      { x: 136, y: 140 },
      { x: 184, y: 140 },
    ],
    hiderSpawnZone: { x: 680, y: 460, width: 240, height: 200 },
    hiderSpawns: [
      { x: 745, y: 515 },
      { x: 870, y: 500 },
      { x: 730, y: 620 },
      { x: 870, y: 620 },
      { x: 800, y: 485 },
      { x: 800, y: 635 },
    ],
    objective: {
      id: 'beacon_downtown',
      label: 'City-Center Signal Fountain & Beacon',
      x: 800,
      y: 560,
      radius: 36,
      interactionRange: 88,
    },
    roads: [
      // Outdoor Grass & Autumn Park Patches
      { x: 580, y: 360, width: 440, height: 400, kind: 'autumn_grass' },
      // Central Stone Plaza Square
      { x: 636, y: 416, width: 328, height: 288, kind: 'plaza' },
      // Horizontal Boulevards
      { x: 48, y: 240, width: 1504, height: 96, kind: 'asphalt' },
      { x: 48, y: 512, width: 1504, height: 96, kind: 'asphalt' },
      { x: 48, y: 784, width: 1504, height: 96, kind: 'asphalt' },
      // Vertical Avenues
      { x: 256, y: 48, width: 96, height: 1024, kind: 'asphalt' },
      { x: 752, y: 48, width: 96, height: 1024, kind: 'asphalt' },
      { x: 1248, y: 48, width: 96, height: 1024, kind: 'asphalt' },
      // Narrow Alleys
      { x: 512, y: 96, width: 56, height: 928, kind: 'alley' },
      { x: 1032, y: 96, width: 56, height: 928, kind: 'alley' },

      // Cutaway Building Interior Floors (from Pixel_16_interiors_v2_free & PixelSpaces)
      // NW1: Guardhouse Carpet
      { x: 368, y: 80, width: 128, height: 140, kind: 'carpet_blue' },
      // NW2: Metro Bank Vault / Office Wood Floor
      { x: 584, y: 80, width: 148, height: 140, kind: 'wood_floor' },
      // NE1: Arcade Lounge Red Carpet
      { x: 868, y: 80, width: 148, height: 140, kind: 'carpet_red' },
      // NE2: Roastery Kitchen Checkerboard Tile
      { x: 1104, y: 80, width: 128, height: 140, kind: 'kitchen_tile' },
      // NE3: Hotel Lux Bedroom Wood Planks
      { x: 1364, y: 80, width: 156, height: 140, kind: 'wood_floor' },

      // Mid-West Interiors
      { x: 80, y: 356, width: 156, height: 136, kind: 'kitchen_tile' },
      { x: 368, y: 356, width: 128, height: 136, kind: 'carpet_blue' },
      { x: 80, y: 624, width: 156, height: 140, kind: 'wood_floor' },
      { x: 368, y: 624, width: 128, height: 140, kind: 'carpet_red' },

      // Mid-East Interiors (Book Depot, Noodle Kitchen, Hardware, Post Office)
      { x: 1104, y: 356, width: 128, height: 136, kind: 'wood_floor' },
      { x: 1364, y: 356, width: 156, height: 136, kind: 'kitchen_tile' },
      { x: 1104, y: 624, width: 128, height: 140, kind: 'carpet_blue' },
      { x: 1364, y: 624, width: 156, height: 140, kind: 'wood_floor' },

      // South Interiors & Canal Bridges
      { x: 80, y: 900, width: 156, height: 148, kind: 'wood_floor' },
      { x: 368, y: 900, width: 128, height: 148, kind: 'kitchen_tile' },
      { x: 732, y: 944, width: 136, height: 56, kind: 'bridge_h' },
      { x: 1104, y: 900, width: 128, height: 148, kind: 'carpet_blue' },
      { x: 1364, y: 900, width: 156, height: 148, kind: 'wood_floor' },
    ],
    walls: [
      // North-West Precinct Block
      { id: 'w_nw1', x: 368, y: 80, width: 128, height: 140, kind: 'building', label: 'PRECINCT HQ', roofColor: '#1E293B', wallColor: '#334155' },
      { id: 'w_nw2', x: 584, y: 80, width: 148, height: 140, kind: 'building', label: 'LIVING LOUNGE', roofColor: '#1E3A5F', wallColor: '#2C4C7E' },
      // North-East Commercial Block
      { id: 'w_ne1', x: 868, y: 80, width: 148, height: 140, kind: 'building', label: 'GAMING LOFT', roofColor: '#312E81', wallColor: '#4338CA' },
      { id: 'w_ne2', x: 1104, y: 80, width: 128, height: 140, kind: 'building', label: 'CAFE KITCHEN', roofColor: '#3F2E21', wallColor: '#5C4028' },
      { id: 'w_ne3', x: 1364, y: 80, width: 156, height: 140, kind: 'building', label: 'HOTEL SUITE', roofColor: '#7F1D1D', wallColor: '#991B1B' },

      // Mid-West Apartment & Bath Block
      { id: 'w_mw1', x: 80, y: 356, width: 156, height: 136, kind: 'building', label: 'BATH & SPA', roofColor: '#1E3A5F', wallColor: '#3B82F6' },
      { id: 'w_mw2', x: 368, y: 356, width: 128, height: 136, kind: 'building', label: 'ELEVATOR LOBBY', roofColor: '#1F2937', wallColor: '#374151' },
      { id: 'w_mw3', x: 80, y: 624, width: 156, height: 140, kind: 'building', label: 'BUNKBED DORM', roofColor: '#3B2F2F', wallColor: '#524141' },
      { id: 'w_mw4', x: 368, y: 624, width: 128, height: 140, kind: 'building', label: 'RED VELVET DEN', roofColor: '#3B1D38', wallColor: '#582952' },

      // Plaza Corner Hedges & Fences (from fantasy_ [fencesAndWalls])
      { id: 'w_pc1', x: 604, y: 376, width: 92, height: 32, kind: 'fence' },
      { id: 'w_pc2', x: 904, y: 376, width: 92, height: 32, kind: 'fence' },
      { id: 'w_pc3', x: 604, y: 712, width: 92, height: 32, kind: 'fence' },
      { id: 'w_pc4', x: 904, y: 712, width: 92, height: 32, kind: 'fence' },

      // Mid-East Market Block
      { id: 'w_me1', x: 1104, y: 356, width: 128, height: 136, kind: 'building', label: 'BOOK LIBRARY', roofColor: '#1E293B', wallColor: '#334155' },
      { id: 'w_me2', x: 1364, y: 356, width: 156, height: 136, kind: 'building', label: 'BISTRO KITCHEN', roofColor: '#451A1C', wallColor: '#692629' },
      { id: 'w_me3', x: 1104, y: 624, width: 128, height: 140, kind: 'building', label: 'STUDY OFFICE', roofColor: '#1E3A3A', wallColor: '#285252' },
      { id: 'w_me4', x: 1364, y: 624, width: 156, height: 140, kind: 'building', label: 'PACKAGE DEPOT', roofColor: '#1E293B', wallColor: '#334155' },

      // South Blocks & Canal Drainage
      { id: 'w_sw1', x: 80, y: 900, width: 156, height: 148, kind: 'building', label: 'RED HOUSE', roofColor: '#991B1B', wallColor: '#B91C1C' },
      { id: 'w_sw2', x: 368, y: 900, width: 128, height: 148, kind: 'building', label: 'BEIGE COTTAGE', roofColor: '#92400E', wallColor: '#B45309' },
      { id: 'w_sc1', x: 584, y: 912, width: 148, height: 136, kind: 'water_canal', label: 'SOUTH CANAL' },
      { id: 'w_sc2', x: 868, y: 912, width: 148, height: 136, kind: 'water_canal', label: 'EAST CANAL' },
      { id: 'w_se1', x: 1104, y: 900, width: 128, height: 148, kind: 'building', label: 'GREENHOUSE', roofColor: '#065F46', wallColor: '#047857' },
      { id: 'w_se2', x: 1364, y: 900, width: 156, height: 148, kind: 'building', label: 'TROPHY HALL', roofColor: '#2D2638', wallColor: '#433854' },
    ],
    props: [
      // Interior Furniture Props rendered inside the cutaway buildings
      { id: 'pr_1', type: 'couch_blue', x: 604, y: 100 },
      { id: 'pr_2', type: 'coffee_table', x: 660, y: 110 },
      { id: 'pr_3', type: 'bookshelf', x: 384, y: 92 },
      { id: 'pr_4', type: 'laptop_desk', x: 436, y: 124 },
      { id: 'pr_5', type: 'couch_red', x: 888, y: 100 },
      { id: 'pr_6', type: 'skateboard', x: 954, y: 138 },
      { id: 'pr_7', type: 'kitchen_counter', x: 1118, y: 96 },
      { id: 'pr_8', type: 'fridge_white', x: 1184, y: 92 },
      { id: 'pr_9', type: 'bed_red', x: 1384, y: 98 },
      { id: 'pr_10', type: 'bed_yellow', x: 1452, y: 98 },
      { id: 'pr_11', type: 'bathtub', x: 96, y: 374 },
      { id: 'pr_12', type: 'toilet', x: 176, y: 374 },
      { id: 'pr_13', type: 'stairs', x: 388, y: 372 },
      { id: 'pr_14', type: 'bunkbed_green', x: 98, y: 644 },
      { id: 'pr_15', type: 'couch_red', x: 386, y: 648 },
      { id: 'pr_16', type: 'bookshelf', x: 1120, y: 372 },
      { id: 'pr_17', type: 'bookshelf', x: 1172, y: 372 },
      { id: 'pr_18', type: 'kitchen_sink', x: 1384, y: 374 },
      { id: 'pr_19', type: 'kitchen_counter', x: 1442, y: 374 },
      { id: 'pr_20', type: 'laptop_desk', x: 1126, y: 648 },
      { id: 'pr_21', type: 'trophy', x: 1400, y: 928 },
      { id: 'pr_22', type: 'flowerpot', x: 1130, y: 924 },
      { id: 'pr_23', type: 'flowerpot', x: 1178, y: 924 },

      // Outdoor Trees, Autumn Foliage, Shiny Coins & Exotic Fruits
      { id: 'pr_t1', type: 'tree_green', x: 310, y: 66 },
      { id: 'pr_t2', type: 'tree_autumn', x: 584, y: 364 },
      { id: 'pr_t3', type: 'tree_autumn', x: 984, y: 364 },
      { id: 'pr_t4', type: 'tree_green', x: 584, y: 726 },
      { id: 'pr_t5', type: 'tree_autumn', x: 984, y: 726 },
      { id: 'pr_c1', type: 'shiny_coin', x: 706, y: 454 },
      { id: 'pr_c2', type: 'shiny_coin', x: 894, y: 454 },
      { id: 'pr_f1', type: 'exotic_fruit', x: 706, y: 662 },
      { id: 'pr_f2', type: 'exotic_fruit', x: 894, y: 662 },
    ],
    hidingSpots: [
      { id: 'hs_1', type: 'cabinet_wardrobe', label: 'Precinct Oak Wardrobe', x: 320, y: 226, width: 34, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_2', type: 'couch_fort', label: 'Lounge Blue Couch Cushions', x: 604, y: 228, width: 38, height: 34, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_3', type: 'curtain_alcove', label: 'Gaming Loft Red Curtain', x: 880, y: 228, width: 34, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_4', type: 'refrigerator_box', label: 'Cafe Large White Fridge', x: 1054, y: 226, width: 34, height: 38, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_5', type: 'moving_package', label: 'Hotel Moving Package', x: 1316, y: 228, width: 38, height: 34, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_6', type: 'elevator_shaft', label: 'Transit Hub Elevator Door', x: 522, y: 326, width: 34, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_7', type: 'trash_bin', label: 'Spa Alley Blue Bin', x: 248, y: 498, width: 32, height: 32, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_8', type: 'bush', label: 'North Plaza Autumn Shrub', x: 648, y: 424, width: 36, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_9', type: 'bush', label: 'East Plaza Mystic Hedge', x: 928, y: 424, width: 36, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_10', type: 'kiosk', label: 'Plaza Ticket Kiosk', x: 636, y: 656, width: 36, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_11', type: 'cabinet_wardrobe', label: 'Library Book Cabinet', x: 1044, y: 498, width: 34, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_12', type: 'refrigerator_box', label: 'Bistro Walk-In Cooler', x: 1316, y: 498, width: 34, height: 38, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_13', type: 'moving_package', label: 'Dormitory Blue Storage Box', x: 248, y: 772, width: 38, height: 34, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_14', type: 'curtain_alcove', label: 'Cinema Velvet Drapes', x: 512, y: 772, width: 34, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_15', type: 'elevator_shaft', label: 'Office Service Elevator', x: 1052, y: 772, width: 34, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_16', type: 'fountain_basin', label: 'West Canal Fountain Basin', x: 530, y: 862, width: 38, height: 38, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_17', type: 'fountain_basin', label: 'East Canal Stone Fountain', x: 1032, y: 862, width: 38, height: 38, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hs_18', type: 'large_crate', label: 'Trophy Hall Relic Crate', x: 1312, y: 862, width: 36, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
    ],
    streetlights: [
      { x: 250, y: 236 },
      { x: 746, y: 236 },
      { x: 1242, y: 236 },
      { x: 620, y: 404 },
      { x: 980, y: 404 },
      { x: 620, y: 716 },
      { x: 980, y: 716 },
      { x: 250, y: 780 },
      { x: 1242, y: 780 },
    ],
  },

  harbor_district: {
    id: 'harbor_district',
    name: 'Eldoria Harbor & Railway Docks',
    subtitle: 'Fantasy v2.0 railway tracks, bridges, cavern fountains & furnished dockhouses (20 hiding spots)',
    theme: 'harbor_fantasy',
    recommendedSeekers: 2,
    width: 1760,
    height: 1200,
    tileSize: 32,
    seekerSpawnZone: { x: 64, y: 64, width: 208, height: 176 },
    seekerSpawns: [
      { x: 128, y: 148 },
      { x: 208, y: 148 },
    ],
    hiderSpawnZone: { x: 740, y: 480, width: 280, height: 240 },
    hiderSpawns: [
      { x: 820, y: 545 },
      { x: 970, y: 520 },
      { x: 790, y: 680 },
      { x: 970, y: 680 },
      { x: 880, y: 500 },
      { x: 880, y: 700 },
    ],
    objective: {
      id: 'beacon_harbor',
      label: 'Crystal Fountain & Radio Spire',
      x: 880,
      y: 600,
      radius: 38,
      interactionRange: 88,
    },
    roads: [
      { x: 640, y: 390, width: 480, height: 420, kind: 'grass_patch' },
      { x: 680, y: 430, width: 400, height: 340, kind: 'dock_planks' },
      { x: 48, y: 260, width: 1664, height: 96, kind: 'asphalt' },
      { x: 48, y: 552, width: 1664, height: 96, kind: 'railway' },
      { x: 48, y: 844, width: 1664, height: 96, kind: 'asphalt' },
      { x: 288, y: 48, width: 96, height: 1104, kind: 'asphalt' },
      { x: 832, y: 48, width: 96, height: 1104, kind: 'bridge_v' },
      { x: 1376, y: 48, width: 96, height: 1104, kind: 'asphalt' },
      { x: 560, y: 80, width: 64, height: 1040, kind: 'alley' },
      { x: 1136, y: 80, width: 64, height: 1040, kind: 'alley' },
      // Cutaway Dockhouse Interiors
      { x: 404, y: 88, width: 136, height: 148, kind: 'wood_floor' },
      { x: 644, y: 88, width: 164, height: 148, kind: 'carpet_blue' },
      { x: 948, y: 88, width: 164, height: 148, kind: 'kitchen_tile' },
      { x: 1220, y: 88, width: 136, height: 148, kind: 'wood_floor' },
      { x: 1492, y: 88, width: 176, height: 148, kind: 'carpet_red' },
    ],
    walls: [
      { id: 'h_nw1', x: 404, y: 88, width: 136, height: 148, kind: 'building', label: 'CAPTAIN QUARTERS', roofColor: '#1E293B', wallColor: '#334155' },
      { id: 'h_nw2', x: 644, y: 88, width: 164, height: 148, kind: 'building', label: 'CUSTOMS LOUNGE', roofColor: '#1E3A5F', wallColor: '#2C4C7E' },
      { id: 'h_ne1', x: 948, y: 88, width: 164, height: 148, kind: 'building', label: 'MESS GALLEY', roofColor: '#312E81', wallColor: '#4338CA' },
      { id: 'h_ne2', x: 1220, y: 88, width: 136, height: 148, kind: 'building', label: 'MINE DEPOT', roofColor: '#3F2E21', wallColor: '#5C4028' },
      { id: 'h_ne3', x: 1492, y: 88, width: 176, height: 148, kind: 'building', label: 'GUILD HALL', roofColor: '#1E293B', wallColor: '#334155' },

      { id: 'h_mw1', x: 88, y: 380, width: 176, height: 148, kind: 'building', label: 'SHIPYARD WEST', roofColor: '#27272A', wallColor: '#3F3F46' },
      { id: 'h_mw2', x: 404, y: 380, width: 136, height: 148, kind: 'building', label: 'FROZEN IGLOO STORAGE', roofColor: '#1E3A5F', wallColor: '#38BDF8' },
      { id: 'h_mw3', x: 88, y: 672, width: 176, height: 148, kind: 'building', label: 'CAVERN FORGE', roofColor: '#3B2F2F', wallColor: '#524141' },
      { id: 'h_mw4', x: 404, y: 672, width: 136, height: 148, kind: 'building', label: 'TAPESTRY LOFT', roofColor: '#3B1D38', wallColor: '#582952' },

      { id: 'h_pc1', x: 660, y: 400, width: 108, height: 32, kind: 'fence' },
      { id: 'h_pc2', x: 992, y: 400, width: 108, height: 32, kind: 'fence' },
      { id: 'h_pc3', x: 660, y: 768, width: 108, height: 32, kind: 'fence' },
      { id: 'h_pc4', x: 992, y: 768, width: 108, height: 32, kind: 'fence' },

      { id: 'h_me1', x: 1220, y: 380, width: 136, height: 148, kind: 'building', label: 'FREIGHT SHED', roofColor: '#1E293B', wallColor: '#334155' },
      { id: 'h_me2', x: 1492, y: 380, width: 176, height: 148, kind: 'building', label: 'SAILORS BUNK', roofColor: '#451A1C', wallColor: '#692629' },
      { id: 'h_me3', x: 1220, y: 672, width: 136, height: 148, kind: 'building', label: 'ALCHEMIST LAB', roofColor: '#1E3A3A', wallColor: '#285252' },
      { id: 'h_me4', x: 1492, y: 672, width: 176, height: 148, kind: 'building', label: 'LIGHTHOUSE HQ', roofColor: '#1E293B', wallColor: '#334155' },

      { id: 'h_sw1', x: 88, y: 964, width: 176, height: 152, kind: 'building', label: 'PIER 9 VAULT', roofColor: '#27272A', wallColor: '#3F3F46' },
      { id: 'h_sw2', x: 404, y: 964, width: 136, height: 152, kind: 'water_canal', label: 'WEST LAGOON' },
      { id: 'h_sc1', x: 644, y: 964, width: 164, height: 152, kind: 'water_canal', label: 'HARBOR BASIN' },
      { id: 'h_sc2', x: 948, y: 964, width: 164, height: 152, kind: 'water_canal', label: 'EAST BASIN' },
      { id: 'h_se1', x: 1220, y: 964, width: 136, height: 152, kind: 'building', label: 'FISHERY KITCHEN', roofColor: '#1E293B', wallColor: '#334155' },
      { id: 'h_se2', x: 1492, y: 964, width: 176, height: 152, kind: 'building', label: 'CONTAINER TERMINAL', roofColor: '#2D2638', wallColor: '#433854' },
    ],
    props: [
      { id: 'hp_1', type: 'bed_red', x: 420, y: 108 },
      { id: 'hp_2', type: 'couch_blue', x: 668, y: 108 },
      { id: 'hp_3', type: 'kitchen_counter', x: 968, y: 108 },
      { id: 'hp_4', type: 'fridge_white', x: 1042, y: 104 },
      { id: 'hp_5', type: 'bookshelf', x: 1244, y: 108 },
      { id: 'hp_6', type: 'couch_red', x: 1516, y: 108 },
      { id: 'hp_7', type: 'tree_autumn', x: 648, y: 396 },
      { id: 'hp_8', type: 'tree_green', x: 1076, y: 396 },
      { id: 'hp_9', type: 'shiny_coin', x: 760, y: 490 },
      { id: 'hp_10', type: 'exotic_fruit', x: 1000, y: 490 },
    ],
    hidingSpots: [
      { id: 'hh_1', type: 'cabinet_wardrobe', label: 'Captain Wardrobe Cabinet', x: 350, y: 248, width: 34, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_2', type: 'moving_package', label: 'Bonded Timber Package', x: 590, y: 248, width: 38, height: 34, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_3', type: 'refrigerator_box', label: 'Galley Cold Locker', x: 896, y: 248, width: 34, height: 38, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_4', type: 'trash_bin', label: 'Mine Depot Ore Bin', x: 1168, y: 248, width: 32, height: 32, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_5', type: 'couch_fort', label: 'Guild Hall Plush Sofa', x: 1436, y: 248, width: 38, height: 34, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_6', type: 'elevator_shaft', label: 'Shipyard Hoist Shaft', x: 284, y: 336, width: 34, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_7', type: 'large_crate', label: 'Ice House Insulated Crate', x: 562, y: 336, width: 34, height: 34, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_8', type: 'bush', label: 'Radio Plaza Mystic Shrub', x: 704, y: 452, width: 36, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_9', type: 'bush', label: 'East Dock Autumn Bush', x: 1024, y: 452, width: 36, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_10', type: 'kiosk', label: 'Ferry Ticket Kiosk', x: 704, y: 712, width: 36, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_11', type: 'curtain_alcove', label: 'Dockworkers Curtain Booth', x: 1024, y: 712, width: 34, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_12', type: 'drainage_entrance', label: 'Railway Storm Grate', x: 1152, y: 540, width: 32, height: 32, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_13', type: 'storage_container', label: 'Sailors Bunk Cargo Box', x: 1436, y: 540, width: 40, height: 34, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_14', type: 'trash_bin', label: 'Forge Slag Dumpster', x: 284, y: 832, width: 32, height: 32, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_15', type: 'curtain_alcove', label: 'Tapestry Velvet Alcove', x: 562, y: 832, width: 34, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_16', type: 'cabinet_wardrobe', label: 'Alchemist Herb Cabinet', x: 1168, y: 832, width: 34, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_17', type: 'fountain_basin', label: 'West Lagoon Fountain', x: 350, y: 916, width: 38, height: 38, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_18', type: 'fountain_basin', label: 'Harbor Basin Crystal Well', x: 590, y: 916, width: 38, height: 38, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_19', type: 'water_tunnel', label: 'East Basin Drainage Tunnel', x: 1144, y: 916, width: 36, height: 36, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
      { id: 'hh_20', type: 'moving_package', label: 'Terminal Export Crate', x: 1436, y: 916, width: 40, height: 34, capacity: 1, canInspect: true, canEliminateOccupant: true, interactionRange: 68 },
    ],
    streetlights: [
      { x: 280, y: 256 },
      { x: 824, y: 256 },
      { x: 1368, y: 256 },
      { x: 680, y: 430 },
      { x: 1080, y: 430 },
      { x: 680, y: 770 },
      { x: 1080, y: 770 },
      { x: 280, y: 840 },
      { x: 1368, y: 840 },
    ],
  },
};
