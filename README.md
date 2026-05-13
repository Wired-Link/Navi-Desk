# NAVI DESK

> Private local desktop control interface for managing AI tools, automation tasks,
> logs, prompts and system modules. Retro cyberpunk / Serial Experiments Lain
> inspired UI. React + TypeScript front-end, designed to be packaged as a
> cross‑platform desktop app with **Tauri** (Windows / macOS / Linux).

---

## 1. Quickstart (web preview)

The repository ships with the Emergent preview environment which uses
**Create React App + craco** on port `3000`, and a FastAPI placeholder backend
on `:8001`. This is convenient to develop and audit the UI in a browser.

```bash
cd frontend
yarn install
yarn start            # http://localhost:3000
```

All data is mocked. No real API call is made by the UI yet.

## 2. Desktop dev mode (Tauri)

For the real desktop experience you can run the app via Tauri. The repo already
contains a `src-tauri/` folder and a `vite.config.ts` ready to be used.

Prerequisites:

- Rust toolchain (`rustup`)
- Node 18+ and yarn
- Tauri CLI: `cargo install tauri-cli` (or `yarn global add @tauri-apps/cli`)

Run in development:

```bash
# from /app
cargo tauri dev
```

This will:

1. Start the React dev server (`yarn start` inside `/app/frontend`).
2. Open the Tauri shell pointing at `http://localhost:3000`.

> If you prefer **Vite** over CRA for the local desktop build, the included
> `vite.config.ts` is wired up to the same `frontend/src` directory. Change the
> `beforeDevCommand` / `beforeBuildCommand` inside `src-tauri/tauri.conf.json`
> from `yarn start` / `yarn build` to `vite` / `vite build`.

## 3. Building the installer

```bash
# from /app
cargo tauri build
```

Output goes to `src-tauri/target/release/bundle/` (`.dmg`, `.msi`, `.deb`,
`.AppImage` depending on host OS).

---

## 4. Project structure

```
/app
├── frontend/                  # React + TypeScript UI (CRA + craco)
│   ├── public/index.html
│   └── src/
│       ├── App.js             # App shell (mounts AppProvider + Dashboard)
│       ├── index.css          # Retro Lain theme + CRT overlay
│       ├── pages/
│       │   └── Dashboard.tsx
│       ├── components/        # Reusable retro components
│       │   ├── RetroWindow.tsx
│       │   ├── TopSystemBar.tsx
│       │   ├── StatusFooter.tsx
│       │   ├── TerminalChat.tsx
│       │   ├── AvatarVideoPanel.tsx
│       │   ├── AudioConsole.tsx
│       │   ├── ModuleCard.tsx / ModulesPanel.tsx
│       │   ├── TaskRow.tsx / TaskQueuePanel.tsx
│       │   ├── LogViewer.tsx
│       │   ├── PromptTemplateCard.tsx / PromptPanel.tsx
│       │   ├── ToolCard.tsx / ToolsPanel.tsx
│       │   ├── SecretsPanel.tsx
│       │   ├── RecoveryPanel.tsx
│       │   ├── SettingsPanel.tsx
│       │   ├── SecurityAuditPanel.tsx
│       │   └── StatusBadge.tsx
│       ├── context/AppContext.tsx     # Language + theme + settings
│       ├── data/mockData.ts           # ALL mock data lives here
│       ├── services/mockApi.ts        # Replace with real backend later
│       ├── i18n/translations.ts       # ES / EN / JA
│       └── types/index.ts
├── src-tauri/                 # Tauri shell (Rust)
│   ├── Cargo.toml
│   ├── build.rs
│   ├── tauri.conf.json
│   ├── icons/                 # Drop your platform icons here
│   └── src/main.rs
├── vite.config.ts             # Alternative bundler for Tauri builds
└── backend/                   # FastAPI placeholder (optional)
```

## 5. Where mock data lives

All UI panels read from `frontend/src/services/mockApi.ts`, which in turn pulls
from `frontend/src/data/mockData.ts`. That is the **only** place you need to
touch to swap mocks for real network calls.

`mockApi` exposes:

- `getMessages()`, `sendMessage()`
- `getModules()`, `getTasks()`, `getLogs()`, `streamLogLine()`
- `getPrompts()`, `getTools()`, `getAudit()`, `getRestorePoints()`

## 6. Future backend integration

Each function in `mockApi.ts` is already typed and async. To plug a real local
backend simply replace the body with `fetch()` / `axios` calls. Example:

```ts
async getModules(): Promise<ModuleStatus[]> {
  const r = await fetch(`${settings.backendUrl}/api/modules`);
  return r.json();
}
```

The current Emergent preview ships with a tiny FastAPI app under
`/app/backend/server.py`. You can grow it with new `/api/...` endpoints that
mirror the `mockApi` surface.

## 7. Security warning

**Never store real secrets inside the front-end.** The Secrets panel
(`SecretsPanel.tsx`) is a *placeholder* and explicitly displays:

> ⚠ WARNING: Secrets must be stored backend-side only.

When you wire up real APIs:

- Put API keys behind the Tauri/Rust process or your FastAPI backend.
- Use `tauri::api` commands to fetch them on demand, never embed them in JS.
- Treat any value typed in the front-end Secrets panel as ephemeral.

## 8. Replaceable modules

Everything visible in the **Tools / Agents** and **Module Status** panels is a
generic, *replaceable* unit. Names like *Core Controller*, *Render Node*,
*Local LLM*, *Code Agent*, *Verification Agent*, *Browser Automation* are
placeholders — swap them for whatever real binary / service / agent you plug
in later. No proprietary names or strategies are baked into the codebase.

## 9. Settings

Available from the **AJUSTES / SETTINGS** tab:

- Language: Spanish / English / Japanese (default: Spanish)
- Theme: CRT / Clean / High Contrast
- Audio toggle, scanline intensity slider
- Backend URL
- Local-mode toggle

All settings persist in `localStorage` (`navi-desk-settings`).

---

Made with retro-phosphor love. レイヤード。
