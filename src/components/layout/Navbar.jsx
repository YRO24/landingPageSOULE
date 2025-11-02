import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../../utils/constants';
import './Navbar.css';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
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
    // Detect light background sections and communities section
    const handleScroll = () => {
      const lightSections = document.querySelectorAll('.about-soule, .contact-section, .communities-section');
      const navbarHeight = 200; // Increased height to ensure proper detection
      
      let isOverLightSection = false;
      
      lightSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Check if navbar overlaps with light section (more generous detection)
        if (rect.top < navbarHeight && rect.bottom > -50) {
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
          <Link to="/" className="logo logo-text">
            <div className="logo-main">SOULE</div>
            <div className="logo-sub">STUDIO</div>
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
            <li><Link to="/portfolio">PROJECTS</Link></li>
            <li><Link to="/contact">CONTACT</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
