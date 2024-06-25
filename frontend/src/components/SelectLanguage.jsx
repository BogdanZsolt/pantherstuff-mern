import { Form } from 'react-bootstrap';

const SelectLanguage = ({ lang, setLang }) => {
  const langs = [
    {
      value: 'en',
      label: 'english',
    },
    { value: 'hu', label: 'hungarian' },
  ];

  const langChangeHandler = (val) => {
    setLang(val);
  };

  return (
    <Form.Group className="mb-2">
      <Form.Label>Post Language</Form.Label>
      <Form.Select
        aria-label="lang-select"
        value={lang}
        onChange={(e) => langChangeHandler(e.target.value)}
      >
        {langs.map((lang, ind) => (
          <option key={ind} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default SelectLanguage;
