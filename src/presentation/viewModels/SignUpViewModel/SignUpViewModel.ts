import type { SignUpUiModel } from '@/presentation/uiModels/SignUpUiModel'

// TODO: implementar o ViewModel de cadastro
// - Usar useForm + zodResolver(signUpSchema)
// - Gerenciar isLoading e isPasswordVisible com useState
// - onSubmit: chamar signUpUseCase, tratar erros com setError
// - Mapear errors do Zod para mensagens traduzidas via t(tk...)
// - Retornar SignUpUiModel
export const useSignUpViewModel = (): SignUpUiModel => {
  throw new Error('Not implemented')
}
