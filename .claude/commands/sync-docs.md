# /sync-docs

Sincroniza as páginas de telas em "Documentação de tela geral" (Confluence) com o estado atual do código.

**Escopo:** apenas páginas de telas — filhas de `2457601`. Nada mais.

## Input

$ARGUMENTS

Modos de uso:
- `/sync-docs` — detecta automaticamente quais telas foram modificadas e sincroniza
- `/sync-docs tela NomeDaTela` — sincroniza uma tela específica
- `/sync-docs todas` — documenta/atualiza todas as telas do projeto

---

## Fluxo — Modo automático (`/sync-docs`)

1. Execute `git diff main...HEAD --name-only` para listar arquivos modificados na branch atual
2. Filtre apenas arquivos de telas:
   - `src/presentation/screens/**/*Screen.tsx`
   - `src/presentation/screens/**/*Screen.test.tsx`
   - `src/presentation/viewModels/use*ViewModel.ts`
   - `src/presentation/viewModels/use*ViewModel.test.ts`
   - `src/presentation/uiModels/*UiModel.ts`
   - `.maestro/*.yaml`
3. Para cada tela afetada pelos arquivos modificados: use o agente **confluence-docs** para criar ou atualizar a página
4. Apresente o resumo com links

## Fluxo — Modo tela (`/sync-docs tela NomeDaTela`)

Use o agente **confluence-docs** passando o nome da tela. O agente decide se cria ou atualiza.

## Fluxo — Modo todas (`/sync-docs todas`)

Liste todas as telas em `src/presentation/screens/` e execute o agente **confluence-docs** para cada uma em sequência.

---

## Output

Para cada página processada:
```
✅ Criada — "Tela — NomeDaTela"
   https://gabrielamiranda1110.atlassian.net/wiki/...

✅ Atualizada — "Tela — NomeDaTela"
   https://gabrielamiranda1110.atlassian.net/wiki/...

— Sem mudanças — "Tela — NomeDaTela"
```
