import { useEffect, useRef } from 'react';
import './ImageSpotlight.css';

const ImageSpotlight = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const images = container.querySelectorAll('.spotlight-image');
      
      images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        img.style.setProperty('--mouse-x', `${x}px`);
        img.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="spotlight-container">
      {children}
    </div>
  );
};

export default ImageSpotlight;
