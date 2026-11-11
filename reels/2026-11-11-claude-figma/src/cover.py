import os
from playwright.sync_api import sync_playwright
here=os.path.dirname(os.path.abspath(__file__))
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":1080,"height":1920})
    pg.goto("file://"+here+"/cover.html");pg.evaluate("document.fonts.ready");pg.wait_for_timeout(400)
    pg.screenshot(path=here+"/../cover.png");b.close()
