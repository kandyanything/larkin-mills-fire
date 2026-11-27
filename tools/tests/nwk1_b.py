"""Newark Fire Division concept, design 1 (one long page, newark-fire/design-1/), and the links between
the two designs. Run with the repo served on 8765. Requests to newarkpublicsafety.org are blocked, as
they are from a Claude workspace, so the stand-in pictures show."""
import json
from playwright.sync_api import sync_playwright
URL = 'http://localhost:8765/newark-fire/design-1/index.html'
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
    shown = lambda pg: pg.evaluate("Array.from(document.querySelectorAll('.sta-list .sta')).filter(l => !l.hidden).map(l => l.querySelector('h3').textContent)")

    ctx, pg = page(seen=False); pg.goto(URL); pg.wait_for_timeout(1900)
    check('first visit: welcome opens with the fire running', has(pg, 'dialog.wl[open]') and not has(pg, 'dialog.wl.is-static'))
    check('welcome burns the division emblem and carries the concept note', pg.evaluate("document.querySelector('.wl-badge img').getAttribute('src')").endswith('emblem.png') and 'Website concept' in pg.inner_text('dialog.wl'))
    pg.screenshot(path='nwk1_welcome.png')
    pg.evaluate("document.querySelector('[data-wl-skip]').click()"); pg.wait_for_timeout(1700); pg.check('dialog.wl input[type=checkbox]'); pg.click('.wl-actions .btn'); pg.wait_for_timeout(300)
    pg.reload(); pg.wait_for_timeout(1500); check("ticking don't-show keeps it closed next visit", not has(pg, 'dialog.wl[open]')); ctx.close()

    ctx, pg = page(); pg.goto(URL); pg.wait_for_timeout(2500)
    check('title and robots say concept', pg.title().startswith('Newark Fire Division') and 'website concept' in pg.title() and pg.get_attribute('meta[name=robots]', 'content').startswith('noindex'))
    menu = pg.evaluate("Array.from(document.querySelectorAll('.nav a')).map(a => a.textContent.trim())")
    check('menu comes from the data, no Events or Support us', menu[:7] == ['Firehouses', 'Careers', 'Companies', 'Leadership', 'Safety', 'History', 'Contact'], menu)
    check('header button finds a firehouse', pg.inner_text('.site-header .btn') == 'Find your firehouse')
    body = pg.evaluate("document.body.innerText")
    check('no donations, no volunteer wording, nothing left from Pequannock', not any(w in body for w in ['Donate', 'Pequannock', 'Turkey', 'volunteer hours', 'Fund Drive']), [w for w in ['Donate', 'Pequannock', 'Turkey', 'volunteer hours', 'Fund Drive'] if w in body])
    r = pg.evaluate("[Math.round(document.querySelector('.hero').getBoundingClientRect().bottom), innerHeight, Math.round(document.querySelector('.hero-pic img').getBoundingClientRect().right), Math.round(document.querySelector('.hero--split h1').getBoundingClientRect().left)]")
    check('hero: the rendering and headline fit the first screen, side by side', r[0] <= r[1] and r[2] <= r[3], r)
    check('16 firehouse cards and the offices', len(shown(pg)) == 16 and pg.locator('.sta-offices li').count() == 4)
    pg.fill('#sta-q', 'Ladder 5'); pg.wait_for_timeout(200); n = shown(pg); check('firehouse search: "Ladder 5" finds only Engine 10 and Ladder 5', n == ['Engine 10 and Ladder 5'], n)
    pg.fill('#sta-q', 'vailsburg'); pg.wait_for_timeout(200); n = shown(pg); check('firehouse search: Vailsburg finds Engine 26', n == ['Engine 26 and Ladder 12'], n); pg.fill('#sta-q', '')
    pg.click('.rig-tab[data-rig="3"]'); pg.wait_for_timeout(300); check('company tabs switch, with photos', 'Fireboat 1' in pg.inner_text('#rig-panel') and pg.locator('.rig-tab').count() == 4 and pg.evaluate("(() => { var i = document.querySelector('#rig-panel img'); return !!i && i.getAttribute('src').endsWith('fireboat-1.jpg') })()"))
    pg.fill('#coat-name', 'Ortiz'); pg.wait_for_timeout(600); check('name goes on the drawn coat', 'Ortiz' in pg.inner_html('#coat'))
    pg.click('[data-open="apply"]'); pg.wait_for_timeout(200); check('interest form opens and says it is not an application', has(pg, '#apply[open]') and 'Civil Service' in pg.inner_text('#apply')); pg.keyboard.press('Escape')
    pg.evaluate("document.querySelector('[data-open=\"report\"]').scrollIntoView({block:'center'})"); pg.click('[data-open="report"]'); pg.wait_for_timeout(200)
    check('sample report uses invented businesses only', 'Example Hardware' in pg.inner_text('#report')); pg.keyboard.press('Escape')
    check('leadership: the chief and four staff', 'Del Ortiz' in pg.inner_text('#officers') and all(nm in pg.inner_text('#officers') for nm in ['Emanuel Miranda, Sr.', 'Mark Furka', 'Philip Alfano IV', 'Kenya E. Dunham']))
    check('history: timeline, chiefs and honor roll', pg.locator('#history .timeline li').count() == 18 and pg.locator('.chiefs li').count() == 9 and pg.locator('#members .roll li').count() == 14)
    check('safety, prevention and ways to help are there', all(has(pg, '#' + x) for x in ['safety', 'prevention', 'community']))
    tags = pg.evaluate("Array.from(document.querySelectorAll('.sample-tag')).map(t => t.closest('section') && t.closest('section').id).filter(Boolean)"); check('every placeholder section is tagged', set(tags) >= {'calls', 'apparatus', 'join', 'photos', 'members', 'partners', 'contact'}, sorted(set(tags)))
    pg.evaluate("document.getElementById('officers').scrollIntoView()"); pg.wait_for_timeout(1500)
    fell = pg.evaluate("Array.from(document.querySelectorAll('#officers img')).filter(i => /^http|photo-missing/.test(i.getAttribute('src'))).map(i => i.getAttribute('data-fell'))"); check('leadership photos that cannot load show the stand-in', fell and all(f == '1' for f in fell), fell)
    pg.click('[data-badge-close]'); pg.wait_for_timeout(200); check('the concept label closes', not has(pg, '#concept-badge'))
    pg.evaluate("window.scrollTo(0,0)"); pg.click('.sample-bar a.tour-go'); pg.wait_for_timeout(1500)
    check('"See design 2" opens design 2', pg.url.rstrip('/').endswith('newark-fire') and has(pg, '.house') and pg.title().startswith('Newark Fire Division'), pg.url)
    pg.click('.sample-bar a.tour-go'); pg.wait_for_timeout(1500); check('"See design 1" comes back', pg.url.rstrip('/').endswith('design-1') and has(pg, '.sta-list'), pg.url)
    ctx.close()

    ctx, pg = page(); pg.goto(URL + '?tour'); pg.wait_for_timeout(1500); seen = []
    for i in range(9):
        seen.append(pg.evaluate("(document.querySelector('.tour-focus')||{id:'end'}).id"))
        if has(pg, '[data-tour-next]'): pg.click('[data-tour-next]'); pg.wait_for_timeout(900)
    check('the tour walks the page', seen[:8] == ['top', 'stations', 'join', 'officers', 'history', 'safety', 'partners', 'end'], seen)
    ctx.close()
    ctx, pg = page(seen=False, reduced_motion='reduce'); pg.goto(URL); pg.wait_for_timeout(1300); check('reduced motion: still welcome, nothing moving', has(pg, 'dialog.wl.is-static')); ctx.close()
    ctx, pg = page(390, 844, device_scale_factor=2, has_touch=True, is_mobile=True); pg.goto(URL); pg.wait_for_timeout(2500)
    check('phone: no sideways scroll', not pg.evaluate("document.documentElement.scrollWidth > innerWidth"), pg.evaluate("Array.from(document.querySelectorAll('main *')).filter(e => e.getBoundingClientRect().right > innerWidth + 2).slice(0,4).map(e => e.className || e.tagName).join(' | ')"))
    pg.screenshot(path='nwk1_m_home.png')
    pg.tap('.nav-toggle'); pg.wait_for_timeout(300); check('phone: menu opens', pg.is_visible('.nav a[href="#stations"]'))
    ctx.close()
    ctx, pg = page(1280, 720); pg.goto(URL); pg.wait_for_timeout(1500); r = pg.evaluate("[Math.round(document.querySelector('.hero').getBoundingClientRect().bottom), innerHeight]"); check('1280x720: hero fits', r[0] <= r[1], r); ctx.close()
    # dark theme: same page, every section on a dark background, text readable, the switch both ways
    JS = open(__file__.replace('nwk1_b.py', 'contrast_js.txt')).read()
    ctx, pg = page(); pg.goto(URL + '?theme=dark'); pg.wait_for_timeout(2000)
    check('dark theme: set from the address', pg.evaluate("document.documentElement.getAttribute('data-theme')") == 'dark')
    light = pg.evaluate("""(() => { function lum(s) { var p = s.match(/[0-9.]+/g).map(Number); return (.2126 * p[0] + .7152 * p[1] + .0722 * p[2]) / 255; }
      return Array.from(document.querySelectorAll('main > section, .site-header, .site-footer')).filter(function (el) { var c = getComputedStyle(el).backgroundColor; return c !== 'rgba(0, 0, 0, 0)' && lum(c) > .3; }).map(function (el) { return el.id || el.className; }); })()""")
    check('dark theme: no light sections left', not light, light)
    check('dark theme: same content as light', pg.locator('main > section').count() == pg.evaluate("document.querySelectorAll('main > section').length") and pg.locator('.sta-list .sta').count() == 16 and pg.locator('#history .timeline li').count() == 18)
    bad = pg.evaluate(JS); check('dark theme: every piece of text has readable contrast', not bad, bad[:4])
    pg.screenshot(path='nwk1_dark_top.png')
    pg.click('.sample-bar a.theme-go'); pg.wait_for_timeout(1500)
    check('the concept bar switches to the light theme and back', pg.evaluate("document.documentElement.getAttribute('data-theme')") == 'light' and 'dark theme' in pg.inner_text('.sample-bar a.theme-go'))
    ctx.close()
    ctx, pg = page(390, 844, device_scale_factor=2, has_touch=True, is_mobile=True); pg.goto(URL + '?theme=dark'); pg.wait_for_timeout(2200)
    check('dark theme, phone: no sideways scroll', not pg.evaluate("document.documentElement.scrollWidth > innerWidth"))
    pg.tap('.nav-toggle'); pg.wait_for_timeout(300)
    check('dark theme, phone: the open menu is dark', pg.evaluate("(() => { var p = getComputedStyle(document.querySelector('.nav')).backgroundColor.match(/[0-9.]+/g).map(Number); return (.2126 * p[0] + .7152 * p[1] + .0722 * p[2]) / 255 < .3 })()"))
    pg.screenshot(path='nwk1_dark_phone.png'); ctx.close()
    b.close()
print('ALL PASS' if all(v for _, v in ok) else 'FAILURES: ' + ', '.join(n for n, v in ok if not v), '|', len(ok), 'checks | errors:', errs[:6])
