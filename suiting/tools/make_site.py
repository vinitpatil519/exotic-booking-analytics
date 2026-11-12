"""Build suiting/index.html from the booking dashboard engine (../index.html) and the suiting data.
Run: python3 make_site.py <booking index.html> <suiting data.json> <out index.html>"""
import sys, json, re
SRC, DATA, OUT = sys.argv[1:4]
s = open(SRC, encoding='utf-8').read()
P = json.load(open(DATA)); info = P.pop('info')
I = info
P['dq']['issues'] = [
    ['The workbook has two sheets. Sheet1 lists qty only for the same 892 customers, with a Grand Total row; Sheet2 has qty, value, city and the sales team.', 'Sheet2 is used. Its qty matches Sheet1 for every customer, and the totals agree.'],
    [f"ZM is blank on {I['zm_blank']} rows: every customer of RSMs K P RAJA, PRASHANT SINHA, RAVINDER MAJITHIA-R and VINOD RANGAPPA.", 'Shown as "Direct to NH", because these RSMs report straight to the national head.'],
    ['Customer is one field holding code and name, for example 10002 : PURI CLOTH HOUSE.', 'Split into customer code and name. Every code appears once, so no rows are combined.'],
    ['Names carry stray spaces, for example "KRISHANKANT VERMA " and "NNITIN K VYAS ".', 'Trimmed. Spellings are otherwise kept as in the file, including NNITIN K VYAS.'],
    [f"City spellings vary for the same place on {I['city_changes']} rows, for example NEW DELHI and DELHI, BENGALURU and BANGALORE, and three spellings of Sri Ganganagar.", 'Combined with the booking dashboards\' crosswalk plus suiting additions. Localities such as NAVI PETH (Pune) and BAIRAGARH (Bhopal) join their city.'],
    [f"{len(I['new_cities'])} cities do not appear in the booking files, for example {', '.join(I['new_cities'][:3])}.", 'State assigned by the analyst and checked against each customer\'s sales group and ASM.'],
    ['State is not in the file.', 'Derived from city and sales group. Treat as indicative.'],
    ['Blank qty and value cells mean no booking in that season.', 'Read as zero. Qty and value are blank together on every row, so no booking has value without qty.'],
    ['Some names carry *** markers, for example THE RAYMOND SHOP***.', 'Kept as in the file.'],
    ['The file names no currency or qty unit.', 'Value is shown as ₹ by assumption and qty in mtrs, as for the booking dashboards. Channel and sales group codes are as supplied.'],
]
data = json.dumps(P, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
def rep(a, b, n=1):
    global s
    c = s.count(a)
    if c != n: raise SystemExit(f'expected {n} of {a[:80]!r}, found {c}')
    s = s.replace(a, b)
# data: one dataset
s = re.sub(r'<script id="data-enliven" type="application/json">.*?</script>\n', '', s, count=1, flags=re.S)
s = re.sub(r'(<script id="data-exotic" type="application/json">).*?(</script>)', lambda m: '<script id="data-suiting" type="application/json">' + data + '</script>', s, count=1, flags=re.S)
rep('<title>Booking Dashboard</title>', '<title>Suiting Bookings</title>')
s = re.sub(r'<label class="brand-pick">.*?</label>', '<b>Suiting bookings</b>', s, count=1, flags=re.S)
s = re.sub(r"const BRANDS = \{.*?\n\};", """const COCO_CH = '04 : Companyshops';
const BRANDS = {
  suiting: {label: 'Suiting', file: 'suiting_data.xlsx', rows: %d, recon: 'Sheet2, sum of the customer rows (the sheet has no total row)', idLabel: 'Customer code', idKey: 'key', pairId: 'Source row', search: 'customer code',
    dealerDef: 'One customer code. Every code appears once in the file, so %d rows are %d customers.'},
};""" % (I['source_rows'], I['source_rows'], I['source_rows']), s, count=1, flags=re.S)
rep("let BRAND = 'exotic',", "let BRAND = 'suiting',")
rep("BRAND = BRANDS[b] ? b : 'exotic';", "BRAND = 'suiting';")
s = re.sub(r"loadBrand\(brandFromUrl\(\).*?\n", "loadBrand('suiting');\n", s, count=1)
s = re.sub(r"const brandSel = document.getElementById\('brand'\);.*?\nsyncBrandUi\(\);\n", "document.title = 'Suiting bookings: SS26 against SS25';\n", s, count=1, flags=re.S)
# channels: company shops play the COCO role
rep("const CH_ORDER = ['TRS','COCO','MBO','Mini TRS','WHS'];", "const CH_ORDER = ['05 : Franchise Shops','02 : Retailer','MT : Mini TRS','04 : Companyshops','01 : Wholesaler'];")
rep("d.isTrade = d.channel !== 'COCO';", "d.isTrade = d.channel !== COCO_CH;")
rep("{label: 'Company stores (COCO)',", "{label: 'Company shops',")
rep("['coco', 'COCO only']", "['coco', 'Company shops only']")
rep("filter(r => r !== 'COCO');", "filter(r => r !== 'COCO');")  # harmless: no RSM is called COCO in suiting
rep("chs.filter(c => c !== 'COCO')", "chs.filter(c => c !== COCO_CH)")
rep("COCO stores and delisted codes are left out.", "Company shops are left out.")
rep("COCO is left out because it has no ASM.", "Company shops are kept in.")
rep("sub: 'COCO appears as its own line because the source reports company stores outside the field hierarchy.'", "sub: 'RSM level. Select a row to filter the whole site.'")
# ZM level
rep("const FILTERS = [['scope','Dealer scope'],['nh','National head'],", "const FILTERS = [['scope','Dealer scope'],['nh','National head'],['zm','ZM'],")
rep("const DIMS = [['channel','Channel'],['rsm','RSM'],['asm','ASM'],['state','State'],['nh','National head'],", "const DIMS = [['channel','Channel'],['zm','ZM'],['rsm','RSM'],['asm','ASM'],['state','State'],['nh','National head'],")
rep("{scope: 'all', nh: '', rsm: '',", "{scope: 'all', nh: '', zm: '', rsm: '',", 2)
rep("const nh = rollup(R, 'nh', T), rs = rollup(R, 'rsm', T),", "const nh = rollup(R, 'nh', T), zm = rollup(R, 'zm', T), rs = rollup(R, 'rsm', T),")
rep("drill: 'nh', total: {...T, label: 'Total', share: 1, cpp: T.g * 100}})}) : ''}", "drill: 'nh', total: {...T, label: 'Total', share: 1, cpp: T.g * 100}})}) : ''}\n    ${zm.length > 1 ? panel({kind: 'ZM scorecard', title: `${esc(zm[0].label)} has the largest zone at ${money(zm[0].v26)}, ${sPct(zm[0].g)} against SS25`, sub: 'Zone manager level. Direct to NH groups the RSMs who report straight to the national head.', body: table({cols: scoreCols('ZM'), rows: zm, drill: 'zm', total: {...T, label: 'Total', share: 1, cpp: T.g * 100}})}) : ''}")
rep('"National head scorecard": "', '"ZM scorecard": "One row per zone manager with size, growth, retention and price. Select a row to filter the whole site.", "National head scorecard": "')
# scale for suiting prices and volumes
rep("const E = [0, 600, 700, 800, 900, 1000, 1250, Infinity], L = ['<600', '600–699', '700–799', '800–899', '900–999', '1,000–1,249', '1,250+'];",
    "const E = [0, 2000, 2500, 3000, 3500, 4000, 5000, Infinity], L = ['<2,000', '2,000–2,499', '2,500–2,999', '3,000–3,499', '3,500–3,999', '4,000–4,999', '5,000+'];")
rep("Qty at ASP of ₹900 or more", "Qty at ASP of ₹3,500 or more")
rep("c.v26 >= 2500 && c.topShare >= .5", "c.v26 >= 1000 && c.topShare >= .5")
rep("above 2,500 mtrs depend on one dealer", "above 1,000 mtrs depend on one dealer"); rep("No city above 2,500 mtrs depends", "No city above 1,000 mtrs depends")
rep("hi: ['Highest ASP (SS26 qty ≥ 100)', d => d.q26 >= 100 ? d.a26 : null], lo: ['Lowest ASP (SS26 qty ≥ 100)', d => d.q26 >= 100 ? -d.a26 : null]",
    "hi: ['Highest ASP (SS26 qty ≥ 50)', d => d.q26 >= 50 ? d.a26 : null], lo: ['Lowest ASP (SS26 qty ≥ 50)', d => d.q26 >= 50 ? -d.a26 : null]")
rep("qth: {riskBase: 500, riseBase: 100, priceBase: 100}", "qth: {riskBase: 150, riseBase: 30, priceBase: 30}")
rep("${B().idLabel === 'Buyer no.' ? 'buyer no.' : 'S4HANA code'}", "${B().search}")
rep("splitCodes = pairCodes.filter(", "splitCodes = pairCodes.filter(")
# no combined codes in suiting: drop that Data notes panel when empty
rep("${panel({kind: 'Combined codes', span: 5,", "${!P.pairs.length ? '' : panel({kind: 'Combined codes', span: 5,")
rep("try { localStorage.setItem('exotic-theme', next); }", "try { localStorage.setItem('suiting-theme', next); }")
rep("const s = localStorage.getItem('exotic-theme');", "const s = localStorage.getItem('suiting-theme');")
s = s.replace('company stores', 'company shops').replace('Company stores', 'Company shops')
left = [m.group(0) for m in re.finditer(r'.{0,40}(Exotic|exotic|Enliven|1,253|1,249|brand).{0,30}', re.sub(r'<script id="data-suiting".*?</script>', '', s, flags=re.S))]
open(OUT, 'w', encoding='utf-8').write(s)
print('written', len(s), 'leftovers:', left[:12])
