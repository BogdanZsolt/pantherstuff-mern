import { Container } from 'react-bootstrap';
import Banner from '../components/Banner';
import { Trans, useTranslation } from 'react-i18next';

const HerStoryScreen = () => {
  const { t } = useTranslation(['mePetra']);
  const { paragraph1, paragraph2, paragraph3, paragraph4, paragraph5 } =
    t('mePetraDesription');
  return (
    <>
      <Banner
        title={t('mePetra')}
        src="/images/pepsz-yogaban-1280x360.webp"
        alt="Petra"
      />
      <Container>
        <p className="lead">
          <Trans i18nKey={paragraph1} components={{ 1: <b /> }} />
        </p>
        <p className="lead">{paragraph2}</p>
        <div className="ps-images-group" style={{ height: '600px' }}>
          <div className="ps-image-item">
            <img src="/images/IMG-0273-768x1024.png" alt="Petra" />
          </div>
          <div className="ps-image-item">
            <img src="/images/IMG-9746.png" alt="" />
          </div>
        </div>
        <div className="ps-images-group" style={{ height: '600px' }}>
          <div className="ps-image-item">
            <img src="/images/mePetra-03-1024x1024.jpg" alt="Petra" />
          </div>
          <div className="ps-image-item">
            <img src="/images/image_6483441-2-1024x571.jpg" alt="Petra" />
          </div>
        </div>
        <p className="lead">{paragraph3}</p>
        <p className="lead">{paragraph4}</p>
        <p className="lead">{paragraph5}</p>
        <div className="row justify-content-center">
          <div className="ps-single-image">
            <img src="/images/sepru-2-trans.png" alt="sepru" />
          </div>
        </div>
      </Container>
    </>
  );
};

export default HerStoryScreen;
