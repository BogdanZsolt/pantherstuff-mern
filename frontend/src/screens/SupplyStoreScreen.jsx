import Banner from '../components/Banner';
import { useTranslation } from 'react-i18next';

const SupplyStoreScreen = () => {
  const { t } = useTranslation(['menu']);

  return (
    <Banner
      title={t('supplyStore')}
      src="/images/ecoprint-04.webp"
      alt="Supply Store Banner"
    />
  );
};

export default SupplyStoreScreen;
