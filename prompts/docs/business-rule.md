# Prompt — Documentar Regra de Negócio (BR-XXX)

## Contexto

Você vai gerar documentação de regra de negócio no formato **BR-XXX** do projeto GymFlow a partir do código de uma feature.

---

## Formato de saída

```markdown
# BR-XXX — Nome da Regra

## Descrição
Uma frase clara do que essa regra define ou garante.

## Contexto
Por que essa regra existe. Qual problema ela resolve para o usuário ou para o negócio.

## Comportamento

### Pré-condições
- O que precisa ser verdade antes desta regra ser aplicada

### Fluxo principal
1. Passo a passo do que acontece quando a regra é executada normalmente

### Fluxo alternativo
- Cenário A: o que acontece quando [condição alternativa]
- Cenário B: ...

### Exceções / erros
- Condição → mensagem ou comportamento esperado

## Regras de validação
| Campo | Regra | Erro |
|-------|-------|------|
| campo | condição | mensagem ao usuário |

## Impacto em outras regras
- Lista de outros BR que esta regra afeta ou depende

## Rastreabilidade
| Artefato | Local no código |
|----------|----------------|
| Use Case | `src/domain/useCases/NomeUseCase.ts` |
| Repository | `src/data/repositories/NomeRepository.ts` |
| ViewModel | `src/presentation/viewModels/useNomeViewModel.ts` |
| Tela | `src/presentation/screens/NomeScreen.tsx` |
```

---

## Input

Cole o código da feature (use case, repository, viewModel e/ou tela):

```
{{ código }}
```

Informe o número do BR se já definido (ex: BR-003), ou deixe como BR-XXX para ser preenchido depois.

---

## Exemplo testado — Feature de check-in de lotação

**Input (use case simulado):**
```ts
// CheckinOccupancyUseCase.ts
export class CheckinOccupancyUseCase {
  constructor(private repo: GymRepository) {}

  async execute(gymId: string, level: OccupancyLevel): Promise<void> {
    if (!gymId) throw new Error('gymId obrigatório');
    if (!['empty', 'moderate', 'busy', 'packed'].includes(level)) {
      throw new Error('Nível de lotação inválido');
    }
    await this.repo.updateOccupancy(gymId, level);
  }
}
```

**Output:**
```markdown
# BR-001 — Registro de Lotação de Academia

## Descrição
Permite que um usuário registre o nível de lotação atual de uma academia.

## Contexto
Usuários precisam saber se uma academia está cheia antes de se deslocar.
O check-in de lotação é colaborativo: qualquer usuário pode atualizar.

## Comportamento

### Pré-condições
- Usuário autenticado
- Academia com `gymId` existente no sistema

### Fluxo principal
1. Usuário seleciona o nível de lotação (vazio / moderado / cheio / lotado)
2. Sistema valida o `gymId` e o nível informado
3. Sistema persiste o novo nível via `GymRepository.updateOccupancy`
4. UI atualiza o badge de lotação em tempo real

### Exceções / erros
- `gymId` vazio → erro: "gymId obrigatório"
- Nível inválido → erro: "Nível de lotação inválido"

## Regras de validação
| Campo | Regra | Erro |
|-------|-------|------|
| gymId | string não vazia | "gymId obrigatório" |
| level | um de: empty, moderate, busy, packed | "Nível de lotação inválido" |

## Rastreabilidade
| Artefato | Local |
|----------|-------|
| Use Case | `src/domain/useCases/CheckinOccupancyUseCase.ts` |
| Repository | `src/data/repositories/GymRepository.ts` |
| Store | `src/store/useGymStore.ts` (setOccupancy) |
```
