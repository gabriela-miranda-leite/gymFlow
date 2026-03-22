import type { UserModel } from '@/domain/models/UserModel'

export interface SignUpResult {
  user: UserModel
  token: string
}
