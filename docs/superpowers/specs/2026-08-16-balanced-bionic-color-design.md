# Balanced Bionic Color Redesign

## Objective

Recolor the existing frontend with Team 4909's Bionic-inspired green palette while preserving the current interface, content, behavior, and data semantics.

This phase changes color only. The product remains named Statbotics until a later branding phase.

## Approved Palette

- `brand-900`: `#092017` — navbar, footer, and primary hover states
- `brand-700`: `#154733` — links, active tabs, primary buttons, focus rings, and other interactive accents
- `brand-100`: `#DDEBE5` — selected rows and prominent soft-green states
- `brand-50`: `#F1F7F4` — subtle hover backgrounds
- `accent-lime`: `#A7D129` — small decorative highlights only
- White and the existing neutral-gray scale remain the primary content colors.

All foreground/background pairings must meet WCAG AA contrast for their text size and use.

## Application Rules

### Site shell

- Change the navbar and footer backgrounds to `brand-900`.
- Preserve their dimensions, spacing, typography, responsive behavior, menus, and shadows.
- Use white or existing light-neutral text and icons against the dark-green shell.

### Interactive elements

- Replace non-semantic blue links, active tabs, buttons, focus indicators, and hover accents with `brand-700`.
- Use `brand-900` for darker hover/pressed states.
- Use `brand-50` or `brand-100` where the existing interface uses pale blue for a generic hover, selection, or emphasis state.
- Use `accent-lime` only for small non-text highlights where it adds hierarchy without reducing readability.

### Semantic color exclusions

Do not recolor any blue or red that communicates competition or analytical meaning, including:

- red and blue alliances;
- match predictions, scores, win probabilities, and breakdowns;
- chart series whose colors distinguish datasets;
- table values or badges whose current color carries meaning;
- third-party logos and brand assets.

Each existing blue utility class must be reviewed in context. This is not a global blue-to-green text replacement.

## Explicitly Out of Scope

- Layout, spacing, responsive breakpoints, component structure, or navigation changes
- Typography changes
- Copy or historical article changes
- Replacing the Statbotics product name
- Logo, favicon, crest, or social-preview asset changes
- API, data flow, calculations, filters, or other functionality

The later identity phase will use the already approved directions: concept A for the BionicBotics navbar wordmark and concept B for the favicon and crest. Those assets are not part of this color-only implementation.

## Implementation Boundary

The implementation should define the reusable brand colors in the existing Tailwind configuration, then update only classes and inline styles that represent generic interface branding. It should avoid unrelated component refactors.

## Verification

- Run the existing automated tests.
- Run lint and the production build.
- Verify WCAG AA contrast for updated text and interactive states.
- Visually inspect desktop and mobile navigation.
- Visually inspect representative teams, events, matches, match-detail, comparison, API, and blog pages.
- Confirm hover, focus, active, selected, disabled, and dropdown states remain legible.
- Confirm alliance colors, analytical chart colors, and third-party logos are unchanged.
- Confirm there are no layout or copy changes.
