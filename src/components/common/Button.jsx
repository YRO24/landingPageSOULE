import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Button.css';

const Button = ({ children, variant = 'primary', to, onClick, className = '' }) => {
  const buttonClass = `btn btn-${variant} ${className}`;
  
  const MotionLink = motion(Link);
  const MotionButton = motion.button;
  
  if (to) {
    return (
      <MotionLink 
        to={to} 
        className={buttonClass}
        whileHover={{ 
          scale: 1.08, 
          y: -3,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 25,
          mass: 0.8
        }}
      >
        <span className="btn-content">{children}</span>
      </MotionLink>
    );
  }
  
  return (
    <MotionButton 
      className={buttonClass} 
      onClick={onClick}
      whileHover={{ 
        scale: 1.08, 
        y: -3,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 25,
        mass: 0.8
      }}
    >
      <span className="btn-content">{children}</span>
    </MotionButton>
  );
};

export default Button;
