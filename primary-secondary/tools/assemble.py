"""Assemble primary-secondary/index.html from the booking dashboard's styles and chart library plus this site's code."""
import sys, re, json
OLD, DATA, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
o = open(OLD, encoding='utf-8').read()
def between(a, b, start=0):
    i = o.index(a, start); j = o.index(b, i); return o[i:j]
css = between('<style>', '</style>') + '</style>'
css = css.replace('.ctl .seg button{height:28px}', '''.ctl .seg button{height:28px}
.fseg{display:flex;flex-direction:column;gap:2px;font-size:12px;color:var(--ink2)}.fseg .seg button{height:30px}''')
css = css.replace('--c1:#3451b2;--c2:#eb6834;--c3:#1baf7a;--c4:#eda100;--c5:#e87ba4;', '--c1:#3451b2;--c2:#eb6834;--c3:#1baf7a;--c4:#eda100;--c5:#e87ba4;--c3-rgb:27,175,122;--c4-rgb:237,161,0;')
css = css.replace('--c1:#7087e0;--c2:#d95926;--c3:#199e70;--c4:#c98500;--c5:#d55181;', '--c1:#7087e0;--c2:#d95926;--c3:#199e70;--c4:#c98500;--c5:#d55181;--c3-rgb:25,158,112;--c4-rgb:201,133,0;')
assert css.count('--c4-rgb') == 3, css.count('--c4-rgb')
plumb = between('const charts = new Map()', '/* ---------- common column sets')
plumb = re.sub(r'const HELP = \{.*?\};\n', '', plumb, flags=re.S)
svg = between('/* ---------- SVG charts ---------- */', '/* ---------- analysis charts')
svg = re.sub(r"const seasonLegend = `[^`]*`;\n", '', svg)
lib2 = between('function squarify', 'const CX = {')
lib3 = between('function decompBars', '/* ---------- deeper analysis: panels')
lib = svg + lib2 + lib3
# season labels in the shared chart library follow this site's period
lib = lib.replace('`SS25: ${', '`${L0()}: ${').replace('`SS26: ${', '`${L1()}: ${')
lib = lib.replace("SS25 rank", "${L0()} rank").replace("SS26 rank", "${L1()} rank")
lib = lib.replace('`SS26: ${at(b, x).toFixed(1)}% of qty`, `SS25: ${at(a, x).toFixed(1)}% of qty`', '`${L1()}: ${at(b, x).toFixed(1)}% of total`, `${L0()}: ${at(a, x).toFixed(1)}% of total`')
lib = lib.replace("`Growth: ${g == null ? 'new in SS26' : sPct(g)}`", "`Growth: ${g == null ? 'new this year' : sPct(g)}`")
lib = lib.replace('Box size is SS26.', 'Box size is this year.')
assert lib.count('bw = p.label.length * 6.2 + 8') == 1
lib = lib.replace('bw = p.label.length * 6.2 + 8', 'bw = textPx(p.label, 11.5) + 8')
lib = lib.replace('Size band flow from SS25 to SS26', 'Size band flow from last year to this year').replace('of the SS25 group', 'of the ${L0()} group')
left = sorted(set(re.findall(r'.{0,40}SS2[56].{0,30}', lib)))
app = open('tools/app.js', encoding='utf-8').read(); sec = open('tools/sections.js', encoding='utf-8').read(); pages = open('tools/pages.js', encoding='utf-8').read()
data = json.dumps(json.load(open(DATA)), ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
shell = '''<body>
<div class="app">
  <aside class="rail">
    <div class="brand"><b>Primary vs secondary</b><span>Sales, YTD Oct'26 against YTD Oct'25</span></div>
    <nav class="nav" id="nav" aria-label="Report sections"></nav>
    <div class="rail-foot">
      <button id="theme" type="button">Switch to dark theme</button>
      <button id="print" type="button">Print this section</button>
    </div>
  </aside>
  <div class="main">
    <form class="filters" id="filters" onsubmit="return false" aria-label="Filters"></form>
    <main class="content" id="content" tabindex="-1"></main>
  </div>
</div>
<div id="tip" role="status"></div>
'''
html = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>Primary vs Secondary Sales</title>\n'
        + css + '\n</head>\n' + shell + '<script id="data" type="application/json">' + data + '</script>\n<script>\n' + app + '\n' + plumb + '\n' + lib + '\n' + sec + '\n' + pages + '\n</script>\n</body>\n</html>\n')
open(OUT, 'w', encoding='utf-8').write(html)
print('written', len(html), 'bytes; leftover season labels:', left)
