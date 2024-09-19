const addTimeToDate = (startTime, measure, qty) => {
  switch (measure) {
    case 'year':
      startTime.setFullYear(startTime.getFullYear() + qty);
      break;
    case 'month':
      startTime.setMonth(startTime.getMonth() + qty);
      break;
    case 'week':
      startTime.setDate(startTime.getDate() + 7 * qty);
      break;
    case 'day':
      startTime.setDate(startTime.getDate() + qty);
      break;
  }
  return Date.parse(startTime);
};

export { addTimeToDate };
