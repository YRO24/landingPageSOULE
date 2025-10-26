import './ProjectCard.css';
import Button from '../common/Button';

const ProjectCard = ({ image, title, description, link, overlay = true }) => {
  return (
    <div className="project-card">
      <div className="project-card-image">
        <img src={image} alt={title} />
        {overlay && <div className="project-card-overlay"></div>}
      </div>
      <div className="project-card-content">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        {link && <Button variant="dark" to={link}>READ MORE</Button>}
      </div>
    </div>
  );
};

export default ProjectCard;
