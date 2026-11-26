"""Behaviour checks for design 2 (firehouse front, bays)."""
import json
from playwright.sync_api import sync_playwright
from PIL import Image
URL = 'http://localhost:8765/design-2/index.html'
ARGS = ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
ok = []
def check(n, c, x=''): ok.append((n, bool(c))); print(('  ok   ' if c else '  FAIL ') + n + (' | ' + str(x) if x != '' else ''))
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=ARGS); errs = []
    def page(w=1440, h=900, seen=True, **kw):
        ctx = b.new_context(viewport={'width': w, 'height': h}, **kw); pg = ctx.new_page()
        pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e))); pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        if seen: pg.add_init_script("try{localStorage.setItem('welcome-off:launch','1')}catch(e){}")
        return ctx, pg
    has = lambda pg, sel: pg.evaluate("!!document.querySelector(%s)" % json.dumps(sel))
    bay = lambda pg: pg.evaluate("Array.from(document.querySelectorAll('.bay')).filter(b => !b.hidden).map(b => b.getAttribute('data-bay')).join()")
    up = lambda pg: pg.evaluate("Array.from(document.querySelectorAll('.bdoor')).findIndex(d => d.classList.contains('is-up'))")
    ctx, pg = page(seen=False); pg.goto(URL); pg.wait_for_timeout(1700)
    check('first visit: welcome opens, doors wait', has(pg, 'dialog.wl[open]') and has(pg, '.house.is-waiting'))
    pg.click('[data-wl-skip]'); pg.wait_for_timeout(1700); pg.click('.wl-actions .btn'); pg.wait_for_timeout(300)
    check('closing the welcome stirs the doors', has(pg, '.house.is-hint')); ctx.close()
    ctx, pg = page(); pg.goto(URL); pg.wait_for_timeout(2800)
    check('home is the only bay showing', bay(pg) == 'home')
    r = pg.evaluate("[Math.round(document.querySelector('.hero3').getBoundingClientRect().bottom), innerHeight]"); check('the firehouse and headline fit the first screen', r[0] <= r[1], r)
    names = ['rigs', 'people', 'events', 'give', 'join']
    for i in [0, 4]:
        bx = pg.locator('.bdoor').nth(i).bounding_box(); pg.mouse.move(bx['x'] + bx['width'] / 2, bx['y'] + bx['height'] / 2); pg.wait_for_timeout(950)
        t = pg.evaluate("(() => { var d = document.querySelectorAll('.bdoor')[%d], s = d.querySelector('.bdoor-shut').getBoundingClientRect(), r = d.getBoundingClientRect(); return [Math.round(r.top - s.top), Math.round(r.height)] })()" % i)
        check('pointing lifts the %s door' % names[i], up(pg) == i and t[0] > t[1] * 0.85, t)
    pg.screenshot(path='v2_join_up.png')
    pg.mouse.move(700, 250); pg.wait_for_timeout(300); check('door stays up while the pointer is on the building', up(pg) == 4)
    pg.mouse.move(700, 150); pg.wait_for_timeout(300); check('door drops when the pointer leaves the building', up(pg) == -1)
    pg.keyboard.press('Tab'); pg.evaluate("document.querySelectorAll('.bdoor')[2].focus()"); pg.wait_for_timeout(200); check('keyboard focus lifts a door', up(pg) == 2)
    pg.keyboard.press('Enter'); pg.wait_for_timeout(500); check('Enter goes into that bay, at the top', bay(pg) == 'events' and pg.evaluate("scrollY") == 0 and pg.url.endswith('#events'))
    check('the bay shows its sections and the small doors', pg.is_visible('#events') and pg.is_visible('#santa') and pg.is_visible('#feed') and pg.evaluate("document.querySelector('.bay:not([hidden]) .bay-nav a[aria-current]').textContent").strip().endswith('Events'))
    pg.click('.nav a[href="#officers"]'); pg.wait_for_timeout(400); check('header menu switches bays and marks the current one', bay(pg) == 'people' and pg.get_attribute('.nav a[href="#officers"]', 'aria-current') == 'page')
    pg.click('.site-footer a[href="#partners"]'); pg.wait_for_timeout(600)
    check('a link to a section deep in another bay opens it there', bay(pg) == 'give' and abs(pg.evaluate("document.getElementById('partners').getBoundingClientRect().top")) < 140, pg.evaluate("Math.round(document.getElementById('partners').getBoundingClientRect().top)"))
    pg.go_back(); pg.wait_for_timeout(400); check('the back button returns to the last bay', bay(pg) == 'people')
    pg.click('.brand'); pg.wait_for_timeout(400); check('the name in the header goes back to the front of the house', bay(pg) == 'home')
    pg.evaluate("document.getElementById('help').scrollIntoView()"); pg.fill('#finder-q', 'beeping'); check('finder still works', pg.evaluate("Array.from(document.querySelectorAll('.finder-list .task')).filter(l => !l.hidden).length") == 1)
    pg.click('.finder-list .task:not([hidden]) a'); pg.wait_for_timeout(500); check('a request link lands on the contact form with the topic set', pg.evaluate("document.getElementById('topic').value") == 'Smoke alarm request' and bay(pg) == 'home')
    pg.goto(URL + '#join'); pg.wait_for_timeout(1200); check('a shared link to a bay opens that bay', bay(pg) == 'join')
    pg.fill('#coat-name', 'Okonkwo'); pg.wait_for_timeout(1300); check('name goes on the coat', pg.evaluate("document.querySelector('.gear-letters textPath').textContent") == 'Okonkwo' and has(pg, '.gear.is-zoomed'))
    ctx.close()
    ctx, pg = page(); pg.goto(URL + '?tour'); pg.wait_for_timeout(1500); seen = []
    for i in range(9):
        seen.append(bay(pg) + ':' + pg.evaluate("(document.querySelector('.tour-focus')||{id:'end'}).id"))
        if has(pg, '[data-tour-next]'): pg.click('[data-tour-next]'); pg.wait_for_timeout(700)
    check('the tour walks from bay to bay', seen == ['home:top', 'events:feed', 'people:year', 'join:join', 'join:neighbors', 'events:santa', 'give:support', 'give:partners', 'give:end'], seen)
    ctx.close()
    ctx, pg = page(seen=False, reduced_motion='reduce'); pg.goto(URL); pg.wait_for_timeout(1300); check('reduced motion: no door hint, still welcome', has(pg, 'dialog.wl.is-static') and not has(pg, '.house.is-hint')); ctx.close()
    ctx, pg = page(390, 844, device_scale_factor=2, has_touch=True, is_mobile=True); pg.goto(URL); pg.wait_for_timeout(2600); pg.screenshot(path='v2_m_home.png')
    check('phone: the building is shown large and pans sideways', pg.evaluate("document.querySelector('.house-scroll').scrollWidth > 600") and not pg.evaluate("document.documentElement.scrollWidth > innerWidth"))
    pg.evaluate("document.querySelector('.house-scroll').scrollLeft = 150"); pg.wait_for_timeout(200)
    pg.tap('.bdoor[data-bdoor="0"]'); pg.wait_for_timeout(900); check('phone: first tap lifts the door and stays on the page', up(pg) == 0 and bay(pg) == 'home' and 'Rigs' in pg.inner_text('.house-cap'), pg.inner_text('.house-cap')[:60])
    pg.screenshot(path='v2_m_up.png')
    pg.tap('.bdoor[data-bdoor="0"]'); pg.wait_for_timeout(600); check('phone: second tap goes in', bay(pg) == 'rigs')
    pg.screenshot(path='v2_m_rigs.png'); pg.tap('.nav-toggle'); pg.wait_for_timeout(300); pg.screenshot(path='v2_m_menu.png')
    check('phone: no sideways scroll in a bay', not pg.evaluate("document.documentElement.scrollWidth > innerWidth")); ctx.close()
    b.close()
print('ALL PASS' if all(v for _, v in ok) else 'FAILURES: ' + ', '.join(n for n, v in ok if not v), '|', len(ok), 'checks | errors:', errs[:6])
ims=[Image.open('v2_m_%s.png'%n).convert('RGB').resize((390,844)) for n in ['home','up','rigs','menu']]
o=Image.new('RGB',(400*4-10,844),'#333')
for i,im in enumerate(ims): o.paste(im,(i*400,0))
o.save('v2_m.jpg',quality=86)
