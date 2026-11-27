"""New Vernon Volunteer Fire Department concept, design 1 (one long page, new-vernon-fire/design-1/).
Run with the repo served on 8765. Photos from images.squarespace-cdn.com are blocked here."""
import json
from playwright.sync_api import sync_playwright
URL = 'http://localhost:8765/new-vernon-fire/design-1/index.html'
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

    ctx, pg = page(seen=False); pg.goto(URL); pg.wait_for_timeout(1900)
    check('first visit: welcome opens, burning the department patch', has(pg, 'dialog.wl[open]') and pg.evaluate("document.querySelector('.wl-badge img').getAttribute('src')").endswith('emblem.png'))
    pg.screenshot(path='nv1_welcome.png'); ctx.close()

    ctx, pg = page(); pg.goto(URL); pg.wait_for_timeout(2500)
    menu = pg.evaluate("Array.from(document.querySelectorAll('.nav a')).map(a => a.textContent.trim())")
    check('menu from the data, First Aid Squad in it', menu[:7] == ['Volunteer', 'First Aid Squad', 'Trucks', 'Santa', 'History', 'Build-A-Truck', 'Contact'], menu)
    r = pg.evaluate("[Math.round(document.querySelector('.hero').getBoundingClientRect().bottom), innerHeight, document.querySelector('.hero-pic img').getAttribute('src'), Math.round(document.querySelector('.hero-pic img').getBoundingClientRect().right), Math.round(document.querySelector('.hero--split h1').getBoundingClientRect().left)]")
    check('hero: the firehouse rendering beside the headline, on the first screen', r[0] <= r[1] and r[2].endswith('firehouse-front-nv.jpg') and r[3] <= r[4], r)
    t = pg.evaluate("(() => { var s = document.querySelector('main > section:nth-of-type(2)'); return [s.id, s.querySelector('img').getAttribute('src')] })()")
    check('the Tribute in Light dedication comes right after the hero', t[0] == 'remember' and t[1].endswith('tribute-in-light.jpg'), t)
    body = pg.evaluate("document.body.innerText")
    check('nothing left from Newark or Pequannock', not any(w in body for w in ['Newark', 'Pequannock', 'Turkey Trot', 'Civil Service']), [w for w in ['Newark', 'Pequannock', 'Turkey Trot', 'Civil Service'] if w in body])
    check('the First Aid Squad section has its three photos', pg.locator('#squad .feature-photos img').count() == 3)
    check('the Auxiliary section is there', 'May 1921' in pg.inner_text('#auxiliary'))
    t = pg.inner_text('#buildatruck'); check('Build-A-Truck has its own section after Santa: both phases, $800,000 raised', pg.evaluate("document.getElementById('santa').compareDocumentPosition(document.getElementById('buildatruck')) & 4") and pg.locator('#buildatruck .camp-phase').count() == 2 and '$800,000' in t and '2031' in t)
    pg.click('.rig-tab[data-rig="0"]'); pg.wait_for_timeout(300); check('Engine 1 shows its photo', pg.evaluate("document.querySelector('#rig-panel img').getAttribute('src')").endswith('engine-1.jpg'))
    check('history, founders and chiefs', pg.locator('#history .timeline li').count() == 11 and pg.locator('#members .roll li').count() == 24 and pg.locator('.chiefs li').count() == 10)
    tags = pg.evaluate("Array.from(document.querySelectorAll('.sample-tag')).map(t => t.closest('section') && t.closest('section').id).filter(Boolean)")
    check('every placeholder section is tagged', set(tags) >= {'calls', 'apparatus', 'join', 'officers', 'safety', 'santa', 'partners', 'contact'}, sorted(set(tags)))
    ctx.close()

    ctx, pg = page(); pg.goto(URL + '?tour'); pg.wait_for_timeout(1500); seen = []
    for i in range(9):
        seen.append(pg.evaluate("(document.querySelector('.tour-focus')||{id:'end'}).id"))
        if has(pg, '[data-tour-next]'): pg.click('[data-tour-next]'); pg.wait_for_timeout(900)
    check('the tour walks the page', seen[:7] == ['top', 'join', 'squad', 'santa', 'history', 'buildatruck', 'partners'], seen)
    ctx.close()
    for w, h in [(1280, 720)]:
        ctx, pg = page(w, h); pg.goto(URL); pg.wait_for_timeout(1500); r = pg.evaluate("[Math.round(document.querySelector('.hero').getBoundingClientRect().bottom), innerHeight]"); check('%dx%d: hero fits' % (w, h), r[0] <= r[1], r); ctx.close()
    ctx, pg = page(); pg.goto(URL); pg.wait_for_timeout(1500)
    soc = pg.evaluate("Array.from(document.querySelectorAll('.strip-social a.soc')).map(a => [a.getAttribute('href'), a.textContent.trim(), !!a.querySelector('svg'), a.getBoundingClientRect().width > 0])")
    check('top strip: Facebook and Instagram links with icons', soc == [['https://www.facebook.com/NVVFD', 'Facebook', True, True], ['https://www.instagram.com/new_vernon_fire_department', 'Instagram', True, True]], soc)
    check('footer: Facebook and Instagram with icons', pg.locator('.site-footer a.soc svg').count() == 2)
    pg.goto(URL + '?alert'); pg.wait_for_timeout(1500)
    check('weather alerts: the sample shows, for Harding Township', pg.evaluate("(() => { var w = document.getElementById('wx'); return !!w && !w.hidden && w.textContent.indexOf('Sample alert') !== -1 && w.textContent.indexOf('Harding Township') !== -1 })()"))
    ctx.close()
    ctx, pg = page(390, 844, device_scale_factor=2, has_touch=True, is_mobile=True); pg.goto(URL); pg.wait_for_timeout(2500)
    check('phone: no sideways scroll', not pg.evaluate("document.documentElement.scrollWidth > innerWidth"))
    pg.screenshot(path='nv1_m_home.png')
    check('phone: the two social icons stay in the top strip', pg.evaluate("Array.from(document.querySelectorAll('.strip-social a.soc')).filter(a => a.getBoundingClientRect().width > 0).length") == 2)
    ctx.close(); b.close()
print('ALL PASS' if all(v for _, v in ok) else 'FAILURES: ' + ', '.join(n for n, v in ok if not v), '|', len(ok), 'checks | errors:', errs[:6])
