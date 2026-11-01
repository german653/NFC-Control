---
name: Precision Ledger
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffffff'
  on-tertiary: '#003640'
  tertiary-container: '#acedff'
  on-tertiary-container: '#006e81'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
  headline-md:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
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
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system is engineered for uncompromising speed, clarity, and focus. Built for operators, makers, and solo proprietors managing physical inventory and cash flow, the interface eliminates cognitive overhead through a razor-sharp, monochromatic architecture punctuated by high-contrast functional signals.

### Philosophy and Visual Character
- **Utilitarian Minimalism:** Form strictly follows function. Decorative treatments, extraneous padding, and ambient illustrations are systematically omitted.
- **Instrument-Grade Tactility:** The interface behaves like physical precision hardware: crisp hairline boundaries, absolute contrast boundaries, instant states, and zero perceptual lag.
- **Selective Luminescence:** The deep obsidian background keeps the workspace quiet; high-visibility chromatic bursts appear strictly to indicate transactional status, critical thresholds, or definitive interactive triggers.

## Colors

The palette is rooted in an ultra-deep obsidian environment, giving structure to dense numerical and stock information without glare or visual fatigue.

### Monochromatic Core
- **Base Canvas (`#0A0A0A`):** The primary ground surface for all full-screen views.
- **Elevated Canvas (`#121212`):** First-tier containers, sheets, and card modules.
- **Sub-tier Surface (`#171717`):** Inputs, secondary rows, and inactive states.
- **Hairline Border (`#262626`):** Structural boundaries, delimiters, and data table rules.
- **Muted Label / Meta (`#737373`):** Units of measure, timestamps, deactivated actions, and hints.
- **Foreground Pure (`#FFFFFF`):** High-priority values, primary titles, and inverted high-contrast action fills.

### Functional Accents
- **Positive Inflow / Sales (`#10B981` Emerald):** Revenue records, stock surplus, positive delta indicators.
- **Stock Action / Navigation (`#06B6D4` Cyan):** Inventory movements, transfers, item scanning triggers.
- **Attention / Low Stock (`#F59E0B` Amber):** Reorder warnings, pending transactions, non-blocking errors.
- **Expense / Outflow (`#EF4444` Crimson):** Operational expenditures, write-offs, negative margins.

## Typography

The typographic hierarchy prioritizes tabular alignment, scannability, and structural rigidity.

- **Primary Typeface (Geist):** Used across primary navigation, structural headings, narrative descriptors, and high-level interface labels. Its neutral geometry remains legible even in compressed viewports.
- **Technical & Numeric Typeface (JetBrains Mono):** Mandatory for all stock keeping units (SKUs), balance ledgers, inventory counts, timestamps, and transactional values. Tabular numerals prevent baseline jitter during rapid entry and balance updates.
- **Optical Balance:** Negative tracking (`-0.015em`) is applied to headline levels 18px and above to create a compact, display-grade appearance. Monospaced elements maintain native letter-spacing for maximum tabular clarity.

## Layout & Spacing

A compact, fluid layout governs all data grids and input panels, maintaining rhythm across compact handheld devices and multi-column desktop control centers.

### Layout Mechanics
- **Base Grid:** 4px baseline module. All margins, gutters, heights, and layout gaps adhere strictly to multiples of 4.
- **Desktop (1024px+):** Fluid 12-column grid, 2rem margins, 1.5rem gutters. Maximum container width capped at 1440px for data density without excessive eye scanning distances.
- **Tablet (640px - 1023px):** Fluid 8-column grid, 1.5rem margins, 1rem gutters.
- **Mobile (<640px):** Single-column layout with fixed top and bottom command anchors. 1rem canvas margins, 0.75rem vertical stack spacing for rapid thumb operation.

## Elevation & Depth

This system avoids decorative drop shadows and heavy blur effects, relying instead on structural hairline borders and tonal surfaces to distinguish layers.

### Structural Layering
- **Surface Level 0 (Base Canvas):** `#0A0A0A`. The foundational backdrop.
- **Surface Level 1 (Card & Module Shells):** `#121212` enclosed in a 1px solid `#262626` hairline rule.
- **Surface Level 2 (Inputs, Table Headers, Floating Overlays):** `#171717` enclosed in a 1px solid `#333333` hairline rule.
- **Modal Drawers & Overlays:** `#0E0E0E` with a 1px `#404040` structural edge. Backdrops use a hard 60% opacity `#000000` shroud with zero backdrop blur to ensure performance on lower-tier hardware.

## Shapes

The interface balances sharp industrial utility with ergonomic micro-radii to produce a balanced, functional feel.

- **Base Radius (0.25rem / 4px):** Standard for input fields, data rows, inline metrics, and notification toasts.
- **Large Radius (`rounded-lg` / 8px):** Structural card containers, modal dialogue panels, and slide-in sheets.
- **Component Exception (Pills):** Interactive action pills, filter chips, and numeric status badges apply a full round radius (`9999px`) to immediately distinguish active controls from static tabular structures.

## Components

### Buttons & Quick Actions
- **Primary Action (Pill):** Solid `#FFFFFF` fill, `#0A0A0A` text, 9999px border radius, bold tabular text. Hover transition scales surface brightness down slightly to `#E5E5E5`.
- **Accent Action (Positive Record):** Solid `#10B981` fill with `#0A0A0A` text or dark `#0A0A0A` fill with a 1px `#10B981` border and `#10B981` text for recording income/sales.
- **Secondary / Ghost:** 1px solid `#262626` outline, `#FFFFFF` text, transparent background. Active state shifts background to `#171717`.

### Metric & Status Chips
- Pill geometry with 0.25rem vertical and 0.75rem horizontal padding.
- Mono typography (`label-sm`).
- **Inflow / High Stock:** Background `rgba(16, 185, 129, 0.12)`, border `rgba(16, 185, 129, 0.3)`, text `#10B981`.
- **Outflow / Zero Stock:** Background `rgba(239, 68, 68, 0.12)`, border `rgba(239, 68, 68, 0.3)`, text `#EF4444`.
- **System Neutral:** Background `#171717`, border `#262626`, text `#A3A3A3`.

### Input Fields & Rapid Keyboards
- Strict 40px height for standard inputs, 48px for primary transaction amount entry.
- Background `#121212`, border 1px solid `#262626`, text `#FFFFFF`.
- Focus state activates a 1px solid `#FFFFFF` border with no ambient ring glow.
- Integral currency symbols, quantity steppers, and unit selectors are locked to monospaced fonts with a `#737373` color.

### Data Lists & Ledger Tables
- Flat architecture: alternating zebra striping is omitted in favor of 1px solid `#1A1A1A` dividers.
- Dense vertical padding (0.625rem / 10px).
- Numerical outputs and balances are right-aligned using `JetBrains Mono`. Descriptions and transaction titles remain left-aligned in `Geist`.

### Selection Controls
- **Checkboxes & Radios:** 16px square/circle with a 1px `#404040` border. On selection, fills with `#FFFFFF` using an inverted `#0A0A0A` inner check icon. Zero animation lag.