import './ProjectShowcase.css';
import Button from '../common/Button';

const ProjectShowcase = ({ 
  title, 
  description, 
  image, 
  reverse = false, 
  dark = false,
  link 
}) => {
  return (
    <section className={`project-showcase ${reverse ? 'reverse' : ''} ${dark ? 'dark' : 'light'}`}>
      <div className="project-image">
        <img src={image} alt={title} />
      </div>
      
      <div className="project-info">
        <h2>{title}</h2>
        <p>{description}</p>
        {link && <Button variant={dark ? 'primary' : 'dark'} to={link}>READ MORE</Button>}
      </div>
    </section>
  );
};

export default ProjectShowcase;
