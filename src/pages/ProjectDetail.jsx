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
      <section className="project-detail-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${project.images[0]})` }}>
        <div className="project-title-container">
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
      </section>
      
      {/* Project Details */}
      <section className="project-details">
        <div className="detail-item">
          <strong>LOCATION:</strong> {project.location}
        </div>
        <div className="detail-item">
          <strong>PROJECT TYPE:</strong> {project.type}
        </div>
        <div className="detail-item">
          <strong>COMPLETION YEAR:</strong> {project.completionYear}
        </div>
        <div className="detail-item">
          <strong>PLOT AREA:</strong> {project.plotArea}
        </div>
      </section>
      
      {/* Challenge & Solution */}
      <section className="challenge-solution">
        <div className="challenge-solution-grid">
          <div className="challenge">
            <h3>CHALLENGE</h3>
            <p>{project.challenge}</p>
            
            <h3 style={{ marginTop: '2rem' }}>SOLUTION:</h3>
            <p>{project.solution}</p>
          </div>
          
          <div className="technologies">
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
