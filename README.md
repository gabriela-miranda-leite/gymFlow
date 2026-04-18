<p align="center">
  <img src="docs/logo.svg" alt="GymFlow" width="96" />
</p>

<h1 align="center">GymFlow</h1>

<p align="center">
  <a href="https://github.com/gabriela-miranda-leite/gymflow/actions/workflows/ci.yml"><img src="https://github.com/gabriela-miranda-leite/gymflow/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="https://codecov.io/gh/gabriela-miranda-leite/gymflow"><img src="https://codecov.io/gh/gabriela-miranda-leite/gymflow/branch/main/graph/badge.svg" alt="codecov" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
  <a href="https://expo.dev"><img src="https://img.shields.io/badge/Expo-55-blue" alt="Expo SDK" /></a>
  <a href="https://reactnative.dev"><img src="https://img.shields.io/badge/React%20Native-0.83-blue" alt="React Native" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.9%20strict-blue" alt="TypeScript" /></a>
</p>

<p align="center">
  <a href="https://gabrielamiranda1110.atlassian.net/jira/software/projects/GYM/boards">Jira</a> ·
  <a href="https://gabrielamiranda1110.atlassian.net/wiki/spaces/~70121ce29acf9e1ac44ce861c845ebdfb12d4/pages/393217/Produto+-+Documenta+o+t+cnica+geral">Confluence</a>
</p>

---

Aplicativo mobile que resolve um problema cotidiano de quem frequenta academia: chegar e encontrar a academia lotada, sem equipamentos disponíveis e com espera longa.

O GymFlow une dados de check-ins colaborativos com histórico de fluxo por horário e academia para entregar uma recomendação inteligente de quando e onde ir treinar.

> **Projeto desenvolvido com IA.** O código, a documentação no Confluence e o gerenciamento de sprint no Jira são inteiramente produzidos com auxílio do [Claude Code](https://claude.ai/code) (Anthropic).

---

## Screenshots

### iOS

<!-- Adicione capturas de tela do iOS abaixo (ex: <img src="docs/screenshots/ios-home.png" width="250" />) -->

| | | |
|---|---|---|
| _em breve_ | _em breve_ | _em breve_ |

### Android

<!-- Adicione capturas de tela do Android abaixo (ex: <img src="docs/screenshots/android-home.png" width="250" />) -->

| | | |
|---|---|---|
| _em breve_ | _em breve_ | _em breve_ |

### Vídeo

<!-- Adicione um vídeo demo aqui (ex: [![Demo](docs/screenshots/thumb.png)](https://link-do-video)) -->

_em breve_

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
