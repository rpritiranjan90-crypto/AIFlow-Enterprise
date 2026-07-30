# AIFlow Enterprise v4.0 — Upstash Free Tier Redis Setup

---

## 🔴 Serverless Redis TLS Configuration

**Upstash** provides a 100% free serverless Redis database supporting up to 10,000 daily commands with encrypted TLS.

---

## 🛠️ Step-by-Step Upstash Setup

1. Sign up at [Upstash.com](https://upstash.com) and click **"Create Database"**.
2. Name database `aiflow-redis-cache` and select primary region.
3. Enable **TLS Encryption**.
4. Copy the Redis Connection URL.
5. Set `REDIS_URL` using `rediss://` (secure TLS scheme):
   ```env
   REDIS_URL="rediss://default:upstash_password@cool-redis-12345.upstash.io:6379/0"
   ```
