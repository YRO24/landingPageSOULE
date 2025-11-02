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
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <span className="btn-content">{children}</span>
      </MotionLink>
    );
  }
  
  return (
    <MotionButton 
      className={buttonClass} 
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="btn-content">{children}</span>
    </MotionButton>
  );
};

export default Button;
