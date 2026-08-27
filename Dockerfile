# Bygger site/ (SvelteKit + Colyseus) og pakker kursusmaterialet (markdown) med.
FROM node:24-alpine AS build
WORKDIR /app/site
COPY site/package*.json ./
RUN npm ci
COPY site/ ./
RUN npm run build && npm prune --omit=dev

FROM node:24-alpine
# PROTOCOL_HEADER/HOST_HEADER: saa SvelteKit kender sin offentlige URL bag CapRovers nginx (CAS-callback).
ENV NODE_ENV=production PORT=3000 CONTENT_DIR=/app/content PROTOCOL_HEADER=x-forwarded-proto HOST_HEADER=x-forwarded-host
WORKDIR /app/site
COPY --from=build /app/site/node_modules ./node_modules
COPY --from=build /app/site/build ./build
COPY --from=build /app/site/package.json ./package.json
COPY --from=build /app/site/server.ts ./server.ts
COPY --from=build /app/site/src/lib/server/realtime ./src/lib/server/realtime
COPY --from=build /app/site/drizzle ./drizzle
# Kursusmaterialet: README + lektion*-mapper.
# Docker COPY af en mappe kopierer indholdet (ikke mappen selv), så lektion*
# kan ikke COPY'es direkte ind i /app/content/ — så ville /lektion1 forsvinde.
COPY . /tmp/src
RUN mkdir -p /app/content \
	&& cp /tmp/src/README.md /app/content/ \
	&& cp -a /tmp/src/lektion* /app/content/ \
	&& rm -rf /tmp/src
EXPOSE 3000
CMD ["node", "server.ts"]
