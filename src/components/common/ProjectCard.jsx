import './ProjectCard.css';
import Button from '../common/Button';

const ProjectCard = ({ image, category, title, description, link, overlay = true, logo }) => {
  return (
    <div className="project-card cursor-hover">
      <div className="project-card-image image-zoom">
        <img src={image} alt={category || title} />
        {overlay && <div className="project-card-overlay"></div>}
      </div>
      <div className="project-card-content">
        {logo && (
          <div className="project-card-logo">
            <img src={logo} alt="Logo" />
          </div>
        )}
        {category && <h3 className="project-card-category">{category}</h3>}
        {title && <h3>{title}</h3>}
        {description && <p>{description}</p>}
        {link && <Button variant="dark" to={link}>READ MORE</Button>}
      </div>
    </div>
  );
};

export default ProjectCard;
