Each task is a Markdown checkbox so you can tick them off as you go.
Indentation denotes nesting—finish all subtasks before marking the parent as complete.

```markdown
# Cloud Code Meme Terminal Visualizer – TODO Checklist

## 0  Project Setup & CI
- [x] 0.1 Initialize Git repository
- [x] 0.2 **Scaffold** Vite + React TS project
  - [x] `npm create vite@latest`
  - [x] Choose "React + TypeScript" template
- [ ] 0.3 Add ESLint (Airbnb) + Prettier
  - [ ] Create `.eslintrc.cjs`
  - [ ] Create `.prettierrc`
  - [ ] Add lint scripts to `package.json`
- [ ] 0.4 Add Vitest + React-Testing-Library
  - [ ] Install dev-deps
  - [ ] Configure `vitest.config.ts`
  - [ ] Write first dummy test (`<App /> renders`)
- [ ] 0.5 Add GitHub Actions CI
  - [ ] `.github/workflows/ci.yml` (install → lint → test → build)
  - [ ] Verify CI passes on push
- [ ] 0.6 Commit + push scaffold

---

## 1  Styling Baseline
- [ ] 1.1 Install Tailwind CSS (`tailwindcss postcss autoprefixer`)
- [ ] 1.2 `tailwind.config.js` – set content paths
- [ ] 1.3 Add Tailwind directives to `src/index.css`
- [ ] 1.4 Verify Tailwind class renders (`text-2xl font-bold`)
- [ ] 1.5 Update unit test to assert Tailwind class present

---

## 2  Global State & Controls (Context)
- [ ] 2.1 Create `AppContext.tsx`
  - [ ] State fields : rows, cols, layout, speed, theme, controlsVisible
  - [ ] Default values (3×3, uniform, 10 chunks/s, dark, true)
  - [ ] Bound-checked setter helpers
- [ ] 2.2 Wrap `<App>` in `AppProvider`
- [ ] 2.3 Unit tests: default values, bounds enforcement

### ControlsPanel Skeleton
- [ ] 2.4 Build `<ControlsPanel />`
  - [ ] Rows +/– buttons (disable at 1 and 15)
  - [ ] Cols +/– buttons
  - [ ] Slider 1–20 (speed)
  - [ ] Toggle: layout (uniform/scattered)
  - [ ] Toggle: theme (dark/light)
  - [ ] Hide button (toggles `controlsVisible`)
- [ ] 2.5 Bind controls to context
- [ ] 2.6 Unit tests: row increment, slider updates speed

---

## 3  Terminal Window UI
- [ ] 3.1 Install `react-draggable` & `react-resizable`
- [ ] 3.2 Create `<TerminalWindow />`
  - [ ] Mac terminal chrome (red/yellow/green)
  - [ ] Monospace content area
  - [ ] Blinking cursor placeholder
  - [ ] Wrap with Draggable + Resizable
    - [ ] Min 200×100px
    - [ ] Max 1200×800px
- [ ] 3.3 Snapshot test of static UI
- [ ] 3.4 Clamping tests for resize

---

## 4  Layout Engine
- [ ] 4.1 Implement `gridPlacement(rows, cols)` util
  - [ ] Returns `{ left, top, width, height }` in %
  - [ ] Unit test 2×2 scenario
- [ ] 4.2 Render `rows*cols` TerminalWindows positioned by grid util
- [ ] 4.3 Uniform layout snap logic: on drag stop, snap to nearest grid cell
- [ ] 4.4 Scattered layout:
  - [ ] Randomize all windows on toggle
  - [ ] No snapping thereafter
  - [ ] Unit test: positions differ after toggle

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
- [ ] 7.4 Manual QA: change rows/cols during animation

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
  - [ ] Verify 3×3 grid animates
  - [ ] Toggle dark/light, scattered, hide menu
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
