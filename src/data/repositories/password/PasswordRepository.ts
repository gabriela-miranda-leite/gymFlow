export interface IPasswordRepository {
  updatePassword(currentPassword: string, newPassword: string): Promise<void>
}

const passwordRepository: IPasswordRepository = {
  updatePassword: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  },
}

export { passwordRepository }
