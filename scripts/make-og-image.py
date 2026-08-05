#!/usr/bin/env python3
"""
Compose the 1200x630 Open Graph card from the headshot + brand tokens.

Re-run this whenever public/assets/zyad-husseini.jpg is replaced:

    python3 scripts/make-og-image.py

Writes public/assets/og-image.jpg (the link preview card used by Google,
LinkedIn, WhatsApp, Twitter/X, Slack, iMessage).
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "public" / "assets"
PHOTO = ASSETS / "zyad-husseini.jpg"
OUT = ASSETS / "og-image.jpg"

W, H = 1200, 630

BG = (10, 10, 15)
INDIGO = (99, 102, 241)
CYAN = (6, 182, 212)
PURPLE = (139, 92, 246)
WHITE = (255, 255, 255)
SLATE = (148, 163, 184)

FONT_DIRS = [
    Path("/System/Library/Fonts/Supplemental"),
    Path("/System/Library/Fonts"),
    Path("/Library/Fonts"),
]


def load_font(names: list[str], size: int) -> ImageFont.FreeTypeFont:
    for name in names:
        for d in FONT_DIRS:
            p = d / name
            if p.exists():
                try:
                    return ImageFont.truetype(str(p), size)
                except OSError:
                    continue
    return ImageFont.load_default()


BOLD = ["Arial Bold.ttf", "Helvetica.ttc", "Arial.ttf"]
REG = ["Arial.ttf", "Helvetica.ttc"]
MONO = ["Menlo.ttc", "Courier New.ttf", "Arial.ttf"]


def gradient_text(
    draw_target: Image.Image, xy, text, font, c_from, c_to
) -> None:
    """Draw text filled with a horizontal two-stop gradient."""
    tmp = Image.new("L", (W, H), 0)
    ImageDraw.Draw(tmp).text(xy, text, font=font, fill=255)
    bbox = tmp.getbbox()
    if not bbox:
        return
    grad = Image.new("RGB", (W, H), c_from)
    gd = ImageDraw.Draw(grad)
    x0, x1 = bbox[0], bbox[2]
    span = max(x1 - x0, 1)
    for x in range(x0, x1):
        t = (x - x0) / span
        gd.line(
            [(x, 0), (x, H)],
            fill=tuple(round(c_from[i] + (c_to[i] - c_from[i]) * t) for i in range(3)),
        )
    draw_target.paste(grad, (0, 0), tmp)


def soft_orb(img: Image.Image, cx: int, cy: int, r: int, color, alpha: int) -> None:
    """A large blurred gradient orb, matching the site's ambient background."""
    layer = Image.new("RGB", (W, H), BG)
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).ellipse([cx - r, cy - r, cx + r, cy + r], fill=alpha)
    mask = mask.filter(ImageFilter.GaussianBlur(r * 0.55))
    ImageDraw.Draw(layer).ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)
    layer = layer.filter(ImageFilter.GaussianBlur(r * 0.4))
    img.paste(layer, (0, 0), mask)


def circular(photo: Image.Image, size: int) -> tuple[Image.Image, Image.Image]:
    photo = photo.convert("RGB")
    side = min(photo.size)
    left = (photo.width - side) // 2
    top = (photo.height - side) // 2
    photo = photo.crop((left, top, left + side, top + side)).resize(
        (size, size), Image.LANCZOS
    )
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, size - 1, size - 1], fill=255)
    return photo, mask


def main() -> int:
    img = Image.new("RGB", (W, H), BG)

    # ambient orbs
    soft_orb(img, 120, 180, 300, INDIGO, 70)
    soft_orb(img, 1080, 500, 320, CYAN, 45)
    soft_orb(img, 700, 60, 240, PURPLE, 40)

    # faint grid, matching the site's 50px indigo grid
    grid = Image.new("RGB", (W, H), BG)
    gd = ImageDraw.Draw(grid)
    for x in range(0, W, 50):
        gd.line([(x, 0), (x, H)], fill=(24, 24, 42))
    for y in range(0, H, 50):
        gd.line([(0, y), (W, y)], fill=(24, 24, 42))
    img = Image.blend(img, Image.blend(img, grid, 0.5), 0.5)

    draw = ImageDraw.Draw(img)

    # headshot with a gradient ring
    photo_size = 300
    px, py = 80, (H - photo_size) // 2
    if PHOTO.exists():
        ring = photo_size + 16
        ring_img = Image.new("RGB", (ring, ring), BG)
        rd = ImageDraw.Draw(ring_img)
        for i in range(ring):
            t = i / ring
            rd.line(
                [(i, 0), (i, ring)],
                fill=tuple(
                    round(INDIGO[j] + (CYAN[j] - INDIGO[j]) * t) for j in range(3)
                ),
            )
        ring_mask = Image.new("L", (ring, ring), 0)
        ImageDraw.Draw(ring_mask).ellipse([0, 0, ring - 1, ring - 1], fill=255)
        img.paste(ring_img, (px - 8, py - 8), ring_mask)

        with Image.open(PHOTO) as raw:
            face, mask = circular(raw, photo_size)
        img.paste(face, (px, py), mask)
        text_x = px + photo_size + 64
    else:
        print(f"warning: {PHOTO} missing — building a text-only card", file=sys.stderr)
        text_x = 90

    # eyebrow
    eyebrow = load_font(MONO, 22)
    draw.text((text_x, 178), "D A T A   A N A L Y S T", font=eyebrow, fill=CYAN)

    # name
    first = load_font(BOLD, 86)
    draw.text((text_x, 218), "Zyad", font=first, fill=WHITE)
    first_w = draw.textlength("Zyad ", font=first)
    gradient_text(img, (text_x + first_w, 218), "Husseini", first, INDIGO, CYAN)

    draw = ImageDraw.Draw(img)
    body = load_font(REG, 27)
    draw.text(
        (text_x, 336),
        "Economist & entrepreneur — MSc Data Analytics,",
        font=body,
        fill=SLATE,
    )
    draw.text((text_x, 374), "Kedge Business School. France / Egypt.", font=body, fill=SLATE)

    # chips
    chip_font = load_font(MONO, 20)
    cx = text_x
    for label in ("Power BI", "Python", "SQL", "Econometrics"):
        tw = draw.textlength(label, font=chip_font)
        draw.rounded_rectangle(
            [cx, 432, cx + tw + 30, 476], radius=22, outline=(46, 46, 70), width=2
        )
        draw.text((cx + 15, 444), label, font=chip_font, fill=SLATE)
        cx += tw + 44

    # domain
    domain = load_font(MONO, 23)
    draw.text((text_x, 512), "zyadhusseini.com", font=domain, fill=INDIGO)

    # bottom accent bar
    bar = Image.new("RGB", (W, 6), BG)
    bd = ImageDraw.Draw(bar)
    for x in range(W):
        t = x / W
        if t < 0.5:
            u = t * 2
            c = tuple(round(INDIGO[i] + (PURPLE[i] - INDIGO[i]) * u) for i in range(3))
        else:
            u = (t - 0.5) * 2
            c = tuple(round(PURPLE[i] + (CYAN[i] - PURPLE[i]) * u) for i in range(3))
        bd.line([(x, 0), (x, 6)], fill=c)
    img.paste(bar, (0, H - 6))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "JPEG", quality=92, optimize=True, progressive=True)
    print(f"wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB, {W}x{H})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
