import { act, renderHook } from '@testing-library/react-native'

// TODO: descomentar quando o ViewModel estiver implementado
// import { useSignUpViewModel } from '@/presentation/viewModels/SignUpViewModel'

jest.mock('@/data/repositories/AuthRepository', () => ({
  authRepository: { signUp: jest.fn() },
}))

jest.mock('@/domain/useCases/SignUpUseCase', () => ({
  ...jest.requireActual('@/domain/useCases/SignUpUseCase'),
  signUpUseCase: jest.fn(),
}))

const { signUpUseCase } = require('@/domain/useCases/SignUpUseCase')

describe('useSignUpViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('starts with empty fields and no errors', () => {
      // TODO: implementar
    })
  })

  describe('onNameChange', () => {
    it('updates name value', () => {
      // TODO: implementar
    })
  })

  describe('onEmailChange', () => {
    it('updates email value', () => {
      // TODO: implementar
    })
  })

  describe('onPasswordChange', () => {
    it('updates password value', () => {
      // TODO: implementar
    })
  })

  describe('onTogglePasswordVisibility', () => {
    it('toggles isPasswordVisible', () => {
      // TODO: implementar
    })
  })

  describe('onSubmit — validação', () => {
    it('com campos vazios seta erros e não chama signUpUseCase', async () => {
      // TODO: implementar
    })

    it('com email inválido seta emailError', async () => {
      // TODO: implementar
    })

    it('com senha curta seta passwordError', async () => {
      // TODO: implementar
    })
  })

  describe('onSubmit — chamada à API', () => {
    it('com dados válidos chama signUpUseCase com os dados corretos', async () => {
      // TODO: implementar
    })

    it('quando a API falha seta erro com mensagem adequada', async () => {
      // TODO: implementar
    })

    it('isLoading é false após a chamada', async () => {
      // TODO: implementar
    })
  })
})

void act
void renderHook
void signUpUseCase
