#!/bin/bash
# Scrape a website's design tokens using Firecrawl branding format
# Usage: ./scrape-tokens.sh <url> <category> <name>
# Example: ./scrape-tokens.sh https://resend.com saas resend

URL=$1
CATEGORY=$2
NAME=$3
OUTPUT_DIR="$(dirname "$0")/../tokens/$CATEGORY"
API_KEY="$FIRECRAWL_API_KEY"

if [ -z "$URL" ] || [ -z "$CATEGORY" ] || [ -z "$NAME" ]; then
  echo "Usage: ./scrape-tokens.sh <url> <category> <name>"
  exit 1
fi

echo "Scraping $URL → tokens/$CATEGORY/$NAME.css"

# Call Firecrawl branding format
RESPONSE=$(curl -s "https://api.firecrawl.dev/v1/scrape" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"url\": \"$URL\",
    \"formats\": [\"branding\"]
  }")

echo "$RESPONSE" > "$OUTPUT_DIR/$NAME.json"
echo "  Raw JSON saved → tokens/$CATEGORY/$NAME.json"

# Convert to CSS using Python
python3 -c "
import json, sys

with open('$OUTPUT_DIR/$NAME.json') as f:
    data = json.load(f)

brand = data.get('data', {}).get('branding', {})
colors = brand.get('colors', {})
typography = brand.get('typography', {})
logo = brand.get('logo', '')

# Build CSS
css = '''/* ============================================
   Design Tokens: $NAME
   Source: $URL
   Scraped: $(date +%Y-%m-%d)
   ============================================ */

:root {
'''

# Colors
primary = colors.get('primary', '#000000')
secondary = colors.get('secondary', '#1A1A1A')
accent = colors.get('accent', '#3B82F6')
background = colors.get('background', '#000000')
foreground = colors.get('foreground', '#FFFFFF')
muted = colors.get('muted', '#666666')
border_color = colors.get('border', '#333333')

css += f'  --bg: {background};\\n'
css += f'  --bg-surface: {secondary};\\n'
css += f'  --bg-card: transparent;\\n'
css += f'  --bg-card-hover: rgba(255, 255, 255, 0.02);\\n'
css += f'  --bg-elevated: rgba(255, 255, 255, 0.03);\\n'
css += f'\\n'
css += f'  --text-primary: {foreground};\\n'
css += f'  --text-secondary: {muted};\\n'
css += f'  --text-muted: {muted};\\n'
css += f'\\n'
css += f'  --accent: {accent};\\n'
css += f'  --accent-foreground: {background};\\n'
css += f'\\n'
css += f'  --border: {border_color};\\n'
css += f'  --divider: {border_color};\\n'

# Typography
font_families = typography.get('fontFamilies', [])
primary_font = font_families[0] if font_families else 'system-ui'

css += f'\\n'
css += f'  --font-display: \\\"{primary_font}\\\", sans-serif;\\n'
css += f'  --font-body: \\\"{primary_font}\\\", sans-serif;\\n'

css += '''
  /* Glow border tokens */
  --glow-border: rgba(255, 255, 255, 0.08);
  --glow-border-hover: rgba(255, 255, 255, 0.14);
  --glow-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.04);
}
'''

# Write CSS
with open('$OUTPUT_DIR/$NAME.css', 'w') as f:
    f.write(css)

print(f'  CSS tokens saved → tokens/$CATEGORY/$NAME.css')
print(f'  Primary: {primary}')
print(f'  Accent: {accent}')
print(f'  Background: {background}')
print(f'  Font: {primary_font}')
"
