# Design System — GymFlow

Todos os tokens ficam em `src/tokens/` e são exportados pelo barrel `src/tokens/index.ts`.

```ts
import { Typography, Spacing, Radius, Shadows } from '@/tokens';
import { useTheme } from '@/contexts/ThemeContext';
```

---

## Regra fundamental

> Componentes **nunca** importam `colors` diretamente.
> Toda cor usada em componentes vem de `theme`, obtido via `useTheme()`.

```tsx
// ✅
const { theme } = useTheme();
<View style={{ backgroundColor: theme.bg.primary }} />

// ❌
import { colors } from '@/tokens';
<View style={{ backgroundColor: colors.gray100 }} />
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
const { theme, isDark, themeKey, mode, setMode } = useTheme();
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

### `theme.bg` — fundos de tela

| Token | Uso |
|-------|-----|
| `theme.bg.primary` | Fundo principal da tela |
| `theme.bg.secondary` | Fundo de seções, listas |
| `theme.bg.tertiary` | Separadores, áreas de destaque sutil |

### `theme.surface` — superfícies elevadas

| Token | Uso |
|-------|-----|
| `theme.surface.primary` | Cards, modais, bottom sheets |
| `theme.surface.secondary` | Cards aninhados |
| `theme.surface.elevated` | Superfícies com sombra sobre outras |

### `theme.border`

| Token | Uso |
|-------|-----|
| `theme.border.default` | Bordas padrão de inputs, cards |
| `theme.border.subtle` | Divisores internos, separadores |
| `theme.border.strong` | Bordas com ênfase |

### `theme.text`

| Token | Uso |
|-------|-----|
| `theme.text.primary` | Texto principal, headings |
| `theme.text.secondary` | Subtítulos, metadados |
| `theme.text.tertiary` | Placeholders, hints |
| `theme.text.inverse` | Texto sobre fundos escuros/primários |
| `theme.text.disabled` | Estado desabilitado |

### `theme.icon`

| Token | Uso |
|-------|-----|
| `theme.icon.primary` | Ícones de ação principal |
| `theme.icon.secondary` | Ícones de apoio |
| `theme.icon.tertiary` | Ícones decorativos |
| `theme.icon.inverse` | Ícones sobre fundos escuros |

### `theme.brand`

| Token | Uso |
|-------|-----|
| `theme.brand.primary` | `#FF6B35` — botões, CTA, destaques |
| `theme.brand.primaryDark` | `#CC4A15` — estado pressionado |
| `theme.brand.primaryLight` | `#FFF0EA` — background de banners de marca |
| `theme.brand.secondary` | `#1A1A2E` — cabeçalhos, nav |
| `theme.brand.onPrimary` | Texto/ícone sobre `brand.primary` |

### `theme.occupancy` — nível de lotação

```tsx
const { theme } = useTheme();
const level: OccupancyLevel = 'busy'; // 'empty' | 'moderate' | 'busy' | 'packed'

<View style={{ backgroundColor: theme.occupancy[level].bg }}>
  <View style={{ backgroundColor: theme.occupancy[level].indicator }} /> {/* bolinha */}
  <Text style={{ color: theme.occupancy[level].text }}>Movimentada</Text>
</View>
```

| Nível | Indicador | Significado |
|-------|-----------|-------------|
| `empty` | verde `#22C55E` | Academia vazia |
| `moderate` | amarelo `#F59E0B` | Moderada |
| `busy` | laranja `#F97316` | Movimentada |
| `packed` | vermelho `#EF4444` | Lotada |

### `theme.tabBar`

| Token | Uso |
|-------|-----|
| `theme.tabBar.bg` | Fundo da tab bar |
| `theme.tabBar.border` | Borda superior da tab bar |
| `theme.tabBar.active` | Ícone/label da aba ativa |
| `theme.tabBar.inactive` | Ícone/label das abas inativas |

---

## Tipografia

Importe `Typography` de `@/tokens`. Cada estilo já inclui `fontFamily`, `fontSize`, `lineHeight` e `letterSpacing`.

```tsx
import { Typography } from '@/tokens';

<Text style={Typography.display}>GymFlow</Text>
<Text style={Typography.h1}>Meus Treinos</Text>
<Text style={[Typography.body, { color: theme.text.secondary }]}>
  Última sessão há 2 dias
</Text>
```

### Escala

| Token | Fonte | Tamanho | Uso |
|-------|-------|---------|-----|
| `Typography.display` | Barlow Condensed Black 900 | 40 | Números grandes, destaque hero |
| `Typography.h1` | Barlow Condensed ExtraBold 800 | 32 | Título de tela |
| `Typography.h2` | Barlow Condensed Bold 700 | 24 | Título de seção |
| `Typography.h3` | Barlow Condensed Bold 700 | 20 | Subtítulo de seção |
| `Typography.button` | Barlow SemiBold 600 | 18 | Labels de botão |
| `Typography.bodyLg` | Barlow Regular 400 | 16 | Texto de destaque |
| `Typography.body` | Barlow Regular 400 | 14 | Texto padrão |
| `Typography.bodyMedium` | Barlow Medium 500 | 14 | Texto com ênfase média |
| `Typography.caption` | Barlow Regular 400 | 12 | Legendas, metadados |
| `Typography.overline` | Barlow SemiBold 600 | 11 | Labels de categoria (uppercase) |

### Combinar tipografia com cor

```tsx
<Text style={[Typography.h2, { color: theme.text.primary }]}>
  Academia Central
</Text>
<Text style={[Typography.caption, { color: theme.text.tertiary }]}>
  Aberta até 22h
</Text>
```

---

## Espaçamento

```tsx
import { Spacing } from '@/tokens';
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
| `Spacing.s12` | 48px | Espaço generoso entre seções |
| `Spacing.s14` | 56px | Altura de bottom bar, espaço de respiro |

```tsx
<View style={{ padding: Spacing.s4, marginBottom: Spacing.s6 }} />
```

---

## Bordas arredondadas

```tsx
import { Radius } from '@/tokens';
```

| Token | Valor | Uso |
|-------|-------|-----|
| `Radius.xs` | 4 | Chips pequenos, badges |
| `Radius.sm` | 8 | Inputs, botões secundários |
| `Radius.md` | 12 | Bottom sheets, modais |
| `Radius.btn` | 14 | Botões primários |
| `Radius.lg` | 16 | Cards padrão |
| `Radius.card` | 18 | Cards maiores |
| `Radius.xl` | 24 | Elementos com destaque visual |
| `Radius.full` | 9999 | Pills, avatares, botões redondos |

---

## Sombras

```tsx
import { Shadows } from '@/tokens';

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

## Fontes

As fontes são carregadas pelo `useAppFonts()` antes do app renderizar. Você não precisa se preocupar com carregamento — se o componente estiver visível, as fontes já estão disponíveis.

```tsx
import { FontFamily, FontSize, FontWeight } from '@/tokens';

// Uso direto (quando não quiser usar um preset de Typography)
<Text style={{
  fontFamily: FontFamily.displayBold,
  fontSize: FontSize.h3,
  fontWeight: FontWeight.bold,
}} />
```

| Família | Pesos disponíveis | Uso |
|---------|-------------------|-----|
| Barlow Condensed | 700, 800, 900 | Headings, display, números grandes |
| Barlow | 400, 500, 600 | Body, captions, labels de UI |

---

## Exemplo completo — card de academia

```tsx
import { Radius, Shadows, Spacing, Typography } from '@/tokens';
import { useTheme } from '@/contexts/ThemeContext';
import type { OccupancyLevel } from '@/tokens';

interface GymCardProps {
  name: string;
  address: string;
  occupancy: OccupancyLevel;
}

export function GymCard({ name, address, occupancy }: GymCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.surface.primary,
        borderRadius: Radius.card,
        padding: Spacing.s4,
        ...Shadows.medium,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[Typography.h3, { color: theme.text.primary }]}>
          {name}
        </Text>
        <View
          style={{
            backgroundColor: theme.occupancy[occupancy].bg,
            borderRadius: Radius.full,
            paddingHorizontal: Spacing.s3,
            paddingVertical: Spacing.s1,
          }}
        >
          <Text style={[Typography.caption, { color: theme.occupancy[occupancy].text }]}>
            {occupancy}
          </Text>
        </View>
      </View>
      <Text style={[Typography.body, { color: theme.text.secondary, marginTop: Spacing.s1 }]}>
        {address}
      </Text>
    </View>
  );
}
```

---

## Checklist de revisão

- [ ] Nenhum valor de cor hardcoded (ex: `'#FF6B35'`, `'white'`) em componentes
- [ ] Nenhum `fontSize` hardcoded fora dos tokens
- [ ] Nenhum `padding`/`margin` hardcoded — tudo via `Spacing.*`
- [ ] Nenhum `borderRadius` hardcoded — tudo via `Radius.*`
- [ ] Sombras via `Shadows.*`, não via propriedades manuais
- [ ] Fontes via `Typography.*` ou `FontFamily.*`
