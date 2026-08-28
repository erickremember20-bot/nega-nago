# Assets — Nega Nagô

Estrutura atual, já com o que você subiu organizado.
Se algum arquivo faltar, a tela mostra um degradê da marca no lugar — **não quebra**.

---

## ✅ Já no lugar

### `logo/logo.svg`
Lockup horizontal. É o único elemento de marca no topo — o texto
"NEGA NAGÔ / TRANÇAS AFRO" só aparece se o SVG não carregar.

### `home/hero.png` — 850 × 360
Foto grande do topo da Home, atrás do "+13 anos trançando histórias".

### `estilos/` — 13 miniaturas, 300 × 300 (1:1)
A grade "Qual vai ser a coroa da vez?".

### `produto/` — 13 × 2 recortes
A foto do topo da página da trança, em dois cortes:

| Sufixo | Tamanho | Quando aparece |
|---|---|---|
| `-mobile.png` | 860 × 367 (deitada) | telas abaixo de 900px |
| `-desktop.png` | 624 × 560 | telas de 900px pra cima |

O HTML troca sozinho com `<picture>` — cada tela pega o corte pensado pra ela.

**Os 13 nomes** (valem para `estilos/` e `produto/`):

`box-braids` · `fulani` · `knotles` · `nago-desenhada` · `nago-tiara` ·
`rabo-de-cavalo` · `ghanna` · `boxeadora` · `twist-braids` ·
`mohawk-braids` · `masculino` · `crochet-braids` · `remocao`

---

## ⏳ Ainda falta

### `galeria/` — 6 fotos, proporção 3:4 (em pé)

O carrossel "Coroas que já saíram daqui", que passa sozinho.
Mínimo 750 × 1000.

| Arquivo |
|---|
| `01.png` |
| `02.png` |
| `03.png` |
| `04.png` |
| `05.png` |
| `06.png` |

**Enquanto não tiver nenhuma, a seção inteira fica escondida** — assim
quem testar o protótipo não vê seis caixas vazias. Assim que subir as
fotos, ela reaparece sozinha.

Link direto pra subir:
https://github.com/erickremember20-bot/nega-nago/upload/main/assets/galeria

---

## ⚠️ Peso

As imagens estão em PNG e somam **15 MB**. Cada miniatura tem ~150 KB
e cada foto de produto ~500 KB, então só a Home carrega uns 2,4 MB.

Num 4G isso é uns 8 segundos de espera antes de a primeira trança
aparecer. Convertendo para WebP na mesma qualidade, cai para algo
perto de 1,5 MB no total — a Home ficaria em menos de 300 KB.

Vale fazer antes de mandar o link pra alguém testar.
