import sys
from playwright.sync_api import sync_playwright
from PIL import Image
U='http://localhost:8765/pequannock-engine-1/index.html'
init="try{localStorage.setItem('welcome-off:launch','1')}catch(e){}"
remote = len(sys.argv) > 1 and sys.argv[1] == 'remote'
def route(pg):
    if remote: pg.route('**/static.wixstatic.com/**', lambda r: r.fulfill(status=200, content_type='image/jpeg', body=open('/home/claude/larkin-mills-fire/design-2/images/rigs/engine-1.jpg','rb').read()))
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox']); errs=[]
    for (w,h,tag) in [(1440,900,'a'),(1920,1080,'b'),(1280,720,'c')]:
        pg=b.new_page(viewport={'width':w,'height':h}); pg.on('pageerror', lambda e: errs.append('PAGEERROR '+str(e))); pg.on('console', lambda m: errs.append(m.text[:160]) if m.type=='error' and 'wixstatic' not in m.text and 'ERR_' not in m.text else None)
        route(pg); pg.add_init_script(init); pg.goto(U); pg.wait_for_timeout(2600)
        if tag=='a': pg.screenshot(path='peq_shut.png')
        bx=pg.locator('.bdoor').nth(1 if tag=='a' else 3).bounding_box(); pg.mouse.move(bx['x']+bx['width']/2, bx['y']+bx['height']/2); pg.wait_for_timeout(1000); pg.screenshot(path='peq_%s.png'%tag)
        print(tag, pg.evaluate("JSON.stringify({heroBottom: Math.round(document.querySelector('.hero3').getBoundingClientRect().bottom), vh: innerHeight, house: Math.round(document.querySelector('.house').getBoundingClientRect().width), sideways: document.documentElement.scrollWidth > innerWidth})"))
        if tag=='a':
            for bay in ['join','apparatus','officers','events','support']:
                pg.goto(U+'#'+bay); pg.wait_for_timeout(900); pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(1500); pg.screenshot(path='peq_bay_%s.png'%bay, full_page=True)
            pg.goto(U); pg.wait_for_timeout(1500); pg.screenshot(path='peq_home_full.png', full_page=True)
        pg.close()
    ctx=b.new_context(viewport={'width':390,'height':844}, device_scale_factor=2, has_touch=True, is_mobile=True); pg=ctx.new_page(); route(pg); pg.add_init_script(init); pg.goto(U); pg.wait_for_timeout(2600); pg.screenshot(path='peq_m0.png')
    pg.tap('.bdoor[data-bdoor="1"]'); pg.wait_for_timeout(1000); pg.screenshot(path='peq_m1.png'); print('phone sideways', pg.evaluate("document.documentElement.scrollWidth > innerWidth")); b.close()
print('errors:', errs[:8])
a=[Image.open('peq_%s.png'%t).convert('RGB').resize((960,600)) for t in ['shut','a']]; o=Image.new('RGB',(960,1205),'#333'); o.paste(a[0],(0,0)); o.paste(a[1],(0,605)); o.save('peq_desk.jpg',quality=85)
b_=Image.open('peq_b.png').convert('RGB').resize((960,540)); c=Image.open('peq_c.png').convert('RGB').resize((960,540)); o=Image.new('RGB',(960,1085),'#333'); o.paste(b_,(0,0)); o.paste(c,(0,545)); o.save('peq_desk2.jpg',quality=85)
m=[Image.open(f).convert('RGB').resize((390,844)) for f in ['peq_m0.png','peq_m1.png']]; o=Image.new('RGB',(790,844),'#333'); o.paste(m[0],(0,0)); o.paste(m[1],(400,0)); o.save('peq_m.jpg',quality=86)
for n in ['home_full','bay_join','bay_apparatus','bay_officers','bay_events','bay_support']:
    i=Image.open('peq_%s.png'%n).convert('RGB'); i=i.resize((720, round(i.height/2)), Image.LANCZOS); i.save('peq_%s.jpg'%n, quality=80); print(n, i.size)
