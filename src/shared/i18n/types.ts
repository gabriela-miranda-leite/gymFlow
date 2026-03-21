import type ptBR from './locales/pt-BR'

export type I18nResources = {
  translation: typeof ptBR
}

declare module 'i18next' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface CustomTypeOptions extends I18nResources {}
}
