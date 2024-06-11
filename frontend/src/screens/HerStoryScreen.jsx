import { Container } from 'react-bootstrap';
import Banner from '../components/Banner';
import { useTranslation } from 'react-i18next';

const HerStoryScreen = () => {
  const { t } = useTranslation(['ourHerStory']);
  const { paragraph1, paragraph2 } = t('description');

  return (
    <>
      <Banner
        title={t('ourHerStory')}
        src="/images/ecoprint-02.webp"
        alt="Our History"
      />
      <Container>
        <p className="lead">{paragraph1}</p>
        <div className="ps-images-group">
          <div className="ps-image-item">
            <img src="/images/our-history-01.jpg" alt="our story 1" />
          </div>
          <div className="ps-image-item">
            <img src="/images/our-history-02.png" alt="our story 2" />
          </div>
          <div className="ps-image-item">
            <img src="/images/our-history-03.png" alt="our story 3" />
          </div>
        </div>
        <p className="lead">{paragraph2}</p>
      </Container>
    </>
  );
};

export default HerStoryScreen;
