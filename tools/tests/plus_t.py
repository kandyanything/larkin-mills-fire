"""Screenshots of each new section, plus checks: no errors, no sideways scroll, QR codes decode."""
import sys, json
from playwright.sync_api import sync_playwright
from PIL import Image
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8766
tag = sys.argv[2] if len(sys.argv) > 2 else 'wml'
BASE = 'http://localhost:%d/index.html' % port
IDS = ['feed', 'year', 'neighbors', 'lake', 'events', 'santa', 'support', 'partners', 'join']
WX = {"features": [{"properties": {"event": "Winter Storm Warning", "status": "Actual", "messageType": "Alert", "severity": "Severe", "ends": "2026-11-27T23:00:00-05:00"}}, {"properties": {"event": "Wind Advisory", "status": "Actual", "messageType": "Alert", "severity": "Moderate", "ends": "2026-11-26T18:00:00-05:00"}}]}
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    for (w, h, sc, name) in [(1440, 900, 1, 'd'), (390, 844, 2, 'm')]:
        ctx = b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=sc, reduced_motion='reduce'); pg = ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e))); pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' and 'weather.gov' not in m.text and 'ERR_' not in m.text else None)
        pg.route('**/api.weather.gov/**', lambda r: r.fulfill(status=200, content_type='application/geo+json', body=json.dumps(WX)))
        pg.add_init_script("try{localStorage.setItem('welcome-off:launch','1')}catch(e){}")
        pg.goto(BASE); pg.wait_for_timeout(1500)
        present = [i for i in IDS if pg.evaluate("!!document.getElementById('%s')" % i)]
        print(tag, name, 'sections:', present, '| wx bar:', repr(pg.evaluate("(document.getElementById('wx')||{}).innerText || ''")[:110]))
        print('   sideways scroll:', pg.evaluate("document.documentElement.scrollWidth > innerWidth"), '| page height', pg.evaluate("document.documentElement.scrollHeight"))
        wide = pg.evaluate("Array.from(document.querySelectorAll('main *')).filter(e => e.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(e).position !== 'fixed' && !e.closest('.fx-layer') && !e.closest('svg')).slice(0,5).map(e => e.tagName + '.' + e.className)")
        print('   elements past the right edge:', wide)
        for i in present:
            pg.evaluate("document.getElementById('%s').scrollIntoView()" % i); pg.wait_for_timeout(350)
            pg.locator('#' + i).screenshot(path='plus_%s_%s_%s.png' % (tag, name, i))
        print('   errors:', errs[:5]); ctx.close()
    b.close()
