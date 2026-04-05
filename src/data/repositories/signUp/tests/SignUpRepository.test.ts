import { signUpRepository } from '@/data/repositories/signUp/SignUpRepository'

describe('signUpRepository', () => {
  describe('signUp', () => {
    it('returns user with the provided email', async () => {
      const result = await signUpRepository.signUp({
        name: 'Gabriela',
        email: 'gabriela@email.com',
        password: '123456',
      })

      expect(result.user.email).toBe('gabriela@email.com')
    })

    it('returns a token', async () => {
      const result = await signUpRepository.signUp({
        name: 'Gabriela',
        email: 'gabriela@email.com',
        password: '123456',
      })

      expect(result.token).toBeTruthy()
    })

    it('returns a user with id and name', async () => {
      const result = await signUpRepository.signUp({
        name: 'Gabriela',
        email: 'gabriela@email.com',
        password: '123456',
      })

      expect(result.user.id).toBeTruthy()
      expect(result.user.name).toBeTruthy()
    })
  })
})
