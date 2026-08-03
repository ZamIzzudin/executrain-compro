# ---- Stage 1: Build the Vite SPA ----
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies (use ci for reproducible installs)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build.
# VITE_API_BASE_URL is baked into the bundle at build time.
# Vite auto-loads .env, so it works out of the box.
# Override it with a Docker build arg if your production API URL differs.
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY . .
RUN npm run build

# ---- Stage 2: Serve static files with nginx ----
FROM nginxinc/nginx-unprivileged:alpine AS runtime

# Replace default nginx config with SPA-aware config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
