export const FontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  monoRegular: 'JetBrainsMono_400Regular',
  monoMedium: 'JetBrainsMono_500Medium',
  monoSemiBold: 'JetBrainsMono_600SemiBold',
  monoBold: 'JetBrainsMono_700Bold',
} as const

export const FontWeight = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const

export const FontSize = {
  display: 24,
  heading: 20,
  subheading: 16,
  body: 14,
  caption: 12,
  micro: 10,
  data: 30,
} as const

export const Typography = {
  display: { fontFamily: FontFamily.bold, fontSize: FontSize.display },
  heading: { fontFamily: FontFamily.bold, fontSize: FontSize.heading },
  subheading: { fontFamily: FontFamily.semiBold, fontSize: FontSize.subheading },
  body: { fontFamily: FontFamily.medium, fontSize: FontSize.body },
  caption: { fontFamily: FontFamily.medium, fontSize: FontSize.caption },
  micro: { fontFamily: FontFamily.semiBold, fontSize: FontSize.micro },
  data: { fontFamily: FontFamily.monoBold, fontSize: FontSize.data },
} as const
