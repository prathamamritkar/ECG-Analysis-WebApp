# ECG Analysis Portal - UI/UX Design Architecture

## 📋 Overview

This document outlines the comprehensive UI/UX design system for the ECG Analysis Portal, built with modern web standards and accessibility in mind.

---

## 🎨 Design System

### Color Palette

#### Primary Colors
- **Primary Blue**: `#0066cc` - Main brand color for actions and focus states
- **Primary Light**: `#e6f2ff` - Light background for primary elements
- **Primary Dark**: `#004399` - Darker shade for hover/active states

#### Status Colors
- **Success Green**: `#10a741` - Positive status, successful operations
- **Warning Orange**: `#ff9800` - Cautionary alerts and anomalies
- **Danger Red**: `#e53935` - Critical alerts and errors
- **Info Blue**: `#0066cc` - Informational messages

#### Neutral Palette
- **Gray 50**: `#fafafa` - Page background
- **Gray 100**: `#f5f5f5` - Secondary backgrounds
- **Gray 200**: `#e0e0e0` - Borders
- **Gray 800**: `#212121` - Primary text
- **White**: Used for cards and sections

### Typography

#### Font Family
- **Base Font**: System font stack for optimal performance
  - macOS/iOS: -apple-system, BlinkMacSystemFont
  - Windows: Segoe UI
  - Android: Roboto
  - Fallback: Arial, sans-serif

#### Font Sizes
```
xs    : 0.75rem   (12px)   - Labels, captions
sm    : 0.875rem  (14px)   - Small text, hints
base  : 1rem      (16px)   - Body text, default
lg    : 1.125rem  (18px)   - Section text
xl    : 1.25rem   (20px)   - Subsection headers
2xl   : 1.5rem    (24px)   - Section headers
3xl   : 1.875rem  (30px)   - Page titles
```

#### Font Weights
- Light (300): Rarely used
- Normal (400): Body text, regular content
- Medium (500): Labels, navigation
- Semibold (600): Emphasis, secondary headings
- Bold (700): Headings, important content

### Spacing System

Consistent spacing creates visual harmony and improves readability.

```
xs    : 0.25rem   (4px)    - Micro spacing
sm    : 0.5rem    (8px)    - Compact spacing
md    : 1rem      (16px)   - Default spacing
lg    : 1.5rem    (24px)   - Section spacing
xl    : 2rem      (32px)   - Large spacing
2xl   : 3rem      (48px)   - Extra large spacing
3xl   : 4rem      (64px)   - Massive spacing
```

### Border Radius

- **sm**: 4px - Subtle corners for inputs, small elements
- **md**: 8px - Standard rounded corners for cards
- **lg**: 12px - Large cards and sections
- **xl**: 16px - Extra rounded for hero sections
- **full**: 9999px - Pills and badges

### Shadows

- **sm**: Subtle elevation for hover states
- **md**: Default shadow for cards
- **lg**: Elevated cards on hover
- **xl**: Modal and prominent elements

### Transitions

- **fast**: 150ms - Quick feedback (hover states)
- **base**: 250ms - Standard transitions
- **slow**: 350ms - Complex animations

---

## 📐 Layout Components

### Container
- **Max Width**: 1200px
- **Padding**: 24px on desktop, responsive on mobile
- Centers content with automatic margins

### Grid System
- **Gap**: 24px (configurable)
- **Responsive Columns**:
  - Desktop (3-column): Auto-fit with 250px minimum
  - Tablet (2-column): Auto-fit with 300px minimum
  - Mobile (1-column): Single column layout

### Flexbox Utilities
- Horizontal and vertical centering
- Gap-based spacing
- Responsive direction changes

---

## 🧩 Component Library

### Header
- **Sticky positioning** for persistent navigation
- **Logo** with heart icon (♥)
- **Navigation menu** with active states
- **Responsive collapse** on mobile

### Cards
- **Padding**: 24px
- **Border**: 1px solid gray-200
- **Shadow**: Default shadow with hover elevation
- **Hover Effect**: Lift effect with increased shadow
- **Sections**: Header (with border), Body, Footer

### Status Badges
- **Background**: Tinted color (e.g., success-light)
- **Border**: Color-matched
- **Padding**: 4px 8px
- **Animated dot**: Pulsing indicator for active status
- **Types**: Success, Warning, Danger, Info

### Stat Items
- **Border-left**: 4px colored indicator
- **Gradient background**: Color-to-white gradient
- **Label**: Uppercase, small, gray text
- **Value**: Large, bold, dark text
- **Color variants**: Primary, Success, Warning, Danger

### Forms
- **Input height**: 44px (accessibility standard)
- **Focus state**: Color border with tinted shadow
- **Validation**: Visual feedback on error
- **Labels**: Bold, required indicator (*), clear hierarchy

### Buttons
- **Padding**: 12px 24px (md), 8px 12px (sm)
- **States**: Default, Hover (elevated), Active, Disabled
- **Variants**:
  - Primary (blue background, white text)
  - Secondary (gray background)
  - Success (green background)
  - Danger (red background)
  - Outline (border-based, transparent background)
- **Hover Effect**: Color change, shadow elevation, slight lift
- **Focus**: Outline for accessibility

### Alerts
- **Padding**: 16px
- **Icon**: Left side indicator
- **Auto-dismiss**: 5 seconds via JavaScript
- **Variants**: Success, Warning, Danger, Info

### Tables
- **Header Background**: Gray-100
- **Row hover**: Light background change
- **Responsive**: Adjust padding and font size on mobile
- **Border**: Subtle borders for hierarchy

### Footer
- **Background**: Dark gray (800)
- **Grid layout**: 3 columns on desktop, 1 on mobile
- **Links**: Hover state with color change
- **Copyright**: Centered, smaller text

### Hero Section
- **Background**: Gradient (primary to primary-dark)
- **Text color**: White
- **Padding**: Large and symmetrical
- **Title**: 48px bold white text
- **Subtitle**: 18px with 90% opacity

---

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 768px
  - Full navigation
  - Multi-column grids
  - Normal padding
  
- **Tablet**: 480px - 768px
  - Stacked navigation
  - 2-column grids become 1-column
  - Reduced padding
  
- **Mobile**: < 480px
  - Single column everything
  - Adjusted font sizes
  - Full-width buttons
  - Minimal padding

### Mobile-First Approach
- Base styles target mobile
- Media queries add desktop enhancements
- Ensures graceful degradation

---

## ♿ Accessibility Features

### WCAG 2.1 Compliance
- **Color Contrast**: All text meets AA standards (4.5:1 for normal, 3:1 for large)
- **Focus States**: Clearly visible focus indicators
- **Semantic HTML**: Proper heading hierarchy, form labels
- **Alt Text**: Images have descriptive alt attributes
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **ARIA Labels**: Form inputs have associated labels

### Accessibility Best Practices
- Status dots have text labels (not just color)
- Required form fields clearly marked
- Error messages linked to inputs
- Sufficient spacing between interactive elements
- Mobile-friendly touch targets (min 44x44px)

---

## 🎯 Component States

### Navigation Link
- **Default**: Gray text
- **Hover**: Primary color with light background
- **Active**: Primary color with light background

### Form Input
- **Default**: Gray border
- **Focus**: Blue border with tinted shadow
- **Error**: Red border with red shadow
- **Disabled**: Gray background, reduced opacity

### Status Badge
- **Active**: Pulsing animation every 2 seconds
- **Inactive**: No animation, subtle opacity

### Button
- **Default**: Solid color
- **Hover**: Darker color, increased shadow, lift effect
- **Active**: Pressed appearance
- **Disabled**: Reduced opacity, no cursor

---

## 🔄 Interaction Patterns

### File Upload
1. User selects file
2. File preview shows with details (name, size, type)
3. User can proceed or select different file
4. Form submission shows loading state
5. Success/error alert appears

### Form Submission
1. User fills form
2. Submit button disabled/loading on click
3. Feedback message appears
4. Form clears on success
5. Error message shows on failure

### Navigation
1. Click nav link
2. Active state updates
3. Page content loads
4. Smooth scroll to section

### Status Updates
1. Poll `/api/system-status` every 5 seconds
2. Update status badges if changed
3. Add pulsing animation to active status
4. Maintain visual consistency

---

## 🚀 Performance Optimization

### CSS Strategy
- **No CSS frameworks** - Custom lightweight design system
- **CSS Variables**: Easy theming and maintenance
- **Utility Classes**: Quick styling without duplication
- **Minimal selectors**: Fast CSS parsing
- **Responsive images**: Proper sizing for device

### JavaScript Strategy
- **Vanilla JavaScript** - No jQuery or heavy frameworks
- **Event delegation** - Efficient event handling
- **Lazy loading** - Load content as needed
- **Debouncing**: Prevent excessive updates
- **Minimal DOM manipulation** - Batch updates

### Asset Optimization
- **Single CSS file**: Minimal HTTP requests
- **Single JS file**: Consolidated dependencies
- **Inline SVG icons**: Instant rendering
- **Optimized images**: Compressed and sized
- **No external fonts** - System font stack

---

## 🎨 Customization Guide

### Theming
1. Update CSS variables in `:root` selector
2. All colors automatically propagate
3. No component-specific overrides needed
4. Easy dark mode implementation

### Example Dark Mode
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-gray-50: #1a1a1a;
    --color-neutral-dark: #ffffff;
    /* ... more overrides */
  }
}
```

### Adding New Colors
```css
:root {
  --color-custom: #hexvalue;
  --color-custom-light: #lighthex;
  --color-custom-dark: #darkhex;
}
```

---

## 📋 Component Usage Examples

### Basic Card
```html
<div class="card">
  <div class="card-header">
    <h2 class="card-title">Title</h2>
  </div>
  <div class="card-body">Content</div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

### Status Badge
```html
<span class="status-badge status-success">
  <span class="status-dot"></span>
  System Healthy
</span>
```

### Form Group
```html
<div class="form-group">
  <label for="input-id">Label</label>
  <input type="text" id="input-id" placeholder="Hint text" required>
</div>
```

### Grid Layout
```html
<div class="grid grid-3 gap-lg">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

---

## 🔍 Design Tokens at a Glance

| Category | Property | Value |
|----------|----------|-------|
| **Color** | Primary | #0066cc |
| **Color** | Success | #10a741 |
| **Color** | Danger | #e53935 |
| **Spacing** | Default Gap | 24px |
| **Border** | Card Radius | 12px |
| **Shadow** | Card Shadow | md |
| **Font Size** | Base | 16px |
| **Line Height** | Base | 1.6 |
| **Transition** | Fast | 150ms |

---

## 📖 Developer Notes

### CSS Architecture
- **No nesting**: Flat structure for simplicity
- **Semantic class names**: Self-documenting
- **DRY principles**: Variables and utilities
- **Progressive enhancement**: Works without JS

### JavaScript Architecture
- **Event listeners**: Central setup
- **Fetch API**: Modern async handling
- **Error handling**: User feedback on failures
- **Modular functions**: Reusable components

### Maintenance
- Update design tokens in one place
- Test responsive breakpoints on devices
- Verify color contrast ratios
- Validate semantic HTML structure
- Monitor performance metrics

---

## 🎓 Best Practices

1. **Consistency**: Always use design tokens, never hardcoded values
2. **Accessibility**: Test with screen readers and keyboard only
3. **Performance**: Minimize DOM manipulation, batch updates
4. **Responsiveness**: Test on multiple device sizes
5. **Maintainability**: Use semantic class names, document changes
6. **Testing**: Verify in modern browsers and assistive technologies
7. **Scalability**: Design system supports future growth

---

## 📞 Support & Updates

For design questions or improvements, refer to this document and the CSS variables in `/static/css/styles.css`.

**Last Updated**: April 2026
**Version**: 1.0
