# Prompt — Criar nova tela

## Contexto do projeto

Você está gerando código para o app **GymFlow** (Expo 55 · React Native 0.83 · TypeScript 5.9 strict).

### Arquitetura — Clean Architecture

```
domain/models      → entidade pura (zero deps de UI/infra)
domain/useCases    → lógica de negócio
data/repositories  → contrato de acesso a dados
data/services      → implementação (API, AsyncStorage)
presentation/
  screens/         → tela: só renderiza, nunca decide
  components/      → componentes reutilizáveis
  uiModels/        → tipo que a tela consome
  viewModels/      → Context/hook que faz domain → uiModel → tela
shared/i18n/       → strings (nunca hardcode)
shared/navigation/ → tipos e RootNavigator
store/             → Zustand (estado global persistido)
```

### Regras obrigatórias

**Estilização**
- `styled-components/native` — nunca `StyleSheet.create`
- Todo valor usa token: `Spacing.*`, `Radius.*`, `FontSize.*`, `FontWeight.*`, `Typography.*`, `theme.*`
- Estilos em `ScreenName.styles.ts` separado
- Propriedades CSS padrão (`padding-top`/`padding-bottom`, nunca `padding-vertical`)

**UI burra**
- A tela recebe dados via props ou hook — nunca busca, nunca decide
- Strings sempre via `t('namespace.key')` importado de `@/shared/i18n`
- Lógica de negócio fica no viewModel ou useCase

**Imports**
- Alias `@/` → `src/`
- Ordem: externos → relativos (./) → internos (@/)
- Newline entre grupos

### Tokens disponíveis

```ts
// Espaçamento
Spacing.s1=4  s2=8  s3=12  s4=16  s5=20  s6=24  s8=32  s12=48  s14=56

// Raio
Radius.xs=4  sm=8  md=12  btn=14  lg=16  card=18  xl=24  full=9999

// Tipografia
FontSize.display=40  h1=32  h2=24  h3=20  button=18  bodyLg=16  body=14  caption=12
FontWeight.regular='400'  medium='500'  semiBold='600'  bold='700'
Typography.h1 / h2 / h3 / body / bodyLg / bodyMedium / caption / overline  (objeto de estilo completo)

// Tema (via useTheme)
theme.bg.primary / secondary / tertiary
theme.text.primary / secondary / tertiary / disabled
theme.brand.primary / onPrimary
theme.surface.primary / secondary
theme.border.default / subtle / strong
```

### Navegação

```ts
// Registrar em src/shared/navigation/types.ts
export type RootStackParamList = {
  NovaScreen: { paramExemplo: string };
};

// Tipar a tela
import type { RootStackScreenProps } from '@/shared/navigation/types';
export function NovaScreen({ route, navigation }: RootStackScreenProps<'NovaScreen'>) {}
```

---

## Input

Descreva a tela a ser criada:

```
Nome: {{ NomeDaTela }}
Descrição: {{ O que essa tela exibe e qual ação o usuário pode fazer }}
Parâmetros de navegação: {{ ex: gymId: string | nenhum }}
Dados exibidos: {{ lista de campos/informações }}
Ações do usuário: {{ botões, formulários, gestos }}
```

---

## Output esperado

Gere os seguintes arquivos:

1. **`src/presentation/screens/{{ NomeDaTela }}Screen.tsx`**
   - Importa dados do viewModel (hook)
   - Usa `AppText`, `Button` de `@/presentation/components`
   - Usa `t()` para todas as strings
   - Sem lógica de negócio

2. **`src/presentation/screens/{{ NomeDaTela }}Screen.styles.ts`**
   - Todos os styled-components da tela
   - Apenas tokens, zero valores hardcoded

3. **`src/presentation/viewModels/use{{ NomeDaTela }}ViewModel.ts`**
   - Hook que conecta domain → uiModel → tela
   - Expõe apenas o que a tela precisa renderizar

4. **`src/presentation/uiModels/{{ NomeDaTela }}UiModel.ts`**
   - Interface dos dados que a tela consome

5. **`src/shared/i18n/locales/pt-BR.ts`** e **`en-US.ts`** — novas keys necessárias

6. **`src/shared/navigation/types.ts`** — adicionar entrada se necessário

---

## Exemplo

**Input:**
```
Nome: GymDetail
Descrição: Exibe detalhes de uma academia (nome, endereço, lotação atual)
Parâmetros: gymId: string
Dados exibidos: nome, endereço, nível de lotação (badge colorido)
Ações: botão "Fazer check-in"
```

**Output — `GymDetailScreen.tsx`:**
```tsx
import { View } from 'react-native';

import { AppText, Button } from '@/presentation/components';
import { useTranslation } from '@/shared/i18n';
import type { RootStackScreenProps } from '@/shared/navigation/types';

import { useGymDetailViewModel } from '../viewModels/useGymDetailViewModel';

import { Container, OccupancyBadge } from './GymDetailScreen.styles';

export function GymDetailScreen({ route }: RootStackScreenProps<'GymDetail'>) {
  const { gymId } = route.params;
  const { gym, onCheckin } = useGymDetailViewModel(gymId);
  const { t } = useTranslation();

  if (!gym) return null;

  return (
    <Container>
      <AppText variant="h1">{gym.name}</AppText>
      <AppText variant="body">{gym.address}</AppText>
      <OccupancyBadge level={gym.occupancy} />
      <Button label={t('gymDetail.checkin')} onPress={onCheckin} />
    </Container>
  );
}
```
