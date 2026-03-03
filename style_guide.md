# Mind-Edu App Style Guide

> [!NOTE]
> This guide defines the design system for the Mind-Edu application, focusing on a calming, supportive aesthetic while adopting the high-impact structural and typographic patterns of premium modern web apps.

## 1. Color Palette (OKLCH)

We maintain a calming, supportive palette to align with the mental health and education theme.

### Theme Colors
- **Background** (`--background`): `oklch(0.98 0.008 220)` - Soft, calming blue-tinted white.
- **Foreground** (`--foreground`): `oklch(0.25 0.02 250)` - Deep blue-gray for high readability.
- **Primary** (`--primary`): `oklch(0.55 0.15 220)` - Serene medium blue, used for main actions.
- **Secondary** (`--secondary`): `oklch(0.60 0.12 160)` - Soft teal/green, representing growth and calm.
- **Accent** (`--accent`): `oklch(0.70 0.14 180)` - Gentle cyan for highlights and micro-interactions.

## 2. Typography Hierarchy (The Scale)

Inspired by high-end design, we use bold, geometric typography with semantic sizing tokens.

| Token Name | Tailwind Class | Usage |
| :--- | :--- | :--- |
| **The Giant Hero** | `text-6xl md:text-8xl font-bold tracking-tight leading-[0.9]` | Landing page hero headlines |
| **The Bold Statement** | `text-4xl md:text-5xl font-bold tracking-tight` | Sector/Page headings |
| **The Section Header** | `text-2xl md:text-3xl font-semibold` | Sub-sections and large card titles |
| **The UI Label** | `text-xs font-bold uppercase tracking-widest text-foreground/60` | Metadata, tags, small headers |
| **The Body Standard** | `text-lg md:text-xl leading-relaxed text-foreground/80` | Main content text |

## 3. Spacing & Layout System

We use a responsive spacing system to ensure a "Premium" breathable feel.

- **Max Container Width**: `max-w-7xl` (80rem / 1280px).
- **Hero Vertical Spacing**: `py-24 md:py-40` - Ample padding for focal sections.
- **Section Gap**: `space-y-24` - To separate distinct functional areas.
- **Inner Padding**: `p-8 md:p-12` - For cards and glass panels to feel expensive.

## 4. UX & Animation "Magic" (21st.dev Inspired)

We use **Framer Motion** and **Tailwind Animate** to create a "living" interface.

### Animation Tokens
- **Snappy**: `0.3s` | **Smooth**: `0.5s` | **Fluid**: `0.8s`.
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (Out-Expo) for premium entrance reveals.

### Signature Patterns
1.  **Entrance Reveals**: Staggered `opacity: 0` and `y: 20` to `y: 0`.
2.  **Shiny Surfaces**: Subtle light-sweep effects on primary buttons.
3.  **Scroll Parallax**: Gentle Y-axis offset on decorative background shapes.

## 5. Components & High-End FX

### Glassmorphism (The "Pro" Standard)
Glass effects must shift subtly between themes to remain legible and premium.

| Mode | Background Fill | Border Style | Blur Radius |
| :--- | :--- | :--- | :--- |
| **Light** | `rgba(255, 255, 255, 0.4)` | `1px solid rgba(0, 0, 0, 0.1)` | `24px` |
| **Dark** | `rgba(30, 41, 59, 0.4)` | `1px solid rgba(255, 255, 255, 0.1)` | `24px` |

### Interaction Patterns
- **Hover Scale**: Use `scale-[1.02]` for cards to avoid pixel blurring on lower DPI screens.
- **Tap Feedback**: Always include a `whileTap={{ scale: 0.98 }}` for tactile response.

---

### Implementation Note
Styles are integrated via Tailwind CSS v4 and Framer Motion. All new components must prioritize structural impact, spacing, andlegibility across both light and dark modes.
