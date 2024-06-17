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

export { toCurrency };
