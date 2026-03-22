import { fireEvent, render, waitFor } from '@testing-library/react-native'

// TODO: descomentar quando a SignUpScreen estiver implementada
// import { SignUpScreen } from '@/presentation/screens/SignUpScreen'

jest.mock('@/data/repositories/AuthRepository', () => ({
  authRepository: { signUp: jest.fn() },
}))

jest.mock('@/domain/useCases/SignUpUseCase', () => ({
  ...jest.requireActual('@/domain/useCases/SignUpUseCase'),
  signUpUseCase: jest.fn(),
}))

const { signUpUseCase } = require('@/domain/useCases/SignUpUseCase')

describe('SignUpScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all fields and the submit button', () => {
    // TODO: implementar
  })

  it('shows nameError when name is empty on submit', async () => {
    // TODO: implementar
  })

  it('shows emailError when email is invalid on submit', async () => {
    // TODO: implementar
  })

  it('shows passwordError when password is too short', async () => {
    // TODO: implementar
  })

  it('calls signUpUseCase with valid credentials', async () => {
    // TODO: implementar
  })

  it('shows error message when sign up fails', async () => {
    // TODO: implementar
  })
})

void fireEvent
void render
void waitFor
void signUpUseCase
