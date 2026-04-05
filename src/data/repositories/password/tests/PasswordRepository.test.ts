import { passwordRepository } from '@/data/repositories/password/PasswordRepository'

describe('passwordRepository', () => {
  it('resolves without errors', async () => {
    await expect(
      passwordRepository.updatePassword('currentPass', 'newPass'),
    ).resolves.toBeUndefined()
  })
})
