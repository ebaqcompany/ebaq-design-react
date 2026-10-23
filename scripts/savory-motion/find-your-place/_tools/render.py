"""Render index.html frame-by-frame to PNG, then encode MP4 with ffmpeg.
usage: python3 render.py [--cw COLORWAY] [fps] [out.mp4]   |   python3 render.py [--cw COLORWAY] --stills t1 t2 ...
colorways (Figma 90:1298): waxred-on-blue (default), cream-on-waxred, charcoal-on-cream, cream-on-charcoal"""
import sys, subprocess, pathlib, shutil
from playwright.sync_api import sync_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent

args = sys.argv[1:]
cw = "waxred-on-blue"
if "--cw" in args:
    i = args.index("--cw"); cw = args[i + 1]; del args[i:i + 2]
URL = (ROOT / "index.html").as_uri() + f"?render&cw={cw}"

def page_ctx(p):
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1920, "height": 1080}, device_scale_factor=1)
    pg.goto(URL); pg.wait_for_load_state("networkidle")
    pg.evaluate("document.fonts.ready")
    pg.evaluate("Promise.all([...document.images].map(i => i.decode().catch(()=>0)))")
    if cw not in pg.evaluate("COLORWAYS"): sys.exit(f"unknown colorway {cw}")
    return b, pg

with sync_playwright() as p:
    b, pg = page_ctx(p)
    if args[:1] == ["--stills"]:
        out = ROOT / "_preview"; out.mkdir(exist_ok=True)
        for t in args[1:]:
            pg.evaluate(f"renderAt({t})"); pg.screenshot(path=str(out / f"{cw}-t{float(t):05.2f}.png"))
    else:
        fps = int(args[0]) if len(args) > 0 else 60
        mp4 = pathlib.Path(args[1]) if len(args) > 1 else ROOT / "export" / f"Savory-FindYourPlace-R3-{cw}-1920x1080-{fps}fps.mp4"
        frames = ROOT / f"_frames-{cw}"; shutil.rmtree(frames, ignore_errors=True); frames.mkdir()
        loop = pg.evaluate("LOOP"); n = round(loop * fps)
        for i in range(n):
            pg.evaluate(f"renderAt({i / fps})")
            pg.screenshot(path=str(frames / f"f{i:05d}.png"))
        mp4.parent.mkdir(exist_ok=True)
        # sRGB frames -> BT.709 YUV tagged BT.709 primaries + sRGB transfer (stream + MP4 colr atom), so Chrome and Safari
        # show the Figma hex values; the untagged BT.601 default showed Wax Red #7B0F1E as #831A1E in Chrome.
        color = ("scale=out_color_matrix=bt709:out_range=tv,format=yuv420p,"
                 "setparams=colorspace=bt709:color_primaries=bt709:color_trc=iec61966-2-1:range=tv")
        src = ["ffmpeg", "-loglevel", "error", "-y", "-framerate", str(fps), "-i", str(frames / "f%05d.png"), "-vf", color]
        subprocess.run(src + ["-c:v", "libx264", "-preset", "slow", "-crf", "14", "-movflags", "+faststart+write_colr", str(mp4)], check=True)
        subprocess.run(src + ["-c:v", "libvpx-vp9", "-crf", "20", "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "1",
                              str(mp4.with_suffix(".webm"))], check=True)
        shutil.rmtree(frames)
        print(mp4, mp4.with_suffix(".webm"))
    b.close()
