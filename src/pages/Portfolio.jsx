import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/content';
import ContactForm from '../components/sections/ContactForm';
import Communities from '../components/sections/Communities';
import './Portfolio.css';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Create multiple projects from the base project data for display
  const allProjects = [];
  const baseProject = projectsData[0];
  
  // Generate multiple project variations using different images
  baseProject.images.forEach((image, index) => {
    allProjects.push({
      id: baseProject.id,
      title: baseProject.title,
      image: image,
      category: baseProject.category
    });
  });
  
  const filteredProjects = activeFilter === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === activeFilter);
  
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
        {filteredProjects.map((project, index) => (
          <Link 
            key={index} 
            to={`/project/${project.id}`} 
            className="portfolio-item"
          >
            <img src={project.image} alt={project.title} />
            <div className="portfolio-overlay">
              <h3>{project.title.toUpperCase()}</h3>
            </div>
          </Link>
        ))}
      </section>
      
      <Communities />
      
      <ContactForm />
    </div>
  );
};

export default Portfolio;
