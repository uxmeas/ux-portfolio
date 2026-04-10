#!/usr/bin/env python3
"""Convert Firecrawl branding JSON to swappable CSS tokens."""
import json, sys, os, glob
from datetime import date

def convert(json_path):
    name = os.path.basename(json_path).replace('.json', '')
    css_path = json_path.replace('.json', '.css')

    with open(json_path) as f:
        data = json.load(f)

    brand = data.get('data', {}).get('branding', {})
    colors = brand.get('colors', {})
    typo = brand.get('typography', {})
    spacing = brand.get('spacing', {})
    components = brand.get('components', {})
    fonts = brand.get('fonts', [])
    scheme = brand.get('colorScheme', 'dark')

    # Colors
    bg = colors.get('background', '#000000')
    text_primary = colors.get('textPrimary', '#FFFFFF')
    primary = colors.get('primary', '#3B82F6')
    secondary = colors.get('secondary', '#1A1A1A')
    accent = colors.get('accent', primary)
    link = colors.get('link', accent)

    # Fix text color for dark schemes
    if scheme == 'dark' and text_primary in ['#000000', '#000']:
        text_primary = '#FFFFFF'

    # Typography
    font_families = typo.get('fontFamilies', {})
    font_stacks = typo.get('fontStacks', {})
    font_sizes = typo.get('fontSizes', {})

    heading_font = font_families.get('heading', font_families.get('primary', 'system-ui'))
    body_font = font_families.get('primary', heading_font)

    # Get heading stack if available
    heading_stack = font_stacks.get('heading', [heading_font])
    body_stack = font_stacks.get('body', [body_font])

    display_font = heading_stack[0] if heading_stack else heading_font
    main_font = body_stack[0] if body_stack else body_font

    # Font sizes
    h1_size = font_sizes.get('h1', '88px')
    h2_size = font_sizes.get('h2', '56px')
    body_size = font_sizes.get('body', '18px')

    # Spacing
    radius = spacing.get('borderRadius', '8px')
    base_unit = spacing.get('baseUnit', 4)

    # Button
    btn = components.get('buttonPrimary', {})
    btn_bg = btn.get('background', accent)
    btn_text = btn.get('textColor', '#FFFFFF')
    btn_radius = btn.get('borderRadius', radius)

    # Determine surface colors based on scheme
    if scheme == 'dark':
        bg_surface = secondary if secondary != bg else '#111111'
        text_muted = '#666666'
        text_secondary = '#999999'
        border = '#333333'
        glow = 'rgba(255, 255, 255, 0.08)'
        glow_hover = 'rgba(255, 255, 255, 0.14)'
        glow_shadow = '0 0 0 0.5px rgba(255, 255, 255, 0.04)'
    else:
        bg_surface = '#FFFFFF'
        text_muted = '#666666'
        text_secondary = '#444444'
        border = '#E5E5E5'
        glow = 'rgba(0, 0, 0, 0.08)'
        glow_hover = 'rgba(0, 0, 0, 0.14)'
        glow_shadow = '0 0 0 0.5px rgba(0, 0, 0, 0.04)'

    css = f"""/* ============================================
   Design Tokens: {name}
   Source: Firecrawl branding scrape
   Scheme: {scheme}
   Scraped: {date.today()}
   ============================================ */

:root {{
  /* Background */
  --bg: {bg};
  --bg-surface: {bg_surface};
  --bg-card: transparent;
  --bg-card-hover: {'rgba(255,255,255,0.02)' if scheme == 'dark' else 'rgba(0,0,0,0.02)'};
  --bg-elevated: {'rgba(255,255,255,0.03)' if scheme == 'dark' else 'rgba(0,0,0,0.03)'};

  /* Text */
  --text-primary: {text_primary};
  --text-secondary: {text_secondary};
  --text-muted: {text_muted};
  --text-caption: {text_muted};

  /* Accent */
  --accent: {accent};
  --accent-foreground: {btn_text};
  --color-accent: {accent};

  /* Semantic */
  --success: #3D8B6E;
  --error: #C4453D;
  --warning: #F59E0B;
  --info: {primary};
  --purple: #7B61A6;

  /* Border */
  --border: {border};
  --border-strong: {border};
  --divider: {border};

  /* Typography */
  --font-display: '{display_font}', sans-serif;
  --font-body: '{main_font}', sans-serif;
  --font-mono: 'Space Mono', monospace;

  /* Type Scale */
  --text-xs: 0.8125rem;
  --text-sm: 1rem;
  --text-base: {body_size};
  --text-lg: 1.375rem;
  --text-xl: 1.75rem;
  --text-2xl: 2rem;
  --text-3xl: {h2_size};
  --text-4xl: {h1_size};

  --leading-tight: 1.1;
  --leading-snug: 1.35;
  --leading-normal: 1.6;
  --leading-relaxed: 1.75;

  --tracking-tight: -0.03em;
  --tracking-normal: 0;
  --tracking-wide: 0.06em;
  --tracking-wider: 0.1em;

  /* Spacing */
  --space-xs: {base_unit}px;
  --space-sm: {base_unit * 2}px;
  --space-md: {base_unit * 4}px;
  --space-lg: {base_unit * 6}px;
  --space-xl: {base_unit * 8}px;
  --space-2xl: {base_unit * 12}px;
  --space-3xl: {base_unit * 16}px;
  --space-4xl: {base_unit * 20}px;
  --space-5xl: {base_unit * 30}px;
  --section-gap: 96px;
  --section-padding-x: 120px;
  --section-padding-y: 96px;

  /* Radius */
  --radius-sm: {radius};
  --radius-md: {radius};
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.15);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.2);

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.4s ease;

  /* Glow */
  --glow-border: {glow};
  --glow-border-hover: {glow_hover};
  --glow-border-subtle: {glow.replace('0.08', '0.06')};
  --glow-border-strong: {glow.replace('0.08', '0.1')};
  --glow-border-strongest: {glow.replace('0.08', '0.18')};
  --glow-shadow: {glow_shadow};
  --glow-shadow-hover: {glow_shadow.replace('0.04', '0.08')};
  --glow-fill-subtle: {glow.replace('0.08', '0.06')};
  --glow-fill-hover: {glow.replace('0.08', '0.1')};

  /* Badge */
  --badge-error: #F87171;
  --badge-error-bg: rgba(248,113,113,0.1);
  --badge-success: #4ADE80;
  --badge-success-bg: rgba(74,222,128,0.1);
  --badge-info-bg: rgba({int(primary[1:3],16)},{int(primary[3:5],16)},{int(primary[5:7],16)},0.08);
  --decision-number: rgba({int(primary[1:3],16)},{int(primary[3:5],16)},{int(primary[5:7],16)},0.15);

  /* Layout */
  --max-width: 1440px;
  --content-width: 1120px;
  --narrow-width: 680px;
}}

::selection {{
  background-color: var(--accent);
  color: var(--accent-foreground);
}}
"""

    with open(css_path, 'w') as f:
        f.write(css)

    print(f"  ✓ {name}.css — {scheme} theme")
    print(f"    Accent: {accent} | Font: {display_font} | BG: {bg}")
    return True

if __name__ == '__main__':
    if len(sys.argv) > 1:
        convert(sys.argv[1])
    else:
        # Convert all JSON files in tokens/
        for json_file in sorted(glob.glob('tokens/**/*.json', recursive=True)):
            try:
                convert(json_file)
            except Exception as e:
                print(f"  ✗ {json_file}: {e}")
