// Custom MapLibre style specs derived from the app's design tokens.
// Uses OpenFreeMap vector tiles (OpenMapTiles schema) with app-themed colors.

const TILE_SOURCE = 'https://tiles.openfreemap.org/planet'
const GLYPHS = 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf'

// ─── Light palette (mirrors lightTheme tokens) ────────────────────────────────
const L = {
  bg: '#F7F7F8',
  water: '#C0D8EA',
  waterway: '#A8C8DE',
  wood: '#CAE0CC',
  grass: '#DAF0DC',
  sand: '#EDE8D4',
  park: '#D4ECDA',
  roadMotorwayFill: '#FFC280',
  roadMotorwayCase: '#E89A40',
  roadTrunkFill: '#FFD9A8',
  roadTrunkCase: '#E8B870',
  roadPrimaryFill: '#FFFFFF',
  roadPrimaryCase: '#E4E4E7',
  roadSecondaryFill: '#FFFFFF',
  roadSecondaryCase: '#E4E4E7',
  roadMinorFill: '#F7F7F8',
  roadMinorCase: '#E4E4E7',
  roadPathFill: '#D4D4D8',
  building: '#EAEAED',
  buildingRoof: '#E2E2E6',
  buildingOutline: '#D4D4D8',
  boundary: '#C8C8D0',
  label: '#18181B',
  labelMuted: '#52525B',
  labelHalo: '#F7F7F8',
  transit: '#71717A',
}

// ─── Dark palette (mirrors darkTheme tokens) ──────────────────────────────────
const D = {
  bg: '#19191D',
  water: '#162130',
  waterway: '#1B2A3E',
  wood: '#172419',
  grass: '#1A2B1C',
  sand: '#29251D',
  park: '#1C2D1E',
  roadMotorwayFill: '#4A2800',
  roadMotorwayCase: '#19191D',
  roadTrunkFill: '#3D2200',
  roadTrunkCase: '#19191D',
  roadPrimaryFill: '#2E2E33',
  roadPrimaryCase: '#19191D',
  roadSecondaryFill: '#28282D',
  roadSecondaryCase: '#19191D',
  roadMinorFill: '#222226',
  roadMinorCase: '#19191D',
  roadPathFill: '#3F3F46',
  building: '#222226',
  buildingRoof: '#26262B',
  buildingOutline: '#19191D',
  boundary: '#3F3F46',
  label: '#F5F5F5',
  labelMuted: '#D4D4D8',
  labelHalo: '#19191D',
  transit: '#71717A',
}

function buildStyle(c: typeof L) {
  return {
    version: 8,
    sources: {
      openmaptiles: {
        type: 'vector',
        url: TILE_SOURCE,
      },
    },
    glyphs: GLYPHS,
    layers: [
      // ── Base ──────────────────────────────────────────────────────────────
      {
        id: 'background',
        type: 'background',
        paint: { 'background-color': c.bg },
      },

      // ── Land cover ────────────────────────────────────────────────────────
      {
        id: 'landcover-wood',
        type: 'fill',
        source: 'openmaptiles',
        'source-layer': 'landcover',
        filter: ['==', 'class', 'wood'],
        paint: { 'fill-color': c.wood, 'fill-opacity': 0.8 },
      },
      {
        id: 'landcover-grass',
        type: 'fill',
        source: 'openmaptiles',
        'source-layer': 'landcover',
        filter: ['in', 'class', 'grass', 'scrub', 'crop'],
        paint: { 'fill-color': c.grass, 'fill-opacity': 0.7 },
      },
      {
        id: 'landcover-sand',
        type: 'fill',
        source: 'openmaptiles',
        'source-layer': 'landcover',
        filter: ['in', 'class', 'sand', 'bare_rock'],
        paint: { 'fill-color': c.sand, 'fill-opacity': 0.8 },
      },

      // ── Land use ──────────────────────────────────────────────────────────
      {
        id: 'landuse-park',
        type: 'fill',
        source: 'openmaptiles',
        'source-layer': 'landuse',
        filter: ['in', 'class', 'park', 'recreation_ground', 'pitch', 'garden'],
        paint: { 'fill-color': c.park },
      },
      {
        id: 'landuse-residential',
        type: 'fill',
        source: 'openmaptiles',
        'source-layer': 'landuse',
        filter: ['==', 'class', 'residential'],
        paint: { 'fill-color': c.bg, 'fill-opacity': 0.5 },
      },

      // ── Water ─────────────────────────────────────────────────────────────
      {
        id: 'water',
        type: 'fill',
        source: 'openmaptiles',
        'source-layer': 'water',
        paint: { 'fill-color': c.water },
      },
      {
        id: 'waterway',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'waterway',
        paint: {
          'line-color': c.waterway,
          'line-width': ['interpolate', ['linear'], ['zoom'], 8, 0.5, 14, 2],
        },
      },

      // ── Boundaries ────────────────────────────────────────────────────────
      {
        id: 'boundary-admin',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'boundary',
        filter: ['>=', 'admin_level', 4],
        paint: {
          'line-color': c.boundary,
          'line-width': 1,
          'line-dasharray': [4, 2],
        },
      },

      // ── Transportation cases (drawn below fills for clean edges) ──────────
      {
        id: 'road-motorway-case',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'transportation',
        filter: ['==', 'class', 'motorway'],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': c.roadMotorwayCase,
          'line-width': ['interpolate', ['linear'], ['zoom'], 8, 2, 14, 8],
          'line-gap-width': 0,
        },
      },
      {
        id: 'road-trunk-case',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'transportation',
        filter: ['==', 'class', 'trunk'],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': c.roadTrunkCase,
          'line-width': ['interpolate', ['linear'], ['zoom'], 8, 1.5, 14, 7],
        },
      },
      {
        id: 'road-primary-case',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'transportation',
        filter: ['==', 'class', 'primary'],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': c.roadPrimaryCase,
          'line-width': ['interpolate', ['linear'], ['zoom'], 10, 2, 14, 8],
        },
      },
      {
        id: 'road-secondary-case',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'transportation',
        filter: ['in', 'class', 'secondary', 'tertiary'],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': c.roadSecondaryCase,
          'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1.5, 14, 6],
        },
      },
      {
        id: 'road-minor-case',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'transportation',
        filter: ['in', 'class', 'minor', 'service', 'track'],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': c.roadMinorCase,
          'line-width': ['interpolate', ['linear'], ['zoom'], 12, 1, 14, 4],
        },
      },

      // ── Transportation fills ───────────────────────────────────────────────
      {
        id: 'road-path',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'transportation',
        filter: ['in', 'class', 'path', 'footway', 'cycleway'],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': c.roadPathFill,
          'line-width': 1,
          'line-dasharray': [3, 2],
        },
      },
      {
        id: 'road-minor',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'transportation',
        filter: ['in', 'class', 'minor', 'service', 'track'],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': c.roadMinorFill,
          'line-width': ['interpolate', ['linear'], ['zoom'], 12, 0.5, 14, 3],
        },
      },
      {
        id: 'road-secondary',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'transportation',
        filter: ['in', 'class', 'secondary', 'tertiary'],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': c.roadSecondaryFill,
          'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1, 14, 5],
        },
      },
      {
        id: 'road-primary',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'transportation',
        filter: ['==', 'class', 'primary'],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': c.roadPrimaryFill,
          'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1.5, 14, 6],
        },
      },
      {
        id: 'road-trunk',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'transportation',
        filter: ['==', 'class', 'trunk'],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': c.roadTrunkFill,
          'line-width': ['interpolate', ['linear'], ['zoom'], 8, 1, 14, 6],
        },
      },
      {
        id: 'road-motorway',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'transportation',
        filter: ['==', 'class', 'motorway'],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': c.roadMotorwayFill,
          'line-width': ['interpolate', ['linear'], ['zoom'], 8, 1.5, 14, 7],
        },
      },

      // ── Buildings ─────────────────────────────────────────────────────────
      {
        id: 'building',
        type: 'fill',
        source: 'openmaptiles',
        'source-layer': 'building',
        minzoom: 14,
        paint: {
          'fill-color': c.building,
          'fill-outline-color': c.buildingOutline,
        },
      },

      // ── Labels ────────────────────────────────────────────────────────────
      {
        id: 'road-label',
        type: 'symbol',
        source: 'openmaptiles',
        'source-layer': 'transportation_name',
        minzoom: 14,
        layout: {
          'text-field': '{name}',
          'text-font': ['Noto Sans Regular'],
          'text-size': 11,
          'symbol-placement': 'line',
          'text-max-angle': 30,
        },
        paint: {
          'text-color': c.labelMuted,
          'text-halo-color': c.labelHalo,
          'text-halo-width': 2,
        },
      },
      {
        id: 'place-suburb',
        type: 'symbol',
        source: 'openmaptiles',
        'source-layer': 'place',
        filter: ['in', 'class', 'suburb', 'neighbourhood', 'quarter'],
        minzoom: 13,
        layout: {
          'text-field': '{name}',
          'text-font': ['Noto Sans Regular'],
          'text-size': ['interpolate', ['linear'], ['zoom'], 13, 10, 16, 13],
          'text-transform': 'uppercase',
          'text-letter-spacing': 0.05,
        },
        paint: {
          'text-color': c.labelMuted,
          'text-halo-color': c.labelHalo,
          'text-halo-width': 2,
        },
      },
      {
        id: 'place-city',
        type: 'symbol',
        source: 'openmaptiles',
        'source-layer': 'place',
        filter: ['in', 'class', 'city', 'town', 'village'],
        layout: {
          'text-field': '{name}',
          'text-font': ['Noto Sans Bold'],
          'text-size': ['interpolate', ['linear'], ['zoom'], 8, 11, 14, 16],
          'text-anchor': 'center',
          'text-max-width': 8,
        },
        paint: {
          'text-color': c.label,
          'text-halo-color': c.labelHalo,
          'text-halo-width': 2,
        },
      },
    ],
  }
}

export const lightMapStyle = buildStyle(L)
export const darkMapStyle = buildStyle(D)
