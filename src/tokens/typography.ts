export const FontFamily = {
  // Barlow Condensed — headings, display, labels
  displayBlack: 'BarlowCondensed_900Black',
  displayExtraBold: 'BarlowCondensed_800ExtraBold',
  displayBold: 'BarlowCondensed_700Bold',
  // Barlow — body, captions, UI text
  body: 'Barlow_400Regular',
  bodyMedium: 'Barlow_500Medium',
  bodySemiBold: 'Barlow_600SemiBold',
} as const;

export const FontWeight = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
} as const;

export const FontSize = {
  display: 40,
  h1: 32,
  h2: 24,
  h3: 20,
  button: 18,
  bodyLg: 16,
  body: 14,
  caption: 12,
  overline: 11,
} as const;

export const LineHeight = {
  display: 44,
  h1: 36,
  h2: 28,
  h3: 24,
  button: 24,
  bodyLg: 24,
  body: 20,
  caption: 16,
  overline: 14,
} as const;

export const LetterSpacing = {
  display: -0.5,
  h1: -0.3,
  h2: -0.2,
  h3: 0,
  button: 0.1,
  bodyLg: 0,
  body: 0,
  caption: 0.2,
  overline: 1.0,
} as const;

export const Typography = {
  display: {
    fontFamily: FontFamily.displayBlack,
    fontSize: FontSize.display,
    lineHeight: LineHeight.display,
    letterSpacing: LetterSpacing.display,
  },
  h1: {
    fontFamily: FontFamily.displayExtraBold,
    fontSize: FontSize.h1,
    lineHeight: LineHeight.h1,
    letterSpacing: LetterSpacing.h1,
  },
  h2: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.h2,
    lineHeight: LineHeight.h2,
    letterSpacing: LetterSpacing.h2,
  },
  h3: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.h3,
    lineHeight: LineHeight.h3,
    letterSpacing: LetterSpacing.h3,
  },
  button: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.button,
    lineHeight: LineHeight.button,
    letterSpacing: LetterSpacing.button,
  },
  bodyLg: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.bodyLg,
    lineHeight: LineHeight.bodyLg,
    letterSpacing: LetterSpacing.bodyLg,
  },
  body: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.body,
    lineHeight: LineHeight.body,
    letterSpacing: LetterSpacing.body,
  },
  bodyMedium: {
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.body,
    lineHeight: LineHeight.body,
    letterSpacing: LetterSpacing.body,
  },
  caption: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.caption,
    lineHeight: LineHeight.caption,
    letterSpacing: LetterSpacing.caption,
  },
  overline: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.overline,
    lineHeight: LineHeight.overline,
    letterSpacing: LetterSpacing.overline,
  },
} as const;
