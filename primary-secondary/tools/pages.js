/* ---------- help text for every chart and table ---------- */
const HELP = {
  'Bridge chart': 'Starts at last year\'s total and ends at this year\'s. The bars in between show how much lost, declining, growing and new dealers took away or added.',
  'Growth spread': 'Dealers grouped by how much they grew or fell. Bar length is the number of dealers. Lost and new dealers sit at the two ends.',
  'Growth drivers': 'Each group\'s net change split into lost dealers, new dealers and change at dealers active in both years. The diamond marks the net.',
  'Contribution to growth': 'How many percentage points each group added to, or took away from, total growth. Added together, the bars equal total growth.',
  'Treemap': 'Each box is one group. Box size is this year\'s volume and colour is growth: blue grew, red fell, darker means a bigger move.',
  'Share vs growth matrix': 'Each bubble is a group. Further right is a bigger share, higher up is faster growth. The lines mark the average share and total growth.',
  'Primary vs secondary matrix': 'Each bubble is a group, placed by primary growth (across) and secondary growth (up). Below the diagonal, dealers are buying faster than they sell.',
  'Rank change': 'Ranking of the largest groups last year (left) and this year (right). Blue lines moved up and red lines moved down.',
  '80/20 curve (Pareto)': 'Adds dealers from largest to smallest. The curve shows how few dealers make 50%, 80% and 95% of the total.',
  'Size-band flow (Sankey)': 'Dealers moving from last year\'s size band (left) to this year\'s (right). Ribbon thickness is the number of dealers.',
  'Dealer flow': 'Active dealers in each year split into grew, flat, declined, stopped and started. Shows how much of the base turned over.',
  'Growth by dealer size': 'Dealers active in both years, in ten groups from smallest to largest. Shows whether small or large dealers grew more.',
  'Outlier map': 'Each dot is a dealer. Coloured dots moved far more than normal, beyond 3 robust standard deviations. Check these first.',
  'Gains vs losses curve': 'One curve for dealers who gained and one for dealers who lost, largest move first. Shows how few dealers drive most of each.',
  'Dealer size distribution': 'How many dealers sit in each volume band, last year against this year. Shows whether dealers got bigger or smaller.',
  'Single-dealer dependency': 'Share of each group\'s volume from its single largest dealer. A long bar means the group depends on one dealer.',
  'Primary ÷ secondary by group': 'Primary (what dealers bought) divided by secondary (what they sold through). Above 1× adds stock at dealers, below 1× draws it down.',
  'Growth heatmap': 'Growth of each group for primary and secondary, year to date and October. Blue grew, red fell.',
  'Benchmark grid': 'Each group compared with the others on nine measures. Blue is better than most, red is worse than most.',
  'Correlation matrix': 'Which measures move together across groups. Near +1 they rise together, near −1 they move in opposite directions, near 0 there is no link.',
  'Growth gap by group': 'Primary and secondary growth side by side. When the blue dot sits right of the orange one, dealers are buying faster than they sell.',
  'Stock build by group': 'Primary minus secondary. Positive means dealers took in more than they sold through, so stock is building. Negative means stock is drawing down.',
  'Season scorecard': 'Primary and secondary for the year to date and for October, with the gap between them.',
  'Dealer segments': 'Dealers split by direction of primary and secondary growth: healthy growth, stock push, under-supplied and both falling.',
  'Action summary': 'Three pools to act on first: dealers taking stock they are not selling, dealers selling more than they receive, and dealers who stopped buying.',
  'Dealer quadrant map': 'Each dot is a dealer: primary growth across, secondary growth up. The four corners are the four segments.',
  'Segment table': 'Totals for each segment, with primary, secondary, growth and stock build.',
  'Ratio distribution': 'Dealers grouped by primary ÷ secondary. The middle band is balanced, left of it draws stock down, right of it builds stock.',
  'Ratio heatmap': 'Primary ÷ secondary by sales group for each period. Orange is above 1× (stock building), green below 1× (stock drawing down).',
  'Stock build change': 'This year\'s stock build against last year\'s, by group. Shows where stocking got heavier or lighter.',
  'Momentum map': 'Each dot is an ASM: year-to-date growth across, October growth up. Above the diagonal, October is better than the year so far.',
  'Acceleration by group': 'October growth minus year-to-date growth, in points. Positive means the latest month is stronger than the trend.',
  'October share of year': 'October as a share of the year-to-date total, last year against this year. A higher share means the year is ending stronger.',
  'Dealer momentum': 'Dealers split by how October compares with their year to date: accelerating, steady, slowing, stopped or started in October.',
  'Stopped in October': 'Dealers who bought or sold in October last year but nothing in October this year. Check whether they are still active.',
  'Top dealers table': 'Dealers ranked by the measure you choose, with primary, secondary and their ratio side by side.',
  'Concentration table': 'How much of the total the top 1, 5, 10 and more dealers make, this year against last. HHI and Gini sum up concentration.',
  'Concentration curve (Lorenz)': 'Dealers sorted from largest to smallest. The curve shows what share of the total the top x% of dealers make.',
  'Decile table': 'Active dealers split into ten equal-sized groups by this year\'s volume, largest first.',
  'Size-band movement matrix': 'Rows are last year\'s size band and columns this year\'s. Each cell counts dealers, so the diagonal stayed in band.',
  'National head scorecard': 'One row per national head with volume, growth, primary against secondary and stock build. Select a row to filter the site.',
  'RSM scorecard': 'One row per RSM with volume, growth, primary against secondary and stock build. Select a row to filter the site.',
  'ASM territory map': 'Each dot is an ASM. Further right is a bigger territory, higher up is stronger growth. The lines mark the middle ASM.',
  'ASM movers': 'The ASMs that added or took away the most points of total growth.',
  'ASM scorecard and health index': 'Every ASM with its measures. The health index averages each ASM\'s rank on primary growth, secondary growth, balance and volume per dealer.',
  'Sales group scorecard': 'Every sales group with volume, growth, primary against secondary and stock build.',
  'City table': 'Cities ranked by this year\'s volume, with growth, the primary ÷ secondary ratio and the largest dealer\'s share.',
  'One-dealer cities': 'Cities where a single dealer makes more than half the volume. Losing that dealer would hit the city hard.',
  'Cities started and stopped': 'Cities with volume last year and none this year, and cities that are new this year.',
  'Opportunity sliders': 'Set how much of each pool you think can be won. Pools are lapsed dealers\' volume and the unmet sell-out at under-supplied dealers.',
  'Pro forma bridge': 'This year\'s primary plus the levers set on the left. Simple arithmetic, not a forecast.',
  'Action lists': 'Named dealer lists: stock push, under-supplied, both falling, lapsed and stopped in October. Change the thresholds to widen or narrow a list.',
  'Dealer search': 'Every dealer in the current filter. Search by name, city, ASM, sales group or code, and download as CSV.',
  'Reconciliation': 'Checks that this site\'s totals equal the totals in the source workbook. The difference should be zero.',
  'Summary sheet check': 'Compares each sales group with the workbook\'s own Summary sheet. The difference should be zero.',
  'Combined codes': 'Source rows that share one S4 HANA code, combined into one dealer so its history is not split.',
  'Source issues': 'Problems found in the source workbook and how each one was handled.',
  'Definitions': 'What each measure on this site means and how it is calculated.',
};

/* ---------- sections ---------- */
const SECTIONS = [['summary', 'Summary'], ['charts', 'Charts'], ['sell', 'Primary vs secondary'], ['momentum', 'Month vs YTD'], ['dealers', 'Dealers'], ['team', 'Sales team'], ['geo', 'Sales groups and cities'], ['actions', 'Actions'], ['all', 'All dealers'], ['notes', 'Data notes']];
const go = s => { state.section = s; try { location.hash = s; } catch (e) {} render(); window.scrollTo(0, 0); };
const secHead = (t, p) => `<header class="sec-head"><h1>${esc(t)}</h1>${p ? `<p>${p}</p>` : ''}</header>`;
const vital = (v, t, s) => `<div class="vital"><b>${v}</b><span>${t}</span><small>${s}</small></div>`;
const sec = (t, html) => html.trim() ? `<h2 class="more-h">${esc(t)}</h2><div class="grid">${html}</div>` : '';

function listsFor(R) {
  const t = TH(), A = R.filter(d => d.actionable);
  const push = A.filter(d => d.gp != null && d.gp >= t.push && d.gs != null && d.gs < 0 && d.build1 > 0 && d.p1 >= t.base).sort((a, b) => b.build1 - a.build1);
  const under = A.filter(d => d.s1 >= t.base && d.s1 > Math.max(d.p1, 0) * (1 + t.gap) && (d.gs == null || d.gs >= 0)).sort((a, b) => (b.s1 - b.p1) - (a.s1 - a.p1));
  const fall = A.filter(d => d.gp != null && d.gs != null && d.gp <= -t.fall && d.gs <= -t.fall && d.p0 >= t.base).sort((a, b) => (a.p1 - a.p0) - (b.p1 - b.p0));
  const lapsed = A.filter(d => d.p0 > 0 && d.p1 <= 0).sort((a, b) => b.p0 - a.p0);
  const stopped = A.filter(d => (d.py1 > 0 || d.sy1 > 0) && d.pm1 <= 0 && d.sm1 <= 0 && (d.pm0 > 0 || d.sm0 > 0)).sort((a, b) => (b.pm0 + b.sm0) - (a.pm0 + a.sm0));
  return {push, under, fall, lapsed, stopped};
}
const pools = l => ({push: l.push.reduce((s, d) => s + d.build1, 0), under: l.under.reduce((s, d) => s + d.s1 - Math.max(d.p1, 0), 0), lapsed: l.lapsed.reduce((s, d) => s + d.p0, 0)});

function renderSummary(R, T, K) {
  const pn = T.gpy, sn = T.gsy, rY = T.sy1 > 0 ? T.py1 / T.sy1 : null, rY0 = T.sy0 > 0 ? T.py0 / T.sy0 : null, rM = T.sm1 > 0 ? T.pm1 / T.sm1 : null;
  const headline = `Year to date, primary ${verb(pn)} ${pct(Math.abs(pn ?? 0))} to ${money(T.py1)} while secondary ${verb(sn)} ${pct(Math.abs(sn ?? 0))} to ${money(T.sy1)}.`;
  const more = `Dealers bought ${rat(rY)} what they sold through, against ${rat(rY0)} last year, a net ${T.py1 - T.sy1 >= 0 ? 'stock build' : 'stock draw-down'} of ${money(Math.abs(T.py1 - T.sy1))}. In October alone, primary ${verb(T.gpm ?? 0)} ${pct(Math.abs(T.gpm ?? 0))} and secondary ${verb(T.gsm ?? 0)} ${pct(Math.abs(T.gsm ?? 0))}.`;
  const act = (f, k) => R.filter(d => d[k] > 0).length;
  const ledger = [
    {label: 'Primary, year to date', a: money(T.py0), b: money(T.py1), c: T.gpy}, {label: 'Secondary, year to date', a: money(T.sy0), b: money(T.sy1), c: T.gsy},
    {label: 'Primary, October', a: money(T.pm0), b: money(T.pm1), c: T.gpm}, {label: 'Secondary, October', a: money(T.sm0), b: money(T.sm1), c: T.gsm},
    {label: 'Primary ÷ secondary, YTD', a: rat(rY0), b: rat(rY), c: rY && rY0 ? rY / rY0 - 1 : null}, {label: 'Primary ÷ secondary, October', a: rat(T.sm0 > 0 ? T.pm0 / T.sm0 : null), b: rat(rM), c: null},
    {label: 'Net stock build, YTD', a: sMoney(T.py0 - T.sy0), b: sMoney(T.py1 - T.sy1), c: null},
    {label: 'Dealers buying (primary), YTD', a: num(act(0, 'py0')), b: num(act(0, 'py1')), c: grow(act(0, 'py0'), act(0, 'py1'))}, {label: 'Dealers selling (secondary), YTD', a: num(act(0, 'sy0')), b: num(act(0, 'sy1')), c: grow(act(0, 'sy0'), act(0, 'sy1'))},
  ];
  const ledgerT = table({cols: [{h: 'Season scorecard', v: r => r.label, nosort: 1}, {h: 'Last year', n: 1, v: r => r.a, f: x => x, nosort: 1}, {h: 'This year', n: 1, v: r => r.b, f: x => x, nosort: 1}, {h: 'Change', n: 1, v: r => r.c, f: x => x == null ? '–' : signed(x, sPct), nosort: 1}], rows: ledger});
  const vitals = `<div class="vitals">${vital(signed(T.gp, sPct), 'Primary growth', `${PER()}, ${money(T.p1)}`)}${vital(signed(T.gs, sPct), 'Secondary growth', `${PER()}, ${money(T.s1)}`)}${vital(signed(T.gap, pts), 'Growth gap, points', 'Primary growth minus secondary growth')}${vital(rat(T.ratio1), 'Primary ÷ secondary', `${rat(T.ratio0)} last year`)}${vital(pct(T.buildShare, 0), 'Dealers building stock', `${num(T.building)} of ${num(T.actPS)} bought more than they sold`)}${vital(pct(topShare(R, 'v1', 10)), `Top 10 dealer share`, `of ${MW()}, ${num(K.to80)} dealers make 80%`)}</div>`;
  const sgs = rollup(R, 'sg', T), topBuild = sgs.slice().sort((a, b) => b.build1 - a.build1)[0], qs = CX.quads(R), push = qs.find(q => q.label === 'Stock push'), l = listsFor(R), pl = pools(l);
  const reads = [];
  if (T.gap != null) reads.push(T.gap > 2 ? `Primary is growing ${num(T.gap, 1)} points faster than secondary, so dealers are taking more stock than they sell. Watch for returns or discounting later.` : T.gap < -2 ? `Secondary is growing ${num(-T.gap, 1)} points faster than primary, so dealers are drawing stock down. Check for stock-outs at fast sellers.` : 'Primary and secondary are moving together, so dealer stock is broadly stable.');
  if (topBuild && topBuild.build1 > 0) reads.push(`${topBuild.label} added the most stock: primary ran ${money(topBuild.build1)} ahead of secondary (${rat(topBuild.ratio1)}).`);
  if (push) reads.push(`${plural(push.n, 'dealer')} with ${pct(T.p1 ? push.p1 / T.p1 : null, 0)} of primary are in stock push: buying more while selling less.`);
  if (T.gOct != null && T.gYtd != null) reads.push(`October ${MW()} ${verb(T.gOct, 'grew', 'fell')} ${pct(Math.abs(T.gOct))} against ${sPct(T.gYtd)} for the year to date, so momentum is ${T.gOct > T.gYtd + .02 ? 'improving' : T.gOct < T.gYtd - .02 ? 'slowing' : 'steady'}.`);
  const qrows = qs.filter(q => q.n);
  return `<div class="hero"><div><p class="verdict">${esc(headline)}</p><p class="verdict-more">${esc(more)}</p><h2 class="reads-h">What this means</h2><ul class="reads">${reads.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div><div class="ledger">${ledgerT}</div></div>${vitals}
  <div class="grid">
    ${P.gapDots(R, T, 'sg', {span: 7, n: 30})}
    ${P.buildBars(R, T, 'sg', {span: 5, n: 30})}
    ${panel({kind: 'Dealer segments', span: 7, title: `${num(push?.n ?? 0)} dealers are in stock push and ${num(qs.find(q => q.label === 'Under-supplied')?.n ?? 0)} are under-supplied`, sub: `Dealers by direction of primary and secondary growth, ${PER()}. Bars show each segment's share of dealers, primary and secondary.`, body: segbars([{label: 'Dealers', parts: Object.fromEntries(qrows.map(q => [q.label, q.n])), fmt: v => plural(v, 'dealer')}, {label: 'Primary', parts: Object.fromEntries(qrows.map(q => [q.label, Math.max(q.p1, 0)])), fmt: money}, {label: 'Secondary', parts: Object.fromEntries(qrows.map(q => [q.label, Math.max(q.s1, 0)])), fmt: money}], qrows.map(q => q.label), k => QCOL[k]) + `<div style="margin-top:12px">${table({cols: [C.text('Segment', 'label', {nosort: 1}), C.int('Dealers', 'n', {nosort: 1}), C.q(`Primary ${L1()}`, 'p1', {nosort: 1}), C.pct('Primary growth', 'gp', {nosort: 1}), C.q(`Secondary ${L1()}`, 's1', {nosort: 1}), C.pct('Secondary growth', 'gs', {nosort: 1}), C.q('Stock build', 'build1', {nosort: 1})], rows: qrows, drill: 'quad'})}</div>`})}
    ${P.bridge(T, {span: 5})}
    ${panel({kind: 'Action summary', span: 12, title: 'Three places to act first', sub: 'Trade dealers only. Company shops, delisted and uncoded rows are left out. Thresholds can be changed in Actions.', body: `<div class="acts">
      <div><b>${money(pl.push)}</b><p>Stock built at ${plural(l.push.length, 'dealer')} that bought more while selling less. Largest: ${esc(l.push[0]?.name ?? 'none')}.</p><button type="button" data-list="push">Open stock push list</button></div>
      <div><b>${money(pl.under)}</b><p>Sell-out above sell-in at ${plural(l.under.length, 'under-supplied dealer')}. Largest: ${esc(l.under[0]?.name ?? 'none')}.</p><button type="button" data-list="under">Open under-supplied list</button></div>
      <div><b>${money(pl.lapsed)}</b><p>Last year's primary from ${plural(l.lapsed.length, 'dealer')} with no primary this year. Largest: ${esc(l.lapsed[0]?.name ?? 'none')}.</p><button type="button" data-list="lapsed">Open lapsed list</button></div></div>`})}
  </div>`;
}

function renderCharts(R, T, K) {
  const dim = state.cd, n = state.cn || Infinity;
  const ctl = `<div class="row ctlbar"><label>Break down by<select id="cd">${DIMS.map(([k, l]) => `<option value="${k}" ${dim === k ? 'selected' : ''}>${l}</option>`).join('')}</select></label><label>Show<select id="cn">${[5, 8, 12, 20, 30, 0].map(v => `<option value="${v}" ${state.cn === v ? 'selected' : ''}>${v ? 'Top ' + v : 'All'}</option>`).join('')}</select></label><p class="p-sub" style="align-self:center">Measure and period come from the switches at the top: ${MN()}, ${PER()}.</p></div>`;
  const vit = `<h2 class="more-h" style="margin-top:0;padding-top:0;border-top:0">Headline numbers</h2><div class="vitals">${vital(money(T.v1), `${L1()} ${MW()}`, `${L0()} ${money(T.v0)}`)}${vital(signed(T.g, sPct), 'Growth', `${sMoney(T.dv)}`)}${vital(signed(T.lfl, sPct), 'Like-for-like growth', `${plural(T.cont, 'dealer')} active both years`)}${vital(num(T.act1), 'Active dealers', `${sPct(grow(T.act0, T.act1))} against ${num(T.act0)}`)}${vital(rat(T.ratio1), 'Primary ÷ secondary', `${rat(T.ratio0)} last year`)}${vital(pct(topShare(R, 'v1', 10)), 'Top 10 dealer share', `${num(K.to80)} dealers make 80%`)}</div>`;
  return secHead('Charts', `Key charts in one place for ${MW()}, ${PER()}. Choose the breakdown. The filters above apply to every chart.`) + ctl + vit
    + sec('Where the change came from', P.bridge(T) + P.growthDist(R) + P.decomp(R, T, dim, {n}) + P.contrib(R, T, dim, {n}) + P.outliers(R) + P.movers(R))
    + sec('Primary against secondary', P.psMatrix(R, T, dim, {labels: Math.min(n, 8)}) + P.ratioBars(R, T, dim, {n}) + P.gapDots(R, T, dim, {n}) + P.buildBars(R, T, dim, {n, span: 6}) + P.growthHeat(R, T, dim, {n, span: 12}))
    + sec('Structure and concentration', P.treemap(R, T, dim) + P.depend(R, T, dim, {n}) + P.matrix(R, T, dim, {labels: Math.min(n, 8)}) + P.slope(R, T, dim, {n}) + P.pareto(R) + P.sizeDist(R))
    + sec('Dealer movement', P.sankey(R) + P.flow(R) + P.sizeGrowth(R, {span: 12}))
    + sec('Benchmarks', P.kpi(R, T, dim, {n}) + P.corr(R, T, dim));
}

function renderSell(R, T) {
  const qs = CX.quads(R), dist = CX.ratioDist(R), sg = rollup(R, 'sg', T), c = R.filter(d => d.gp != null && d.gs != null);
  const cap = v => Math.max(-1, Math.min(2, v)), mx = Math.max(...c.map(d => Math.max(d.p1 + d.s1, 0)), 1);
  const bal = dist[3], heavy = dist.slice(5).reduce((s, x) => s + x.n, 0), light = dist.slice(0, 2).reduce((s, x) => s + x.n, 0);
  const pers = [["YTD'25", 'py0', 'sy0'], ["YTD'26", 'py1', 'sy1'], ["Oct'25", 'pm0', 'sm0'], ["Oct'26", 'pm1', 'sm1']], by = new Map(sg.map(g => [g.label, g]));
  return secHead('Primary vs secondary', `What dealers bought (primary, sell-in) against what they sold through (secondary, sell-out), ${PER()}. The gap is stock building up or drawing down at dealers.`) + `<div class="grid">
    ${panel({kind: 'Dealer quadrant map', span: 7, title: `${num(qs[1].n)} dealers bought more while selling less. ${num(qs[2].n)} sold more than they were sent`, sub: `Each dot is a dealer active in both years for both measures (${num(c.length)}). Primary growth across, secondary growth up. Capped at −100% and +200%.`, body: `<div class="legend">${QUADS.slice(0, 4).map(q => `<span><i style="background:${QCOL[q]}"></i>${q}</span>`).join('')}</div>` + chart(w => scatter(w, c.map(d => ({x: cap(d.gp), y: cap(d.gs), r: 2.5 + 7 * Math.sqrt(Math.max(d.p1 + d.s1, 0) / mx), op: .5, c: QCOL[d.quad], tip: [d.name, `${d.city}, ${d.asm}`, `Primary ${sPct(d.gp)}, secondary ${sPct(d.gs)}`, `Primary ÷ secondary ${rat(d.ratio1)}`, `Stock build ${sMoney(d.build1)}`]})), {x0: -1, x1: 2, y0: -1, y1: 2, xt: [-1, -.5, 0, .5, 1, 1.5, 2], yt: [-1, -.5, 0, .5, 1, 1.5, 2], xf: v => pct(v, 0), yf: v => pct(v, 0), xTitle: 'Primary growth', yTitle: 'Secondary growth', xRef: 0, yRef: 0, diag: [-1, 2], H: 380, corners: [{x: 'r', y: 't', t: 'Healthy growth'}, {x: 'l', y: 't', t: 'Under-supplied'}, {x: 'r', y: 'b', t: 'Stock push'}, {x: 'l', y: 'b', t: 'Both falling'}]}))})}
    ${panel({kind: 'Segment table', span: 5, title: `Stock push dealers built ${money(qs[1].build1)} of stock`, sub: 'Select a segment to filter the whole site.', body: table({cols: [C.text('Segment', 'label'), C.int('Dealers', 'n'), C.q(`Primary ${L1()}`, 'p1'), C.pct('Primary growth', 'gp'), C.q(`Secondary ${L1()}`, 's1'), C.pct('Secondary growth', 'gs'), C.rat('Ratio', 'ratio1'), C.q('Stock build', 'build1')], rows: qs.filter(q => q.n), drill: 'quad', total: {...T, label: 'Total'}})})}
    ${P.gapDots(R, T, 'sg', {span: 6, n: 30})}
    ${P.buildBars(R, T, 'sg', {span: 6, n: 30})}
    ${panel({kind: 'Ratio distribution', span: 6, title: `${num(bal.n)} dealers are balanced within ±5%. ${num(heavy)} bought over 1.25× what they sold`, sub: `Dealers with secondary in ${L1()} (${num(dist.reduce((s, x) => s + x.n, 0))}), by primary ÷ secondary. ${num(light)} bought under 0.8× what they sold.`, body: chart(w => hbars(w, dist.map((x, i) => ({label: x.label, v: x.n, vt: `${num(x.n)} · ${pct(x.share, 0)}`, c: i < 3 ? 'var(--c3)' : i === 3 ? 'var(--s25)' : 'var(--c4)', tip: [x.label, plural(x.n, 'dealer'), `Primary ${money(x.p1)}, secondary ${money(x.s1)}`]})), {labelW: Math.min(w * .35, 130)})), twin: {cols: [C.text('Band', 'label', {nosort: 1}), C.int('Dealers', 'n', {nosort: 1}), C.pct('Share', 'share', {nosort: 1}), C.q('Primary', 'p1', {nosort: 1}), C.q('Secondary', 's1', {nosort: 1})], rows: dist}})}
    ${panel({kind: 'Ratio heatmap', span: 6, title: 'Primary ÷ secondary by sales group, year to date and October', sub: 'Orange is above 1× (stock building), green below 1× (stock drawing down). Colour is capped at ±50%.', body: heatTable(sg.map(g => g.label), pers.map(p => p[0]), (r, c) => { const g = by.get(r), p = pers.find(x => x[0] === c); return g[p[2]] > 0 ? g[p[1]] / g[p[2]] - 1 : null; }, {fmt: v => rat(v + 1), diverge: true, max: .5}).replace(/var\(--gain-rgb\)/g, 'var(--c4-rgb)').replace(/var\(--loss-rgb\)/g, 'var(--c3-rgb)')})}
    ${panel({kind: 'Stock build change', title: 'Stock build by sales group, this year against last', sub: `Primary minus secondary, ${PER()}. Select a row to filter.`, body: table({cols: [C.text('Sales group', 'label'), C.q(`Primary ${L1()}`, 'p1', {bar: 1}), C.q(`Secondary ${L1()}`, 's1'), C.pct('Primary growth', 'gp'), C.pct('Secondary growth', 'gs'), C.pts('Gap pts', 'gap'), C.rat(`Ratio ${L0()}`, 'ratio0'), C.rat(`Ratio ${L1()}`, 'ratio1'), C.q(`Build ${L0()}`, 'build0'), C.q(`Build ${L1()}`, 'build1'), C.q('Change in build', r => r.build1 - r.build0)], rows: sg, drill: 'sg', total: {...T, label: 'Total'}, csv: CSV('stock-build')})})}
  </div>` + moreCharts(P.psMatrix(R, T, 'rsm', {span: 6}) + P.ratioBars(R, T, 'rsm', {span: 6, n: 20}));
}

function renderMomentum(R, T) {
  const asm = rollup(R, 'asm', T).filter(a => a.gOct != null && a.gYtd != null), sg = rollup(R, 'sg', T), ms = CX.moms(R), stopped = R.filter(d => d.mom === 'Stopped in October').sort((a, b) => (state.m === 'p' ? b.pm0 - a.pm0 : b.sm0 - a.sm0));
  const vals = asm.flatMap(a => [a.gOct, a.gYtd]), lo = Math.max(-1, Math.floor(Math.min(...vals, 0) * 10) / 10), hi = Math.min(1.5, Math.ceil(Math.max(...vals, 0) * 10) / 10), acc = asm.filter(a => a.gOct > a.gYtd).length, mx = Math.max(...asm.map(a => a.v1), 1);
  const sgA = sg.filter(g => g.accel != null).sort((a, b) => b.accel - a.accel), MC = {Accelerating: 'var(--gain)', Steady: 'var(--s25)', Slowing: 'var(--c4)', 'Stopped in October': 'var(--loss)', 'Started in October': 'var(--c3)', 'Not comparable': 'var(--axis)'};
  const m0 = state.m === 'p' ? 'pm0' : 'sm0', m1 = state.m === 'p' ? 'pm1' : 'sm1';
  return secHead('Month vs YTD', `October against the year to date for ${MW()}. Shows whether the latest month is stronger or weaker than the trend. This page always compares October with the year to date, whatever the period switch says.`) + `<div class="grid">
    ${panel({kind: 'Momentum map', span: 7, title: `${num(acc)} of ${num(asm.length)} ASMs did better in October than in the year to date`, sub: `Each dot is an ASM: year-to-date growth across, October growth up, for ${MW()}. Above the diagonal, October beat the trend.`, body: chart(w => scatter(w, asm.map(a => ({x: a.gYtd, y: a.gOct, label: a.key, r: 3 + 10 * Math.sqrt(Math.max(a.v1, 0) / mx), op: .6, c: a.gOct >= a.gYtd ? 'var(--gain)' : 'var(--loss)', tip: [a.label, `YTD ${sPct(a.gYtd)}`, `October ${sPct(a.gOct)}`]})), {x0: lo, x1: hi, y0: lo, y1: hi, xt: ticks(lo, hi, 6), yt: ticks(lo, hi, 6), xf: v => pct(v, 0), yf: v => pct(v, 0), xTitle: 'Year-to-date growth', yTitle: 'October growth', diag: [lo, hi], xRef: 0, yRef: 0, H: 360, dim: 'asm', labels: asm.slice(0, 8).map(a => ({x: a.gYtd, y: a.gOct, label: a.label}))}))})}
    ${panel({kind: 'Acceleration by group', span: 5, title: sgA.length ? `${esc(sgA[0].label)} is accelerating most, ${esc(sgA[sgA.length - 1].label)} slowing most` : 'Acceleration', sub: `October growth minus year-to-date growth, in points, for ${MW()}.`, body: chart(w => divBars(w, sgA.map(g => ({label: g.key, v: g.accel, tip: `October ${sPct(g.gOct)}, YTD ${sPct(g.gYtd)}`})), {dim: 'sg', fmt: v => pts(v), labelW: Math.min(w * .4, 170)}))})}
    ${panel({kind: 'October share of year', span: 7, title: `October was ${pct(T.octSh1)} of the year to date, against ${pct(T.octSh0)} last year`, sub: `October ${MW()} as a share of year-to-date ${MW()}, by sales group.`, body: `<div class="legend"><span><i style="background:var(--s25)"></i>Oct'25 share of YTD'25</span><span><i style="background:var(--s26)"></i>Oct'26 share of YTD'26</span></div>` + chart(w => pairBars(w, sg.filter(g => g.octSh1 != null || g.octSh0 != null).map(g => ({label: g.label, a: Math.max(g.octSh0 ?? 0, 0), b: Math.max(g.octSh1 ?? 0, 0)})), {fmt: v => pct(v), dim: 'sg', labelW: Math.min(w * .35, 170)}))})}
    ${panel({kind: 'Dealer momentum', span: 5, title: `${num(ms[0].n)} dealers accelerated in October and ${num(ms[2].n + ms[3].n)} slowed or stopped`, sub: `Accelerating or slowing means October growth is more than 10 points above or below year-to-date growth, for ${MW()}.`, body: segbars([{label: 'Dealers', parts: Object.fromEntries(ms.filter(x => x.n).map(x => [x.label, x.n])), fmt: v => plural(v, 'dealer')}], ms.filter(x => x.n).map(x => x.label), k => MC[k]) + `<div style="margin-top:12px">${table({cols: [C.text('Momentum', 'label', {nosort: 1}), C.int('Dealers', 'n', {nosort: 1}), C.q("Oct'25", m0, {nosort: 1}), C.q("Oct'26", m1, {nosort: 1}), C.pct('October growth', 'gOct', {nosort: 1}), C.pct('YTD growth', 'gYtd', {nosort: 1})], rows: ms.filter(x => x.n)})}</div>`})}
    ${panel({kind: 'Stopped in October', title: `${plural(stopped.length, 'dealer')} had ${MW()} in October last year but none this October`, sub: 'Largest first. Check whether these dealers are still active.', body: table({cols: [C.text('Dealer', 'name'), C.text('City', 'city'), C.text('ASM', 'asm'), C.text('Sales group', 'sg'), C.q("Oct'25", m0), C.q("Oct'26", m1), C.q(`YTD'26 ${MW()}`, state.m === 'p' ? 'py1' : 'sy1'), reviewCol], rows: stopped, pageSize: 15, csv: CSV('stopped-october')})})}
  </div>`;
}

function renderDealers(R, T, K) {
  const by = {v1: [`${L1()} ${MW()}`, d => d.v1], v0: [`${L0()} ${MW()}`, d => d.v0], gain: ['Largest gain', d => d.dv], loss: ['Largest loss', d => -d.dv], gp: [`Highest growth % (${L0()} ≥ ${num(TH().base)} mtrs)`, d => d.v0 >= TH().base && d.v1 > 0 ? d.g : null], build: ['Largest stock build', d => d.build1], draw: ['Largest stock draw-down', d => -d.build1]};
  if (!by[state.topBy]) state.topBy = 'v1';
  const [byName, score] = by[state.topBy], ranked = R.map(d => [d, score(d)]).filter(x => x[1] != null && x[1] > 0).sort((a, b) => b[1] - a[1]);
  const list = (state.topN ? ranked.slice(0, state.topN) : ranked).map((x, i) => ({...x[0], rank: i + 1})); let cum = 0; list.forEach(d => { d.sh = T.v1 > 0 ? d.v1 / T.v1 : 0; cum += d.sh; d.cum = cum; });
  const controls = `<div class="row"><label>Show<select id="topN">${[10, 25, 50, 100, 250, 0].map(n => `<option value="${n}" ${state.topN === n ? 'selected' : ''}>${n ? 'Top ' + n : 'All'}</option>`).join('')}</select></label><label>Rank by<select id="topBy">${Object.entries(by).map(([k, v]) => `<option value="${k}" ${state.topBy === k ? 'selected' : ''}>${esc(v[0])}</option>`).join('')}</select></label></div>`;
  const topRows = [1, 5, 10, 25, 50, 100, 200].filter(n => n <= Math.max(K.n, 1)).map(n => ({label: `Top ${n}`, a: topShare(R, 'v0', n), b: topShare(R, 'v1', n)}));
  const act = R.filter(d => d.v1 > 0).sort((a, b) => b.v1 - a.v1), dec = [];
  for (let i = 0; i < 10; i++) { const g = act.slice(Math.floor(act.length * i / 10), Math.floor(act.length * (i + 1) / 10)); if (!g.length) continue; const o = roll(g); o.label = i + 1; o.share = T.v1 > 0 ? o.v1 / T.v1 : 0; o.avg = o.v1 / g.length; dec.push(o); }
  let c2 = 0; dec.forEach(o => { c2 += o.share; o.cum = c2; });
  const bn = ['Nil', ...BANDSET().map(b => b[1])], mc = {}; R.forEach(d => { const k = d.b0 + '|' + d.b1; mc[k] = (mc[k] || 0) + 1; });
  return secHead('Dealers', `Who makes the ${MW()}, how concentrated it is, and how dealers moved between size bands. ${PER()[0].toUpperCase() + PER().slice(1)}.`) + `<div class="grid">
    ${panel({kind: 'Top dealers table', title: `${state.topBy === 'v1' || state.topBy === 'v0' ? `${state.topN ? 'Top ' + state.topN + ' dealers' : 'All dealers'} make ${pct(list.reduce((s, d) => s + d.v1, 0) / (T.v1 || 1))} of ${L1()} ${MW()}` : `${byName}: ${plural(list.length, 'dealer')}`}`, sub: 'Choose a list size and a ranking. Select a column heading to sort.', body: controls + table({cols: [C.int('Rank', 'rank'), ...dealerCols(), C.pct('Share', 'sh'), C.pct('Cum. share', 'cum'), reviewCol], rows: list, csv: CSV(`dealers-${state.topBy}`)})})}
    ${panel({kind: 'Concentration table', span: 5, title: `${num(K.to80)} dealers make 80% of ${MW()}`, sub: 'Dealer concentration against last year.', body: table({cols: [C.text('Group', 'label', {nosort: 1}), {h: `${L0()} share`, n: 1, v: r => r.a, f: x => pct(x), nosort: 1}, {h: `${L1()} share`, n: 1, v: r => r.b, f: x => pct(x), nosort: 1}, {h: 'Change pts', n: 1, v: r => r.a == null || r.b == null ? null : (r.b - r.a) * 100, f: x => signed(x, pts), nosort: 1}], rows: topRows}) + `<div style="margin-top:12px">${table({cols: [{h: 'Measure', v: r => r[0], nosort: 1}, {h: L1(), n: 1, v: r => r[1], f: x => x ?? '–', nosort: 1}], rows: [['Dealers for 50%', num(K.to50)], ['HHI (below 1,500 reads as unconcentrated)', num(K.hhi, 1)], ['Effective dealers (10,000 ÷ HHI)', num(K.eff)], ['Gini coefficient', K.gini?.toFixed(3)], ['Mean per active dealer', money(K.mean)], ['Median per active dealer', money(K.median)]]})}</div>`})}
    ${panel({kind: 'Concentration curve (Lorenz)', span: 7, title: `The top 20% of dealers make ${pct(topShare(R, 'v1', Math.ceil(K.n * .2) || 1), 0)} of ${MW()}`, sub: 'Cumulative share. Further from the diagonal means more concentrated.', body: seasonLegendF() + chart(w => lorenz(w, R.map(d => d.v0), R.map(d => d.v1), 380))})}
    ${panel({kind: 'Decile table', span: 7, title: `The smaller half of active dealers makes ${pct(dec.slice(5).reduce((s, o) => s + o.share, 0))} of ${MW()}`, sub: `Active ${L1()} dealers in ten equal groups, largest first.`, body: table({cols: [C.int('Decile', 'label', {nosort: 1}), C.int('Dealers', 'n', {nosort: 1}), C.q(L1(), 'v1', {bar: 1, nosort: 1}), C.pct('Share', 'share', {nosort: 1}), C.pct('Cum. share', 'cum', {nosort: 1}), C.q('Per dealer', 'avg', {nosort: 1}), C.pct('Growth', 'g', {nosort: 1}), C.rat('Primary ÷ secondary', 'ratio1', {nosort: 1})], rows: dec}), note: 'Growth by decile carries selection bias: dealers are ranked on this year, so low deciles hold dealers who fell.'})}
    ${panel({kind: 'Size-band movement matrix', span: 5, title: 'How dealers moved between size bands', sub: `Dealer count by ${MW()} band in mtrs. Rows show ${L0()} and columns ${L1()}.`, body: heatTable(bn, bn, (r, c) => mc[r + '|' + c] ?? null, {fmt: v => num(v), corner: L0(), max: Math.max(...Object.values(mc), 1)})})}
  </div>` + moreCharts(P.pareto(R, {span: 7}) + P.growthDist(R));
}

function healthIndex(rows) {
  const f = rows.filter(r => r.gp != null && r.gs != null && r.ratio1 != null);
  const pr = (a, v) => a.length < 2 ? 1 : a.filter(x => x < v).length / (a.length - 1);
  const K = [r => r.gp, r => r.gs, r => -Math.abs(Math.log(r.ratio1)), r => r.perDealer], m = K.map(k => f.map(k));
  f.forEach(r => { r.health = K.reduce((s, k, i) => s + pr(m[i], k(r)), 0) / 4 * 100; });
  f.sort((a, b) => b.health - a.health).forEach((r, i) => r.healthRank = i + 1);
}
function renderTeam(R, T) {
  const nh = rollup(R, 'nh', T), rs = rollup(R, 'rsm', T), asm = rollup(R, 'asm', T); healthIndex(asm); asm.forEach(a => a.rsm = a.rows[0].rsm);
  const field = asm.filter(a => a.g != null && a.v1 > 0), medX = median(field.map(a => a.v1)), medY = median(field.map(a => a.g)), xs = field.map(a => a.v1);
  const x0 = Math.floor(Math.log10(Math.max(Math.min(...xs, 1e3), 1)) * 2) / 2, x1 = Math.ceil(Math.log10(Math.max(...xs, 1e3)) * 2) / 2, ylo = Math.max(-1, Math.floor(Math.min(...field.map(a => a.g), -.1) * 5) / 5), yhi = Math.min(1.5, Math.ceil(Math.max(...field.map(a => a.g), .1) * 5) / 5);
  const sorted = field.slice().sort((a, b) => b.cpp - a.cpp), movers = [...sorted.slice(0, 7), ...sorted.slice(-7)].filter((v, i, a) => a.indexOf(v) === i), best = asm.filter(a => a.healthRank).sort((a, b) => a.healthRank - b.healthRank)[0];
  const hc = [{h: 'Health index', n: 1, v: r => r.health ?? null, f: x => x == null ? '–' : num(x)}, {h: 'Health rank', n: 1, v: r => r.healthRank ?? null, f: x => x == null ? '–' : num(x)}];
  return secHead('Sales team', `Scorecards for national heads, RSMs and ASMs for ${MW()}, ${PER()}, with primary against secondary. Select a row to filter the whole site.`) + `<div class="grid">
    ${panel({kind: 'National head scorecard', title: `${esc(nh[0]?.label)} has the larger book at ${money(nh[0]?.v1)}, ${sPct(nh[0]?.g)}`, sub: 'National head level.', body: table({cols: scoreCols('National head'), rows: nh, drill: 'nh', total: {...T, label: 'Total', share: 1, cpp: T.g * 100}})})}
    ${panel({kind: 'RSM scorecard', title: `${plural(rs.filter(r => r.dv < 0).length, 'of ' + rs.length + ' RSM')} declined in ${MW()}`, body: table({cols: scoreCols('RSM'), rows: rs, drill: 'rsm', total: {...T, label: 'Total', share: 1, cpp: T.g * 100}, csv: CSV('rsm-scorecard')})})}
    ${field.length > 2 ? panel({kind: 'ASM territory map', span: 7, title: `${num(field.filter(a => a.g > 0).length)} of ${num(field.length)} ASMs grew ${MW()}`, sub: 'Territory size against growth. The crossing lines mark the median ASM. Log scale. Select a dot to filter.', body: chart(w => scatter(w, field.map(a => ({x: Math.max(a.v1, 1), y: a.g, label: a.key, r: 5, op: .8, c: QCOL[quadOf(a.gp, a.gs)], tip: [a.label, `${L1()} ${money(a.v1)}`, `Growth ${sPct(a.g)}`, `Primary ÷ secondary ${rat(a.ratio1)}`, `RSM: ${a.rsm}`]})), {xLog: 1, x0, x1, y0: ylo, y1: yhi, xt: [1e3, 5e3, 1e4, 5e4, 1e5, 5e5, 1e6].filter(t => Math.log10(t) >= x0 && Math.log10(t) <= x1), yt: ticks(ylo, yhi, 6), xf: v => axisMoney(v), yf: v => pct(v, 0), xTitle: `${L1()} ${MW()} (log scale)`, yTitle: 'Growth', xRef: medX, yRef: medY, dim: 'asm', labels: sorted.slice(0, 4).concat(sorted.slice(-4)).map(a => ({x: Math.max(a.v1, 1), y: a.g, label: a.label}))}))}) : ''}
    ${field.length > 2 ? panel({kind: 'ASM movers', span: 5, title: `${esc(sorted[0].label)} added the most, ${esc(sorted[sorted.length - 1].label)} lost the most`, sub: 'Largest ASM movers, in points of total growth.', body: chart(w => divBars(w, movers.map(a => ({label: a.key, v: a.cpp, tip: `${sMoney(a.dv)}, ${sPct(a.g)}`})), {dim: 'asm', labelW: Math.min(w * .38, 160)}))}) : ''}
    ${panel({kind: 'ASM scorecard and health index', title: best ? `${esc(best.label)} leads the territory health index` : 'ASM scorecard', sub: 'Health index averages percentile ranks on primary growth, secondary growth, balance (primary ÷ secondary close to 1×) and volume per dealer, with equal weights.', body: table({cols: scoreCols('ASM', [C.text('RSM', 'rsm'), ...hc]), rows: asm, drill: 'asm', total: {...T, label: 'Total', rsm: '', share: 1, cpp: T.g * 100}, csv: CSV('asm-scorecard')})})}
  </div>` + moreCharts(P.treemap(R, T, 'asm') + P.slope(R, T, 'rsm', {n: 12}));
}

function renderGeo(R, T) {
  const sg = rollup(R, 'sg', T), city = rollup(R, 'city', T); city.forEach(c => c.sgs = [...new Set(c.rows.map(d => d.sg))].join(', '));
  const shown = state.cityN ? city.slice(0, state.cityN) : city, base = TH().base * 5;
  const depend = city.filter(c => c.v1 >= base && c.topShare >= .5).sort((a, b) => b.v1 - a.v1), gone = city.filter(c => c.v0 > 0 && c.v1 <= 0).sort((a, b) => b.v0 - a.v0), fresh = city.filter(c => c.v0 <= 0 && c.v1 > 0).sort((a, b) => b.v1 - a.v1);
  const ctl = `<div class="row"><label>Show<select id="cityN">${[10, 25, 50, 100, 0].map(n => `<option value="${n}" ${state.cityN === n ? 'selected' : ''}>${n ? 'Top ' + n : 'All ' + city.length}</option>`).join('')}</select></label></div>`;
  return secHead('Sales groups and cities', `Sales group and city performance for ${MW()}, ${PER()}. Sales groups are shown as in the workbook.`) + `<div class="grid">
    ${panel({kind: 'Sales group scorecard', title: `${esc(sg[0]?.label)} is the largest sales group at ${money(sg[0]?.v1)}`, sub: 'Select a row to filter the whole site.', body: table({cols: scoreCols('Sales group'), rows: sg, drill: 'sg', total: {...T, label: 'Total', share: 1, cpp: T.g * 100}, csv: CSV('sales-groups')})})}
    ${P.treemap(R, T, 'sg')}
    ${P.matrix(R, T, 'sg', {span: 5, labels: 6})}
    ${panel({kind: 'City table', title: `Top ${Math.min(state.cityN || city.length, city.length)} cities make ${pct(shown.reduce((s, c) => s + c.v1, 0) / (T.v1 || 1), 0)} of ${MW()}, across ${num(city.filter(c => c.v1 > 0).length)} active cities`, sub: 'City spellings were combined where they are the same place. See Data notes.', body: ctl + table({cols: [C.text('City', 'label'), C.text('Sales group', 'sgs'), C.int(`Active ${L1()}`, 'act1'), C.q(L0(), 'v0'), C.q(L1(), 'v1', {bar: 1}), C.pct('Growth', 'g'), C.pct('Share', 'share'), C.rat('Primary ÷ secondary', 'ratio1'), C.q('Stock build', 'build1'), C.pct('Largest dealer', 'topShare'), C.text('Largest dealer name', r => clip(r.topName || '–', 30))], rows: shown, csv: CSV('cities')})})}
    ${panel({kind: 'One-dealer cities', span: 6, title: depend.length ? `${plural(depend.length, 'city')} above ${money(base)} depend on one dealer for over half of ${MW()}`.replace('citys', 'cities') : `No city above ${money(base)} depends on one dealer`, sub: 'Local concentration can stay hidden when the national base is broad.', body: table({cols: [C.text('City', 'label'), C.q(L1(), 'v1'), C.pct('Largest dealer', 'topShare'), C.text('Dealer', r => clip(r.topName, 26))], rows: depend.slice(0, 12)})})}
    ${panel({kind: 'Cities started and stopped', span: 6, title: `${plural(gone.length, 'city')} stopped and ${plural(fresh.length, 'city')} started`.replace(/citys/g, 'cities'), sub: `Stopped: ${money(gone.reduce((s, c) => s + c.v0, 0))} in ${L0()}. Started: ${money(fresh.reduce((s, c) => s + c.v1, 0))} in ${L1()}.`, body: table({cols: [C.text('City', 'label'), C.text('Move', r => r.v1 > 0 ? 'Started' : 'Stopped'), C.q('mtrs', r => r.v1 > 0 ? r.v1 : r.v0)], rows: [...gone.slice(0, 7), ...fresh.slice(0, 7)]})})}
  </div>`;
}

function renderActions(R, T) {
  const l = listsFor(R), pl = pools(l), t = TH();
  const lapsedV = pl.lapsed * state.lv.lapsed / 100, underV = pl.under * state.lv.under / 100, pro = T.p1 + lapsedV + underV;
  const sl = (k, label, v, hint) => `<label class="slider"><span>${label}</span><b id="lv-${k}">${v}%</b><input type="range" min="0" max="100" step="5" value="${v}" data-lv="${k}" aria-label="${esc(label)}"><small>${hint}</small></label>`;
  const cols = [...dealerCols(), reviewCol];
  const defs = {
    push: ['Stock push', l.push, `${plural(l.push.length, 'dealer')} grew primary ${pct(t.push, 0)} or more while secondary fell, building ${money(pl.push)} of stock. Slow down shipments and help sell-out.`],
    under: ['Under-supplied', l.under, `${plural(l.under.length, 'dealer')} sold through at least ${pct(t.gap, 0)} more than they received, a gap of ${money(pl.under)}. Check stock and replenish.`],
    fall: ['Both falling', l.fall, `${plural(l.fall.length, 'dealer')} fell ${pct(t.fall, 0)} or more on both primary and secondary. These need a visit.`],
    lapsed: ['Lapsed', l.lapsed, `${plural(l.lapsed.length, 'dealer')} bought ${money(pl.lapsed)} last year and nothing this year. Start with the largest.`],
    stopped: ['Stopped in October', l.stopped, `${plural(l.stopped.length, 'dealer')} were active in October last year and this year to date, but had nothing in October this year.`],
  };
  const cur = defs[state.list] || defs.push;
  const th = `<label>Minimum volume (mtrs)<input type="number" step="50" min="0" value="${t.base}" data-th="base"></label>` + ({push: `<label>Minimum primary growth (%)<input type="number" step="5" min="0" value="${t.push * 100}" data-th="push" data-pct="1"></label>`, under: `<label>Minimum sell-out above sell-in (%)<input type="number" step="5" min="0" value="${t.gap * 100}" data-th="gap" data-pct="1"></label>`, fall: `<label>Minimum fall on both (%)<input type="number" step="5" min="0" max="100" value="${t.fall * 100}" data-th="fall" data-pct="1"></label>`}[state.list] || '');
  return secHead('Actions', `Named dealer lists for ${PER()}, and a simple sizing of what they could be worth in primary. Company shops, delisted and uncoded rows are left out.`) + `<div class="grid">
    ${panel({kind: 'Opportunity sliders', span: 5, title: `These two levers could add ${money(lapsedV + underV)} of primary`, sub: 'Illustrative arithmetic, not a forecast. Move the sliders to your own view.', body: sl('lapsed', 'Win back lapsed dealers', state.lv.lapsed, `Pool: ${money(pl.lapsed)}`) + sl('under', 'Replenish under-supplied dealers', state.lv.under, `Pool: ${money(pl.under)}`)})}
    ${panel({kind: 'Pro forma bridge', span: 7, title: `Pro forma primary: ${money(pro)}, ${sPct(T.p0 > 0 ? pro / T.p0 - 1 : null)} against ${L0()}`, sub: `Actual ${L1()} primary plus the two levers.`, body: chart(w => bridge(w, [{label: `${L1()} primary`, v: T.p1, total: 1, fill: 'var(--s26)'}, {label: 'Win back lapsed dealers', v: lapsedV}, {label: 'Replenish under-supplied', v: underV}, {label: 'Pro forma', v: pro, total: 1, fill: 'var(--ink2)'}]))})}
    ${panel({kind: 'Action lists', title: `${esc(cur[0])}: ${esc(cur[2])}`, sub: 'Dealers marked with a flag have a data question. See Data notes before acting.', body: `<div class="row"><div class="seg" role="group" aria-label="Action list">${Object.entries(defs).map(([k, v]) => `<button type="button" data-listtab="${k}" aria-pressed="${(defs[state.list] ? state.list : 'push') === k}">${esc(v[0])} (${num(v[1].length)})</button>`).join('')}</div>${th}</div>` + table({cols, rows: cur[1], pageSize: 25, csv: CSV(`action-${state.list}`)})})}
  </div>` + moreCharts(P.pareto(R, {span: 7, vals: l.lapsed.map(d => d.p0), unit: 'lapsed dealers', title: (k, n2, Tw) => `${num(k)} of ${num(n2)} lapsed dealers hold 80% of the lapsed primary of ${money(Tw)}`, sub: `Running share of ${L0()} primary from dealers with no primary in ${L1()}, largest first.`}));
}

const allRows = R => { const q = state.q.trim().toUpperCase(); return R.filter(d => (!q || d.search.includes(q)) && (!state.st || d.quad === state.st)).slice().sort((a, b) => b.v1 - a.v1 || b.v0 - a.v0); };
function renderAll(R) {
  const rows = allRows(R);
  return secHead('All dealers', 'Search every dealer in the current filter, then download the result.') + `<div class="grid">${panel({kind: 'Dealer search', title: `${num(rows.length)} dealers with ${money(rows.reduce((s, d) => s + d.p1, 0))} of primary and ${money(rows.reduce((s, d) => s + d.s1, 0))} of secondary`, body: `<div class="row"><label>Search name, city, ASM, sales group or code<input type="search" id="q" value="${esc(state.q)}" placeholder="For example PATNA"></label><label>Segment<select id="st">${['', ...QUADS].map(s => `<option value="${esc(s)}" ${state.st === s ? 'selected' : ''}>${s || 'All'}</option>`).join('')}</select></label></div>` + table({cols: [C.text('S4 code', 'key'), C.text('Dealer', 'name'), C.text('City', 'city'), C.text('ASM', 'asm'), C.text('RSM', 'rsm'), C.text('Sales group', 'sg'), C.q(`Primary ${L0()}`, 'p0'), C.q(`Primary ${L1()}`, 'p1'), C.pct('Primary growth', 'gp'), C.q(`Secondary ${L0()}`, 's0'), C.q(`Secondary ${L1()}`, 's1'), C.pct('Secondary growth', 'gs'), C.rat('Primary ÷ secondary', 'ratio1'), C.q('Stock build', 'build1'), C.text('Segment', 'quad'), reviewCol], rows, pageSize: 50, csv: CSV('dealers')})})}</div>`;
}

function renderNotes() {
  const A = BASE, I = PAYLOAD.info, tot = k => A.reduce((s, d) => s + d[k], 0);
  const lab = {py0: "Primary YTD Oct'25", py1: "Primary YTD Oct'26", sy0: "Secondary YTD Oct'25", sy1: "Secondary YTD Oct'26", pm0: "Primary Oct'25", pm1: "Primary Oct'26", sm0: "Secondary Oct'25", sm1: "Secondary Oct'26"};
  const rec = Object.keys(lab).map(k => ({label: lab[k], source: I.src_tot[k], model: tot(k)}));
  const sgm = new Map(); A.forEach(d => { const o = sgm.get(d.sg) || {py0: 0, py1: 0, sy0: 0, sy1: 0}; ['py0', 'py1', 'sy0', 'sy1'].forEach(k => o[k] += d[k]); sgm.set(d.sg, o); });
  const sc = PAYLOAD.summary.map(s => { const m = s.sg === 'Grand Total' ? {py0: tot('py0'), py1: tot('py1'), sy0: tot('sy0'), sy1: tot('sy1')} : sgm.get(s.sg) || {py0: 0, py1: 0, sy0: 0, sy1: 0}; return {label: s.sg, d: Math.max(...['py0', 'py1', 'sy0', 'sy1'].map(k => Math.abs(m[k] - s[k]))), py1: m.py1, sy1: m.sy1}; });
  const bad = sc.filter(s => s.d > .5).length;
  const issues = [
    ['Six S4 HANA codes appear on more than one row (13 rows), sometimes with different name spellings, for example SU VEDAM TEXTILES and SUVEDAM TEXTILES.', `Combined into one dealer per code. ${num(I.source_rows)} rows become ${num(I.dealers)} dealers.`],
    [`${num(I.delisted)} rows have the code "Delisted" and one row has the code "-".`, 'Kept as separate dealers with their own keys. Left out of the action lists.'],
    [`${num(I.negatives.length)} rows have negative primary in at least one column, where returns were larger than sales.`, 'Kept as net figures. Growth is only shown where last year is above zero, and these dealers carry a Net returns flag.'],
    [`ASM names vary in case or spacing: ${num(I.asm_spellings)} spellings for ${num(I.asm_names)} people.`, 'Standardised to the same names as the booking dashboards.'],
    [`City spellings vary for the same place on ${num(I.city_changes)} rows, for example NEW DELHI and DELHI.`, 'Combined with the booking dashboards\' crosswalk.'],
    ['Row 1041 holds the column totals, several of them multiplied by 1,000, and row 1043 holds two loose figures.', 'Ignored. The dashboard totals match the column totals exactly.'],
    ['The Summary sheet is headed YTD Sep, but its figures equal the dealer rows\' YTD Oct totals.', 'Treated as YTD Oct. Every sales group matches; see the check on this page.'],
    ['Sales group 03 : Himachal Pradesh appears only in this file, in mixed case.', 'Kept exactly as in the file.'],
    ['One dealer (F.S.ENTERPRISE, Madurai) has zero in every column.', 'Kept for completeness. It does not count as active anywhere.'],
    ['Some cells hold floating-point leftovers from Excel arithmetic, for example SWARUP APPARELS\' Oct\'26 primary of 0.0000000000000069.', 'Values are rounded to 4 decimals, so these read as zero.'],
    ['The workbook does not name the unit.', 'Shown in mtrs, the unit the business confirmed for the booking data.'],
  ];
  const defs = [['Primary', 'Sales from the company to the dealer (sell-in).'], ['Secondary', 'Sales from the dealer onwards (sell-out).'], ['YTD', 'Year to date up to October, as in the workbook. Oct is the single month.'], ['Primary ÷ secondary', 'Primary divided by secondary. Above 1× the dealer took in more than it sold, so stock built up. Below 1× stock drew down.'], ['Stock build', 'Primary minus secondary in mtrs. A proxy for change in dealer stock; the file has no stock figures.'], ['Growth gap', 'Primary growth minus secondary growth, in percentage points.'], ['Segments', 'Healthy growth: both grew. Stock push: primary grew, secondary fell. Under-supplied: primary fell, secondary grew. Both falling: both fell. Not comparable: no base last year.'], ['Continuing, New, Lost', 'For the chosen measure and period: Continuing has volume in both years, New only this year, Lost only last year.'], ['LFL growth', 'Growth of dealers with volume in both years.'], ['Dealer retention', 'Continuing dealers divided by dealers active last year.'], ['Momentum', 'October growth minus year-to-date growth. More than 10 points either way counts as accelerating or slowing.'], ['Robust z-score', '(log growth − median) ÷ (1.4826 × median absolute deviation), for continuing dealers above the minimum volume.'], ['HHI', 'Sum of squared dealer shares × 10,000.'], ['Health index', 'Average percentile rank on primary growth, secondary growth, balance and volume per dealer.']];
  return secHead('Data notes', 'How the workbook was checked and cleaned, what is still open, and how each measure is defined.') + `<div class="grid">
    ${panel({kind: 'Reconciliation', span: 6, title: 'Dashboard totals match the dealer rows exactly', sub: 'Source: Summary_ Primary Vs Secondary Sales_YTD Oct\'26.xlsx, sheet Summary YTD Oct\'26. Unfiltered data.', body: table({cols: [C.text('Measure', 'label', {nosort: 1}), {h: 'Source', n: 1, v: r => r.source, f: x => num(x, 2), nosort: 1}, {h: 'Dashboard', n: 1, v: r => r.model, f: x => num(x, 2), nosort: 1}, {h: 'Difference', n: 1, v: r => Math.round((r.model - r.source) * 100) / 100, f: x => num(x, 2), nosort: 1}], rows: rec})})}
    ${panel({kind: 'Summary sheet check', span: 6, title: bad ? `${plural(bad, 'sales group')} differ from the Summary sheet` : 'Every sales group matches the workbook\'s Summary sheet', sub: 'Largest difference across primary and secondary, YTD both years, in mtrs. The Summary sheet is in thousands; it is scaled up here.', body: table({cols: [C.text('Sales group', 'label', {nosort: 1}), C.q('Primary YTD\'26', 'py1', {nosort: 1}), C.q('Secondary YTD\'26', 'sy1', {nosort: 1}), {h: 'Largest difference', n: 1, v: r => r.d, f: x => num(x, 2), nosort: 1}], rows: sc, pageSize: 12})})}
    ${panel({kind: 'Combined codes', span: 6, title: `${plural(I.combined.length, 'code')} had more than one row and were combined`, sub: 'Row numbers refer to the source sheet.', body: table({cols: [C.text('S4 code', 'code', {nosort: 1}), C.text('Rows', 'rows', {nosort: 1}), C.text('Names', 'names', {nosort: 1, wrap: 1}), C.q("Primary YTD'26", 'py1', {nosort: 1}), C.q("Secondary YTD'26", 'sy1', {nosort: 1})], rows: I.combined})})}
    ${panel({kind: 'Source issues', span: 6, title: 'Other source issues and how they were treated', body: table({cols: [{h: 'Issue', v: r => r[0], wrap: 1, nosort: 1}, {h: 'Treatment', v: r => r[1], wrap: 1, nosort: 1}], rows: issues})})}
    ${panel({kind: 'Definitions', title: 'Definitions', body: `<dl class="dl">${defs.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join('')}</dl>`})}
  </div>`;
}

/* ---------- shell ---------- */
function renderFilters(R, T) {
  const form = document.getElementById('filters');
  const opts = k => [['', 'All'], ...[...new Set(DEALERS.filter(d => pass(d, k)).map(d => d[k]))].sort((a, b) => k === 'quad' ? QUADS.indexOf(a) - QUADS.indexOf(b) : String(a).localeCompare(String(b))).map(v => [v, v])];
  const active = FILTERS.some(([k]) => state.f[k]);
  const seg = (id, label, items, cur) => `<div class="fseg"><span>${label}</span><div class="seg" role="group" aria-label="${label}">${items.map(([k, l]) => `<button type="button" data-${id}="${k}" aria-pressed="${cur === k}">${l}</button>`).join('')}</div></div>`;
  form.innerHTML = seg('m', 'Measure', [['p', 'Primary'], ['s', 'Secondary']], state.m) + seg('per', 'Period', [['ytd', 'YTD Oct'], ['oct', 'October']], state.per)
    + FILTERS.map(([k, l]) => `<label>${l}<select data-f="${k}" class="${state.f[k] ? 'on' : ''}">${opts(k).map(([v, t]) => `<option value="${esc(v)}" ${String(state.f[k]) === String(v) ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select></label>`).join('')
    + (active ? `<button type="button" class="reset" id="reset">Reset filters</button>` : '') + `<div class="scope" role="status"><b>${num(T.n)}</b> dealers, <b>${money(T.p1)}</b> primary, <b>${money(T.s1)}</b> secondary</div>`;
  form.querySelectorAll('select').forEach(s => s.onchange = () => { state.f[s.dataset.f] = s.value; render(); });
  form.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { state.m = b.dataset.m; prep(); render(); });
  form.querySelectorAll('[data-per]').forEach(b => b.onclick = () => { state.per = b.dataset.per; prep(); render(); });
  const rs = form.querySelector('#reset'); if (rs) rs.onclick = () => { state.f = emptyF(); render(); };
}
function renderNav() {
  document.getElementById('nav').innerHTML = SECTIONS.map(([k, l]) => `<button type="button" data-sec="${k}" ${state.section === k ? 'aria-current="page"' : ''}>${esc(l)}</button>`).join('');
  document.querySelectorAll('[data-sec]').forEach(b => b.onclick = () => go(b.dataset.sec));
}
function render() {
  charts.clear(); tables.clear(); uid = 0;
  const R = view(), T = roll(R), K = concentration(R);
  renderNav(); renderFilters(R, T);
  const el = document.getElementById('content'), s = state.section;
  if (!R.length && s !== 'notes') { el.innerHTML = `<div class="empty">No dealers match these filters. Select Reset filters to see all dealers.</div>`; return; }
  el.innerHTML = s === 'summary' ? renderSummary(R, T, K) : s === 'charts' ? renderCharts(R, T, K) : s === 'sell' ? renderSell(R, T) : s === 'momentum' ? renderMomentum(R, T) : s === 'dealers' ? renderDealers(R, T, K) : s === 'team' ? renderTeam(R, T) : s === 'geo' ? renderGeo(R, T) : s === 'actions' ? renderActions(R, T) : s === 'all' ? renderAll(R) : renderNotes();
  el.insertAdjacentHTML('beforeend', `<p class="source">Source: Summary_ Primary Vs Secondary Sales_YTD Oct'26.xlsx, ${num(PAYLOAD.info.source_rows)} rows, ${num(BASE.length)} dealers after combining shared S4 HANA codes. Quantities in mtrs. Showing ${MW()}, ${PER()}. Built 11 November 2026.</p>`);
  mount(); wire();
  window.__metrics = {T, K, section: s};
}
function wire() {
  const on = (id, fn) => { const e = document.getElementById(id); if (e) fn(e); };
  on('topN', e => e.onchange = () => { state.topN = +e.value; render(); });
  on('topBy', e => e.onchange = () => { state.topBy = e.value; render(); });
  on('cityN', e => e.onchange = () => { state.cityN = +e.value; render(); });
  on('cd', e => e.onchange = () => { state.cd = e.value; render(); });
  on('cn', e => e.onchange = () => { state.cn = +e.value; render(); });
  on('st', e => e.onchange = () => { state.st = e.value; render(); });
  on('q', e => e.oninput = () => { state.q = e.value; const pos = e.selectionStart; render(); const n = document.getElementById('q'); n.focus(); n.setSelectionRange(pos, pos); });
  document.querySelectorAll('[data-listtab]').forEach(b => b.onclick = () => { state.list = b.dataset.listtab; render(); });
  document.querySelectorAll('[data-list]').forEach(b => b.onclick = () => { state.list = b.dataset.list; go('actions'); });
  document.querySelectorAll('[data-lv]').forEach(i => { i.onchange = () => { state.lv[i.dataset.lv] = +i.value; render(); }; i.oninput = () => { const o = document.getElementById('lv-' + i.dataset.lv); if (o) o.textContent = i.value + '%'; }; });
  document.querySelectorAll('[data-th]').forEach(i => i.onchange = () => { const v = +i.value; if (!isFinite(v) || v < 0) return; TH()[i.dataset.th] = i.dataset.pct ? v / 100 : v; render(); });
  document.querySelectorAll('[data-twin]').forEach(b => b.onclick = () => { const p = b.dataset.twin, a = document.getElementById(p + 'a'), t = document.getElementById(p + 'b'); const showTable = t.hidden; t.hidden = !showTable; a.hidden = showTable; b.textContent = showTable ? 'Show chart' : 'Show table'; b.setAttribute('aria-expanded', String(showTable)); if (!showTable) mount(); });
}
document.addEventListener('click', e => { const t = e.target.closest('[data-drill]'); if (t) { const [k, v] = t.dataset.drill.split('|'); if (v && k in state.f) { state.f[k] = String(state.f[k]) === String(v) ? '' : v; render(); } } });
document.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches?.('[data-drill]')) { e.preventDefault(); e.target.click(); } });
const closeHelp = keep => document.querySelectorAll('.hw.open').forEach(w => { if (w !== keep) { w.classList.remove('open'); w.querySelector('.help').setAttribute('aria-expanded', 'false'); } });
document.addEventListener('click', e => { const b = e.target.closest?.('.help'); if (b) { e.preventDefault(); const w = b.parentElement, on = !w.classList.contains('open'); closeHelp(w); w.classList.toggle('open', on); b.setAttribute('aria-expanded', String(on)); return; } if (!e.target.closest?.('.hp')) closeHelp(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeHelp(); });
const tip = document.getElementById('tip');
function showTip(t, x, y) { const lines = t.dataset.tip.split('|').filter(Boolean); tip.textContent = ''; lines.forEach((l, i) => { const n = document.createElement(i ? 'div' : 'b'); n.textContent = l; tip.appendChild(n); }); tip.style.display = 'block'; const r = tip.getBoundingClientRect(); tip.style.left = Math.min(x + 14, innerWidth - r.width - 8) + 'px'; tip.style.top = (y + r.height + 20 > innerHeight ? y - r.height - 10 : y + 14) + 'px'; }
document.addEventListener('mousemove', e => { const t = e.target.closest?.('[data-tip]'); if (t) showTip(t, e.clientX, e.clientY); else tip.style.display = 'none'; });
document.addEventListener('focusin', e => { const t = e.target.closest?.('[data-tip]'); if (t) { const r = t.getBoundingClientRect(); showTip(t, r.right, r.top); } });
document.addEventListener('focusout', () => { tip.style.display = 'none'; });
document.addEventListener('touchstart', e => { const t = e.target.closest?.('[data-tip]'), p = e.touches[0]; if (t && p) showTip(t, p.clientX, p.clientY); else tip.style.display = 'none'; }, {passive: true});
let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { document.querySelectorAll('[data-c]').forEach(el => { const w = el.clientWidth; if (w > 0) el.innerHTML = charts.get(el.dataset.c)(w); }); fitSegLabels(); }, 120); });
const themeBtn = document.getElementById('theme');
const isDark = () => { const a = document.documentElement.dataset.theme; return a ? a === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; };
const labelTheme = () => themeBtn.textContent = isDark() ? 'Switch to light theme' : 'Switch to dark theme';
themeBtn.onclick = () => { const next = isDark() ? 'light' : 'dark'; document.documentElement.dataset.theme = next; try { localStorage.setItem('ps-theme', next); } catch (e) {} labelTheme(); render(); };
try { const s = localStorage.getItem('ps-theme'); if (s) document.documentElement.dataset.theme = s; } catch (e) {}
labelTheme();
document.getElementById('print').onclick = () => window.print();
const hashSec = (location.hash || '').slice(1); if (SECTIONS.some(s => s[0] === hashSec)) state.section = hashSec;
addEventListener('hashchange', () => { const h = location.hash.slice(1); if (SECTIONS.some(s => s[0] === h) && h !== state.section) { state.section = h; render(); } });
prep(); render();
document.fonts?.ready.then(() => render());
