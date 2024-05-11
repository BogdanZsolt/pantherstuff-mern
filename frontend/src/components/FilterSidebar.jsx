import { Accordion, Row } from 'react-bootstrap';
import SelectCategory from './SelectCategory';

const FilterSidebar = ({ category, setCategory }) => {
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
            <Accordion.Body>Color App</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="categories">
            <Accordion.Header>Categories</Accordion.Header>
            <Accordion.Body>
              <SelectCategory category={category} setCategory={setCategory} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="brands">
            <Accordion.Header>Brands</Accordion.Header>
            <Accordion.Body>brands select</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="price">
            <Accordion.Header>Price</Accordion.Header>
            <Accordion.Body>Price select</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </>
  );
};

export default FilterSidebar;
