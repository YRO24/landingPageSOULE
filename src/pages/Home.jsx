import Hero from '../components/sections/Hero';
import ProjectShowcase from '../components/sections/ProjectShowcase';
import ContactForm from '../components/sections/ContactForm';
import Communities from '../components/sections/Communities';
import Button from '../components/common/Button';
import ProjectCard from '../components/common/ProjectCard';
import { projectsData } from '../data/content';
import { IMAGES } from '../utils/constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Home.css';

const Home = () => {
  const featuredProject = projectsData[0];
  const [aboutRef, aboutVisible] = useScrollAnimation();
  const [showcaseRef1, showcase1Visible] = useScrollAnimation();
  const [showcaseRef2, showcase2Visible] = useScrollAnimation();
  const [communitiesRef, communitiesVisible] = useScrollAnimation();

  return (
    <div className="home-page">
      <Hero 
        title="Design with Soul"
        subtitle="Built with Precision"
        backgroundImage={IMAGES.bedroom4}
        hasSlider={true}
        communityName=""
      />
      
      {/* About Soule Section */}
      <section 
        ref={aboutRef}
        className={`about-soule slide-up ${aboutVisible ? 'visible' : ''}`}
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
      </section>
      
      {/* Three Card Section */}
      <section className="three-cards-section">
        <ProjectCard 
          image={IMAGES.guestWalkIn}
          category="INTERIORS"
          logo={IMAGES.souleLogo}
          link="/portfolio"
        />
        <ProjectCard 
          image={IMAGES.kalpesh4}
          category="RESIDENTIAL"
          logo={IMAGES.souleLogo}
          link="/portfolio"
        />
        <ProjectCard 
          image={IMAGES.kalpesh6}
          category="ARCHITECTURE"
          logo={IMAGES.souleLogo}
          link="/portfolio"
        />
      </section>
      
      {/* Project Showcase - Single Full Width */}
      <div 
        ref={showcaseRef1}
        className={`fade-in ${showcase1Visible ? 'visible' : ''}`}
      >
        <ProjectShowcase 
          title={featuredProject.title}
          description="A timeless, mahogany residence set ablaze in the heart of Dubai's most emerging global community. Combining a modern family living experience and ultra-luxe finishes, our client's home is a lakeside oasis. It offers a modern family living experience with ultra-luxe finishes, merging natural materials and light."
          image={IMAGES.kalpesh5}
          dark={true}
          link="/project/1"
        />
      </div>
      
      {/* Second Project Showcase - Reversed */}
      <div 
        ref={showcaseRef2}
        className={`fade-in ${showcase2Visible ? 'visible' : ''}`}
      >
        <ProjectShowcase 
          title={featuredProject.title}
          description="A private waterfront residence situated in the heart of Dubai's most prestigious gated community. Designed for a modern family that values clean lines, natural materials, and open air connectivity."
          image={IMAGES.bedroom5}
          dark={true}
          reverse={true}
          link="/project/1"
        />
      </div>
      
      {/* Communities Section */}
      <div 
        ref={communitiesRef}
        className={`slide-up ${communitiesVisible ? 'visible' : ''}`}
      >
        <Communities />
      </div>
      
      <ContactForm />
    </div>
  );
};

export default Home;
