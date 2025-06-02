Below is a **three-stage deliverable**:

1. **Blueprint** – a top-down, step-by-step technical roadmap.
2. **Chunking & Re-chunking** – two passes that progressively slice the work into safe, testable increments.
3. **LLM Prompts** – a numbered series of *ready-to-paste* prompts for a code-generation model, each fenced in `text` so nothing gets mis-interpreted as code.

---

## 1. Blueprint – Full Technical Roadmap

| # | Phase                        | Key Outputs                                                                                                                                    | Notes                                                                           |
| - | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 0 | **Project Scaffold**         | Vite + React + TypeScript repo; Tailwind; ESLint + Prettier; Vitest + React-Testing-Library; GitHub Actions CI                                 | Pure static bundle deployable to Vercel/Netlify                                 |
| 1 | **Core State & Controls**    | Global context for rows, cols, layout, speed, theme; `<ControlsPanel />` with +/- for grid, slider (1-20), toggles for theme/layout, hide/show | State lives in React Context; no external store                                 |
| 2 | **Terminal Shell**           | `<TerminalWindow />` component with: Mac chrome, resizable/ draggable wrapper, blinking cursor placeholder                                     | Use `react-draggable` + `react-resizable`; dimensions min 200×100, max 1200×800 |
| 3 | **Layout Manager**           | Uniform grid placement & scattered random placement; swap logic when dragging in grid                                                          | Simple 2-D array for grid cells                                                 |
| 4 | **File Loader**              | `<FileLoader />` drag-and-drop / click input; reads `.txt` via FileReader; pushes char array into global store                                 | Graceful errors (“Invalid file”, “Empty file”)                                  |
| 5 | **Token Animator**           | Hook (`useTokenStream`) that: picks random start offset, reveals 3-4 char “chunks” at an interval derived from global speed ±15 % jitter       | Exposes next-token callback to TerminalWindow                                   |
| 6 | **Integration**              | Connect animator to windows; implement scroll-up behaviour and cursor; stop at EOF                                                             | Use virtualized DOM list if perf issues                                         |
| 7 | **Theme & Styling**          | Dark & light Tailwind themes; theme toggle; global CSS vars for colours                                                                        | Tailwind’s `dark:` variants                                                     |
| 8 | **Hide Menu & Final Polish** | Toggle to collapse controls; ensure no layout shift; smoke tests                                                                               | Optional: screenshot mode CSS class                                             |
| 9 | **Deployment**               | Build & deploy script; CI verifies `npm run build` and runs tests                                                                              | README with usage instructions                                                  |

---

## 2. Chunking Passes

### 2.1 – First-Level Chunks (9)

1. **Repo init & CI**
2. **Tailwind + basic App shell**
3. **Global Context & Controls skeleton**
4. **TerminalWindow static UI**
5. **Grid layout engine**
6. **Drag/resize support**
7. **File loading & error states**
8. **Token animation hook**
9. **Theme toggle, hide menu, cleanup & deploy**

### 2.2 – Second-Level Re-chunking (18)

| Chunk | Micro-Step                                                        |
| ----- | ----------------------------------------------------------------- |
| 1A    | Init Vite + React TS template                                     |
| 1B    | Add ESLint/Prettier configs                                       |
| 1C    | Add Vitest + first passing dummy test                             |
| 1D    | GitHub Actions CI workflow                                        |
| 2A    | Install Tailwind; configure `tailwind.config.js`                  |
| 2B    | Minimal `<App>` renders “Hello world”, Tailwind classes tested    |
| 3A    | Create `AppContext` (rows, cols, theme, layout, speed)            |
| 3B    | Build bare `<ControlsPanel>` with +/- rows                        |
| 3C    | Tests: context defaults, +/- logic                                |
| 4A    | Static TerminalWindow with Mac chrome HTML/CSS                    |
| 4B    | Jest DOM snapshot for window UI                                   |
| 5A    | GridPlacement util returning coordinates from rows/cols           |
| 5B    | Render N windows in grid; unit test coordinate math               |
| 6A    | Integrate `react-draggable` & `react-resizable` on TerminalWindow |
| 6B    | Min/max dim constraints; tests for size clamping                  |
| 7A    | `<FileLoader>`: accept text file, FileReader pipeline             |
| 7B    | Error branch tests (empty, wrong MIME)                            |
| 8A    | `useTokenStream` hook with param: text, speed, jitter             |
| 8B    | Unit test: given “abcdef”, speed =1 chunk/s → emits 3-char tokens |
| 8C    | Connect hook to TerminalWindow; implement scroll container        |
| 9A    | Theme toggle: dark vs light class on `<body>`                     |
| 9B    | Hide/show ControlsPanel; integration tests                        |
| 9C    | Deploy script + README                                            |

Each micro-step is independently testable and merges cleanly.

---

## 3. Code-Generation LLM Prompts (TDD-ready)

Paste one prompt to the model at a time. **Do not skip ahead**—each step relies on the previous commit being green.

### Prompt 01 – Repository Scaffold

```text
You are ChatGPT-DevOps.  
Create a new Git repository initialized with Vite + React + TypeScript.

**Requirements**
- Vite React TS template
- Package scripts: `dev`, `build`, `test`
- ESLint (airbnb + React) and Prettier
- Vitest + React-Testing-Library
- First dummy test (`App renders hello world`)
- `.editorconfig`

**Deliverables**
- All project files
- `README.md` with setup commands
- Proof: show `npm test` output (all green)

Return the full file tree **and** key file contents. Then stop.
```

### Prompt 02 – GitHub Actions CI

```text
Add GitHub Actions workflow `.github/workflows/ci.yml`.

**Workflow**
- Runs on `push` and `pull_request`
- Node 20
- Steps: install deps, lint, test, build

**Tests**
- Push a commit in the PR containing the workflow and verify all steps succeed (use `--if-present` for lint).

Return updated files and screenshot of workflow run (or textual log excerpt).
```

### Prompt 03 – Tailwind Setup

```text
Install Tailwind CSS and configure it.

**Tasks**
1. `npm install -D tailwindcss postcss autoprefixer`
2. `npx tailwindcss init -p`
3. Add Tailwind directives to `src/index.css`.
4. Configure content paths in `tailwind.config.js`.
5. Replace App markup with `<div className="text-2xl font-bold">Cloud Code Meme</div>`.

**Tests**
- Update test to assert rendered text has class `font-bold`.

Provide updated files + passing test output.
```

### Prompt 04 – Global App Context

````text
Create `src/context/AppContext.tsx`.

**State**
```ts
{
 rows: number; // 1–15
 cols: number; // 1–15
 layout: 'uniform' | 'scattered';
 speed: number; // 1–20
 theme: 'dark' | 'light';
}
````

**Features**

* Default values: 3×3, uniform, speed 10, dark.
* Provider + custom hook `useAppContext`.
* Unit tests: default state, bounds checking for setters.

Expose the Provider at `<App>` root. Show updated tests passing.

````

### Prompt 05 – Controls Panel Skeleton  
```text
Build `<ControlsPanel />`.

**UI (no styling detail yet)**
- +/- buttons for rows, cols (disable at limits)
- Slider (1–20) for speed
- Toggle switches for layout, theme
- Hide button (temporarily just `console.log('hide')`)

State is bound to `AppContext`.

**Tests**
- Clicking + increases rows until 15 then disables
- Slider value updates speed in context

Return component, context updates, and passing test logs.
````

### Prompt 06 – TerminalWindow Static UI

```text
Create `<TerminalWindow />` with Mac chrome look.

**Specs**
- Props: `id`, optional style override
- Static text area (no animation yet)
- Mac traffic light buttons via CSS
- Jest DOM snapshot test for UI

Render a single TerminalWindow in `<App>` for now.

Return new files, CSS, and snapshot test results.
```

### Prompt 07 – Grid Layout Engine

```text
Implement `gridPlacement(rows, cols)` util returning coordinates `{x, y, w, h}` for each cell (0–100 %).

Render `rows*cols` TerminalWindow instances positioned via inline `style={{left, top, width, height}}`.

**Tests**
- 2×2 grid returns 4 coords at 0%,50% increments
- <App> snapshot shows correct number of windows.

Focus only on uniform layout; scattered later.
```

### Prompt 08 – Drag & Resize Integration

```text
Add `react-draggable` and `react-resizable`.

**Changes**
- Wrap TerminalWindow in Draggable + Resizable.
- Constraints: min 200×100, max 1200×800.
- In uniform layout, snap to nearest grid cell on `onStop`.

**Tests**
- Simulate drag event; assert new position snaps.
- Simulate resize; assert clamped dims.

Provide updated components and tests.
```

### Prompt 09 – FileLoader Component

```text
Create `<FileLoader />` with hidden `<input type="file" accept=".txt">`.

**Behaviour**
- On file select/drop: read text via FileReader
- Validate MIME starts with `text/`
- Raise context event `SET_TEXT` with char array
- Error toast on invalid/empty file

**Tests**
- Mock FileReader; assert context gets text
- Invalid file triggers error message

Mount FileLoader above ControlsPanel.

Return code + passing tests.
```

### Prompt 10 – useTokenStream Hook

```text
Implement `useTokenStream(text: string, baseSpeed: number)`.

**Logic**
- Random starting offset
- Speed = baseSpeed ±15 % jitter
- Emits next chunk (3–4 chars; single-char words whole) every interval (1/speed seconds)
- Returns `[currentLines, cursorCoords]`

**Tests**
- Given small text, hook emits expected chunks with fake timers.
```

### Prompt 11 – Animate Terminal Content

```text
Wire useTokenStream into TerminalWindow.

**Additions**
- Internal state `lines` from hook; render with auto-scroll (scrollTop = scrollHeight on update)
- Blinking cursor (`<span className="animate-pulse">|</span>`)
- Stop animation at EOF (hook returns `done=true`)

**Tests**
- Mount window with sample text; advance timers; assert lines grow.
```

### Prompt 12 – Scattered Layout Toggle

```text
Add scattered layout.

**Algorithm**
- On toggle, iterate all windows and set random `{left, top}` inside viewport bounds
- No snapping in scattered mode

**Tests**
- Toggle layout; assert positions differ from grid coords
```

### Prompt 13 – Theme Toggle & Hide Menu

```text
Theme
- Tailwind dark mode: `className={theme === 'dark' ? 'dark' : ''}` on `<body>`

Hide Menu
- ControlsPanel receives `visible` prop from AppContext
- Hide button flips it

**Tests**
- Toggle theme updates document.body class
- Hide button toggles panel visibility
```

### Prompt 14 – Speed Slider Live Update

```text
Modify useTokenStream to accept `speedRef` (React ref).

On slider change, update ref; interval callback reads latest speed without recreating timer.

**Tests**
- Render window; change speed; assert `setInterval` frequency adapts.
```

### Prompt 15 – EOF Handling & Pause State

```text
When token stream ends, stop interval and leave cursor blinking on last line.

**Tests**
- Provide small text; advance timers past EOF; assert no further lines appended.
```

### Prompt 16 – Edge-case & Error Tests

```text
Add tests:
- Drag window off-screen (allowed)
- Resize beyond max (clamped)
- Load 0 byte file (error state)
- Slider spam does not create timer leak (jest spy on setInterval)
```

### Prompt 17 – Smoke Test & Build

```text
Add Cypress or Playwright smoke test (optional local run).

Ensure:
- File loads
- 3×3 grid animates
- Controls toggle successfully

Then run `npm run build` and provide build folder size stats.
```

### Prompt 18 – Deployment Setup

```text
Add `vercel.json` (or Netlify `_redirects`) for static hosting.

Update README with deploy instructions.

No code changes beyond config.
```

---

**Done.**
Feed the prompts one-by-one to a code-gen LLM and you’ll march safely from empty repo to fully working meme-terminal app, with tests guarding every increment.
