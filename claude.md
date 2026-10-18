# chelsthedesigner.com

## Link
https://www.figma.com/design/aH56JwMDaOavtIPWGcIpya/Portfolio-Design-System?node-id=2-2&p=f&t=NXKenysOciEbEzyM-0

Personal portfolio, art shop, and notes site for Chelsey LaPointe.
Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui (Base UI), Motion (formerly Framer Motion; import from `motion/react`), gray-matter (reads `.mdx` frontmatter).
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
- Images that aren't final use `<ImagePlaceholder />` (grey box labeled "[PLACEHOLDER: image]") inside a positioned frame.

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
- Page title (`<h1>`) → intro paragraph: xl.
- Text stack inside a card body (title → description → link): xs.
- Text stack inside a feature block (CTA banner, homepage about strip): lg.
- Button groups: sm. Filter chips: xs. Tags in cards: xs (per Figma project-card). Other tight internals: 2xs.
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
- Watercourse and Charcoal fills always take Cararra text (`light-text`).
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
| Phone | < 768 | md (16) | 2xl (48) | xl (32) | 1 col (project cards: 2 col) |
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
- The nav bar is pinned to the top on every page (`SiteHeader`). Once the page scrolls away from the very top, the logo shrinks to half size (156×80 → 78×40) and the bar tightens to md (16) padding top and bottom. It returns to full size at the very top. A placeholder keeps the resting height in the layout so nothing jumps.
- The pinned bar matches the surface under it: over charcoal it uses the inverse version (charcoal fill, colored logo, Cararra links); over Cararra it uses the primary version (Cararra fill, charcoal logo and links, plus a 1px charcoal bottom border once the page has scrolled — never at the very top). Mark full-width charcoal sections with `data-surface="inverse"` (Cararra ones with `data-surface="base"`); unmarked areas count as Cararra. Cards and banners inside the page (e.g. the CTA) are not marked.
- The phone menu overlay is always charcoal with the colored logo, whichever version the bar is showing.
- Below `md`: logo + a menu button. The button opens a full-screen overlay listing the five nav links.
- Overlay must: close on link tap, close on Escape, keep keyboard focus inside while open, and lock page scrolling behind it.
- Overlay styling: propose a version using existing tokens; Chelsey will refine.

## Interaction states
### Lift (signature hover)
- Hover: element shifts up and right; a hard charcoal shadow (no blur) stays at its resting position.
- Pressed: element returns to rest and the shadow disappears.
- Project cards: 8px offset, shadow `-8px 8px 0` in Charcoal (Figma project-card, State=Hover). Arrow icon and tags invert to charcoal fill + Cararra text.
- Category cards: same 8px lift and shadow (Figma category-card, State=Hover). The link line ("View case studies") is pinned to the bottom so links align across an equal-height row.
- All buttons (filled, outlined, filters): 4px offset. Outlined buttons have a surface/base fill so the shadow doesn't show through.
- Icon button (standalone): inverts on hover, no lift. On Cararra: outlined charcoal → charcoal fill, Cararra arrow. On charcoal (Pear outline, e.g. CTA "View services"): → Pear fill, charcoal arrow.
- Text links: underline on hover (same as nav links). A text link paired with an icon button triggers the icon's hover too.
- Nav links: underline on hover. The current page keeps its underline (State=Select), including in the phone menu overlay.
- On charcoal surfaces (e.g. CTA banner) the lift shadow is Cararra instead of charcoal so it stays visible. Use the `surface-inverse` utility on any charcoal block; it sets this automatically.
- Hover styles apply only on hover-capable devices (Tailwind v4 default). The pressed state gives touch feedback.

### Keyboard focus
- All interactive elements use :focus-visible: 2px charcoal outline, 2px offset.
- Never remove the focus outline without this replacement.
- On charcoal surfaces the outline is Cararra (set by `surface-inverse`).

### Motion
- Transitions: 150ms ease-out on transform, shadow, and color (hover/press states).
- Layout animations (e.g. the portfolio filter): 250ms ease-out.
- prefers-reduced-motion: no movement; state changes are instant.
- Typewriter headings (`components/ui/typewriter.tsx` + `hooks/use-typewriter.ts`): hand-built with setTimeout, no animation library. Takes a `sequence` of type / delete / pause steps. Plays on every page load by default; pass an optional unique `storageKey` to play only once per browser session (sessionStorage) and show the final word statically afterwards. Under prefers-reduced-motion it always shows the final word statically with no cursor. Screen readers get only the final word (sr-only); the animated layer is aria-hidden; an invisible copy of the final word reserves the space. Cursor: thin bar in the text color, taller than the capitals like a text-field caret (1em tall, overhangs the letters without changing line height), solid while typing/deleting, blinking (1s, hard on/off) while paused or finished. Typing speed ~120ms ±50 per character, deleting ~50ms ±15 (constants at the top of the hook).
- /portfolio heading (plays on every load): types "porfo", pauses 750ms, deletes to "por", pauses 250ms, types "tfolio". Pause constants are at the top of `app/portfolio/page.tsx`.
- Homepage marquee: CSS loop, 40s per cycle, stops under prefers-reduced-motion. Words in heading-lg, Tranquility dots 32px, 64px (3xl) apart (rounded from Figma's 30.67 / ~76).

### Homepage scroll effect
- The name graphic (name-bg) is sticky: once it reaches the vertical middle of the screen it stays put, and the avatar, triangle and the Cararra content scroll up over it. The Cararra background of the content is what covers the name.
- On short screens (e.g. phones), where the name already starts above the middle, it stays at its starting position instead of jumping down.
- The hero is marked `data-surface="inverse"` and the Cararra content `data-surface="base"` so the pinned nav matches them.

### Text fields
- Default: placeholder text in text/placeholder.
- Focused (typing): surface/field-focus fill.
- Filled (has text, not focused): default look with text/primary.
- Error: border unchanged. Message sits space-xs (8px) below the field, left-aligned with the field's edge, in label-sm, text/error. Set aria-invalid and link the message with aria-describedby. Validate on blur and on submit, not on every keystroke.

### Portfolio filters
- Primary row (All / UI/UX Design / Visual Design): single-select, selected = Pear fill, dark-text. "All" is selected on load.
- Secondary row: hidden while primary is "All". Shows the selected category's tags: UI/UX Design → Mobile, Website, Development; Visual Design → Branding, Illustration, Print. Multi-select, selected = Tranquility fill, dark-text.
- Secondary "All": on by default; selecting any tag turns it off; deselecting every tag turns it back on.
- Multiple tags filter with OR (show projects matching any selected tag).
- Changing the primary filter resets the secondary row.
- Unselected filters are outlined and get the standard button lift on hover.
- Filter animation (Motion, `components/project-browser.tsx`): cards that stay glide to their new spot; leaving cards fade + scale to 96% right away; new cards fade + scale in from 96% with a 30ms left-to-right stagger (capped after 8 cards). 250ms ease-out. No animation on page load. Reduced motion: instant.

## Images
### Project card structure
- Image on top, info box below. The info box slides 12px up behind the image (`-mt-3`, image stacked above it) so its top corners are hidden under the image's 8px rounded corners.
- Info box padding: 24px top (12 hidden + 12 visible), 12px on other sides. 1px charcoal borders on image and info box.
- Title and arrow icon are space-between; the arrow stays pinned right at any card width.
- Never set a fixed pixel height on cards. Cards in the same row are always equal height: the row stretches every card to match the tallest one (grid/flex stretch).

### Project card thumbnails
- Every project has its own hand-cropped thumbnail: 4:3, 800×600, WebP, saved as `/public/case-studies/[slug]/thumbnail.webp` or `/public/visual-projects/[slug]/thumbnail.webp`.
- Making one: resize/crop to 800×600 with `sharp` (bundled with Next.js), save as WebP, and step the quality down until it's under 100KB. Put the source PNG in `~/chelsthedesigner-originals/` (same path), not in `/public`.
- Render in a 4:3 container with next/image (`fill`, `object-cover`). Never stretch or distort.
- Grayscale by default, transitioning to full color (300ms ease-out):
  - Hover-capable devices: on card hover, alongside the lift.
  - Touch devices: when the card enters the middle ~50% of the viewport. Motion's `useInView` sets `data-in-view` on the card and CSS (`@media (hover: none)`) does the color change. Color only, no lift.

### Case study images
- Header image: cropped to fill its frame (`object-cover`). Keep the subject centered; the frame changes shape when it stacks on phones.
- Body images: keep their original proportions. Never crop.

### All images
- WebP by default; PNG only when transparency is needed (e.g. hero illustration).
- Size targets: thumbnails under 100KB, all other images under 500KB.
- `/public` holds only web-ready files. Print and source files (PDFs, `@300x` exports, full-size photos) live outside the repo in `~/chelsthedesigner-originals/` (same folder structure); export web versions from there. GitHub rejects any file over 100MB.
- Always use next/image. Exception: icons are inline SVG components (`components/ui/icons.tsx`) so they can take `currentColor` and invert on hover. Next 16 replaced `priority`: use `preload` only for the main above-the-fold image (e.g. the homepage name graphic, first row of project cards) and `loading="eager"` for other images visible without scrolling.
- Every image needs alt text describing what it shows. Purely decorative images use alt="".

## Naming
- Figma page and frame names mirror Next.js App Router routes (e.g. frame `/portfolio/caseStudy-template` → `app/portfolio/[slug]/page.tsx`).
- Component names in Figma map to React components (`project-card` → `ProjectCard`).

## Code conventions
- Type styles are `type-*` utilities (e.g. `type-heading-md-semibold`); they include the font, weight, size, line height and responsive sizes.
- Hover lift: `lift` (4px, buttons) or `lift lift-lg` (8px, cards).
- Put `surface-inverse` on any charcoal block; it sets the fill, Cararra text, and Cararra lift shadow + focus outline.
- Page side margins come from the `--gutter` CSS variable through `Container`. Don't hard-code side padding.
- Spacing tokens map to Tailwind's numbers (see Spacing).
- Upwork / Contact Me / Resume buttons always use the presets in `components/ui/cta-buttons.tsx`, never a hand-picked tone.
- All URLs live in `lib/links.ts`. Merge classes with `cn` from `lib/utils`.
- Page structure: `SiteHeader` → `<PageTransition>` wrapping `<main>` and the `Footer` (inside a `Container`). Keep `SiteHeader` outside `PageTransition` so it stays still between pages. Section spacing classes live in `lib/layout.ts`.
- Projects: a project shows in the portfolio when `public/<case-studies|visual-projects>/<slug>/thumbnail.webp` exists. Title, `skillTags` and optional `thumbnailAlt` come from `content/<case-studies|visual-projects>/<slug>.mdx` frontmatter (read by `lib/projects.ts`). Case studies first, then visual projects, each alphabetical.
- Portfolio categories and their filter tags live in `lib/project-categories.ts`.
- Thumbnail alt text: add `thumbnailAlt` to a project's `.mdx`; without it the fallback is "[Title] project thumbnail".
- Project folder names are the URL slug: lowercase letters, numbers and hyphens only (no `?`, `'`, spaces).
- In `globals.css`, don't nest `@media` inside a `:root` custom-property block; the dev server drops it. Write separate `@media { :root { … } }` rules.

## Before launch
- Delete the `/dev/components` preview page.
- Link the Contact Me buttons once the contact modal is built.
- Add the Resume URL in `lib/links.ts`.
- Replace placeholders: category card images, about-strip photo, homepage bio (lorem ipsum), and the incomplete hero avatar.
- Fill in visual project titles and `skillTags` (`content/visual-projects/*.mdx`, marked [PLACEHOLDER]).
- Add real `thumbnailAlt` text for every project.
- Replace the portfolio intro (lorem ipsum).
- Build `/portfolio/[slug]` — project cards currently link to a not-found page.
- Add thumbnails for the hidden projects: additional-design-work, banshee, save-the-dates, scalise.
- Remove the `coming-soon` folder and its `_redirects` file when the full site goes live.

## Waiting for approval
Implemented as a first pass; Chelsey said "fine for now." Don't treat these as final rules until they move into the sections above.
- Phone spacing: top of page → nav is xl (32) below `md`, 3xl (64) from `md` up. CTA banner padding is xl (32) below `md`, 3xl (64) from `md` up.
- Phone menu overlay: full-screen charcoal (`surface-inverse`), colored logo top-left, close (x) icon top-right, nav links stacked in heading-md (24 on phones) with xl (32) gaps, Cararra text, current page underlined.
- Pinned nav bar: solid fill, no shadow; border only on the primary version. Color switch happens when Cararra content reaches the bar's bottom edge (150ms color transition, logo swaps instantly).
- Portfolio below `md`: the Resume button sits above the filter rows (left-aligned); filter rows wrap. Empty filter result shows "No projects match these filters yet." in body-xl.
- Project card grid on phones: md (16) gaps instead of xl, to give 2-column cards more room (xl from `md` up).

## Flagged
Known issues to come back to. Don't fix silently — ask first.
- **Page transitions — Chelsey doesn't like the current version; keep for now, redesign later.** Current: React `<ViewTransition>` (`components/layout/page-transition.tsx`, CSS at the end of globals.css). Old page fades out in 150ms, then the new page fades in (210ms) while rising 10px (300ms), ease-out. The pinned nav bar is anchored (`view-transition-name: site-header`) and doesn't animate. Reduced motion: instant swap.
- **Dev server sometimes misses `globals.css` changes.** New component files update right away, but edits to `app/globals.css` can take a long time to show up (or not at all) until `npm run dev` is restarted. Production builds are always correct. If a new style seems missing in dev, restart the dev server before debugging.
- **Long single-word project titles on phones.** In the 2-column phone grid, about 110px is left beside the arrow, so a title like "SourceShoot" breaks mid-word ("SourceSh / oot"). It no longer overflows the page. Options: (1) hide the arrow below `md` — whole card is tappable, titles get full width (recommended); (2) card-title 18px below `md` — fits at 390 but tight at 360, and breaks the "only display/heading sizes shrink" rule; (3) move the arrow onto the image corner below `md` — departs from the Figma card.
