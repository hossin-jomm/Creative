"""يحوّل تصاميم حقيبة إطلاق الصفحات (designs/*.html) إلى صور JPG جاهزة للرفع.

الاستخدام (من جذر المشروع):  python marketing/launch-kit/render.py
مقاس كل تصميم مكتوب داخله: <meta name="render-size" content="1080x1350">
الناتج في marketing/launch-kit/output/
"""
import re
import subprocess
import sys
import tempfile
import time
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
DESIGNS = HERE / 'designs'
OUT = HERE / 'output'
BROWSERS = [
    Path(r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'),
    Path(r'C:\Program Files\Google\Chrome\Application\chrome.exe'),
]


def find_browser() -> Path:
    for b in BROWSERS:
        if b.exists():
            return b
    sys.exit('Edge or Chrome not found')


def size_of(html: Path) -> tuple[int, int]:
    m = re.search(r'name="render-size" content="(\d+)x(\d+)"', html.read_text(encoding='utf-8'))
    return (int(m.group(1)), int(m.group(2))) if m else (1080, 1080)


def render(browser: Path, html: Path, png: Path, w: int, h: int) -> None:
    for attempt in range(4):
        subprocess.run([
            str(browser), '--headless=new', '--disable-gpu', '--hide-scrollbars',
            '--force-device-scale-factor=1', f'--window-size={w},{h}',
            '--virtual-time-budget=4000', '--allow-file-access-from-files',
            '--no-first-run', '--no-default-browser-check',
            f'--user-data-dir={tempfile.mkdtemp(prefix="render-")}',
            f'--screenshot={png}', html.as_uri(),
        ], check=False, capture_output=True, timeout=120)
        if png.exists():
            return
        time.sleep(2 + attempt * 2)
    sys.exit(f'render failed for {html.name}')


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    browser = find_browser()
    only = sys.argv[1:]  # اختياري: أسماء ملفات محددة
    for html in sorted(DESIGNS.glob('*.html')):
        if only and html.stem not in only:
            continue
        w, h = size_of(html)
        png = OUT / f'{html.stem}.png'
        if png.exists():
            png.unlink()
        render(browser, html, png, w, h)
        Image.open(png).convert('RGB').save(OUT / f'{html.stem}.jpg', quality=92, optimize=True)
        png.unlink()
        print('rendered', html.stem, f'{w}x{h}')


if __name__ == '__main__':
    main()
