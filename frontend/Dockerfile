# syntax=docker/dockerfile:1.4

# ---------- Build Stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy frontend package files
COPY frontend/package*.json ./frontend/

# Copy shared package
COPY packages/shared-types ./packages/shared-types

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install

# Copy the entire repository
WORKDIR /app
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN npm run build


# ---------- Runtime Stage ----------
FROM nginx:alpine

COPY --from=builder /app/frontend/dist /usr/share/nginx/html

RUN printf 'server {\n\
    listen 80;\n\
    server_name localhost;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
