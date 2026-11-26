"""Behaviour checks for the extra sections and tools."""
import sys, json, io
import numpy as np, cv2
from playwright.sync_api import sync_playwright
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8766
tag = sys.argv[2] if len(sys.argv) > 2 else 'wml'
BASE = sys.argv[3] if len(sys.argv) > 3 else 'http://localhost:%d/index.html' % port
ok = []
def check(name, cond, extra=''): ok.append((name, bool(cond))); print(('  ok   ' if cond else '  FAIL ') + name + (' | ' + str(extra) if extra != '' else ''))
def decode(png):
    im = cv2.imdecode(np.frombuffer(png, np.uint8), cv2.IMREAD_COLOR)
    val, pts, _ = cv2.QRCodeDetector().detectAndDecode(im); return val
EMPTY = json.dumps({"features": []})
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    ctx = b.new_context(viewport={'width': 1440, 'height': 900}, accept_downloads=True); pg = ctx.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e))); pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' and 'ERR_' not in m.text and 'weather.gov' not in m.text else None)
    mode = {'wx': 'empty'}
    def wx(route):
        if mode['wx'] == 'fail': route.abort()
        else: route.fulfill(status=200, content_type='application/geo+json', body=EMPTY)
    pg.route('**/api.weather.gov/**', wx)
    pg.add_init_script("try{localStorage.setItem('welcome-off:launch','1')}catch(e){}")
    pg.goto(BASE); pg.wait_for_timeout(1500)
    has = lambda sel: pg.evaluate("!!document.querySelector(%s)" % json.dumps(sel))
    lake = has('#lake')

    # --- QR codes
    for text in ['https://x.org/', BASE + '#support', 'https://white-meadow-lake-fire-concept.kandyanything.workers.dev/#support', 'A' * 150 + ' long text to force a large code, with punctuation: é ü']:
        pg.evaluate("t => { var d = document.getElementById('qr-test') || document.body.appendChild(Object.assign(document.createElement('div'), {id:'qr-test'})); d.style.cssText='position:fixed;left:0;top:0;width:420px;z-index:9999;background:#fff'; d.innerHTML = FirePlus.qr(t); }", text)
        got = decode(pg.locator('#qr-test').screenshot())
        check('QR decodes (%d chars)' % len(text), got == text, '' if got == text else repr(got)[:60])
    pg.evaluate("document.getElementById('qr-test').remove()")
    check('QR too long returns nothing', pg.evaluate("FirePlus.qr('x'.repeat(400))") == '')
    pg.evaluate("document.querySelector('.give-qr').scrollIntoView({block:'center'})"); pg.wait_for_timeout(300)
    got = decode(pg.locator('.give-qr .qr').screenshot(scale='css') if False else pg.locator('.give-qr .qr').screenshot())
    if not got:
        pg.evaluate("document.querySelector('.give-qr .qr').style.width='320px'"); got = decode(pg.locator('.give-qr .qr').screenshot()); pg.evaluate("document.querySelector('.give-qr .qr').style.width=''")
    check('fund-drive code opens this page at #support', got == BASE + '#support', got)

    # --- giving
    pg.click('[data-amount="50"]'); pg.click('[data-freq="monthly"]'); pg.wait_for_timeout(100)
    check('monthly label', pg.inner_text('[data-donate] span') == 'Donate $50 a month', pg.inner_text('[data-donate] span'))
    pg.click('[data-amount="100"]'); pg.wait_for_timeout(100); check('amount change keeps monthly', pg.inner_text('[data-donate] span') == 'Donate $100 a month')
    pg.click('[data-freq="once"]'); pg.wait_for_timeout(100); check('one time label', pg.inner_text('[data-donate] span') == 'Donate $100')
    # --- signs
    pg.fill('#sign-no', '1408'); check('sign preview follows the number', pg.inner_text('[data-sign]') == '1408')
    pg.fill('#sign-no', ''); check('sign falls back when empty', pg.inner_text('[data-sign]') == '27')
    pg.click('[data-sign-order]'); check('sign order shows the demo note', pg.is_visible('[data-sign-note]'))
    # --- interest form
    pg.evaluate("document.getElementById('join').scrollIntoView()"); pg.click('[data-open="apply"]'); pg.wait_for_timeout(200)
    check('interest form opens', has('dialog#apply[open]'))
    pg.click('#apply button[type=submit]'); check('empty form asks for name and number', 'Add your name' in pg.inner_text('[data-apply-note]'))
    pg.fill('#apply [name=name]', 'Pat Rivera'); pg.fill('#apply [name=phone]', '973 555 0142'); pg.click('#apply button[type=submit]')
    check('filled form shows the demo confirmation', 'Demo only' in pg.inner_text('[data-apply-note]'))
    pg.locator('#apply').screenshot(path='plus_%s_apply.png' % tag)
    pg.click('#apply .dlg-x'); pg.wait_for_timeout(150); check('interest form closes', not has('dialog#apply[open]'))
    # --- partner report
    pg.evaluate("document.querySelector('[data-open=\"report\"]').scrollIntoView({block:'center'})"); pg.click('[data-open="report"]'); pg.wait_for_timeout(200)
    check('partner report opens with every partner', pg.evaluate("document.querySelectorAll('#report tbody tr').length") == pg.evaluate("window.SITE.partners.wall.filter(w => !w.open).length"))
    pg.locator('#report').screenshot(path='plus_%s_report.png' % tag); pg.keyboard.press('Escape'); pg.wait_for_timeout(150)
    # --- calendar file
    pg.evaluate("document.querySelector('[data-ics]').scrollIntoView({block:'center'})")
    with pg.expect_download() as dl: pg.click('[data-ics="0"]')
    body = open(dl.value.path()).read(); first = pg.evaluate("window.SITE.events.items[0]")
    want = first['date'].replace('-', '').replace(':', '') + '00'
    check('calendar file', body.startswith('BEGIN:VCALENDAR') and ('DTSTART:' + want) in body and 'END:VEVENT' in body and dl.value.suggested_filename.endswith('.ics'), dl.value.suggested_filename + ' ' + [l for l in body.split('\r\n') if l.startswith('DT') or l.startswith('SUMMARY')].__repr__()[:150])
    # --- numbers count up
    pg.evaluate("document.getElementById('year').scrollIntoView({block:'center'})"); pg.wait_for_timeout(2000)
    check('numbers finish on the right totals', pg.evaluate("Array.from(document.querySelectorAll('#year [data-count]')).every(e => e.textContent.replace(/[^0-9]/g,'') === e.getAttribute('data-count'))"), pg.evaluate("Array.from(document.querySelectorAll('#year [data-count]')).map(e => e.textContent).join(' ')"))
    # --- Santa map moves, and holds when motion is paused
    pg.evaluate("document.querySelector('.santa-map').scrollIntoView({block:'center'})"); pg.wait_for_timeout(900)
    a = pg.get_attribute('[data-santa-truck]', 'transform'); pg.wait_for_timeout(900); c = pg.get_attribute('[data-santa-truck]', 'transform')
    check('engine moves on the map', a != c, a + ' -> ' + c)
    pg.evaluate("document.querySelector('[data-still]').click()"); pg.wait_for_timeout(300); a = pg.get_attribute('[data-santa-truck]', 'transform'); pg.wait_for_timeout(800)
    check('engine holds while motion is paused', a == pg.get_attribute('[data-santa-truck]', 'transform'))
    pg.evaluate("document.querySelector('[data-still]').click()"); pg.wait_for_timeout(1900)
    check('engine picks up again', a != pg.get_attribute('[data-santa-truck]', 'transform'))
    # --- weather
    if lake:
        check('no alerts: no banner, line says none', (not pg.is_visible('#wx')) and 'right now: none' in pg.inner_text('[data-wx-line]'), pg.inner_text('[data-wx-line]'))
        mode['wx'] = 'fail'; pg.reload(); pg.wait_for_timeout(1500)
        check('feed down: no banner, plain note', (not pg.is_visible('#wx')) and 'did not answer' in pg.inner_text('[data-wx-line]'))
        mode['wx'] = 'empty'; pg.goto(BASE + '?alert'); pg.wait_for_timeout(1500)
        check('?alert shows a labelled sample', pg.is_visible('#wx') and 'Sample alert' in pg.inner_text('#wx'), pg.inner_text('#wx')[:90])
    # --- the tour
    pg.goto(BASE); pg.wait_for_timeout(1400)
    pg.click('[data-tour]'); pg.wait_for_timeout(400)
    steps = pg.evaluate("window.SITE.tour.steps.length")
    check('tour opens on step 1', pg.inner_text('.tour-count') == '1 of %d' % steps and pg.evaluate("document.activeElement.id") == 'tour-h', pg.inner_text('.tour-count'))
    pg.mouse.move(700, 300); pg.wait_for_timeout(pg.evaluate("window.SITE.tour.seconds") * 1000 + 900)
    check('tour moves on by itself', pg.inner_text('.tour-count').startswith('2 of'), pg.inner_text('.tour-count'))
    sec = pg.evaluate("(() => { var s = document.querySelector('.tour-focus'); return s ? [s.id, Math.round(s.getBoundingClientRect().top)] : null })()")
    check('the section it talks about is in view and ringed', sec and 0 <= sec[1] < 200, sec)
    pg.screenshot(path='plus_%s_tour.png' % tag)
    pg.click('[data-tour-pause]'); t = pg.inner_text('.tour-count'); pg.wait_for_timeout(pg.evaluate("window.SITE.tour.seconds") * 1000 + 600); pg.mouse.move(700, 300)
    check('pause holds the step', pg.inner_text('.tour-count') == t)
    seen = []
    for i in range(steps):
        cur = pg.evaluate("(() => { var s = document.querySelector('.tour-focus'); return s ? s.id : 'end' })()"); seen.append(cur)
        if cur == 'lake': check('lake step shows a sample alert on a quiet day', pg.is_visible('#wx') and 'Sample alert' in pg.inner_text('#wx'))
        if cur == 'partners':
            pg.click('.tour [data-open="report"]'); pg.wait_for_timeout(200); check('tour opens the sample report', has('dialog#report[open]')); pg.keyboard.press('Escape'); pg.wait_for_timeout(200)
            check('closing the report leaves the tour up', has('#tour'))
        if has('[data-tour-next]'): pg.click('[data-tour-next]'); pg.wait_for_timeout(500)
    print('   steps visited:', seen)
    check('last step is the offer', has('.tour--end') and has('.tour-offer') and not has('[data-tour-next]'), pg.inner_text('.tour-offer')[:160].replace('\n', ' / '))
    pg.evaluate("document.querySelector('.tour-end .qr').style.width='300px'"); got = decode(pg.locator('.tour-end .qr').screenshot())
    check('tour code opens this page', got == BASE, got)
    pg.evaluate("document.querySelector('.tour-end .qr').style.width=''"); pg.screenshot(path='plus_%s_tour_end.png' % tag)
    pg.click('.tour-nav [data-tour-close]'); pg.wait_for_timeout(200); check('finish closes the tour and clears the ring and the sample alert', (not has('#tour')) and (not has('.tour-focus')) and (not lake or not pg.is_visible('#wx')))
    pg.goto(BASE + '?tour'); pg.wait_for_timeout(1500); check('?tour starts the tour and skips the welcome', has('#tour') and not has('dialog.wl'))
    pg.keyboard.press('Escape'); pg.wait_for_timeout(200); check('Esc ends the tour', not has('#tour'))
    ctx.close()
    # phone
    ctx = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, has_touch=True, is_mobile=True); pg = ctx.new_page()
    pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e)))
    pg.route('**/api.weather.gov/**', lambda r: r.fulfill(status=200, content_type='application/geo+json', body=EMPTY))
    pg.add_init_script("try{localStorage.setItem('welcome-off:launch','1')}catch(e){}")
    pg.goto(BASE); pg.wait_for_timeout(1400); pg.screenshot(path='plus_%s_phone_badge.png' % tag)
    pg.tap('[data-tour]'); pg.wait_for_timeout(700); pg.tap('[data-tour-next]'); pg.wait_for_timeout(900)
    r = pg.evaluate("(() => { var t = document.getElementById('tour').getBoundingClientRect(), m = document.querySelector('.mbar').getBoundingClientRect(); return [Math.round(t.left), Math.round(t.right), Math.round(t.bottom), Math.round(m.top)] })()")
    check('phone: tour card sits above the bottom bar, inside the screen', r[0] >= 0 and r[1] <= 390 and r[2] <= r[3], r)
    pg.screenshot(path='plus_%s_phone_tour.png' % tag)
    pg.wait_for_timeout(pg.evaluate("window.SITE.tour.seconds") * 1000 + 800); check('phone: tour keeps moving after a tap', pg.inner_text('.tour-count').startswith('3 of'), pg.inner_text('.tour-count'))
    ctx.close(); b.close()
print(tag, 'ALL PASS' if all(v for _, v in ok) else 'FAILURES: ' + ', '.join(n for n, v in ok if not v), '|', len(ok), 'checks | errors:', errs[:5])
