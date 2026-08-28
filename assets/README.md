# Assets — Nega Nagô

Estrutura atual, já com o que você subiu organizado.
Se algum arquivo faltar, a tela mostra um degradê da marca no lugar — **não quebra**.

---

## ✅ Já no lugar

### `logo/logo.svg`
Lockup horizontal. É o único elemento de marca no topo — o texto
"NEGA NAGÔ / TRANÇAS AFRO" só aparece se o SVG não carregar.

### `home/hero.webp` — 850 × 360
Foto grande do topo da Home, atrás do "+13 anos trançando histórias".

### `estilos/` — 13 miniaturas, 300 × 300 (1:1)
A grade "Qual vai ser a coroa da vez?".

### `produto/` — 13 × 2 recortes
A foto do topo da página da trança, em dois cortes:

| Sufixo | Tamanho | Quando aparece |
|---|---|---|
| `-mobile.webp` | 860 × 367 (deitada) | telas abaixo de 900px |
| `-desktop.webp` | 624 × 560 | telas de 900px pra cima |

O HTML troca sozinho com `<picture>` — cada tela pega o corte pensado pra ela.

**Os 13 nomes** (valem para `estilos/` e `produto/`):

`box-braids` · `fulani` · `knotles` · `nago-desenhada` · `nago-tiara` ·
`rabo-de-cavalo` · `ghanna` · `boxeadora` · `twist-braids` ·
`mohawk-braids` · `masculino` · `crochet-braids` · `remocao`

---

### `galeria/` — 6 fotos, 375 × 500 (3:4)
O carrossel "Coroas que já saíram daqui", que passa sozinho a cada 3,8s,
pausa no toque e volta a andar em 3s. Arquivos `01.webp` a `06.webp`.

Se um dia não houver nenhuma foto na pasta, a seção se esconde sozinha
em vez de mostrar seis caixas vazias.

Para trocar ou acrescentar:
https://github.com/erickremember20-bot/nega-nago/upload/main/assets/galeria

---

## Formato: WebP

Todas as fotos estão em **WebP**, convertidas dos PNG originais
(que seguem no histórico do Git, caso precise voltar atrás).

| | antes | depois |
|---|---|---|
| pasta `assets/` | 17 MB | 1,9 MB |
| a Home carrega | 4,1 MB | 617 KB |
| espera no 4G | ~7 s | ~1 s |

Qualidade: **92** nas fotos grandes (galeria, produto, hero) e **82**
nas miniaturas de 101px. A diferença medida contra o original ficou
em 40 dB de PSNR nas fotos grandes — imperceptível a olho.

**Se for subir foto nova:** manda o PNG ou JPG normal que eu converto.
Ou, se preferir fazer sozinho, use WebP qualidade 90.
