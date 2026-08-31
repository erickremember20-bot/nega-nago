# Página de case — Nega Nagô

Uma página só, sem framework e sem dependência externa. Publica em
`https://<usuario>.github.io/nega-nago/case/`.

```
case/
  index.html          a página inteira (HTML, CSS e JS no mesmo arquivo)
  fontes/             Inter, servida daqui — nada de Google Fonts em produção
  midia/              imagens
  LEIA-ME.md          este arquivo
```

## O que falta você colocar

A página tem quatro espaços marcados com borda tracejada. Cada um mostra na
tela o nome do arquivo e o tamanho esperado. Basta salvar o arquivo em
`midia/` com o nome indicado e trocar o bloco `<div class="slot">` por uma
`<img>` ou `<video>`.

| Onde | Arquivo | Tamanho | O que é |
|---|---|---|---|
| 01 · O problema | `midia/antes-tabela.webp` | ~1200 × 1600 | **O mais importante.** O print original da tabela no WhatsApp. É o "antes" de verdade, e é o que falta na maioria dos cases. Corte os dados pessoais. |
| 05 · Design system | `midia/componentes.mp4` | 1200 × 675, ~6 s em loop | Gravação curta percorrendo default → hover → pressed → disabled no botão, no chip e na linha de opção. |
| Ver mais | `midia/proj-2.webp` | 1200 × 750 | Capa do segundo projeto. |
| Ver mais | `midia/proj-3.webp` | 1200 × 750 | Capa do terceiro projeto. |

Para o vídeo, use:

```html
<video src="midia/componentes.mp4" autoplay muted loop playsinline
       width="1200" height="675" style="width:100%;border-radius:12px"></video>
```

## Dois trechos para você conferir

Escrevi a partir do que está no código e do que apurei durante o projeto.
Dois pontos merecem a sua revisão porque dependem da sua memória da pesquisa,
não do repositório:

- **Seção 04, legenda da mensagem.** Está escrito que a última linha oferece a
  foto do cabelo solto "que a trancista precisa ver para estimar o trabalho".
  Se essa era mesmo a primeira pergunta da Maiara em toda conversa, vale
  escrever isso — fica mais forte, mas só se for verdade.
- **Seção 04, "o vocabulário é o dela".** Usei a palavra *coroa*, que está no
  código. Se você tiver mais exemplos do vocabulário dela que entraram nas
  telas, acrescente: é um dos argumentos mais fortes da página.

## Idioma

Português e inglês na mesma página. O botão PT/EN no topo troca em tempo real,
guarda a escolha no `localStorage` e, na primeira visita, segue o idioma do
navegador. O texto de cada idioma vive em elementos com `lang="pt"` e
`lang="en"` — para editar uma frase, edite os dois.

## Tema

A página respeita o tema do sistema. Toda cor está em custom property, com o
bloco escuro redefinindo só os tokens. Se quiser travar no claro, coloque
`data-tema="claro"` no `<html>`.

## Testar antes de publicar

`file://` bloqueia o carregamento da fonte por CORS. Suba um servidor local:

```bash
cd nega-nago && python3 -m http.server 8765
# http://127.0.0.1:8765/case/
```
