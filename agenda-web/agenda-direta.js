/* agenda-direta.js — consulta a Google Agenda direto do navegador.
 * Só é usado quando não há servidor (PHP ou Netlify Function) disponível.
 * Precisa de window.NN_AGENDA_TESTE = { calendarId, client_email, private_key }. */
(function(){
  function b64url(bytes){
    var s=''; for (var i=0;i<bytes.length;i++) s+=String.fromCharCode(bytes[i]);
    return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  }
  function b64urlTxt(t){ return b64url(new TextEncoder().encode(t)); }
  async function chavePrivada(pem){
    var der = atob(pem.replace(/-----[^-]+-----/g,'').replace(/\s+/g,''));
    var buf = new Uint8Array(der.length); for (var i=0;i<der.length;i++) buf[i]=der.charCodeAt(i);
    return crypto.subtle.importKey('pkcs8', buf.buffer, {name:'RSASSA-PKCS1-v1_5', hash:'SHA-256'}, false, ['sign']);
  }
  async function token(c){
    var agora=Math.floor(Date.now()/1000);
    var h=b64urlTxt(JSON.stringify({alg:'RS256',typ:'JWT'}));
    var p=b64urlTxt(JSON.stringify({iss:c.client_email,scope:'https://www.googleapis.com/auth/calendar.readonly',
      aud:'https://oauth2.googleapis.com/token',iat:agora,exp:agora+3600}));
    var k=await chavePrivada(c.private_key);
    var sig=new Uint8Array(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', k, new TextEncoder().encode(h+'.'+p)));
    var r=await fetch('https://oauth2.googleapis.com/token',{method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:'grant_type='+encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')+'&assertion='+(h+'.'+p+'.'+b64url(sig))});
    var j=await r.json(); if(!j.access_token) throw new Error('sem token'); return j.access_token;
  }
  window.NNAgendaDireta = async function(){
    var c=window.NN_AGENDA_TESTE; if(!c) throw new Error('sem chave de teste');
    var tz='America/Sao_Paulo', t=await token(c), min=new Date(), max=new Date(Date.now()+90*864e5);
    var r=await fetch('https://www.googleapis.com/calendar/v3/freeBusy',{method:'POST',
      headers:{Authorization:'Bearer '+t,'Content-Type':'application/json'},
      body:JSON.stringify({timeMin:min.toISOString(),timeMax:max.toISOString(),timeZone:tz,items:[{id:c.calendarId}]})});
    var j=await r.json(); var cal=j.calendars&&j.calendars[c.calendarId];
    if(!cal||!cal.busy) throw new Error('freebusy falhou');
    return { ok:true, tz:tz, atualizado:new Date().toISOString(), abertos: window.NNAgendaLib.periodosAbertos(cal.busy, tz) };
  };
})();
