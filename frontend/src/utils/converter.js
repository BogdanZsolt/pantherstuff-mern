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

const getEventDate = (date, lang = 'en', long = false) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: long ? 'long' : 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  let language = '';
  if (lang === 'hu') {
    language = 'hu-HU';
  } else if (lang === 'en') {
    language = 'en-EN';
  }
  return new Date(date).toLocaleDateString(language, options);
};

const getTimeStamp = (date) => {
  return new Date(date).valueOf();
};

const addDaysToDate = (date, day) => {
  return date.setDate(date.getDate() + day);
};

const getCanBooking = (date, days = 30) => {
  return addDaysToDate(new Date(), days) < getTimeStamp(date);
};

const uuid = () => {
  return String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    ''
  );
};

const getDuration = (seconds) => {
  return [
    parseInt(seconds / 60 / 60),
    parseInt((seconds / 60) % 60),
    parseInt(seconds % 60),
  ]
    .join(':')
    .replace(/\b(\d)\b/g, '0$1');
};

export {
  toCurrency,
  toLocalDate,
  getEventDate,
  getTimeStamp,
  addDaysToDate,
  getCanBooking,
  uuid,
  getDuration,
};
