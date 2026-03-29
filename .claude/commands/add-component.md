# /add-component

Atalho para criar um novo componente UI no GymFlow. Coleta as informações necessárias e invoca o agente create-component.

## Input

$ARGUMENTS

Formato esperado (todos opcionais — o que não for passado será perguntado):
```
Nome: NomeDoComponente
Descrição: o que exibe e qual responsabilidade
Props: lista com tipos
Variantes: ex: size: 'sm' | 'md' | 'lg' | nenhuma
Estados: ex: loading, disabled, selected | nenhum
```

## Fluxo

### Coleta de informações

Se o input não contiver todas as informações, pergunte:
1. **Nome** do componente (PascalCase)
2. **Descrição**: o que ele exibe e qual é sua responsabilidade
3. **Props**: lista com nome e tipo de cada prop
4. **Variantes**: variações visuais (ou "nenhuma")
5. **Estados**: loading, disabled, selected, etc. (ou "nenhum")

### Verificação de duplicatas

Antes de criar, verifique se já existe um componente com nome similar em `src/presentation/components/`. Se encontrar, apresente ao usuário e confirme se quer criar um novo ou modificar o existente.

### Criação

Use o agente **create-component** com as informações coletadas.

### Pós-criação

Após a criação, informe:
- Localização: `src/presentation/components/NomeDoComponente/`
- Como importar: `import { NomeDoComponente } from '@/presentation/components'`
- Próximos passos: rodar `npm test` e verificar no Storybook
