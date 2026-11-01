---
name: Calm Utility
colors:
  surface: '#031427'
  surface-dim: '#031427'
  surface-bright: '#2a3a4f'
  surface-container-lowest: '#000f21'
  surface-container-low: '#0b1c30'
  surface-container: '#102034'
  surface-container-high: '#1b2b3f'
  surface-container-highest: '#26364a'
  on-surface: '#d3e4fe'
  on-surface-variant: '#bacac5'
  inverse-surface: '#d3e4fe'
  inverse-on-surface: '#213145'
  outline: '#859490'
  outline-variant: '#3c4a46'
  surface-tint: '#3cddc7'
  primary: '#57f1db'
  on-primary: '#003731'
  primary-container: '#2dd4bf'
  on-primary-container: '#00574d'
  inverse-primary: '#006b5f'
  secondary: '#b9c8de'
  on-secondary: '#233143'
  secondary-container: '#39485a'
  on-secondary-container: '#a7b6cc'
  tertiary: '#afe0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#5ec9ff'
  on-tertiary-container: '#005371'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#62fae3'
  primary-fixed-dim: '#3cddc7'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005047'
  secondary-fixed: '#d4e4fa'
  secondary-fixed-dim: '#b9c8de'
  on-secondary-fixed: '#0d1c2d'
  on-secondary-fixed-variant: '#39485a'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#031427'
  on-background: '#d3e4fe'
  surface-variant: '#26364a'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system is built around intentional restraint, functional minimalism, and cognitive ease. Designed as a personal daily tool, it rejects visual noise, high-stimulus neon effects, and decorative distractions in favor of quiet confidence and unhindered focus.

### Design Principles
- **Clarity over Display:** Every visual mark must earn its presence. Surface hierarchy and subtle tonal contrast take precedence over heavy embellishments.
- **Low-Arousal Dark Mode:** Uses warm, muted graphite and deep slate backgrounds instead of harsh pitch-black or hyper-saturated accents, reducing eye strain across extended usage.
- **Micro-Delight through Precision:** Tactile feedback, predictable interactions, crisp geometric text, and balanced spacing convey an aura of Swiss-inspired instrument design.

## Colors

The palette establishes an understated, calm dark environment built with deep graphite neutrals and a soft, muted teal accent that signals active status or focus without aggressive glare.

### Palette Roles
- **Base Canvas (`#0F1115`):** The foundational dark matte surface, neutral with slight slate undertones to prevent optical vibration.
- **Surfaces & Cards (`#181B20` - `#22262E`):** Layered graphite containers that provide gentle separation from the canvas.
- **Subtle Borders (`#2E3440` / `rgba(255, 255, 255, 0.08)`):** Crisp hairline boundaries defining edges without visual weight.
- **Primary Accent (`#2DD4BF`):** A soft mineral teal reserved strictly for interactive indicators, primary callouts, and confirmations.
- **Secondary Accent (`#94A3B8`):** Cool slate for supporting meta-information, secondary controls, and inactive states.
- **Text & Contrast:** Primary text rests at `#F1F5F9` (95% luminance), secondary body text at `#94A3B8`, and disabled/muted text at `#64748B`.

## Typography

The typographic hierarchy prioritizes rapid scanning, effortless legibility, and tabular precision.

- **Primary Typeface (Geist):** Clean, neo-grotesque structural letterforms designed for developer tools and modern productivity interfaces. Delivers high legibility across dense dashboard modules and body text.
- **Functional Label & Data Typeface (JetBrains Mono):** Reserved for metrics, date badges, tags, system statuses, and numerical tables, underscoring the utility-first aesthetic.
- **Typographic Scale:** Ratios remain tight, prioritizing comfortable reading lines over dramatic scale jumps. Tracking is tightened slightly for headings to produce compact, solid anchors.

## Layout & Spacing

A disciplined, fluid 12-column layout handles data views, while single-column focused flows maintain a centered, maximum readable measure of 680px.

### Grid & Breakpoints
- **Mobile (< 640px):** Single-column layout with `1rem` margins and `1rem` gutters. Toolbars dock cleanly to the bottom or header.
- **Tablet (640px - 1024px):** 6-column fluid grid, `1.5rem` margins and gutters. Sidebars collapse to minimal icon rails.
- **Desktop (> 1024px):** 12-column fluid grid with a maximum content container of `1280px` centered on canvas, `2.5rem` outer margins, and `1.5rem` gutters.

### Rhythm
Component density is strictly managed with `0.25rem` (4px) increments. Spacing prioritizes breathing room around key blocks while keeping related data items tightly grouped.

## Elevation & Depth

This system avoids heavy drop shadows and glowing outlines in favor of structured surface tiers and subtle hairline boundaries.

### Tonal Stratification
- **Canvas Base (`#0F1115`):** The primary ground plane.
- **Surface Level 1 (`#16191F`):** Standard container surfaces (cards, sidebars, list groups) paired with a `1px solid rgba(255, 255, 255, 0.06)` boundary.
- **Surface Level 2 (`#1F232B`):** Hover states, nested rows, dropdown flyouts, and modal panels.
- **Surface Level 3 (`#292E38`):** Active toggles, active tab segments, and tooltips.

### Shadow Philosophy
Shadows are minimal and purely ambient:
- **Floating Overlays (Modals, Popovers):** `0 8px 24px -4px rgba(0, 0, 0, 0.45)`, combined with a `1px solid rgba(255, 255, 255, 0.1)` boundary.
- Flat cards and inputs do not use drop shadows; depth is communicated solely via tonal contrast and hairline borders.

## Shapes

The geometry follows a restrained, soft-cornered approach (Scale `1`), reinforcing an engineered and tool-like aesthetic.

### Corner Radii
- **Standard UI Elements (`0.25rem` / 4px):** Checkboxes, inline code badges, tooltips, and small tags.
- **Medium Elements (`0.5rem` / 8px):** Buttons, inputs, search fields, chips, and table row groupings.
- **Large Containers (`0.75rem` / 12px):** Content cards, dialog boxes, floating sidebars, and panels.
- Fully round (pill) shapes are intentionally excluded except for circular avatar chips and status pips to maintain a grounded architectural feel.

## Components

### Buttons
- **Primary:** Solid teal background (`#2DD4BF`) with deep slate text (`#0F1115`), `font-weight: 500`. On hover, softens to `#5EEAD4`. No drop shadows or neon glows.
- **Secondary:** Surface background (`#1F232B`) with neutral-light text (`#F1F5F9`) and a hairline border (`#2E3440`). Hover shifts background to `#292E38`.
- **Ghost/Tertiary:** Transparent background, slate text (`#94A3B8`). On hover, gains background `#181B20` and primary text brightness.
- **Padding & Height:** Height 36px (default), 8px horizontal padding for compact mode, 14px for standard.

### Inputs & Form Controls
- **Text Inputs:** Dark neutral surface (`#16191F`), `1px solid #2E3440` border, `0.5rem` radius. Placeholder text in `#64748B`.
- **Focus State:** Border shifts cleanly to `#2DD4BF` without outer glow rings; an optional subtle `1px` outline preserves high-contrast clarity.
- **Checkboxes & Radios:** `16px` dimension, subtle border `#3B4252` when unselected. Selected state shows solid `#2DD4BF` fill with a dark checkmark icon.

### Cards & Panels
- Constructed with `#16191F` background, hairline border `rgba(255, 255, 255, 0.07)`, and `1rem` internal padding.
- Headings are compact with muted trailing metadata in JetBrains Mono (`label-sm`).
- Hoverable interactive cards transition border color to `rgba(255, 255, 255, 0.16)` without vertical translation or scale transforms.

### Chips & Badges
- Compact height (22px), `0.25rem` radius, typography set in `label-sm` (`JetBrains Mono`).
- Neutral badges use `#1F232B` background with `#94A3B8` text.
- Status badges use a `6px` solid indicator dot (e.g., `#2DD4BF` for active/completed, `#F59E0B` for pending) paired with muted neutral text.

### Lists & Key-Value Rows
- Flat row layouts with a bottom separator of `1px solid rgba(255, 255, 255, 0.04)`.
- Left-aligned primary content with right-aligned tabular numbers or mono labels, ensuring calm scanning across operational views.