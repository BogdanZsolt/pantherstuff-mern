import { Container } from 'react-bootstrap';
import Banner from '../components/Banner';
import { useTranslation } from 'react-i18next';

const RawMaterialsScreen = () => {
  const { t } = useTranslation(['menu']);
  return (
    <>
      <Banner title={t('rawMaterials')} alt="base materials" />
      <Container>RawMaterialsScreen</Container>
    </>
  );
};

export default RawMaterialsScreen;
