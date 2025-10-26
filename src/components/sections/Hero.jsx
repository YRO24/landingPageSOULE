import { useState } from 'react';
import './Hero.css';
import Button from '../common/Button';

const Hero = ({ title, subtitle, backgroundImage, hasSlider = false, communityName = '' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  return (
    <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})` }}>
      <div className="hero-content">
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
        <Button variant="primary">DISCOVER NOW</Button>
      </div>
      
      {hasSlider && (
        <div className="scroll-indicator">
          <div className="scroll-dots">
            {[...Array(totalSlides)].map((_, index) => (
              <span 
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      )}
      
      <div className="whatsapp-icon">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
          <path d="M16 0C7.164 0 0 7.164 0 16c0 2.825.738 5.491 2.031 7.797L0 32l8.394-2.031C10.659 31.238 13.249 32 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.333c-2.547 0-4.958-.7-7.009-1.917l-.503-.3-5.181 1.25 1.263-5.084-.328-.522A13.277 13.277 0 012.667 16c0-7.364 5.97-13.333 13.333-13.333S29.333 8.636 29.333 16 23.364 29.333 16 29.333z"/>
          <path d="M23.503 19.403c-.336-.169-1.991-.983-2.3-1.094-.309-.111-.534-.169-.759.169-.225.336-.872 1.094-1.069 1.322-.197.225-.394.253-.731.084-.336-.169-1.419-.525-2.703-1.672-.998-.891-1.672-1.991-1.869-2.328-.197-.336-.022-.519.147-.688.15-.15.336-.394.503-.591.169-.197.225-.336.336-.563.111-.225.056-.422-.028-.591-.084-.169-.759-1.828-.941-2.5-.178-.653-.359-.563-.759-.575h-.647c-.225 0-.591.084-.9.422-.309.336-1.181 1.153-1.181 2.813s1.209 3.263 1.378 3.488c.169.225 2.381 3.638 5.766 5.1.806.347 1.434.556 1.925.712.809.256 1.544.219 2.125.134.647-.097 1.991-.816 2.272-1.603.281-.787.281-1.463.197-1.603-.084-.141-.309-.225-.647-.394z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
