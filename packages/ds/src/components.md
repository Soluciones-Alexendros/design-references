# Base primitives — contract

Inventory for layout / forms / feedback. Modules are minimal subjects for lint, axe and playground — not production-final components.

## Manual a11y (outside CI job `a11y`)

Documented here for review; not gated by the automated job:

- Target size ≥ 24×24 CSS px (WCAG 2.2 AA 2.5.8)
- Information is not conveyed by color alone (WCAG 2.1 AA 1.4.1)
- `disabled`, `error` and `loading` states are visually distinct and announced

Automated gate (T8): contrast pairs + `:focus-visible` via axe-core (serious/critical).

---

## Button (forms / actions)

- **Module:** `src/components/Button.js` + `Button.css`
- **Props:** `variant`: `primary` | `secondary` | `danger`; `disabled?: boolean`; `loading?: boolean`; `type?: button|submit|reset`
- **Tokens:**
  - `--ds-color-bg-primary`, `--ds-color-text-on-primary`
  - `--ds-color-bg-secondary`, `--ds-color-text-on-secondary`
  - `--ds-color-bg-error`, `--ds-color-text-on-error`
  - `--ds-color-bg-disabled`, `--ds-color-text-on-disabled`
  - `--ds-color-border-focus`
  - `--ds-space-sm`, `--ds-space-md`, `--ds-space-touch`
  - `--ds-radius-control`
  - `--ds-type-family-sans`, `--ds-type-size-label`, `--ds-type-weight-medium`
- **A11y:** native `<button>`; `:focus-visible` ring; `aria-busy` when loading; `disabled` when disabled

## Input (forms)

- **Module:** `src/components/Input.js` + `Input.css`
- **Props:** `type?: text|email|password|…`; `disabled?: boolean`; `invalid?: boolean`; `describedBy?: string`
- **Tokens:**
  - `--ds-color-bg-surface-elevated`, `--ds-color-text-on-surface`
  - `--ds-color-border-default`, `--ds-color-border-error`, `--ds-color-border-focus`
  - `--ds-color-bg-disabled`, `--ds-color-text-on-disabled`
  - `--ds-space-sm`, `--ds-space-md`, `--ds-space-touch`
  - `--ds-radius-control`
  - `--ds-type-family-sans`, `--ds-type-size-body`
- **A11y:** native `<input>`; `:focus-visible`; `aria-invalid` when invalid

## Card (layout)

- **Module:** `src/components/Card.js` + `Card.css`
- **Props:** `elevated?: boolean`
- **Tokens:**
  - `--ds-color-bg-surface-elevated`, `--ds-color-text-on-surface`
  - `--ds-color-border-default`
  - `--ds-space-md`, `--ds-space-lg`
  - `--ds-radius-surface`
  - `--ds-elevation-surface`
  - `--ds-type-family-sans`, `--ds-type-size-body`
- **A11y:** non-interactive container; no focus requirement unless made interactive by consumer

## Alert (feedback)

- **Module:** `src/components/Alert.js` + `Alert.css`
- **Props:** `tone`: `info` | `success` | `warning` | `error`; `role?: status|alert`
- **Tokens:**
  - `--ds-color-bg-primary` / `--ds-color-text-on-primary` (info)
  - `--ds-color-bg-success` / `--ds-color-text-on-success`
  - `--ds-color-bg-warning` / `--ds-color-text-on-warning`
  - `--ds-color-bg-error` / `--ds-color-text-on-error`
  - `--ds-space-md`, `--ds-radius-control`
  - `--ds-type-family-sans`, `--ds-type-size-body`
- **A11y:** `role="status"` or `role="alert"`; tone also reflected in text prefix for non-color cue

## Link (navigation)

- **Module:** `src/components/Link.js` + `Link.css`
- **Props:** `href`; `label`
- **Tokens:**
  - `--ds-color-text-link`
  - `--ds-color-border-focus`
  - `--ds-type-family-sans`, `--ds-type-size-body`, `--ds-type-weight-medium`, `--ds-type-lineHeight-body`
  - `--ds-space-xs` (underline offset)
- **A11y:** native `<a>`; `:focus-visible` ring; contrast pair `text.link / bg.surface`

## Stack (layout)

- **Module:** `src/components/Stack.js` + `Stack.css`
- **Props:** `gap`: `sm` | `md` | `lg`; `body` (HTML)
- **Tokens:** `--ds-space-sm`, `--ds-space-md`, `--ds-space-lg`
- **A11y:** non-interactive container; outside axe fixture (like Card)

## Field (forms)

- **Module:** `src/components/Field.js` + `Field.css`
- **Props:** `id`; `label`; `invalid?`; `error?`; composes `renderInput` (`type`, `disabled`, `value`)
- **Tokens:**
  - `--ds-color-text-on-surface`
  - `--ds-color-text-on-error`, `--ds-color-bg-error`, `--ds-color-border-error`
  - `--ds-space-xs`, `--ds-space-sm`, `--ds-space-md`
  - `--ds-radius-control`
  - `--ds-type-family-sans`, `--ds-type-size-label`, `--ds-type-weight-medium`, `--ds-type-lineHeight-tight`
- **A11y:** visible `<label for>`; error uses `aria-describedby` + text prefix `Error:`; pair `text.on-error / bg.error`
