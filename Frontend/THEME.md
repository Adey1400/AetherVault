# AetherVault - Cyber Minimalist Design System

## 🎨 Design Philosophy

The AetherVault frontend follows a **"High-tech Security Vault"** aesthetic with a cyber-minimalist approach:

- **Deep Obsidian Background**: `#050505` - Premium, distraction-free environment
- **Glassmorphism**: Frosted glass effects for depth and elegance
- **Glowing Borders**: Subtle cyan and purple neon glows for interactivity
- **Terminal Aesthetic**: Monospace fonts (Fira Code) for authentic tech feel
- **Airy Premium Spacing**: Breathable layouts with generous whitespace
- **Micro-interactions**: Smooth animations using Framer Motion

---

## 🎯 Color Palette

### Primary Colors
- **Obsidian**: `#050505` (Deep black background)
- **Cyan Glow**: `#00d4ff` (Primary accent)
- **Purple Glow**: `#b026ff` (Secondary accent)

### Color Scale
- **Obsidian**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
- **Cyan**: glow (`#00d4ff`), bright (`#00f0ff`), dim (`#00a8cc`)
- **Purple**: glow (`#b026ff`), bright (`#d946ef`), dim (`#7e22ce`)

### Usage
```jsx
// Text colors
<p className="text-cyan-glow">Cyan text</p>
<p className="text-purple-glow">Purple text</p>

// Background colors
<div className="bg-obsidian-900">Dark background</div>

// Borders
<div className="border border-glow-cyan">Glowing border</div>
```

---

## ✨ Components & Utilities

### Glass Effect Classes
Apply premium glassmorphism effects:

```jsx
// Standard glass card
<div className="glass">Content</div>

// Large glass card
<div className="glass-lg">Content</div>
```

### Glow Border Classes
Add subtle glowing effects:

```jsx
// Cyan glow
<div className="glow-border-cyan">Content</div>

// Purple glow
<div className="glow-border-purple">Content</div>
```

### Button Styles

```jsx
// Primary cyber button
<button className="btn-cyber btn-cyber-primary">
  Click Me
</button>

// Secondary cyber button
<button className="btn-cyber btn-cyber-secondary">
  Secondary
</button>
```

### Badges

```jsx
<span className="badge badge-cyan">Active</span>
<span className="badge badge-purple">Premium</span>
```

### Status Indicators

```jsx
// Online status
<div className="status-online"></div>

// Offline status
<div className="status-offline"></div>
```

---

## 🎬 Typography

### Fonts
- **Monospace**: Fira Code (terminal feel) - headings, code
- **Sans**: Inter (readability) - body text, labels

### Font Sizes & Tracking
All font sizes include premium letter-spacing for technical aesthetic:
- `xs`: 0.75rem (0.05em tracking)
- `sm`: 0.875rem (0.02em tracking)
- `base`: 1rem (0.01em tracking)
- Large sizes progressively reduce tracking

### Headings
```jsx
<h1>Gradient Text with Glow</h1>  // Auto gradient + shadow
<h2>Large Section Title</h2>
<h3>Medium Title</h3>
```

---

## 🚀 Animations

### Built-in Animations

```jsx
// Pulse glow effect
<div className="animate-pulse-glow">Pulsing element</div>

// Float effect
<div className="animate-float">Floating element</div>

// Glow flicker
<div className="animate-glow-flicker">Flickering text</div>
```

### Framer Motion Integration

Use Framer Motion for advanced micro-interactions:

```jsx
import { motion } from 'framer-motion';

// Scale on hover
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive Button
</motion.button>

// Fade in animation
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

---

## 📐 Spacing System

Premium, airy spacing for high-end feel:
- `xs`: 0.25rem
- `sm`: 0.5rem
- `md`: 1rem (default)
- `lg`: 1.5rem
- `xl`: 2rem
- `2xl`: 3rem
- `3xl`: 4rem

```jsx
<div className="p-lg">Large padding</div>
<div className="gap-xl">Large gap</div>
```

---

## 🎨 Component Examples

### Hero Section
```jsx
<section className="mb-3xl">
  <h1>Welcome to AetherVault</h1>
  <p className="text-gray-300">Premium security solution</p>
  <button className="btn-cyber btn-cyber-primary">Get Started</button>
</section>
```

### Feature Card
```jsx
<motion.div
  className="glass glow-border-cyan rounded-lg p-lg"
  whileHover={{ y: -4 }}
>
  <h3>Feature Title</h3>
  <p className="text-gray-400">Feature description</p>
</motion.div>
```

### Stat Box
```jsx
<div className="glass-lg glow-border-cyan rounded-2xl p-2xl">
  <div className="text-4xl font-mono font-bold text-cyan-glow">10K+</div>
  <p className="text-gray-400">Active Users</p>
</div>
```

---

## 🛠️ Development Tips

### 1. **Always Use Glass Effect for Cards**
Maintains visual consistency and premium aesthetic.

### 2. **Prioritize Cyan for Primary Actions**
Purple as secondary. Follows security vault theme.

### 3. **Add Glow to Interactive Elements**
Improves visual feedback and engagement.

### 4. **Use Monospace for Technical Content**
Code, numbers, system messages, and labels.

### 5. **Generous Whitespace**
Airy layouts feel premium. Don't overcrowd content.

### 6. **Smooth Transitions**
All color transitions are 250ms by default. Use Framer Motion for complex animations.

### 7. **Responsive Design**
Mobile-first approach with Tailwind's responsive prefixes:
```jsx
<div className="md:p-lg p-md">Responsive padding</div>
```

---

## 📱 Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 🎓 Advanced Patterns

### Animated Counter
```jsx
<motion.div
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  {value}
</motion.div>
```

### Gradient Text
```jsx
<h1 className="bg-gradient-to-r from-cyan-glow to-purple-glow bg-clip-text text-transparent">
  Gradient Title
</h1>
```

### Custom Glow Box Shadow
```jsx
// Already available as utility classes
<div className="shadow-glow-cyan">Cyan glow shadow</div>
<div className="shadow-glow-purple">Purple glow shadow</div>
```

---

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Backdrop filters require modern browser support
- Fallbacks to standard glass effect in older browsers

---

## 📦 Dependencies

- **React 19+**: Component framework
- **Vite 8+**: Build tool with HMR
- **Tailwind CSS 4.2+**: Utility-first styling
- **Framer Motion 12+**: Advanced animations
- **React Icons 5.6+**: Icon library

---

## 🔄 Color Theming Guide

### How to Change Theme

Edit `tailwind.config.js` colors section:

```javascript
colors: {
  obsidian: { /* your dark colors */ },
  cyan: { /* your primary accent */ },
  purple: { /* your secondary accent */ },
}
```

### Creating Dark/Light Toggle (Future Enhancement)

Can be implemented using CSS variables or Tailwind's dark mode:

```jsx
// Enable in tailwind.config.js
darkMode: 'class'

// Use in components
<div className="dark:bg-obsidian-950 bg-white">
  Toggleable background
</div>
```

---

## 🎯 Best Practices

1. ✅ Use semantic HTML with Tailwind classes
2. ✅ Leverage Framer Motion for micro-interactions
3. ✅ Maintain consistent spacing with theme scale
4. ✅ Use glass effect for elevated content
5. ✅ Add glow effects to interactive elements
6. ✅ Keep text readable with sufficient contrast
7. ✅ Test on multiple screen sizes
8. ✅ Use animations to guide user attention

---

## 📖 File Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Retractable sidebar with animations
│   ├── Layout.jsx          # Global layout wrapper
│   └── index.js            # Component exports
├── App.jsx                 # Main app with theme showcase
├── App.css                 # Minimal, Tailwind-focused
├── index.css               # Global styles & custom utilities
├── main.jsx                # Entry point
└── tailwind.config.js      # Theme configuration
```

---

## 🚀 Getting Started

1. **Import Layout in your pages:**
   ```jsx
   import { Layout } from '@/components';
   
   export default function Page() {
     return (
       <Layout>
         <h1>Your Page Title</h1>
         {/* Content */}
       </Layout>
     );
   }
   ```

2. **Use Tailwind classes:**
   ```jsx
   <div className="glass glow-border-cyan rounded-lg p-lg">
     Premium content
   </div>
   ```

3. **Add animations:**
   ```jsx
   import { motion } from 'framer-motion';
   
   <motion.div
     whileHover={{ scale: 1.05 }}
     className="btn-cyber btn-cyber-primary"
   >
     Click Me
   </motion.div>
   ```

---

## 💡 Need Help?

- Check existing components for patterns
- Use Tailwind's JIT mode for custom values
- Reference Framer Motion docs for animations
- Test color combinations in browser DevTools

---

**Happy coding! 🔐✨**
