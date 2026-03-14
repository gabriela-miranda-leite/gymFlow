# Prompt — Criar novo componente UI

## Contexto do projeto

Componentes vivem em `src/presentation/components/`. Cada um tem sua própria pasta.

### Regras obrigatórias

**Estrutura de pasta**
```
ComponentName/
  ComponentName.styles.ts   ← styled-components (tokens, zero lógica)
  ComponentName.tsx          ← JSX + lógica de apresentação
  ComponentName.test.tsx     ← testes unitários
  ComponentName.stories.tsx  ← Storybook (CSF3)
  index.ts                   ← barrel export
```

**Estilização**
- `styled-components/native` — nunca `StyleSheet.create`
- Todo valor usa token: `Spacing.*`, `Radius.*`, `FontSize.*`, `FontWeight.*`, `theme.*`
- Propriedades CSS padrão (`padding-top`/`bottom`, nunca `padding-vertical`)

**UI burra**
- O componente só renderiza o que recebe via props — nunca busca dados, nunca decide
- Strings sempre via `t('key')` — nunca hardcoded no componente
- Props tipadas com interface exportada

**Tokens disponíveis**
```ts
Spacing.s1=4  s2=8  s3=12  s4=16  s5=20  s6=24  s8=32  s12=48  s14=56
Radius.xs=4  sm=8  md=12  btn=14  lg=16  card=18  xl=24  full=9999
FontSize.display=40  h1=32  h2=24  h3=20  button=18  bodyLg=16  body=14  caption=12
FontWeight.regular='400'  medium='500'  semiBold='600'  bold='700'
Typography.h1 / h2 / h3 / body / bodyLg / caption  (objeto de estilo completo)
theme.bg / text / brand / surface / border / occupancy / tabBar
```

**Acessibilidade** (ESLint `react-native-a11y` valida automaticamente)
- Todo elemento interativo precisa de `accessibilityRole` e `accessibilityLabel`
- Estados dinâmicos via `accessibilityState`

---

## Input

```
Nome: {{ NomeDoComponente }}
Descrição: {{ O que esse componente exibe e qual é sua responsabilidade }}
Props: {{ lista de props com tipos }}
Variantes: {{ ex: size: 'sm' | 'md' | 'lg' | nenhuma }}
Estados: {{ ex: loading, disabled, selected | nenhum }}
```

---

## Output esperado

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
```tsx
// Cobertura mínima:
// - renderiza sem crashar
// - variantes visuais
// - interações (press, change)
// - estados (loading, disabled)
```

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

### `src/presentation/components/index.ts`
Adicionar a exportação do novo componente.

---

## Exemplo

**Input:**
```
Nome: OccupancyBadge
Descrição: Badge colorido que indica o nível de lotação de uma academia
Props: level: OccupancyLevel
Variantes: nenhuma (cor vem do token de ocupação)
Estados: nenhum
```

**Output — `OccupancyBadge.styles.ts`:**
```ts
import styled from 'styled-components/native';
import { FontSize, FontWeight, Radius, Spacing } from '@/tokens';

interface ContainerProps { bgColor: string }
interface LabelProps { textColor: string }

export const Container = styled.View<ContainerProps>`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: ${Radius.full}px;
  padding-left: ${Spacing.s3}px;
  padding-right: ${Spacing.s3}px;
  padding-top: ${Spacing.s1}px;
  padding-bottom: ${Spacing.s1}px;
`;

export const BadgeLabel = styled.Text<LabelProps>`
  color: ${({ textColor }) => textColor};
  font-size: ${FontSize.caption}px;
  font-weight: ${FontWeight.semiBold};
`;
```

**Output — `OccupancyBadge.tsx`:**
```tsx
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/shared/i18n';
import type { OccupancyLevel } from '@/tokens';

import { BadgeLabel, Container } from './OccupancyBadge.styles';

export interface OccupancyBadgeProps {
  level: OccupancyLevel;
}

export function OccupancyBadge({ level }: OccupancyBadgeProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const colors = theme.occupancy[level];

  return (
    <Container
      bgColor={colors.bg}
      accessibilityRole="text"
      accessibilityLabel={t(`occupancy.${level}`)}
    >
      <BadgeLabel textColor={colors.text}>{t(`occupancy.${level}`)}</BadgeLabel>
    </Container>
  );
}
```
