/**
 * Monta um sprite SVG a partir de assets/icones/ e injeta em index.html
 * entre os marcadores <!--ICONES--> e <!--/ICONES-->.
 *
 * Os ícones de UI viram currentColor, para herdarem a cor do estado
 * (o sol fica escuro no chip selecionado e apagado no desabilitado).
 * Os do catálogo são multicoloridos e ficam como vieram do Figma.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = dirname(fileURLToPath(import.meta.url));
const base = resolve(raiz, 'assets/icones');

// nome do arquivo -> id no sprite
const ID = {
  'ui/Sun': 'sun', 'ui/SunHorizon': 'sun-horizon', 'ui/Crown': 'crown',
  'ui/MapPin': 'map-pin', 'ui/CalendarCheck': 'calendar', 'ui/Clock': 'clock',
  'ui/HandCoins': 'hand-coins', 'ui/CheckSquare': 'check-square',
  'ui/InstagramLogo': 'instagram', 'ui/ListChecks': 'list-checks',
  'ui/pix-svgrepo-com 1': 'pix', 'ui/credit-card-svgrepo-com 1': 'credit-card',
};
const slug = (p) => {
  if (ID[p]) return ID[p];
  const [pasta, arq] = p.split('/');
  const limpo = arq.replace(/^(masculino|crochet|remocao)_/, '');
  return `${pasta}-${limpo}`;
};

const simbolos = [];
const achados = [];
for (const pasta of readdirSync(base, { withFileTypes: true })) {
  if (!pasta.isDirectory()) continue;
  for (const arq of readdirSync(resolve(base, pasta.name))) {
    if (!arq.endsWith('.svg')) continue;
    const chave = `${pasta.name}/${basename(arq, '.svg')}`;
    let svg = readFileSync(resolve(base, pasta.name, arq), 'utf8');
    const vb = (svg.match(/viewBox="([^"]+)"/) || [, '0 0 24 24'])[1];
    let inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
    if (pasta.name === 'ui') {
      // monocromático: a cor passa a vir de quem usa
      inner = inner.replace(/fill="#[0-9a-fA-F]{3,8}"/g, 'fill="currentColor"');
    }
    const id = slug(chave);
    simbolos.push(`<symbol id="i-${id}" viewBox="${vb}">${inner}</symbol>`);
    achados.push(`${chave} → #i-${id}`);
  }
}

const sprite = `<svg class="sprite" aria-hidden="true" focusable="false">${simbolos.join('')}</svg>`;
const alvo = resolve(raiz, 'index.html');
let html = readFileSync(alvo, 'utf8');
const marca = /<!--ICONES-->[\s\S]*?<!--\/ICONES-->/;
if (!marca.test(html)) { console.error('marcadores <!--ICONES--> não encontrados'); process.exit(1); }
html = html.replace(marca, `<!--ICONES-->${sprite}<!--/ICONES-->`);
writeFileSync(alvo, html, 'utf8');

console.log(`${simbolos.length} ícones no sprite (${(sprite.length/1024).toFixed(0)} KB)`);
achados.sort().forEach(l => console.log('  ' + l));
