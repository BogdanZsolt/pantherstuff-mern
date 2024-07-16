import { Accordion, Row } from 'react-bootstrap';
import SelectCategory from './SelectCategory';
import PriceSlider from './PriceSlider';
import SelectSupplySizes from './SelectSupplySizes.jsx';
import { useTranslation } from 'react-i18next';

const SupplyFilterSidebar = ({
  size,
  setSize,
  category,
  setCategory,
  min,
  minPrice,
  setMinPrice,
  max,
  maxPrice,
  setMaxPrice,
  className,
}) => {
  const { t } = useTranslation(['shop']);

  return (
    <div className={className}>
      <h3>{t('filters')}</h3>
      <Row>
        <Accordion
          defaultActiveKey={['size', 'categories', 'price']}
          flush
          alwaysOpen
        >
          <Accordion.Item eventKey="size">
            <Accordion.Header>{t('size')}</Accordion.Header>
            <Accordion.Body>
              <SelectSupplySizes supplySize={size} setSupplySize={setSize} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="categories">
            <Accordion.Header>{t('categories')}</Accordion.Header>
            <Accordion.Body>
              <SelectCategory
                category={category}
                setCategory={setCategory}
                multi
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="price">
            <Accordion.Header>{t('price')}</Accordion.Header>
            <Accordion.Body>
              <PriceSlider
                min={min}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                max={max}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </div>
  );
};

export default SupplyFilterSidebar;
