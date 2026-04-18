# GymFlow

[![CI](https://github.com/gabriela-miranda-leite/gymflow/actions/workflows/ci.yml/badge.svg)](https://github.com/gabriela-miranda-leite/gymflow/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/gabriela-miranda-leite/gymflow/branch/main/graph/badge.svg)](https://codecov.io/gh/gabriela-miranda-leite/gymflow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Expo SDK](https://img.shields.io/badge/Expo-55-blue)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.83-blue)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9%20strict-blue)](https://www.typescriptlang.org)

Aplicativo mobile que resolve um problema cotidiano de quem frequenta academia: chegar e encontrar a academia lotada, sem equipamentos disponíveis e com espera longa.

O GymFlow une dados de check-ins colaborativos com histórico de fluxo por horário e academia para entregar uma recomendação inteligente de quando e onde ir treinar.

---

## Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| Expo | 55 | Plataforma mobile |
| React Native | 0.83 | Framework de UI |
| TypeScript | 5.9 (strict) | Tipagem estática |
| Zustand | latest | Estado global |
| TanStack Query | latest | Cache e estados assíncronos |
| React Navigation | latest | Navegação (native-stack + bottom-tabs) |
| styled-components | latest | Estilização via tokens |

---

## Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) v24+ (recomendado via [nvm](https://github.com/nvm-sh/nvm))
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS: Xcode + Simulator
- Android: Android Studio + Emulator

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/gabriela-miranda-leite/gymflow.git
cd gymflow

# 2. Ative a versão correta do Node
nvm use

# 3. Instale as dependências
npm install

# 4. Inicie o app
npx expo start
```

Após o passo 4, escaneie o QR code com o Expo Go (celular) ou pressione `i` (iOS Simulator) / `a` (Android Emulator).

---

## Estrutura de pastas

O projeto segue **Clean Architecture**, separando domínio, apresentação e infraestrutura:

```
src/
  domain/               # Regras de negócio puras (zero deps de UI ou infra)
    models/             # Entidades (WorkoutModel, ExerciseModel…)
    useCases/           # Casos de uso (StartWorkoutUseCase…)

  presentation/         # Camada de UI — renderiza, nunca decide
    screens/            # Telas (WorkoutScreen.tsx)
    components/         # Componentes reutilizáveis
    uiModels/           # Tipos que as telas consomem (WorkoutUiModel.ts)
    viewModels/         # Contextos e hooks: domain → uiModel → tela

  data/                 # Camada de infraestrutura
    repositories/       # Abstrações de acesso a dados
    services/           # Implementações externas (API, AsyncStorage…)

  shared/               # Utilitários transversais
    hooks/              # Hooks genéricos
    utils/              # Funções puras
    types/              # Tipos TypeScript compartilhados
    constants/          # Constantes globais
    navigation/         # Configuração do React Navigation
    assets/             # Assets estáticos
    i18n/               # Internacionalização
```

### Fluxo de dados

```
domain/models → useCase → viewModel → uiModel → screen
```

- `domain/` nunca importa de `presentation/` ou `data/`
- Screens importam apenas de `presentation/uiModels/`
- `viewModels/` é a única ponte entre domain e UI

---

## Testes

### Unitários (Jest + React Native Testing Library)

```bash
npm install          # instale dependências
npm run test         # rode os testes
npm run test:coverage  # gere relatório de cobertura
```

### E2E (Maestro)

```bash
# 1. Instale o Maestro CLI (macOS)
curl -Ls 'https://get.maestro.mobile.dev' | bash
export PATH="$HOME/.maestro/bin:$PATH"

# 2. Inicie o app
npm run ios      # ou npm run android

# 3. Em outro terminal, execute os fluxos
npm run e2e:test
```

---

## Contribuição

### Branches

```
feat/GYM-<número>    nova funcionalidade
fix/GYM-<número>     correção de bug
chore/GYM-<número>   configuração, tooling, refactor
```

### Commits

Padrão [Conventional Commits](https://www.conventionalcommits.org) em inglês:

```
feat: add workout creation screen
fix: correct max load calculation
chore: update babel config
```

Tipos aceitos: `feat` · `fix` · `chore` · `docs` · `refactor` · `test` · `style`

### Pull Requests

1. Crie uma branch a partir de `main`
2. Faça suas alterações seguindo as convenções do projeto
3. Abra um PR descrevendo o que foi feito e por quê
4. Nunca commite diretamente na `main`
