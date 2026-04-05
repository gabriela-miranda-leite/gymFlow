import { authRepository } from '@/data/repositories/auth/AuthRepository'

describe('authRepository', () => {
  describe('login', () => {
    it('returns user with the provided email', async () => {
      const result = await authRepository.login({ email: 'test@email.com', password: '123456' })

      expect(result.user.email).toBe('test@email.com')
    })

    it('returns a token', async () => {
      const result = await authRepository.login({ email: 'test@email.com', password: '123456' })

      expect(result.token).toBeTruthy()
    })

    it('returns a user with id and name', async () => {
      const result = await authRepository.login({ email: 'test@email.com', password: '123456' })

      expect(result.user.id).toBeTruthy()
      expect(result.user.name).toBeTruthy()
    })
  })
})
