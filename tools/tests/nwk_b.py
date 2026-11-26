"""Newark Fire Division concept, design 2 (firehouse doors, newark-fire/). Run with the repo served on 8765.
Photos load from newarkpublicsafety.org on the live site; here those requests are blocked, so the
stand-in pictures are what shows."""
import json
from playwright.sync_api import sync_playwright
URL = 'http://localhost:8765/newark-fire/index.html'
ARGS = ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
ok = []
def check(n, c, x=''): ok.append((n, bool(c))); print(('  ok   ' if c else '  FAIL ') + n + (' | ' + str(x) if x != '' else ''))
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=ARGS); errs = []
    def page(w=1440, h=900, seen=True, **kw):
        ctx = b.new_context(viewport={'width': w, 'height': h}, accept_downloads=True, **kw); pg = ctx.new_page()
        pg.route('**/*', lambda r: r.abort() if ('newarkpublicsafety.org' in r.request.url or 'weather.gov' in r.request.url) else r.continue_())
        pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e))); pg.on('console', lambda m: errs.append(m.text[:140]) if m.type == 'error' and 'ERR_' not in m.text else None)
        if seen: pg.add_init_script("try{localStorage.setItem('welcome-off:launch','1')}catch(e){}")
        return ctx, pg
    has = lambda pg, sel: pg.evaluate("!!document.querySelector(%s)" % json.dumps(sel))
    bay = lambda pg: pg.evaluate("Array.from(document.querySelectorAll('.bay')).filter(b => !b.hidden).map(b => b.getAttribute('data-bay')).join()")
    up = lambda pg: pg.evaluate("Array.from(document.querySelectorAll('.bdoor')).findIndex(d => d.classList.contains('is-up'))")
    shown = lambda pg: pg.evaluate("Array.from(document.querySelectorAll('.sta-list .sta')).filter(l => !l.hidden).map(l => l.querySelector('h3').textContent)")

    ctx, pg = page(seen=False); pg.goto(URL); pg.wait_for_timeout(1900)
    check('first visit: welcome opens with the fire running', has(pg, 'dialog.wl[open]') and not has(pg, 'dialog.wl.is-static'))
    check('welcome carries the concept note', 'Website concept' in pg.inner_text('dialog.wl'))
    pg.screenshot(path='nwk_welcome.png')
    pg.click('[data-wl-skip]'); pg.wait_for_timeout(1700); pg.click('.wl-actions .btn'); pg.wait_for_timeout(300)
    check('closing the welcome stirs the doors', has(pg, '.house.is-hint')); ctx.close()

    ctx, pg = page(); pg.goto(URL); pg.wait_for_timeout(2800)
    check('title and robots say concept', 'website concept' in pg.title() and pg.get_attribute('meta[name=robots]', 'content').startswith('noindex'))
    check('home is the only bay showing, five doors on the rendering', bay(pg) == 'home' and pg.locator('.bdoor').count() == 5 and has(pg, '.house--photo'))
    body = pg.evaluate("document.body.innerText")
    check('no donations, no volunteer wording, nothing left from Pequannock', not any(w in body for w in ['Donate', 'Pequannock', 'Turkey', 'volunteer hours', 'Fund Drive']), [w for w in ['Donate', 'Pequannock', 'Turkey', 'volunteer hours', 'Fund Drive'] if w in body])
    check('header button finds a firehouse', pg.inner_text('.site-header .btn') == 'Find your firehouse')
    r = pg.evaluate("[Math.round(document.querySelector('.hero3').getBoundingClientRect().bottom), innerHeight]"); check('the first screen holds the whole firehouse', r[0] <= r[1], r)
    pg.set_viewport_size({'width': 1280, 'height': 720}); pg.wait_for_timeout(400)
    r = pg.evaluate("[Math.round(document.querySelector('.hero3').getBoundingClientRect().bottom), innerHeight]"); check('1280x720: the firehouse still fits', r[0] <= r[1], r)
    pg.set_viewport_size({'width': 1440, 'height': 900}); pg.wait_for_timeout(400)
    for i in [0, 4]:
        bx = pg.locator('.bdoor').nth(i).bounding_box(); pg.mouse.move(bx['x'] + bx['width'] / 2, bx['y'] + bx['height'] / 2); pg.wait_for_timeout(950)
        check('pointing lifts door %d' % (i + 1), up(pg) == i)
    pg.mouse.move(300, 300); pg.wait_for_timeout(300); check('door drops when the pointer leaves the building', up(pg) == -1)
    pg.evaluate("document.querySelectorAll('.bdoor')[1].focus()"); pg.wait_for_timeout(200); pg.keyboard.press('Enter'); pg.wait_for_timeout(500)
    check('keyboard: Enter on the People door goes into that bay', bay(pg) == 'people' and pg.evaluate("scrollY") == 0)
    check('people bay: chief, four staff, numbers and photos', all(pg.is_visible('#' + x) for x in ['officers', 'year', 'photos']) and pg.locator('#officers .roster li').count() == 4 and pg.locator('#photos img').count() == 15)
    pg.click('.bay:not([hidden]) .bay-nav a[href="#history"]'); pg.wait_for_timeout(500)
    check('history bay: timeline, chiefs and honor roll', bay(pg) == 'history' and pg.locator('.timeline li').count() == 18 and pg.locator('.chiefs li').count() == 9 and pg.locator('#members .roll li').count() == 14)
    pg.click('.bay:not([hidden]) .bay-nav a[href="#stations"]'); pg.wait_for_timeout(500)
    check('firehouses bay: 16 cards and the offices', bay(pg) == 'firehouses' and len(shown(pg)) == 16 and pg.locator('.sta-offices li').count() == 4)
    pg.fill('#sta-q', 'ironbound'); pg.wait_for_timeout(200); n = shown(pg); check('firehouse search: Ironbound finds four', len(n) == 4, n)
    pg.fill('#sta-q', 'Ladder 5'); pg.wait_for_timeout(200); n = shown(pg); check('firehouse search: "Ladder 5" finds only Engine 10 and Ladder 5', n == ['Engine 10 and Ladder 5'], n)
    pg.fill('#sta-q', 'zzz'); pg.wait_for_timeout(200); check('firehouse search: nothing found says so', not shown(pg) and pg.is_visible('.sta-none'))
    pg.fill('#sta-q', ''); pg.wait_for_timeout(200)
    check('companies: four sheets, each with its photo', pg.locator('.sheet').count() == 4 and pg.evaluate("Array.from(document.querySelectorAll('.sheet-photo img')).filter(i => /images\\/photos\\/.+\\.jpg$/.test(i.getAttribute('src'))).length") == 4)
    check('three firehouse cards carry a picture', pg.locator('.sta-img').count() == 3)
    pg.click('.nav a[href="#join"]'); pg.wait_for_timeout(400); check('Join in the menu opens the join bay', bay(pg) == 'join')
    pg.fill('#coat-name', 'Ortiz'); pg.wait_for_timeout(700); check('name goes on the drawn coat', 'ORTIZ' in pg.inner_text('#coat').upper() or 'Ortiz' in pg.inner_html('#coat'))
    pg.click('[data-open="apply"]'); pg.wait_for_timeout(200); check('interest form opens and says it is not an application', has(pg, '#apply[open]') and 'Civil Service' in pg.inner_text('#apply')); pg.keyboard.press('Escape')
    pg.click('.site-footer a[href="#partners"]'); pg.wait_for_timeout(600); check('a deep link opens the right bay', bay(pg) == 'safety' and abs(pg.evaluate("document.getElementById('partners').getBoundingClientRect().top")) < 160)
    check('safety bay: tips, prevention and ways to help', pg.locator('#safety .tips li').count() == 6 and pg.is_visible('#prevention') and pg.is_visible('#community'))
    pg.evaluate("document.querySelector('[data-open=\"report\"]').scrollIntoView({block:'center'})"); pg.click('[data-open="report"]'); pg.wait_for_timeout(200)
    check('sample report uses invented businesses only', pg.inner_text('#rep-h').startswith('Example')); pg.keyboard.press('Escape')
    pg.go_back(); pg.wait_for_timeout(400); check('the back button returns to the last bay', bay(pg) == 'join')
    pg.click('.brand'); pg.wait_for_timeout(400); check('the name in the header goes home', bay(pg) == 'home')
    pg.evaluate("document.getElementById('help').scrollIntoView()"); pg.fill('#finder-q', 'exam'); n = pg.evaluate("Array.from(document.querySelectorAll('.finder-list .task')).filter(l => !l.hidden).map(l => l.querySelector('h3').textContent).join('|')"); check('finder: "exam" finds the hiring answer', n == 'Become a Newark firefighter', n)
    tags = pg.evaluate("Array.from(document.querySelectorAll('.sample-tag')).map(t => t.closest('section') && t.closest('section').id).filter(Boolean)"); check('every placeholder section is tagged', set(tags) >= {'calls', 'apparatus', 'join', 'photos', 'members', 'partners', 'contact'}, sorted(set(tags)))
    pg.goto(URL + '#officers'); pg.wait_for_timeout(500)
    fell = pg.evaluate("(async () => { var i = document.querySelector('.chief-portrait img'); i.scrollIntoView(); await new Promise(r => setTimeout(r, 1500)); return [i.getAttribute('data-fell'), i.getAttribute('src')] })()"); check('a photo that cannot load shows the stand-in', fell[0] == '1' and fell[1].endswith('photo-missing.jpg'), fell)
    pg.click('[data-badge-close]'); pg.wait_for_timeout(200); check('the concept label closes', not has(pg, '#concept-badge'))
    ctx.close()

    ctx, pg = page(); pg.goto(URL + '?tour'); pg.wait_for_timeout(1500); seen = []
    for i in range(9):
        seen.append(bay(pg) + ':' + pg.evaluate("(document.querySelector('.tour-focus')||{id:'end'}).id"))
        if has(pg, '[data-tour-next]'): pg.click('[data-tour-next]'); pg.wait_for_timeout(700)
    check('the tour walks from bay to bay', seen == ['home:top', 'home:help', 'firehouses:stations', 'join:join', 'people:officers', 'history:history', 'safety:safety', 'safety:partners', 'safety:end'], seen)
    pg.screenshot(path='nwk_tour_end.png'); print('   tour end:', pg.inner_text('.tour')[:300].replace('\n', ' / '))
    ctx.close()
    ctx, pg = page(); pg.goto(URL + '?alert'); pg.wait_for_timeout(1500); check('weather alert demo shows', pg.evaluate("(() => { var w = document.getElementById('wx'); return !!w && !w.hidden && w.textContent.indexOf('Sample alert') !== -1 && w.textContent.indexOf('Newark') !== -1 })()")); ctx.close()
    ctx, pg = page(seen=False, reduced_motion='reduce'); pg.goto(URL); pg.wait_for_timeout(1300); check('reduced motion: still welcome, no door hint', has(pg, 'dialog.wl.is-static') and not has(pg, '.house.is-hint')); ctx.close()

    ctx, pg = page(390, 844, device_scale_factor=2, has_touch=True, is_mobile=True); pg.goto(URL); pg.wait_for_timeout(2600)
    check('phone: no sideways scroll, building pans', not pg.evaluate("document.documentElement.scrollWidth > innerWidth") and pg.evaluate("document.querySelector('.house-scroll').scrollWidth > innerWidth"))
    pg.screenshot(path='nwk_m_home.png')
    pg.tap('.bdoor[data-bdoor="1"]'); pg.wait_for_timeout(900); check('phone: first tap lifts the door and stays', up(pg) == 1 and bay(pg) == 'home')
    pg.tap('.bdoor[data-bdoor="1"]'); pg.wait_for_timeout(600); check('phone: second tap goes in', bay(pg) == 'people')
    pg.tap('.nav-toggle'); pg.wait_for_timeout(300); check('phone: menu lists Join', pg.is_visible('.nav a[href="#join"]'))
    bad = []
    for h in ['#stations', '#apparatus', '#officers', '#history', '#safety', '#partners', '#join', '#contact']:
        pg.goto(URL + h); pg.wait_for_timeout(700)
        if pg.evaluate("document.documentElement.scrollWidth > innerWidth + 1"): bad.append(h + ': ' + pg.evaluate("Array.from(document.querySelectorAll('.bay:not([hidden]) *')).filter(e => e.getBoundingClientRect().right > innerWidth + 2).slice(0,4).map(e => e.className || e.tagName).join(' | ')"))
    check('phone: no sideways scroll in any bay', not bad, bad)
    pg.goto(URL + '#stations'); pg.wait_for_timeout(800); pg.screenshot(path='nwk_m_stations.png')
    ctx.close(); b.close()
print('ALL PASS' if all(v for _, v in ok) else 'FAILURES: ' + ', '.join(n for n, v in ok if not v), '|', len(ok), 'checks | errors:', errs[:6])
