# Layout & Container Rules

## Standard Container System

### Container CSS Structure
```css
.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 32px;
}
```

### Tailwind Implementation
```jsx
<div className="w-full max-w-[1440px] mx-auto px-8 md:px-6 sm:px-4">
  {/* Content */}
</div>
```

## Responsive Breakpoints

### Padding Scale
| Breakpoint | Padding | Tailwind |
|------------|---------|----------|
| Desktop    | 32px    | `px-8`   |
| Tablet     | 24px    | `md:px-6` |
| Mobile     | 16px    | `sm:px-4` |

### Breakpoint Values
```css
/* Tablet */
@media (max-width: 768px) {
  .container { padding: 0 24px; }
}

/* Mobile */
@media (max-width: 480px) {
  .container { padding: 0 16px; }
}
```

## Quick Reference

| Specification | Value |
|---------------|-------|
| Design frame | 1440px |
| Container max-width | 1440px |
| Content area (desktop) | 1376px |
| Padding (desktop) | 32px (both sides) |
| Padding (tablet) | 24px (both sides) |
| Padding (mobile) | 16px (both sides) |

## Calculation
- **Desktop:** 1440px - (32px × 2) = **1376px content area**
- **Tablet:** 1440px - (24px × 2) = **1392px content area**
- **Mobile:** 1440px - (16px × 2) = **1408px content area**

## Navigation Example
```jsx
<nav className="w-full">
  <div className="w-full max-w-[1440px] mx-auto px-8 md:px-6 sm:px-4">
    {/* Nav content */}
  </div>
</nav>
```

## Section Example
```jsx
<section className="w-full">
  <div className="w-full max-w-[1440px] mx-auto px-8 md:px-6 sm:px-4 py-20">
    {/* Section content */}
  </div>
</section>
```

---

**Last Updated:** 2026-03-12  
**Project:** MyPick.io Template
