import { Container } from 'react-bootstrap';
import Banner from '../components/Banner';
import { Trans, useTranslation } from 'react-i18next';

const HerStoryScreen = () => {
  const { t } = useTranslation(['values']);
  const {
    paragraph1,
    paragraph2,
    paragraph3,
    title1,
    paragraph4,
    title2,
    paragraph5,
    paragraph6,
    paragraph7,
    title3,
    paragraph8,
    paragraph9,
    paragraph10,
    paragraph11,
    paragraph12,
    title4,
    paragraph13,
  } = t('description');
  return (
    <>
      <Banner
        title={t('valuesAndIntentions')}
        src="/images/ars_poetica_pexels_videos_video_by_David_Bartus_540p_1.mp4"
        alt="Values & Intentions"
        video
      />
      <Container>
        <h5 className="fw-bold">{t('caring')}</h5>
        <p className="lead">{paragraph1}</p>
        <p className="lead">{paragraph2}</p>
        <p className="lead">{paragraph3}</p>
        <h3 className="text-center fs-1">{title1}</h3>
        <p className="lead">{paragraph4}</p>
        <h4 className="fs-4 fw-bold">{title2}</h4>
        <p className="lead">{paragraph5}</p>
        <p className="lead">{paragraph6}</p>{' '}
        <p className="lead">{paragraph7}</p>
        <h4 className="fs-4 fw-bold">{title3}</h4>
        <p className="lead">{paragraph8}🙂</p>
        <p className="lead">{paragraph9}</p>
        <p className="lead fw-semibold">{paragraph10}</p>
        <p className="lead">
          <Trans i18nKey={paragraph11} components={{ 1: <b /> }} />
        </p>
        <p className="lead">
          <Trans i18nKey={paragraph12} components={{ 1: <b /> }} />
        </p>
        <div className="ps-images-group" style={{ height: '450px' }}>
          <div className="ps-image-item">
            <img src="/images/Cin-1-768x1024.jpg" alt="cinnemon" />
          </div>
          <div className="ps-image-item">
            <img src="/images/IMG-4506-1-768x1024.jpg" alt="" />
          </div>
          <div className="ps-image-item">
            <img src="/images/Kv-2-1024x768.jpg" alt="" />
          </div>
        </div>
        <div className="ps-images-group" style={{ height: '600px' }}>
          <div className="ps-image-item">
            <img src="/images/IMG_0323-1024x768.jpeg" alt="Petra" />
          </div>
          <div className="ps-image-item">
            <img src="/images/IMG-0219-1-768x1024-1.png" alt="Petra" />
          </div>
        </div>
        <h3 className="text-center fs-1">{title4}</h3>
        <p className="lead">{paragraph13}</p>
      </Container>
    </>
  );
};

export default HerStoryScreen;
