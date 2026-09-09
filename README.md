# publicspeakingtips.mx

One-page Spanish (Mexico) guide ranking for the English query "public speaking tips",
built on the AmberWillo fact repository. Static site, no build step.

- `template.html` + `content/copy.json` are the sources. Run `node scripts/merge.mjs` to
  regenerate `index.html`. Never edit `index.html` by hand.
- `content/seo-plan.md` is the keyword, entity and figures plan; `content/copy.json`
  carries a fact ledger for every number on the page.
- `.env.local` holds `AMPLITUDE_API_KEY` (public browser key of the shared Amplitude
  project); the merge injects it. Without it, tracking stays off.
- Mobile visitors are routed to the App Store / Play Store; desktop keeps the web quiz.
- Deployed on Vercel from `master`.
