import type { GymCoordinates, GymModel } from '@/domain/models/GymModel'

export interface IGymRepository {
  getNearby(coordinates?: GymCoordinates): Promise<GymModel[]>
}

export const getNearbyGymsUseCase = async (
  coordinates: GymCoordinates,
  gymRepository: IGymRepository,
): Promise<GymModel[]> => {
  return gymRepository.getNearby(coordinates)
}
