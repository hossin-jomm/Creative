"""يحوّل تصاميم HTML في هذا المجلد إلى صور PNG للمعرض.

الاستخدام (من جذر المشروع):  python design/portfolio-samples/render.py
الناتج: public/portfolio/<name>.jpg (1080x1080) و public/portfolio/<name>-thumb.jpg (1280x720)
يحتاج Microsoft Edge أو Google Chrome، ومكتبة Pillow.
"""
import subprocess
import sys
import tempfile
import time
from pathlib import Path

from PIL import Image, ImageFilter, ImageEnhance

HERE = Path(__file__).resolve().parent
OUT = HERE.parent.parent / 'public' / 'portfolio'
BROWSERS = [
    Path(r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'),
    Path(r'C:\Program Files\Google\Chrome\Application\chrome.exe'),
]


def find_browser() -> Path:
    for b in BROWSERS:
        if b.exists():
            return b
    sys.exit('Edge or Chrome not found')


def render(browser: Path, html: Path, png: Path) -> None:
    for attempt in range(4):
        subprocess.run([
            str(browser), '--headless=new', '--disable-gpu', '--hide-scrollbars',
            '--force-device-scale-factor=1', '--window-size=1080,1080',
            '--virtual-time-budget=4000', '--allow-file-access-from-files',
            '--no-first-run', '--no-default-browser-check',
            f'--user-data-dir={tempfile.mkdtemp(prefix="render-")}',
            f'--screenshot={png}', html.as_uri(),
        ], check=False, capture_output=True, timeout=120)
        if png.exists():
            return
        time.sleep(2 + attempt * 2)
    sys.exit(f'render failed for {html.name}')


def make_thumb(src: Path, dst: Path) -> None:
    """صورة 16:9 للبطاقة: التصميم كاملاً في الوسط فوق خلفية مموهة منه."""
    im = Image.open(src).convert('RGB')
    bg = im.resize((1280, 1280)).crop((0, 280, 1280, 1000))
    bg = ImageEnhance.Brightness(bg.filter(ImageFilter.GaussianBlur(40))).enhance(0.55)
    fg = im.resize((660, 660), Image.LANCZOS)
    shadow = Image.new('RGBA', (700, 700), (0, 0, 0, 0))
    shadow.paste((0, 0, 0, 120), (20, 26, 680, 686))
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))
    bg.paste(shadow, (290, 10), shadow)
    bg.paste(fg, (310, 30))
    bg.save(dst, quality=86, optimize=True)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    browser = find_browser()
    for html in sorted(HERE.glob('[0-9][0-9]-*.html')):
        name = html.stem
        png = OUT / f'{name}.png'
        render(browser, html, png)
        full = OUT / f'{name}.jpg'
        Image.open(png).convert('RGB').save(full, quality=88, optimize=True)
        png.unlink()
        make_thumb(full, OUT / f'{name}-thumb.jpg')
        print('rendered', name)


if __name__ == '__main__':
    main()
