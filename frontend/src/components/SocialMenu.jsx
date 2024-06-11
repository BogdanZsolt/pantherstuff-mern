import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { RiFacebookLine, RiInstagramLine, RiYoutubeLine } from 'react-icons/ri';

const SocialMenu = () => {
  const { t } = useTranslation(['contact']);
  return (
    <div className="social-menu">
      <Button
        href="https://www.facebook.com/pantherstuff"
        variant="secondary"
        target="_blank"
        title={t('socialTitleFacebook')}
        className="btn"
      >
        <RiFacebookLine />
      </Button>
      <Button
        href="https://www.instagram.com/pantherstuff_ecoprint"
        variant="secondary"
        target="_blank"
        title={t('socialTitleInsta')}
        className="btn"
      >
        <RiInstagramLine />
      </Button>
      <Button
        href="https://youtube.com"
        variant="secondary"
        target="_blank"
        title={t('socialTitleYoutube')}
        className="btn"
      >
        <RiYoutubeLine />
      </Button>
    </div>
  );
};

export default SocialMenu;
