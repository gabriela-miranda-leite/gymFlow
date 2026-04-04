import type { GymModel } from '@/domain/models/GymModel'

export interface IGymByIdRepository {
  getById(id: string): Promise<GymModel | undefined>
}

export const getGymByIdUseCase = async (
  id: string,
  repository: IGymByIdRepository,
): Promise<GymModel | undefined> => {
  return repository.getById(id)
}
