# Agoge Wrestling Academy

MERN-stack website for Agoge Wrestling Academy — a single-page marketing/info
site where customers and prospects can view programs, schedules, staff, and
pricing, and enroll via an external registration platform.

The design replicates the look and feel of the client's reference site
(`Beebe/`) with Agoge branding and a black / gold / Spartan-red color scheme.

## Structure

| Folder | Description |
| --- | --- |
| `frontend/` | Vite + React 19 single-page site (builds to `frontend/build/`) |
| `backend/` | Express 5 + Mongoose API scaffold (not wired to frontend yet) |
| `Beebe/` | Client-provided reference source — do not modify |
| `.cursor/rules/` | Project rules for AI-assisted development |

## Development

```bash
# Frontend (http://localhost:5173, proxies /api to :5000)
cd frontend
npm install
npm run dev

# Backend (http://localhost:5000)
cd backend
npm install
copy .env.example .env   # then fill in MONGO_URI when ready
npm run dev
```

## Build & Deploy

```bash
cd frontend
npm run build   # outputs frontend/build/
```

- Upload `frontend/build/` to the server's html directory.
- Upload `backend/` to the server's backend directory.
- Target: Ubuntu 22.04 (DigitalOcean).

## Current status

- All business content (names, phone, address, schedule, stats, registration
  links, Instagram, logo) is **placeholder** — centralized in
  `frontend/src/data/siteContent.js` for easy swapping.
- Backend routes are stubs (return 501). Reviews use localStorage and the
  contact form falls back to mailto until the API is wired up.
