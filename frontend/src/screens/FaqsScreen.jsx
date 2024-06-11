import { Container } from 'react-bootstrap';
import Banner from '../components/Banner';
import { useTranslation } from 'react-i18next';

const FaqsScreen = () => {
  const { t } = useTranslation();
  return (
    <>
      <Banner title={t('faqs')} alt={t('faqs')} />
      <Container>FaqsScreen</Container>;
    </>
  );
};

export default FaqsScreen;
