import { Container } from 'react-bootstrap';
import Banner from '../components/Banner';
import { useTranslation } from 'react-i18next';

const BaseMaterialsScreen = () => {
  const { t } = useTranslation(['menu']);
  return (
    <>
      <Banner title={t('baseMaterials')} alt="base materials" />
      <Container>BaseMaterialsScreen</Container>
    </>
  );
};

export default BaseMaterialsScreen;
