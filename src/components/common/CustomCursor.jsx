import { useEffect, useRef, useState } from 'react';
import { IMAGES } from '../../utils/constants';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const logoRef = useRef(null);
  const isHoveringRef = useRef(false);
  const isClickingRef = useRef(false);
  const [isWhiteLogo, setIsWhiteLogo] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Check if hovering over Communities or Contact sections
    const isLightSection = (element) => {
      if (!element) return false;
      
      // Check if element or its parents are Communities or Contact sections
      const lightSelectors = [
        '.communities-section',
        '.contact-section',
        '.contact-form',
        '.about-soule'
      ];
      
      for (const selector of lightSelectors) {
        if (element.matches && element.matches(selector)) return true;
        if (element.closest && element.closest(selector)) return true;
      }
      
      return false;
    };

    // Use transform for better performance (GPU accelerated)
    // Center the cursor on the pointer by subtracting half the cursor size
    const updatePosition = (e) => {
      const cursorSize = cursor.offsetWidth;
      const halfSize = cursorSize / 2;
      cursor.style.transform = `translate(${e.clientX - halfSize}px, ${e.clientY - halfSize}px)`;
      
      // Check if hovering over light background sections
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      const isLight = isLightSection(elementUnderCursor);
      setIsWhiteLogo(isLight);
    };

    const handleMouseDown = () => {
      isClickingRef.current = true;
      cursor.classList.add('clicking');
    };

    const handleMouseUp = () => {
      isClickingRef.current = false;
      cursor.classList.remove('clicking');
    };

    // Add hover effect for interactive elements
    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('cursor-hover')
      ) {
        isHoveringRef.current = true;
        cursor.classList.add('hovering');
      }
    };

    const handleMouseOut = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('cursor-hover')
      ) {
        isHoveringRef.current = false;
        cursor.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor">
      <img 
        ref={logoRef}
        src={isWhiteLogo ? IMAGES.souleLogoWhite : IMAGES.souleLogo} 
        alt="Cursor" 
        className="cursor-logo"
        style={{ 
          transition: 'opacity 0.3s ease-in-out'
        }}
        key={isWhiteLogo ? 'white' : 'dark'}
      />
    </div>
  );
};

export default CustomCursor;
