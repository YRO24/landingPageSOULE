import { servicesData, teamData, coreValues } from '../data/content';
import Communities from '../components/sections/Communities';
import ContactForm from '../components/sections/ContactForm';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <p>
            At Soule Studio, we redefine living through thoughtful design. 
            Specializing in high-end residential interiors and architectural visualization, 
            we craft spaces that fuse emotion, function, and form—designed with soul, 
            built with precision. Every project tells a story, and we're here to help tell yours beautifully.
          </p>
          <p>
            From possibilities like to-the-moment urban residences, our work is rooted 
            in a philosophy that great design changes the way we live and feel. Our team 
            isn't just building spaces—we're building experiences that last a lifetime.
          </p>
          <p>
            With a commitment to quality, depth, and dedication, we design spaces 
            that grow not only with precision but also longevity.
          </p>
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
              designed with soul, built with precision.
            </p>
          </div>
          <div className="divider"></div>
          <div className="vision">
            <h2>VISION</h2>
            <p>
              To be UAE's most coveted studio for 
              luxury residential design, known for 
              visualizing the invisible—transforming 
              imagination and ambition into real, 
              experiences, and projection- driven delivery.
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
