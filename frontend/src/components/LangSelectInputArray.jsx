import { useState } from 'react';
import { Button, Col, InputGroup, Row, Form } from 'react-bootstrap';

const LangSelectInputArray = ({
  label = '',
  defLang,
  setDefLang,
  secLang,
  setSecLang,
}) => {
  // const [val, setVal] = useState([]);
  const [lang, setLang] = useState('en');

  const handleAdd = () => {
    // const abc = [...val, []];
    // setVal(abc);
    const dlang = [...defLang, []];
    const slang = [...secLang, []];
    setDefLang(dlang);
    setSecLang(slang);
  };

  const handleChange = (onChangeValue, i) => {
    // const inputdata = [...val];
    const inputdata = lang === 'en' ? [...defLang] : [...secLang];
    inputdata[i] = onChangeValue.target.value;
    // setVal(inputdata);
    lang === 'en' ? setDefLang(inputdata) : setSecLang(inputdata);
  };

  const handleDelete = (i) => {
    // const deleteVal = [...val];
    const deleteDLang = [...defLang];
    const deleteSLang = [...secLang];
    deleteDLang.splice(i, 1);
    deleteSLang.splice(i, 1);
    // setVal(deleteVal);
    setDefLang(deleteDLang);
    setSecLang(deleteSLang);
  };

  const selectLang = (lng) => {
    if (lng === 'en') {
      return defLang;
    } else {
      return secLang;
    }
  };

  return (
    <div className="my-4">
      <Row className="mb-3">
        <Col>
          <Form.Label>{label}</Form.Label>
        </Col>
        <Col className="text-end">
          <Button type="button" onClick={() => handleAdd()} className="">
            Add
          </Button>
        </Col>
      </Row>
      {selectLang(lang).map((data, i) => {
        return (
          <InputGroup key={i}>
            <Form.Control value={data} onChange={(e) => handleChange(e, i)} />
            <Col md={3}>
              <Form.Select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="col-md-4"
              >
                <option value="en">en</option>
                <option value="hu">hu</option>
              </Form.Select>
            </Col>
            <Button type="button" onClick={() => handleDelete(i)}>
              x
            </Button>
          </InputGroup>
        );
      })}
    </div>
  );
};

export default LangSelectInputArray;
