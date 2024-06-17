import { Accordion, Row } from 'react-bootstrap';
import SelectCategory from './SelectCategory';
import SelectCollection from './SelectCollection';
import PriceSlider from './PriceSlider';
import SelectColors from './SelectColors';
import SelectSizes from './SelectSizes';
import { useTranslation } from 'react-i18next';

const FilterSidebar = ({
  size,
  setSize,
  category,
  setCategory,
  collection,
  setCollection,
  min,
  minPrice,
  setMinPrice,
  max,
  maxPrice,
  setMaxPrice,
  colors,
  setColors,
}) => {
  const { t } = useTranslation(['shop']);

  return (
    <>
      <h3>{t('filters')}</h3>
      <Row>
        <Accordion
          defaultActiveKey={[
            'size',
            'color',
            'categories',
            'collections',
            'price',
          ]}
          flush
          alwaysOpen
        >
          <Accordion.Item eventKey="size">
            <Accordion.Header>{t('size')}</Accordion.Header>
            <Accordion.Body>
              <SelectSizes productSize={size} setProductSize={setSize} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="color">
            <Accordion.Header>{t('color')}</Accordion.Header>
            <Accordion.Body>
              <SelectColors colors={colors} setColors={setColors} />
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
          <Accordion.Item eventKey="collections">
            <Accordion.Header>{t('collections')}</Accordion.Header>
            <Accordion.Body>
              <SelectCollection
                collection={collection}
                setCollection={setCollection}
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
    </>
  );
};

export default FilterSidebar;
