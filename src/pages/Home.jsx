import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Hero from '../components/sections/Hero';
import ProjectShowcase from '../components/sections/ProjectShowcase';
import ContactForm from '../components/sections/ContactForm';
import Communities from '../components/sections/Communities';
import Button from '../components/common/Button';
import ProjectCard from '../components/common/ProjectCard';
import { projectsData } from '../data/content';
import { IMAGES } from '../utils/constants';
import './Home.css';

const Home = () => {
  const featuredProject = projectsData[0];
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Handle scroll to contact section on page load
  useEffect(() => {
    const { hash } = window.location;
    if (hash === '#contact') {
      // Small delay to ensure the page has loaded
      setTimeout(() => {
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
          contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, []);
  
  // Define images for each category
  const categoryImages = {
    INTERIORS: IMAGES.bedroom4,
    RESIDENTIAL: IMAGES.kalpesh5,
    ARCHITECTURE: IMAGES.bedroom5
  };
  
  // Framer Motion variants for animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };



  return (
    <div className="home-page">
      <Hero 
        title="Design with Soul"
        subtitle="Built with Precision"
        backgroundImage={IMAGES.bedroom4}
        communityName=""
        slideImages={[IMAGES.bedroom4]}
      />

      
      {/* About Soule Section */}
      <motion.section 
        className="about-soule"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="about-content">
          <div className="about-header">
            <h2>Soule</h2>
          </div>
          <div className="about-body">
            <div className="about-text-columns">
              <p>Soule Studio is a luxury interior, architecture, and landscape design firm based in the UAE, specializing in high-end residential villas for visionary homeowners,</p>
              <p>developers, and industry leaders. We bring concepts to life with architectural precision, cutting-edge visualisation, and refined materiality.</p>
            </div>
            <div className="about-button">
              <Button variant="dark" to="/about">KNOW MORE</Button>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Three Card Section */}
      <section 
        className="three-cards-section"
        style={{
          backgroundImage: hoveredCategory 
            ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${categoryImages[hoveredCategory]})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.6s ease-in-out'
        }}
      >
        <ProjectCard 
          image={categoryImages.INTERIORS}
          category="INTERIORS"
          logo={IMAGES.souleLogo}
          onMouseEnter={() => setHoveredCategory('INTERIORS')}
          onMouseLeave={() => setHoveredCategory(null)}
          isHovered={hoveredCategory === 'INTERIORS'}
        />
        <ProjectCard 
          image={categoryImages.RESIDENTIAL}
          category="RESIDENTIAL"
          logo={IMAGES.souleLogo}
          onMouseEnter={() => setHoveredCategory('RESIDENTIAL')}
          onMouseLeave={() => setHoveredCategory(null)}
          isHovered={hoveredCategory === 'RESIDENTIAL'}
        />
        <ProjectCard 
          image={categoryImages.ARCHITECTURE}
          category="ARCHITECTURE"
          logo={IMAGES.souleLogo}
          onMouseEnter={() => setHoveredCategory('ARCHITECTURE')}
          onMouseLeave={() => setHoveredCategory(null)}
          isHovered={hoveredCategory === 'ARCHITECTURE'}
        />
      </section>
      
      {/* Project Showcase - Single Full Width */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <ProjectShowcase 
          title={featuredProject.title}
          description="A timeless, mahogany residence set ablaze in the heart of Dubai's most emerging global community. Combining a modern family living experience and ultra-luxe finishes, our client's home is a lakeside oasis. It offers a modern family living experience with ultra-luxe finishes, merging natural materials and light."
          image={IMAGES.kalpesh5}
          dark={true}
          link="/project/1"
        />
      </motion.div>
      
      {/* Second Project Showcase - Reversed */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <ProjectShowcase 
          title={featuredProject.title}
          description="A private waterfront residence situated in the heart of Dubai's most prestigious gated community. Designed for a modern family that values clean lines, natural materials, and open air connectivity."
          image={IMAGES.kalpesh4}
          dark={true}
          reverse={true}
          link="/project/1"
        />
      </motion.div>
      
      {/* Communities Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <Communities />
      </motion.div>
      
      <ContactForm />
    </div>
  );
};

export default Home;
