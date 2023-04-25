const DateFile = () => {
  const date = new Date();
  const getDate = (day) => {
    const date = new Date();
    date.setDate(date.getDate() - day);
    return date.toISOString().split('T')[0];
  };

  const daysToDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);

    return date.toISOString().split('T')[0];
  };

  return { getDate, date, daysToDate };
};

export default DateFile;
