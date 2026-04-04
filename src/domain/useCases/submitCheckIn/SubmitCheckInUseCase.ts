import type { CheckInModel } from '@/domain/models/CheckInModel'
import type { OccupancyLevel } from '@/tokens'

export interface ICheckInRepository {
  submit(checkIn: CheckInModel): Promise<void>
}

export const submitCheckInUseCase = async (
  gymId: string,
  occupancy: OccupancyLevel,
  checkInRepository: ICheckInRepository,
): Promise<void> => {
  await checkInRepository.submit({ gymId, occupancy, timestamp: Date.now() })
}
