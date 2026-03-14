# Prompt — Descrição de Pull Request

## Contexto

Você vai gerar a descrição de um PR do projeto GymFlow a partir do diff ou resumo das mudanças.

---

## Formato de saída

```markdown
## O que foi feito
<!-- Uma linha clara do objetivo. Ex: "Adiciona tela de detalhe da academia com nível de lotação" -->

## Como foi implementado
<!-- Decisões técnicas relevantes. O que foi criado/modificado e por quê dessa forma.
     Não precisa listar todos os arquivos — foque nas decisões não óbvias. -->

## Evidência funcionando
<!-- Screenshots, gravação de tela ou descrição do fluxo testado manualmente.
     Para changes de infraestrutura, cole o output dos testes/lint. -->

## Checklist
- [ ] Testes unitários adicionados/atualizados
- [ ] Lint e typecheck passando (`npm run lint && npx tsc --noEmit`)
- [ ] Strings novas adicionadas em `pt-BR.ts` e `en-US.ts`
- [ ] Documentação atualizada (se adicionou feature, regra de negócio ou padrão novo)
- [ ] Nenhum valor hardcoded — apenas tokens de `src/tokens/`
- [ ] UI burra: componentes só renderizam o que recebem

## Relacionado
<!-- Ticket: GYM-XX -->
<!-- BR afetados: BR-XXX (se aplicável) -->
```

---

## Input

Forneça um dos seguintes:

**Opção A — diff do git:**
```
{{ git diff main...HEAD }}
```

**Opção B — resumo das mudanças:**
```
Branch: {{ feat/GYM-XX }}
O que foi feito: {{ descrição livre }}
Arquivos principais alterados: {{ lista }}
```

---

## Instruções ao modelo

- Título do PR: máximo 70 caracteres, imperativo, sem ponto final
  - ✅ `Add gym detail screen with occupancy badge`
  - ❌ `Adicionando a tela de detalhe com badge de lotação.`
- Seção "Como foi implementado": foque em **decisões**, não em lista de arquivos
- Seção "Evidência": se não tiver screenshot, descreva o fluxo testado
- Checklist: marque apenas o que foi feito de fato — não marque automaticamente tudo
- Não invente informações que não estão no diff ou no resumo fornecido
