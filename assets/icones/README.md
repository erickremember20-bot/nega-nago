# Ícones — Nega Nagô

Sobe os SVG aqui. Os nomes das pastas e dos arquivos espelham os nomes dos
seus nós no Figma (`icon/tamanho/chanel` → `tamanho/chanel.svg`), então é
só seguir a lista.

Hoje o protótipo usa desenhos equivalentes que eu fiz à mão. Assim que os
seus chegarem, eu troco todos e a fidelidade fica completa.

---

## Como exportar do Figma (uma vez só, em lote)

1. Abre a página **Nega Nagô - Prototype to code**
2. No painel de camadas, seleciona os 16 ícones do frame **Biblioteca de
   ícones** — clica no primeiro e `Shift` + clique no último
3. Painel da direita, embaixo, seção **Export** → `+`
4. Escolhe **SVG** no formato
5. **Export 16 layers**

O Figma já salva cada arquivo com o nome do nó, então eles saem prontos:
`icon/tamanho/chanel.svg` etc. Se o seu Figma salvar com barras no nome em
vez de criar pastas, é só arrastar cada um para a pasta certa aqui.

> **Alternativa rápida para um ícone só:** seleciona a camada e
> `Ctrl/Cmd + Shift + C` (Copy as SVG), cola num arquivo de texto e salva
> com a extensão `.svg`.

---

## 1. `tamanho/` — os 5 comprimentos

Aparecem na **página da trança**, um em cada linha de tamanho.

| Arquivo | Rótulo no Figma |
|---|---|
| `chanel.svg` | Chanel |
| `long-bob.svg` | Long bob |
| `meio-das-costas.svg` | Meio das costas |
| `quadril.svg` | Quadril |
| `abaixo-do-quadril.svg` | Abaixo do quadril |

## 2. `local/` — onde o atendimento acontece

Aparecem no **agendamento**, em "Onde vai ser?".

| Arquivo | Rótulo |
|---|---|
| `estudio.svg` | Estúdio |
| `domicilio.svg` | A domicílio |

## 3. `modelo/` — modelo de fio (crochet)

| Arquivo | Rótulo |
|---|---|
| `trancas.svg` | Tranças |
| `twist.svg` | Twist |
| `dreads.svg` | Dreads |
| `cabelo-organico.svg` | Cabelo orgânico |

## 4. `masculino/` — modelo masculino

| Arquivo | Rótulo |
|---|---|
| `nago.svg` | Nagô |
| `twist.svg` | Twist |
| `barrel-twist.svg` | Barrel twist |

## 5. `remocao/` — remoção

| Arquivo | Rótulo |
|---|---|
| `nago.svg` | Nagô |
| `box-braids.svg` | Box braids |

---

## 6. `ui/` — os ícones de interface

Estes não estão na Biblioteca; estão soltos nas telas. Os nomes entre
parênteses são os nomes dos nós no seu arquivo.

| Arquivo | Nó no Figma | Onde aparece |
|---|---|---|
| `crown.svg` | `Crown` | "Qual vai ser a coroa da vez?" |
| `instagram.svg` | `InstagramLogo` | "Coroas que já saíram daqui" |
| `whatsapp.svg` | `whatsapp-icon` | aviso "Como agendar pelo Zap" |
| `list-checks.svg` | `ListChecks` | aviso "Regrinhas de agendamento" |
| `map-pin.svg` | `MapPin` | "Bora agendar" e "Onde vai ser?" |
| `calendar-check.svg` | `CalendarCheck` | "Escolha o dia" |
| `clock.svg` | `Clock` | "Período" |
| `hand-coins.svg` | `HandCoins` | "Forma de pagamento" |
| `check-square.svg` | `CheckSquare` | "Resumo do agendamento" |
| `sun.svg` | `Sun` | chip "Manhã" |
| `sun-horizon.svg` | `SunHorizon` | chip "Tarde" |
| `pix.svg` | `pix-svgrepo-com` | chip "PIX" |
| `credit-card.svg` | `credit-card-svgrepo-com` | chip "Cartão de Crédito" |
| `close.svg` | o "✕" dos overlays | fechar overlay |
| `chevron-left.svg` | `button/cal-nav` anterior | mês anterior |
| `chevron-right.svg` | `button/cal-nav` próximo | mês seguinte |

---

## Sobre a cor

**Manda como está, não precisa ajustar cor.** Eu troco o preenchimento por
`currentColor` na hora de aplicar, e aí cada ícone herda a cor certa do
lugar onde está — por exemplo, o `sun.svg` fica `#290200` no chip
selecionado e `#b5a696` quando o chip está desabilitado. Se vierem com cor
fixa, o estado desabilitado não funcionaria.

Os da Biblioteca (`tamanho/`, `local/`, `modelo/`, `masculino/`,
`remocao/`) são multicoloridos — fundo, massa e apoio. Nesses eu preservo
as três cores e só normalizo o tamanho.

## Faltou algum?

Se você exportar algo que não está nesta lista, sobe assim mesmo e me
avisa o nome. É mais fácil eu encaixar do que você adivinhar onde entra.
