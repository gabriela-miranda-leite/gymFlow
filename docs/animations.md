# Animações — GymFlow

GymFlow usa duas libs complementares para animações. Todos os tokens de animação ficam em `src/theme/motion.ts` — nenhum componente usa magic values como `300` ou `{ stiffness: 500 }`.

---

## Libs

| Lib | Papel |
|-----|-------|
| `react-native-reanimated` | Animações ligadas a gestos e interações de toque (60fps na native thread) |
| `moti` | Animações declarativas de mount/unmount, transições de estado e sequências |

> `moti` é construído sobre Reanimated — as duas se complementam sem conflito.
> Nunca use a `Animated` API nativa do React Native.

---

## Tokens de motion

```ts
import { Duration, Spring, Scale, Transition } from '@/theme/motion'
```

### Duration (ms)

| Token | Valor | Uso |
|-------|-------|-----|
| `Duration.fast` | 200ms | Fades, toasts |
| `Duration.normal` | 300ms | Entrada de tela |
| `Duration.slow` | 500ms | Entrada de tela com destaque |
| `Duration.toast` | 3000ms | Tempo visível do toast |

### Spring configs (Reanimated)

| Token | stiffness | damping | Uso |
|-------|-----------|---------|-----|
| `Spring.screen` | 300 | 30 | Entrada de tela |
| `Spring.tabIndicator` | 500 | 35 | Indicador de tab ativa |
| `Spring.tapFeedback` | 500 | 35 | Feedback de toque |
| `Spring.sliderThumb` | 500 | 35 | Thumb de slider |

### Scale

| Token | Valor | Uso |
|-------|-------|-----|
| `Scale.tap` | 0.98 | Feedback de toque em botões |
| `Scale.sliderThumb` | 0.95 | Thumb de slider pressionado |

### Transition presets (Moti)

| Token | Tipo | Duração | Uso |
|-------|------|---------|-----|
| `Transition.screenEnter` | spring | — | Entrada de tela |
| `Transition.fade` | timing | 200ms | Fade in/out |
| `Transition.toast` | timing | 200ms | Entrada do toast |

---

## Quando usar cada lib

### Reanimated — gestos e interações

Use para animações que precisam rodar a 60fps garantido, ligadas a toque ou gestos:

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import { Spring, Scale } from '@/theme/motion'

// Tap feedback em botão
function AnimatedButton({ onPress, children }) {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={() => { scale.value = withSpring(Scale.tap, Spring.tapFeedback) }}
        onPressOut={() => { scale.value = withSpring(1, Spring.tapFeedback) }}
        onPress={onPress}
      >
        {children}
      </Pressable>
    </Animated.View>
  )
}
```

> Use `useSharedValue` em vez de `useState` para valores que só alimentam animações.

### Moti — transições declarativas

Use para entradas/saídas de componentes, fades e sequências:

```tsx
import { MotiView } from 'moti'
import { Transition, Duration } from '@/theme/motion'

// Entrada de tela
function ScreenWrapper({ children }) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={Transition.screenEnter}
    >
      {children}
    </MotiView>
  )
}

// Fade in/out condicional
function FadeContent({ visible, children }) {
  return (
    <MotiView
      animate={{ opacity: visible ? 1 : 0 }}
      transition={Transition.fade}
    >
      {children}
    </MotiView>
  )
}

// Toast com sequência
function Toast({ message }) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -8 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -8 }}
      transition={Transition.toast}
    >
      <Text>{message}</Text>
    </MotiView>
  )
}
```

---

## Tabela de referência rápida

| Caso de uso | Duração | Config | Lib |
|-------------|---------|--------|-----|
| Entrada de tela | 300–500ms | `Spring.screen` | Moti |
| Fade in/out | 200ms | `Transition.fade` | Moti |
| Tab indicator | — | `Spring.tabIndicator` | Reanimated |
| Tap feedback | instantâneo | `Scale.tap` | Reanimated |
| Toast (entrada) | 200ms | `Transition.toast` | Moti |
| Toast (visível) | 3000ms | `Duration.toast` | — |
| Slider thumb | instantâneo | `Scale.sliderThumb` | Reanimated |

---

## Checklist de revisão

- [ ] Nenhum valor de duração, stiffness ou damping hardcoded — tudo via `motion.ts`
- [ ] Animações de gesto/toque usam Reanimated (`useSharedValue`, `withSpring`, `withTiming`)
- [ ] Animações de mount/unmount usam Moti (`MotiView`, `MotiText`)
- [ ] Zero uso de `Animated` API nativa do React Native
- [ ] Zero animações rodando na JS thread
