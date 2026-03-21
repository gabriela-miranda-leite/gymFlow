# Ícones — GymFlow

GymFlow usa [Phosphor Icons](https://phosphoricons.com/) via `phosphor-react-native`. Nenhum componente importa diretamente da lib — toda importação passa pelo arquivo centralizado.

---

## Uso

```tsx
import { AppIcons } from '@/presentation/components'

const Icon = AppIcons.favorite
return <Icon size={24} color={theme.foreground} />
```

O `size` e `color` são opcionais. Se omitidos, herdam os defaults do `IconContext.Provider` configurado no `App.tsx`:

- `size`: 24
- `color`: `theme.foreground`
- `weight`: `'regular'`

---

## Catálogo de ícones

### Navegação

| Chave | Ícone Phosphor | Uso |
|-------|---------------|-----|
| `navBack` | `ArrowLeftIcon` | Botão voltar |
| `navChevron` | `CaretRightIcon` | Navegar em lista |
| `navChevronDown` | `CaretDownIcon` | Abrir dropdown |

### Tabs

| Chave | Ícone Phosphor | Uso |
|-------|---------------|-----|
| `tabMap` | `MapTrifoldIcon` | Tab mapa |
| `tabCheckIn` | `RadioIcon` | Tab check-in |
| `tabProfile` | `UserIcon` | Tab perfil |

### Localização e tempo

| Chave | Ícone Phosphor | Uso |
|-------|---------------|-----|
| `location` | `MapPinIcon` | Localização de academia |
| `lastUpdate` | `ClockIcon` | Última atualização |
| `bestTime` | `TrendDownIcon` | Melhor horário para ir |

### Ações

| Chave | Ícone Phosphor | Uso |
|-------|---------------|-----|
| `favorite` | `HeartIcon` | Favoritar academia |
| `notifications` | `BellIcon` | Alertas e notificações |
| `logout` | `SignOutIcon` | Sair da conta |
| `editAvatar` | `CameraIcon` | Editar foto de perfil |

### Formulários

| Chave | Ícone Phosphor | Uso |
|-------|---------------|-----|
| `validationError` | `WarningCircleIcon` | Erro de validação |
| `showPassword` | `EyeIcon` | Mostrar senha |
| `hidePassword` | `EyeSlashIcon` | Ocultar senha |
| `emailField` | `EnvelopeIcon` | Campo de e-mail |
| `passwordField` | `LockIcon` | Campo de senha |

### Tema

| Chave | Ícone Phosphor | Uso |
|-------|---------------|-----|
| `lightTheme` | `SunIcon` | Alternar para tema claro |
| `darkTheme` | `MoonIcon` | Alternar para tema escuro |

### Feedback

| Chave | Ícone Phosphor | Uso |
|-------|---------------|-----|
| `success` | `CheckIcon` | Confirmação de sucesso |
| `loading` | `SpinnerIcon` | Estado de carregamento |

### Reports

| Chave | Ícone Phosphor | Uso |
|-------|---------------|-----|
| `reports` | `ChartBarIcon` | Relatórios e estatísticas |

---

## Tipagem

```ts
import type { AppIconName, IconProps } from '@/presentation/components'

// Tipo de todas as chaves disponíveis
type AppIconName = keyof typeof AppIcons

// Props de um ícone Phosphor
interface MyProps {
  icon: AppIconName
  iconProps?: IconProps
}
```

---

## Adicionando novos ícones

Edite **apenas** o arquivo `src/presentation/components/icons/AppIcons.ts`:

1. Adicione o import do ícone de `phosphor-react-native`
2. Adicione a entrada no objeto `AppIcons` com chave por contexto de uso

```ts
// 1. Import
import { StarIcon } from 'phosphor-react-native'

// 2. Entrada no AppIcons
export const AppIcons = {
  // ...existentes
  highlight: StarIcon, // chave = contexto, não nome do ícone
} as const
```

> Nunca importe de `phosphor-react-native` diretamente nos componentes.
