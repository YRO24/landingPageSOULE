import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ children, variant = 'primary', to, onClick, className = '' }) => {
  const buttonClass = `btn btn-${variant} ${className}`;
  
  if (to) {
    return (
      <Link to={to} className={buttonClass}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
