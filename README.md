# gymflow

## Testes

### Unitario (Jest + React Native Testing Library)

1. Instale dependencias:
	- `npm install`
2. Rode os testes:
	- `npm run test`
3. Rode cobertura:
	- `npm run test:coverage`

### E2E (Maestro)

1. Instale o Maestro CLI (macOS):
	- `curl -Ls 'https://get.maestro.mobile.dev' | bash`
2. Garanta que o CLI esta no PATH da sessao atual:
	- `export PATH="$HOME/.maestro/bin:$PATH"`
3. Inicie o app no simulador/emulador:
	- iOS: `npm run ios`
	- Android: `npm run android`
4. Em outro terminal, execute os fluxos:
	- Todos: `npm run e2e:test`
	- Onboarding: `maestro test .maestro/onboarding.yaml`
	- Check-in: `maestro test .maestro/checkin.yaml`

### Estado atual dos fluxos E2E

Os fluxos em `.maestro/` estao em modo scaffold para preparar a automacao.
As etapas reais de login, selecao de academia e check-in dependem da implementacao das telas e de `testID` nos elementos interativos.
