import AsyncStorage from '@react-native-async-storage/async-storage'

const LAST_CHECKIN_KEY = '@gymflow:last_checkin_timestamp'

export interface ICooldownRepository {
  getLastCheckInTimestamp(): Promise<number | null>
  saveLastCheckInTimestamp(timestamp: number): Promise<void>
}

export const checkInCooldownRepository: ICooldownRepository = {
  async getLastCheckInTimestamp(): Promise<number | null> {
    const value = await AsyncStorage.getItem(LAST_CHECKIN_KEY)
    return value !== null ? parseInt(value, 10) : null
  },

  async saveLastCheckInTimestamp(timestamp: number): Promise<void> {
    await AsyncStorage.setItem(LAST_CHECKIN_KEY, String(timestamp))
  },
}
