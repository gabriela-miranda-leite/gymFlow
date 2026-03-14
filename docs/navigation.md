# Navegação — GymFlow

Stack: **React Navigation** — `native-stack` + `bottom-tabs`.

Todos os arquivos de navegação ficam em `src/shared/navigation/`:

| Arquivo | Responsabilidade |
|---------|-----------------|
| `types.ts` | Tipos de param lists e helpers de screen props |
| `RootNavigator.tsx` | Árvore de navegação completa |

---

## Estrutura

```
NavigationContainer
└── RootStack (NativeStack)
      ├── Login          ← unauthenticated
      └── App            ← authenticated
            └── AppTabs (BottomTabs)
                  ├── Home
                  └── Profile
```

A troca entre `Login` e `App` é automática: o `RootNavigator` lê `isAuthenticated` do `useAuthStore` e renderiza o stack correto. Não é necessário navegar manualmente entre os dois fluxos.

---

## Tipos

Definidos em `src/shared/navigation/types.ts`.

### Adicionando uma nova tela ao RootStack

```ts
export type RootStackParamList = {
  Login: undefined;
  App: NavigatorScreenParams<AppTabParamList>;
  GymDetail: { gymId: string };  // ← nova tela com parâmetro
};
```

### Adicionando uma nova aba

```ts
export type AppTabParamList = {
  Home: undefined;
  Profile: undefined;
  Checkin: undefined;  // ← nova aba
};
```

---

## Tipagem das screens

Importe o helper correto de acordo com o navigator onde a tela vive.

### Tela no RootStack

```tsx
import type { RootStackScreenProps } from '@/shared/navigation/types';

export function GymDetailScreen({ route, navigation }: RootStackScreenProps<'GymDetail'>) {
  const { gymId } = route.params;
  // ...
}
```

### Tela nas AppTabs

```tsx
import type { AppTabScreenProps } from '@/shared/navigation/types';

export function HomeScreen({ navigation }: AppTabScreenProps<'Home'>) {
  // navigation aqui tem os métodos tanto do tab quanto do stack pai
}
```

---

## Navegação programática

### Ir para uma tela

```tsx
// Dentro de qualquer screen com acesso ao navigation prop
navigation.navigate('GymDetail', { gymId: '123' });

// Voltar
navigation.goBack();
```

### Navegar de fora de uma screen (hook)

```tsx
import { useNavigation } from '@react-navigation/native';
import type { RootStackScreenProps } from '@/shared/navigation/types';

function MyComponent() {
  const navigation = useNavigation<RootStackScreenProps<'Login'>['navigation']>();
  navigation.navigate('GymDetail', { gymId: '123' });
}
```

---

## Passando parâmetros entre telas

### 1. Declare o tipo em `types.ts`

```ts
export type RootStackParamList = {
  GymDetail: { gymId: string };
};
```

### 2. Navegue passando os parâmetros

```tsx
navigation.navigate('GymDetail', { gymId: gym.id });
```

### 3. Leia na tela de destino

```tsx
export function GymDetailScreen({ route }: RootStackScreenProps<'GymDetail'>) {
  const { gymId } = route.params;
}
```

---

## Adicionando uma nova tela — passo a passo

1. Crie `src/presentation/screens/NomeDaTela.tsx`
2. Adicione a entrada em `RootStackParamList` ou `AppTabParamList` em `types.ts`
3. Registre a tela no navigator correto em `RootNavigator.tsx`
4. Use o helper de tipagem (`RootStackScreenProps` ou `AppTabScreenProps`)

---

## Cores da tab bar

A tab bar usa tokens semânticos do tema — não hardcode cores:

```tsx
// RootNavigator.tsx — já configurado
tabBarStyle: {
  backgroundColor: theme.tabBar.bg,
  borderTopColor: theme.tabBar.border,
},
tabBarActiveTintColor: theme.tabBar.active,
tabBarInactiveTintColor: theme.tabBar.inactive,
```

Mude as cores editando `theme.tabBar` em `src/tokens/theme.ts` — o dark mode é tratado automaticamente.

---

## Arquivos relevantes

| Arquivo | Descrição |
|---------|-----------|
| [src/shared/navigation/types.ts](../src/shared/navigation/types.ts) | Param lists e screen props |
| [src/shared/navigation/RootNavigator.tsx](../src/shared/navigation/RootNavigator.tsx) | Árvore de navegação |
| [src/store/useAuthStore.ts](../src/store/useAuthStore.ts) | `isAuthenticated` que controla qual stack renderizar |
| [src/presentation/screens/](../src/presentation/screens/) | Telas registradas |
