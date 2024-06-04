import { Accordion, Row } from 'react-bootstrap';
import SelectCategory from './SelectCategory';
import SelectCollection from './SelectCollection';
import PriceSlider from './PriceSlider';
import SelectColors from './SelectColors';
import SelectSizes from './SelectSizes';

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
  return (
    <>
      <h3>Filter</h3>
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
            <Accordion.Header>Size</Accordion.Header>
            <Accordion.Body>
              <SelectSizes productSize={size} setProductSize={setSize} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="color">
            <Accordion.Header>Color</Accordion.Header>
            <Accordion.Body>
              <SelectColors colors={colors} setColors={setColors} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="categories">
            <Accordion.Header>Categories</Accordion.Header>
            <Accordion.Body>
              <SelectCategory
                category={category}
                setCategory={setCategory}
                multi
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="collections">
            <Accordion.Header>Collection</Accordion.Header>
            <Accordion.Body>
              <SelectCollection
                collection={collection}
                setCollection={setCollection}
                multi
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="price">
            <Accordion.Header>Price</Accordion.Header>
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
