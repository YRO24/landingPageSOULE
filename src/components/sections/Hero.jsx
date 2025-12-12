import { useState, useEffect, useCallback, useRef } from 'react';
import './Hero.css';
import Button from '../common/Button';

const Hero = ({ title, subtitle, backgroundImage, communityName = '', slideImages = [] }) => {
  const [imageLoadError, setImageLoadError] = useState(false);
  const heroRef = useRef(null);
  
  // Use only the first image as the hero background
  const baseImage = (slideImages && slideImages.length > 0 ? slideImages[0] : backgroundImage) || '';

  // Handle image load errors
  const handleImageError = useCallback(() => {
    setImageLoadError(true);
  }, []);

  // Flashlight effect (desktop only)
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Check if device is mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches || 
                     window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    
    if (isMobile) return; // Don't add flashlight on mobile

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      hero.style.setProperty('--mouse-x', `${x}px`);
      hero.style.setProperty('--mouse-y', `${y}px`);
    };

    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);



  // Don't render if no image available
  if (!baseImage && !imageLoadError) {
    return (
      <section className="hero" style={{ backgroundColor: '#333' }}>
        <div className="hero-content">
          <h1>{title}</h1>
          {subtitle && <h2>{subtitle}</h2>}
          <Button variant="primary">DISCOVER NOW</Button>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={heroRef}
      className="hero"
      style={{
        backgroundImage: imageLoadError
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${baseImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {communityName && (
        <div className="hero-community-name">
          {communityName}
        </div>
      )}
      <div className="hero-content">
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
        <Button 
          variant="primary" 
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
              });
            }
          }}
        >
          DISCOVER NOW
        </Button>
      </div>
      {/* Hidden image for error tracking */}
      {baseImage && (
        <img 
          src={baseImage} 
          alt="" 
          style={{ display: 'none' }}
          onError={handleImageError}
        />
      )}
    </section>
  );
};

export default Hero;
