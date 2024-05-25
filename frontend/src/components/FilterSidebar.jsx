import { Accordion, Row } from 'react-bootstrap';
import SelectCategory from './SelectCategory';
import PriceSlider from './PriceSlider';
import SelectColors from './SelectColors';

const FilterSidebar = ({
  category,
  setCategory,
  min,
  minPrice,
  setMinPrice,
  max,
  maxPrice,
  setMaxPrice,
  colors,
  setColors,
}) => {
  console.log(colors);

  return (
    <>
      <h3>Filter</h3>
      <Row>
        <Accordion
          defaultActiveKey={['size', 'color', 'categories', 'brands', 'price']}
          flush
          alwaysOpen
        >
          <Accordion.Item eventKey="size">
            <Accordion.Header>Size</Accordion.Header>
            <Accordion.Body>Size filter</Accordion.Body>
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
              <SelectCategory category={category} setCategory={setCategory} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="brands">
            <Accordion.Header>Collection</Accordion.Header>
            <Accordion.Body>Collection select</Accordion.Body>
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
