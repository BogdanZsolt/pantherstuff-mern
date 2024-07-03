import { useState } from 'react';
import { Col, Form, InputGroup } from 'react-bootstrap';

const LangSelectInput = ({
  label = '',
  type = 'text',
  placeholder = 'Enter text',
  placeholder_hu = 'Adja meg a szöveget',
  defLang,
  setDefLang,
  secLang,
  setSecLang,
  className,
}) => {
  const [lang, setLang] = useState('en');

  const onChangeHandle = (val) => {
    lang === 'en' ? setDefLang(val) : setSecLang(val);
  };

  return (
    <Form.Group className={className}>
      <Form.Label>{label}</Form.Label>
      <InputGroup className="my-2">
        <Col md={9}>
          <Form.Control
            type={type}
            placeholder={lang === 'en' ? placeholder : placeholder_hu}
            value={lang === 'en' ? defLang : secLang}
            onChange={(e) => onChangeHandle(e.target.value)}
          ></Form.Control>
        </Col>
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
      </InputGroup>
    </Form.Group>
  );
};

export default LangSelectInput;
