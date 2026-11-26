"""The popup must come back on every visit until the visitor ticks "Don't show this again"."""
import sys
from playwright.sync_api import sync_playwright
ARGS = ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
def has(pg): return pg.evaluate("!!document.querySelector('dialog.wl[open]')")
def keys(pg): return pg.evaluate("Object.keys(localStorage).filter(k => k.indexOf('welcome') === 0).map(k => k + '=' + localStorage[k]).join(',')")
def out(pg): pg.click('[data-wl-skip]'); pg.wait_for_timeout(1500)
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=ARGS)
    for port, tag in [(8766, 'wml'), (8765, 'lm')]:
        BASE = 'http://localhost:%d/index.html' % port; errs = []; ok = []
        ctx = b.new_context(viewport={'width': 1280, 'height': 860}); pg = ctx.new_page()
        pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        pg.goto(BASE); pg.wait_for_timeout(1500); ok.append(('opens on first visit', has(pg)))
        out(pg); ok.append(('tick box shown, unticked', pg.evaluate("(()=>{var b=document.querySelector('[data-wl-again]'); return !!b && !b.checked && b.getBoundingClientRect().height > 0})()")))
        pg.locator('dialog.wl').screenshot(path='again_%s.png' % tag)
        pg.click('.wl-actions .btn'); pg.wait_for_timeout(300); ok.append(('button closes, nothing stored', (not has(pg)) and keys(pg) == ''))
        for how in ['x', 'esc', 'backdrop', 'link']:
            pg.goto(BASE); pg.wait_for_timeout(1500); opened = has(pg)
            if how == 'x': pg.click('.wl-x')
            elif how == 'esc': pg.keyboard.press('Escape')
            elif how == 'backdrop': pg.mouse.click(6, 6)
            else: out(pg); pg.click('.wl-links a')
            pg.wait_for_timeout(300); ok.append(('comes back, then closed by %s with nothing stored' % how, opened and (not has(pg)) and keys(pg) == ''))
        pg.goto(BASE); pg.wait_for_timeout(1500); out(pg); pg.click('.wl-again'); ticked = pg.evaluate("document.querySelector('[data-wl-again]').checked")
        pg.click('.wl-actions .btn'); pg.wait_for_timeout(300); ok.append(('ticked + closed -> stored', ticked and keys(pg) == 'welcome-off:launch=1'))
        for i in range(2):
            pg.reload(); pg.wait_for_timeout(1700); ok.append(('stays away on later visit %d' % (i + 1), not has(pg)))
        pg.evaluate("document.querySelector('[data-welcome]').scrollIntoView()"); pg.click('[data-welcome]'); pg.wait_for_timeout(500); out(pg)
        ok.append(('footer replay opens with the box ticked', has(pg) and pg.evaluate("document.querySelector('[data-wl-again]').checked")))
        pg.keyboard.press('Escape'); pg.wait_for_timeout(300); ok.append(('replay closed, still off', keys(pg) == 'welcome-off:launch=1'))
        pg.click('[data-welcome]'); pg.wait_for_timeout(500); out(pg); pg.click('.wl-again'); pg.keyboard.press('Escape'); pg.wait_for_timeout(300)
        pg.reload(); pg.wait_for_timeout(1700); ok.append(('unticked on replay -> shows again', keys(pg) == '' and has(pg)))
        ctx.close()
        ctx = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, has_touch=True, is_mobile=True, reduced_motion='reduce'); pg = ctx.new_page()
        pg.goto(BASE); pg.wait_for_timeout(1500); pg.screenshot(path='again_%s_phone.png' % tag)
        r = pg.evaluate("(()=>{var d=document.querySelector('dialog.wl'), r=d.getBoundingClientRect(), b=document.querySelector('.wl-again').getBoundingClientRect(); return [Math.round(r.height), d.scrollHeight - d.clientHeight, Math.round(b.height), document.documentElement.scrollWidth]})()")
        ok.append(('phone, reduced motion: fits (dialog h, inner overflow, tick row h, page w) %s' % r, r[1] == 0 and r[2] >= 44 and r[3] == 390))
        pg.tap('.wl-again'); pg.tap('.wl-actions .btn'); pg.wait_for_timeout(300); ok.append(('phone tap on tick row stores', keys(pg) == 'welcome-off:launch=1'))
        ctx.close()
        print(tag, 'ALL PASS' if all(v for _, v in ok) else 'FAILURES'); [print('   FAIL:', n) for n, v in ok if not v]; print('  ', len(ok), 'checks | errors:', errs[:4])
    b.close()
from PIL import Image
a = [Image.open(f).convert('RGB') for f in ['again_wml.png', 'again_lm.png']]; ph = Image.open('again_wml_phone.png').convert('RGB').resize((390, 844))
o = Image.new('RGB', (a[0].width + a[1].width + 390 + 20, max(a[0].height, a[1].height, 844)), '#333'); o.paste(a[0], (0, 0)); o.paste(a[1], (a[0].width + 10, 0)); o.paste(ph, (a[0].width + a[1].width + 20, 0)); o.save('again.jpg', quality=88)
