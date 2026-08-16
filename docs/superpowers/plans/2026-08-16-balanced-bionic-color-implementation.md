# Balanced Bionic Color Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply Team 4909's approved Balanced Bionic green palette to generic frontend branding without changing layout, copy, behavior, or semantic competition colors.

**Architecture:** Add a named `bionic` palette to the existing Tailwind configuration and consume those tokens directly in the current components. Recolor the shared shell and generic interactive states, while retaining an explicit whitelist of red/blue alliance, analytical, and third-party colors.

**Tech Stack:** Next.js 13 Pages Router, React 18, TypeScript 4.9, Tailwind CSS 3, Node's built-in test runner

## Global Constraints

- This phase changes color only; the product remains named Statbotics.
- Do not alter layout, spacing, responsive breakpoints, typography, component structure, navigation, copy, data flow, or functionality.
- Use `#092017` for `brand-900`, `#154733` for `brand-700`, `#DDEBE5` for `brand-100`, `#F1F7F4` for `brand-50`, and `#A7D129` for `accent-lime`.
- All updated foreground/background pairs must meet WCAG AA contrast.
- Preserve red/blue alliance colors, analytical color scales, meaningful chart series, and third-party branding.
- Review every blue class in context; do not perform an unrestricted global replacement.
- Do not implement the deferred BionicBotics name, concept-A navbar logo, or concept-B favicon/crest.

---

### Task 1: Define and test the Bionic palette

**Files:**
- Create: `frontend/tests/tailwind-config.test.js`
- Modify: `frontend/tailwind.config.js:11`

**Interfaces:**
- Consumes: The five approved palette values from the design specification.
- Produces: Tailwind classes `bionic-50`, `bionic-100`, `bionic-700`, `bionic-900`, and `bionic-lime`.

- [ ] **Step 1: Write the failing palette and contrast tests**

```js
const assert = require("node:assert/strict");
const test = require("node:test");

const config = require("../tailwind.config.js");

const toRgb = (hex) => {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16));
};

const luminance = (hex) => {
  const channels = toRgb(hex).map((value) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const contrast = (foreground, background) => {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
};

test("Tailwind exposes the approved Balanced Bionic palette", () => {
  assert.deepEqual(config.theme.extend.colors.bionic, {
    50: "#F1F7F4",
    100: "#DDEBE5",
    700: "#154733",
    900: "#092017",
    lime: "#A7D129",
  });
});

test("approved text and background combinations meet WCAG AA", () => {
  const bionic = config.theme.extend.colors.bionic;
  const pairs = [
    ["#FFFFFF", bionic[900]],
    ["#FFFFFF", bionic[700]],
    ["#1F2937", bionic[50]],
    ["#1F2937", bionic[100]],
  ];

  for (const [foreground, background] of pairs) {
    assert.ok(contrast(foreground, background) >= 4.5);
  }
});
```

- [ ] **Step 2: Run the test and verify the intended failure**

Run from `frontend`:

```powershell
node --test tests\tailwind-config.test.js
```

Expected: FAIL because `config.theme.extend.colors.bionic` is `undefined`.

- [ ] **Step 3: Add the palette to Tailwind**

Add this object under `theme.extend.colors` without changing the existing width or font-size extensions:

```js
bionic: {
  50: "#F1F7F4",
  100: "#DDEBE5",
  700: "#154733",
  900: "#092017",
  lime: "#A7D129",
},
```

- [ ] **Step 4: Run both configuration test files**

```powershell
node --test tests\tailwind-config.test.js tests\next-config.test.js
```

Expected: 3 tests pass and 0 tests fail.

- [ ] **Step 5: Commit the palette contract**

```powershell
git add frontend\tailwind.config.js frontend\tests\tailwind-config.test.js
git commit -m "test: define balanced bionic palette"
```

---

### Task 2: Recolor the shared shell and interaction primitives

**Files:**
- Modify: `frontend/src/pagesContent/navbar.tsx:80`
- Modify: `frontend/src/pages/_app.tsx:58`
- Modify: `frontend/src/styles/base.css:1`
- Modify: `frontend/src/pagesContent/shared/tabs.tsx:57`
- Modify: `frontend/src/components/filterBar.tsx:129`
- Modify: `frontend/src/components/Table/InsightsTable.tsx:54,70`

**Interfaces:**
- Consumes: Tailwind `bionic-*` classes from Task 1.
- Produces: The common shell, shared links/icons/tabs, filter focus state, and table hover state used throughout the application.

- [ ] **Step 1: Apply the exact shared-shell class changes**

Use these replacements only in the listed shared files:

```text
navbar inline background #343A40       -> bg-bionic-900
navbar mobile border-gray-500          -> border-bionic-700
navbar mobile divider bg-gray-600      -> bg-bionic-700
footer white/gray shell                -> bg-bionic-900 text-gray-100 border-bionic-700
.text_link text-blue-500               -> text-bionic-700
.text_link hover:text-blue-600         -> hover:text-bionic-900
.hover_icon hover:text-blue-600        -> hover:text-bionic-700
inactive tab text-blue-500             -> text-bionic-700
inactive tab hover:text-blue-600       -> hover:text-bionic-900
focus:outline-inputBlue                -> focus:outline-bionic-700
border-inputBlue                       -> border-bionic-700
InsightsTable md:hover:bg-blue-100     -> md:hover:bg-bionic-100
```

The navbar wrapper must become:

```tsx
<div className="w-full flex flex-col shadow-md text-gray-100 bg-bionic-900">
```

The footer wrapper must retain its current size and spacing and become:

```tsx
<footer className="w-full border-t border-bionic-700 bg-bionic-900 text-gray-100 text-center pt-3 pb-2">
```

Keep the `text-blue-500` class on the “The Blue Alliance” footer link because it is third-party branding.

- [ ] **Step 2: Type-check the shared component edits**

```powershell
npx tsc --noEmit
```

Expected: exit code 0 with no TypeScript errors.

- [ ] **Step 3: Re-run the palette and deployment tests**

```powershell
node --test tests\tailwind-config.test.js tests\next-config.test.js
```

Expected: 3 tests pass and 0 tests fail.

- [ ] **Step 4: Commit the shared color layer**

```powershell
git add frontend\src\pagesContent\navbar.tsx frontend\src\pages\_app.tsx frontend\src\styles\base.css frontend\src\pagesContent\shared\tabs.tsx frontend\src\components\filterBar.tsx frontend\src\components\Table\InsightsTable.tsx
git commit -m "style: apply bionic colors to shared shell"
```

---

### Task 3: Recolor generic page and component accents

**Files:**
- Modify: `frontend/src/components/Figures/Bubble.tsx:268`
- Modify: `frontend/src/components/MatchTable.tsx:63,73,102,124`
- Modify: `frontend/src/components/Table/MatchBreakdown.tsx:168`
- Modify: `frontend/src/pages/index.tsx:25`
- Modify: `frontend/src/pages/blog/index.tsx:51`
- Modify: `frontend/src/pages/blog/sos/index.tsx:57,71`
- Modify: `frontend/src/pagesContent/blog/intro/main.tsx:36,59,74,85,132,200,231,267,276,318`
- Modify: `frontend/src/pagesContent/blog/shared/table.tsx:218,247,291,318,343,350`
- Modify: `frontend/src/pagesContent/event/[event_id]/simulation.tsx:264,303,311`
- Modify: `frontend/src/pagesContent/event/[event_id]/sos.tsx:286,296,308`
- Modify: `frontend/src/pagesContent/events/summary.tsx:36,76`
- Modify: `frontend/src/pagesContent/matches/noteworthy.tsx:45`
- Modify: `frontend/src/pagesContent/matches/upcoming.tsx:27`
- Modify: `frontend/src/pagesContent/team/overview.tsx:195,207`
- Modify: `frontend/tailwind.config.js:11`

**Interfaces:**
- Consumes: Tailwind `bionic-*` classes and shared primitives from Tasks 1–2.
- Produces: Balanced Bionic styling on generic page-level links, controls, row/card hovers, table emphasis, and the homepage headline.

- [ ] **Step 1: Apply the approved generic-accent mapping**

Apply this mapping only where the listed line is a generic interaction or presentation state:

```text
text-blue-500                       -> text-bionic-700
text-blue-600                       -> text-bionic-700
hover:text-blue-600                 -> hover:text-bionic-900
hover:text-blue-700                 -> hover:text-bionic-900
bg-blue-500                         -> bg-bionic-700
bg-blue-800                         -> bg-bionic-900
hover:bg-blue-50                    -> hover:bg-bionic-50
bg-blue-100 / hover:bg-blue-100     -> bg-bionic-100 / hover:bg-bionic-100
```

Where a link already uses `text_link`, remove its redundant explicit `text-blue-500` rather than adding another color class.

Change the homepage headline from the red/violet/blue gradient to the approved green-only treatment:

```tsx
"text-transparent bg-clip-text bg-gradient-to-r from-bionic-900 via-bionic-700 to-bionic-900"
```

After the last usages are migrated, remove the now-unused `inputBlue`, `gradientBlue`, and `gradientRed` entries from `tailwind.config.js`. Keep `bionic-lime` available but do not force it onto a large surface or text treatment.

- [ ] **Step 2: Preserve the semantic and third-party exceptions exactly**

Do not change these blue classes or inline colors:

```text
src/pages/_app.tsx
  The Blue Alliance link: text-blue-500

src/components/Table/shared.tsx
  conditional percentile/probability scale: text-blue-800 bg-blue-200

src/components/Table/MatchBreakdown.tsx
  blue alliance header: bg-blue-200

src/pagesContent/match/[match_id]/summary.tsx
  all red/blue prediction, probability, score, and winner colors

src/pagesContent/matches/noteworthy.tsx
  blueAccessor result color: text-blue-600

src/components/MatchTable.tsx
  lightBlue #EEEEFF alliance backgrounds
```

In `MatchBreakdown.tsx`, change only the generic row hover from `hover:bg-blue-100` to `hover:bg-bionic-100`; retain the `bg-blue-200` alliance header.

In `MatchTable.tsx`, recolor the video, match-title, and team-number link text because both alliances currently share those generic link classes; retain the red/blue alliance backgrounds and winner logic.

- [ ] **Step 3: Type-check and run configuration tests**

```powershell
npx tsc --noEmit
node --test tests\tailwind-config.test.js tests\next-config.test.js
```

Expected: both commands exit 0; 3 tests pass and 0 fail.

- [ ] **Step 4: Commit the page-level color migration**

```powershell
git add frontend\tailwind.config.js frontend\src\components frontend\src\pages frontend\src\pagesContent
git commit -m "style: recolor generic accents with bionic green"
```

---

### Task 4: Audit semantics and verify the production result

**Files:**
- Verify only; modify a file only if a verification step exposes a defect in the approved color migration.

**Interfaces:**
- Consumes: The completed color migration from Tasks 1–3.
- Produces: Evidence that the build works, generic accents are green, semantic colors remain intact, and the interface structure is unchanged.

- [ ] **Step 1: Audit every remaining Tailwind blue class**

```powershell
rg -n "blue-(50|100|200|500|600|700|800)" src -g "*.tsx" -g "*.css"
```

Expected: results occur only in this whitelist:

```text
src/pages/_app.tsx
src/components/Table/shared.tsx
src/components/Table/MatchBreakdown.tsx
src/pagesContent/match/[match_id]/summary.tsx
src/pagesContent/matches/noteworthy.tsx
```

Inspect each result and confirm it matches the semantic/third-party exception documented in Task 3.

- [ ] **Step 2: Run formatting and diff checks**

```powershell
npx prettier --check src tailwind.config.js tests
git diff --check
git status --short
```

Expected: Prettier and `git diff --check` exit 0. Status contains no unexpected or unrelated files.

- [ ] **Step 3: Run the full automated verification**

```powershell
node --test tests\*.test.js
npm run lint
$env:VERCEL='1'; $env:NEXT_TELEMETRY_DISABLED='1'; npm run build
```

Expected: all Node tests pass, lint reports no errors, and the production build exits 0 after generating all pages.

- [ ] **Step 4: Inspect representative desktop and mobile states**

Run the production build locally and inspect each route at 1440px and 390px widths:

```powershell
npm run start -- -p 3011
```

Inspect:

```text
/
/teams?year=2026
/events?year=2026
/matches?year=2026
/team/4909/2026
/event/2026mabos
/compare
/blog
/blog/intro
```

For each representative page, verify:

```text
- navbar/footer use brand-900 without spacing or wrapping changes
- links, buttons, tabs, focus rings, and generic hover states use brand-700/900
- pale generic selections and hovers use brand-50/100
- text remains readable in default, hover, focus, active, selected, and dropdown states
- red/blue alliances and analytical colors are unchanged
- third-party logos and The Blue Alliance identity are unchanged
- no product name, copy, layout, typography, or behavior changed
```
