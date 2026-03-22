import { useSignUpViewModel } from '@/presentation/viewModels/SignUpViewModel'
import { tk, useTranslation } from '@/shared/i18n'

// TODO: implementar a SignUpScreen
// Estrutura esperada (de cima para baixo):
//   <ScreenContainer>
//     <Header>       ← Logo (Flat) + título + subtítulo
//     <SocialButtons> ← Google + Apple
//     <Divider label="ou" />
//     <FormFields>   ← Nome, Email, Senha (com toggle)
//     <Button "Criar conta" />
//     <Footer>       ← "Já tem conta?" + link "Entrar"
//   </ScreenContainer>
//
// Todos os textos via t(tk.signUp.*)
// Cada campo com errorMessage vindo do ViewModel
// testID em cada input e botão (para Maestro e2e)

export function SignUpScreen() {
  const { t } = useTranslation()
  const vm = useSignUpViewModel()

  // TODO: renderizar a tela
  void t
  void vm
  void tk

  return null
}
