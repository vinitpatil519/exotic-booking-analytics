'use strict';
/* ---------- data ---------- */
const PAYLOAD = JSON.parse(document.getElementById('data').textContent.replace(/<\\\//g, '</'));
const FIELDS = PAYLOAD.fields;
const BASE = PAYLOAD.rows.map(r => { const o = {}; FIELDS.forEach((f, i) => o[f] = r[i]); return o; });
BASE.forEach(d => {
  d.search = [d.name, d.city, d.asm, d.rsm, d.nh, d.sg, d.key].join(' ').toUpperCase();
  d.actionable = !/^(DELISTED|NOCODE)/.test(d.key) && d.sg !== 'COMPANY SHOPS';
});
const QTY = true; /* shared chart library formats quantities */
const SUMK = ['v0', 'v1', 'p0', 'p1', 's0', 's1', 'pm0', 'pm1', 'sm0', 'sm1', 'py0', 'py1', 'sy0', 'sy1'];
const grow = (a, b) => a > 0 ? b / a - 1 : null;
const QUADS = ['Healthy growth', 'Stock push', 'Under-supplied', 'Both falling', 'Not comparable'];
const QCOL = {'Healthy growth': 'var(--gain)', 'Stock push': 'var(--c4)', 'Under-supplied': 'var(--c3)', 'Both falling': 'var(--loss)', 'Not comparable': 'var(--s25)'};
const quadOf = (gp, gs) => gp == null || gs == null ? 'Not comparable' : gp >= 0 && gs >= 0 ? 'Healthy growth' : gp >= 0 ? 'Stock push' : gs >= 0 ? 'Under-supplied' : 'Both falling';
const MOMS = ['Accelerating', 'Steady', 'Slowing', 'Stopped in October', 'Started in October', 'Not comparable'];

/* ---------- state ---------- */
const FILTERS = [['nh', 'National head'], ['rsm', 'RSM'], ['asm', 'ASM'], ['sg', 'Sales group'], ['quad', 'Segment']];
const emptyF = () => ({nh: '', rsm: '', asm: '', sg: '', quad: ''});
const state = {f: emptyF(), m: 'p', per: 'ytd', section: 'summary', cd: 'rsm', cn: 12, topN: 25, topBy: 'v1', cityN: 25, q: '', st: '', list: 'push',
  th: {ytd: {base: 500, push: .1, gap: .2, fall: .2}, oct: {base: 100, push: .1, gap: .2, fall: .2}}, lv: {lapsed: 25, under: 50}};
const TH = () => state.th[state.per];
const L0 = () => state.per === 'ytd' ? "YTD'25" : "Oct'25";
const L1 = () => state.per === 'ytd' ? "YTD'26" : "Oct'26";
const PER = () => state.per === 'ytd' ? 'year to date (to October)' : 'October';
const MN = () => state.m === 'p' ? 'Primary' : 'Secondary';
const MW = () => MN().toLowerCase();
const OTHER = () => state.m === 'p' ? 'secondary' : 'primary';

/* Dealer values for the chosen measure and period. v0/v1 = last year / this year of the chosen measure. */
let DEALERS = [];
function prep() {
  const y = state.per === 'ytd';
  DEALERS = BASE.map(b => {
    const d = {...b};
    d.p0 = y ? b.py0 : b.pm0; d.p1 = y ? b.py1 : b.pm1; d.s0 = y ? b.sy0 : b.sm0; d.s1 = y ? b.sy1 : b.sm1;
    d.v0 = state.m === 'p' ? d.p0 : d.s0; d.v1 = state.m === 'p' ? d.p1 : d.s1;
    d.dv = d.v1 - d.v0; d.g = grow(d.v0, d.v1);
    d.status = d.v0 > 0 && d.v1 > 0 ? 'Continuing' : d.v1 > 0 ? 'New' : d.v0 > 0 ? 'Lost' : 'Inactive';
    d.minv = d.v0 > 0 ? Math.max(0, Math.min(d.v0, d.v1)) : 0;
    d.gp = grow(d.p0, d.p1); d.gs = grow(d.s0, d.s1);
    d.ratio1 = d.s1 > 0 && d.p1 >= 0 ? d.p1 / d.s1 : null; d.ratio0 = d.s0 > 0 && d.p0 >= 0 ? d.p0 / d.s0 : null;
    d.build1 = d.p1 - d.s1; d.build0 = d.p0 - d.s0;
    d.quad = quadOf(d.gp, d.gs);
    const m0 = state.m === 'p' ? b.pm0 : b.sm0, m1 = state.m === 'p' ? b.pm1 : b.sm1, y0 = state.m === 'p' ? b.py0 : b.sy0, y1 = state.m === 'p' ? b.py1 : b.sy1;
    d.gOct = grow(m0, m1); d.gYtd = grow(y0, y1); d.octSh1 = y1 > 0 && m1 >= 0 ? m1 / y1 : null; d.octSh0 = y0 > 0 && m0 >= 0 ? m0 / y0 : null;
    d.mom = m0 > 0 && m1 <= 0 ? 'Stopped in October' : m0 <= 0 && m1 > 0 ? 'Started in October' : d.gOct == null || d.gYtd == null ? 'Not comparable' : d.gOct - d.gYtd > .1 ? 'Accelerating' : d.gOct - d.gYtd < -.1 ? 'Slowing' : 'Steady';
    d.b0 = bandOf(d.v0); d.b1 = bandOf(d.v1);
    return d;
  });
}
const BANDSET = () => state.per === 'ytd' ? [[0, '<500'], [500, '500–1,000'], [1000, '1,000–2,500'], [2500, '2,500–5,000'], [5000, '5,000+']] : [[0, '<100'], [100, '100–250'], [250, '250–500'], [500, '500–1,000'], [1000, '1,000+']];
const bandOf = v => { if (!(v > 0)) return 'Nil'; const B = BANDSET(); let b = B[0][1]; for (const [t, l] of B) if (v >= t) b = l; return b; };
const pass = (d, skip) => FILTERS.every(([k]) => k === skip || !state.f[k] || String(d[k]) === String(state.f[k]));
const view = () => DEALERS.filter(d => pass(d));

/* ---------- formatting ---------- */
const MINUS = '−';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const num = (x, d = 0) => x == null || !isFinite(x) ? '–' : (x < 0 ? MINUS : '') + Math.abs(x).toLocaleString('en-IN', {minimumFractionDigits: d, maximumFractionDigits: d});
const money = x => x == null || !isFinite(x) ? '–' : num(x) + ' mtrs';
const sMoney = x => (x > 0 ? '+' : '') + money(x);
const lakh = x => num(x);
const cfmt = v => num(v);
const pct = (x, d = 1) => x == null || !isFinite(x) ? '–' : (x < 0 ? MINUS : '') + Math.abs(x * 100).toFixed(d) + '%';
const sPct = (x, d = 1) => x == null || !isFinite(x) ? '–' : (x > 0 ? '+' : '') + pct(x, d);
const pts = x => x == null || !isFinite(x) ? '–' : (x > 0 ? '+' : '') + (x < 0 ? MINUS : '') + Math.abs(x).toFixed(2);
const rat = x => x == null || !isFinite(x) ? '–' : x.toFixed(2) + '×';
const axisMoney = x => { const a = Math.abs(x), s = x < 0 ? MINUS : ''; if (a >= 1e7) return `${s}${+(a / 1e7).toFixed(1)} Cr`; if (a >= 1e5) return `${s}${+(a / 1e5).toFixed(1)} L`; if (a >= 1e3) return `${s}${+(a / 1e3).toFixed(0)} K`; return s + +a.toFixed(1); };
const plural = (n, w) => `${num(n)} ${w}${n === 1 ? '' : 's'}`;
const signed = (x, f) => `<span class="${x < 0 ? 'neg' : ''}">${f(x)}</span>`;
const median = a => { const s = a.filter(v => v != null && isFinite(v)).sort((x, y) => x - y); if (!s.length) return null; const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const verb = (g, up = 'rose', dn = 'fell') => g >= 0 ? up : dn;
const cap1 = t => t[0].toUpperCase() + t.slice(1);

/* ---------- metrics ---------- */
function roll(rows) {
  const o = {n: rows.length, act0: 0, act1: 0, cont: 0, lost: 0, neu: 0, inact: 0, lostV: 0, newV: 0, otherV: 0, c0: 0, c1: 0, minv: 0, up: 0, dn: 0, upV: 0, dnV: 0, top: 0, topName: '', actPS: 0, building: 0};
  SUMK.forEach(k => o[k] = 0);
  for (const d of rows) {
    for (const k of SUMK) o[k] += d[k];
    o.minv += d.minv; if (d.v0 > 0) o.act0++; if (d.v1 > 0) o.act1++;
    if (d.status === 'Continuing') { o.cont++; o.c0 += d.v0; o.c1 += d.v1; if (d.dv > 0) { o.up++; o.upV += d.dv; } else if (d.dv < 0) { o.dn++; o.dnV += d.dv; } }
    else if (d.status === 'Lost') { o.lost++; o.lostV += d.v0 - d.v1; } else if (d.status === 'New') { o.neu++; o.newV += d.v1 - d.v0; } else { o.inact++; o.otherV += d.dv; }
    if (d.v1 > o.top) { o.top = d.v1; o.topName = d.name; }
    if (d.p1 > 0 || d.s1 > 0) { o.actPS++; if (d.p1 > d.s1) o.building++; }
  }
  o.dv = o.v1 - o.v0; o.g = grow(o.v0, o.v1); o.gp = grow(o.p0, o.p1); o.gs = grow(o.s0, o.s1);
  o.gap = o.gp != null && o.gs != null ? (o.gp - o.gs) * 100 : null;
  o.ratio1 = o.s1 > 0 ? o.p1 / o.s1 : null; o.ratio0 = o.s0 > 0 ? o.p0 / o.s0 : null; o.build1 = o.p1 - o.s1; o.build0 = o.p0 - o.s0;
  o.logo = o.act0 ? o.cont / o.act0 : null; o.lfl = o.c0 > 0 ? o.c1 / o.c0 - 1 : null; o.grr = o.v0 > 0 ? o.minv / o.v0 : null; o.nrr = o.v0 > 0 ? o.c1 / o.v0 : null;
  o.perDealer = o.act1 ? o.v1 / o.act1 : null; o.topShare = o.v1 > 0 ? o.top / o.v1 : null; o.buildShare = o.actPS ? o.building / o.actPS : null;
  o.gpy = grow(o.py0, o.py1); o.gsy = grow(o.sy0, o.sy1); o.gpm = grow(o.pm0, o.pm1); o.gsm = grow(o.sm0, o.sm1);
  const m0 = state.m === 'p' ? o.pm0 : o.sm0, m1 = state.m === 'p' ? o.pm1 : o.sm1, y0 = state.m === 'p' ? o.py0 : o.sy0, y1 = state.m === 'p' ? o.py1 : o.sy1;
  o.gOct = grow(m0, m1); o.gYtd = grow(y0, y1); o.accel = o.gOct != null && o.gYtd != null ? (o.gOct - o.gYtd) * 100 : null; o.octSh1 = y1 > 0 ? m1 / y1 : null; o.octSh0 = y0 > 0 ? m0 / y0 : null;
  return o;
}
function groupBy(rows, key) { const m = new Map(); for (const d of rows) { const k = typeof key === 'function' ? key(d) : d[key]; if (!m.has(k)) m.set(k, []); m.get(k).push(d); } return m; }
function rollup(rows, key, total) {
  const T = total || roll(rows);
  return [...groupBy(rows, key)].map(([k, g]) => { const o = roll(g); o.label = k; o.key = k; o.share = T.v1 > 0 ? o.v1 / T.v1 : null; o.cpp = T.v0 > 0 ? o.dv / T.v0 * 100 : null; o.rows = g; return o; }).sort((a, b) => b.v1 - a.v1 || b.v0 - a.v0);
}
function concentration(rows) {
  const a = rows.map(d => d.v1).filter(v => v > 0).sort((x, y) => y - x), T = a.reduce((s, v) => s + v, 0);
  if (!T) return {n: 0};
  let hhi = 0, cum = 0, to50 = 0, to80 = 0, weighted = 0; const n = a.length;
  a.forEach((v, i) => { hhi += (v / T) ** 2; cum += v; if (!to50 && cum / T >= .5) to50 = i + 1; if (!to80 && cum / T >= .8) to80 = i + 1; weighted += (n - i) * v; });
  return {n, hhi: hhi * 1e4, eff: 1 / hhi, to50, to80, gini: 2 * weighted / (n * T) - (n + 1) / n, median: median(a), mean: T / n};
}
const topShare = (rows, f, k) => { const a = rows.map(d => d[f]).filter(v => v > 0).sort((x, y) => y - x), T = a.reduce((s, v) => s + v, 0); return T ? a.slice(0, k).reduce((s, v) => s + v, 0) / T : null; };
function spearman(xs, ys) {
  const rank = v => { const idx = v.map((x, i) => [x, i]).sort((a, b) => a[0] - b[0]), r = new Array(v.length); let i = 0;
    while (i < idx.length) { let j = i; while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++; for (let k = i; k <= j; k++) r[idx[k][1]] = (i + j) / 2 + 1; i = j + 1; } return r; };
  const a = rank(xs), b = rank(ys), n = a.length; if (n < 3) return null;
  const ma = a.reduce((s, v) => s + v, 0) / n, mb = b.reduce((s, v) => s + v, 0) / n; let c = 0, va = 0, vb = 0;
  for (let i = 0; i < n; i++) { c += (a[i] - ma) * (b[i] - mb); va += (a[i] - ma) ** 2; vb += (b[i] - mb) ** 2; }
  const r = c / Math.sqrt(va * vb); return isFinite(r) ? r : null;
}
const quant = (s, p) => { if (!s.length) return null; const i = (s.length - 1) * p, lo = Math.floor(i), hi = Math.ceil(i); return s[lo] + (s[hi] - s[lo]) * (i - lo); };
const DIMS = [['rsm', 'RSM'], ['asm', 'ASM'], ['sg', 'Sales group'], ['nh', 'National head'], ['city', 'City']];
const dimName = k => (DIMS.find(d => d[0] === k) || [k, k])[1];
const DRILL = new Set(FILTERS.map(f => f[0]));
const dd = dim => DRILL.has(dim) ? dim : null;
const dimPl = dim => dim === 'city' ? 'cities' : esc(dimName(dim)) + 's';
const many = (k, total, dim) => k >= total ? `all ${num(k)} ${dimPl(dim)}` : `the ${num(k)} largest ${dimPl(dim)}`;
const CSV = n => `primary-secondary-${n}`;
