import type { UserModel } from '@/domain/models/UserModel'

export interface LoginResult {
  user: UserModel
  token: string
}
