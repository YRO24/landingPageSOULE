# Soule Studio - Interior Design Website

A modern, responsive interior design portfolio website built with React and Vite.

## 📁 Project Structure

```
magic/
├── public/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Button.css
│   │   │   ├── ProjectCard.jsx
│   │   │   └── ProjectCard.css
│   │   ├── layout/           # Layout components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   └── sections/         # Page sections
│   │       ├── Hero.jsx
│   │       ├── Hero.css
│   │       ├── ContactForm.jsx
│   │       ├── ContactForm.css
│   │       ├── ProjectShowcase.jsx
│   │       └── ProjectShowcase.css
│   ├── pages/                # Page components
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Portfolio.jsx
│   │   ├── Portfolio.css
│   │   ├── ProjectDetail.jsx
│   │   └── ProjectDetail.css
│   ├── data/                 # Data and content
│   │   └── content.js
│   ├── hooks/                # Custom React hooks (for future use)
│   ├── utils/                # Utility functions (for future use)
│   ├── styles/               # Global styles (for future use)
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

## 🎨 Features

- **Responsive Design**: Fully responsive across all devices
- **React Router**: Client-side routing for smooth navigation
- **Modular Architecture**: Well-organized component structure
- **Reusable Components**: Common UI elements like buttons, cards, etc.
- **Custom Fonts**: Uses GeneralSans font from the Fonts folder
- **Project Showcase**: Dynamic project galleries and detail pages
- **Contact Form**: Integrated contact form component
- **Service Pages**: About page with team, services, and core values

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📦 Dependencies

- React 19.1.1
- React Router DOM 7.x
- Vite 7.1.7

## 🗂️ Component Organization

### Layout Components (`components/layout/`)
- `Navbar`: Site navigation with logo and links
- `Footer`: Site footer with contact info and social links

### Common Components (`components/common/`)
- `Button`: Reusable button with multiple variants
- `ProjectCard`: Card component for displaying projects

### Section Components (`components/sections/`)
- `Hero`: Hero section with background image and CTA
- `ContactForm`: Contact form with validation
- `ProjectShowcase`: Project display with image and description

### Pages (`pages/`)
- `Home`: Landing page with hero, categories, and featured projects
- `About`: About page with team, mission, vision, values, and services
- `Portfolio`: Project gallery with filtering
- `ProjectDetail`: Detailed project page with images and information

## 🎯 Key Concepts

### Component Reusability
Components are designed to be reusable with props for customization:
```jsx
<Button variant="primary" to="/about">Read More</Button>
<ProjectShowcase dark={true} reverse={true} {...props} />
```

### Data-Driven Content
Project and content data is centralized in `src/data/content.js` for easy management.

### CSS Organization
Each component has its own CSS file for better maintainability and scoped styling.

## 🔧 Customization

- **Add New Projects**: Edit `src/data/content.js`
- **Update Styling**: Modify component-specific CSS files
- **Add New Pages**: Create in `src/pages/` and add routes in `App.jsx`
- **Custom Hooks**: Add to `src/hooks/` for shared logic
- **Utilities**: Add helper functions to `src/utils/`

## 📸 Assets

- Images: Located in `/Users/Parag/Downloads/Links/`
- Fonts: Located in `/Users/Parag/Downloads/Fonts/`

## 🎨 Design System

- **Primary Font**: GeneralSans (Variable)
- **Color Scheme**: 
  - Primary: Black (#000)
  - Secondary: White (#fff)
  - Text Dark: #333
  - Text Light: #666
  - Background Light: #f5f5f5

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

Built with ❤️ using React + Vite
