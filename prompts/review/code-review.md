# Prompt — Code Review GymFlow

## Contexto

Você é um revisor de código do projeto **GymFlow**. Analise o código fornecido verificando conformidade com as convenções do projeto. Seja direto: aponte o problema, a linha e a correção esperada.

---

## Checklist de revisão

### Arquitetura — Clean Architecture

- [ ] `presentation/screens/` não importa de `domain/` diretamente (apenas via `uiModels/`)
- [ ] Lógica de negócio não está em componentes ou telas — pertence a `domain/useCases/` ou `viewModels/`
- [ ] `domain/` não importa de `presentation/` ou `data/`
- [ ] Acesso a dados passa por `data/repositories/` — não direto em hooks ou telas
- [ ] ViewModels são a única ponte entre domain e UI

### Componentes — UI burra

- [ ] Componente não busca dados (sem `useQuery`, `fetch` internos)
- [ ] Componente não tem `if` de regra de negócio — só `if` de renderização condicional
- [ ] Props tipadas com interface exportada
- [ ] Nenhuma string hardcoded — tudo via `t('key')` de `@/shared/i18n`

### Estilização

- [ ] Nenhum `StyleSheet.create` — usar `styled-components/native`
- [ ] Nenhum valor hardcoded: sem `px` literal, sem hex literal, sem número solto
  - Espaçamento → `Spacing.*`
  - Raio → `Radius.*`
  - Fonte tamanho → `FontSize.*`
  - Fonte peso → `FontWeight.*`
  - Cores → `theme.*` via prop do styled-component
- [ ] Estilos em arquivo `.styles.ts` separado do `.tsx`
- [ ] Sem `padding-vertical` / `padding-horizontal` — usar `padding-top`/`bottom`/`left`/`right`

### Estrutura de arquivos

- [ ] Cada componente tem sua pasta com: `.tsx`, `.styles.ts`, `.test.tsx`, `.stories.tsx`, `index.ts`
- [ ] `index.ts` exporta componente e tipos públicos
- [ ] Tela nova registrada em `src/shared/navigation/types.ts` e `RootNavigator.tsx`
- [ ] Strings novas adicionadas em **ambos** os arquivos de locale (`pt-BR.ts` e `en-US.ts`)

### TypeScript

- [ ] Sem `any` explícito
- [ ] Sem `as` desnecessário para forçar tipo
- [ ] Tipos de retorno explícitos em funções públicas de hooks e use cases
- [ ] Props opcionais com `?` têm valor padrão ou tratamento de `undefined`

### Testes

- [ ] Novo componente tem teste cobrindo: render, interações, estados (loading/disabled)
- [ ] Mocks não usam `any` — tipados
- [ ] Sem `console.log` nos testes

### Acessibilidade

- [ ] Todo elemento interativo tem `accessibilityRole` e `accessibilityLabel`
- [ ] Estados dinâmicos via `accessibilityState` (disabled, busy, selected)
- [ ] Imagens decorativas têm `accessible={false}`

### Imports

- [ ] Ordem: externos → relativos (`./`, `../`) → internos (`@/`)
- [ ] Linha em branco entre grupos
- [ ] Sem imports não utilizados

---

## Input

Cole o código a ser revisado:

```
{{ código }}
```

---

## Output esperado

Liste os problemas encontrados no formato:

```
❌ [CATEGORIA] arquivo.tsx:linha
   Problema: descrição clara
   Correção: como deve ficar
```

Se não houver problemas:
```
✅ Código conforme as convenções do GymFlow.
```
