# Storybook — GymFlow

O Storybook roda **dentro do simulador/emulador**, usando o mesmo Expo que o app normal. A variável `STORYBOOK=true` faz o `index.ts` carregar o Storybook em vez do app.

---

## Como rodar

### 1. Gerar o arquivo de stories (obrigatório na primeira vez e ao criar novas stories)

```bash
npm run storybook:generate
```

Isso lê `src/**/*.stories.?(ts|tsx)` e gera `.rnstorybook/storybook.requires.ts` automaticamente. O arquivo é ignorado pelo git — rode sempre que adicionar ou remover uma story.

### 2. Iniciar o Storybook

```bash
npm run storybook
```

Equivale a `STORYBOOK=true expo start`. Em seguida, pressione `i` (iOS) ou `a` (Android) no terminal para abrir o simulador.

### 3. Navegar pelas stories

No simulador, a interface do Storybook aparece no lugar do app. Use o painel lateral para navegar entre componentes e stories. O addon **Controls** permite alterar props em tempo real.

---

## Estrutura de uma story

Crie o arquivo `ComponentName.stories.tsx` na mesma pasta do componente:

```
src/presentation/components/
  GymCard.tsx
  GymCard.stories.tsx        ← story ao lado do componente
```

### Template

```tsx
import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';

import { GymCard } from './GymCard';

const meta: Meta<typeof GymCard> = {
  title: 'Components/GymCard',
  component: GymCard,
  argTypes: {
    occupancy: {
      control: 'select',
      options: ['empty', 'moderate', 'busy', 'packed'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof GymCard>;

export const Default: Story = {
  args: {
    name: 'Academia Central',
    address: 'Rua das Flores, 123',
    occupancy: 'moderate',
  },
};

export const Lotada: Story = {
  args: {
    name: 'Academia Norte',
    address: 'Av. Principal, 456',
    occupancy: 'packed',
  },
};
```

### Convenção de título (`title`)

```
'Components/NomeDoComponente'   → componentes de src/presentation/components/
'Screens/NomeDaTela'            → telas de src/presentation/screens/
'Tokens/Typography'             → stories de tokens/design system
```

---

## Tema no Storybook

O `ThemeProvider` já envolve todas as stories automaticamente via o decorator em [.rnstorybook/preview.tsx](../.rnstorybook/preview.tsx). Para alternar entre light e dark, adicione um controle de modo na story:

```tsx
const meta: Meta<typeof GymCard> = {
  title: 'Components/GymCard',
  component: GymCard,
  decorators: [
    (Story, context) => (
      <ThemeProvider initialMode={context.args.themeMode ?? 'system'}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    themeMode: {
      control: 'select',
      options: ['system', 'light', 'dark'],
    },
  },
};
```

---

## Fluxo ao criar um componente novo

1. Crie `ComponentName.tsx`
2. Crie `ComponentName.stories.tsx` ao lado
3. Rode `npm run storybook:generate`
4. Rode `npm run storybook` e valide o componente no simulador
5. Teste light e dark antes de abrir o PR

---

## Arquivos relevantes

| Arquivo | Descrição |
|---------|-----------|
| [.rnstorybook/main.ts](../.rnstorybook/main.ts) | Configuração principal — glob de stories e addons |
| [.rnstorybook/preview.tsx](../.rnstorybook/preview.tsx) | Decorators globais (ThemeProvider) |
| [.rnstorybook/index.ts](../.rnstorybook/index.ts) | Entry point do Storybook |
| `.rnstorybook/storybook.requires.ts` | Auto-gerado por `storybook:generate` — não commitar |
| [index.ts](../index.ts) | Condicional `STORYBOOK=true` que carrega o Storybook |
