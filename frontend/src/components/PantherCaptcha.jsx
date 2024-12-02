import { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { MdRefresh } from 'react-icons/md';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const PantherCaptcha = ({ setIsCaptcha }) => {
  const { t } = useTranslation(['captcha']);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaHtml, setCaptchaHtml] = useState(null);

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
      setCaptchaValue(val);
      const cap = setCaptcha(val);
      setCaptchaHtml(cap);
    }
  }, [captchaValue, setCaptchaValue, setCaptchaHtml]);

  const refreshHandler = () => {
    const val = generateCaptcha();
    setCaptchaValue(val);
    setCaptchaInput('');
    const cap = setCaptcha(val);
    setCaptchaHtml(cap);
    setIsCaptcha(false);
  };

  const captchaInputHandler = (e) => {
    setCaptchaInput(e.target.value);
    e.preventDefault();
  };

  useEffect(() => {
    if (captchaValue) {
      if (captchaInput.length === captchaValue.length) {
        if (captchaValue !== captchaInput) {
          setCaptchaValue(null);
          setCaptchaInput('');
          setIsCaptcha(false);
          toast.error(t('enteredCaptchaIsNotCorrect'));
        } else {
          setIsCaptcha(true);
          setCaptchaValue(null);
          setCaptchaInput('');
        }
      }
    }
  }, [captchaValue, captchaInput, setIsCaptcha, t]);

  return (
    <div className="captcha">
      <Form.Label>{t('enterCaptcha')}</Form.Label>
      <div className="preview">{captchaValue && parse(captchaHtml)}</div>
      <InputGroup className="captcha-form">
        <Form.Control
          type="text"
          id="captcha-form"
          value={captchaInput}
          placeholder={t('enterCaptchaText')}
          onChange={(e) => captchaInputHandler(e)}
        />
        <Button
          type="button"
          variant="primary"
          title={t('newCaptcha')}
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
