import sys
from playwright.sync_api import sync_playwright
from PIL import Image
U='http://localhost:8765/pequannock-engine-1/design-1/index.html'
init="try{localStorage.setItem('welcome-off:launch','1')}catch(e){}"
STAND=open('/home/claude/larkin-mills-fire/images/rigs/engine-1.jpg','rb').read()
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox']); errs=[]
    def page(w,h,**kw):
        ctx=b.new_context(viewport={'width':w,'height':h}, **kw); pg=ctx.new_page()
        pg.on('pageerror', lambda e: errs.append('PAGEERROR '+str(e))); pg.on('console', lambda m: errs.append(m.text[:160]) if m.type=='error' and 'ERR_' not in m.text and 'wixstatic' not in m.text and 'weather.gov' not in m.text else None)
        pg.route('**/static.wixstatic.com/**', lambda r: r.fulfill(status=200, content_type='image/jpeg', body=STAND)); pg.route('**/api.weather.gov/**', lambda r: r.abort())
        pg.add_init_script(init); return ctx, pg
    for (w,h,tag) in [(1440,900,'a'),(1920,1080,'b'),(1280,720,'c')]:
        ctx,pg=page(w,h); pg.goto(U); pg.wait_for_timeout(2500); pg.screenshot(path='p1_%s.png'%tag)
        if tag=='a':
            pg.evaluate("document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading='eager')"); pg.wait_for_timeout(1500)
            pg.screenshot(path='p1_full.png', full_page=True)
        ctx.close()
    ctx,pg=page(390,844, device_scale_factor=2, has_touch=True, is_mobile=True); pg.goto(U); pg.wait_for_timeout(2500); pg.screenshot(path='p1_m0.png')
    print('phone sideways', pg.evaluate("document.documentElement.scrollWidth > innerWidth"), pg.evaluate("Array.from(document.querySelectorAll('main *')).filter(e => e.getBoundingClientRect().right > innerWidth + 2).slice(0,5).map(e => e.className || e.tagName).join(' | ')"))
    pg.evaluate("document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading='eager')"); pg.wait_for_timeout(1200); pg.screenshot(path='p1_mfull.png', full_page=True); ctx.close(); b.close()
print('errors', errs[:8])
a=[Image.open('p1_%s.png'%t).convert('RGB') for t in 'abc']
o=Image.new('RGB',(960,600+540+540+10),'#333'); o.paste(a[0].resize((960,600)),(0,0)); o.paste(a[1].resize((960,540)),(0,605)); o.paste(a[2].resize((960,540)),(0,1150)); o.save('p1_first.jpg',quality=85)
f=Image.open('p1_full.png').convert('RGB'); f=f.resize((720, round(f.height/2)), Image.LANCZOS); print('full', f.size)
n=(f.height+2399)//2400
for i in range(n): f.crop((0,i*2400,720,min(f.height,(i+1)*2400))).save('p1_full_%d.jpg'%i, quality=78)
m=Image.open('p1_mfull.png').convert('RGB'); m=m.resize((390, round(m.height/2)), Image.LANCZOS); print('mfull', m.size)
cols=(m.height+2599)//2600; o=Image.new('RGB',(400*cols,2600),'#333')
for i in range(cols): o.paste(m.crop((0,i*2600,390,min(m.height,(i+1)*2600))),(i*400,0))
o.save('p1_mfull.jpg',quality=78)
