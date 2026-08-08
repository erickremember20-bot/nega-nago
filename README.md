# Nega Nagô — Protótipo de agendamento

Protótipo navegável de baixa fidelidade para validar o fluxo de agendamento.

**Ver online:** https://erickremember20-bot.github.io/nega-nago/

## Fluxo

1. **Home** — escolha da trança (12 categorias)
2. **Produto** — tamanho/modelo com preço + adicional de cachos (+R$ 50)
3. **Agendamento** — Estúdio ou domicílio, data, período e total estimado

Ao finalizar, abre o WhatsApp com a mensagem já montada (serviço, tamanho,
valor, local, data, período e total).

## Antes de usar de verdade

Trocar o número no topo do `<script>` em `index.html`:

```js
var WHATSAPP_NUMBER = '55XXXXXXXXXXX'; // país + DDD + número, só dígitos
```

Os quadrados cinza são placeholders — as fotos das tranças entram depois.

## Publicação

Arquivo único, sem build e sem dependências. Servido pelo GitHub Pages a
partir do branch `main`.
