import Constants from 'expo-constants';

interface AppConfig {
  apiUrl: string;
  googleMapsKey: string;
  firebaseConfig: string;
}

const extra = Constants.expoConfig?.extra as Partial<AppConfig> | undefined;

export const Config: AppConfig = {
  apiUrl: extra?.apiUrl ?? '',
  googleMapsKey: extra?.googleMapsKey ?? '',
  firebaseConfig: extra?.firebaseConfig ?? '',
};
