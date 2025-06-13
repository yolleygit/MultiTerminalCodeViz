Each task is a Markdown checkbox so you can tick them off as you go.
Indentation denotes nesting—finish all subtasks before marking the parent as complete.

```markdown
# Cloud Code Meme Terminal Visualizer – TODO Checklist

## 0  Project Setup & CI
- [x] 0.1 Initialize Git repository
- [x] 0.2 **Scaffold** Vite + React TS project
  - [x] `npm create vite@latest`
  - [x] Choose "React + TypeScript" template
- [x] 0.3 Add ESLint (Airbnb) + Prettier
  - [x] Create `.eslintrc.cjs`
  - [x] Create `.prettierrc`
  - [x] Add lint scripts to `package.json`
- [x] 0.4 Add Vitest + React-Testing-Library
  - [x] Install dev-deps
  - [x] Configure `vitest.config.ts`
  - [x] Write first dummy test (`<App /> renders`)
- [X] 0.5 Add GitHub Actions CI
  - [x] `.github/workflows/ci.yml` (install → lint → test → build)
  - [X] Verify CI passes on push
- [X] 0.6 Commit + push scaffold

---

## 1  Styling Baseline
- [x] 1.1 Install Tailwind CSS (`tailwindcss postcss autoprefixer`)
- [x] 1.2 `tailwind.config.js` – set content paths
- [x] 1.3 Add Tailwind directives to `src/index.css`
- [x] 1.4 Verify Tailwind class renders (`text-2xl font-bold`)
- [x] 1.5 Update unit test to assert Tailwind class present

---

## 2  Global State & Controls (Context)
- [x] 2.1 Create `AppContext.tsx`
  - [x] State fields : `numWindows` (1-100), layout ('uniform'/'scattered'), speed, theme, `controlsVisible`
  - [x] Default values (`numWindows`: 1, uniform, 10 chunks/s, dark, true)
  - [x] Bound-checked setter helpers (e.g., for `numWindows`)
- [x] 2.2 Wrap `<App>` in `AppProvider`
- [x] 2.3 Unit tests: default values, bounds enforcement for `numWindows`

### ControlsPanel Skeleton
- [x] 2.4 Build `<ControlsPanel />`
  - [x] `numWindows` +/– buttons (displays current count, min 1, max 100)
  - [x] Slider 1–20 (speed)
  - [x] Toggle: layout (uniform/scattered)
  - [x] Toggle: theme (dark/light)
  - [x] Hide button (toggles `controlsVisible`)
- [x] 2.5 Bind controls to context
- [x] 2.6 Unit tests: `numWindows` increment/decrement, slider updates speed

---

## 3  Terminal Window UI
- [x] 3.1 Install `react-draggable` & `react-resizable`
- [x] 3.2 Create `<TerminalWindow />`
  - [x] Mac terminal chrome (red/yellow/green)
  - [x] Monospace content area
  - [x] Blinking cursor placeholder
  - [x] Wrap with Draggable + Resizable
    - [x] Min 200×100px
    - [x] Max 1200×800px
- [x] 3.3 Snapshot test of static UI
- [x] 3.4 Clamping tests for resize

---

## 4  Layout Engine
- [ ] 4.1 Implement `LayoutManager` utility
  - [ ] Takes `numWindows` and `layoutMode` as input.
  - [ ] For 'uniform' mode:
    - [ ] Calculates optimal grid (rows/columns) based on `numWindows`.
    - [ ] Returns array of `{ id, left, top, width, height }` in % for each terminal.
  - [ ] For 'scattered' mode:
    - [ ] Generates random `{ left, top }` for each terminal.
  - [ ] Unit test uniform layout for various `numWindows` (e.g., 1, 4, 5 windows).
- [ ] 4.2 Render `numWindows` TerminalWindows positioned by the LayoutManager.
- [ ] 4.3 Uniform layout snap logic: on drag stop, snap to nearest calculated grid cell.
- [ ] 4.4 Scattered layout:
  - [ ] Randomize all window positions on toggle to 'scattered' or when `numWindows` changes in 'scattered' mode.
  - [ ] No snapping in 'scattered' mode during drag.
  - [ ] Unit test: positions differ after toggle to 'scattered'.

---

## 5  File Loading & Error Handling
- [ ] 5.1 Create `<FileLoader />`
  - [ ] Hidden file input accept `.txt`
  - [ ] Drag-and-drop zone
  - [ ] Use FileReader to read text
- [ ] 5.2 Validate MIME starts with `text/`
- [ ] 5.3 Dispatch context action `SET_TEXT`
- [ ] 5.4 Error toasts:
  - [ ] Invalid file type
  - [ ] Empty file
- [ ] 5.5 Unit tests: happy path & error branches
- [ ] 5.6 Mount FileLoader above ControlsPanel

---

## 6  Token Animation
- [ ] 6.1 Implement `useTokenStream(text, baseSpeed)`
  - [ ] Random start offset
  - [ ] Speed = baseSpeed ±15 % jitter
  - [ ] Emit 3–4 char chunks (single-char words whole)
  - [ ] `done` flag at EOF
  - [ ] Hook tests with fake timers
- [ ] 6.2 Integrate hook into TerminalWindow
  - [ ] Maintain `lines` state
  - [ ] Auto-scroll to bottom on update
  - [ ] Draw blinking cursor
  - [ ] Halt on `done`
- [ ] 6.3 Test: lines grow, cursor persists, stops at EOF

---

## 7  Live Controls Wiring
- [ ] 7.1 Speed slider updates interval without recreating hook
- [ ] 7.2 Theme toggle – add `className="dark"` on `<body>`
- [ ] 7.3 Hide/Show ControlsPanel – CSS transition optional

---

## 8  Edge-Case Tests
- [ ] 8.1 Drag window partially off-screen – allowed
- [ ] 8.2 Attempt resize beyond bounds – clamped
- [ ] 8.3 Spam speed slider – no leaked timers (`jest.spyOn(global, 'setInterval')`)
- [ ] 8.4 Load 0 byte file – error UI

---

## 9  Smoke Testing & Build
- [ ] 9.1 (Optional) Add Cypress/Playwright smoke test
  - [ ] Load sample text
  - [ ] Verify a set number of windows (e.g., 5) animate in 'uniform' grid layout.
  - [ ] Toggle dark/light, scattered, hide menu, change number of windows.
- [ ] 9.2 `npm run build` – check bundle size
- [ ] 9.3 Update CI to upload build artifacts

---

## 10  Deployment & Docs
- [ ] 10.1 Add `vercel.json` (or Netlify config)
- [ ] 10.2 Push to hosting provider; confirm live site
- [ ] 10.3 Update `README.md`
  - [ ] Usage instructions
  - [ ] Local dev commands
  - [ ] Licence & credits
- [ ] 10.4 Tag `v1.0.0` release

---

### Optional Enhancements (Parked)
- [ ] Typing sound effects
- [ ] Multiple text files, one per terminal
- [ ] "Record mode" – hides cursor & mouse
```

*Happy building!*
