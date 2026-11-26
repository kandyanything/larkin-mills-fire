"""Repeatable capture of the welcome: the page clock is driven by the test, so each frame is an exact moment."""
import sys
from playwright.sync_api import sync_playwright
from PIL import Image
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8766/index.html?welcome=1'
out = sys.argv[2] if len(sys.argv) > 2 else 'wl'
vw, vh = (int(sys.argv[3]), int(sys.argv[4])) if len(sys.argv) > 4 else (1280, 860)
times = [float(x) for x in sys.argv[5].split(',')] if len(sys.argv) > 5 else [0.5, 1.3, 2.0, 2.5, 3.0, 3.6, 4.2, 4.8, 5.4, 6.2, 7.2, 9.0]
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'])
    pg = b.new_page(viewport={'width': vw, 'height': vh}); msgs = []
    pg.on('console', lambda m: msgs.append(m.type + ': ' + m.text) if m.type in ('error', 'warning') else None)
    pg.on('pageerror', lambda e: msgs.append('PAGEERROR: ' + str(e)))
    # the test owns animation time: frames only advance when it steps them
    pg.add_init_script('''(() => { let T = 0, q = []; Object.defineProperty(performance, "now", { value: () => T });
      window.requestAnimationFrame = cb => { q.push(cb); return q.length; }; window.cancelAnimationFrame = () => {};
      window.__step = ms => { const end = T + ms; while (T < end - 1e-6) { T += 1000 / 60; const c = q.splice(0); c.forEach(f => { try { f(T); } catch (e) { console.error(String(e)); } }); } }; })()''')
    pg.goto(URL); pg.wait_for_timeout(1500)
    print('dialog open:', pg.evaluate("!!document.querySelector('dialog.wl[open]')"), '| webgl:', pg.evaluate("(()=>{var c=document.querySelector('.wl-fire'); return c ? (c.style.display!=='none') : 'no canvas'})()"))
    frames = []; now = 0.0
    cw, ch = min(vw, 620), min(vh, 860)
    for i, t in enumerate(times):
        pg.evaluate('ms => window.__step(ms)', (t - now) * 1000); now = t; pg.wait_for_timeout(1800 if i == len(times) - 1 else 350)
        pg.screenshot(path='%s_%02d.png' % (out, i), clip={'x': (vw - cw) / 2, 'y': (vh - ch) / 2, 'width': cw, 'height': ch}); frames.append(Image.open('%s_%02d.png' % (out, i)).convert('RGB'))
        print('t=%.1f' % t, pg.evaluate("(()=>{var d=document.querySelector('dialog.wl'); return d ? [d.getAttribute('data-phase')||'burn', 'left', d.getAttribute('data-left'), 'heat', d.style.getPropertyValue('--heat')].join(' ') : 'closed'})()"))
    cols = 4 if len(frames) > 6 else 3; rows = (len(frames) + cols - 1) // cols
    w, h = frames[0].size; o = Image.new('RGB', (w * cols + 10 * (cols - 1), h * rows + 10 * (rows - 1)), '#333')
    for i, f in enumerate(frames): o.paste(f, ((i % cols) * (w + 10), (i // cols) * (h + 10)))
    if o.width > 2000: o = o.resize((2000, round(o.height * 2000 / o.width)), Image.LANCZOS)
    o.save(out + '_strip.jpg', quality=86); print(o.size)
    for m in [m for m in msgs if 'google' not in m and 'GPU stall' not in m][:8]: print(m)
    b.close()
