import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProjectsOverlay.css';

const ProjectsOverlay = ({ isOpen, onClose, isDarkTheme }) => {
  useEffect(() => {
    if (isOpen) {
      // Disable body scroll when overlay is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll when overlay is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    // Close when clicking on the overlay background (not the content)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`projects-overlay ${isOpen ? 'overlay-open' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="overlay-content">
        <button className="close-button" onClick={onClose}>
          <span></span>
          <span></span>
        </button>
        
        <div className="overlay-menu">
          <div className="menu-section">
            <h2>SERVICES</h2>
            <div className="menu-links">
              <Link to="/portfolio?category=architectural-visualization" onClick={onClose}>
                <span className="link-number">01</span>
                <div className="link-content">
                  <span className="link-title">ARCHITECTURAL VISUALIZATION</span>
                  <span className="link-desc">Photorealistic renders & 3D designs for competitions and new constructions</span>
                </div>
              </Link>
              
              <Link to="/portfolio?category=interior-design" onClick={onClose}>
                <span className="link-number">02</span>
                <div className="link-content">
                  <span className="link-title">INTERIOR DESIGN</span>
                  <span className="link-desc">Luxury residential interiors with refined aesthetics and functionality</span>
                </div>
              </Link>
              
              <Link to="/portfolio?category=landscape-design" onClick={onClose}>
                <span className="link-number">03</span>
                <div className="link-content">
                  <span className="link-title">LANDSCAPE DESIGN</span>
                  <span className="link-desc">Outdoor spaces, gardens, and architectural landscapes</span>
                </div>
              </Link>
              
              <Link to="/portfolio?category=project-execution" onClick={onClose}>
                <span className="link-number">04</span>
                <div className="link-content">
                  <span className="link-title">PROJECT EXECUTION</span>
                  <span className="link-desc">End-to-end coordination with premier craftsmen</span>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="menu-section">
            <h2>PROJECT TYPES</h2>
            <div className="menu-links">
              <Link to="/portfolio?type=residential" onClick={onClose}>
                <span className="link-number">01</span>
                <div className="link-content">
                  <span className="link-title">LUXURY VILLAS</span>
                  <span className="link-desc">High-end residential projects across UAE</span>
                </div>
              </Link>
              
              <Link to="/portfolio?type=commercial" onClick={onClose}>
                <span className="link-number">02</span>
                <div className="link-content">
                  <span className="link-title">COMMERCIAL SPACES</span>
                  <span className="link-desc">Office buildings and retail interior design</span>
                </div>
              </Link>
              
              <Link to="/portfolio?type=hospitality" onClick={onClose}>
                <span className="link-number">03</span>
                <div className="link-content">
                  <span className="link-title">HOSPITALITY</span>
                  <span className="link-desc">Hotels, restaurants, and entertainment venues</span>
                </div>
              </Link>
              
              <Link to="/portfolio" onClick={onClose}>
                <span className="link-number">04</span>
                <div className="link-content">
                  <span className="link-title">VIEW ALL PROJECTS</span>
                  <span className="link-desc">Complete portfolio showcase</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="overlay-footer">
          <p>Crafting luxury spaces with soul and precision</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsOverlay;