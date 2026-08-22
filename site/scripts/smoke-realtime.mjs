// Smoke test: beviser at SvelteKit (HTTP) og Colyseus (WS) deler samme port.
import { Client } from '@colyseus/sdk';

const PORT = process.env.PORT ?? 3000;
const base = `http://localhost:${PORT}`;
const fail = (m) => { console.error('FEJL:', m); process.exit(1); };

const page = await fetch(base);
console.log(`HTTP  /            -> ${page.status} ${page.headers.get('content-type')}`);
if (page.status !== 200) fail('SvelteKit svarede ikke 200');

const questions = [
  { id: 'q1', type: 'mc', prompt: 'Hvad står HTML for?',
    options: ['HyperText Markup Language', 'Hoved Tekst Meta Layout', 'Home Tool Markup Lang'], correct: [0] },
  { id: 'q2', type: 'tf', prompt: 'CSS bruges til styling.', options: ['Sandt', 'Falsk'], correct: [0] },
  { id: 'q3', type: 'short', prompt: 'Hvilket tag laver et link?', options: [], correct: ['a', '<a>'] }
];

const client = new Client(base);
const host = await client.joinOrCreate('quiz', {
  quizId: 'demo', joinCode: 'ABC123', hostToken: 'hemmelig', questions, nickname: 'Underviser'
});
console.log(`WS    join         -> room ${host.roomId}, phase "${host.state.phase}"`);
host.send('host:claim', { token: 'hemmelig' });

const s1 = await client.joinById(host.roomId, { nickname: 'Stud A' });
const s2 = await client.joinById(host.roomId, { nickname: 'Stud B' });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
await wait(300);
console.log(`WS    players       -> ${host.state.players.size} (forventet 3)`);
if (host.state.players.size !== 3) fail('spillere blev ikke synkroniseret');

// Spørgsmål 1 (mc): A svarer rigtigt, B forkert.
host.send('host:next');
await wait(300);
console.log(`      spm 1        -> "${host.state.question.prompt}" (${host.state.question.options.length} valg)`);
s1.send('answer', { value: '0' });
s2.send('answer', { value: '2' });
await wait(300);
console.log(`      tally        -> [${host.state.tally.join(', ')}], svar: ${host.state.answerCount}`);
host.send('host:reveal');
await wait(300);

// Spørgsmål 2 (tf) og 3 (short).
host.send('host:next'); await wait(200);
s1.send('answer', { value: '0' }); s2.send('answer', { value: '0' }); await wait(200);
host.send('host:reveal'); await wait(200);
host.send('host:next'); await wait(200);
console.log(`      spm 3 (type) -> ${host.state.question.type}`);
s1.send('answer', { value: '<a>' }); s2.send('answer', { value: 'div' }); await wait(200);
host.send('host:reveal'); await wait(300);

const scores = [...host.state.players.values()].map((p) => `${p.nickname}=${p.score}`);
console.log(`      scores       -> ${scores.join(', ')}`);
const a = [...host.state.players.values()].find((p) => p.nickname === 'Stud A');
const b = [...host.state.players.values()].find((p) => p.nickname === 'Stud B');
if (a?.score !== 3) fail(`Stud A skulle have 3 point, havde ${a?.score}`);
if (b?.score !== 1) fail(`Stud B skulle have 1 point, havde ${b?.score}`);

host.send('host:end'); await wait(200);
console.log(`      phase        -> ${host.state.phase}`);

await Promise.all([host.leave(), s1.leave(), s2.leave()]);
console.log('\n✅ HTTP + WebSocket kører på samme port. mc/tf/short + scoring virker.');
process.exit(0);
