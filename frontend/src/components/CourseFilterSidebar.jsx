import { Accordion, Row } from 'react-bootstrap';
import SelectCategory from './SelectCategory';
import PriceSlider from './PriceSlider';
import { useTranslation } from 'react-i18next';

const FilterSidebar = ({
  categories,
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
  const { t } = useTranslation(['course']);

  return (
    <div className={className} style={{ width: '100%' }}>
      <h3>{t('filters')}</h3>
      <Row>
        <Accordion
          defaultActiveKey={['categories', 'price']}
          flush
          alwaysOpen
          style={{ '--bs-accordion-bg': 'transparent' }}
        >
          <Accordion.Item eventKey="categories">
            <Accordion.Header>{t('categories')}</Accordion.Header>
            <Accordion.Body>
              <SelectCategory
                categories={categories}
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

export default FilterSidebar;
