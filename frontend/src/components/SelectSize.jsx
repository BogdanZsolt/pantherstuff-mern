import { Col, Form, Row } from 'react-bootstrap';

const SelectSize = ({ sizes, size, setSize }) => {
  const changeHandler = (e) => {
    setSize(e.target.value);
  };

  return (
    <Row>
      <Col md={4}>
        <Form.Select
          aria-label="select size"
          className="mt-2"
          value={size}
          onChange={changeHandler}
          disabled={sizes.length === 0}
        >
          {sizes.map((x) => (
            <option key={x._id} value={x._id}>
              {x.title}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
};

export default SelectSize;
