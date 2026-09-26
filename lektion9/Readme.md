# Lektion 9 — Klient-tilstand og en URL

Data i mockuppet skal kunne blive i browseren. Til sidst får prototypen en
URL på Vercel, og I arbejder videre på D1. Der er stadig ingen egen backend.

## Forberedelse

Det forventes, at du har forberedt dig — `localStorage` (ca. 30 min).

[Forberedelse til Lektion 9](forberedelse.md)

## Program (4 timer)

| Tid | Blok | Indhold |
|---|---|---|
| 15 min | Opsamling | `localStorage` fra forberedelsen |
| 10 min | Quiz | Forberedelsen |
| 15 min | [Øvelse 1](oevelser.md) | **Gem listen** — `JSON.stringify` / `JSON.parse` og refresh |
| 25 min | Gennemgang | Setter og `renderTabel` — `fetch` tegner ikke selv |
| 10 min | Quiz | Tilstand |
| 35 min | [Øvelse 2](oevelser.md) | **Patientlisten følger data** — setter, render og `localStorage` |
| 15 min | Gennemgang | Statisk deploy til Vercel, live |
| 25 min | [Øvelse 3](oevelser.md) | **URL til mockuppet** — gruppens repository på Vercel |
| 45 min | [Øvelse 4](oevelser.md) | **Videre på D1** — tilstand på den offentlige side, og resten af mockuppet |

Der er afsat 45 minutter til pauser, som lægges ind undervejs.

## Slides

[Forelæsningsslides](forelaesning.md?show=slide)

## Øvelser

Øvelserne står samlet her, med mere uddybning end på slidesne:

[Øvelser til Lektion 9](oevelser.md)

## Efter lektionen kan du

- forklare at `localStorage` gemmer tekst, og at en liste skal igennem `JSON.stringify` / `JSON.parse`
- gemme listen i en variabel og tegne tabellen fra en setter
- lægge det statiske mockup på Vercel og åbne URL'en
- holde password ude af `localStorage` — D1 har stadig ingen egen backend
