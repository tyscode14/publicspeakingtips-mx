# publicspeakingtips.mx, design system

One file, no build step: `index.html` carries all CSS in a single `<style>` block, two Google Fonts via `<link>`, and about 25 lines of progressive-enhancement JS (reading progress bar, current-section highlight in the table of contents). Everything below is defined as CSS custom properties at the top of that style block.

## Direction

A premium editorial long-read, not a SaaS lander. Cream paper, deep warm ink, a single terracotta accent. The terracotta is the warmth of Mexican clay and adobe without any flag or folkloric reference, and it sits naturally on cream the way rubrication sits on book paper. It is used for exactly four jobs: the primary button, the eyebrow labels, the numeral treatment, and hairline rules that mark an entry point. Nothing else is coloured.

Hierarchy is capped at three levels per section: the numeral or big figure, the heading, the body. Meta text (sources, dates, footnotes) is a fourth, deliberately quiet level in the UI sans.

## Palette tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#F7F2E9` | `#171512` | page background |
| `--paper-2` | `#EFE7D9` | `#211E1A` | CTA card background |
| `--ink` | `#1C1A17` | `#EEE7DB` | headings, body text, numerals |
| `--ink-2` | `#4A453E` | `#CFC6B8` | secondary body (FAQ answers, card text, TOC) |
| `--muted` | `#6E675D` | `#A39B8E` | meta text, source lines, counters |
| `--rule` | `#D9CFBF` | `#3A352E` | hairlines |
| `--accent` | `#B5462B` | `#E07C5C` | the one accent |
| `--on-accent` | `#FFFFFF` | `#1C1A17` | text on accent buttons |
| `--panel` / `--panel-text` / `--panel-muted` | ink / cream / `#B8AF9F` | cream / ink / `#5A5347` | closing CTA panel (inverts per scheme) |

Contrast (light): accent on paper 4.9:1, muted on paper 4.9:1, white on accent 5.4:1, ink on paper 16:1. Dark: accent on paper 6.3:1, muted on paper 6.7:1. All body-text pairs pass WCAG AA. Dark mode is automatic through `prefers-color-scheme`; light is primary and `color-scheme: light dark` is declared on `:root`.

## Type

- Display: **Fraunces** (variable, optical size 9 to 144, weight 300 to 700, italic). Headings, wordmark, numerals, pull quotes, stat figures.
- Body: **Source Serif 4** (variable, 400 and 600, italic). All running text.
- UI: system sans stack (`--font-ui`). Eyebrows, buttons, meta rows, TOC, source lines, footer. No third webfont is loaded.

Fluid scale (mobile to desktop, via `clamp()`):

| Token | Range | Used by |
|---|---|---|
| `--step--2` | 11.5 to 12.5px | source lines, fine print |
| `--step--1` | 13.4 to 15px | eyebrow, buttons, meta, TOC, citations |
| `--step-0` | 17 to 19px | body, FAQ questions |
| `--step-1` | 20 to 24px | lead paragraph, pull quotes, wordmark, card title |
| `--step-2` | 25.6 to 34.4px | tip H2, Sources, FAQ headings |
| `--step-3` | 33.6 to 49.6px | stat figures, callout numbers, closing H2 |
| `--step-4` | 40 to 70.4px | H1 |
| `--step-5` | 57.6 to 102px | tip numerals |

Body line-height 1.65; headings 1.1 (H1 1.02) with negative tracking. `text-wrap: balance` on headings, `pretty` on the lead and pull quotes. Measure for running text is `--measure: 65ch` (about 620px at desktop body size).

## Spacing and layout

- Spacing steps `--space-1` (4px) through `--space-8` (72px), plus a fluid `--space-9` (64 to 112px) for the closing panel.
- `--content: 58rem` is the article container; `--wide: 74rem` is the breakout used by the header, the key-figures strip and the footer.
- `--gutter` is fluid, 17.6px to 40px.
- Tips: below 56em the numeral sits above the H2. From 56em the tip becomes a two-column grid, `--numeral-col: 9rem` for the numeral (sticky while the tip scrolls) and the rest for the body.
- Key figures: 2x2 grid with hairline dividers on mobile, 4 across from 56em. Dividers only, no card boxes.
- Table of contents: 2 columns on mobile, 5 columns from 56em. The header button hides below 37.5em (the hero button is 1 screen down).

## Components

| Class | What it is |
|---|---|
| `.wordmark` | Typographic mark: Fraunces 600, tight tracking, `.tld` (".mx") in accent italic 400 |
| `.eyebrow` | Small caps label in accent with a 24px leading rule |
| `.btn.btn--primary` | Pill button, accent fill, optional inline arrow SVG. The only button style on the page |
| `.meta` | Hero metadata row: stacked on mobile, inline with dot separators from 37.5em |
| `.toc` | Numbered contents grid. JS sets `aria-current="true"` on the link for the section in view |
| `.stat` | Key-figure tile: `<figure>` with `.stat-n` (accent digits, `.unit` suffix) and a `<figcaption>` (bold meaning + small source) |
| `.tip` | One tip section. `.tip-num` (aria-hidden) holds the leading digit in `.z` (accent, light italic) and the main digit in ink, with an accent rule beneath |
| `.prose` | Body-copy column, max 65ch, vertical rhythm on children |
| `.pull` | Pull quote `<blockquote cite>`: accent left rule, Fraunces italic, `<footer>` attribution |
| `.callout` | Inline stat `<figure>`: `.callout-n` accent number beside a caption with a `<small>` source, hairlines above and below |
| `.check` | Checklist `<ul>` with an accent check drawn in CSS |
| `.cta-card` | The Confidently card inside tip 1: `paper-2` fill, 1.5px ink border, hard 6px offset shadow (a print-like plate). Distinct from the closing panel |
| `.cites` | Sources `<ol>` with `decimal-leading-zero` counters, `<cite>` + link, `.dom` domain line |
| `.faq` | `<details><summary><h3>` items with a CSS chevron. Answers are always in the DOM |
| `.final` | Closing CTA panel, ink on cream (inverts in dark mode) |
| `#progreso` | 3px accent reading-progress bar (JS, fixed top) |

## Accessibility and motion

Skip link to `#contenido`. Every `<section>` has `aria-labelledby`. Visible 3px accent focus ring on all interactive elements (cream ring inside the dark panel). Decorative numerals are `aria-hidden`; the TOC and H2s carry the numbers for assistive tech. `prefers-reduced-motion` removes transitions and the smooth-scroll. Print styles drop the progress bar, buttons and both CTA blocks.

## Content slots

Every swappable piece of text carries a `data-slot`. Anchors and label targets carry an `id`. Swap the inner text (or inner HTML for the `-cuerpo` blocks) and leave the element, its classes and its attributes alone.

### Head

`title`, `description`, `og-title`, `og-description`, `og-image`, `tw-title`, `tw-description`, `tw-image`, plus the empty `<script type="application/ld+json" id="jsonld-slot">` to fill with the JSON-LD.

### Header

- `cta-header` (button text; href is the Confidently onboarding URL)
- `toc` (the `<ol>`; each `<li><a href="#consejo-N">` keeps its `.toc-n` span and gets the short tip title)

### Hero

- `eyebrow`
- `h1` (id `titulo`). The keyword lives in `<span class="kw">` inside the H1; keep the span, adjust wording.
- `lead` (id `lead`), the direct-answer paragraph, about 90 words
- `meta-actualizado` (the `<time>`; update `datetime` too), `meta-lectura`, `meta-fuentes`
- `cta-hero`

### Key figures (`#cifras`)

- `cifras-titulo`, `cifras-nota`
- For N in 1 to 4: `cifra-N-num` (digits only; the unit goes in the sibling `<span class="unit">`), `cifra-N-texto`, `cifra-N-fuente`

### Tips (`#consejo-N`, N = 1 to 10)

- `consejo-N-titulo` (the H2, id `consejo-N-titulo`)
- `consejo-N-cuerpo` (a `<div class="prose">` of 2 to 4 `<p>`; may also contain `.callout`, `.pull`, `.check`)
- Optional sub-slots present in the template, reusable in any tip: `consejo-N-cita` + `consejo-N-cita-autor` (pull quote; set `cite` on the blockquote), `consejo-N-cifra-num` + `consejo-N-cifra-texto` + `consejo-N-cifra-fuente` (callout), `consejo-N-lista` (checklist)
- Tip 1 only: `cta-1-eyebrow`, `cta-1-titulo` (id `cta-consejo-1-titulo`), `cta-1-texto`, `cta-1-boton`, `cta-1-nota`, and a second prose block `consejo-1-cuerpo-2` after the card

### Sources (`#fuentes`)

- `fuentes-titulo`, `fuentes-nota`
- `fuentes-lista`: `<ol class="cites">`, each `<li><cite><a href>Title</a></cite><span class="dom">domain</span></li>`

### FAQ (`#faq`)

- `faq-titulo`
- `faq-lista`: for N in 1 to 6, `<details id="faq-N">` with `faq-N-pregunta` (the H3 in the summary) and `faq-N-respuesta` (a div of `<p>`). Add or remove `<details>` blocks freely; 4 to 6 is the target.

### Closing CTA (`#cta-final`)

`cta-final-eyebrow`, `cta-final-titulo` (id `cta-final-titulo`), `cta-final-texto`, `cta-final-boton`, `cta-final-nota`

### Footer

`footer-descripcion`, `footer-links`, `footer-copy`

## Rules for whoever swaps copy in

1. Mexican Spanish, tú form, plain spoken language. No clever compression. Buttons say what happens next.
2. No em dashes anywhere. Use commas, full stops or colons.
3. Keep exactly one `<h1>`, one `<h2>` per tip, `<h2>` for Cifras, Fuentes, Preguntas frecuentes and the closing CTA, `<h3>` only inside the FAQ summaries and the tip-1 card.
4. Do not change ids, classes, `aria-*` attributes, or the `data-slot` names. If you add a tip sub-element, copy the existing markup for `.pull`, `.callout` or `.check`.
5. Stat and callout numbers: digits (and % or x) go in the `-num` slot; words like "seg" or "ideas" go in the `.unit` span so they render small.
6. FAQ answers stay in the DOM. Never move them into JS.
7. Every source in `.cites` needs a real `href`; the same URL should go on the `cite` attribute of any pull quote that comes from it.
8. Update `<time datetime>` and `meta-fuentes` whenever the source list changes.
9. Keep the file under 60 KB. It is about 47 KB now with placeholder copy of roughly the intended length.
