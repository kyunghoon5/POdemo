import React from 'react'
import useDate from '../date/DateFile'


const NewItemCal = ({ mainData }) => {
  const { date} = useDate();
  
const startDateToTime = mainData
  .filter((item) => item.start_dte)
  .map((item) => new Date(item.start_dte).getTime())
  .sort((a, b) => a - b)[0];


  const gapTime = startDateToTime - date.getTime();
  const gapTimeCal = gapTime / (1000 * 3600 * 24);
  const gapTimeMath = Math.abs(Math.round(gapTimeCal));
  


  
  return 
};

export default NewItemCal