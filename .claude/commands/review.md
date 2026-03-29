# /review

Revisa código do GymFlow usando o agente code-review. Pode revisar arquivos específicos, mudanças staged ou um PR inteiro.

## Input

$ARGUMENTS

Modos de uso:
- `/review` — revisa todas as mudanças uncommitted (`git diff`)
- `/review staged` — revisa apenas mudanças staged (`git diff --cached`)
- `/review src/presentation/components/Button` — revisa pasta ou arquivo específico
- `/review PR-<número>` — revisa um Pull Request pelo número

## Fluxo

### Modo: arquivos/pasta específicos

1. Leia os arquivos indicados
2. Use o agente **code-review** passando o conteúdo completo
3. Apresente os resultados no formato padrão

### Modo: mudanças uncommitted ou staged

1. Execute `git diff` (ou `git diff --cached` para staged) para obter os arquivos modificados
2. Leia o conteúdo atual de cada arquivo modificado
3. Use o agente **code-review** em todos os arquivos de uma vez
4. Apresente os resultados agrupados por arquivo

### Modo: Pull Request

1. Use `gh pr view <número> --json files,title,body` para obter os arquivos do PR
2. Leia o conteúdo atual de cada arquivo
3. Use o agente **code-review** em todos os arquivos
4. Apresente os resultados + um resumo de aprovação ou bloqueios

## Output

Siga o formato do agente code-review:

```
❌ [CATEGORIA] arquivo.tsx:linha
   Problema: descrição clara
   Correção: como deve ficar
```

Ao final, exiba:
- Total de problemas por categoria
- Veredicto: ✅ Pronto para merge | ⚠️ Requer ajustes menores | ❌ Bloqueado
