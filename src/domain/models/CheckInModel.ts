import type { OccupancyLevel } from '@/tokens'

export interface CheckInModel {
  gymId: string
  occupancy: OccupancyLevel
  timestamp: number
}
