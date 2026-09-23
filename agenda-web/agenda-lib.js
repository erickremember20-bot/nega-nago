/* agenda-lib.js — mesma regra do PHP e da Netlify Function, para o navegador. */
(function(){
/* Regra: o que está OCUPADO na Google Agenda fica FECHADO no site; o resto é aberto.
 * Para cada dia da janela, a manhã (06–12) abre se nenhum evento a tocar; a tarde
 * (12–18) idem. Períodos de hoje que já passaram ficam fechados.
 * Todo cálculo usa o fuso tz — nunca o fuso do servidor (a Netlify roda em UTC). */
function periodosAbertos(busy, tz, dias = 90) {
  const blocos = busy.filter(b => b.start && b.end)
    .map(b => [new Date(b.start).getTime(), new Date(b.end).getTime()]);
  const agora = Date.now();
  let d = dataISO(new Date(), tz);
  const out = {};
  for (let i = 0; i < dias; i++) {
    const [y, m, day] = d.split('-').map(Number);
    const p = [];
    for (const [nome, h1, h2] of [['manha', 6, 12], ['tarde', 12, 18]]) {
      const ini = zonedTimeToUtc(y, m, day, h1, 0, 0, tz).getTime();
      const fim = zonedTimeToUtc(y, m, day, h2, 0, 0, tz).getTime();
      if (fim <= agora) continue;
      if (!blocos.some(([bs, be]) => bs < fim && be > ini)) p.push(nome);
    }
    if (p.length) out[d] = p;
    d = proximoDiaISO(d);
  }
  return out;
}
function dataISO(date, tz) { return date.toLocaleDateString('en-CA', { timeZone: tz }); }
function proximoDiaISO(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
}
function zonedTimeToUtc(y, m, d, hh, mi, ss, tz) {
  const comoSeFosseUTC = Date.UTC(y, m - 1, d, hh, mi, ss);
  const partes = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(new Date(comoSeFosseUTC)).map(p => [p.type, p.value]));
  const lido = Date.UTC(Number(partes.year), Number(partes.month) - 1, Number(partes.day),
    Number(partes.hour) % 24, Number(partes.minute), Number(partes.second));
  return new Date(comoSeFosseUTC + (comoSeFosseUTC - lido));
}

window.NNAgendaLib = { periodosAbertos: periodosAbertos };
})();
