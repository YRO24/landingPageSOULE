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

  return (
    <div className="home-page">
      <Hero 
        title="Design with Soul"
        subtitle="Built with Precision"
        backgroundImage={IMAGES.bedroom4}
        hasSlider={true}
        communityName=""
      />
      
      {/* Three Card Section */}
      <section className="three-cards-section">
        <ProjectCard 
          image={IMAGES.guestWalkIn}
          category="INTERIORS"
          link="/portfolio"
        />
        <ProjectCard 
          image={IMAGES.kalpesh4}
          category="RESIDENTIAL"
          link="/portfolio"
        />
        <ProjectCard 
          image={IMAGES.kalpesh6}
          category="ARCHITECTURE"
          link="/portfolio"
        />
      </section>
      
      {/* About Soule Section */}
      <section className="about-soule">
        <div className="about-content">
          <h2>Soule</h2>
          <div className="about-columns">
            <div className="about-left">
              <p>Soule Studio is a luxury interior, architecture, and landscape design firm based in the UAE, specializing in high-end residential villas for visionary homeowners.</p>
            </div>
            <div className="about-right">
              <p>We are a team of creative, passionate architects, developers, and industry leaders. We bring concepts to life with architectural precision, stunning design visualizations, and refined materiality.</p>
            </div>
          </div>
          <Button variant="dark" to="/about">KNOW MORE</Button>
        </div>
      </section>
      
      {/* Project Showcase - Single Full Width */}
      <ProjectShowcase 
        title={featuredProject.title}
        description="A timeless, mahogany residence set ablaze in the heart of Dubai's most emerging global community. Combining a modern family living experience and ultra-luxe finishes, our client's home is a lakeside oasis. It offers a modern family living experience with ultra-luxe finishes, merging natural materials and light."
        image={IMAGES.kalpesh5}
        dark={true}
        link="/project/1"
      />
      
      {/* Second Project Showcase - Reversed */}
      <ProjectShowcase 
        title={featuredProject.title}
        description="A private waterfront residence situated in the heart of Dubai's most prestigious gated community. Designed for a modern family that values clean lines, natural materials, and open air connectivity."
        image={IMAGES.bedroom5}
        dark={true}
        reverse={true}
        link="/project/1"
      />
      
      {/* Communities Section */}
      <Communities />
      
      <ContactForm />
    </div>
  );
};

export default Home;
