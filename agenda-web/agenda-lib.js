/* agenda-lib.js — versão para o navegador da mesma regra usada no PHP e na Netlify Function. */
(function(){
/* Lógica pura (mesma regra do agenda-lib.php): converte blocos livre/ocupado
 * do Google em dias/períodos abertos. Todo cálculo de dia/hora é feito no
 * fuso horário indicado (tz), nunca no fuso do servidor onde o código roda
 * — importante porque a Netlify Function roda em UTC, não em São Paulo.
 *
 * Regra: bloco toca 06:00–12:00 => "manha"; toca 12:00–18:00 => "tarde";
 * dia inteiro abre os dois.
 */
function periodosAbertos(busy, tz) {
  const dias = {};
  for (const b of busy) {
    if (!b.start || !b.end) continue;
    const ini = new Date(b.start), fim = new Date(b.end);
    if (!(fim > ini)) continue;

    let d = dataISO(ini, tz);
    const ultimo = dataISO(fim, tz);
    let guard = 0;
    while (guard++ < 400) {                       // trava de segurança contra loop infinito
      const [y, m, day] = d.split('-').map(Number);
      const diaIni = zonedTimeToUtc(y, m, day, 0, 0, 0, tz);
      const diaFim = zonedTimeToUtc(y, m, day, 23, 59, 59, tz);
      const blocoIni = ini > diaIni ? ini : diaIni;
      const blocoFim = fim < diaFim ? fim : diaFim;
      if (blocoFim > blocoIni) {
        const h1 = horaLocal(blocoIni, tz), h2 = horaLocal(blocoFim, tz);
        const set = dias[d] || {};
        if (h1 < 12 && h2 > 6) set.manha = true;
        if (h1 < 18 && h2 > 12) set.tarde = true;
        if (h1 <= 0 && h2 >= 23.9) { set.manha = true; set.tarde = true; }
        if (set.manha || set.tarde) dias[d] = set;
      }
      if (d === ultimo) break;
      d = proximoDiaISO(d);
    }
  }
  const out = {};
  for (const d of Object.keys(dias).sort()) {
    const p = [];
    if (dias[d].manha) p.push('manha');
    if (dias[d].tarde) p.push('tarde');
    out[d] = p;
  }
  return out;
}

/** Hora local (0–23.99) de um instante, no fuso tz — não depende do fuso do servidor. */
function horaLocal(date, tz) {
  const s = date.toLocaleString('en-US', { timeZone: tz, hour12: false, hour: '2-digit', minute: '2-digit' });
  const [h, mi] = s.split(':').map(Number);
  return (h % 24) + mi / 60;
}
/** Data (YYYY-MM-DD) de um instante, no fuso tz. */
function dataISO(date, tz) {
  return date.toLocaleDateString('en-CA', { timeZone: tz });
}
function proximoDiaISO(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
}
/** Converte um horário de parede (Y/M/D H:M:S) NO FUSO tz para o instante UTC
 *  correspondente. Não usa nenhuma lib de fuso — só ida-e-volta via Intl. */
function zonedTimeToUtc(y, m, d, hh, mi, ss, tz) {
  const comoSeFosseUTC = Date.UTC(y, m - 1, d, hh, mi, ss);
  const chute = new Date(comoSeFosseUTC);
  const partes = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hour12: false,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).formatToParts(chute).map(p => [p.type, p.value])
  );
  const horaObtida = Number(partes.hour) % 24;   // Intl pode devolver "24" à meia-noite
  const comoUTCSeALeituraFosseUTC = Date.UTC(
    Number(partes.year), Number(partes.month) - 1, Number(partes.day),
    horaObtida, Number(partes.minute), Number(partes.second)
  );
  const diff = comoSeFosseUTC - comoUTCSeALeituraFosseUTC;
  return new Date(comoSeFosseUTC + diff);
}

window.NNAgendaLib = { periodosAbertos: periodosAbertos };
})();
