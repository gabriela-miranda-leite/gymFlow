const enUS = {
  common: {
    appName: 'GymFlow',
    retry: 'Try again',
    loading: 'Please wait',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    tabs: {
      home: 'Gyms',
      profile: 'Profile',
    },
  },
  login: {
    title: 'Sign in',
    subtitle: 'Welcome back to GymFlow',
    googleLogin: 'Continue with Google',
    appleLogin: 'Continue with Apple',
    orLogin: 'Or',
    email: 'Email',
    placeholderEmail: 'your@email.com',
    password: 'Password',
    forgotPassword: 'Forgot your password?',
    loginButton: 'Sign in',
    signUpPrompt: "Don't have an account? ",
    signUpLink: 'Create account',
  },
  errors: {
    generic: 'Something went wrong. Please try again.',
    loginFailed: 'Incorrect email or password.',
  },
} as const

export default enUS
