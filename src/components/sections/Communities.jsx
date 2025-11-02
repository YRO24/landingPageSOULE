import { motion } from 'framer-motion';
import { communitiesData } from '../../data/content';
import './Communities.css';

const Communities = () => {
  // Duplicate the array multiple times for seamless infinite scroll
  const duplicatedLogos = [...communitiesData, ...communitiesData, ...communitiesData, ...communitiesData];

  // Calculate the width to scroll (one full set of logos)
  // Assuming each logo takes approximately 180px (min-width) + 8rem gap (128px) = ~308px
  const itemWidth = 308; // Adjust based on your actual spacing
  const scrollDistance = -(communitiesData.length * itemWidth);

  return (
    <section className="communities-section">
      <h2>Our Communities</h2>
      <div className="communities-strip-wrapper">
        <motion.div 
          className="communities-logos-strip"
          animate={{
            x: [0, scrollDistance]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((community, index) => (
            <div key={`${community.id}-${index}`} className="community-logo-item">
              <img src={community.logo} alt={community.name} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Communities;
