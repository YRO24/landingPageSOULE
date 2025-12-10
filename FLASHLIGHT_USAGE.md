# Flashlight Image Effect - Usage Guide

## Overview
The `FlashlightImage` component provides a reusable flashlight/spotlight reveal effect for images. The base image appears dimmed and slightly grayscale, with a circular area following your cursor that reveals the full-color bright version.

## Installation
The component is already added to your project at:
- Component: `src/components/common/FlashlightImage.jsx`
- Styles: `src/components/common/FlashlightImage.css`

## Basic Usage

### Import the component:
```jsx
import FlashlightImage from '../components/common/FlashlightImage';
```

### Replace existing `<img>` tags:
```jsx
// Before:
<img src="/path/to/image.jpg" alt="Description" className="my-class" />

// After:
<FlashlightImage src="/path/to/image.jpg" alt="Description" className="my-class" />
```

## Examples

### 1. Simple Image Replacement
```jsx
<FlashlightImage 
  src={IMAGES.hero} 
  alt="Hero Image" 
/>
```

### 2. With Custom Styling
```jsx
<FlashlightImage 
  src={IMAGES.bedroom4}
  alt="Bedroom"
  className="gallery-image"
  style={{ borderRadius: '8px' }}
/>
```

### 3. In a Grid/Gallery
```jsx
<div className="gallery-grid">
  {images.map((image, index) => (
    <FlashlightImage 
      key={index}
      src={image.src}
      alt={image.alt}
      className="gallery-item"
    />
  ))}
</div>
```

### 4. With All Standard Image Props
```jsx
<FlashlightImage 
  src={IMAGES.project1}
  alt="Project Image"
  className="project-image"
  loading="lazy"
  width="800"
  height="600"
/>
```

## Customization

### Adjust Flashlight Radius
Edit `FlashlightImage.css` to change the reveal circle size:
```css
/* Change 200px to your desired radius */
.flashlight-image-reveal {
  -webkit-mask-image: radial-gradient(
    circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%),
    black 0%,
    transparent 100%
  );
}
```

### Adjust Dimming Level
Edit the base image filter:
```css
.flashlight-image-base {
  filter: brightness(0.5) grayscale(30%);
  /* Change brightness (0-1) and grayscale (0-100%) */
}
```

### Change Reveal Animation Speed
```css
.flashlight-image-reveal {
  transition: mask-image 0.1s ease;
  /* Change 0.1s to desired speed */
}
```

## Performance Notes

1. **Individual Mouse Listeners**: Each image has its own mouse listener for independent tracking
2. **Passive Events**: Uses `{ passive: true }` for better scroll performance
3. **GPU Acceleration**: Uses CSS masks which are GPU-accelerated
4. **Mobile Optimization**: Automatically disables effect on touch devices

## Browser Support

- ✅ Chrome/Edge (full support)
- ✅ Firefox (full support)
- ✅ Safari (full support with -webkit- prefix)
- ✅ Mobile browsers (effect disabled, shows normal images)

## Migration Guide

To apply this effect to your existing images:

### Step 1: Import the component where needed
```jsx
import FlashlightImage from '../components/common/FlashlightImage';
```

### Step 2: Find and replace `<img>` tags
```jsx
// Find all instances of:
<img src={...} ... />

// Replace with:
<FlashlightImage src={...} ... />
```

### Step 3: Update any image-specific CSS
The wrapper inherits dimensions, so your existing CSS should work. If you have specific image selectors:
```css
/* Before */
.my-image { ... }

/* After - either keep the same or use: */
.flashlight-image-container.my-image { ... }
```

## Troubleshooting

### Effect not working?
- Check that CSS file is imported
- Verify browser supports CSS mask-image
- Check console for errors

### Images not sizing correctly?
- Add `width: 100%; height: 100%;` to the container's parent
- Ensure the component inherits the correct dimensions

### Performance issues?
- Reduce the number of images on screen
- Increase transition duration
- Consider lazy loading images

## Example: Converting Hero Section

### Before:
```jsx
<div className="hero" style={{ backgroundImage: `url(${IMAGES.hero})` }}>
  <h1>Title</h1>
</div>
```

### After:
```jsx
<div className="hero">
  <FlashlightImage 
    src={IMAGES.hero}
    alt="Hero Background"
    style={{ 
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }}
  />
  <div style={{ position: 'relative', zIndex: 1 }}>
    <h1>Title</h1>
  </div>
</div>
```
