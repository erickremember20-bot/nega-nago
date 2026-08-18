# Nega Nagô — Protótipo de agendamento

Protótipo navegável de baixa fidelidade para validar o fluxo de agendamento.

**Ver online:** https://erickremember20-bot.github.io/nega-nago/

## Fluxo

1. **Home** — escolha da trança (13 categorias, com a duração estimada)
2. **Produto** — tamanho/modelo com preço e tempo + adicional de cachos (+R$ 50)
3. **Agendamento** — Estúdio ou domicílio, data, período, duração e total

Ao finalizar, abre o WhatsApp com a mensagem já montada (serviço, tamanho,
valor, duração estimada, local, data, período e total).

## Pendências de conteúdo

- **Masculino / Barrel twist** — sem tempo informado; aparece como
  "Tempo a combinar".
- **Masculino / Box braids** — há tempo (5 a 7 horas) mas não há preço, então
  a opção ainda não existe no app.

## Antes de usar de verdade

Trocar o número no topo do `<script>` em `index.html`:

```js
var WHATSAPP_NUMBER = '55XXXXXXXXXXX'; // país + DDD + número, só dígitos
```

Os quadrados cinza são placeholders — as fotos das tranças entram depois.

## Publicação

Arquivo único, sem build e sem dependências. Servido pelo GitHub Pages a
partir do branch `main`.
