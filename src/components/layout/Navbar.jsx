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
    }, 3000); // 3 second delay before hiding

    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    // Detect light background sections
    const handleScroll = () => {
      const lightSections = document.querySelectorAll('.about-soule, .contact-section');
      const navbarHeight = 150; // Approximate navbar height
      
      let isOverLightSection = false;
      
      lightSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Check if navbar overlaps with light section
        if (rect.top < navbarHeight && rect.bottom > 0) {
          isOverLightSection = true;
        }
      });
      
      setIsDarkTheme(isOverLightSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
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
    }, 1500); // 1.5 second delay before hiding after mouse leaves
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
              src={isDarkTheme ? IMAGES.souleLogo : IMAGES.souleLogoNavbarCenter} 
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
