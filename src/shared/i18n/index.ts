import { getLocales } from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

import '@/shared/i18n/types'

import enUS from '@/shared/i18n/locales/en-US'
import ptBR from '@/shared/i18n/locales/pt-BR'

const deviceLocale = getLocales()[0]?.languageTag ?? 'pt-BR'

i18n.use(initReactI18next).init({
  resources: {
    'pt-BR': { translation: ptBR },
    'en-US': { translation: enUS },
  },
  lng: deviceLocale,
  fallbackLng: 'pt-BR',
  interpolation: { escapeValue: false },
})

export { useTranslation }
export const changeLanguage = (lang: string) => i18n.changeLanguage(lang)
export default i18n
