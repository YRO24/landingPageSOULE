import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <ul>
            <li><a href="/">HOME</a></li>
            <li><a href="/about">ABOUT</a></li>
            <li><a href="/services">SERVICES</a></li>
            <li><a href="/portfolio">PORTFOLIO</a></li>
            <li><a href="/contact">CONTACT</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <p><strong>CONTACT</strong></p>
          <p>+971 50 483 2566</p>
          <p>+971 52 278 2308</p>
          <br />
          <p><strong>EMAIL</strong></p>
          <p>info@soule.studio</p>
        </div>
        
        <div className="footer-column">
          <p><strong>ADDRESS</strong></p>
          <p>Soule Studio LLC #7</p>
          <p>Denmark group, ground building</p>
          <p>Al Quoz 3 - Dubai - UAE</p>
        </div>
        
        <div className="footer-column">
          <p><strong>CAREERS</strong></p>
          <p>Email us at</p>
          <p>careers@soule.studio</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="social-links">
          <a href="#" aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" fill="none"/>
              <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" fill="none"/>
              <circle cx="18" cy="6" r="1.5" fill="white"/>
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>
        </div>
        
        <div className="footer-links">
          <a href="#">Website development</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Sitemaps</a>
        </div>
        
        <div className="language-selector">
          <span>🌐</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
