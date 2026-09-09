// Merge content/copy.json into template.html -> index.html. Safe to re-run.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tpl = fs.readFileSync(path.join(root, 'template.html'), 'utf8');
const c = JSON.parse(fs.readFileSync(path.join(root, 'content', 'copy.json'), 'utf8'));
const site = JSON.parse(fs.readFileSync(path.join(root, 'content', 'site.json'), 'utf8'));
const ui = site.ui;
const ANCHOR = site.anchorPrefix || "consejo"; // tip section ids and TOC fragments, per language
let h = tpl.replace(/\r\n/g, '\n');

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// plain text with optional [text](url) links and **bold**
const rich = s => esc(s)
  .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" rel="noopener">$1</a>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
const ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
const KW = 'Public Speaking Tips';

function setSlot(name, inner) {
  const re = new RegExp(`(<([a-z0-9]+)[^>]*data-slot="${name}"[^>]*>)([\\s\\S]*?)(</\\2>)`);
  if (!re.test(h)) throw new Error(`slot not found: ${name}`);
  h = h.replace(re, (_, open, _tag, _old, close) => open + inner + close);
}
function setAttr(name, attr, value) {
  const tagRe = new RegExp(`<[a-z0-9]+[^>]*data-slot="${name}"[^>]*>`);
  const m = h.match(tagRe);
  if (!m) throw new Error(`attr slot not found: ${name}.${attr}`);
  const attrRe = new RegExp(`\\s${attr}="[^"]*"`);
  if (!attrRe.test(m[0])) throw new Error(`attr missing on slot: ${name}.${attr}`);
  h = h.replace(m[0], m[0].replace(attrRe, ` ${attr}="${esc(value)}"`));
}
// optional section headings supplied by the copy
c.statsTitle = c.statsTitle || (c.headings && c.headings.stats);
c.faqTitle = c.faqTitle || (c.headings && c.headings.faq);
c.sourcesTitle = c.sourcesTitle || (c.headings && c.headings.sources);
function replaceBlock(startMarker, endMarker, inner) {
  const i = h.indexOf(startMarker); if (i < 0) throw new Error('block start missing: ' + startMarker);
  const j = h.indexOf(endMarker, i); if (j < 0) throw new Error('block end missing: ' + endMarker);
  h = h.slice(0, i) + inner + h.slice(j + endMarker.length);
}
const splitNum = v => { const m = String(v).trim().match(/^([+\-]?[\d.,/]+(?:\s+(?:a|to)\s+[\d.,]+)?)\s*(.*)$/); return m ? { n: m[1], u: m[2] } : { n: String(v), u: '' }; };
// the big numeral already carries the tip number; drop a leading "N. " from headings
const noNum = s => String(s ?? '').replace(/^\s*\d+\.\s*/, '');
// Outbound links go only to authority domains and our own sites (site.json authorityDomains).
// Any other source is still named, but never linked: no relevance passed to competitors.
const AUTH = (site.authorityDomains || []).map(d => d.toLowerCase());
const linkable = url => {
  try { const h = new URL(url).hostname.toLowerCase().replace(/^www\./, ''); return AUTH.some(d => d.startsWith('.') ? h.endsWith(d) : (h === d || h.endsWith('.' + d))); } catch { return false; }
};
// Our own properties are followed; every cited source is rel="nofollow".
const OWN = ['publicspeakingtips.mx', 'publicspeakingtips.io', 'amberwillo.com', 'confidently.pro', 'github.com'];
const isOwn = url => { try { const h = new URL(url).hostname.toLowerCase().replace(/^www\./, ''); return OWN.some(d => h === d || h.endsWith('.' + d)); } catch { return false; } };
const relFor = url => isOwn(url) ? 'noopener' : 'nofollow noopener';
const link = (text, url) => (url && linkable(url)) ? `<a href="${esc(url)}" rel="${relFor(url)}">${esc(text)}</a>` : esc(text);

// ---- head + hero
setSlot('title', esc(c.meta.title));
setAttr('description', 'content', c.meta.description);
setAttr('og-title', 'content', c.meta.ogTitle || c.meta.title);
setAttr('og-description', 'content', c.meta.ogDescription || c.meta.description);
setAttr('tw-title', 'content', c.meta.ogTitle || c.meta.title);
setAttr('tw-description', 'content', c.meta.ogDescription || c.meta.description);
setSlot('eyebrow', esc(c.hero.eyebrow));
{
  const h1 = c.hero.h1;
  const idx = h1.indexOf(KW);
  setSlot('h1', idx >= 0
    ? `<span class="kw">${esc(KW)}<span class="sep">: </span></span>${esc(h1.slice(idx + KW.length).replace(/^[\s:.,]+/, ''))}`
    : esc(h1));
}
setSlot('lead', rich(c.hero.lead));
setAttr('meta-actualizado', 'datetime', c.hero.updated);
{
  const d = new Date(c.hero.updated + 'T12:00:00Z');
  setSlot('meta-actualizado', esc(ui.longDate.replace('{d}', String(d.getUTCDate())).replace('{month}', ui.months[d.getUTCMonth()]).replace('{y}', String(d.getUTCFullYear()))));
}
setSlot('meta-lectura', esc(ui.readingMinutes.replace('{n}', String(c.hero.readingMinutes))));
setSlot('meta-fuentes', esc(ui.sources.replace('{n}', String(c.hero.sourcesCount ?? c.sources.length))));
setSlot('alt-lang', c.altLang && c.altLang.text ? rich(c.altLang.text) : '');
for (const s of ['cta-header', 'cta-hero']) { setSlot(s, esc(c.hero.ctaText) + ARROW); setAttr(s, 'href', c.closing.ctaHref); }

// ---- toc
setSlot('toc', c.tips.map(t => `\n        <li><a href="#${ANCHOR}-${t.n}"><span class="toc-n">${String(t.n).padStart(2, '0')}</span>${esc(noNum(t.tocLabel || t.h2))}</a></li>`).join('') + '\n      ');

// ---- stats strip
c.stats.slice(0, 4).forEach((s, i) => {
  const { n, u } = splitNum(s.value);
  const re = new RegExp(`(<p class="stat-n"><em data-slot="cifra-${i + 1}-num">)[^<]*(</em>)<span class="unit">[^<]*</span>`);
  if (!re.test(h)) throw new Error('stat markup changed');
  h = h.replace(re, `$1${esc(n)}$2<span class="unit">${esc(u)}</span>`);
  setSlot(`cifra-${i + 1}-texto`, esc(s.label));
  setSlot(`cifra-${i + 1}-fuente`, link(s.source, s.sourceUrl));
});
if (c.statsTitle) setSlot('cifras-titulo', esc(c.statsTitle));
if (c.statsNote) setSlot('cifras-nota', esc(c.statsNote));

// ---- tips block (rebuilt wholesale)
function tipHtml(t) {
  const n = Number(t.n), nn = String(n).padStart(2, '0');
  const paras = (t.paragraphs || []).map(p => `<p>${rich(p)}</p>`);
  const extras = [];
  if (t.callout) {
    const { n: cn, u } = splitNum(t.callout.value);
    extras.push(`<figure class="callout">
            <p class="callout-n">${esc(cn)}${u ? `<span class="unit">${esc(u)}</span>` : ''}</p>
            <figcaption><span>${rich(t.callout.text)}</span><small>${esc(ui.sourceLabel)} ${link(t.callout.source, t.callout.sourceUrl)}</small></figcaption>
          </figure>`);
  }
  if (t.checklist && t.checklist.length) extras.push(`<ul class="check">\n${t.checklist.map(li => `            <li>${rich(li)}</li>`).join('\n')}\n          </ul>`);
  if (t.quote) extras.push(`<blockquote class="pull"${t.quote.url && linkable(t.quote.url) ? ` cite="${esc(t.quote.url)}"` : ''}>
            <p>${rich(t.quote.text)}</p>
            <footer>${link(t.quote.cite, t.quote.url)}</footer>
          </blockquote>`);
  const body = [...paras.slice(0, 2), ...extras, ...paras.slice(2)];
  let inner;
  if (n === 1) {
    // the card closes the tip, as on the sibling page: all prose first, then the offer
    const cta = t.cta || {};
    inner = `<div class="prose" data-slot="consejo-1-cuerpo">\n          ${body.join('\n          ')}\n        </div>
        <aside class="cta-card" id="cta-${ANCHOR}-1" aria-labelledby="cta-${ANCHOR}-1-titulo">
          <p class="eyebrow" data-slot="cta-1-eyebrow">${esc(cta.eyebrow || ui.freeTrial)}</p>
          <h3 id="cta-${ANCHOR}-1-titulo" data-slot="cta-1-titulo">${esc(cta.title || '')}</h3>
          <p data-slot="cta-1-texto">${rich(cta.description || '')}</p>
          <a class="btn btn--primary" href="${esc(cta.href || c.closing.ctaHref)}" data-slot="cta-1-boton">${esc(cta.text || c.hero.ctaText)}${ARROW}</a>
          <small class="fine" data-slot="cta-1-nota">${esc(cta.note || '')}</small>
        </aside>`;
  } else {
    inner = `<div class="prose" data-slot="${ANCHOR}-${n}-cuerpo">\n          ${body.join('\n          ')}\n        </div>`;
  }
  return `    <section class="tip" id="${ANCHOR}-${n}" aria-labelledby="${ANCHOR}-${n}-titulo">
      <p class="tip-num" aria-hidden="true"><span class="z">${nn[0]}</span>${nn[1]}</p>
      <div class="tip-body">
        <h2 id="${ANCHOR}-${n}-titulo" data-slot="${ANCHOR}-${n}-titulo">${esc(noNum(t.h2))}</h2>
        ${inner}
      </div>
    </section>`;
}
{
  const re = /  <div class="tips wrap">[\s\S]*?<\/div>\s*\n(?=\s*<!-- ===== SOURCES)/;
  if (!re.test(h)) throw new Error('tips block not found');
  h = h.replace(re, `  <div class="tips wrap">\n${c.tips.map(tipHtml).join('\n')}\n  </div>\n\n`);
}

// ---- sources
setSlot('fuentes-lista', c.sources.map(s => `\n      <li id="fuente-${s.n}"><cite>${link(s.title, s.url)}</cite><span class="dom">${esc(s.domain)}</span></li>`).join('') + '\n    ');
if (c.sourcesNote) setSlot('fuentes-nota', esc(c.sourcesNote));

// ---- faq
// the FAQ list nests divs, so replace the whole block up to the section end rather than the first </div>
const faqRe = /(<div class="faq-list" data-slot="faq-lista">)[\s\S]*?(<\/div>\s*<\/section>)/;
if (!faqRe.test(h)) throw new Error('faq block not found');
h = h.replace(faqRe, (_, open, close) => open + c.faq.map((f, i) => `
      <details id="faq-${i + 1}">
        <summary><h3 data-slot="faq-${i + 1}-pregunta">${esc(f.q)}</h3></summary>
        <div class="answer" data-slot="faq-${i + 1}-respuesta">
          ${String(f.a).split(/\n\n+/).map(p => `<p>${rich(p)}</p>`).join('\n          ')}
        </div>
      </details>`).join('') + '\n    ' + close);
if (c.faqTitle) setSlot('faq-titulo', esc(c.faqTitle));
if (c.sourcesTitle) setSlot('fuentes-titulo', esc(c.sourcesTitle));

// ---- closing + footer
if (c.closing.eyebrow) setSlot('cta-final-eyebrow', esc(c.closing.eyebrow));
setSlot('cta-final-titulo', esc(c.closing.h2));
setSlot('cta-final-texto', rich(c.closing.text));
setSlot('cta-final-boton', esc(c.closing.ctaText) + ARROW); setAttr('cta-final-boton', 'href', c.closing.ctaHref);
if (c.closing.note) setSlot('cta-final-nota', esc(c.closing.note));
if (c.footer && c.footer.description) setSlot('footer-descripcion', esc(c.footer.description));
// optional footer link list from the copy; otherwise the template defaults (privacy, contact) stay
if (c.footer && Array.isArray(c.footer.links) && c.footer.links.length) {
  setSlot('footer-links', c.footer.links.map(l => `\n      <li><a href="${esc(l.href)}"${/^https?:/.test(l.href) ? ' rel="noopener"' : ''}>${esc(l.text)}</a></li>`).join('') + '\n    ');
}

// ---- json-ld
const jsonld = JSON.parse(JSON.stringify(c.jsonld));
(function scrub(o) {
  if (Array.isArray(o)) { o.forEach(scrub); return; }
  if (!o || typeof o !== 'object') return;
  for (const k of Object.keys(o)) {
    const v = o[k];
    if ((k === 'url' || k === 'sameAs' || k === '@id') && typeof v === 'string' && /^https?:/.test(v) && !linkable(v)) { delete o[k]; continue; }
    if (k === 'sameAs' && Array.isArray(v)) { o[k] = v.filter(u => typeof u !== 'string' || linkable(u)); if (!o[k].length) delete o[k]; continue; }
    scrub(v);
  }
})(jsonld);
h = h.replace(/(<script type="application\/ld\+json" id="jsonld-slot">)[\s\S]*?(<\/script>)/, (_, a, b) => a + JSON.stringify(jsonld).replace(/</g, '\\u003c') + b);

// ---- site placeholders: language, domain, UI strings, hreflang
{
  const hreflang = (site.hreflang || []).map(a => `<link rel="alternate" hreflang="${esc(a.lang)}" href="${esc(a.href)}">`).join('\n');
  const vals = { lang: site.lang, ogLocale: site.ogLocale, domain: site.domain, tld: site.domain.slice(site.domain.lastIndexOf('.')), hreflang };
  h = h.replace(/\{\{hreflang\}\}/g, hreflang);
  h = h.replace(/\{\{ui\.([a-zA-Z]+)\}\}/g, (_, k) => { if (!(k in ui)) throw new Error('site.json ui missing: ' + k); return esc(ui[k]); });
  h = h.replace(/\{\{(lang|ogLocale|domain|tld)\}\}/g, (_, k) => esc(vals[k]));
  const left = h.match(/\{\{[a-zA-Z.]+\}\}/g);
  if (left) throw new Error('unfilled placeholders: ' + left.join(' '));
}

// ---- analytics key (public browser key of the shared Amplitude project; lives in .env.local, never in git)
{
  let key = "";
  try { const envText = fs.readFileSync(path.join(root, ".env.local"), "utf8"); const mm = envText.match(/^AMPLITUDE_API_KEY=(.+)$/m); if (mm) key = mm[1].trim(); } catch {}
  if (!key) console.warn("AMPLITUDE_API_KEY missing in .env.local: tracking stays disabled in index.html");
  h = h.replace("__AMPLITUDE_KEY__", key || "__AMPLITUDE_KEY__");
}
fs.writeFileSync(path.join(root, 'index.html'), h);

// ---- checks
const text = h.replace(/<style>[\s\S]*?<\/style>/, '').replace(/<script[\s\S]*?<\/script>/g, '');
const count = (str, re) => (str.match(re) || []).length;
console.log(JSON.stringify({
  bytes: Buffer.byteLength(h),
  h1: count(h, /<h1[\s>]/g), h2: count(h, /<h2[\s>]/g), h3: count(h, /<h3[\s>]/g),
  dashes: count(text, /[–—]/g), exampleLinks: count(h, /example\.com/g),
  kwInTitle: /<title[^>]*>[^<]*Public Speaking Tips/i.test(h), kwInH1: /<h1[\s\S]*?Public Speaking Tips[\s\S]*?<\/h1>/i.test(h),
  tips: c.tips.length, faq: c.faq.length, sources: c.sources.length,
}));
