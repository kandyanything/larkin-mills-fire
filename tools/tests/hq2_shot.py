from playwright.sync_api import sync_playwright
from PIL import Image
U='http://localhost:8765/design-2/index.html'
init="try{localStorage.setItem('welcome-off:launch','1')}catch(e){}"
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    for (w,h,tag) in [(1440,900,'a'),(1920,1080,'b'),(1280,720,'c')]:
        pg=b.new_page(viewport={'width':w,'height':h}); pg.add_init_script(init); pg.goto(U); pg.wait_for_timeout(2600)
        if tag=='a': pg.screenshot(path='hq2_shut.png')
        bx=pg.locator('.bdoor').nth(0 if tag!='b' else 4).bounding_box(); pg.mouse.move(bx['x']+bx['width']/2, bx['y']+bx['height']/2); pg.wait_for_timeout(1000); pg.screenshot(path='hq2_%s.png'%tag)
        print(tag, 'hero bottom', pg.evaluate("[Math.round(document.querySelector('.hero3').getBoundingClientRect().bottom), innerHeight, Math.round(document.querySelector('.house').getBoundingClientRect().width), Math.round(document.querySelector('h1').getBoundingClientRect().top), Math.round(document.querySelector('.bdoor').getBoundingClientRect().bottom)]")); pg.close()
    ctx=b.new_context(viewport={'width':390,'height':844}, device_scale_factor=2, has_touch=True, is_mobile=True); pg=ctx.new_page(); pg.add_init_script(init); pg.goto(U); pg.wait_for_timeout(2600); pg.screenshot(path='hq2_m0.png')
    pg.tap('.bdoor[data-bdoor="1"]'); pg.wait_for_timeout(1000); pg.screenshot(path='hq2_m1.png'); b.close()
a=[Image.open('hq2_%s.png'%t).convert('RGB').resize((960,600)) for t in ['shut','a']]; o=Image.new('RGB',(960,1205),'#333'); o.paste(a[0],(0,0)); o.paste(a[1],(0,605)); o.save('hq2_desk.jpg',quality=85)
b_=Image.open('hq2_b.png').convert('RGB').resize((960,540)); c=Image.open('hq2_c.png').convert('RGB').resize((960,540)); o=Image.new('RGB',(960,1085),'#333'); o.paste(b_,(0,0)); o.paste(c,(0,545)); o.save('hq2_desk2.jpg',quality=85)
m=[Image.open(f).convert('RGB').resize((390,844)) for f in ['hq2_m0.png','hq2_m1.png']]; o=Image.new('RGB',(790,844),'#333'); o.paste(m[0],(0,0)); o.paste(m[1],(400,0)); o.save('hq2_m.jpg',quality=86)
