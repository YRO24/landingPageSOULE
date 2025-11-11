import { useParams } from 'react-router-dom';
import { projectsData } from '../data/content';
import ContactForm from '../components/sections/ContactForm';
import Communities from '../components/sections/Communities';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === parseInt(id)) || projectsData[0];
  
  return (
    <div className="project-detail-page">
      {/* Hero with Project Title */}
      <section className="project-detail-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${project.images[0]})` }}>
        <div className="project-hero-content">
          <h1>{project.title}</h1>
          <div className="project-hero-description">
            <p>{project.description}</p>
          </div>
          
          {/* Project Info Grid */}
          <div className="project-info-grid">
            <div className="info-item">
              <span className="info-label">LOCATION:</span>
              <span className="info-value">{project.location}</span>
            </div>
            <div className="info-item">
              <span className="info-label">PROJECT TYPE:</span>
              <span className="info-value">{project.type}</span>
            </div>
            <div className="info-item">
              <span className="info-label">COMPLETION YEAR:</span>
              <span className="info-value">{project.completionYear}</span>
            </div>
            <div className="info-item">
              <span className="info-label">PLOT AREA:</span>
              <span className="info-value">{project.plotArea}</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Challenge & Solution */}
      <section className="project-details-section">
        <div className="project-details-grid">
          <div className="challenge-solution">
            <div className="challenge-block">
              <h3>CHALLENGE:</h3>
              <p>{project.challenge}</p>
            </div>
            
            <div className="solution-block">
              <h3>SOLUTION:</h3>
              <p>{project.solution}</p>
            </div>
          </div>
          
          <div className="technologies-materials">
            <h3>TECHNOLOGIES/MATERIALS USED:</h3>
            <ul>
              {project.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {/* Image Placeholders Grid - 2x2 */}
      <section className="project-placeholders">
        <div className="placeholders-grid">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="placeholder-item">
              {project.images[num] ? (
                <img src={project.images[num]} alt={`${project.title} view ${num}`} />
              ) : (
                <div className="placeholder-box"></div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      <Communities />
      
      <ContactForm />
    </div>
  );
};

export default ProjectDetail;
