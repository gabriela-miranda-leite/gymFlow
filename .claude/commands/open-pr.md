# /open-pr

Abre um Pull Request no GymFlow usando o agente **open-pr**, seguindo o template oficial do repositório.

## Input

$ARGUMENTS

Modos de uso:
- `/open-pr` — cria PR para o branch atual com título derivado dos commits
- `/open-pr "título customizado"` — cria PR com o título fornecido

## Fluxo

1. Use o agente **open-pr** para executar todo o processo
2. Passe o argumento como título sugerido (se fornecido)
3. Apresente a URL do PR criado ao final

## O agente irá

1. Ler `.github/pull_request_template.md`
2. Analisar os commits e arquivos alterados no branch
3. Executar os testes dos arquivos alterados para obter cobertura
4. Montar o body completo no template correto
5. Criar o PR com `--assignee @me` e `--label` correto
