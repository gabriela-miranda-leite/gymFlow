# Design System — GymFlow

Todos os tokens ficam em `src/tokens/` e são exportados pelo barrel `src/tokens/index.ts`.

```ts
import { Typography, Spacing, Radius, Shadows } from '@/tokens'
import { useTheme } from '@/contexts/ThemeContext'
```

---

## Regra fundamental

> Componentes **nunca** importam `colors` diretamente.
> Toda cor usada em componentes vem de `theme`, obtido via `useTheme()`.

```tsx
// ✅
const { theme } = useTheme()
<View style={{ backgroundColor: theme.background }} />

// ❌
import { colors } from '@/tokens'
<View style={{ backgroundColor: colors.white }} />
```

---

## Tema

### ThemeProvider

Envolva a árvore de componentes uma vez, no `App.tsx`:

```tsx
<ThemeProvider>
  <AppContent />
</ThemeProvider>
```

Aceita `initialMode?: 'system' | 'light' | 'dark'` (padrão: `'system'`).

### useTheme()

```tsx
const { theme, isDark, themeKey, mode, setMode } = useTheme()
```

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `theme` | `AppTheme` | Objeto com todos os tokens semânticos |
| `isDark` | `boolean` | `true` se o tema ativo é escuro |
| `themeKey` | `'light' \| 'dark'` | Chave do tema ativo |
| `mode` | `'system' \| 'light' \| 'dark'` | Modo configurado pelo usuário |
| `setMode` | `(mode) => void` | Troca o modo manualmente |

---

## Tokens semânticos de cor (`theme`)

### Superfícies

| Token | Uso |
|-------|-----|
| `theme.background` | Fundo principal da tela |
| `theme.card` | Fundo de cards e listas |
| `theme.secondary` | Fundo de seções secundárias |
| `theme.muted` | Áreas de destaque sutil, separadores |

### Texto

| Token | Uso |
|-------|-----|
| `theme.foreground` | Texto principal, headings |
| `theme.secondaryForeground` | Subtítulos, metadados |
| `theme.mutedForeground` | Placeholders, hints, labels desabilitados |

### Bordas e inputs

| Token | Uso |
|-------|-----|
| `theme.border` | Bordas padrão de inputs e cards |
| `theme.input` | Fundo de campos de formulário |

### Brand

| Token | Uso |
|-------|-----|
| `theme.brand.primary` | `#FF6B00` — botões, CTA, destaques |
| `theme.brand.primaryForeground` | Texto/ícone sobre `brand.primary` |

### Status — nível de lotação

```tsx
const { theme } = useTheme()
const level: OccupancyLevel = 'busy' // 'empty' | 'moderate' | 'busy' | 'packed'

<View style={{ backgroundColor: theme.status[level] }} />
```

| Nível | Cor | Significado |
|-------|-----|-------------|
| `empty` | `#22C55E` verde | Academia vazia |
| `moderate` | `#EAB308` amarelo | Moderada |
| `busy` | `#F97316` laranja | Movimentada |
| `packed` | `#EF4444` vermelho | Lotada |

### Destructive

| Token | Uso |
|-------|-----|
| `theme.destructive` | Ações destrutivas, erros |
| `theme.destructiveForeground` | Texto/ícone sobre `destructive` |

### Tab bar

| Token | Uso |
|-------|-----|
| `theme.tabBar.bg` | Fundo da tab bar |
| `theme.tabBar.border` | Borda superior da tab bar |
| `theme.tabBar.active` | Ícone/label da aba ativa |
| `theme.tabBar.inactive` | Ícone/label das abas inativas |

---

## Tipografia

Importe `Typography` de `@/tokens`. Cada estilo já inclui `fontFamily` e `fontSize`.

```tsx
import { Typography } from '@/tokens'

<Text style={Typography.display}>GymFlow</Text>
<Text style={Typography.heading}>Meus Treinos</Text>
<Text style={[Typography.body, { color: theme.mutedForeground }]}>
  Última sessão há 2 dias
</Text>
```

### Escala

| Token | Fonte | Tamanho | Uso |
|-------|-------|---------|-----|
| `Typography.display` | Inter Bold 700 | 24 | Títulos de tela |
| `Typography.heading` | Inter Bold 700 | 20 | Título de seção |
| `Typography.subheading` | Inter SemiBold 600 | 16 | Subtítulo de seção |
| `Typography.body` | Inter Medium 500 | 14 | Texto padrão |
| `Typography.caption` | Inter Medium 500 | 12 | Legendas, metadados |
| `Typography.micro` | Inter SemiBold 600 | 10 | Labels de categoria |
| `Typography.data` | JetBrains Mono Bold 700 | 30 | Números grandes, métricas |

### Famílias disponíveis

```tsx
import { FontFamily, FontSize, FontWeight } from '@/tokens'

<Text style={{
  fontFamily: FontFamily.semiBold,
  fontSize: FontSize.subheading,
}} />
```

| Token | Fonte |
|-------|-------|
| `FontFamily.regular` | Inter 400 |
| `FontFamily.medium` | Inter 500 |
| `FontFamily.semiBold` | Inter 600 |
| `FontFamily.bold` | Inter 700 |
| `FontFamily.monoRegular` | JetBrains Mono 400 |
| `FontFamily.monoMedium` | JetBrains Mono 500 |
| `FontFamily.monoSemiBold` | JetBrains Mono 600 |
| `FontFamily.monoBold` | JetBrains Mono 700 |

As fontes são carregadas pelo `useAppFonts()` antes do app renderizar — se o componente estiver visível, as fontes já estão disponíveis.

---

## Espaçamento

```tsx
import { Spacing } from '@/tokens'
```

| Token | Valor | Uso típico |
|-------|-------|------------|
| `Spacing.s1` | 4px | Espaço mínimo entre elementos inline |
| `Spacing.s2` | 8px | Gap entre ícone e label |
| `Spacing.s3` | 12px | Padding interno de chips/badges |
| `Spacing.s4` | 16px | Padding padrão de tela e cards |
| `Spacing.s5` | 20px | Margin entre seções pequenas |
| `Spacing.s6` | 24px | Margin entre seções médias |
| `Spacing.s8` | 32px | Margin entre blocos maiores |
| `Spacing.s10` | 40px | Top padding de telas |
| `Spacing.s12` | 48px | Espaço generoso entre seções |
| `Spacing.s16` | 64px | Separação grande |

```tsx
<View style={{ padding: Spacing.s4, marginBottom: Spacing.s6 }} />
```

---

## Bordas arredondadas

```tsx
import { Radius } from '@/tokens'
```

| Token | Valor | Uso |
|-------|-------|-----|
| `Radius.sm` | 6 | Badges, tags |
| `Radius.md` | 8 | Inputs, botões |
| `Radius.lg` | 12 | Cards, modais |
| `Radius.xl` | 16 | Containers grandes |
| `Radius.full` | 9999 | Pills, avatares, botões redondos |

---

## Sombras

```tsx
import { Shadows } from '@/tokens'

<View style={[styles.card, Shadows.medium]} />
```

| Token | Uso |
|-------|-----|
| `Shadows.none` | Sem sombra |
| `Shadows.low` | Cards em lista, items sutis |
| `Shadows.medium` | Cards flutuantes, bottom sheets |
| `Shadows.high` | Modais, overlays |
| `Shadows.primary` | Botão CTA com sombra colorida (brand) |

> Sombras usam `Platform.select` — `shadowColor/shadowOffset/…` no iOS, `elevation` no Android.

---

## Exemplo completo — card de academia

```tsx
import { Radius, Shadows, Spacing, Typography } from '@/tokens'
import { useTheme } from '@/contexts/ThemeContext'
import type { OccupancyLevel } from '@/tokens'

interface GymCardProps {
  name: string
  address: string
  occupancy: OccupancyLevel
}

export function GymCard({ name, address, occupancy }: GymCardProps) {
  const { theme } = useTheme()

  return (
    <View
      style={{
        backgroundColor: theme.card,
        borderRadius: Radius.lg,
        padding: Spacing.s4,
        ...Shadows.medium,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[Typography.heading, { color: theme.foreground }]}>
          {name}
        </Text>
        <View
          style={{
            backgroundColor: theme.status[occupancy],
            borderRadius: Radius.full,
            paddingHorizontal: Spacing.s3,
            paddingVertical: Spacing.s1,
          }}
        />
      </View>
      <Text style={[Typography.body, { color: theme.mutedForeground, marginTop: Spacing.s1 }]}>
        {address}
      </Text>
    </View>
  )
}
```

---

## Checklist de revisão

- [ ] Nenhum valor de cor hardcoded (ex: `'#FF6B00'`, `'white'`) em componentes
- [ ] Nenhum `fontSize` hardcoded fora dos tokens
- [ ] Nenhum `padding`/`margin` hardcoded — tudo via `Spacing.*`
- [ ] Nenhum `borderRadius` hardcoded — tudo via `Radius.*`
- [ ] Sombras via `Shadows.*`, não via propriedades manuais
- [ ] Fontes via `Typography.*` ou `FontFamily.*`
- [ ] Cores via `theme.*` de `useTheme()`, nunca `colors.*`
