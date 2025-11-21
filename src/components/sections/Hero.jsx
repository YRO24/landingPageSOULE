"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from "motion/react";
import './Hero.css';
import Button from '../common/Button';

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const Hero = ({ title, subtitle, backgroundImage, hasSlider = false, communityName = '', slideImages = [], onScrollLockChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isMobileView, setIsMobileView] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  
  // Ensure we have valid images
  const images = slideImages && slideImages.length > 0 ? slideImages.filter(Boolean) : [backgroundImage].filter(Boolean);
  const totalSlides = images.length;
  const sliderEnabled = hasSlider && totalSlides > 1 && !isMobileView;
  const heroRef = useRef(null);
  const lastWheelTime = useRef(0);
  const isScrolling = useRef(false);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  // Handle image load errors
  const handleImageError = useCallback(() => {
    setImageLoadError(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize scroll lock state
  useEffect(() => {
    if (!sliderEnabled) {
      setIsScrollLocked(false);
      onScrollLockChange?.(false);
      return;
    }
    setIsScrollLocked(true);
    onScrollLockChange?.(true);
  }, [sliderEnabled, onScrollLockChange]);

  // Manage body overflow when scroll is locked and hide scrollbar
  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      // Hide scrollbar globally when hero is active
      document.documentElement.style.scrollbarWidth = 'none';
      document.documentElement.style.msOverflowStyle = 'none';
      let style = document.querySelector('style[data-scrollbar="hidden"]');
      if (!style) {
        style = document.createElement('style');
        style.setAttribute('data-scrollbar', 'hidden');
        style.textContent = '::-webkit-scrollbar { display: none; }';
        document.head.appendChild(style);
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      // Restore scrollbar
      document.documentElement.style.scrollbarWidth = '';
      document.documentElement.style.msOverflowStyle = '';
      const existingStyle = document.querySelector('style[data-scrollbar="hidden"]');
      if (existingStyle) existingStyle.remove();
    }
    
    // Notify parent of scroll lock state change
    onScrollLockChange?.(isScrollLocked);

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.scrollbarWidth = '';
      document.documentElement.style.msOverflowStyle = '';
      const existingStyle = document.querySelector('style[data-scrollbar="hidden"]');
      if (existingStyle) existingStyle.remove();
    };
  }, [isScrollLocked, onScrollLockChange]);

  const handleSlideChange = useCallback((newDirection) => {
    const nextSlide = wrap(0, totalSlides, currentSlide + newDirection);

    setCurrentSlide(nextSlide);
    setDirection(newDirection);
  }, [currentSlide, totalSlides]);

  useEffect(() => {
    if (!sliderEnabled || !isScrollLocked) return;

    const handleWheel = (e) => {
      const now = Date.now();

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if (isScrolling.current || now - lastWheelTime.current < 550) {
        return;
      }

      if (scrollingDown && currentSlide < totalSlides - 1) {
        e.preventDefault();
        e.stopPropagation();
        isScrolling.current = true;
        lastWheelTime.current = now;
        handleSlideChange(1);
      } else if (scrollingUp && currentSlide > 0) {
        e.preventDefault();
        e.stopPropagation();
        isScrolling.current = true;
        lastWheelTime.current = now;
        handleSlideChange(-1);
      } else if (scrollingDown && currentSlide === totalSlides - 1) {
        setIsScrollLocked(false);
        onScrollLockChange?.(false);
      }

      if (isScrolling.current) {
        setTimeout(() => {
          isScrolling.current = false;
        }, 700);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' && currentSlide < totalSlides - 1) {
        e.preventDefault();
        handleSlideChange(1);
      } else if (e.key === 'ArrowUp' && currentSlide > 0) {
        e.preventDefault();
        handleSlideChange(-1);
      } else if (e.key === 'ArrowDown' && currentSlide === totalSlides - 1) {
        setIsScrollLocked(false);
        onScrollLockChange?.(false);
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('wheel', handleWheel);
      }
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [sliderEnabled, isScrollLocked, currentSlide, totalSlides, handleSlideChange, onScrollLockChange]);

  // Relock the hero when the user scrolls back to the top so slides can reverse on upward scroll
  useEffect(() => {
    if (!sliderEnabled) return;

    const handleScroll = () => {
      if (!heroRef.current) return;
      const { top } = heroRef.current.getBoundingClientRect();
      const scrollingUp = window.scrollY < lastScrollY.current;
      const heroNearTop = top >= 0 && top <= 40;

      if (scrollingUp && heroNearTop && !isScrollLocked) {
        setIsScrollLocked(true);
        onScrollLockChange?.(true);
      }

      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sliderEnabled, isScrollLocked, onScrollLockChange]);

  const handleDotClick = useCallback((index) => {
    const newDirection = index > currentSlide ? 1 : -1;

    setCurrentSlide(index);
    setDirection(newDirection);
  }, [currentSlide]);

  // Don't render if no images available
  if (!images.length && !imageLoadError) {
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
    >
      <div 
        className="hero-slides-container"
        style={{
          backgroundImage: imageLoadError
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${images[currentSlide]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <AnimatePresence 
          initial={false} 
          mode="sync"
        >
          <HeroSlide 
            key={currentSlide}
            image={images[currentSlide]}
            imageLoadError={imageLoadError}
            direction={direction}
          />
        </AnimatePresence>
      </div>
      
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
      
      {sliderEnabled && (
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
      
      <div className="whatsapp-icon" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M.057 24l1.687-6.163A11.93 11.93 0 0 1 0 11.934C0 5.355 5.373 0 12 0c3.192 0 6.196 1.24 8.477 3.513A11.86 11.86 0 0 1 24 11.934c-.002 6.627-5.373 12.014-12 12.014a12.34 12.34 0 0 1-5.652-1.363L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.003-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.432-9.888 9.884 0 2.225.656 3.891 1.746 5.389l-.999 3.648 3.741-.736zm11.387-5.464c-.074-.123-.272-.198-.57-.347-.297-.149-1.758-.868-2.03-.967-.272-.1-.47-.149-.669.149-.198.297-.768.968-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.199-.298.298-.496.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.917-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.372-.011-.57-.011-.198 0-.52.074-.793.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.073.149.198 2.104 3.207 5.1 4.492.714.308 1.27.492 1.704.63.716.228 1.367.196 1.88.118.575-.086 1.759-.718 2.006-1.413.248-.695.248-1.29.173-1.413z" />
        </svg>
      </div>
      
      {/* Hidden images for error tracking */}
      {images.map((image, index) => (
        <img 
          key={index}
          src={image} 
          alt="" 
          style={{ display: 'none' }}
          onError={handleImageError}
        />
      ))}
    </section>
  );
};

const HeroSlide = ({ image, imageLoadError, direction }) => {
  const slideTransition = { duration: 0.6, ease: [0.25, 0.65, 0.35, 1] };
  
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: direction * 120 
      }}
      animate={{
        opacity: 1,
        x: 0,
        transition: slideTransition
      }}
      exit={{ 
        opacity: 0, 
        x: direction * -120,
        transition: slideTransition
      }}
      className="hero-slide-motion"
      style={{
        backgroundImage: imageLoadError
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`
      }}
    />
  );
};

export default Hero;
