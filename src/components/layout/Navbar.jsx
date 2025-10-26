import { Link } from 'react-router-dom';
import { IMAGES } from '../../utils/constants';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">SOULE</Link>
        
        <div className="nav-center">
          <img src={IMAGES.logo} alt="Soule Logo" className="center-logo" />
          <div className="center-logo-text">Emirates Hills</div>
        </div>
        
        <ul className="nav-links">
          <li><Link to="/about">ABOUT US</Link></li>
          <li><Link to="/portfolio">PORTFOLIO</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
