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
      {/* Enhanced Hero Section */}
      <section className="enhanced-project-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${project.images[0]})` }}>
        <div className="hero-overlay">
          <div className="hero-content-wrapper">
            <div className="project-title-section">
              <h1 className="project-main-title">{project.title}</h1>
              <p className="project-subtitle">{project.description}</p>
            </div>
            
            {/* Project Details Grid */}
            <div className="project-specs-grid">
              <div className="spec-row">
                <span className="spec-label">LOCATION:</span>
                <span className="spec-value">{project.location}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">PROJECT TYPE:</span>
                <span className="spec-value">{project.type}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">COMPLETION YEAR:</span>
                <span className="spec-value">{project.completionYear}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">PLOT AREA:</span>
                <span className="spec-value">{project.plotArea}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Project Details Content Section */}
      <section className="project-content-section">
        <div className="content-container">
          <div className="content-grid">
            {/* Left Column - Challenge & Solution */}
            <div className="content-left">
              <div className="detail-block">
                <h3 className="detail-title">CHALLENGE:</h3>
                <p className="detail-text">{project.challenge}</p>
              </div>
              
              <div className="detail-block">
                <h3 className="detail-title">SOLUTION:</h3>
                <p className="detail-text">{project.solution}</p>
              </div>
            </div>
            
            {/* Right Column - Technologies */}
            <div className="content-right">
              <div className="detail-block">
                <h3 className="detail-title">TECHNOLOGIES/MATERIALS USED:</h3>
                <ul className="technologies-list">
                  {project.technologies.map((tech, index) => (
                    <li key={index} className="tech-item">{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Project Gallery Section */}
      <section className="project-gallery-section">
        <div className="gallery-container">
          <div className="gallery-grid">
            {project.images.slice(1, 5).map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image} alt={`${project.title} view ${index + 1}`} className="gallery-image" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Additional Gallery if more images exist */}
      {project.images.length > 5 && (
        <section className="extended-gallery-section">
          <div className="gallery-container">
            <div className="extended-gallery-grid">
              {project.images.slice(5).map((image, index) => (
                <div key={index} className="extended-gallery-item">
                  <img src={image} alt={`${project.title} detail ${index + 1}`} className="extended-gallery-image" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <Communities />
      
      <ContactForm />
    </div>
  );
};

export default ProjectDetail;
