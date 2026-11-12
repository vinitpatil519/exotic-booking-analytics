"""Build the suiting booking dashboard data from suiting_data.xlsx (Sheet2, the full sheet with values).

Run: python -I build_data.py <suiting_data.xlsx> <exotic_reference.json> <out.json>
Same rules as the booking dashboards: city spellings combined, state derived from city and sales group,
same-name groups, identical-value cases and possible recodes flagged for review.
"""
import sys, json, re, collections, difflib
import openpyxl
SRC, REF, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
ref = json.load(open(REF)); CITY_STATE = ref['city_state']
sp = lambda s: ' '.join(str(s).split()) if s is not None else ''
CROSSWALK = {'NEW DELHI': 'DELHI', 'BENGALURU': 'BANGALORE', 'BHATINDA': 'BATHINDA', 'CHHATRAPATI SAMBHAJI NAGAR': 'AURANGABAD', 'DHARWAR': 'DHARWAD',
    'DHULIA': 'DHULE', 'GURUGRAM': 'GURGAON', 'KALBURAGI': 'GULBARGA', 'KALABURAGI': 'GULBARGA', 'LAKHIMPUR-KHEERI': 'LAKHIMPUR-KHERI', 'MUGHAL SARAI': 'MUGALSARAI',
    'NAGARKOIL': 'NAGARCOIL', 'RAJHAMANDURY': 'RAJAHMUNDRY', 'SHRI GANGANAGAR': 'SRI GANGANAGAR', 'SRI GANGA NAGAR': 'SRI GANGANAGAR', 'SRIGANGANAGAR': 'SRI GANGANAGAR',
    'SURENDRA NAGAR': 'SURENDRANAGAR', 'BALASORE': 'BALASAORE', 'CHANDANNAGAR': 'CHANDAN NAGAR', 'HAZIPUR': 'HAJIPUR', 'BOKARO STEEL CITY': 'BOKARO',
    'NAVI PETH': 'PUNE', 'BAIRAGARH': 'BHOPAL', 'BARODA': 'VADODARA', 'MANGALURU': 'MANGALORE', 'HUBBALLI': 'HUBLI', 'TUMAKURU': 'TUMKUR', 'TRICHY': 'TIRUCHIRAPALLI',
    'ERNAKULAM': 'KOCHI', 'TANJORE': 'THANJAVUR', 'TANJAVUR': 'THANJAVUR', 'BETIAH': 'BETTIAH', 'AHILYANAGAR': 'AHMEDNAGAR', 'SAMBHAJI NAGAR': 'AURANGABAD',
    'KOZHIKODE': 'CALICUT', 'FAIZABAD': 'AYODHYA', 'SHAHJANPUR': 'SHAHJAHANPUR', 'NAJAFGARH': 'DELHI', 'NEW PANVEL': 'PANVEL', 'AMBALA CITY': 'AMBALA', 'AMBALA CANTT': 'AMBALA', 'LAKHIMPUR': 'LAKHIMPUR-KHERI', 'WALUJ': 'AURANGABAD'}
NEW_STATES = {'AGAMGARH': 'Uttar Pradesh', 'AMBAJOGAI': 'Maharashtra', 'ATHANI': 'Karnataka', 'BADLAPUR': 'Maharashtra', 'BATHINDA': 'Punjab', 'BERHAMPORE': 'West Bengal',
    'BHAYANDAR': 'Maharashtra', 'BITHA': 'Bihar', 'CHADCHAN': 'Karnataka', 'CHAPRA': 'Bihar', 'DEHRI-ON-SONE': 'Bihar', 'ELURU': 'Andhra Pradesh', 'FATEHPUR': 'Uttar Pradesh',
    'FEROZEPUR': 'Punjab', 'FORBESGANJ': 'Bihar', 'GANDHIDHAM': 'Gujarat', 'GANGTOK': 'Sikkim', 'GUDIYATHAM': 'Tamil Nadu', 'HALDIA': 'West Bengal', 'ICHALKARANJI': 'Maharashtra',
    'JAMMU': 'Jammu & Kashmir', 'KAHALGAON': 'Bihar', 'LAHERIA SARAI': 'Bihar', 'LAKHISARAI': 'Bihar', 'LOHA': 'Maharashtra', 'MAHBUBNAGAR': 'Telangana', 'MAJALGAON': 'Maharashtra',
    'MALDA': 'West Bengal', 'MANDSAUR': 'Madhya Pradesh', 'MASAURHI': 'Bihar', 'MIRGANJ': 'Bihar', 'MOKAMA': 'Bihar', 'MUDHOL': 'Karnataka', 'NAHARLAGUN': 'Arunachal Pradesh',
    'PAHARIYA': 'Uttar Pradesh', 'PALAYANKOTTAI': 'Tamil Nadu', 'PURULIA': 'West Bengal', 'RAMGARH': 'Jharkhand', 'SHILLONG': 'Meghalaya', 'SIDDHARTHNAGAR': 'Uttar Pradesh',
    'SODEPUR': 'West Bengal', 'SURENDRANAGAR': 'Gujarat', 'VASHI': 'Maharashtra', 'ZAHEERABAD': 'Telangana', 'ANJAR': 'Gujarat', 'BAHRAICH': 'Uttar Pradesh', 'DEGLOOR': 'Maharashtra', 'MODINAGAR': 'Uttar Pradesh'}
AMBIG = {'AURANGABAD': {13: 'Bihar', 21: 'Maharashtra'}, 'ISLAMPUR': {13: 'Bihar', 34: 'Maharashtra'}, 'SRINAGAR': {7: 'Uttarakhand', 1: 'Jammu & Kashmir'}, 'GANDHINAGAR': {25: 'Gujarat', 34: 'Maharashtra'}}

ws = openpyxl.load_workbook(SRC, data_only=True)['Sheet2']
grid = list(ws.iter_rows(values_only=True))
hi = next(i for i, r in enumerate(grid) if r and r[0] == 'Customer')
H = [sp(c) for c in grid[hi]]; col = lambda n: H.index(n)
raw = []
for i, r in enumerate(grid[hi + 1:], start=hi + 2):
    if r[0] is None: continue
    cust = sp(r[col('Customer')]); code, name = (sp(x) for x in cust.split(' : ', 1))
    sg = sp(r[col('Sales Group')]); sgc = int(sg.split(':')[0]) if sg[:2].isdigit() else None
    raw.append(dict(row=i, key=code, name=name, sg=sg, sgc=sgc, channel=sp(r[col('Channel')]), city_src=sp(r[col('City')]).upper(), asm=sp(r[col('ASM')]), rsm=sp(r[col('RSM')]),
                    zm=sp(r[col('ZM')]) or 'Direct to NH', nh=sp(r[col('NH')]), q25=float(r[col('Quantity SS25')] or 0), v25=float(r[col('Value SS25')] or 0), q26=float(r[col('Quantity SS26')] or 0), v26=float(r[col('Value SS26')] or 0)))
multi = collections.defaultdict(set)
for d in raw:
    c = CROSSWALK.get(d['city_src'], d['city_src'])
    if c in AMBIG and d['sgc'] in AMBIG[c]: multi[c].add(AMBIG[c][d['sgc']])
changes = collections.Counter(); missing = set()
for d in raw:
    c = CROSSWALK.get(d['city_src'], d['city_src'])
    if c != d['city_src']: changes[(d['city_src'], c)] += 1
    st = (AMBIG[c].get(d['sgc']) if c in AMBIG else None) or CITY_STATE.get(c) or NEW_STATES.get(c)
    if not st: missing.add(c)
    d['city'] = f'{c} ({st})' if c in AMBIG and len(multi[c]) > 1 else c
    d['state'] = st or ''
if missing: raise SystemExit(f'No state for: {sorted(missing)}')

# same-name groups (company shops left out), possible recodes, identical values
SUFFIX = re.compile(r'\b(PVT|PRIVATE|LTD|LIMITED|LIMIT|LLP|P)\b')
has_suffix = lambda n: bool(re.search(r'\b(PVT|PRIVATE|LTD|LIMITED|LIMIT|LLP)\b|\(P\)|\(PVT\)', n.upper()))
gkey = lambda n: re.sub(r'[^A-Z0-9]', '', SUFFIX.sub(' ', re.sub(r'[^A-Z0-9 ]', ' ', n.upper())))
for d in raw: d['group'] = ''; d['review'] = ''
gs = collections.defaultdict(list)
for d in raw:
    if not d['channel'].upper().endswith('COMPANYSHOPS'): gs[gkey(d['name'])].append(d)
for k, ds in gs.items():
    if len(ds) < 2: continue
    if len(ds) >= 4 or max(collections.Counter(d['city'] for d in ds).values()) >= 2 or any(has_suffix(d['name']) for d in ds):
        names = collections.Counter(d['name'] for d in ds); label = max(names, key=lambda n: (names[n], len(n)))
        for d in ds: d['group'] = label
mirror = []; mc = collections.defaultdict(list)
for d in raw: mc[(gkey(d['name']), d['city'])].append(d)
for (k, city), ds in mc.items():
    L = [d for d in ds if d['v25'] > 0 and d['v26'] <= 0]; N = [d for d in ds if d['v25'] <= 0 and d['v26'] > 0]
    if L and N:
        mirror.append(dict(name=min(L + N, key=lambda d: d['row'])['name'], city=city, lost_codes=' / '.join(d['key'] for d in L), new_codes=' / '.join(d['key'] for d in N), lost_value=round(sum(d['v25'] for d in L), 2), new_value=round(sum(d['v26'] for d in N), 2)))
        for d in L + N: d['review'] = 'Possible recode'
mirror.sort(key=lambda m: -m['lost_value'])
similar = lambda a, b: difflib.SequenceMatcher(None, gkey(a), gkey(b)).ratio() >= .8
same = []
for season, f in (('SS26', 'v26'), ('SS25', 'v25')):
    vals = collections.defaultdict(list)
    for d in raw:
        if d[f] > 0: vals[round(d[f], 2)].append(d)
    for v, hits in vals.items():
        if len(hits) < 2 or not any(similar(a['name'], b['name']) for i, a in enumerate(hits) for b in hits[i + 1:]): continue
        same.append(dict(season=season, value=v, rows=len(hits), excess=round(v * (len(hits) - 1), 2), dealers='; '.join(f"{d['name']} ({d['city'].split(' (')[0]}, {d['key']})" for d in hits)))
        for d in hits:
            if d['review'] != 'Possible recode': d['review'] = 'Identical value'
same.sort(key=lambda s: (s['season'] != 'SS26', -s['excess']))
raw.sort(key=lambda d: -d['v26'])
fields = ['key', 'buyers', 'name', 'city', 'state', 'asm', 'rsm', 'zm', 'nh', 'channel', 'sg', 'group', 'review', 'q25', 'v25', 'q26', 'v26']
for d in raw: d['buyers'] = ''
src_tot = [round(sum(d[k] for d in raw), 4) for k in ('q25', 'v25', 'q26', 'v26')]
info = dict(source_rows=len(raw), city_changes=sum(changes.values()), city_pairs=sorted(changes.items()), new_cities=sorted({d['city'] for d in raw if d['city'] in NEW_STATES}),
            zm_blank=sum(1 for d in raw if d['zm'] == 'Direct to NH'), groups=len({d['group'] for d in raw if d['group']}), src_tot=src_tot)
recon = [dict(label=l, source=round(s, 2)) for l, s in zip(['SS25 Qty', 'SS25 Value', 'SS26 Qty', 'SS26 Value'], src_tot)]
json.dump(dict(fields=fields, rows=[[round(d[f], 4) if isinstance(d[f], float) else d[f] for f in fields] for d in raw], dq=dict(recon=recon, pairs=[], mirror=mirror, same=same, issues=[]), info=info), open(OUT, 'w'), ensure_ascii=False)
print(json.dumps({k: v for k, v in info.items() if k != 'city_pairs'}, ensure_ascii=False)[:1500]); print('mirror', mirror); print('same', same)
