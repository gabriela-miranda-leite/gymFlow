# Testing Guide

## Stack de testes

- Jest
- jest-expo
- React Native Testing Library
- @testing-library/jest-native
- Maestro (E2E)

## Configuracao atual

- Arquivo de config: jest.config.js
- Preset: jest-expo
- Setup global: src/shared/tests/setupTests.ts
- Cobertura minima global: 70% para branches, functions, lines e statements

## Estrategia unitario

Padrao de pastas definido para testes unitarios:

- hooks: src/hooks/__tests__/
- utils: src/utils/__tests__/

Observacao para a arquitetura atual:

- Se o codigo estiver em src/shared/hooks ou src/shared/utils, mantenha o teste proximo da feature em __tests__ dentro da mesma area ou siga o padrao acima conforme evolucao da base.

## Template AAA (arrange / act / assert)

Template base criado em:

- src/hooks/__tests__/unit-test.template.ts
- src/utils/__tests__/unit-test.template.ts

Exemplo:

```ts
describe('featureName', () => {
  it('should do something', () => {
    // Arrange: organize dados e dependencias do caso de teste.
    const input = 1;

    // Act: execute a acao principal que voce quer validar.
    const result = input + 1;

    // Assert: valide o resultado esperado e efeitos colaterais.
    expect(result).toBe(2);
  });
});
```

## Modulos com cobertura obrigatoria

Os modulos abaixo devem ser priorizados na cobertura:

- src/domain/useCases
- src/domain/models
- src/shared/utils
- src/shared/hooks
- src/presentation/viewModels
- src/data/repositories

## Snapshot

O ambiente de snapshot esta habilitado via Jest.
Neste ticket nao foi criado snapshot artificial.
Novos snapshots devem ser criados apenas para componentes reais de produto.

## E2E com Maestro

Fluxos scaffold criados:

- .maestro/onboarding.yaml
- .maestro/checkin.yaml

Convencao recomendada para testID:

- feature-element-action
- exemplos: onboarding-start-button, login-submit-button, checkin-submit-button

Sem os testIDs reais na UI, os passos de fluxo final permanecem comentados no YAML.
