import json, numpy as np, cv2
from playwright.sync_api import sync_playwright
URL = 'http://localhost:8765/pequannock-engine-1/design-1/index.html'
D2 = 'http://localhost:8765/pequannock-engine-1/index.html'
ARGS = ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
ok = []
def check(n, c, x=''): ok.append((n, bool(c))); print(('  ok   ' if c else '  FAIL ') + n + (' | ' + str(x) if x != '' else ''))
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=ARGS); errs = []
    def page(w=1440, h=900, seen=True, **kw):
        ctx = b.new_context(viewport={'width': w, 'height': h}, accept_downloads=True, **kw); pg = ctx.new_page()
        pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e))); pg.on('console', lambda m: errs.append(m.text[:140]) if m.type == 'error' and 'ERR_' not in m.text and 'wixstatic' not in m.text and 'weather.gov' not in m.text else None)
        pg.route('**/static.wixstatic.com/**', lambda r: r.abort()); pg.route('**/api.weather.gov/**', lambda r: r.abort())
        if seen: pg.add_init_script("try{localStorage.setItem('welcome-off:launch','1')}catch(e){}")
        return ctx, pg
    has = lambda pg, sel: pg.evaluate("!!document.querySelector(%s)" % json.dumps(sel))
    ctx, pg = page(seen=False); pg.goto(URL); pg.wait_for_timeout(1900)
    check('first visit: welcome opens with the fire running', has(pg, 'dialog.wl[open]') and not has(pg, 'dialog.wl.is-static'))
    check('welcome shows the real patch and the concept note', pg.evaluate("document.querySelector('.wl-badge img').getAttribute('src')").endswith('patch.png') and 'Website concept' in pg.inner_text('dialog.wl'))
    pg.evaluate("document.querySelector('[data-wl-skip]').click()"); pg.wait_for_timeout(1700); pg.check('dialog.wl input[type=checkbox]'); pg.click('.wl-actions .btn'); pg.wait_for_timeout(300)
    pg.reload(); pg.wait_for_timeout(1500); check("ticking don't-show keeps it closed next visit", not has(pg, 'dialog.wl[open]')); ctx.close()
    ctx, pg = page(); pg.goto(URL); pg.wait_for_timeout(2500)
    check('title, robots and the new name', 'website concept' in pg.title() and pg.title().startswith('Pequannock Township Engine Company #1') and pg.get_attribute('meta[name=robots]', 'content').startswith('noindex'))
    check('header names the company in full', 'Pequannock Township Engine Company #1' in pg.inner_text('.brand'))
    r = pg.evaluate("[Math.round(document.querySelector('.hero').getBoundingClientRect().bottom), innerHeight, Math.round(document.querySelector('.hero-pic img').getBoundingClientRect().width), Math.round(document.querySelector('.hero-copy').getBoundingClientRect().right)]")
    check('hero: whole building and headline fit the first screen', r[0] <= r[1] and r[3] <= 1440, r)
    pg.click('.rig-tab[data-rig="2"]'); pg.wait_for_timeout(300); check('rig tabs switch, plates and names right', 'Rescue 1' in pg.inner_text('#rig-panel') and pg.inner_text('.rig-tab[data-rig="0"]').replace('\n', ' ').strip() == '1-1 Quint', pg.inner_text('.rig-tab[data-rig="0"]'))
    pg.fill('#coat-name', 'Daley'); pg.wait_for_timeout(600); check('name goes on the drawn coat', 'Daley' in pg.inner_html('#coat'))
    pg.click('[data-open="apply"]'); pg.wait_for_timeout(200); check('interest form opens', has(pg, '#apply[open]')); pg.keyboard.press('Escape')
    pg.evaluate("document.querySelector('[data-open=\"report\"]').scrollIntoView({block:'center'})"); pg.click('[data-open="report"]'); pg.wait_for_timeout(200)
    check('sample report uses invented businesses only', 'Example Hardware' in pg.inner_text('#report') and 'Handy Mike' not in pg.inner_text('#report')); pg.keyboard.press('Escape')
    pg.evaluate("document.querySelector('.give-qr').scrollIntoView({block:'center'}); document.querySelector('.give-qr .qr').style.width='300px'")
    im = cv2.imdecode(np.frombuffer(pg.locator('.give-qr .qr').screenshot(), np.uint8), cv2.IMREAD_COLOR); q = cv2.QRCodeDetector().detectAndDecode(im)[0]; check('the giving code scans', q.endswith('#support'), q)
    pg.click('[data-amount="50"]'); pg.click('[data-freq="monthly"]'); pg.wait_for_timeout(100); check('gift buttons', 'month' in pg.inner_text('[data-donate]').lower(), pg.inner_text('[data-donate]'))
    check('roster, juniors, chiefs and archive photos are there', pg.locator('.roll li').count() == 37 and has(pg, '#juniors') and pg.locator('.chiefs li').count() == 33 and pg.locator('.archive img').count() == 4)
    tags = pg.evaluate("Array.from(document.querySelectorAll('.sample-tag')).map(t => t.closest('section') && t.closest('section').id).filter(Boolean)"); check('every placeholder section is tagged', set(tags) >= {'calls','apparatus','join','neighbors','year','events','santa','feed','support','partners','safety','contact'}, sorted(set(tags)))
    pg.evaluate("document.getElementById('history').scrollIntoView()"); pg.wait_for_timeout(1500)
    fell = pg.evaluate("Array.from(document.querySelectorAll('.archive img')).map(i => i.getAttribute('data-fell')).join()"); check('archive photos that cannot load show the stand-in', fell == '1,1,1,1', fell)
    pg.evaluate("document.getElementById('santa').scrollIntoView()"); pg.wait_for_timeout(1500); a = pg.get_attribute('[data-santa-truck]', 'transform'); pg.wait_for_timeout(900); check('santa map runs, ten stops', a != pg.get_attribute('[data-santa-truck]', 'transform') and pg.locator('[data-santa-stop]').count() == 10)
    with pg.expect_download() as dl:
        pg.evaluate("document.querySelector('[data-ics]').scrollIntoView({block:'center'})"); pg.click('[data-ics="0"]')
    check('calendar file for the Turkey Trot', 'turkey-trot' in dl.value.suggested_filename, dl.value.suggested_filename)
    pg.click('[data-badge-close]'); pg.wait_for_timeout(200); check('the concept label closes', not has(pg, '#concept-badge'))
    pg.evaluate("window.scrollTo(0,0)"); pg.click('.sample-bar a.tour-go'); pg.wait_for_timeout(1500)
    check('"See design 2" opens design 2 with the new name', pg.url.rstrip('/').endswith('pequannock-engine-1') and has(pg, '.house--photo') and 'Pequannock Township Engine Company #1' in pg.title(), pg.url)
    check('design 2 header reads Pequannock / Township Engine Company #1', pg.inner_text('.brand').replace('\n', ' ').strip().lower() == 'pequannock township engine company #1', pg.inner_text('.brand'))
    pg.click('.sample-bar a.tour-go'); pg.wait_for_timeout(1500); check('"See design 1" comes back', pg.url.rstrip('/').endswith('design-1') and has(pg, '.hero--split'), pg.url)
    ctx.close()
    ctx, pg = page(); pg.goto(URL + '?tour'); pg.wait_for_timeout(1500); seen = []
    for i in range(9):
        seen.append(pg.evaluate("(document.querySelector('.tour-focus')||{id:'end'}).id"))
        if has(pg, '[data-tour-next]'): pg.click('[data-tour-next]'); pg.wait_for_timeout(900)
    check('the tour walks the page', seen == ['top', 'feed', 'year', 'join', 'neighbors', 'santa', 'support', 'partners', 'end'], seen)
    ctx.close()
    ctx, pg = page(seen=False, reduced_motion='reduce'); pg.goto(URL); pg.wait_for_timeout(1300); check('reduced motion: still welcome, nothing moving', has(pg, 'dialog.wl.is-static')); ctx.close()
    ctx, pg = page(390, 844, device_scale_factor=2, has_touch=True, is_mobile=True); pg.goto(URL); pg.wait_for_timeout(2500)
    check('phone: no sideways scroll', not pg.evaluate("document.documentElement.scrollWidth > innerWidth"), pg.evaluate("Array.from(document.querySelectorAll('main *')).filter(e => e.getBoundingClientRect().right > innerWidth + 2).slice(0,4).map(e => e.className || e.tagName).join(' | ')"))
    pg.tap('.nav-toggle'); pg.wait_for_timeout(300); check('phone: menu opens', pg.is_visible('.nav a[href="#apparatus"]'))
    pg.screenshot(path='p1_m_menu.png'); ctx.close()
    ctx, pg = page(1280, 720); pg.goto(URL); pg.wait_for_timeout(1500); r = pg.evaluate("[Math.round(document.querySelector('.hero').getBoundingClientRect().bottom), innerHeight]"); check('1280x720: hero fits', r[0] <= r[1], r); ctx.close()
    b.close()
print('ALL PASS' if all(v for _, v in ok) else 'FAILURES: ' + ', '.join(n for n, v in ok if not v), '|', len(ok), 'checks | errors:', errs[:6])
