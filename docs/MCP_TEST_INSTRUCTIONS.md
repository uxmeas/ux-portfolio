# MCP Testing Instructions & Context

## Quick Start Message for New Chat
Copy and paste this into a new Claude Desktop conversation after restart:

```
Hi Claude! I just installed MCP tools (Playwright, Figma, Filesystem). 

Please help me test my portfolio at http://localhost:8000

1. First, start my local server:
   cd /Users/pheakmeas/Documents/Development/Personal-Projects/ux-portfolio && python3 -m http.server 8000

2. Then use Playwright to:
   - Open http://localhost:8000
   - Take a screenshot of the homepage
   - Test on mobile (iPhone 14) and desktop views
   - Click on "AKM Secure (Best)" card and verify modal opens

3. Tell me what MCP tools you have access to
```

## Current Portfolio Context

### Project Location
- **Path**: `/Users/pheakmeas/Documents/Development/Personal-Projects/ux-portfolio`
- **Local URL**: http://localhost:8000
- **Live URL**: https://uxmeas.netlify.app

### Recent Updates (Aug 23, 2025)
1. **Portfolio Width**: Increased to 1600px max-width
2. **Hero Section**: Added animated floating elements (design tools, hockey items)
3. **Typography**: Responsive sizing (mobile → desktop)
4. **New Case Studies**:
   - AKM Secure (Best) - Unified version with 400% growth metrics
   - Katipult - 11-year journey to acquisition
   - MyPick.io - Randomizer tool (not game)
5. **Added**: Footer, CTA section, hero buttons
6. **Fixed**: Mobile responsiveness, left-aligned headings

### MCP Tools Installed
1. **Playwright** (`@playwright/mcp@0.0.34`)
   - Location: `/Users/pheakmeas/.npm-global/bin/mcp-server-playwright`
   - Browsers: Chromium, Firefox, WebKit installed

2. **Figma** (`figma-mcp`)
   - Location: `/Users/pheakmeas/.npm-global/bin/figma-mcp`

3. **Filesystem** (`@modelcontextprotocol/server-filesystem`)
   - Location: `/Users/pheakmeas/.npm-global/bin/mcp-server-filesystem`
   - Root access: `/Users/pheakmeas`

### Config Location
`/Users/pheakmeas/Library/Application Support/Claude/config.json`

## Testing Checklist with Delays

### Basic Tests (with timing)
```javascript
// Test 1: Screenshot after page load
"Open http://localhost:8000, wait 3 seconds for animations, then screenshot"

// Test 2: Scroll test with delay
"Open http://localhost:8000, wait 2 seconds, scroll to portfolio section, wait 1 second, screenshot"

// Test 3: Modal interaction with delays
"Open http://localhost:8000, wait 2 seconds, click 'AKM Secure (Best)', wait for modal animation (1 second), screenshot, press ESC, wait 500ms, verify modal closed"

// Test 4: Responsive test sequence
"Test http://localhost:8000:
- Desktop (1920x1080) - wait 2s, screenshot
- Tablet (768x1024) - wait 2s, screenshot  
- Mobile (390x844) - wait 2s, screenshot
Compare all three for layout issues"

// Test 5: Animation performance
"Open http://localhost:8000, record for 5 seconds focusing on hero floating elements, report FPS"
```

### Advanced Tests
```javascript
// Full user journey with realistic delays
"Simulate a user visiting http://localhost:8000:
1. Land on page (wait 3s to read)
2. Slowly scroll to portfolio (2s scroll time)
3. Hover over Katipult card (wait 1s)
4. Click it (wait for modal, 1s)
5. Scroll through case study (3s)
6. Close modal (wait 500ms)
7. Click 'Get in Touch' CTA
Report entire experience"

// Performance monitoring
"Open http://localhost:8000 and monitor for 10 seconds:
- Track animation FPS every second
- Note any frame drops below 30fps
- Check memory usage at start and end
- Report janky animations with timestamps"
```

## Portfolio Structure Reference
```
/ux-portfolio/
├── index.html (main portfolio)
├── case-studies/
│   ├── akm-secure/
│   │   └── akm-secure-hiring.html (best version)
│   ├── katipult/
│   │   └── katipult-hiring.html
│   └── mypick/
│       └── mypick-hiring.html
├── images/
├── public/
│   └── resume/
└── src/
    └── tools/
        └── case-study-generator/
```

## Key Elements to Test
1. **Hero**: Floating animations, CTAs, social links
2. **Portfolio Grid**: 7 cards, hover states, click to modal
3. **Modals**: Open/close, ESC key, content loading
4. **CTAs**: "View My Work" scroll, "Get in Touch" email
5. **Footer**: All links functional
6. **Mobile**: Proper stacking, readable text, hidden animations

## Troubleshooting

### If local server won't start:
```bash
# Check if port 8000 is in use
lsof -i :8000

# Kill existing process if needed
kill -9 [PID]

# Try alternative port
python3 -m http.server 8080
```

### If Playwright doesn't work:
```
"Check if MCP tools are loaded"
"List available MCP servers"
```

### If screenshots are black:
```
"Open http://localhost:8000, wait 5 seconds for full load, then screenshot"
```

## Notes
- Server startup may fail if port 8000 is already in use
- Floating hero elements are hidden on mobile (by design)
- MyPick.io card opens modal (not direct link)
- All case studies have close buttons (X) and ESC functionality

---
Last Updated: August 23, 2025
Context saved from conversation about portfolio updates and MCP installation