# /add-screen

Atalho para criar uma nova tela no GymFlow. Coleta as informações necessárias e invoca o agente create-screen.

## Input

$ARGUMENTS

Formato esperado (todos opcionais — o que não for passado será perguntado):
```
Nome: NomeDaTela
Descrição: o que exibe e qual ação o usuário pode fazer
Parâmetros: ex: gymId: string | nenhum
Dados: lista de campos/informações exibidas
Ações: botões, formulários, gestos
```

## Fluxo

### Coleta de informações

Se o input não contiver todas as informações, pergunte:
1. **Nome** da tela (PascalCase, sem o sufixo "Screen")
2. **Descrição**: o que ela exibe e o que o usuário pode fazer
3. **Parâmetros de navegação**: tipos e nomes (ou "nenhum")
4. **Dados exibidos**: quais informações aparecem na tela
5. **Ações do usuário**: botões, formulários, gestos disponíveis

### Verificação de conflitos

Antes de criar, verifique:
- Se já existe uma tela com o mesmo nome em `src/presentation/screens/`
- Se a rota já está registrada em `src/shared/navigation/types.ts`

Se encontrar conflito, informe o usuário antes de prosseguir.

### Criação

Use o agente **create-screen** com as informações coletadas.

### Documentação no Confluence

Após a criação, use o agente **confluence-docs** para criar a página da nova tela em "Documentação de tela geral".
O agente lê os arquivos recém-criados e gera a página automaticamente.

### Pós-criação

Após tudo concluído, informe:
1. Arquivos criados
2. Link da página no Confluence
3. Lembretes: registrar no `RootNavigator.tsx` (se necessário), rodar `npm run lint`
