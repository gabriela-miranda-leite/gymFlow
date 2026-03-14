import { colors } from './colors';

export type OccupancyLevel = 'empty' | 'moderate' | 'busy' | 'packed';

export interface AppTheme {
  key: 'light' | 'dark';

  bg: {
    primary: string;
    secondary: string;
    tertiary: string;
  };

  surface: {
    primary: string;
    secondary: string;
    elevated: string;
  };

  border: {
    default: string;
    subtle: string;
    strong: string;
  };

  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    disabled: string;
  };

  icon: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };

  brand: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    onPrimary: string;
  };

  occupancy: Record<OccupancyLevel, { indicator: string; bg: string; text: string }>;

  tabBar: {
    bg: string;
    border: string;
    active: string;
    inactive: string;
  };
}

export const lightTheme: AppTheme = {
  key: 'light',

  bg: {
    primary: colors.white,
    secondary: colors.gray100,
    tertiary: colors.gray200,
  },

  surface: {
    primary: colors.white,
    secondary: colors.gray100,
    elevated: colors.white,
  },

  border: {
    default: colors.gray200,
    subtle: colors.gray100,
    strong: colors.gray300,
  },

  text: {
    primary: colors.gray900,
    secondary: colors.gray600,
    tertiary: colors.gray400,
    inverse: colors.white,
    disabled: colors.gray300,
  },

  icon: {
    primary: colors.gray900,
    secondary: colors.gray500,
    tertiary: colors.gray300,
    inverse: colors.white,
  },

  brand: {
    primary: colors.primary,
    primaryDark: colors.primaryDark,
    primaryLight: colors.primaryLight,
    secondary: colors.secondary,
    onPrimary: colors.white,
  },

  occupancy: {
    empty: {
      indicator: colors.occupancyEmpty,
      bg: colors.occupancyEmptyBg,
      text: colors.occupancyEmptyText,
    },
    moderate: {
      indicator: colors.occupancyModerate,
      bg: colors.occupancyModerateBg,
      text: colors.occupancyModerateText,
    },
    busy: {
      indicator: colors.occupancyBusy,
      bg: colors.occupancyBusyBg,
      text: colors.occupancyBusyText,
    },
    packed: {
      indicator: colors.occupancyPacked,
      bg: colors.occupancyPackedBg,
      text: colors.occupancyPackedText,
    },
  },

  tabBar: {
    bg: colors.white,
    border: colors.gray200,
    active: colors.primary,
    inactive: colors.gray400,
  },
};

export const darkTheme: AppTheme = {
  key: 'dark',

  bg: {
    primary: colors.dark900,
    secondary: colors.dark800,
    tertiary: colors.dark700,
  },

  surface: {
    primary: colors.dark800,
    secondary: colors.dark700,
    elevated: colors.dark600,
  },

  border: {
    default: colors.dark500,
    subtle: colors.dark700,
    strong: colors.dark400,
  },

  text: {
    primary: colors.white,
    secondary: colors.gray300,
    tertiary: colors.gray500,
    inverse: colors.gray900,
    disabled: colors.gray600,
  },

  icon: {
    primary: colors.white,
    secondary: colors.gray400,
    tertiary: colors.gray600,
    inverse: colors.gray900,
  },

  brand: {
    primary: colors.primary,
    primaryDark: colors.primaryDark,
    primaryLight: colors.primaryLight,
    secondary: colors.secondary,
    onPrimary: colors.white,
  },

  occupancy: {
    empty: {
      indicator: colors.occupancyEmpty,
      bg: '#052E16',
      text: '#4ADE80',
    },
    moderate: {
      indicator: colors.occupancyModerate,
      bg: '#1C1400',
      text: '#FCD34D',
    },
    busy: {
      indicator: colors.occupancyBusy,
      bg: '#1C0F00',
      text: '#FB923C',
    },
    packed: {
      indicator: colors.occupancyPacked,
      bg: '#1C0000',
      text: '#FCA5A5',
    },
  },

  tabBar: {
    bg: colors.dark800,
    border: colors.dark600,
    active: colors.primary,
    inactive: colors.gray600,
  },
};
