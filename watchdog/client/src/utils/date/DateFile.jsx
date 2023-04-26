const DateFile = () => {
   
  const date = new Date();
  date.setHours(0,0,0,0)
  
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

   const formatDate = (days) => {
     const date = new Date();
     date.setDate(date.getDate() + days);

     return date.toLocaleDateString('en-US', {
       month: '2-digit',
       day: '2-digit',
       year: 'numeric',
     });
   };

  return { getDate, date, daysToDate, formatDate };
};



export default DateFile;
