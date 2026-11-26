from playwright.sync_api import sync_playwright
from PIL import Image
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    for u,tag in [('http://localhost:8765/pequannock-engine-1/design-1/index.html#join','d1'),('http://localhost:8765/pequannock-engine-1/index.html#join','d2')]:
        pg=b.new_page(viewport={'width':1440,'height':900}, device_scale_factor=2); errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.add_init_script("try{localStorage.setItem('welcome-off:launch','1');sessionStorage.setItem('concept-badge-off','1')}catch(e){}")
        pg.goto(u); pg.wait_for_timeout(1800)
        el=pg.locator('#coat').first; el.scroll_into_view_if_needed(); pg.wait_for_timeout(500); el.screenshot(path='coat_%s_0.png'%tag)
        pg.fill('#coat-name','Daley'); pg.wait_for_timeout(1200); el.screenshot(path='coat_%s_1.png'%tag)
        pg.fill('#coat-name','Fitzsimmons'); pg.wait_for_timeout(1200); el.screenshot(path='coat_%s_2.png'%tag)
        print(tag, errs, pg.evaluate("Array.from(document.querySelectorAll('#coat .coat-name')).map(e => e.textContent + ' ' + (e.getAttribute('textLength')||'-'))"))
        pg.close()
    b.close()
ims=[Image.open('coat_%s_%d.png'%(t,i)).convert('RGB') for t in ['d1','d2'] for i in (0,1,2)]
h=440; ims=[i.resize((round(i.width*h/i.height),h)) for i in ims]
o=Image.new('RGB',(sum(i.width for i in ims)+50,h),'#333'); x=0
for i in ims: o.paste(i,(x,0)); x+=i.width+10
o.save('coats.jpg',quality=88); print(o.size)
