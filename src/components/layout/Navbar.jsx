import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IMAGES } from '../../utils/constants';
import ProjectsOverlay from './ProjectsOverlay';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showProjectsOverlay, setShowProjectsOverlay] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 900 : false
  );



  useEffect(() => {
    // Set initial dark theme based on route
    const currentPath = location.pathname + location.search;
    const shouldStartDark = currentPath.includes('/portfolio') || 
                           currentPath.includes('/project/') ||
                           currentPath.includes('portfolio?category=project-execution');
    setIsDarkTheme(shouldStartDark);
  }, [location]);

  useEffect(() => {
    // Detect light background sections and communities section
    const handleScroll = () => {
      const currentPath = window.location.pathname + window.location.search;
      const forceLightRoute = currentPath.includes('/portfolio') || currentPath.includes('/project/');
      // Define light sections for all pages including project detail pages
      const lightSections = document.querySelectorAll('.about-soule, .contact-section, .communities-section, .team-section, .mission-vision, .core-values, .services-section, .project-content-section, .project-gallery-section, .extended-gallery-section, .portfolio-page, .portfolio-nav, .project-detail-page');
      const navbarHeight = 60; // Reduced height for more precise detection
      
      let isOverLightSection = false;
      
      lightSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Check if navbar overlaps with light section (more precise detection)
        if (rect.top < navbarHeight && rect.bottom > 0) {
          isOverLightSection = true;
        }
      });
      if (forceLightRoute) {
        isOverLightSection = true;
      }
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



  useEffect(() => {
    const handleResize = () => {
      const mobileNow = window.innerWidth <= 900;
      setIsMobileView(mobileNow);
      if (!mobileNow) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    if (!isMobileView) return;
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleProjectsClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setShowProjectsOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowProjectsOverlay(false);
  };

  return (
    <>
      <nav 
        className={`navbar navbar-visible ${isDarkTheme ? 'dark-theme' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}
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

          <div className="nav-actions">
            <button 
              className={`hamburger ${isDarkTheme ? 'dark' : ''} ${isMobileMenuOpen ? 'open' : ''}`} 
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            
            <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
              <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>ABOUT US</Link></li>
              <li>
                <button 
                  className="projects-trigger"
                  onClick={handleProjectsClick}
                >
                  PROJECTS
                </button>
              </li>
              <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>CONTACT</Link></li>
            </ul>
          </div>
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
