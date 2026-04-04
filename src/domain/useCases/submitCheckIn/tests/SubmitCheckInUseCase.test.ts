import type { ICheckInRepository } from '@/domain/useCases/submitCheckIn/SubmitCheckInUseCase'
import { submitCheckInUseCase } from '@/domain/useCases/submitCheckIn/SubmitCheckInUseCase'

const mockRepository: ICheckInRepository = {
  submit: jest.fn(),
}

describe('submitCheckInUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls repository.submit with correct gymId and occupancy', async () => {
    await submitCheckInUseCase('gym-1', 'empty', mockRepository)

    expect(mockRepository.submit).toHaveBeenCalledWith(
      expect.objectContaining({ gymId: 'gym-1', occupancy: 'empty' }),
    )
  })

  it('includes a timestamp in the submitted check-in', async () => {
    const before = Date.now()
    await submitCheckInUseCase('gym-2', 'moderate', mockRepository)
    const after = Date.now()

    const [call] = (mockRepository.submit as jest.Mock).mock.calls
    expect(call[0].timestamp).toBeGreaterThanOrEqual(before)
    expect(call[0].timestamp).toBeLessThanOrEqual(after)
  })

  it('propagates repository errors', async () => {
    ;(mockRepository.submit as jest.Mock).mockRejectedValueOnce(new Error('network error'))

    await expect(submitCheckInUseCase('gym-1', 'busy', mockRepository)).rejects.toThrow(
      'network error',
    )
  })
})
