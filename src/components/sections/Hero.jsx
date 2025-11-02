import { useState, useEffect, useRef, useCallback } from 'react';
import './Hero.css';
import Button from '../common/Button';

const Hero = ({ title, subtitle, backgroundImage, hasSlider = false, communityName = '', slideImages = [], onScrollLockChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  
  // Ensure we have valid images
  const images = slideImages && slideImages.length > 0 ? slideImages.filter(Boolean) : [backgroundImage].filter(Boolean);
  const totalSlides = images.length;
  const heroRef = useRef(null);
  const lastWheelTime = useRef(0);
  const wheelTimeout = useRef(null);

  // Handle image load errors
  const handleImageError = useCallback(() => {
    setImageLoadError(true);
  }, []);

  // Initialize scroll lock state
  useEffect(() => {
    if (!hasSlider || images.length <= 1) {
      setIsScrollLocked(false);
      onScrollLockChange?.(false);
      return;
    }
    setIsScrollLocked(true);
    onScrollLockChange?.(true);
  }, [hasSlider, images.length, onScrollLockChange]);

  // Manage body overflow when scroll is locked
  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    
    // Notify parent of scroll lock state change
    onScrollLockChange?.(isScrollLocked);

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isScrollLocked, onScrollLockChange]);

  const handleSlideChange = useCallback((newSlide) => {
    if (newSlide >= 0 && newSlide < totalSlides) {
      setCurrentSlide(newSlide);
      
      // If we've reached the last slide, unlock scroll after a short delay
      if (newSlide === totalSlides - 1) {
        setTimeout(() => {
          setIsScrollLocked(false);
          onScrollLockChange?.(false);
        }, 300);
      }
    }
  }, [totalSlides, onScrollLockChange]);

  useEffect(() => {
    if (!hasSlider || !isScrollLocked || totalSlides <= 1) return;

    const handleWheel = (e) => {
      const now = Date.now();
      
      // Much slower throttling to prevent fast sliding
      if (now - lastWheelTime.current < 800) return;
      
      lastWheelTime.current = now;
      
      // Clear existing timeout
      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current);
      }
      
      // Only prevent default if we're going to handle the scroll
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;
      
      const shouldHandle = (
        (scrollingDown && currentSlide < totalSlides - 1) ||
        (scrollingUp && currentSlide > 0) ||
        (scrollingDown && currentSlide === totalSlides - 1)
      );
      
      if (shouldHandle) {
        e.preventDefault();
        e.stopPropagation();
      }

      wheelTimeout.current = setTimeout(() => {
        if (scrollingDown && currentSlide < totalSlides - 1) {
          handleSlideChange(currentSlide + 1);
        } else if (scrollingUp && currentSlide > 0) {
          handleSlideChange(currentSlide - 1);
        } else if (scrollingDown && currentSlide === totalSlides - 1) {
          // On last slide, unlock scroll with longer delay
          setTimeout(() => {
            setIsScrollLocked(false);
            onScrollLockChange?.(false);
          }, 800);
        }
      }, 200);
    };

    // Add wheel listener to the hero element specifically
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('wheel', handleWheel);
      }
      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current);
      }
    };
  }, [hasSlider, isScrollLocked, currentSlide, totalSlides, handleSlideChange]);

  const currentBackground = images[currentSlide] || backgroundImage;

  const handleDotClick = useCallback((index) => {
    handleSlideChange(index);
  }, [handleSlideChange]);

  // Don't render if no images available
  if (!currentBackground && !imageLoadError) {
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
      className={`hero ${isScrollLocked ? 'scroll-locked' : ''}`} 
      style={{ 
        backgroundImage: imageLoadError 
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${currentBackground})`
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
        <Button variant="primary">DISCOVER NOW</Button>
      </div>
      
      {hasSlider && totalSlides > 1 && (
        <div className="scroll-indicator">
          <div className="scroll-dots">
            {images.map((_, index) => (
              <span 
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
                    e.preventDefault();
                    handleDotClick(index);
                  }
                }}
              />
            ))}
          </div>
          {isScrollLocked && (
            <div className="scroll-instruction">
              Scroll to explore {currentSlide + 1}/{totalSlides}
            </div>
          )}
        </div>
      )}
      
      <div className="whatsapp-icon">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
          <path d="M16 0C7.164 0 0 7.164 0 16c0 2.825.738 5.491 2.031 7.797L0 32l8.394-2.031C10.659 31.238 13.249 32 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.333c-2.547 0-4.958-.7-7.009-1.917l-.503-.3-5.181 1.25 1.263-5.084-.328-.522A13.277 13.277 0 012.667 16c0-7.364 5.97-13.333 13.333-13.333S29.333 8.636 29.333 16 23.364 29.333 16 29.333z"/>
          <path d="M23.503 19.403c-.336-.169-1.991-.983-2.3-1.094-.309-.111-.534-.169-.759.169-.225.336-.872 1.094-1.069 1.322-.197.225-.394.253-.731.084-.336-.169-1.419-.525-2.703-1.672-.998-.891-1.672-1.991-1.869-2.328-.197-.336-.022-.519.147-.688.15-.15.336-.394.503-.591.169-.197.225-.336.336-.563.111-.225.056-.422-.028-.591-.084-.169-.759-1.828-.941-2.5-.178-.653-.359-.563-.759-.575h-.647c-.225 0-.591.084-.9.422-.309.336-1.181 1.153-1.181 2.813s1.209 3.263 1.378 3.488c.169.225 2.381 3.638 5.766 5.1.806.347 1.434.556 1.925.712.809.256 1.544.219 2.125.134.647-.097 1.991-.816 2.272-1.603.281-.787.281-1.463.197-1.603-.084-.141-.309-.225-.647-.394z" fill="white"/>
        </svg>
      </div>
      
      {/* Hidden image for error tracking */}
      {currentBackground && (
        <img 
          src={currentBackground} 
          alt="" 
          style={{ display: 'none' }}
          onError={handleImageError}
        />
      )}
    </section>
  );
};

export default Hero;
