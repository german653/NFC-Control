---
name: Cybernetic Field Terminal
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353942'
  surface-container-lowest: '#0a0e16'
  surface-container-low: '#181c24'
  surface-container: '#1c2028'
  surface-container-high: '#262a33'
  surface-container-highest: '#31353e'
  on-surface: '#dfe2ee'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dfe2ee'
  inverse-on-surface: '#2c3039'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#d8ffe7'
  on-tertiary: '#003824'
  tertiary-container: '#65f2b5'
  on-tertiary-container: '#006d4a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0f131c'
  on-background: '#dfe2ee'
  surface-variant: '#31353e'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-keypad:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-desktop: 1.25rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 1.75rem
---

## Brand & Style

This design system targets independent tech entrepreneurs, pop-up hardware vendors, and mobile field operators issuing physical NFC access keys and specialized hardware. The personality is surgically precise, technical, ultra-reliable, and lightning-fast. 

The aesthetic marries **High-Tech Functional Minimalism** with **Industrial Glass & Neon Accents**. Deep obsidian and tactical charcoal surfaces provide infinite depth, against which high-luminance neon indicators signal device states, NFC antenna engagements, and offline transaction readiness with military-grade clarity. The interface must communicate immediate hardware telemetry and zero latency under chaotic field sales conditions.

## Colors

The palette is tuned for high-contrast visibility under direct sunlight and dark event halls alike:

- **Primary (`#00F0FF` - Electric Cyan):** Designates interactive focal points, active NFC scanning pulses, primary key controls, and focus states.
- **Secondary (`#3B82F6` - Neon Cobalt):** Governs structural interaction tiers, secondary metadata toggles, and system-level telemetry.
- **Tertiary (`#10B981` - Emerald Matrix):** Reserved strictly for successful offline cryptographic writes, verified NFC handshakes, successful sales settlements, and 100% synchronized local DB queues.
- **Surface Foundations:**
  - Base Backdrop: `#0B0F17` (Deep Obsidian Void).
  - Raised Shell / Primary Card Surface: `#131B2E` (Deep Tactical Charcoal).
  - Overlay / Surface Elevate: `#1B253F` (Midnight Slate).
- **Functional Warning & Error:** `#F59E0B` (Amber - syncing / cached queue) and `#EF4444` (Laser Red - write error / rejected card).
- **Text & Borders:**
  - Border Stroke: `rgba(255, 255, 255, 0.08)` baseline, escalating to `rgba(0, 240, 255, 0.35)` on active touch.
  - Text Primary: `#F8FAFC`.
  - Text Secondary: `#94A3B8`.

## Typography

Typography prioritizes instantaneous scannability and structural hierarchy:

- **Headlines & Interface Body (`Geist`):** Delivers clean neo-grotesque precision with ultra-tight geometric contours. Figures remain distinct during high-speed point-of-sale tallying.
- **Hardware Telemetry & Metrics (`JetBrains Mono`):** Applied exclusively across hex payloads, NFC serials (UIDs), currency subtotals, offline storage counters, and receipt SKU identifiers to preserve clean tabular alignment.
- Numerical fields must universally activate tabular figures (`font-variant-numeric: tabular-nums`) to prevent layout shifts during live total computations.

## Layout & Spacing

Designed fundamentally for handheld PWA viewport ergonomics, thumb-reach navigation, and vertical rapid-fire flow:

- **Mobile Viewport Structure:** Dynamic viewport height (`100dvh`), locked against pinch-zoom distortion. Critical interactive controls (numeric entry grid, instant charge triggers) reside within the lower 42% "thumb zone."
- **Grid Structure:** 4-column fluid layout on mobile screens (`< 640px`) expanding to 8 columns on tablet/foldable terminal views (`640px - 1024px`).
- **Rhythm Rules:** Dense, ergonomic spacing ensures critical hardware statuses, shopping carts, and input fields remain above the virtual viewport fold without requiring scrolling.

## Elevation & Depth

Visual hierarchy uses **Tactical Tonal Layering** paired with **Micro-Luminescent Ghost Borders** rather than conventional blurred drop shadows:

- **Base Layer (Level 0):** Pure `#0B0F17` backdrop.
- **Surface Tier 1 (Level 1):** Solid `#131B2E` with a 1px border stroke of `rgba(255, 255, 255, 0.07)`. Applied to POS item cells and list clusters.
- **Floating Overlay (Level 2):** Elevated `#1B253F` with 1px border `rgba(0, 240, 255, 0.22)` and a soft ambient glow: `0 8px 24px -4px rgba(0, 0, 0, 0.65), 0 0 16px -2px rgba(0, 240, 255, 0.12)`. Applied to receipt drawers, active NFC scan modals, and keypad panels.
- **Hardware Trigger States:** Active NFC induction states cast a high-frequency cyan aura: `box-shadow: 0 0 20px rgba(0, 240, 255, 0.25), inset 0 0 12px rgba(0, 240, 255, 0.15)`.

## Shapes

The interface employs a **Soft Architectural (`1`)** shape language:
- Core UI structures, keypad cells, and cards use `0.25rem` (4px) to `0.5rem` (8px) corner radii.
- This creates an intentional laboratory-grade hardware aesthetic that feels like an integrated display on an industrial scanner rather than an everyday social application.
- Badges and status pills use capped corner radiuses of `0.25rem` to retain technical rigidity.

## Components

### Action Buttons
- **Primary Terminal Trigger ("Charge / Scan NFC"):** Background `#00F0FF`, text `#0B0F17`, font weight 600. Active touch collapses down 1px with immediate 120ms optical feedback.
- **Secondary Action ("Add SKU / Hold"):** Transparent fill with 1px border `rgba(255, 255, 255, 0.15)`, text `#F8FAFC`. Active state tint: `rgba(59, 130, 246, 0.12)`.
- **Destructive / Cancel:** Translucent `#EF4444` at 12% fill with crisp `#EF4444` typography.

### Hardware Fast-Input Keypad
- Grid of 3x4 touch targets minimum 56px in height.
- Dark slate fills (`#131B2E`) separated by 1px sub-grid gutters (`#1B253F`).
- Immediate tactile feedback: switches border color to `#00F0FF` within 40ms of touch contact.

### Hardware & Local DB Status Badges
- Encapsulated pills in `JetBrains Mono` at `label-sm` (10px).
- **Offline / Local DB Sync Indicator:** Deep charcoal container with a 6px status LED dot. Green (`#10B981`) for `SYNCED`, Pulsing Amber (`#F59E0B`) for `STORED (OFFLINE: N)`.
- **NFC Ready Badge:** Outlined pill displaying antenna icon and frequency indicator (`13.56MHz / READY`).

### Cards & Hardware List Items
- Contained within `#131B2E` with 1px border `rgba(255, 255, 255, 0.06)`.
- Includes leading mono-font stock indicators, title, and bold price metric right-aligned.

### Receipt Preview Canvas
- Monospaced receipt container utilizing simulated thermal styling: deep surface `#080C13` with top/bottom micro-serrated borders, monospace typography, cryptographic transaction hash string, and a crisp QR confirmation code.