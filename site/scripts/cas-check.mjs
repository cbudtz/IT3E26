#!/usr/bin/env node
// Verificerer DTU CAS end-to-end: login -> ticket -> serviceValidate.
// Ingen dependencies. Kør:  node scripts/cas-check.mjs
import { createServer } from 'node:http';

const CAS = 'https://auth.dtu.dk/dtu';
const PORT = Number(process.env.PORT ?? 5555);
// VIGTIGT: service-URL'en skal være 100% identisk i login- og validate-kaldet.
const SERVICE = `http://localhost:${PORT}/cas`;
const LOGIN_URL = `${CAS}/?service=${encodeURIComponent(SERVICE)}`;

const pick = (xml, tag) => {
  const m = xml.match(new RegExp(`<(?:cas:)?${tag}[^>]*>([\s\S]*?)</(?:cas:)?${tag}>`, 'i'));
  return m ? m[1].trim() : null;
};

async function validate(path, ticket) {
  const url = `${CAS}/${path}?service=${encodeURIComponent(SERVICE)}&ticket=${encodeURIComponent(ticket)}`;
  const res = await fetch(url, { redirect: 'manual' });
  const body = await res.text();
  return { path, url, status: res.status, body };
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const ticket = url.searchParams.get('ticket');

  if (!ticket) {
    res.writeHead(302, { Location: LOGIN_URL });
    return res.end();
  }

  console.log(`\n[1] Ticket modtaget: ${ticket}\n`);

  const results = [];
  for (const path of ['validate', 'serviceValidate', 'p3/serviceValidate']) {
    try {
      // NB: hver ticket kan kun bruges én gang -> kun det første kald kan lykkes.
      const r = await validate(path, ticket);
      results.push(r);
      console.log(`--- ${path} (HTTP ${r.status}) ---\n${r.body.trim()}\n`);
    } catch (e) {
      console.log(`--- ${path} FEJLEDE: ${e.message}\n`);
    }
  }

  const ok = results.find((r) => /^yes/i.test(r.body) || /authenticationSuccess/i.test(r.body));
  const summary = ok
    ? {
        virker: true,
        endpoint: ok.path,
        user: pick(ok.body, 'user') ?? ok.body.split('\n')[1]?.trim() ?? null,
        mail: pick(ok.body, 'mail'),
        navn: pick(ok.body, 'cn') ?? pick(ok.body, 'displayName'),
        affiliation: pick(ok.body, 'eduPersonPrimaryAffiliation') ?? pick(ok.body, 'eduPersonAffiliation')
      }
    : { virker: false, note: 'Ingen af endpointsene gav authenticationSuccess' };

  console.log('=== RESULTAT ===');
  console.log(JSON.stringify(summary, null, 2));

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<pre>${JSON.stringify(summary, null, 2)}</pre><p>Du kan lukke fanen. Se terminalen.</p>`);
  setTimeout(() => server.close(() => process.exit(0)), 500);
});

server.listen(PORT, () => {
  console.log(`\nCAS-check kører.\n\nÅbn denne URL i browseren:\n\n  http://localhost:${PORT}/cas\n`);
  console.log(`(den redirecter til ${LOGIN_URL})\n`);
});
