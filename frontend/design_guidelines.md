# Mining Safety Analysis Platform - Design Guidelines

## Design Approach
**Hybrid industrial-futuristic aesthetic**: Data-dense professional interface conveying authority in safety analysis. Draws from Linear's clean presentation and Grafana's dashboard layouts with distinctive industrial character.

## Typography

**Fonts**:
- Headlines: Space Grotesk (700, 600)
- Body/UI: Inter (400, 500, 600)
- Data/Metrics: JetBrains Mono (500)

**Scale**: Hero (text-5xl-7xl, font-bold, tracking-tight) → Section (text-3xl-4xl, font-semibold) → Dashboard (text-2xl) → Cards (text-lg) → Body (text-base, leading-relaxed) → Labels (text-sm, font-medium) → Captions (text-xs, uppercase, tracking-wide)

## Layout & Spacing

**Spacing**: 2, 4 (micro) | 6, 8 (component) | 8, 12 (cards) | 16, 20, 24 (sections) | 12, 16, 20 (margins)

**Grids**:
- Dashboard: 12-column, gap-6
- Analytics: 3-4 col (lg), 2 (md), 1 (mobile)
- Sidebar: 64px (collapsed), 256px (expanded)

**Containers**: Full-bleed (max-w-screen-2xl) | Content (max-w-7xl) | Forms (max-w-2xl) | Chat (max-w-4xl)

## Page Structures

### Landing Page (5-7 Sections)

1. **Hero** (100vh): 60/40 split layout. Left: headline "AI-Powered Safety Analysis", sub-head "300+ DGMS Records (2016-2022)", dual CTAs (backdrop-blur-lg). Right: dramatic mine imagery with gradient overlay. Animated stat counter + floating badge.

2. **Problem** (py-24): Centered max-w-4xl, bold stat "40% hazard patterns missed", 3-col pain points grid.

3. **AI Capabilities** (py-24): 2-col alternating (image-text). Sections: Autonomous Monitoring, Digital Safety Officer with screenshots.

4. **Features** (py-20): 4-col grid (2 tablet, 1 mobile). Cards: Real-time Trends, Pattern Detection, Reports, Compliance. Icon + title + 2 sentences + hover lift.

5. **Visualization Showcase** (py-24): Full-width dashboard mockup with callouts (maps, timelines, charts).

6. **Tech Stack** (py-16): 3-col grid - AI tech, data sources, compliance.

7. **CTA** (py-32): Centered max-w-3xl, dual CTA + trust badges.

### Dashboard Application

**Navigation**:
- Left sidebar: Logo, nav (Overview, Incidents DB, Analytics, AI Chat, Reports, Web Scraper, Settings), user profile
- Top bar: Search, notifications, breadcrumbs, quick actions

**Overview Page**:
- Top: Date range + filter chips
- KPI Row: 4 cards (incidents, alerts, compliance, trends)
- 3-col grid: Map (span-2) + alerts feed
- Row 2: Timeline chart + accident breakdown
- Row 3: Table preview + "View All"

**Incidents Database**: Filter sidebar (collapsible) | Sortable table (15-20 rows) | Columns: Date, Location, Type, Severity, Fatalities, Status, Actions | Expandable rows | Bulk actions | Export (CSV, PDF)

**Analytics**: Multi-tab (Trends, Patterns, Predictions, Comparisons) | 2-3 viz cards/tab | Persistent filters

**AI Chat**: 30/70 split (suggestions/history | chat). Multi-line input, inline visualizations, suggested query chips, user/AI distinction.

**Reports**: Card grid of reports | "Generate New" modal wizard | Download options

**Web Scraper**: Source config cards | Activity log | Manual triggers | Data preview

## Components

### Core

**Cards**: rounded-lg, border, shadow-sm, p-6-8 | Stat: centered metric (text-5xl) + label + trend | Interactive: hover:shadow-lg | Alert: left accent border, severity-coded

**Buttons**: Primary (rounded-lg, px-6 py-3, shadow-md) | Secondary (outlined, border-2) | Ghost (hover reveals bg) | Icon (square, rounded-lg) | CTA on images (backdrop-blur-lg)

**Forms**: Text (rounded-lg, border-2, px-4 py-3, focus ring) | Dropdowns (custom chevron) | Date (range calendar) | Search (leading icon, full-width)

**Navigation**: Sidebar (fixed, scrollable, grouped icons) | Top bar (sticky, shadow-sm) | Breadcrumbs (text-sm, chevrons) | Tabs (underline)

**Tables**: Zebra striping | Sticky header | Row hover | Sortable columns | Expandable rows | Bottom pagination

**Modals**: Wizard (multi-step progress) | Detail (full info) | Confirmation (max-w-md) | Backdrop (backdrop-blur-sm)

### Specialized

**Map Clusters**: Circular + count badges, severity rings, zoom reveals points, hover tooltips

**Alert Feed**: Chronological, timestamps, left severity stripe, type icon, dismissible slide

**AI Response**: Distinct bg, code-style for queries, inline charts, source citations

**Charts**: Chart.js/Recharts industrial theme | Maps: Mapbox/Leaflet custom markers | Timeline: horizontal scrollable | Heatmaps: grid-based

## Visual Assets

**Hero Image**: Underground tunnel OR aerial mine view, gradient overlay (dark bottom), right 40%, high-contrast desaturated

**Screenshots**: Dashboard mockups (map, chat, reports) in browser frames, alternating placement

**Icons**: Heroicons (UI) + custom industrial (features), outlined style, safety-orange accent

## Animations (Minimal)

- Stat counters: 1-2s counting on load
- Card hover: translateY(-4px)
- Charts: fade-in with delay
- Alerts: slide-in right
- Loading: gear rotation
- Sidebar: 300ms width transition
- NO scroll-triggered or complex transitions

## Accessibility

- WCAG AAA contrast for text
- Full keyboard navigation
- Screen reader labels (icons, charts)
- 2px focus rings
- Alt text all images/visualizations
- Clear form error messages

## Responsive

**Desktop (lg+)**: Multi-column, expanded sidebar, 12-col grids
**Tablet (md)**: 2-col grids, collapsible sidebar, stacked cards
**Mobile**: Single column, bottom tabs, simplified charts, hamburger menu

---

**Core Principle**: Command authority through bold industrial aesthetics while prioritizing data clarity for mission-critical mine safety analysis.