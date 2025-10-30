# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_IGNORE_ESLINT=1
ENV NEXT_IGNORE_TYPE_CHECK=1

# Copy the full project and ensure we start with a clean install
COPY . .
RUN rm -rf node_modules .next
RUN npm config set fetch-timeout 600000 \
    && npm config set fetch-retry-maxtimeout 600000 \
    && npm config set fetch-retries 5 \
    && npm ci
RUN npm run build

FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create an unprivileged user for the runtime container
RUN groupadd --system nodejs && useradd --system --gid nodejs nextjs

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Bring over the compiled Next.js output and static assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["npm", "run", "start"]
