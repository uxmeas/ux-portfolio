"""
Behance Export Composite Script

Composites transparent .pen section exports onto reconstructed gradient background.
Produces individual section PNGs with gradient baked in, ready for Behance upload.

Usage:
    python3 behance/composite.py

Prerequisites:
    - Section PNGs already exported via Pencil MCP export_nodes at 2x scale
    - PIL/Pillow installed (pip3 install Pillow)
"""

from PIL import Image, ImageDraw
import numpy as np
import os
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
SCALE = 2
FRAME_W = 1440 * SCALE  # 2880px

# Gradient definition from .pen parent frames (same for both Compliance + DealFlow)
GRADIENT_BASE = (0x14, 0x14, 0x19)  # #141419
GRADIENT_LAYERS = [
    {"cx": 0.60, "cy": 0.06, "color": (0x24, 0x33, 0x52), "sw": 1.4, "sh": 0.25},
    {"cx": 0.25, "cy": 0.20, "color": (0x1E, 0x2D, 0x45), "sw": 1.2, "sh": 0.18},
    {"cx": 0.75, "cy": 0.35, "color": (0x24, 0x33, 0x52), "sw": 1.3, "sh": 0.18},
    {"cx": 0.30, "cy": 0.50, "color": (0x1E, 0x2D, 0x45), "sw": 1.2, "sh": 0.18},
    {"cx": 0.70, "cy": 0.65, "color": (0x24, 0x33, 0x52), "sw": 1.3, "sh": 0.18},
    {"cx": 0.40, "cy": 0.80, "color": (0x1E, 0x2D, 0x45), "sw": 1.2, "sh": 0.18},
    {"cx": 0.50, "cy": 0.93, "color": (0x24, 0x33, 0x52), "sw": 1.4, "sh": 0.20},
]

# Section layout data from snapshot_layout (y and height at 1x, we multiply by SCALE)
PROJECTS = {
    "compliance-ux": {
        "frame_h": 7641,
        "sections": [
            {"id": "vGzrN", "name": "01-hero",            "y": 0,    "h": 1330},
            {"id": "sZNHW", "name": "02-challenge",        "y": 1330, "h": 755},
            {"id": "F3nTd", "name": "03-design-approach",  "y": 2085, "h": 903},
            {"id": "qCGVc", "name": "04-user-flow",        "y": 2988, "h": 1030},
            {"id": "MCYVj", "name": "05-ksign",            "y": 4018, "h": 908},
            {"id": "iokne", "name": "06-ui-showcase",      "y": 4926, "h": 1291},
            {"id": "nDLF8", "name": "07-results",          "y": 6217, "h": 757},
        ]
    },
    "dealflow": {
        "frame_h": 8510,
        "sections": [
            {"id": "kv6Ol", "name": "01-hero",              "y": 0,    "h": 1330},
            {"id": "A4Ab3", "name": "02-challenge",          "y": 1330, "h": 1014},
            {"id": "sjdrT", "name": "03-platform-overview",  "y": 2344, "h": 887},
            {"id": "YL4EJ", "name": "04-research-table",     "y": 3231, "h": 1044},
            {"id": "TT09Q", "name": "05-hmw-statement",      "y": 4275, "h": 551},
            {"id": "qUyn8", "name": "06-competitors",        "y": 4826, "h": 859},
            {"id": "KJF9f", "name": "07-investor-dashboard", "y": 5685, "h": 791},
            {"id": "BpsiQ", "name": "08-equity-debt",        "y": 6476, "h": 761},
            {"id": "Zdh8Q", "name": "09-results",            "y": 7237, "h": 677},
        ]
    }
}


def render_gradient(width, height):
    """Render the atmospheric navy gradient background using numpy for speed."""
    print(f"  Rendering gradient {width}x{height}...")

    # Start with base color
    img = np.full((height, width, 4), (*GRADIENT_BASE, 255), dtype=np.uint8)

    # Create coordinate grids (normalized 0-1)
    ys = np.linspace(0, 1, height).reshape(-1, 1)
    xs = np.linspace(0, 1, width).reshape(1, -1)

    for layer in GRADIENT_LAYERS:
        cx, cy = layer["cx"], layer["cy"]
        r, g, b = layer["color"]
        rw = layer["sw"] / 2  # radius width (half of size)
        rh = layer["sh"] / 2  # radius height

        # Elliptical distance from center (0 at center, 1 at edge)
        dx = (xs - cx) / rw
        dy = (ys - cy) / rh
        dist = np.sqrt(dx**2 + dy**2)

        # Alpha: 1 at center, 0 at edge (clamped)
        alpha = np.clip(1.0 - dist, 0, 1)

        # Blend: composite this gradient layer onto the image
        alpha_u8 = (alpha * 255).astype(np.uint8)
        for c_idx, c_val in enumerate((r, g, b)):
            existing = img[:, :, c_idx].astype(np.float32)
            img[:, :, c_idx] = (existing * (1 - alpha) + c_val * alpha).astype(np.uint8)

    return Image.fromarray(img, 'RGBA')


def composite_project(slug):
    project = PROJECTS[slug]
    project_dir = SCRIPT_DIR / slug
    frame_h = project["frame_h"] * SCALE

    print(f"\n{'='*50}")
    print(f"Compositing: {slug}")
    print(f"{'='*50}")

    # Step 1: Render full gradient background
    gradient = render_gradient(FRAME_W, frame_h)

    # Step 2: Composite each section and crop
    for section in project["sections"]:
        src_path = project_dir / f"{section['id']}.png"
        out_path = project_dir / f"{section['name']}.png"

        if not src_path.exists():
            print(f"  SKIP: {section['name']} — {src_path.name} not found")
            continue

        y = section["y"] * SCALE
        h = section["h"] * SCALE

        # Crop gradient at section's position
        bg_crop = gradient.crop((0, y, FRAME_W, y + h)).copy()

        # Load transparent section export
        section_img = Image.open(src_path).convert('RGBA')

        # Resize if needed (export might be slightly different due to 4096 cap)
        if section_img.size != (FRAME_W, h):
            print(f"  Resizing {section['name']}: {section_img.size} → ({FRAME_W}, {h})")
            section_img = section_img.resize((FRAME_W, h), Image.LANCZOS)

        # Composite section onto gradient background
        result = Image.alpha_composite(bg_crop, section_img)
        result.save(out_path, 'PNG')
        print(f"  Saved: {section['name']}.png ({result.width}x{result.height})")

    # Clean up raw node ID exports
    for section in project["sections"]:
        raw = project_dir / f"{section['id']}.png"
        if raw.exists():
            raw.unlink()

    # Remove full case study export if present
    full = project_dir / "00-full-case-study.png"
    if full.exists():
        full.unlink()

    print(f"\nDone: {slug}")


if __name__ == "__main__":
    for slug in PROJECTS:
        composite_project(slug)

    print("\n✓ All exports ready in behance/{slug}/")
    print("  Upload section PNGs (01-xx through 0x-xx) to Behance.")
