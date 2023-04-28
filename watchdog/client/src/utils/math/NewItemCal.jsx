import React from 'react';
import useDate from '../date/DateFile';
import { zipWith } from 'lodash';

const NewItemCal = (mainData) => {
  const { date } = useDate();

  const startDateToTime = mainData
    .filter((item) => item.start_dte)
    .map((item) => new Date(item.start_dte).getTime())
    .sort((a, b) => a - b)[0];

  const gapTime = startDateToTime - date.getTime();
  const gapTimeCal = gapTime / (1000 * 3600 * 24);
  const gapTimeMath = Math.abs(Math.round(gapTimeCal));

 
 const suggestedNewQtyavg_qty = mainData.map((item) =>
   item.newitemkeyForecast.map(
     (item) => item.total_qty_difference / gapTimeMath
   )
 );

   const suggestedQtyavg_lead = mainData.map((item) =>
     item.poLeadTimeO.map((item) => Number(item.avg_lead_time))
   );

     const suggestedQty2 = zipWith(
       suggestedNewQtyavg_qty,
       suggestedQtyavg_lead,
       (qty, lead) => qty * lead
     ).reduce((acc, curr) => acc.concat(curr), []);

 
  return { suggestedQty2 };
};

export default NewItemCal;
