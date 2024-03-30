import { Button } from 'react-bootstrap';
import { RiFacebookLine, RiInstagramLine, RiYoutubeLine } from 'react-icons/ri';

const SocialMenu = () => {
  return (
    <div className="social-menu">
      <Button
        href="https://www.facebook.com/pantherstuff"
        variant="secondary"
        target="_blank"
        title="PantherStuff on Facebook"
        className="btn"
      >
        <RiFacebookLine />
      </Button>
      <Button
        href="https://www.instagram.com/pantherstuff_ecoprint"
        variant="secondary"
        target="_blank"
        title="PantherStuff on Instagrem"
        className="btn"
      >
        <RiInstagramLine />
      </Button>
      <Button
        href="https://youtube.com"
        variant="secondary"
        target="_blank"
        title="PantherStuff on Youtube"
        className="btn"
      >
        <RiYoutubeLine />
      </Button>
    </div>
  );
};

export default SocialMenu;
