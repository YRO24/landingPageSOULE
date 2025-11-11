import { useState } from 'react';
import { projectsData } from '../data/content';
import ContactForm from '../components/sections/ContactForm';
import Communities from '../components/sections/Communities';
import './Portfolio.css';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const categories = ['all', 'interiors', 'architecture', 'residential'];
  
  return (
    <div className="portfolio-page">

      
      {/* Filter Navigation */}
      <nav className="portfolio-nav">
        <ul>
          <li className={activeFilter === 'all' ? 'active' : ''}>
            <button onClick={() => setActiveFilter('all')}>ALL</button>
          </li>
          <li className={activeFilter === 'interiors' ? 'active' : ''}>
            <button onClick={() => setActiveFilter('interiors')}>INTERIORS</button>
          </li>
          <li className={activeFilter === 'architecture' ? 'active' : ''}>
            <button onClick={() => setActiveFilter('architecture')}>ARCHITECTURE</button>
          </li>
          <li className={activeFilter === 'residential' ? 'active' : ''}>
            <button onClick={() => setActiveFilter('residential')}>RESIDENTIAL</button>
          </li>
        </ul>
      </nav>
      
      {/* Projects Grid */}
      <section className="portfolio-grid">
        {projectsData[0].images.map((image, index) => (
          <div key={index} className="portfolio-item">
            <img src={image} alt={`Project ${index + 1}`} />
            <div className="portfolio-overlay">
              <h3>LAGOON SERENITY VILLA</h3>
            </div>
          </div>
        ))}
      </section>
      
      <Communities />
      
      <ContactForm />
    </div>
  );
};

export default Portfolio;
