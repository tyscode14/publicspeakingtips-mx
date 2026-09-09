// Quality checks over copy.json
import fs from "fs";
const path = "C:/Users/Tyron/publicspeakingtips-mx/content/copy.json";
const raw = fs.readFileSync(path, "utf8");
const c = JSON.parse(raw);
let fails = 0;

// (a) no em dash / en dash anywhere
const dashHits = [...raw.matchAll(/[\u2013\u2014]/g)].length;
console.log(`(a) em/en dashes in file: ${dashHits}`);
if (dashHits) { fails++; for (const m of raw.matchAll(/.{0,40}[\u2013\u2014].{0,40}/g)) console.log("   ", m[0]); }

// (b) every text string with a digit in lead / tips / stats / faq / closing must match a ledger claim on the number substring
const ledgerText = c.factLedger.map((l) => l.claim).join(" \n ");
const numTok = (s) => (s.match(/\d[\d,.:/-]*\d|\d/g) || []).map((t) => t.replace(/[.,:]$/, ""));
const texts = [];
texts.push(["hero.lead", c.hero.lead]);
for (const s of c.stats) { texts.push([`stats[${s.value}].value`, s.value]); texts.push([`stats[${s.value}].label`, s.label]); }
for (const t of c.tips) {
  texts.push([`tip${t.n}.h2`, t.h2]);
  t.paragraphs.forEach((p, i) => texts.push([`tip${t.n}.p${i + 1}`, p]));
  if (t.callout) { texts.push([`tip${t.n}.callout.value`, t.callout.value]); texts.push([`tip${t.n}.callout.text`, t.callout.text]); }
  if (t.checklist) t.checklist.forEach((x, i) => texts.push([`tip${t.n}.check${i + 1}`, x]));
  if (t.quote) texts.push([`tip${t.n}.quote`, t.quote.text]);
  if (t.cta) texts.push([`tip${t.n}.cta`, t.cta.text]);
}
c.faq.forEach((f, i) => { texts.push([`faq${i + 1}.q`, f.q]); texts.push([`faq${i + 1}.a`, f.a]); });
texts.push(["closing.text", c.closing.text]);
texts.push(["closing.cta", c.closing.ctaText]);
texts.push(["hero.cta", c.hero.ctaText]);

let checked = 0, missing = 0;
for (const [where, s] of texts) {
  const toks = numTok(s);
  if (!toks.length) continue;
  checked++;
  const bad = toks.filter((t) => !ledgerText.includes(t));
  if (bad.length) { missing++; fails++; console.log(`   MISSING ledger for ${where}: ${bad.join(", ")}`); }
}
console.log(`(b) strings with digits checked: ${checked}; strings with unledgered numbers: ${missing}`);

// (b2) every ledger factId exists in the repositories (or is a documented special id)
const facts = JSON.parse(fs.readFileSync("C:/Users/Tyron/AppData/Local/Temp/claude/C--Users-Tyron-confidently-funnel/24656ce3-0ff6-40de-a4aa-c06f076c4292/scratchpad/facts_flat.json", "utf8"));
const pos = JSON.parse(fs.readFileSync("C:/Users/Tyron/AppData/Local/Temp/claude/C--Users-Tyron-confidently-funnel/24656ce3-0ff6-40de-a4aa-c06f076c4292/scratchpad/pos_stats.json", "utf8"));
const factIds = new Set(facts.map((f) => String(f.id)));
const posIds = new Set(pos.stats.map((r) => "S#" + r.id));
const special = new Set(["confidently-page", "editorial", "internal"]);
let badIds = 0;
for (const l of c.factLedger) {
  const ok = special.has(l.factId) || factIds.has(l.factId) || posIds.has(l.factId);
  if (!ok) { badIds++; fails++; console.log(`   UNKNOWN factId ${l.factId} for claim: ${l.claim.slice(0, 60)}`); }
}
console.log(`(b2) ledger entries: ${c.factLedger.length}; unknown factIds: ${badIds}`);

// (c) word counts
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
let lead = words(c.hero.lead), tipsW = 0, faqW = 0;
for (const t of c.tips) {
  tipsW += words(t.h2) + t.paragraphs.reduce((a, p) => a + words(p), 0);
  if (t.callout) tipsW += words(t.callout.text);
  if (t.checklist) tipsW += t.checklist.reduce((a, x) => a + words(x), 0);
}
for (const f of c.faq) faqW += words(f.q) + words(f.a);
const total = lead + tipsW + faqW;
console.log(`(c) words: lead ${lead} + tips ${tipsW} + faq ${faqW} = ${total} (target 1,800 to 2,400)`);
if (total < 1800 || total > 2400) { fails++; console.log("   word count out of range"); }

// (d) keyword placement
const kw = "public speaking tips";
const h2WithKw = c.tips.filter((t) => t.h2.toLowerCase().includes(kw)).map((t) => t.n);
console.log(`(d) keyword in title: ${c.meta.title.toLowerCase().includes(kw)}, h1: ${c.hero.h1.toLowerCase().includes(kw)}, lead: ${c.hero.lead.toLowerCase().includes(kw)}, h2 tips: [${h2WithKw}]`);

// (e) negated-threat phrases (copy law) and clever-compression smells
const banned = [/no te vas a quedar en blanco/i, /no te quedes en blanco/i, /no tiembl/i, /no te pongas nervios/i, /sin miedo/i, /no tengas miedo/i];
let bannedHits = 0;
for (const [where, s] of texts) for (const re of banned) if (re.test(s)) { bannedHits++; console.log(`   negated threat at ${where}: ${s.match(re)[0]}`); }
console.log(`(e) negated-threat phrases: ${bannedHits}`);
if (bannedHits) fails++;

console.log(fails ? `\nFAILED checks: ${fails}` : "\nALL CHECKS PASSED");
process.exit(fails ? 1 : 0);
