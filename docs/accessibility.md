# Acessibilidade — GymFlow

## Princípios

O GymFlow deve ser utilizável por todas as pessoas, incluindo usuários de leitores de tela (VoiceOver no iOS, TalkBack no Android) e usuários com preferências de texto maior.

---

## Regras obrigatórias

### Elementos interativos (TouchableOpacity, Pressable, TouchableHighlight)

Todo elemento tocável **deve** ter:

```tsx
<TouchableOpacity
  accessibilityLabel="Fazer check-in na academia"
  accessibilityRole="button"
  onPress={handleCheckin}
>
```

- `accessibilityLabel`: descreve a ação em linguagem natural, em português
- `accessibilityRole`: `"button"` para ações, `"link"` para navegações, `"tab"` para abas

O ESLint (`react-native-a11y`) vai rejeitar touchables sem essas props.

---

### Imagens

| Tipo | Configuração |
|------|-------------|
| Decorativa (ícone de fundo, ilustração sem info) | `accessible={false}` |
| Informativa (foto de perfil, banner com texto relevante) | `accessibilityLabel="Descrição da imagem"` |

```tsx
// Decorativa
<Image source={bgPattern} accessible={false} />

// Informativa
<Image source={profilePhoto} accessibilityLabel="Foto de perfil de João Silva" />
```

---

### Textos e Dynamic Type

- **Nunca** usar `fontSize` hardcoded fora dos tokens de tipografia
- Sempre usar os valores de `FontSize` de `src/tokens/typography.ts`
- Não usar `numberOfLines` sem `ellipsizeMode` adequado
- Evitar `allowFontScaling={false}` — só permitido em casos muito específicos e com justificativa em comentário

---

### Contraste — WCAG AA

Requisitos mínimos:

| Tipo de texto | Contraste mínimo |
|---------------|-----------------|
| Texto normal (< 18pt) | 4.5:1 |
| Texto grande (≥ 18pt bold ou ≥ 24pt regular) | 3:1 |
| Ícones e elementos de UI | 3:1 |

Os tokens semânticos de `theme.text` e `theme.bg` já foram validados para atender WCAG AA no modo claro e escuro. **Nunca** use valores de `colors` diretamente em componentes — use sempre `theme`.

---

## Testes de acessibilidade

Use queries semânticas do React Native Testing Library:

```tsx
// Prefira queries acessíveis
getByRole('button', { name: 'Fazer check-in' })
getByLabelText('Campo de busca')

// Evite quando houver alternativa semântica
getByTestId('checkin-button') // só se não houver role/label
```

Ordem de preferência das queries:
1. `getByRole` — sempre que possível
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText` — só para texto puro não interativo
5. `getByTestId` — último recurso

---

## Estados acessíveis

```tsx
// Indicar estado de carregamento
<ActivityIndicator accessibilityLabel="Carregando dados da academia" />

// Indicar estado selecionado
<Pressable
  accessibilityRole="tab"
  accessibilityState={{ selected: isActive }}
>

// Indicar estado desabilitado
<Pressable
  accessibilityRole="button"
  accessibilityState={{ disabled: isDisabled }}
  disabled={isDisabled}
>
```

---

## Checklist de revisão de PR

- [ ] Todo `TouchableOpacity`/`Pressable` tem `accessibilityLabel` e `accessibilityRole`
- [ ] Imagens decorativas têm `accessible={false}`
- [ ] Nenhum `fontSize` hardcoded fora dos tokens
- [ ] `npm run lint` passa sem warnings de a11y
- [ ] Componentes novos testados com queries semânticas
