import type { CheckInModel } from '@/domain/models/CheckInModel'
import type { ICheckInRepository } from '@/domain/useCases/submitCheckIn/SubmitCheckInUseCase'

export const checkInRepository: ICheckInRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async submit(checkIn: CheckInModel): Promise<void> {
    // todo: substituir por chamada real à API
    await new Promise((resolve) => setTimeout(resolve, 500))
  },
}
