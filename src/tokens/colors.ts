export const colors = {
  // Primary
  primary: '#FF6A00',
  primaryForeground: '#FFFFFF',

  // Light mode surfaces
  white: '#FFFFFF',
  cardLight: '#F7F7F8',
  foregroundLight: '#18181B',
  secondaryLight: '#F0F0F2',
  secondaryForegroundLight: '#52525B',
  mutedLight: '#E4E4E7',
  mutedForegroundLight: '#A1A1AA',

  // Dark mode surfaces
  backgroundDark: '#19191D',
  cardDark: '#222226',
  foregroundDark: '#F5F5F5',
  secondaryDark: '#2E2E33',
  secondaryForegroundDark: '#D4D4D8',
  mutedDark: '#3F3F46',
  mutedForegroundDark: '#71717A',

  // Status
  statusEmpty: '#22C55E',
  statusModerate: '#EAB308',
  statusBusy: '#F97316',
  statusFull: '#EF4444',

  // Destructive
  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',
} as const

export type ColorKey = keyof typeof colors
