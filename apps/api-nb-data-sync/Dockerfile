# 1) Builder: install deps & build the api-nb-data-sync app
FROM node:23-slim AS builder
WORKDIR /app

# 1.1 Copy root manifests and install all dependencies (including devDependencies)
COPY package.json yarn.lock nx.json tsconfig.json tsconfig.base.json eslint.config.mjs ./
RUN yarn config set network-timeout 600000 \
 && yarn config set network-concurrency 1 \
 && yarn install --frozen-lockfile

# 1.2 Copy required parts of app from monorepo
COPY libs/backend/maps3-nb-data-types ./libs/backend/maps3-nb-data-types
COPY libs/shared/api-nb-data-sync-dto ./libs/shared/api-nb-data-sync-dto
COPY apps/api-nb-data-sync ./apps/api-nb-data-sync

# 1.3 Install dependencies specific to the application
WORKDIR /app/apps/api-nb-data-sync
COPY apps/api-nb-data-sync/package.json ./package.json
RUN yarn install --frozen-lockfile

# 1.4 Build the specific application
WORKDIR /app
ENV NX_DAEMON=false
RUN npx nx sync --yes
RUN npx nx build api-nb-data-sync --configuration=production --verbose

# 2) Runner: production image
FROM node:23-slim AS runner
WORKDIR /app

# 2.1 Copy the built output (including dist/package.json & dist/yarn.lock)
COPY --from=builder /app/apps/api-nb-data-sync/dist/package.json ./package.json
COPY --from=builder /app/apps/api-nb-data-sync/dist/yarn.lock ./yarn.lock

# 2.2 Install only production dependencies
RUN yarn install --production --frozen-lockfile

# 2.3 Copy the rest of the compiled app
COPY --from=builder /app/apps/api-nb-data-sync/dist/. ./

# 2.4 Expose port and run
EXPOSE 3000
ENTRYPOINT ["node", "main.js"]
