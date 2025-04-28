# 1. Builder: instalacja i budowa aplikacji
FROM node:23-slim AS builder
WORKDIR /app

# 1.1 Zainstaluj deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 1.2 Skopiuj cały monorepo i zbuduj
COPY . .
RUN npx nx build hello-world --configuration=production

# 2. Runner: finalny obraz produkcyjny
FROM node:23-slim AS runner
WORKDIR /app

# 2.1 Weź wygenerowany package.json z builda
COPY --from=builder /app/apps/hello-world/dist/package.json ./

# 2.2 Zamiast warunkowego COPY, weź root-owy yarn.lock
COPY --from=builder /app/apps/hello-world/dist/yarn.lock ./

# 2.3 Instaluj tylko production dependencies
RUN yarn install --production --frozen-lockfile

# 2.4 Skopiuj kod i assets z builda
COPY --from=builder /app/apps/hello-world/dist/. ./

# 2.5 Uruchom aplikację
ENTRYPOINT ["node", "main.js"]
