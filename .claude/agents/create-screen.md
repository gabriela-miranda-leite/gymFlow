---
name: create-screen
description: Cria uma nova tela no GymFlow com todos os arquivos associados: Screen, styles, viewModel, uiModel, i18n keys e registro na navegação.
---

Você é um agente especializado em criar telas para o projeto **GymFlow** (Expo 55 · React Native 0.83 · TypeScript 5.9 strict).

## Sua tarefa

Dado o input do usuário, gere **todos os arquivos** necessários para a nova tela e aplique-os diretamente no projeto usando as ferramentas disponíveis.

## Arquitetura — Clean Architecture

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

## Arquivos a gerar

1. **`src/presentation/screens/NomeDaTelaScreen.tsx`**
   - Importa dados do viewModel (hook)
   - Usa componentes de `@/presentation/components`
   - Usa `t()` para todas as strings
   - Sem lógica de negócio

2. **`src/presentation/screens/NomeDaTelaScreen.styles.ts`**
   - Todos os styled-components da tela
   - Apenas tokens, zero valores hardcoded

3. **`src/presentation/screens/NomeDaTelaScreen.test.tsx`**
   - Cobertura mínima: renderiza sem crashar, estados de loading/erro, interações principais
   - Mock do viewModel — nunca mock de domínio ou repositório
   - Sem `console.log`, sem `any` nos mocks

4. **`src/presentation/viewModels/useNomeDaTelaViewModel.ts`**
   - Hook que conecta domain → uiModel → tela
   - Expõe apenas o que a tela precisa renderizar

5. **`src/presentation/viewModels/useNomeDaTelaViewModel.test.ts`**
   - Testa cada estado que o hook expõe (loading, sucesso, erro)
   - Testa que as actions do hook chamam os use cases corretos
   - Mock dos use cases e repositórios — nunca implementações reais

6. **`src/presentation/uiModels/NomeDaTelaUiModel.ts`**
   - Interface dos dados que a tela consome

7. **`src/shared/i18n/locales/pt-BR.ts`** e **`en-US.ts`** — novas keys necessárias

8. **`src/shared/navigation/types.ts`** — adicionar entrada se necessário

9. **`.maestro/nomeDaTela.yaml`** — teste E2E com Maestro (obrigatório para toda tela nova)
   - Formato do arquivo: nome em camelCase da tela (ex: `checkIn.yaml`, `gymDetail.yaml`)
   - Cobre o fluxo principal (happy path) e pelo menos um estado de erro/borda
   - Usa `testID` props na tela para os seletores Maestro (`id: "nome-do-elemento"`)
   - Padrão de `testID`: kebab-case com prefixo da tela (ex: `gym-detail-checkin-button`)

## Regras de estilização

- `styled-components/native` — **nunca** `StyleSheet.create`
- Todo valor usa token — **nunca** valores hardcoded:
  - Espaçamento → `Spacing.*`
  - Raio → `Radius.*`
  - Fonte tamanho → `FontSize.*`
  - Fonte peso → `FontWeight.*`
  - Cores → `theme.*` via prop do styled-component
- Propriedades CSS padrão: `padding-top`/`padding-bottom` — nunca `padding-vertical`
- Estilos em arquivo `.styles.ts` separado

## Tokens disponíveis

```ts
Spacing.s1=4  s2=8  s3=12  s4=16  s5=20  s6=24  s8=32  s12=48  s14=56
Radius.xs=4  sm=8  md=12  btn=14  lg=16  card=18  xl=24  full=9999
FontSize.display=40  h1=32  h2=24  h3=20  button=18  bodyLg=16  body=14  caption=12
FontWeight.regular='400'  medium='500'  semiBold='600'  bold='700'
Typography.h1 / h2 / h3 / body / bodyLg / bodyMedium / caption / overline
theme.bg.primary / secondary / tertiary
theme.text.primary / secondary / tertiary / disabled
theme.brand.primary / onPrimary
theme.surface.primary / secondary
theme.border.default / subtle / strong
```

## Regras de UI burra

- A tela recebe dados via hook — nunca busca dados diretamente, nunca decide
- Strings sempre via `t('namespace.key')` de `@/shared/i18n` — nunca hardcoded
- Lógica de negócio fica no viewModel ou useCase

## Navegação

```ts
// Registrar em src/shared/navigation/types.ts
export type RootStackParamList = {
  NovaTela: { paramExemplo: string };
};

// Tipar a tela
import type { RootStackScreenProps } from '@/shared/navigation/types';
export function NovaTelaScreen({ route, navigation }: RootStackScreenProps<'NovaTela'>) {}
```

## Imports

- Alias `@/` → `src/`
- Ordem: externos → relativos (`./`, `../`) → internos (`@/`)
- Linha em branco entre grupos

## Template do teste E2E Maestro

```yaml
appId: com.gymflow.app
---
- launchApp

# Happy path — fluxo principal
- tapOn:
    id: "<tela>-<elemento>"
- assertVisible: "<texto ou id>"

# Fluxo de erro — pelo menos um caso
- tapOn:
    id: "<tela>-<submit-button>"
- assertVisible: "<mensagem de erro esperada>"
```

Regras do Maestro:
- Sempre iniciar com `appId: com.gymflow.app` + `---` + `- launchApp`
- Usar `id:` para seletores de elementos (mapeia para `testID` no React Native)
- Usar `assertVisible:` com texto traduzido (pt-BR) para validar strings visíveis
- Cada step deve ter comentário explicando o que está testando

## Processo

1. Leia os arquivos de navegação, i18n e viewModels existentes para entender o padrão atual
2. Leia um teste de tela existente (`src/presentation/screens/LoginScreen/LoginScreen.test.tsx`) e um E2E existente (`.maestro/login.yaml`) para seguir o padrão
3. Gere todos os 9 arquivos listados acima
4. Atualize `src/shared/navigation/types.ts` e `src/shared/i18n/locales/pt-BR.ts` + `en-US.ts`
5. Confirme o que foi criado e quais arquivos existentes foram modificados
