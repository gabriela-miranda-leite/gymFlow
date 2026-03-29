const ptBR = {
  common: {
    appName: 'GymFlow',
    retry: 'Tentar novamente',
    loading: 'Aguarde',
    showPassword: 'Mostrar senha',
    hidePassword: 'Ocultar senha',
    tabs: {
      map: 'Mapa',
      checkIn: 'Check-in',
      profile: 'Perfil',
    },
  },
  login: {
    title: 'Entrar',
    subtitle: 'Bem-vindo de volta ao GymFlow',
    googleLogin: 'Continuar com Google',
    appleLogin: 'Continuar com Apple',
    orLogin: 'Ou',
    email: 'Email',
    placeholderEmail: 'seu@email.com',
    password: 'Senha',
    placeholderPassword: 'Mínimo 6 caracteres',
    forgotPassword: 'Esqueceu a senha?',
    loginButton: 'Entrar',
    signUpPrompt: 'Não tem uma conta? ',
    signUpLink: 'Criar conta',
  },
  signUp: {
    title: 'Criar conta',
    subtitle: 'Comece a ver a lotação em tempo real',
    googleLogin: 'Continuar com Google',
    appleLogin: 'Continuar com Apple',
    orSignUp: 'Ou',
    name: 'Nome',
    placeholderName: 'Seu nome',
    email: 'Email',
    placeholderEmail: 'seu@email.com',
    password: 'Senha',
    placeholderPassword: 'Mínimo 6 caracteres',
    signUpButton: 'Criar conta',
    loginPrompt: 'Já tem conta? ',
    loginLink: 'Entrar',
  },
  map: {
    placeholder: 'Tela de Mapa',
    open: 'Aberta',
    closed: 'Fechada',
    checkIn: 'Fazer check-in',
    km: 'km',
    locationError: 'Não foi possível obter sua localização.',
    locationPermissionDenied: 'Permissão de localização negada. Habilite nas configurações.',
  },
  checkIn: {
    placeholder: 'Tela de Check-in',
    buttonGroup: {
      options: {
        empty: {
          label: 'Vazio',
          sublabel: 'Equipamentos livres',
        },
        normal: {
          label: 'Normal',
          sublabel: 'Fluxo tranquilo',
        },
        full: {
          label: 'Cheio',
          sublabel: 'Espera em alguns',
        },
        packed: {
          label: 'Lotado',
          sublabel: 'Longa espera',
        },
      },
    },
  },
  profile: {
    placeholder: 'Tela de Perfil',
  },
  errors: {
    generic: 'Algo deu errado. Tente novamente.',
    loginFailed: 'Email ou senha incorretos.',
    signFailed: 'Erro ao criar conta. Tente novamente.',
  },
  validation: {
    nameInvalid: 'Insira um nome',
    emailInvalid: 'Insira um email válido.',
    passwordRequired: 'Digite sua senha.',
    passwordTooShort: 'A senha deve ter pelo menos 6 caracteres.',
  },
} as const

export default ptBR
