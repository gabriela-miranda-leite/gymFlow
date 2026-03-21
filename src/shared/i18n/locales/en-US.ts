const enUS = {
  common: {
    appName: 'GymFlow',
    retry: 'Try again',
    tabs: {
      home: 'Gyms',
      profile: 'Profile',
    },
  },
  home: {
    title: 'Gyms',
    emptyState: 'Your gyms will appear here',
  },
  login: {
    brand: 'GymFlow',
    cta: 'Log in to continue',
  },
  profile: {
    title: 'Profile',
    emptyState: 'Your profile information will appear here',
  },
  errors: {
    fetchGyms: 'Failed to fetch gyms',
    generic: 'Something went wrong. Please try again.',
  },
} as const

export default enUS
