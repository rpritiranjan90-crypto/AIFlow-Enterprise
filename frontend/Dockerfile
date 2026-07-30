# syntax=docker/dockerfile:1.4

# Stage 1: Build Frontend Assets
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY frontend/package*.json ./frontend/
COPY packages/shared-types ./packages/shared-types

WORKDIR /app/frontend
RUN npm install

WORKDIR /app
COPY . .

WORKDIR /app/frontend
RUN npm run build

# Stage 2: Nginx Production Server
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built static assets
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy production Nginx configuration with compression and security headers
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    gzip on;\n\
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;\n\
    gzip_min_length 1000;\n\
\n\
    add_header X-Frame-Options "DENY" always;\n\
    add_header X-Content-Type-Options "nosniff" always;\n\
    add_header X-XSS-Protection "1; mode=block" always;\n\
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;\n\
\n\
    location /health {\n\
        access_log off;\n\
        return 200 "healthy\\n";\n\
    }\n\
\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=15s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
