import { colors } from './colors';

export type OccupancyLevel = 'empty' | 'moderate' | 'busy' | 'packed';

export interface AppTheme {
  key: 'light' | 'dark';

  background: string;
  card: string;
  foreground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;

  brand: {
    primary: string;
    primaryForeground: string;
  };

  status: Record<OccupancyLevel, string>;

  destructive: string;
  destructiveForeground: string;

  tabBar: {
    bg: string;
    border: string;
    active: string;
    inactive: string;
  };
}

export const lightTheme: AppTheme = {
  key: 'light',

  background: colors.white,
  card: colors.cardLight,
  foreground: colors.foregroundLight,
  secondary: colors.secondaryLight,
  secondaryForeground: colors.secondaryForegroundLight,
  muted: colors.mutedLight,
  mutedForeground: colors.mutedForegroundLight,
  border: colors.mutedLight,
  input: colors.mutedLight,

  brand: {
    primary: colors.primary,
    primaryForeground: colors.primaryForeground,
  },

  status: {
    empty: colors.statusEmpty,
    moderate: colors.statusModerate,
    busy: colors.statusBusy,
    packed: colors.statusFull,
  },

  destructive: colors.destructive,
  destructiveForeground: colors.destructiveForeground,

  tabBar: {
    bg: colors.white,
    border: colors.mutedLight,
    active: colors.primary,
    inactive: colors.mutedForegroundLight,
  },
};

export const darkTheme: AppTheme = {
  key: 'dark',

  background: colors.backgroundDark,
  card: colors.cardDark,
  foreground: colors.foregroundDark,
  secondary: colors.secondaryDark,
  secondaryForeground: colors.secondaryForegroundDark,
  muted: colors.mutedDark,
  mutedForeground: colors.mutedForegroundDark,
  border: colors.secondaryDark,
  input: colors.secondaryDark,

  brand: {
    primary: colors.primary,
    primaryForeground: colors.primaryForeground,
  },

  status: {
    empty: colors.statusEmpty,
    moderate: colors.statusModerate,
    busy: colors.statusBusy,
    packed: colors.statusFull,
  },

  destructive: colors.destructive,
  destructiveForeground: colors.destructiveForeground,

  tabBar: {
    bg: colors.backgroundDark,
    border: colors.secondaryDark,
    active: colors.primary,
    inactive: colors.mutedForegroundDark,
  },
};
