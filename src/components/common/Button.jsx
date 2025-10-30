import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ children, variant = 'primary', to, onClick, className = '' }) => {
  const buttonClass = `btn btn-${variant} animated-button ${className}`;
  
  if (to) {
    return (
      <Link to={to} className={buttonClass}>
        <span className="btn-content">{children}</span>
      </Link>
    );
  }
  
  return (
    <button className={buttonClass} onClick={onClick}>
      <span className="btn-content">{children}</span>
    </button>
  );
};

export default Button;
