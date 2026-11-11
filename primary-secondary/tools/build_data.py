"""Build the primary vs secondary dashboard data from the sales workbook.

Run: python -I build_data.py <workbook.xlsx> <exotic_reference.json> <out.json>
Rules (same spirit as the booking dashboards):
- Rows sharing one S4 HANA code are combined into one dealer. "Delisted" and "-" codes stay separate.
- ASM spellings standardised to the canonical names; city spellings combined with the booking crosswalk.
- Sales group kept exactly as in the file, for example 34 : SOUTH MAHARASHTRA.
- Negative primary (returns larger than sales) is kept as a net figure.
"""
import sys, json, collections, re
import openpyxl

SRC, REF, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
ref = json.load(open(REF))
ASM_CANON = ref['asm']
CROSSWALK = {'AHILYANAGAR': 'AHMEDNAGAR', 'AMBALA CANTT': 'AMBALA', 'AMBALA CITY': 'AMBALA', 'AUARANGABAD': 'AURANGABAD', 'AURANGABAD (GAYA)': 'AURANGABAD',
    'AVDHAN(DHULE)': 'DHULE', 'BARODA': 'VADODARA', 'BASMATNAGAR': 'BASMATH', 'BETIAH': 'BETTIAH', 'ERNAKULAM': 'KOCHI', 'GOVERNORPET VIJ': 'VIJAYAWADA',
    'HUBBALLI': 'HUBLI', 'KALABURAGI': 'GULBARGA', 'LAKHIMPUR': 'LAKHIMPUR-KHERI', 'MANGALURU': 'MANGALORE', 'NEW DELHI': 'DELHI', 'NEW PANVEL': 'PANVEL',
    'PATTOM': 'THIRUVANANTHAPURAM', 'SAMBHAJI NAGAR': 'AURANGABAD', 'TANJAVUR': 'THANJAVUR', 'TANJORE': 'THANJAVUR', 'TRICHY': 'TIRUCHIRAPALLI',
    'TUMAKURU': 'TUMKUR', 'VELACHERY': 'CHENNAI', 'WALUJ': 'AURANGABAD', 'SHAHJANPUR': 'SHAHJAHANPUR', 'NAJAFGARH': 'DELHI', 'KOZHIKODE': 'CALICUT', 'FAIZABAD': 'AYODHYA'}
sp = lambda s: ' '.join(str(s).split())
NUM = ['pm0', 'pm1', 'sm0', 'sm1', 'py0', 'py1', 'sy0', 'sy1']  # primary/secondary, month/YTD, last year (0) / this year (1)

wb = openpyxl.load_workbook(SRC, data_only=True)
ws = wb.worksheets[0]
grid = list(ws.iter_rows(values_only=True))
hi = next(i for i, r in enumerate(grid) if r and r[0] and 'S4' in str(r[0]).upper())
raw, stray = [], []
for i, r in enumerate(grid[hi + 1:], start=hi + 2):
    if r[0] is None and r[1] is None:
        for j, c in enumerate(r):
            if c is not None: stray.append((f'{openpyxl.utils.get_column_letter(j + 1)}{i}', c))
        continue
    d = dict(row=i, code=sp(r[0]), name=sp(r[1]), city_src=sp(r[2]).upper(), asm_src=sp(r[3]), rsm=sp(r[4]), nh=sp(r[5]), sg_src=sp(r[6]))
    for k, j in zip(NUM, range(7, 15)): d[k] = float(r[j] or 0)
    raw.append(d)
src_tot = {k: round(sum(d[k] for d in raw), 4) for k in NUM}

asm_names = collections.Counter(d['asm_src'] for d in raw)
def canon(a):
    k = sp(a).upper()
    if k in ASM_CANON: return ASM_CANON[k]
    vs = [v for v in asm_names if sp(v).upper() == k]; mixed = [v for v in vs if v != v.upper()]
    return sp(max(mixed, key=lambda v: asm_names[v]) if mixed else a.title())
city_changes = collections.Counter()
for d in raw:
    d['asm'] = canon(d['asm_src'])
    c = CROSSWALK.get(d['city_src'], d['city_src'])
    if c != d['city_src']: city_changes[(d['city_src'], c)] += 1
    d['city'] = c
    d['sg'] = d['sg_src']  # kept exactly as in the file, e.g. 34 : SOUTH MAHARASHTRA

groups = collections.OrderedDict()
for d in raw:
    k = d['code']
    if k.upper() == 'DELISTED': k = f"DELISTED-{d['row']}"
    elif not re.fullmatch(r'\d+', k): k = f"NOCODE-{d['row']}"
    groups.setdefault(k, []).append(d)
dealers, combined = [], []
for k, rs in groups.items():
    lead = max(rs, key=lambda d: (d['py1'] + d['sy1'], d['py0'] + d['sy0']))
    for f in ('city', 'asm', 'rsm', 'nh', 'sg'):
        if len({d[f] for d in rs}) > 1: raise SystemExit(f'Combined code {k} disagrees on {f}: {[d[f] for d in rs]}')
    if len(rs) > 1: combined.append(dict(code=k, rows=' / '.join(str(d['row']) for d in rs), names=' / '.join(dict.fromkeys(d['name'] for d in rs)), py1=round(sum(d['py1'] for d in rs), 2), sy1=round(sum(d['sy1'] for d in rs), 2)))
    o = dict(key=k, name=lead['name'], city=lead['city'], asm=lead['asm'], rsm=lead['rsm'], nh=lead['nh'], sg=lead['sg'])
    for f in NUM: o[f] = round(sum(d[f] for d in rs), 4)
    flags = []
    if k.startswith('DELISTED'): flags.append('Delisted')
    if k.startswith('NOCODE'): flags.append('No code')
    if any(o[f] < 0 for f in NUM): flags.append('Net returns')
    if len(rs) > 1: flags.append('Combined rows')
    o['review'] = ', '.join(flags)
    dealers.append(o)
dealers.sort(key=lambda d: -(d['py1'] + d['sy1']))

# Sales-group summary sheet, for reconciliation
summ = []
if len(wb.worksheets) > 1:
    for r in wb.worksheets[1].iter_rows(values_only=True):
        if r and len(r) > 8 and isinstance(r[3], (int, float)) and r[2]:
            nm = str(r[2]); summ.append(dict(sg=sp(nm), py0=r[3] * 1000, py1=r[4] * 1000, sy0=r[6] * 1000, sy1=r[7] * 1000))

fields = ['key', 'name', 'city', 'asm', 'rsm', 'nh', 'sg', 'review'] + NUM
info = dict(source_rows=len(raw), dealers=len(dealers), combined=combined, stray=stray, asm_spellings=len(asm_names), asm_names=len({d['asm'] for d in raw}),
            city_changes=sum(city_changes.values()), city_pairs=sorted(city_changes.items()), src_tot=src_tot,
            negatives=[(d['row'], d['name'], d['city']) for d in raw if any(d[f] < 0 for f in NUM)],
            zero=[(d['row'], d['name']) for d in raw if all(d[f] == 0 for f in NUM)], delisted=sum(1 for d in raw if d['code'].upper() == 'DELISTED'),
            nocode=[(d['row'], d['name']) for d in raw if not re.fullmatch(r'\d+', d['code']) and d['code'].upper() != 'DELISTED'])
json.dump(dict(fields=fields, rows=[[d[f] for f in fields] for d in dealers], summary=summ, info=info), open(OUT, 'w'), ensure_ascii=False)
print(json.dumps({k: v for k, v in info.items() if k not in ('city_pairs',)}, ensure_ascii=False, default=str)[:2500])
