import os
from playwright.sync_api import sync_playwright
h=os.path.abspath("guide.html")
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":720,"height":1280})
    pg.goto("file://"+h);pg.evaluate("document.fonts.ready");pg.wait_for_timeout(500)
    pg.pdf(path="guide.pdf",width="720px",height="1280px",print_background=True,prefer_css_page_size=True)
    b.close()
