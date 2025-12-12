import { motion } from 'framer-motion';
import './ProjectCard.css';
import FlashlightImage from './FlashlightImage';

const ProjectCard = ({ 
  image, 
  category, 
  title, 
  description, 
  overlay = true, 
  logo, 
  onMouseEnter, 
  onMouseLeave, 
  isHovered
}) => {
  return (
    <motion.div 
      className={`project-card ${isHovered ? 'is-hovered' : ''}`}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="project-card-image">
        <motion.div 
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flashlight-wrapper"
        >
          <FlashlightImage 
            src={image} 
            alt={category || title}
          />
        </motion.div>
        {overlay && <div className="project-card-overlay"></div>}
      </div>
      <motion.div 
        className="project-card-content"
        transition={{ duration: 0.3 }}
      >
        {logo && (
          <motion.div 
            className="project-card-logo"
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img src={logo} alt="Logo" />
          </motion.div>
        )}
        {category && <h3 className="project-card-category">{category}</h3>}
        {title && <h3>{title}</h3>}
        {description && <p>{description}</p>}
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
