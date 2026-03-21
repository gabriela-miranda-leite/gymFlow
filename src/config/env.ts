import Constants from 'expo-constants'

interface AppConfig {
  apiUrl: string
  googleMapsKey: string
  firebaseConfig: string
}

const extra = Constants.expoConfig?.extra as Partial<AppConfig> | undefined

const apiUrl = extra?.apiUrl ?? ''
const googleMapsKey = extra?.googleMapsKey ?? ''
const firebaseConfig = extra?.firebaseConfig ?? ''

if (__DEV__) {
  if (!apiUrl) {
    // eslint-disable-next-line no-console
    console.warn('[Config] API_URL não definida. Requisições de rede vão falhar.')
  }
}

export const Config: AppConfig = {
  apiUrl,
  googleMapsKey,
  firebaseConfig,
}
