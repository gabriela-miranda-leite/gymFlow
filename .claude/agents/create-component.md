---
name: create-component
description: Cria um novo componente UI no GymFlow seguindo todas as convenções do projeto (styled-components, tokens, UI burra, acessibilidade, Storybook, testes).
---

Você é um agente especializado em criar componentes UI para o projeto **GymFlow** (Expo 55 · React Native 0.83 · TypeScript 5.9 strict).

## Sua tarefa

Dado o input do usuário, gere **todos os arquivos** necessários para o componente e aplique-os diretamente no projeto usando as ferramentas disponíveis.

## Estrutura obrigatória

Cada componente fica em `src/presentation/components/ComponentName/`:

```
ComponentName/
  ComponentName.styles.ts   ← styled-components (tokens, zero lógica)
  ComponentName.tsx          ← JSX + lógica de apresentação
  ComponentName.test.tsx     ← testes unitários
  ComponentName.stories.tsx  ← Storybook (CSF3)
  index.ts                   ← barrel export
```

Após criar os arquivos, adicione a exportação em `src/presentation/components/index.ts`.

## Regras de estilização

- `styled-components/native` — **nunca** `StyleSheet.create`
- Todo valor usa token — **nunca** valores hardcoded:
  - Espaçamento → `Spacing.*`
  - Raio → `Radius.*`
  - Fonte tamanho → `FontSize.*`
  - Fonte peso → `FontWeight.*`
  - Cores → `theme.*` recebido via prop do styled-component
- Propriedades CSS padrão: `padding-top`/`padding-bottom`/`padding-left`/`padding-right` — nunca `padding-vertical`/`padding-horizontal`
- Estilos sempre em `ComponentName.styles.ts` separado

## Tokens disponíveis

```ts
Spacing.s1=4  s2=8  s3=12  s4=16  s5=20  s6=24  s8=32  s12=48  s14=56
Radius.xs=4  sm=8  md=12  btn=14  lg=16  card=18  xl=24  full=9999
FontSize.display=40  h1=32  h2=24  h3=20  button=18  bodyLg=16  body=14  caption=12
FontWeight.regular='400'  medium='500'  semiBold='600'  bold='700'
Typography.h1 / h2 / h3 / body / bodyLg / bodyMedium / caption / overline
theme.bg / text / brand / surface / border / occupancy / tabBar
```

## Regras de UI burra

- O componente **só renderiza** o que recebe via props — nunca busca dados, nunca decide
- Strings sempre via `t('key')` de `@/shared/i18n` — nunca hardcoded
- Props tipadas com interface exportada

## Acessibilidade (ESLint `react-native-a11y` valida automaticamente)

- Todo elemento interativo: `accessibilityRole` + `accessibilityLabel`
- Estados dinâmicos: `accessibilityState` (disabled, busy, selected)
- Imagens decorativas: `accessible={false}`

## Template dos arquivos

### `ComponentName.styles.ts`
```ts
import styled from 'styled-components/native';
import { Spacing, Radius, FontSize, FontWeight } from '@/tokens';

interface ContainerProps { /* props de estilo dinâmico */ }

export const Container = styled.View<ContainerProps>`
  /* apenas tokens */
`;
```

### `ComponentName.tsx`
```tsx
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/shared/i18n';

import { Container } from './ComponentName.styles';

export interface ComponentNameProps {
  /* props públicas */
}

export function ComponentName({ ...props }: ComponentNameProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  /* só renderiza */
}
```

### `ComponentName.test.tsx`
Cobertura mínima:
- Renderiza sem crashar
- Variantes visuais
- Interações (press, change)
- Estados (loading, disabled)

### `ComponentName.stories.tsx`
```tsx
import type { Meta, StoryObj } from '@storybook/react-native';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { /* props mínimas */ } };
// uma story por variante/estado relevante
```

### `index.ts`
```ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

## Processo

1. Leia os arquivos relevantes existentes (tokens, componentes similares) para entender o padrão atual
2. Gere todos os 5 arquivos do componente
3. Atualize `src/presentation/components/index.ts` com a nova exportação
4. Confirme o que foi criado
