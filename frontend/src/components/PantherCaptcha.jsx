import { useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { MdRefresh } from 'react-icons/md';
import parse from 'html-react-parser';

const PantherCaptcha = ({
  captchaValue,
  setCaptchaValue,
  captchaInput,
  setCaptchaInput,
}) => {
  const generateCaptcha = () => {
    let value = btoa(Math.random() * 1000000000);
    value = value.substring(0, 5 + Math.random() * 5);
    return value;
  };

  const setCaptcha = (val) => {
    const fonts = ['cursive', 'sans-serif', 'serif', 'monospace'];
    let html = val
      .split('')
      .map((char) => {
        const rotate = -20 + Math.trunc(Math.random() * 30);
        const translate = -8 + Math.trunc(Math.random() * 12);
        const font = Math.trunc(Math.random() * fonts.length);
        return `<span style="transform: rotate(${rotate}deg); font-family: ${fonts[font]}; transform: translateY(${translate}px)">${char}</span>`;
      })
      .join('');
    return html;
  };

  useEffect(() => {
    if (!captchaValue) {
      const val = generateCaptcha();
      const cap = setCaptcha(val);
      setCaptchaValue(cap);
    }
  }, [captchaValue, setCaptchaValue]);

  const refreshHandler = () => {
    const val = generateCaptcha();
    const cap = setCaptcha(val);
    setCaptchaValue(cap);
    setCaptchaInput('');
  };

  const captchaInputHandler = (e) => {
    setCaptchaInput(e.target.value);
    e.preventDefault();
  };

  {
    /* https://youtu.be/3UZoVrc9A3o?si=QLrgW07yFQRWM3SK 5'53" */
  }
  return (
    <div className="captcha">
      <Form.Label>Enter captcha</Form.Label>
      <div className="preview">{captchaValue && parse(captchaValue)}</div>
      <InputGroup className="captcha-form">
        <Form.Control
          type="text"
          id="captcha-form"
          value={captchaInput}
          placeholder="Enter captcha text"
          onChange={(e) => captchaInputHandler(e)}
        />
        <Button
          type="button"
          variant="primary"
          className="btn"
          onClick={refreshHandler}
        >
          <MdRefresh style={{ fontSize: '1.25rem' }} />
        </Button>
      </InputGroup>
    </div>
  );
};

export default PantherCaptcha;
