import { servicesData, teamData, coreValues } from '../data/content';
import Communities from '../components/sections/Communities';
import ContactForm from '../components/sections/ContactForm';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>ABOUT US</h1>
          <div className="about-text-content">
            <p>
              At Soule Studio, we redefine luxury living through thoughtful design, 
              immersive visualisation, and expert execution. Founded in 2023 with a vision to 
              harmonize soul and structure, we serve discerning homeowners, architects, 
              and developers across the UAE and beyond.
            </p>
            <p>
              From expansive villas to ultra-modern urban residences, our work is rooted 
              in multidisciplinary expertise blending architecture, interior design, landscape 
              planning, and styling into one seamless journey.
            </p>
            <p>
              With a commitment to detail, depth, and distinction, we design spaces 
              that speak not only to form and function, but also to feeling.
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="team-section">
        <div className="team-grid">
          {teamData.map(member => (
            <div key={member.id} className="team-member">
              <div className="team-photo">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="mission-vision-grid">
          <div className="mission">
            <h2>MISSION</h2>
            <p>
              To elevate luxury living through integrated design 
              solutions that fuse emotion, function, and form—
              crafted with integrity and executed with excellence.
            </p>
          </div>
          <div className="divider"></div>
          <div className="vision">
            <h2>VISION</h2>
            <p>
              To be the UAE's most trusted studio for 
              luxury residential design, known for 
              timeless aesthetics, immersive client 
              experiences, and precision-driven delivery.
            </p>
          </div>
        </div>
      </section>
      
      {/* Core Values */}
      <section className="core-values">
        <h2>Core Values</h2>
        <div className="values-grid">
          {coreValues.map((value, index) => (
            <div key={index} className="value-item">
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Services */}
      <section className="services-section">
        <h2>Services</h2>
        <div className="services-grid">
          {servicesData.map(service => (
            <div key={service.id} className="service-item">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p className="applications"><em>Applications: {service.applications}</em></p>
            </div>
          ))}
        </div>
      </section>
      
      <Communities />
      
      <ContactForm />
    </div>
  );
};

export default About;
