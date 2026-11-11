"""Build a dashboard payload from a booking-data workbook.

Same cleaning rules for every brand:
- ASM spellings standardised (case and spacing), ASM2/RSM2 checked against ASM/RSM.
- City spellings combined with one crosswalk; state derived from city and sales group.
- Rows sharing one S4HANA code combined into one dealer; "Delisted" codes kept apart.
- Same-name groups, identical-value cases and possible recodes flagged for review.
Run: python -I build.py <brand> <workbook> <out.json>
"""
import sys, json, re, collections, difflib
import openpyxl

BRAND, SRC, OUT = sys.argv[1], sys.argv[2], sys.argv[3]

# ---- shared reference data -------------------------------------------------
CROSSWALK = {  # source city -> clean city (Exotic workbook crosswalk, extended for Enliven)
    'AHILYANAGAR': 'AHMEDNAGAR', 'AMBALA CANTT': 'AMBALA', 'AMBALA CITY': 'AMBALA', 'AUARANGABAD': 'AURANGABAD', 'AURANGABAD (GAYA)': 'AURANGABAD',
    'AVDHAN(DHULE)': 'DHULE', 'BARODA': 'VADODARA', 'BASMATNAGAR': 'BASMATH', 'BETIAH': 'BETTIAH', 'ERNAKULAM': 'KOCHI', 'GOVERNORPET VIJ': 'VIJAYAWADA',
    'HUBBALLI': 'HUBLI', 'KALABURAGI': 'GULBARGA', 'LAKHIMPUR': 'LAKHIMPUR-KHERI', 'MANGALURU': 'MANGALORE', 'NEW DELHI': 'DELHI', 'NEW PANVEL': 'PANVEL',
    'PATTOM': 'THIRUVANANTHAPURAM', 'SAMBHAJI NAGAR': 'AURANGABAD', 'TANJAVUR': 'THANJAVUR', 'TANJORE': 'THANJAVUR', 'TRICHY': 'TIRUCHIRAPALLI',
    'TUMAKURU': 'TUMKUR', 'VELACHERY': 'CHENNAI', 'WALUJ': 'AURANGABAD',
    # Enliven additions: same place, different spelling or a locality of a listed city
    'SHAHJANPUR': 'SHAHJAHANPUR', 'NAJAFGARH': 'DELHI', 'KOZHIKODE': 'CALICUT', 'FAIZABAD': 'AYODHYA',
}
# city names used in two states: resolved by sales group
AMBIG = {'AURANGABAD': {13: 'Bihar', 21: 'Maharashtra'}, 'ISLAMPUR': {13: 'Bihar', 34: 'Maharashtra'}, 'SRINAGAR': {7: 'Uttarakhand', 1: 'Jammu & Kashmir'},
         'GANDHINAGAR': {25: 'Gujarat', 34: 'Maharashtra'}}
NEW_STATES = {  # Enliven cities not in the Exotic file, checked against each row's sales group and team
    'SHAMLI': 'Uttar Pradesh', 'BAHRAICH': 'Uttar Pradesh', 'COOCH BEHAR': 'West Bengal', 'BARUIPUR': 'West Bengal', 'BILIMORA': 'Gujarat', 'PALI': 'Rajasthan',
    'MALHARPETH': 'Maharashtra', 'ARAMBAGH': 'West Bengal', 'SHEDBAL': 'Karnataka', 'ALIPUR DUAR': 'West Bengal', 'ROBERTSGANJ': 'Uttar Pradesh', 'THIRUVALLA': 'Kerala',
    'GAJRAULA': 'Uttar Pradesh', 'PERUMBAVOOR': 'Kerala', 'DHENKANAL': 'Odisha', 'MIRYALAGUDA': 'Telangana', 'GADWAL': 'Telangana', 'WANAPARTHY': 'Telangana',
    'RAMANATHAPURAM': 'Tamil Nadu', 'PARLAKHEMUNDI': 'Odisha', 'BATHINDA': 'Punjab', 'ULUBERIA': 'West Bengal', 'NIRMAL': 'Telangana', 'TASGAON': 'Maharashtra',
    'BHADOHI': 'Uttar Pradesh', 'KUNDA': 'Uttar Pradesh', 'AMETHI': 'Uttar Pradesh', 'SHANKARPALLY': 'Telangana', 'SANGAREDDY': 'Telangana', 'DEGLOOR': 'Maharashtra',
    'BONGAON': 'West Bengal', 'SHAHAPUR': 'Maharashtra', 'NARNAUL': 'Haryana', 'KARJAT': 'Maharashtra', 'BASAVANA BAGEWADI': 'Karnataka', 'MOHINDER GARH': 'Haryana',
    'ANJAR': 'Gujarat', 'BEHROR': 'Rajasthan', 'KHAIR': 'Uttar Pradesh', 'MUKERIA': 'Punjab', 'NARWANA': 'Haryana', 'DHUBRI': 'Assam', 'PERINTHALMANNA': 'Kerala',
    'BANDA': 'Uttar Pradesh', 'KASGANJ': 'Uttar Pradesh', 'NARASANNAPETA': 'Andhra Pradesh', 'CHANDPUR': 'Uttar Pradesh', 'CHITTOOR': 'Andhra Pradesh',
    'CONTAI': 'West Bengal', 'JATNI': 'Odisha', 'VIRAR': 'Maharashtra', 'LASUR': 'Maharashtra', 'MODINAGAR': 'Uttar Pradesh', 'DIDWANA': 'Rajasthan', 'SULTANGANJ': 'Bihar',
}
ref = json.load(open(sys.argv[4])) if len(sys.argv) > 4 else {}
CITY_STATE = ref.get('city_state', {})       # clean city -> state, from the Exotic workbook
ASM_CANON = ref.get('asm', {})               # normalised ASM -> canonical spelling, from the Exotic workbook

sp = lambda s: ' '.join(str(s).split())
# Sales group arrives as a number (old files) or as '02 : PUNJAB' (current files). The code drives state lookups; the name is shown.
sg_code = lambda v: int(str(v).split(':')[0]) if ':' in str(v) else int(v)
sg_name = lambda v: f"{sg_code(v):02d} : {sp(str(v).split(':', 1)[1])}" if ':' in str(v) else str(int(v))  # shown exactly as in the file, e.g. 02 : PUNJAB
norm_asm = lambda s: sp(s).upper()

# ---- read --------------------------------------------------------------------
ws = openpyxl.load_workbook(SRC, data_only=True)['Sheet1']
grid = list(ws.iter_rows(values_only=True))
hi = next(i for i, r in enumerate(grid) if r and any(str(c).strip().upper().startswith('S4HANA') for c in r if c))
hdr = [sp(c).upper() if c is not None else '' for c in grid[hi]]
col = lambda *names: next(i for i, h in enumerate(hdr) if h in names)
C = dict(buyer=col('BUYER NO.') if 'BUYER NO.' in hdr else None, s4=col('S4HANA CODE'), name=col('NAME'), city=col('CITY'), asm=col('ASM'), rsm=col('RSM'),
         asm2=col('ASM2') if 'ASM2' in hdr else None, rsm2=col('RSM2', 'RSM 2') if ('RSM2' in hdr or 'RSM 2' in hdr) else None, state_src=col('STATE') if 'STATE' in hdr else None, nh=col('NH'), ch=col('CHANNEL'), sg=col('S.G', 'SALES GRP'), q25=col('SS25 QTY'), v25=col('SS25 VALUE'), q26=col('SS26 QTY'), v26=col('SS26 VALUE'))
recon_src = None
if hi > 0:  # Exotic: subtotal row above the header
    sub = grid[hi - 1]; recon_src = [sub[C['q25']], sub[C['v25']], sub[C['q26']], sub[C['v26']]]
raw = []
for i, r in enumerate(grid[hi + 1:], start=hi + 2):
    if r[C['s4']] is None and r[C['name']] is None: continue
    raw.append(dict(row=i, buyer=str(r[C['buyer']]) if C['buyer'] is not None else '', s4=sp(r[C['s4']]), name=sp(r[C['name']]), city_src=sp(r[C['city']]).upper(),
                    asm_src=sp(r[C['asm']]), rsm=sp(r[C['rsm']]), asm2=sp(r[C['asm2'] if C['asm2'] is not None else C['asm']]), rsm2=sp(r[C['rsm2'] if C['rsm2'] is not None else C['rsm']]), nh=sp(r[C['nh']]), ch=sp(r[C['ch']]),
                    sg=sg_code(r[C['sg']]), sg_name=sg_name(r[C['sg']]), state_src=sp(r[C['state_src']]) if C['state_src'] is not None else '',
                    q25=float(r[C['q25']] or 0), v25=float(r[C['v25']] or 0), q26=float(r[C['q26']] or 0), v26=float(r[C['v26']] or 0)))
stray = [(c.coordinate, c.value) for row in ws.iter_rows(min_row=hi + 2) for c in row if c.column > len(hdr) and c.value is not None]
src_tot = [round(sum(r[k] for r in raw), 4) for k in ('q25', 'v25', 'q26', 'v26')]
if recon_src is None: recon_src = src_tot

# ---- clean -------------------------------------------------------------------
asm_names = collections.Counter(r['asm_src'] for r in raw)
asm_map = {}
for a in asm_names:
    k = norm_asm(a)
    if k in ASM_CANON: asm_map[a] = ASM_CANON[k]
    else:
        variants = [v for v in asm_names if norm_asm(v) == k]
        mixed = [v for v in variants if v != v.upper()]
        asm_map[a] = sp(max(mixed, key=lambda v: asm_names[v]) if mixed else a.title())
asm_mismatch = sum(1 for r in raw if norm_asm(r['asm_src']) != norm_asm(r['asm2']) or norm_asm(r['rsm']) != norm_asm(r['rsm2']))
city_changes = collections.Counter()
unmapped = set()
multi = collections.defaultdict(set)
for r in raw:
    c = CROSSWALK.get(r['city_src'], r['city_src'])
    if c in AMBIG and r['sg'] in AMBIG[c]: multi[c].add(AMBIG[c][r['sg']])
for r in raw:
    c = CROSSWALK.get(r['city_src'], r['city_src'])
    if c != r['city_src']: city_changes[(r['city_src'], c)] += 1
    if c in AMBIG and len(multi[c]) > 1:
        st = AMBIG[c].get(r['sg'])
        if st is None: raise SystemExit(f'Ambiguous city {c} with SG {r["sg"]} on row {r["row"]}')
        r['state'] = st; r['city'] = f'{c} ({st})'
    else:
        st = (AMBIG[c].get(r['sg']) if c in AMBIG else None) or CITY_STATE.get(c) or NEW_STATES.get(c)
        if st is None: unmapped.add(c); st = ''
        r['state'] = st; r['city'] = c
    r['asm'] = asm_map[r['asm_src']]
    r['channel'] = {'MBO': 'MBO', 'WHS': 'WHS'}.get(r['ch'].upper(), r['ch'])
if unmapped: raise SystemExit(f'Cities with no state: {sorted(unmapped)}')

# ---- dealers -----------------------------------------------------------------
by = collections.OrderedDict()
for r in raw:
    k = f"DELISTED-{r['buyer'] or r['row']}" if r['s4'].upper() == 'DELISTED' else r['s4']
    by.setdefault(k, []).append(r)
pairs, dealers = [], []
for k, rs in by.items():
    if len(rs) > 1:
        for r in rs: pairs.append(dict(s4=k, buyer=r['buyer'] or f"row {r['row']}", name=r['name'], v25=round(r['v25'], 2), v26=round(r['v26'], 2)))
    lead = max(rs, key=lambda r: (r['v26'], r['v25']))
    for f in ('city', 'state', 'asm', 'rsm', 'nh', 'channel', 'sg', 'sg_name'):
        if len({r[f] for r in rs}) > 1: raise SystemExit(f'Combined code {k} disagrees on {f}: {[r[f] for r in rs]}')
    d = dict(key=k, buyers=' / '.join(r['buyer'] for r in rs if r['buyer']), name=lead['name'], city=lead['city'], state=lead['state'], asm=lead['asm'], rsm=lead['rsm'],
             nh=lead['nh'], channel=lead['channel'], sg=lead['sg_name'], group='', review='', rows=rs,
             q25=round(sum(r['q25'] for r in rs), 4), v25=round(sum(r['v25'] for r in rs), 4), q26=round(sum(r['q26'] for r in rs), 4), v26=round(sum(r['v26'] for r in rs), 4))
    dealers.append(d)

# same-name groups: 4+ codes, or 2+ codes in one city, or 2+ codes with a company suffix (COCO stores left out)
SUFFIX = re.compile(r'\b(PVT|PRIVATE|LTD|LIMITED|LIMIT|LLP|P)\b')
has_suffix = lambda n: bool(re.search(r'\b(PVT|PRIVATE|LTD|LIMITED|LIMIT|LLP)\b|\(P\)|\(PVT\)', n.upper()))
gkey = lambda n: re.sub(r'[^A-Z0-9]', '', SUFFIX.sub(' ', re.sub(r'[^A-Z0-9 ]', ' ', n.upper())))
gs = collections.defaultdict(list)
for d in dealers:
    if d['channel'] != 'COCO': gs[gkey(d['name'])].append(d)
for k, ds in gs.items():
    if len(ds) < 2: continue
    cities = collections.Counter(d['city'] for d in ds)
    if len(ds) >= 4 or max(cities.values()) >= 2 or any(has_suffix(d['name']) for d in ds):
        names = collections.Counter(d['name'] for d in ds)
        label = max(names, key=lambda n: (names[n], len(n)))
        for d in ds: d['group'] = label

# possible recodes: same name and city, one code Lost and a different code New
lost = lambda d: d['v25'] > 0 and d['v26'] <= 0
new = lambda d: d['v25'] <= 0 and d['v26'] > 0
code = lambda d: d['buyers'] or d['key']
mc = collections.defaultdict(list)
for d in dealers: mc[(gkey(d['name']), d['city'])].append(d)
mirror = []
for (k, city), ds in mc.items():
    L, N = [d for d in ds if lost(d)], [d for d in ds if new(d)]
    if L and N:
        mirror.append(dict(name=min(L + N, key=lambda d: d['rows'][0]['row'])['name'], city=city, lost_codes=' / '.join(code(d) for d in L), new_codes=' / '.join(code(d) for d in N),
                           lost_value=round(sum(d['v25'] for d in L), 2), new_value=round(sum(d['v26'] for d in N), 2)))
        for d in L + N: d['review'] = 'Possible recode'
mirror.sort(key=lambda m: -m['lost_value'])

# identical value on similar names under different codes (per source row, per season)
similar = lambda a, b: difflib.SequenceMatcher(None, gkey(a), gkey(b)).ratio() >= .8
same = []
for season, f in (('SS26', 'v26'), ('SS25', 'v25')):
    vals = collections.defaultdict(list)
    for d in dealers:
        for r in d['rows']:
            if r[f] > 0: vals[round(r[f], 2)].append((d, r))
    for v, hits in vals.items():
        if len({d['key'] for d, _ in hits}) < 2: continue
        if not any(similar(a[1]['name'], b[1]['name']) for i, a in enumerate(hits) for b in hits[i + 1:] if a[0]['key'] != b[0]['key']): continue
        same.append(dict(season=season, value=v, rows=len(hits), excess=round(v * (len(hits) - 1), 2), dealers='; '.join(f"{r['name']} ({d['city'].split(' (')[0]}, {r['buyer'] or d['key']})" for d, r in hits)))
        for d, _ in hits:
            if d['review'] != 'Possible recode': d['review'] = 'Identical value'
same.sort(key=lambda s: (s['season'] != 'SS26', -s['excess']))

dealers.sort(key=lambda d: -d['v26'])  # stable: ties keep source order
pairs.sort(key=lambda p: (p['s4'], p['buyer']))
fields = ['key', 'buyers', 'name', 'city', 'state', 'asm', 'rsm', 'nh', 'channel', 'sg', 'group', 'review', 'q25', 'v25', 'q26', 'v26']
rows = [[d[f] if not isinstance(d[f], float) else round(d[f], 4) for f in fields] for d in dealers]
tot = [round(sum(d[k] for d in dealers), 4) for k in ('q25', 'v25', 'q26', 'v26')]
info = dict(brand=BRAND, source_rows=len(raw), dealers=len(dealers), combined_codes=sum(1 for rs in by.values() if len(rs) > 1), combined_rows=len(pairs),
            delisted=[d['key'] for d in dealers if d['key'].startswith('DELISTED')], asm_spellings=len(asm_names), asm_names=len(set(asm_map.values())), asm2_mismatch=asm_mismatch,
            city_changes=sum(city_changes.values()), city_pairs=sorted(city_changes.items()), stray=stray, src_tot=src_tot, recon_src=recon_src, model_tot=tot,
            qv_mismatch=[(r['row'], r['name'], r['q25'], r['v25'], r['q26'], r['v26']) for r in raw if (r['q25'] > 0) != (r['v25'] > 0) or (r['q26'] > 0) != (r['v26'] > 0)],
            vacant=[(sum(1 for r in raw if r['asm'].startswith('Vacant')), round(sum(r['v26'] for r in raw if r['asm'].startswith('Vacant')), 2))],
            ambiguous=sorted({r['city'] for r in raw if r['city'].endswith(')')}))
json.dump(dict(fields=fields, rows=rows, dq=dict(recon=[dict(label=l, source=round(s, 2)) for l, s in zip(['SS25 Qty', 'SS25 Value', 'SS26 Qty', 'SS26 Value'], recon_src)],
                                               pairs=pairs, mirror=mirror, same=same), info=info), open(OUT, 'w'), ensure_ascii=False)
print(json.dumps(info, ensure_ascii=False, indent=1, default=str)[:3000])
