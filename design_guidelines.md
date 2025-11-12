# Design Guidelines for Dockside Digital

## Design Approach

**Selected Approach:** Hybrid combining reference-based inspiration from modern SaaS landing pages (Linear, Stripe) with Material Design system principles for forms and data presentation.

**Justification:** This project requires both marketing impact (home page) and utility (intake/order forms). The coastal, maritime location in Halifax demands a distinctive visual identity that balances professionalism with approachability for local SMB clients.

**Core Design Principles:**
1. Maritime-inspired clarity: Clean, open layouts reflecting coastal aesthetics
2. Trust-first: Every touchpoint reinforces credibility for payment/order decisions
3. Speed perception: Lightweight visuals that feel fast and responsive
4. Local authenticity: Professional without corporate coldness

---

## Typography System

**Font Stack:**
- **Primary:** Inter (400, 500, 600, 700) via Google Fonts
- **Accent/Display:** Inter tight letter-spacing for headlines

**Hierarchy:**
- **H1 (Hero):** text-5xl md:text-6xl lg:text-7xl, font-bold, tracking-tight, leading-tight
- **H2 (Section Headers):** text-3xl md:text-4xl lg:text-5xl, font-bold, tracking-tight
- **H3 (Card Titles):** text-xl md:text-2xl, font-semibold
- **Body Large:** text-lg md:text-xl, font-normal, leading-relaxed
- **Body:** text-base, font-normal, leading-relaxed
- **Small/Meta:** text-sm, font-medium

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm

**Container Strategy:**
- Full-width sections with inner `max-w-7xl mx-auto px-6 md:px-8`
- Content-focused areas: `max-w-4xl mx-auto`
- Form columns: `max-w-6xl mx-auto` with `grid-cols-1 lg:grid-cols-2`

**Vertical Rhythm:**
- Section padding: `py-16 md:py-24 lg:py-32`
- Card/component spacing: `space-y-8` or `gap-8`
- Tight groupings: `space-y-4`

**Grid Patterns:**
- Services: 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`)
- Case Studies: 3-column masonry-style grid
- Pricing: 3 tiers + separate care plans section, centered cards `max-w-sm`
- Process: Single column on mobile, 2-3 columns on desktop with connecting lines

---

## Component Library

### Navigation
- Sticky header with blur backdrop (`backdrop-blur-lg bg-white/80`)
- Logo left, anchor links center, CTA button right
- Mobile: Sheet/drawer menu with large touch targets
- Height: `h-16 md:h-20`

### Hero Section
- **Layout:** Full viewport height (`min-h-[90vh]`) with centered content
- **Background:** Large hero image of Halifax harbor/waterfront with gradient overlay (dark to transparent top-to-bottom)
- **Content Stack:**
  - H1 with subtle fade-in animation
  - Subheading with staggered reveal
  - Two-button CTA group with primary + ghost variants, both with blurred backgrounds (`backdrop-blur-md bg-white/20 hover:bg-white/30`)
  - Social proof pill badge below CTAs
- **Spacing:** Content container `max-w-4xl` centered with generous padding

### Service Cards
- Large rounded containers (`rounded-2xl border border-gray-200 p-8 md:p-10`)
- Icon or small illustration at top (64x64px)
- Title, price range in muted text, bullet list of inclusions
- Hover: subtle lift (`hover:shadow-xl transition-shadow duration-300`)

### Case Study Cards
- Image thumbnail (16:9 aspect ratio) with overlay gradient
- Client logo or name badge positioned over image
- Stat callout (e.g., "+38% conversions") in bold accent text
- "Learn More" trigger opens modal with full details
- Modal: split layout with image left, writeup right, close button top-right

### Pricing Table
- Three tier cards side-by-side on desktop, stacked mobile
- Featured tier (Business Website) with distinct border or subtle glow
- Collapsible details accordion for "What's included"
- Care Plans: separate horizontal strip below tiers with 3 columns
- Deposit/payment terms in small text below table

### Process Timeline
- Horizontal on desktop, vertical on mobile
- 7 steps with connecting line/dots
- Icon + number + title + brief description per step
- Alternating alignment (zig-zag) for visual interest on desktop

### Forms (Intake & Order)
- Two-column layout on desktop (form left, summary/info right)
- Generous field spacing (`space-y-6`)
- Labels above inputs, helper text below
- Shadcn Input, Textarea, Select components with focus rings
- Live preview/summary panel with sticky positioning on scroll
- Submit button full-width on mobile, auto-width desktop (right-aligned)

### Contact CTA Bar
- Full-width section with centered content
- Large heading + two buttons side-by-side
- Email link as tertiary option below buttons
- Background: subtle gradient or pattern

### Footer
- Three-column layout: Logo/tagline, Quick Links, Contact info
- Social icons row
- Copyright centered at bottom
- Separator line above copyright

---

## Visual Elements

### Imagery Strategy
- **Hero:** High-quality photo of Halifax waterfront, harbor, or maritime scene (ships, lighthouse) - full-bleed with overlay
- **Case Studies:** Client work screenshots or representative imagery for each business (coffee shop interior, fitness facility, plumbing van)
- **About Section:** Team photo or Halifax cityscape
- **No imagery:** Services (icons only), Pricing, Process, Forms

### Icons
- **Library:** Lucide React (already specified in tech stack)
- **Usage:** Services cards (24-32px), Process steps (40-48px), Footer social (20px)
- **Style:** Outline/stroke style consistent with coastal modern aesthetic

### Animations
- Fade-in on scroll for section reveals (framer-motion)
- Stagger children for card grids
- Smooth anchor scroll with offset for sticky nav
- Hover states: gentle scale (1.02) or shadow changes only
- No distracting looping animations

---

## Page-Specific Guidelines

### Home Page
- Full single-page experience with 8 distinct sections
- Each section full viewport width with inner container
- Smooth scroll behavior with navigation highlighting active section
- Alternating background treatments: white, light gray (`bg-gray-50`), white pattern

### Intake Page
- Split-screen layout: form left (sticky), live summary right
- Copy button prominent with success state feedback
- Email submission shows toast notification
- Summary formatted as readable paragraphs with bold labels

### Order Page
- Similar split layout: form left, order details/trust signals right
- Right panel shows: selected tier details, deposit calculation, Stripe badge for trust
- Submit button transforms to "Proceed to Secure Payment" after email sent
- Clear payment terms checkbox with link to full terms

### Docs Page
- Clean document viewer with sidebar navigation
- Fillable form at top for template variables
- Preview panel shows rendered markdown with variables replaced
- Export buttons (PDF, Copy) prominent and always visible

---

## Accessibility & Polish

- Focus states: 2px ring with brand color
- Touch targets: minimum 44x44px
- Color contrast: WCAG AA minimum (4.5:1 for body text)
- Skip to main content link for keyboard navigation
- Loading states for all async actions (spinner + text)
- Error states: inline validation with helpful messages
- Success states: green checkmarks and encouraging copy

---

This design balances professional SaaS credibility with local, approachable maritime character—reflecting Dockside Digital's position as a trusted Halifax web partner for Atlantic Canada businesses.