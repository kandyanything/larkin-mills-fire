"""New Vernon Volunteer Fire Department concept, design 2 (firehouse doors, new-vernon-fire/), and the
links to design 1. Run with the repo served on 8765. Photos that load from the department's current
site (images.squarespace-cdn.com) are blocked here, as they are from a Claude workspace."""
import json
from playwright.sync_api import sync_playwright
URL = 'http://localhost:8765/new-vernon-fire/index.html'
D1 = 'http://localhost:8765/new-vernon-fire/design-1/index.html'
ARGS = ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
ok = []
def check(n, c, x=''): ok.append((n, bool(c))); print(('  ok   ' if c else '  FAIL ') + n + (' | ' + str(x) if x != '' else ''))
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=ARGS); errs = []
    def page(w=1440, h=900, seen=True, **kw):
        ctx = b.new_context(viewport={'width': w, 'height': h}, **kw); pg = ctx.new_page()
        pg.route('**/*', lambda r: r.abort() if ('squarespace' in r.request.url or 'weather.gov' in r.request.url) else r.continue_())
        pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e))); pg.on('console', lambda m: errs.append(m.text[:140]) if m.type == 'error' and 'ERR_' not in m.text else None)
        if seen: pg.add_init_script("try{localStorage.setItem('welcome-off:launch','1')}catch(e){}")
        return ctx, pg
    has = lambda pg, sel: pg.evaluate("!!document.querySelector(%s)" % json.dumps(sel))
    bay = lambda pg: pg.evaluate("Array.from(document.querySelectorAll('.bay')).filter(b => !b.hidden).map(b => b.getAttribute('data-bay')).join()")
    up = lambda pg: pg.evaluate("Array.from(document.querySelectorAll('.bdoor')).findIndex(d => d.classList.contains('is-up'))")

    ctx, pg = page(seen=False); pg.goto(URL); pg.wait_for_timeout(1900)
    check('first visit: welcome opens, burning the department patch', has(pg, 'dialog.wl[open]') and pg.evaluate("document.querySelector('.wl-badge img').getAttribute('src')").endswith('emblem.png'))
    pg.screenshot(path='nv_welcome.png'); ctx.close()

    ctx, pg = page(); pg.goto(URL); pg.wait_for_timeout(2600)
    check('title and robots say concept', pg.title().startswith('New Vernon Volunteer Fire Department') and pg.get_attribute('meta[name=robots]', 'content').startswith('noindex'))
    doors = pg.evaluate("Array.from(document.querySelectorAll('.bdoor')).map(d => d.getAttribute('aria-label') || d.textContent.trim().split('\\n')[0])")
    check('six openings on the rendering (three bays, three windows), First Aid has its own', pg.locator('.bdoor').count() == 6 and has(pg, '.house--photo') and any(d.startswith('First Aid') for d in doors), doors)
    sign = pg.evaluate("(() => { var L = Array.from(document.querySelectorAll('.lintel-in .lintel')).map(e => e.getBoundingClientRect()), D = Array.from(document.querySelectorAll('.lintel-in .bdoor')).map(e => e.getBoundingClientRect()); return L.every((l, i) => l.top >= D[i].top - 1) })()")
    check('bay names sit inside the doors, leaving the sign above in view', sign)
    r = pg.evaluate("[Math.round(document.querySelector('.hero3').getBoundingClientRect().bottom), innerHeight]"); check('the first screen holds the whole firehouse', r[0] <= r[1], r)
    body = pg.evaluate("document.body.innerText")
    check('nothing left from Newark or Pequannock', not any(w in body for w in ['Newark', 'Pequannock', 'Turkey Trot', 'Civil Service']), [w for w in ['Newark', 'Pequannock', 'Turkey Trot', 'Civil Service'] if w in body])
    check('header button is Donate', pg.inner_text('.site-header .btn') == 'Donate')
    check('notice bar: the Country Mile Gardens tree sale', 'Country Mile Gardens' in pg.inner_text('.alert'))
    t = pg.evaluate("(() => { var s = document.getElementById('remember'), i = s && s.querySelector('img'); return s ? [s.closest('.bay').getAttribute('data-bay'), i.getAttribute('src'), s.querySelector('h2').textContent] : null })()")
    check('home: the Tribute in Light dedication, right under the firehouse', t and t[0] == 'home' and t[1].endswith('tribute-in-light.jpg') and t[2] == 'We remember.', t)
    order = pg.evaluate("Array.from(document.querySelectorAll('.bay[data-bay=home] > section, .bay[data-bay=home] > div > section')).map(s => s.id).slice(0, 3)")
    check('the dedication comes second on the home page', order[:2] == ['top', 'remember'], order)
    for i in [0, 4]:
        bx = pg.locator('.bdoor').nth(i).bounding_box(); pg.mouse.move(bx['x'] + bx['width'] / 2, bx['y'] + bx['height'] / 2); pg.wait_for_timeout(950)
        check('pointing lifts door %d' % (i + 1), up(pg) == i)
    pg.mouse.move(300, 300); pg.wait_for_timeout(300)
    pg.evaluate("document.querySelectorAll('.bdoor')[1].focus()"); pg.keyboard.press('Enter'); pg.wait_for_timeout(500)
    # door 2 is First Aid
    check('the First Aid door opens the squad, with its three photos', bay(pg) == 'squad' and pg.locator('#squad img').count() == 3 and pg.evaluate("Array.from(document.querySelectorAll('#squad img')).every(i => i.getAttribute('src').startsWith('images/photos/squad-'))"))
    pg.click('.bay:not([hidden]) .bay-nav a[href="#auxiliary"]'); pg.wait_for_timeout(400); check('Auxiliary has its own bay', bay(pg) == 'auxiliary' and 'May 1921' in pg.inner_text('#auxiliary'))
    pg.click('.bay:not([hidden]) .bay-nav a[href="#officers"]'); pg.wait_for_timeout(500)
    check('Fire Co. bay: chief, trucks, numbers, photos', bay(pg) == 'fire' and 'Ward Connon' in pg.inner_text('#officers') and pg.locator('.sheet').count() == 4 and pg.locator('#photos img').count() >= 12)
    pg.click('.bay:not([hidden]) .bay-nav a[href="#history"]'); pg.wait_for_timeout(500)
    check('the History window: timeline, chiefs and founders', bay(pg) == 'history' and pg.locator('#history .timeline li').count() == 11 and pg.locator('#members .roll li').count() == 24)
    pg.click('.bay:not([hidden]) .bay-nav a[href="#officers"]'); pg.wait_for_timeout(500)
    check('Engine 1 shows its photo', pg.evaluate("document.querySelector('.sheet-photo img').getAttribute('src')").endswith('engine-1.jpg'))
    pg.goto(URL + '#santa'); pg.wait_for_timeout(700)
    check('Santa bay: three events and the route', bay(pg) == 'events' and pg.locator('.event').count() == 3 and pg.locator('#santa li').count() >= 5)
    pg.goto(URL + '#support'); pg.wait_for_timeout(700); check('Give bay: $0 in tax dollars and Build-A-Truck', bay(pg) == 'give' and '$0' in pg.inner_text('#support') and 'Build-A-Truck' in pg.inner_text('#support'))
    pg.goto(URL + '#join'); pg.wait_for_timeout(700)
    pg.fill('#coat-name', 'Connon'); pg.wait_for_timeout(600); check('name goes on the coat', 'Connon' in pg.inner_html('#coat') or 'CONNON' in pg.inner_html('#coat'))
    pg.click('[data-open="apply"]'); pg.wait_for_timeout(200); check('the sign-up form offers fire, first aid and the Auxiliary', all(w in pg.inner_text('#apply') for w in ['Fire Company', 'First Aid Squad', 'Auxiliary'])); pg.keyboard.press('Escape')
    pg.goto(URL); pg.wait_for_timeout(1200)
    pg.evaluate("document.getElementById('help').scrollIntoView()"); pg.fill('#finder-q', 'emt'); n = pg.evaluate("Array.from(document.querySelectorAll('.finder-list .task')).filter(l => !l.hidden).map(l => l.querySelector('h3').textContent).join('|')")
    check('finder: "emt" finds the squad', 'Become an EMT' in n, n)
    tags = pg.evaluate("Array.from(document.querySelectorAll('.sample-tag')).map(t => t.closest('section') && t.closest('section').id).filter(Boolean)")
    check('every placeholder section is tagged', set(tags) >= {'calls', 'apparatus', 'join', 'officers', 'safety', 'support', 'santa', 'partners', 'contact'}, sorted(set(tags)))
    pg.click('.sample-bar a.tour-go'); pg.wait_for_timeout(1500); check('"See design 1" opens design 1', pg.url.rstrip('/').endswith('design-1') and has(pg, '.hero--split'))
    pg.click('.sample-bar a.tour-go'); pg.wait_for_timeout(1500); check('"See design 2" comes back', pg.url.rstrip('/').endswith('new-vernon-fire') and has(pg, '.house'))
    ctx.close()

    ctx, pg = page(); pg.goto(URL + '?tour'); pg.wait_for_timeout(1500); seen = []
    for i in range(9):
        seen.append(bay(pg) + ':' + pg.evaluate("(document.querySelector('.tour-focus')||{id:'end'}).id"))
        if has(pg, '[data-tour-next]'): pg.click('[data-tour-next]'); pg.wait_for_timeout(700)
    check('the tour walks from bay to bay', seen == ['home:top', 'home:help', 'join:join', 'squad:squad', 'events:santa', 'history:history', 'give:support', 'give:partners', 'give:end'], seen)
    ctx.close()

    ctx, pg = page(390, 844, device_scale_factor=2, has_touch=True, is_mobile=True); pg.goto(URL); pg.wait_for_timeout(2400)
    bad = []
    for h in ['', '#squad', '#auxiliary', '#officers', '#santa', '#support', '#join', '#contact']:
        pg.goto(URL + h); pg.wait_for_timeout(700)
        if pg.evaluate("document.documentElement.scrollWidth > innerWidth + 1"): bad.append(h)
    check('phone: no sideways scroll anywhere', not bad, bad)
    pg.goto(URL); pg.wait_for_timeout(1500); pg.screenshot(path='nv_m_home.png')
    ctx.close(); b.close()
print('ALL PASS' if all(v for _, v in ok) else 'FAILURES: ' + ', '.join(n for n, v in ok if not v), '|', len(ok), 'checks | errors:', errs[:6])
