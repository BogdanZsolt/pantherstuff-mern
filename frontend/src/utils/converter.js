const toCurrency = (lang, num) => {
  if (lang === 'en') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(num);
  } else if (lang === 'hu') {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
    }).format(num);
  }
};

const toLocalDate = (lang, date, option = 'medium') => {
  if (lang === 'en') {
    return new Intl.DateTimeFormat('en-EN', {
      dateStyle: option,
      timeStyle: option,
    }).format(new Date(date));
  } else if (lang === 'hu') {
    return new Intl.DateTimeFormat('hu-HU', {
      dateStyle: option,
      timeStyle: option,
    }).format(new Date(date));
  }
};

const uuid = () => {
  return String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    ''
  );
};

export { toCurrency, toLocalDate, uuid };
