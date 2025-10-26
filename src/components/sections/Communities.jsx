import { communitiesData } from '../../data/content';
import './Communities.css';

const Communities = () => {
  return (
    <section className="communities-section">
      <h2>Our Communities</h2>
      <div className="communities-logos">
        {communitiesData.map(community => (
          <div key={community.id} className="community-logo-item">
            <img src={community.logo} alt={community.name} />
            <span className="community-name">{community.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Communities;
