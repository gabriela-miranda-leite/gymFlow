# GymFlow — guia do projeto

## Stack

- Expo 55 · React Native 0.83 · TypeScript 5.9 (strict)
- Estado: Zustand (stores globais) + Context + hooks
- Dados assíncronos: TanStack Query (cache, loading, error states)
- Navegação: React Navigation (native-stack + bottom-tabs)
- Alias `@/` → `src/`
- Node via nvm: `export PATH="/Users/gabriela/.nvm/versions/node/v24.14.0/bin:$PATH"`

---

## Arquitetura — Clean Architecture

```
src/
  domain/               # Regras de negócio puras (zero deps de UI ou infra)
    models/             # Entidades de domínio (WorkoutModel, ExerciseModel…)
    useCases/           # Casos de uso (StartWorkoutUseCase…)

  presentation/         # Camada de UI — renderiza, nunca decide
    screens/            # Telas (WorkoutScreen.tsx)
    components/         # Componentes reutilizáveis
    uiModels/           # Tipos que as telas consomem (WorkoutUiModel.ts)
    viewModels/         # Context + hooks: fazem domain → uiModel → tela

  data/                 # Camada de infraestrutura
    repositories/       # Abstrações de acesso a dados (WorkoutRepository.ts)
    services/           # Implementações externas (API, AsyncStorage…)

  shared/               # Utilitários transversais
    hooks/              # Hooks genéricos (useDebounce.ts)
    utils/              # Funções puras
    types/              # Tipos TypeScript compartilhados
    constants/          # Constantes globais
    navigation/         # Configuração do React Navigation
    assets/             # Assets estáticos
    i18n/               # Internacionalização
```

### Regras de camada

- `domain/` **nunca** importa de `presentation/` ou `data/`
- Regra de negócio **só existe** em `domain/` — a UI não sabe o "porquê" do que exibe
- Screens importam apenas de `presentation/uiModels/` — nunca de `domain/` diretamente
- `viewModels/` é a única ponte entre domain e UI
- `data/` só é acessado via `repositories/`

### Fluxo de dados

```
domain/models → useCase → viewModel (Context/hook) → uiModel → screen
```

---

## Naming conventions

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Screen | `PascalCase` + sufixo `Screen` | `WorkoutScreen.tsx` |
| Domain model | `PascalCase` + sufixo `Model` | `WorkoutModel.ts` |
| UI model | `PascalCase` + sufixo `UiModel` | `WorkoutUiModel.ts` |
| ViewModel | `PascalCase` + sufixo `ViewModel` | `WorkoutViewModel.tsx` |
| Use case | `PascalCase` + sufixo `UseCase` | `StartWorkoutUseCase.ts` |
| Repository | `PascalCase` + sufixo `Repository` | `WorkoutRepository.ts` |
| Hook | `camelCase` com prefixo `use` | `useWorkout.ts` |
| Componente | `PascalCase` | `ExerciseCard.tsx` |

---

## Branches

```
feat/GYM-<número>    nova funcionalidade
fix/GYM-<número>     correção de bug
chore/GYM-<número>   configuração, tooling, refactor sem impacto funcional
```

Exemplos: `feat/GYM-2`, `fix/GYM-15`, `chore/GYM-1`

---

## Commits

- Padrão: **Conventional Commits** (Husky valida automaticamente)
- Idioma: **inglês** — exceto textos exibidos no aplicativo
- Formato: `tipo(escopo opcional): descrição`

```
chore: atualizar configuração do babel
feat: adicionar tela de criação de treino
fix: corrigir cálculo de carga máxima
```

Tipos aceitos: `feat` · `fix` · `chore` · `docs` · `refactor` · `test` · `style`

---

## Scripts

```bash
npm run lint          # ESLint em src/
npm run format        # Prettier (write)
npm run format:check  # Prettier (check)
npx expo start        # Iniciar app
```

---

## Estilização — regras obrigatórias

- **Styled-components** (`styled-components/native`) é o único mecanismo de estilo — nunca usar `StyleSheet.create`
- **Todo valor de estilo deve usar tokens** de `src/tokens/` — nunca valores hardcoded:
  - Espaçamento → `Spacing.*` (ex: `Spacing.s4`)
  - Raio de borda → `Radius.*` (ex: `Radius.btn`)
  - Cores → via `theme.*` recebido por prop (ex: `${({ bgColor }) => bgColor}`)
  - Tipografia → `FontSize.*`, `FontWeight.*`, `FontFamily.*` ou preset `Typography.*`
  - Sombras → `Shadows.*`
- **Propriedades CSS padrão** — não usar shorthands exclusivos do React Native (`padding-vertical`, `padding-horizontal`); usar `padding-top`, `padding-bottom`, `padding-left`, `padding-right`
- **Estilos em arquivo separado** — cada componente tem `ComponentName.styles.ts` com os styled-components; o `.tsx` importa desse arquivo

### Estrutura de um componente

```
ComponentName/
  ComponentName.styles.ts   ← styled-components (tokens, sem lógica)
  ComponentName.tsx          ← JSX + lógica de apresentação
  ComponentName.test.tsx     ← testes unitários
  ComponentName.stories.tsx  ← Storybook
  index.ts                   ← barrel export (público)
```

### UI burra

- Componentes de UI **nunca decidem** — só renderizam o que recebem via props
- Strings visíveis sempre via `t('key')` de `@/shared/i18n` — nunca hardcoded
- Lógica de negócio fica em `domain/` ou `viewModels/`, nunca em componentes

---

## Regras gerais

- Nome do app em `app.json` permanece `"gymFlow"` — não alterar
- Nunca commitar direto na `main` — sempre via PR
- Bundle ID: `com.gymflow.app` (iOS e Android)
