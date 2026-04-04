import type { OccupancyLevel } from '@/tokens'

export interface GymCoordinates {
  latitude: number
  longitude: number
}

export interface HourlyFlowEntry {
  hour: number
  occupancyPercent: number
}

export interface GymModel {
  id: string
  name: string
  address: string
  rating: number
  reviewCount: number
  distanceMeters: number
  openingHours: string
  isOpen: boolean
  tags: string[]
  coordinates: GymCoordinates
  occupancy: OccupancyLevel
  occupancyPercent: number
  isFavorite: boolean
  lastUpdatedAt: string
  weeklyFlow: Record<number, HourlyFlowEntry[]>
}
