import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IMAGES } from '../../utils/constants';
import ProjectsOverlay from './ProjectsOverlay';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showProjectsOverlay, setShowProjectsOverlay] = useState(false);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    // Start hide timer on mount
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 4000); // 4 second delay before hiding (slightly longer for better UX)

    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    // Set initial dark theme based on route
    const currentPath = location.pathname + location.search;
    const shouldStartDark = currentPath.includes('portfolio?category=project-execution') || 
                           currentPath.includes('/portfolio') && location.search.includes('category=project-execution');
    setIsDarkTheme(shouldStartDark);
  }, [location]);

  useEffect(() => {
    // Detect light background sections and communities section
    const handleScroll = () => {
      const lightSections = document.querySelectorAll('.about-soule, .contact-section, .communities-section, .team-section, .mission-vision, .core-values, .services-section');
      const navbarHeight = 80; // Reduced height for more precise detection
      
      let isOverLightSection = false;
      
      lightSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Check if navbar overlaps with light section (more precise detection)
        if (rect.top < navbarHeight && rect.bottom > 0) {
          isOverLightSection = true;
        }
      });
      setIsDarkTheme(isOverLightSection);
    };

    // Use throttled scroll for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // 2 second delay before hiding after mouse leaves
  };

  const handleProjectsClick = (e) => {
    e.preventDefault();
    setShowProjectsOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowProjectsOverlay(false);
  };

  return (
    <>
      <div 
        className="navbar-trigger-area"
        onMouseEnter={handleMouseEnter}
      />
      <nav 
        className={`navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'} ${isDarkTheme ? 'dark-theme' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="nav-container">
          <Link to="/" className="logo">
            <img 
              src={isDarkTheme ? IMAGES.souleLogoNavbarLeftDark : IMAGES.souleLogoNavbarLeft} 
              alt="Soule Studio" 
              className="logo-image"
            />
          </Link>
          
          <div className="nav-center">
            <img 
              src={isDarkTheme ? IMAGES.souleLogoNavbarCenterDark : IMAGES.souleLogoNavbarCenter} 
              alt="Soule Logo" 
              className="center-logo" 
            />
          </div>
          
          <ul className="nav-links">
            <li><Link to="/about">ABOUT US</Link></li>
            <li>
              <button 
                className="projects-trigger"
                onClick={handleProjectsClick}
              >
                PROJECTS
              </button>
            </li>
            <li><Link to="/contact">CONTACT</Link></li>
          </ul>
        </div>
      </nav>
      
      <ProjectsOverlay 
        isOpen={showProjectsOverlay}
        onClose={handleCloseOverlay}
        isDarkTheme={isDarkTheme}
      />
    </>
  );
};

export default Navbar;
