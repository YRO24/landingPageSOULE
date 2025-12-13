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
    // Set initial navbar to light mode for project detail pages only
    const currentPath = location.pathname;
    const shouldStartLight = currentPath.includes('/project/');
    setIsDarkTheme(shouldStartLight);
  }, [location]);

  useEffect(() => {
    // Detect light background sections and communities section
    const handleScroll = () => {
      // Define light sections for all pages (sections with light backgrounds that need dark navbar text)
      const lightSections = document.querySelectorAll('.about-soule, .contact-section, .communities-section, .mission-vision, .core-values, .services-section, .portfolio-page, .portfolio-nav');
      const navbarHeight = 60; // Reduced height for more precise detection
      
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
    
    // Only check initial scroll state if not on about or project detail pages
    // (those pages set their own initial state)
    const currentPath = location.pathname;
    if (!currentPath.includes('/project/') && !currentPath.includes('/about')) {
      handleScroll();
    }
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [location]);



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

  const handleContactClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Function to scroll to contact section
    const scrollToContact = () => {
      const contactSection = document.querySelector('.contact-section');
      if (contactSection) {
        const elementTop = contactSection.offsetTop - 70;
        window.scrollTo({
          top: elementTop,
          behavior: 'smooth'
        });
      }
    };
    
    // Check current page
    const currentPath = location.pathname;
    
    // If we're on home page, handle slideshow navigation
    if (currentPath === '/') {
      // Check if we're in the slideshow area
      const heroSection = document.querySelector('.hero');
      const currentScrollY = window.scrollY;
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
      
      if (currentScrollY < heroHeight) {
        // We're in the slideshow, simulate down arrows until end of slideshow
        let arrowCount = 0;
        const maxArrows = 10; // Safety limit
        
        const sendArrowAndCheck = () => {
          // Send down arrow key event
          const downArrowEvent = new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            code: 'ArrowDown',
            keyCode: 40,
            which: 40,
            bubbles: true,
            cancelable: true
          });
          document.dispatchEvent(downArrowEvent);
          
          arrowCount++;
          
          // Check after a short delay if we're still in slideshow area
          setTimeout(() => {
            const newScrollY = window.scrollY;
            const stillInHero = newScrollY < (heroHeight - 100); // Small buffer
            
            if (stillInHero && arrowCount < maxArrows) {
              // Still in slideshow, send another arrow
              sendArrowAndCheck();
            } else {
              // Reached end of slideshow or hit limit, now jump to contact
              setTimeout(() => {
                scrollToContact();
              }, 200); // Small delay before jumping to contact
            }
          }, 150); // Wait for scroll animation to complete
        };
        
        sendArrowAndCheck();
      } else {
        // Not in slideshow, jump directly to contact section
        scrollToContact();
      }
    } else {
      // On other pages (about, portfolio), scroll directly to contact section
      scrollToContact();
    }
  };

  const handleCloseOverlay = () => {
    setShowProjectsOverlay(false);
  };

  return (
    <>
      <nav 
        className={`navbar navbar-visible ${isDarkTheme ? 'dark-theme' : 'transparent'} ${isMobileMenuOpen ? 'mobile-open' : ''}`}
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
            <Link to="/" className="center-logo-link">
              <img 
                src={isDarkTheme ? IMAGES.souleLogoNavbarCenterDark : IMAGES.souleLogoNavbarCenter} 
                alt="Soule Logo" 
                className="center-logo" 
              />
            </Link>
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
              <li>
                <button 
                  className="projects-trigger"
                  onClick={handleContactClick}
                >
                  CONTACT
                </button>
              </li>
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
