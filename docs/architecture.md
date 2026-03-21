# Arquitetura — GymFlow

## Visão geral

GymFlow segue **Clean Architecture** com camadas bem delimitadas. O fluxo de dados é unidirecional:

```
domain/models → useCase → viewModel (Context/hook/store) → uiModel → screen
```

---

## Estrutura de diretórios

```
src/
  config/             # Configuração de ambiente (env.ts)
  contexts/           # Providers React cross-cutting (ThemeContext)
  data/
    repositories/     # Abstrações de acesso a dados
    services/         # Implementações externas (queryClient, APIs)
  domain/
    models/           # Entidades de domínio puras (sem deps de UI/infra)
    useCases/         # Casos de uso (lógica de negócio)
  hooks/              # Hooks de app-level (useFonts, useGyms)
  presentation/
    components/       # Componentes reutilizáveis
    screens/          # Telas (importam só uiModels)
    uiModels/         # Tipos que as telas consomem
    viewModels/       # Contextos + hooks que fazem domain → uiModel
  shared/
    assets/           # Assets estáticos
    constants/        # Constantes globais
    hooks/            # Hooks genéricos reutilizáveis
    i18n/             # Internacionalização
    navigation/       # React Navigation (RootNavigator, types)
    tests/            # Setup de testes
    types/            # Tipos TypeScript compartilhados
    utils/            # Funções puras
  store/              # Zustand stores (estado global)
  theme/              # Motion system (animações, springs, durations)
  tokens/             # Design system (cores, tipografia, espaçamento, tema)
```

---

## Regras de camada

| De | Pode importar | Nunca importa |
|----|---------------|---------------|
| `domain/` | — (zero deps) | `presentation/`, `data/`, libs externas |
| `data/` | `domain/models` | `presentation/` |
| `presentation/screens` | `presentation/uiModels` | `domain/` diretamente |
| `presentation/viewModels` | `domain/`, `store/`, `data/` | — |
| `store/` | `domain/models`, `tokens/` | `presentation/` |
| `hooks/` | `data/`, `store/`, `config/` | — |

---

## Estado global — Zustand

Stores ficam em `src/store/` e são a fonte de verdade para estado persistente entre telas.

```ts
// Lendo estado
const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

// Atualizando estado
const { setAuth } = useAuthStore();
setAuth(user, token);
```

### Stores disponíveis

| Store | Responsabilidade |
|-------|-----------------|
| `useAuthStore` | Usuário logado, token, `isAuthenticated` |
| `useGymStore` | Lista de academias, favoritos, lotação atual |

### Convenção de stores

- Cada store tem uma interface tipada (`AuthState`, `GymState`)
- Actions ficam dentro do `create()` — não use `setState` externo
- Stores não fazem fetch — apenas armazenam dados entregues por hooks/viewModels
- Use **selectors** para evitar re-renders desnecessários: `useAuthStore((s) => s.user)`

---

## Dados assíncronos — TanStack Query

Toda busca de dados do servidor passa por `useQuery` ou `useMutation`. O `QueryClient` está em `src/data/services/queryClient.ts` com:

- `staleTime: 5 min` — dados são considerados frescos por 5 min
- `gcTime: 10 min` — cache é removido após 10 min sem uso
- `retry: 2` — tenta até 2 vezes em caso de erro

```ts
// Exemplo: hook que busca academias
const { data: gyms, isLoading, error } = useGyms();
```

### Convenção de query keys

```ts
['gyms']                  // lista completa
['gyms', gymId]           // academia específica
['gyms', gymId, 'checkins'] // sub-recurso
```

---

## Navegação — React Navigation

A navegação fica em `src/shared/navigation/`:

- `types.ts` — tipos `RootStackParamList` e `AppTabParamList`
- `RootNavigator.tsx` — stack raiz que decide entre Auth e App baseado em `useAuthStore`

### Estrutura de navegação

```
RootStack
  ├── Login (unauthenticated)
  └── App (authenticated)
        └── AppTabs
              ├── Home
              └── Profile
```

### Tipagem de screens

```ts
// Em cada tela, use os tipos gerados
type Props = RootStackScreenProps<'Login'>;
type Props = AppTabScreenProps<'Home'>;
```

---

## Variáveis de ambiente

Acesso a env vars **sempre** via `src/config/env.ts` — nunca `process.env` diretamente nos componentes.

```ts
import { Config } from '@/config/env';

fetch(`${Config.apiUrl}/gyms`);
```

As variáveis são injetadas via `app.config.ts` e lidas em runtime pelo `expo-constants`. Arquivos `.env.*` não são commitados — use `.env.example` como referência.
