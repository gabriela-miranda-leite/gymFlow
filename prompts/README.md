# Prompts de IA — GymFlow

Prompts reutilizáveis para geração e revisão de código seguindo os padrões do projeto.

## Estrutura

```
prompts/
  features/
    create-screen.md      # Gerar uma nova tela completa
    create-component.md   # Gerar um novo componente UI
  review/
    code-review.md        # Revisão de código seguindo convenções do GymFlow
  docs/
    business-rule.md      # Documentar regra de negócio no formato BR-XXX
    pull-request.md       # Preencher descrição de PR
```

## Como usar

Cole o conteúdo do prompt escolhido no início de uma conversa com o modelo, substitua as variáveis entre `{{ }}` e envie com o código ou descrição relevante.

## Como contribuir

1. Crie o arquivo na pasta adequada seguindo o padrão de nomenclatura
2. Inclua: contexto do projeto, entrada esperada, saída esperada, exemplo funcional
3. Teste gerando código real antes de fazer o commit
4. Atualize este README com a descrição do novo prompt

## Padrões que todos os prompts devem reforçar

- Clean Architecture (domain / data / presentation / shared)
- styled-components com tokens (`Spacing`, `Radius`, `FontSize`, `FontWeight`, `Typography`, `theme.*`)
- UI burra: componentes só renderizam o que recebem, sem lógica de negócio
- Strings via `t('key')` de `@/shared/i18n` — nunca hardcoded
- Estrutura de pasta por componente: `.tsx` + `.styles.ts` + `.test.tsx` + `.stories.tsx` + `index.ts`
- Propriedades CSS padrão (sem `padding-vertical`, `padding-horizontal`)
