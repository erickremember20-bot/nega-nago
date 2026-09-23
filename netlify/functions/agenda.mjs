/**
 * Netlify Function — mesma ideia do agenda.php, pra hospedagem sem PHP.
 * Lê a Google Agenda (livre/ocupado) e devolve os dias/períodos abertos.
 *
 * Configuração (variáveis de ambiente do site na Netlify):
 *   GOOGLE_SERVICE_ACCOUNT_JSON  — conteúdo INTEIRO do arquivo da chave (cole o JSON)
 *   GOOGLE_CALENDAR_ID           — ID da agenda (Configurações > Integrar agenda)
 *   GOOGLE_TZ                    — opcional, padrão America/Sao_Paulo
 *   GOOGLE_WINDOW_DAYS           — opcional, padrão 90
 *
 * O netlify.toml redireciona /agenda/agenda.php pra esta função, então o
 * mesmo index.html funciona sem alteração na Hostinger (PHP) ou na Netlify.
 */
import { periodosAbertos } from './_agenda-lib.mjs';

let cache = { at: 0, body: null };
const TTL_MS = 10 * 60 * 1000;

export default async () => {
  const agora = Date.now();
  if (cache.body && (agora - cache.at) < TTL_MS) return json(cache.body);

  try {
    const saJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const calId  = process.env.GOOGLE_CALENDAR_ID;
    const tz     = process.env.GOOGLE_TZ || 'America/Sao_Paulo';
    const dias   = Number(process.env.GOOGLE_WINDOW_DAYS || 90);
    if (!saJson || !calId) throw new Error('faltam variáveis de ambiente (GOOGLE_SERVICE_ACCOUNT_JSON / GOOGLE_CALENDAR_ID)');

    const sa = JSON.parse(saJson);
    const token = await getAccessToken(sa);
    const busy = await freeBusy(token, calId, tz, dias);
    const abertos = periodosAbertos(busy, tz);

    const body = { ok: true, tz, atualizado: new Date().toISOString(), abertos };
    cache = { at: agora, body };
    return json(body);
  } catch (e) {
    if (cache.body) return json(cache.body);        // erro novo: serve o último cache bom
    return json({ ok: false, erro: String((e && e.message) || e), abertos: {} });
  }
};

function json(body) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}

async function getAccessToken(sa) {
  const crypto = await import('node:crypto');
  const enc = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const agora = Math.floor(Date.now() / 1000);
  const header = enc({ alg: 'RS256', typ: 'JWT' });
  const claim = enc({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: agora, exp: agora + 3600,
  });
  const assinador = crypto.createSign('RSA-SHA256');
  assinador.update(`${header}.${claim}`);
  const sig = assinador.sign(sa.private_key).toString('base64url');
  const jwt = `${header}.${claim}.${sig}`;

  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const j = await r.json();
  if (!r.ok || !j.access_token) throw new Error('sem token do Google: ' + JSON.stringify(j));
  return j.access_token;
}

async function freeBusy(token, calId, tz, windowDays) {
  const min = new Date();
  const max = new Date(min.getTime() + windowDays * 86400000);
  const r = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      timeMin: min.toISOString(), timeMax: max.toISOString(), timeZone: tz,
      items: [{ id: calId }],
    }),
  });
  const j = await r.json();
  if (!r.ok || !j.calendars || !j.calendars[calId]) throw new Error('freebusy falhou: ' + JSON.stringify(j));
  return j.calendars[calId].busy || [];
}
