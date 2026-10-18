# chelsthedesigner.com

## Link
https://www.figma.com/design/aH56JwMDaOavtIPWGcIpya/Portfolio-Design-System?node-id=2-2&p=f&t=NXKenysOciEbEzyM-0

Personal portfolio, art shop, and notes site for Chelsey LaPointe.
Stack: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion.
Design source: Figma file "Portfolio Design System" (via Figma MCP).

This is chelsthedesigner.com, a portfolio + art shop + notes site for Chelsey
- Before writing code for a page, tell me your plan in a few sentences.
- Explain non-obvious choices briefly (why a Server vs Client component, why this
  Tailwind pattern). Don't over-explain basics.
- Keep files small and readable. Prefer simple over clever.
- Never install a new dependency without asking.
- Ignore the COVER page in the Portfolio Design System (only for looks)

## Placeholder
When copy or images aren't final, use clearly marked placeholders, e.g.
"[PLACEHOLDER: hero tagline]". Keep all page text in one content object/file at
the top of the page so I can swap it without touching layout code.

## Spacing
- 4px base. Only use the spacing tokens below; no arbitrary values.
- Tokens: 2xs 4 · xs 8 · sm 12 · md 16 · lg 24 · xl 32 · 2xl 48 · 3xl 64 · 4xl 96 · 5xl 128
- Page layout: content sits in one centered container, max-width 1256px (`mx-auto`). On screens wider than 1512px the side margins grow to fill the extra space; content never stretches past 1256px.
- Side padding inside the container steps down on smaller screens (5xl on desktop; smaller values set in the Breakpoints section).
- Top of page to nav: 3xl.
- Between page sections (and nav → page title, last section → footer): 4xl.
- Between blocks within a section: 2xl.
- Grid/list gaps and heading → content: xl. Grid columns are fluid and fill the content width (e.g. `grid grid-cols-4 gap-8`); don't hard-code card widths.
- Form fields, card groups, heading → description: md.
- Text stack inside a card body (title → description → link): xs.
- Text stack inside a feature block (CTA banner, homepage about strip): lg.
- Button groups: sm. Filter chips: xs. Tight internals (tags in cards): 2xs.
- If a Figma value is off this scale, round to the nearest token and flag it.
- In code, tokens map to Tailwind's default 4px scale: 2xs=1 · xs=2 · sm=3 · md=4 · lg=6 · xl=8 · 2xl=12 · 3xl=16 · 4xl=24 · 5xl=32 (e.g. `gap-8` = xl).

## Color
Use semantic tokens in code. Some Figma fills are bound to palette names (Pear, Watercourse…) instead; translate them with this table.

| Palette | Hex | Semantic token |
|---|---|---|
| Cararra | #EFEDE9 | surface/base, text/inverse |
| Charcoal | #3C3B39 | surface/inverse, text/primary |
| Watercourse | #00715B | accent/primary |
| Pear | #D8E63B | accent/secondary |
| Tranquility | #C0D8D8 | accent/tertiary |
| Field | #F4F4F4 | surface/field-focus (text field fill while typing; only use) |
| Error | #A83A2A | text/error (form error messages only) |
| Grey | #6B6965 | text/placeholder (text field placeholders only) |

### Default
- Page background: surface/base. Body text: text/primary.
- Default and inactive states (unselected filters, tags, secondary buttons, footer container): outlined style, charcoal border and text, no fill.

### CTA buttons — color-coded by destination
The color identifies where the button goes. Keep it the same everywhere the button appears.
- Upwork → Pear fill, `dark-text`
- Contact Me → Tranquility fill, `dark-text`. Only exception: the small "contact me" button in the footer is outlined.
- Resume → Watercourse fill, `light-text`
- Any other button → outlined, unless a design shows otherwise.

### Filters
- Selected primary filter (All / UI/UX Design / Visual Design): Pear fill, `dark-text`.
- Selected secondary filter (Mobile / Website / Development…): Tranquility fill, `dark-text`.
- Unselected: outlined.

### Accent text and decoration
- Watercourse can be used as a text color for emphasis in display headlines (e.g. "NEW PROJECT?" on /services).
- Tranquility can be used for decorative shapes (e.g. marquee dots), never text.
- Watercourse is the text color for text links on surface/base (e.g. "View case studies", "More about me"). Passes AA (~5:1).
- On surface/inverse, text links use Pear (e.g. "View services" in the CTA banner).

### Contrast rules (do not break)
- Pear and Tranquility fills always take charcoal text (`dark-text`).
- Watercourse and Charcoal fills always take cream text (`light-text`).
- Never use Pear or Tranquility as a text color or thin line on Cararra (fails contrast).
- Never put Watercourse on Charcoal.

## Typography
Fonts: Tampool Heavy (display only, always uppercase), Clash Grotesk (everything else). No other fonts.

| Style | Font / weight | Size | Line height | Use |
|---|---|---|---|---|
| display-xl | Tampool Heavy | 128 | 100% | Top-level page titles (`<h1>`): PORTFOLIO, ABOUT, SERVICES, NOTES, SHOP |
| display-lg | Tampool Heavy | 100 | 100% | Large in-page headlines |
| display-md | Tampool Heavy | 80 | 100% | Case study titles (`<h1>`), /services headline |
| display-sm | Tampool Heavy | 64 | 100% | Showcase project titles (`<h1>`), homepage section titles |
| heading-lg | Clash Semibold | 48 | 110% | 404 message, CTA banner heading, homepage marquee words |
| heading-md-semibold | Clash Semibold | 32 | 120% | Section titles (`<h2>`) |
| heading-md-medium | Clash Medium | 32 | 120% | Headings nested in a section (`<h3>`): list item titles, detail card labels, sub-sections |
| heading-md | Clash Regular | 32 | 120% | Nav links in the phone menu overlay (Figma `nav-link` primitive) |
| heading-sm | Clash Medium | 22 | 125% | Standalone text links ("More about me", "View services") |
| card-title | Clash Medium | 22 | 125% | Project card titles (`project-card`). Same values as heading-sm, kept as its own style. |
| body-xl | Clash Regular | 20 | 140% | Intro / bio paragraphs |
| body-lg | Clash Medium | 18 | 140% | Descriptions, lead text |
| body | Clash Regular | 16 | 140% | Default paragraph text |
| label-md | Clash Regular | 16 | 100% | Nav links, md buttons |
| label-sm | Clash Medium | 14 | 100% | Tags, sm buttons |
| caption | Clash Medium | 14 | 140% | Footer text, image captions. Uppercase via CSS, not typed in caps. |

- One `<h1>` per page. HTML heading levels follow page structure; the style follows the table.
- Line heights are unitless in CSS (120% → `leading-[1.2]`).
- Display sizes scale down on smaller screens with `clamp()` (values set in Breakpoints). Body and label sizes stay fixed.

### Button sizes (Figma primitive `button`)
| Size | Height | Padding (x / y) | Label style |
|---|---|---|---|
| sm | 32 | sm / xs | label-sm |
| md | 40 | md / xs | label-md |
| lg | 48 | md / sm | body-lg (Clash Medium 18, 140%) |
| xlg | 68 | xl / md | heading-md-medium |

## Breakpoints
Mobile-first with Tailwind's default breakpoints. Desktop Figma frames (1512) are the only designed layouts; build smaller layouts from these rules.

| Range | Width | Margins | Section gap | Block gap | Card grid |
|---|---|---|---|---|---|
| Phone | < 768 | md (16) | 2xl (48) | xl (32) | 1 col |
| Tablet `md:` | 768+ | xl (32) | 3xl (64) | 2xl (48) | 2 col |
| Laptop `lg:` | 1024+ | 3xl (64) | 4xl (96) | 2xl (48) | 3 col |
| Desktop `xl:` | 1280+ | 5xl (128) | 4xl (96) | 2xl (48) | 4 col |

### Stacking (below `md`)
- Side-by-side pairs stack vertically: case study header (text + image), /about skills lists, /contact (links + form), /services (headline + tags).
- Rows of three become one column: case study detail cards, /about photos.
- CTA button rows wrap and stay centered.

### Responsive type
- Display styles use clamp():
  - display-xl: clamp(40px, 8.5vw, 128px)
  - display-lg: clamp(36px, 6.6vw, 100px)
  - display-md: clamp(32px, 5.3vw, 80px)
  - display-sm: clamp(28px, 4.2vw, 64px)
- Below `md`: heading-lg 48 → 32, heading-md (all weights) 32 → 24.
- Body, label, and caption sizes never change.
- Check that the longest single word in a display title fits the phone width; wrapping between words is fine.

### Navigation
- `md:` and up: full nav bar as designed.
- Below `md`: logo + a menu button. The button opens a full-screen overlay listing the five nav links.
- Overlay must: close on link tap, close on Escape, keep keyboard focus inside while open, and lock page scrolling behind it.
- Overlay styling: propose a version using existing tokens; Chelsey will refine.

## Interaction states
### Lift (signature hover)
- Hover: element shifts up and right; a hard charcoal shadow (no blur) stays at its resting position.
- Pressed: element returns to rest and the shadow disappears.
- Project cards: 8px offset, shadow `-8px 8px 0` in Charcoal (Figma project-card, State=Hover). Arrow icon and tags invert to charcoal fill + cream text.
- Category cards: same 8px lift and shadow (Figma category-card, State=Hover). The link line ("View case studies") is pinned to the bottom so links align across an equal-height row.
- All buttons (filled, outlined, filters): 4px offset. Outlined buttons have a surface/base fill so the shadow doesn't show through.
- Icon button (standalone): inverts on hover, no lift. On cream: outlined charcoal → charcoal fill, cream arrow. On charcoal (Pear outline, e.g. CTA "View services"): → Pear fill, charcoal arrow.
- Text links: underline on hover (same as nav links). A text link paired with an icon button triggers the icon's hover too.
- Nav links: underline on hover. The current page keeps its underline (State=Select), including in the phone menu overlay.
- On charcoal surfaces (e.g. CTA banner) the lift shadow is cream instead of charcoal so it stays visible. Use the `surface-inverse` utility on any charcoal block; it sets this automatically.
- Hover styles apply only on hover-capable devices (Tailwind v4 default). The pressed state gives touch feedback.

### Keyboard focus
- All interactive elements use :focus-visible: 2px charcoal outline, 2px offset.
- Never remove the focus outline without this replacement.
- On charcoal surfaces the outline is cream (set by `surface-inverse`).

### Motion
- Transitions: 150ms ease-out on transform, shadow, and color.
- prefers-reduced-motion: no movement; state changes are instant.

### Text fields
- Default: placeholder text in text/placeholder.
- Focused (typing): surface/field-focus fill.
- Filled (has text, not focused): default look with text/primary.
- Error: border unchanged. Message sits space-xs (8px) below the field, left-aligned with the field's edge, in label-sm, text/error. Set aria-invalid and link the message with aria-describedby. Validate on blur and on submit, not on every keystroke.

### Portfolio filters
- Primary row (All / UI/UX Design / Visual Design): single-select, selected = Pear fill, dark-text. "All" is selected on load.
- Secondary row: hidden while primary is "All". Shows the selected category's tags. Multi-select, selected = Tranquility fill, dark-text.
- Secondary "All": on by default; selecting any tag turns it off; deselecting every tag turns it back on.
- Multiple tags filter with OR (show projects matching any selected tag).
- Changing the primary filter resets the secondary row.
- Unselected filters are outlined and get the standard button lift on hover.

## Images
### Project card structure
- Image on top, info box below. The info box slides 12px up behind the image (`-mt-3`, image stacked above it) so its top corners are hidden under the image's 8px rounded corners.
- Info box padding: 24px top (12 hidden + 12 visible), 12px on other sides. 1px charcoal borders on image and info box.
- Title and arrow icon are space-between; the arrow stays pinned right at any card width.
- Never set a fixed pixel height on cards. Cards in the same row are always equal height: the row stretches every card to match the tallest one (grid/flex stretch).

### Project card thumbnails
- Every project has its own hand-cropped thumbnail: 4:3, 800×600, WebP, saved as `/public/case-studies/[project-name]/thumbnail.webp`.
- Render in a 4:3 container with next/image (`fill`, `object-cover`). Never stretch or distort.
- Grayscale by default, transitioning to full color (300ms ease-out):
  - Hover-capable devices: on card hover, alongside the lift.
  - Touch devices: when the card enters the middle of the screen (Framer Motion `whileInView`, middle ~50% of the viewport). Color only, no lift.

### Case study images
- Header image: cropped to fill its frame (`object-cover`). Keep the subject centered; the frame changes shape when it stacks on phones.
- Body images: keep their original proportions. Never crop.

### All images
- WebP by default; PNG only when transparency is needed (e.g. hero illustration).
- Size targets: thumbnails under 100KB, all other images under 500KB.
- Always use next/image. Add `priority` only to images visible without scrolling (hero, first row of cards).
- Every image needs alt text describing what it shows. Purely decorative images use alt="".

## Naming
- Figma page and frame names mirror Next.js App Router routes (e.g. frame `/portfolio/caseStudy-template` → `app/portfolio/[slug]/page.tsx`).
- Component names in Figma map to React components (`project-card` → `ProjectCard`).