# /new-feature

Você vai orquestrar a implementação completa de uma nova feature no GymFlow, do domínio à UI, usando os agentes especializados em sequência.

## Input

$ARGUMENTS

Se nenhum argumento for fornecido, pergunte ao usuário:
1. Nome da feature (ex: "CheckIn", "WorkoutHistory")
2. Descrição do que ela faz
3. Quais dados ela exibe
4. Quais ações o usuário pode fazer
5. Se há parâmetros de navegação

## Fluxo de orquestração

Execute as etapas abaixo **em sequência**, aguardando a conclusão de cada uma antes de prosseguir.

### Etapa 1 — Análise e planejamento

Antes de criar qualquer arquivo:
1. Leia `src/domain/models/` para entender as entidades existentes
2. Leia `src/domain/useCases/` para evitar duplicação de lógica
3. Leia `src/data/repositories/` para entender os contratos de dados disponíveis
4. Leia `src/shared/navigation/types.ts` para entender a navegação atual
5. Liste o que precisa ser criado vs. o que já existe e pode ser reaproveitado

Apresente o plano ao usuário antes de continuar:
- Arquivos novos que serão criados
- Arquivos existentes que serão modificados
- Dependências identificadas

Aguarde confirmação do usuário.

### Etapa 2 — Camada de domínio (se necessário)

Se a feature precisar de modelo ou caso de uso novo:
- Crie `src/domain/models/NomeModel.ts` — entidade pura, zero deps de UI/infra
- Crie `src/domain/useCases/NomeUseCase.ts` — lógica de negócio pura
- Regra: `domain/` **nunca** importa de `presentation/` ou `data/`

Para cada use case criado, crie também `src/domain/useCases/NomeUseCase.test.ts`:
- Happy path com inputs válidos
- Casos de erro esperados (dados inválidos, regra violada)
- Sem mocks de infra — a lógica deve ser testável de forma pura

### Etapa 3 — Camada de dados (se necessário)

Se a feature precisar de novo acesso a dados:
- Crie `src/data/repositories/NomeRepository.ts` — interface/contrato
- Crie `src/data/services/NomeService.ts` — implementação concreta

Para cada service criado, crie também `src/data/services/NomeService.test.ts`:
- Mockeia a implementação externa (fetch, AsyncStorage)
- Cobre: retorno bem-sucedido, falha de rede, resposta inesperada da API

### Etapa 4 — Componentes UI (use o agente create-component)

Para cada componente novo identificado no planejamento:
- Use o agente **create-component** passando: nome, descrição, props, variantes, estados
- Aguarde a criação completa antes de passar para o próximo componente

### Etapa 5 — Tela (use o agente create-screen)

Use o agente **create-screen** passando todas as informações coletadas:
- Nome, descrição, parâmetros de navegação, dados exibidos, ações do usuário
- O agente criará: Screen, styles, viewModel, uiModel, testes unitários (screen + viewModel), i18n keys, registro na navegação **e o arquivo E2E Maestro**

### Etapa 6 — Revisão (use o agente code-review)

Use o agente **code-review** para revisar **todos os arquivos criados** nesta feature:
- Passe a lista completa de arquivos novos e modificados (incluindo `.yaml` e arquivos `.test.ts`)
- Corrija imediatamente qualquer problema apontado pelo revisor
- Preste atenção especial aos itens de cobertura de testes e E2E

### Etapa 7 — Documentação no Confluence

Use o agente **confluence-docs** para cada tela criada ou modificada na feature:
- Cria ou atualiza a página da tela em "Documentação de tela geral" (filha de `2457601`)
- Execute uma chamada por tela — o agente decide se cria ou atualiza

### Etapa 8 — Resumo final

Apresente ao usuário:
- Lista de todos os arquivos criados (código, testes unitários, E2E)
- Lista de todos os arquivos modificados
- Páginas do Confluence criadas/atualizadas com links diretos
- Próximos passos: registrar no RootNavigator (se necessário), rodar `npm test` e `npm run e2e:test`
