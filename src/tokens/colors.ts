export const colors = {
  // Brand
  primary: '#FF6B35',
  primaryDark: '#CC4A15',
  primaryLight: '#FFF0EA',
  secondary: '#1A1A2E',

  // Occupancy — raw values (use theme semantic tokens in components)
  occupancyEmpty: '#22C55E',
  occupancyEmptyBg: '#F0FDF4',
  occupancyEmptyText: '#15803D',
  occupancyModerate: '#F59E0B',
  occupancyModerateBg: '#FFFBEB',
  occupancyModerateText: '#B45309',
  occupancyBusy: '#F97316',
  occupancyBusyBg: '#FFF7ED',
  occupancyBusyText: '#C2410C',
  occupancyPacked: '#EF4444',
  occupancyPackedBg: '#FEF2F2',
  occupancyPackedText: '#B91C1C',

  // Neutrals
  white: '#FFFFFF',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#0F172A',

  // Dark surfaces
  dark400: '#2A3550',
  dark500: '#1E2A42',
  dark600: '#161F33',
  dark700: '#0F1624',
  dark800: '#090E1A',
  dark900: '#080812',
} as const;

export type ColorKey = keyof typeof colors;
