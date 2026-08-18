# Nega Nagô — Protótipo de agendamento

Protótipo navegável de baixa fidelidade para validar o fluxo de agendamento.

**Ver online:** https://erickremember20-bot.github.io/nega-nago/

## Fluxo

1. **Home** — escolha da trança (13 categorias, com a duração estimada) +
   carrossel com fotos de trabalhos
2. **Produto** — tamanho/modelo com preço e tempo + adicional de cachos (+R$ 50)
3. **Agendamento** — Estúdio ou domicílio, data, período, duração e total

Ao finalizar, abre o WhatsApp com a mensagem já montada (serviço, tamanho,
valor, duração estimada, local, data, período e total).

## Antes de usar de verdade

Trocar o número no topo do `<script>` em `index.html`:

```js
var WHATSAPP_NUMBER = '55XXXXXXXXXXX'; // país + DDD + número, só dígitos
```

Os quadrados cinza são placeholders — as fotos das tranças entram depois.

Para as 6 fotos do carrossel da home, preencher `src` em `FOTOS`
(no `<script>`). Use proporção **3:4** — 900 × 1200 px é um bom tamanho:

```js
var FOTOS = [
  { src: 'fotos/box-braids.jpg', alt: 'Box braids feitas no estúdio' },
  ...
];
```

## Publicação

Arquivo único, sem build e sem dependências. Servido pelo GitHub Pages a
partir do branch `main`.

## Breakpoints

Duas versões desenhadas, no mesmo arquivo:

| | Largura de referência | Layout |
|---|---|---|
| **Mobile** | 360 px | coluna única; grid de 3; carrossel com 1,5 foto |
| **Desktop** | 1400 px | hero + cards ao lado; grid de 5; carrossel com 4 |

A virada acontece em `min-width: 1024px`. No desktop, produto e agendamento
passam a duas colunas (foto | escolha, e calendário | resumo).

Para exportar para o Figma, abrir o navegador exatamente em **360** ou
**1400** de largura e capturar a página inteira.
