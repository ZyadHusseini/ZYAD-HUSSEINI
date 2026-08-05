#!/usr/bin/env python3
"""
Generate the raster app icons that SVG favicons can't cover:
apple-touch-icon.png (iOS home screen) and the PWA manifest icons.

    python3 scripts/make-icons.py
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public"

BG = (10, 10, 15)
INDIGO = (99, 102, 241)
CYAN = (6, 182, 212)

FONT_DIRS = [
    Path("/System/Library/Fonts/Supplemental"),
    Path("/System/Library/Fonts"),
    Path("/Library/Fonts"),
]


def load_font(size: int) -> ImageFont.FreeTypeFont:
    for name in ("Arial Bold.ttf", "Helvetica.ttc", "Arial.ttf"):
        for d in FONT_DIRS:
            p = d / name
            if p.exists():
                try:
                    return ImageFont.truetype(str(p), size)
                except OSError:
                    continue
    return ImageFont.load_default()


def make_icon(size: int, padded: bool) -> Image.Image:
    """ZH monogram in the indigo→cyan gradient on the deep-space background."""
    scale = 4
    s = size * scale
    img = Image.new("RGB", (s, s), BG)

    # ambient glow so the icon isn't flat black
    glow = Image.new("RGB", (s, s), BG)
    ImageDraw.Draw(glow).ellipse(
        [s * 0.05, s * 0.05, s * 0.75, s * 0.75], fill=(30, 27, 75)
    )
    img = Image.blend(img, glow.filter(ImageFilter.GaussianBlur(s * 0.12)), 0.9)

    font = load_font(int(s * (0.42 if padded else 0.5)))
    draw = ImageDraw.Draw(img)
    text = "ZH"
    box = draw.textbbox((0, 0), text, font=font)
    tw, th = box[2] - box[0], box[3] - box[1]
    tx, ty = (s - tw) / 2 - box[0], (s - th) / 2 - box[1]

    # gradient-filled monogram
    mask = Image.new("L", (s, s), 0)
    ImageDraw.Draw(mask).text((tx, ty), text, font=font, fill=255)
    grad = Image.new("RGB", (s, s))
    gd = ImageDraw.Draw(grad)
    for x in range(s):
        t = x / s
        gd.line(
            [(x, 0), (x, s)],
            fill=tuple(round(INDIGO[i] + (CYAN[i] - INDIGO[i]) * t) for i in range(3)),
        )
    img.paste(grad, (0, 0), mask)

    return img.resize((size, size), Image.LANCZOS)


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    targets = [
        ("apple-touch-icon.png", 180, True),  # iOS adds its own corner radius
        ("icon-192.png", 192, False),
        ("icon-512.png", 512, False),
    ]
    for name, size, padded in targets:
        path = OUT_DIR / name
        make_icon(size, padded).save(path, "PNG", optimize=True)
        print(f"wrote public/{name} ({size}x{size}, {path.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
