import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('hu');
    } else {
      i18n.changeLanguage('en');
    }
  };

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <div className="nav-link" role="button" onClick={() => changeLanguage()}>
      {i18n.language === 'en' ? 'Magyar' : 'English'}
    </div>
  );
};

export default LanguageSelector;
