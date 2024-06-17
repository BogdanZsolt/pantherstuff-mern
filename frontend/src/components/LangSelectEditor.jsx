import { lazy, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
const Editor = lazy(() => import('./Editor.jsx'));

const LangSelectEditor = ({
  label = '',
  defLang,
  setDefLang,
  secLang,
  setSecLang,
}) => {
  const [lang, setLang] = useState('en');

  const dataChangeHandler = (data) => {
    console.log(data);
    lang === 'en' ? setDefLang(data) : setSecLang(data);
  };

  return (
    <Form.Group>
      <Row className="mb-3">
        <Col md={3} className="align-items-end">
          <Form.Label>{label}</Form.Label>
        </Col>
        <Col md={{ span: 3, offset: 6 }}>
          <Form.Select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="col-md-4"
          >
            <option value="en">en</option>
            <option value="hu">hu</option>
          </Form.Select>
        </Col>
      </Row>
      <Editor
        content={lang === 'en' ? defLang : secLang}
        onDataChange={(data) => dataChangeHandler(data)}
        editable
      />
    </Form.Group>
  );
};

export default LangSelectEditor;
