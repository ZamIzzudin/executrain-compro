# ---- Stage 1: Build the Vite SPA ----
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies.
# NOTE: npm install (not npm ci) because this project depends on
# platform-specific optional packages (rolldown/tailwindcss native bindings,
# @emnapi/*) that differ between the Windows host where the lockfile is
# committed and the Alpine build container. npm install resolves the correct
# Alpine/linux variants, while npm ci would fail on the missing entries.
COPY package.json package-lock.json ./
RUN npm install --no-audit --no-fund

# Copy source and build.
# VITE_API_BASE_URL is baked into the bundle at build time.
# Vite auto-loads .env, so it works out of the box.
# Override it with a Docker build arg if your production API URL differs.
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY . .
RUN npm run build

# ---- Stage 2: Serve static files with nginx ----
FROM nginx:alpine AS runtime

# Replace default nginx config with SPA-aware config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
