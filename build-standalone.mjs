/**
 * Gera nega-nago-completo.html: o mesmo protótipo com todas as imagens
 * embutidas em base64, para o arquivo funcionar sozinho, sem a pasta assets/.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = dirname(fileURLToPath(import.meta.url));
let html = readFileSync(resolve(raiz, 'index.html'), 'utf8');

const MIME = { webp:'image/webp', svg:'image/svg+xml', png:'image/png', jpg:'image/jpeg', woff2:'font/woff2' };
const cache = new Map();
const dataURI = (rel) => {
  if (cache.has(rel)) return cache.get(rel);
  const abs = resolve(raiz, rel);
  if (!existsSync(abs)) { console.warn('  ! não achei', rel); return null; }
  const ext = rel.split('.').pop().toLowerCase();
  const uri = `data:${MIME[ext] || 'application/octet-stream'};base64,${readFileSync(abs).toString('base64')}`;
  cache.set(rel, uri);
  return uri;
};

// 1. caminhos literais no HTML: src="assets/..."
// só caminhos completos, com extensão — os prefixos montados no JS ficam para a etapa 2
html = html.replace(/(["'])(assets\/[^"']+\.(?:webp|svg|png|jpe?g|woff2))\1/g, (m, q, rel) => {
  const uri = dataURI(rel);
  return uri ? `${q}${uri}${q}` : m;
});

// 2. caminhos montados no JS: 'assets/estilos/' + e.id + '.webp'
//    vira uma tabela ASSETS consultada por chave
const tabela = {};
const add = (chave, rel) => { const u = dataURI(rel); if (u) tabela[chave] = u; };
const IDS = [...html.matchAll(/id:'([a-z-]+)'/g)].map(m => m[1]);
for (const id of IDS) {
  add('estilos/' + id, `assets/estilos/${id}.webp`);
  add('produto/' + id + '-mobile', `assets/produto/${id}-mobile.webp`);
  add('produto/' + id + '-desktop', `assets/produto/${id}-desktop.webp`);
}
for (const n of ['01','02','03','04','05','06']) add('galeria/' + n, `assets/galeria/${n}.webp`);

html = html.replace(
  "var st = { styleId:null",
  `var ASSETS = ${JSON.stringify(tabela)};\nfunction A(k){ return ASSETS[k] || ''; }\n\nvar st = { styleId:null`
);
html = html.replace(/'assets\/produto\/' \+ e\.id \+ '-desktop\.webp'/g, "A('produto/'+e.id+'-desktop')");
html = html.replace(/'assets\/produto\/' \+ e\.id \+ '-mobile\.webp'/g, "A('produto/'+e.id+'-mobile')");
// dentro de template de string HTML: src="assets/estilos/' + e.id + '.webp"
html = html.replace(/src="assets\/estilos\/' \+ e\.id \+ '\.webp"/g, `src="' + A('estilos/'+e.id) + '"`);
html = html.replace(/src="assets\/galeria\/' \+ n \+ '\.webp"/g, `src="' + A('galeria/'+n) + '"`);

const sobrou = html.match(/assets\//g);
if (sobrou) console.warn(`  ! ${sobrou.length} referência(s) a assets/ ainda no arquivo`);

const saida = resolve(raiz, 'nega-nago-completo.html');
writeFileSync(saida, html, 'utf8');
console.log(`${IDS.length} tranças · ${cache.size} arquivos embutidos · ${(html.length/1024/1024).toFixed(1)} MB`);
