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
  
  // Use only the first image as the hero background
  const baseImage = (slideImages && slideImages.length > 0 ? slideImages[0] : backgroundImage) || '';
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
