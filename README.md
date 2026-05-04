# Eye Clinic — Deployment Guide

This repository contains a React frontend (Vite) and an Express + Mongoose backend.

Quick checklist before pushing to GitHub:

- Frontend: uses relative API calls (`/api/...`) — these are prefixed at build time with `VITE_API_URL` (see `src/lib/api.js`).
- Backend: API routes are mounted under `/api/public` and `/api/admin` (see `server/src/app.js`).

Environment variables (minimum):

Render (Backend service)

- `MONGODB_URI` — MongoDB connection string
- `MONGODB_DB_NAME` — database name
- `JWT_SECRET` — JWT signing secret
- `ADMIN_EMAIL` — initial admin email
- `ADMIN_PASSWORD` — initial admin password
- `CLIENT_URL` — your frontend origin (e.g. `https://eye-clinic-three.vercel.app`)

Vercel (Frontend project)

- `VITE_API_URL` — backend base URL (e.g. `https://eye-clinic-w98x.onrender.com`)

Deployment steps summary:

1. Push code to GitHub.
2. Create a Render Web Service, point to this repository folder `server/` (or full repo and set root to `/server`). Use `npm install` and `npm start` or the start command from `server/package.json`.
3. Set the required environment variables on Render and deploy.
4. In Vercel, create a project from the repo for the frontend (root or `src/` depending on your repo layout). Add `VITE_API_URL` as an environment variable and redeploy.

Verification commands (replace domains):

```bash
curl -i https://eye-clinic-w98x.onrender.com/
curl -i https://eye-clinic-w98x.onrender.com/api/public/health
curl -i https://eye-clinic-w98x.onrender.com/api/public/bootstrap
```

If the frontend fails to reach the API, check CORS and make sure `CLIENT_URL` set on Render matches the frontend origin.

If you want, I can add a simple `/doctors` redirect endpoint on the backend so `GET /doctors` works without the `/api` prefix — say the word and I'll patch it.

---

Created by assistant to prepare repository for deployment.
