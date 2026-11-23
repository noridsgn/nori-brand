# python3 shoot.py test 0.5 3.9 ... (-> t_T.png)  |  python3 shoot.py all OUTDIR
import sys, os, json
from playwright.sync_api import sync_playwright
here = os.path.dirname(os.path.abspath(__file__))
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome"); pg = b.new_page(viewport={"width": 1080, "height": 1920})
    pg.goto("file://" + here + "/reel.html"); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(500)
    if sys.argv[1] == "test":
        for t in map(float, sys.argv[2:]):
            pg.evaluate("t=>frame(t)", t); pg.screenshot(path=f"{here}/o_{t}.png", omit_background=True)
    else:
        out = sys.argv[2]; os.makedirs(out, exist_ok=True)
        n = int(round(json.load(open(here + "/data.json"))["dur"] * 30))
        for i in range(n):
            pg.evaluate("t=>frame(t)", i / 30); pg.screenshot(path=f"{out}/o{i:05d}.png", omit_background=True)
        print("frames", n)
    b.close()
