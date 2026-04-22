# Bayo Job Radar v1

A real first version of the engine, shaped for deployment rather than just architecture discussion.

## What changed

- persistent storage via SQLAlchemy
- scan run history
- triggerable scans
- CSV export from stored opportunities
- live adapter hooks for Greenhouse and Lever
- Dockerfiles for backend and frontend
- Render and Railway starter config
- environment templates

## What it can do right now

- run a scan
- save opportunities to a database
- save run history
- show a dashboard backed by stored data
- export tracker CSV

## What it still needs for production

- more live sources
- auth
- email digest sending
- better source-specific parsing
- scheduled deployment job

## Local setup

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Then trigger your first scan:

```bash
curl -X POST http://localhost:8000/scan
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Open:

```text
http://localhost:3000
```

## The 3 endpoints that matter

- `POST /scan` → run a scan and persist results
- `GET /dashboard` → fetch latest runs + saved opportunities
- `GET /tracker.csv` → export the tracker file

## Fastest no-dev deployment path

- backend: Railway or Render
- database: Supabase Postgres
- frontend: Vercel or Render

## Minimal production sequence

1. create Supabase project
2. set `DATABASE_URL` in backend host
3. deploy backend
4. deploy frontend with `NEXT_PUBLIC_API_BASE_URL`
5. trigger first scan
6. add scheduler to run `python scripts_run_scan.py`

## Live adapters included

### Greenhouse
Set:
- `GREENHOUSE_BOARD_TOKEN`

Example:
- `stripe`
- `figma`

### Lever
Set:
- `LEVER_COMPANY_HANDLE`

Example:
- company handle used in Lever hosted jobs URL

If those env vars are empty, the app falls back to sample data plus whatever live sources are configured.
