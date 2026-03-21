// Duration tokens (ms)
export const Duration = {
  fast: 200,
  normal: 300,
  slow: 500,
  toast: 3000,
} as const

// Spring configs for Reanimated (withSpring)
export const Spring = {
  screen: { stiffness: 300, damping: 30 },
  tabIndicator: { stiffness: 500, damping: 35 },
  tapFeedback: { stiffness: 500, damping: 35 },
  sliderThumb: { stiffness: 500, damping: 35 },
} as const

// Scale tokens for tap/press feedback
export const Scale = {
  tap: 0.98,
  sliderThumb: 0.95,
} as const

// Moti transition presets
export const Transition = {
  screenEnter: {
    type: 'spring' as const,
    stiffness: Spring.screen.stiffness,
    damping: Spring.screen.damping,
  },
  fade: {
    type: 'timing' as const,
    duration: Duration.fast,
  },
  toast: {
    type: 'timing' as const,
    duration: Duration.fast,
  },
} as const
