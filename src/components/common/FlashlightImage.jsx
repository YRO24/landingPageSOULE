import { useEffect, useRef } from 'react';
import './FlashlightImage.css';

/**
 * FlashlightImage - A reusable component that wraps images with a flashlight reveal effect
 * Like hilight.design - shows full brightness image with dark overlay that reveals via cursor
 */
const FlashlightImage = ({ 
  src, 
  alt = '', 
  className = '', 
  style = {},
  ...props 
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Set CSS variables for the flashlight position
      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`flashlight-image-container ${className}`}
      style={style}
    >
      {/* Full brightness base image */}
      <img 
        src={src} 
        alt={alt}
        className="flashlight-image-base"
        {...props}
      />
      {/* Dark overlay with flashlight cutout */}
      <div className="flashlight-image-reveal"></div>
    </div>
  );
};

export default FlashlightImage;
