# Navi Desk — PRD

## Problem statement (original)
Cross-platform retro cyberpunk desktop application called **Navi Desk** — a
private local desktop control interface for managing AI tools, automation
tasks, logs, prompts and system modules. Stack: React + TypeScript + Vite +
Tauri. Visual reference: Serial Experiments Lain ("Navi" computer). UI in
Spanish by default. All data mocked in this MVP, real backend later.

## Stack delivered
- React 19 + TypeScript (.tsx) in CRA + craco (Emergent preview)
- Tailwind + custom CSS retro theme
- shadcn primitives available; sonner for toasts
- src-tauri/ folder + vite.config.ts ready for local Tauri compile (Win/macOS/Linux)
- FastAPI backend kept untouched for future integration

## User personas
- **Power user / local AI operator** — Wants a single retro pane to monitor
  modules, fire prompts, review logs and snapshots, all offline-first.
- **Auditor** — Wants visible audit/security panel, no real secrets stored
  in the front-end, exportable diagnostics.

## What's been implemented (2026-02)
- Top system bar with logo, tabs, clock, connection badge
- Tab router with 10 views: Overview, Modules, Tasks, Logs, Prompts, Tools,
  Secrets, Recovery, Audit, Settings
- Terminal chat console (chat / share / command tabs, char counter,
  copy-report / replay / share placeholders, mock assistant reply)
- Avatar video panel (VHS noise + scanlines + HUD labels PLAY/CH02/SIGNAL/CONNECTED)
- Audio console (animated waveform + idle/listening/speaking + mute)
- Modules panel (6 generic nodes with ASCII bars + restart toggling state)
- Task queue panel with pause/retry/cancel/inspect actions
- Live log viewer with filters + export/copy-diagnostic
- Prompt template cards (7 generic categories: Code agent, Local agent,
  Cloud verifier, Audit, Recovery, Browser automation, UI generator)
- Tools/agents grid (enabled toggle, mode badge, risk, audit-required)
- Secrets panel — placeholders only + WARNING banner (backend-only secrets)
- Recovery / backup panel with restore points
- Settings panel (ES/EN/JA, theme CRT/Clean/HighContrast, scanline slider,
  backend URL, local-mode toggle, localStorage persistence)
- Security / audit panel with status grid + items + generate report
- Status footer (connected, user, network, mode, language, time, version)
- Global CRT overlay (scanlines + flicker + vignette)
- 3-language i18n (es / en / ja)
- README + Tauri scaffold (Cargo.toml, tauri.conf.json, main.rs)

## Files of note
- `/app/frontend/src/pages/Dashboard.tsx`
- `/app/frontend/src/components/*` (15 reusable components)
- `/app/frontend/src/services/mockApi.ts` (← swap for real backend later)
- `/app/frontend/src/data/mockData.ts`
- `/app/frontend/src/context/AppContext.tsx`
- `/app/frontend/src/i18n/translations.ts`
- `/app/src-tauri/tauri.conf.json`
- `/app/vite.config.ts`
- `/app/README.md`

## Backlog
- P0: wire `mockApi` to real FastAPI endpoints (start with `/api/modules`,
  `/api/tasks`, `/api/logs/stream`)
- P0: implement Tauri commands for safe secret storage (keychain)
- P1: real chat backend (LLM integration via Emergent universal key)
- P1: real-time SSE/WS log stream
- P1: drag-resizable / minimizable retro windows
- P2: voice input/output (Whisper + TTS)
- P2: Tauri auto-updater
- P2: per-module live charts (recharts)

## Next tasks list
1. Connect Tauri shell on user's local machine and verify build
2. Define backend API contract matching `mockApi`
3. Add Emergent LLM key integration for the chat console
