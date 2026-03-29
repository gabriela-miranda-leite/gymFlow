# /implement-ticket

Busca um ticket Jira do GymFlow, extrai os requisitos e orquestra a implementação completa usando os agentes especializados.

## Input

$ARGUMENTS

Esperado: ID do ticket Jira (ex: `GYM-42`). Se não fornecido, pergunte ao usuário.

## Fluxo de orquestração

### Etapa 1 — Buscar contexto do ticket

Use a ferramenta `mcp__claude_ai_Atlassian__getJiraIssue` com o ID fornecido.

Extraia do ticket:
- **Título** e **descrição** da tarefa
- **Critérios de aceitação** (acceptance criteria)
- **Tipo**: `feat` (nova feature), `fix` (bug), `chore` (refactor/config)
- **Componentes afetados** (se informado)

Apresente ao usuário o que foi entendido do ticket e confirme antes de prosseguir.

### Etapa 2 — Definir estratégia de implementação

Com base no tipo do ticket:

**Se `feat` (nova feature):**
→ Execute o fluxo completo de `/new-feature` com os dados extraídos do ticket.
O fluxo já inclui testes unitários (domain, data, presentation) e E2E Maestro.

**Se `fix` (bug):**
1. Leia os arquivos relacionados ao bug descrito no ticket
2. Identifique a causa raiz
3. Aplique a correção mínima necessária — sem refatorar código não relacionado
4. Verifique se há um arquivo `.maestro/*.yaml` que cobre o fluxo do bug:
   - Se sim: atualize o teste para reproduzir o cenário corrigido
   - Se não: crie o `.yaml` se o bug ocorre num fluxo de tela
5. Use o agente **code-review** para validar os arquivos modificados + os testes

**Se `chore` (refactor/config):**
1. Analise o escopo das mudanças necessárias
2. Aplique as mudanças
3. Verifique se algum teste existente precisa ser atualizado por causa do refactor
4. Use o agente **code-review** para validar conformidade

### Etapa 3 — Criar branch

Após confirmar a estratégia com o usuário, crie a branch seguindo a convenção:

```bash
git checkout -b feat/GYM-<número>   # para features
git checkout -b fix/GYM-<número>    # para bugs
git checkout -b chore/GYM-<número>  # para chores
```

### Etapa 4 — Implementação

Execute a estratégia definida na Etapa 2.

### Etapa 5 — Cobertura de testes

Antes de partir para o code-review, verifique:

| Camada | O que foi criado/modificado | Teste esperado |
|---|---|---|
| `domain/useCases/` | use case novo ou modificado | `.test.ts` na mesma pasta |
| `data/services/` | service novo ou modificado | `.test.ts` na mesma pasta |
| `presentation/viewModels/` | viewModel novo ou modificado | `.test.ts` na mesma pasta |
| `presentation/screens/` | tela nova ou modificada | `.test.tsx` + `.maestro/<tela>.yaml` |
| `presentation/components/` | componente novo ou modificado | `.test.tsx` na pasta do componente |

Se algum teste estiver faltando, crie-o antes de prosseguir.

### Etapa 6 — Validação

Use o agente **code-review** nos arquivos criados/modificados (código + testes + E2E).
Corrija todos os problemas antes de prosseguir.

### Etapa 7 — Documentação no Confluence

Para qualquer tipo de ticket (`feat`, `fix`, `chore`): verifique quais arquivos de tela foram criados ou modificados e, para cada tela afetada, use o agente **confluence-docs** para criar ou atualizar a página correspondente em "Documentação de tela geral".

Se nenhuma tela foi tocada, pule esta etapa.

### Etapa 8 — Resumo

Apresente ao usuário:
- Branch criada
- Arquivos criados e modificados (código, testes unitários, E2E)
- Páginas do Confluence criadas/atualizadas com links diretos
- Próximos passos: `npm test`, `npm run e2e:test`, `git add`, `git commit`, abrir PR
