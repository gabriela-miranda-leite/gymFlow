export const getLocales = () => [
  {
    languageTag: 'pt-BR',
    languageCode: 'pt',
    regionCode: 'BR',
    textDirection: 'ltr' as const,
    digitGroupingSeparator: '.',
    decimalSeparator: ',',
    measurementSystem: 'metric' as const,
    currencyCode: 'BRL',
    currencySymbol: 'R$',
    temperatureUnit: 'celsius' as const,
  },
];

export const getCalendars = () => [
  {
    calendar: 'gregorian',
    timeZone: 'America/Sao_Paulo',
    uses24hourClock: true,
    firstWeekday: 1,
  },
];
