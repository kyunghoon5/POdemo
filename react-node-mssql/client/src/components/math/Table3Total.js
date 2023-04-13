import React, { useEffect } from 'react';


var _ = require('lodash');

const Table3Total = ({
  search,
  WDsearch2,
  selectedDatePicker,
  suggestedQty,
  amounts,
  FosuggestedQty,
  setColorTotal,
  setonHandTotal,
  setreOrderTotal,
  setpendingTotal,
  setcalendarQtyTotal,
  setcalendarBOTotal,
  setsold30Total,
  setsold90Total,
  setsold365Total, 
  setavg_sold365Total,
  setavg_lead_timeTotal,
  setmax_leadtimeTotal,
  setBO_lastRCVTotal,
  setsuggestedQtyTotal,
  setoh_forecastTotal,
  setfoSuggestedTotal
}) => {
    const round = (num) => (isNaN(num) ? 0 : Math.round(num));
  useEffect(() => {
    const calculateTotals = () => {
      const totalColorsFilter = search.filter((item) => item.itemkey2);
      const totalColors = totalColorsFilter.length;

      const totalOnHandfilter = search.map((item) => item.onhand);
      const totalOnHand = _.sum(totalOnHandfilter);

      //REORDER DATA
      const totalreOrderfilter = search.map((item) =>
        WDsearch2.find((item2) => item2.Color.trim() === item.itemkey2.trim())
      );
      const totalreOrder = _.sum(
        totalreOrderfilter.map((item) => (item === undefined ? 0 : item.WMA))
      );

      const totalPending = _.sumBy(
        search.map((item) => _.sumBy(item.pendingDataO, 'pending'))
      );

      const totalCalendarQty = _.sumBy(
        selectedDatePicker.map((item) => _.sumBy(item.datepicker, 'qtyshp'))
      );
      const totalCalendarBO = _.sumBy(
        selectedDatePicker.map((item) => _.sumBy(item.datepicker, 'qtybo'))
      );

       const totalSold30 = _.sumBy(
         search.map((item) => _.sumBy(item.sold30, 'qtyshp'))
       );

         const totalSold90 = _.sumBy(
           search.map((item) => _.sumBy(item.sold90, 'qtyshp'))
         );

          const totalSold365 = _.sumBy(
            search.map((item) => _.sumBy(item.sold365, 'qtyshp'))
          );

          const totalavg_lead_time =
    _.sumBy(search.map((item) => _.sumBy(item.poLeadTimeO, 'avg_lead_time'))) /
    search.reduce((a, v) => (a = a + v.poLeadTimeO.length), 0);

    const totalmax_lead_time =
    _.sumBy(search.map((item) => _.sumBy(item.poLeadTimeO, 'max_lead_time'))) /
    search.reduce((a, v) => (a = a + v.poLeadTimeO.length), 0);      

      const totalavg_sold365 = _.sumBy(
        search.map((item) => _.sumBy(item.reorderPointO, 'avg_qtyshp')) 
      );
         const totalBO_lastRCV = _.sumBy(
    search.map((item) => _.sumBy(item.bofromLastRcvO, 'qtybo'))
  );



const totalSuggestedQty = _.sum(suggestedQty.map((value) => round(value)));

const totaloh_forecast= amounts.reduce(
    (sum, num) => (num < 0 ? round(sum + num) : sum),
    0
  );

  const totalFoSuggested = FosuggestedQty.reduce(
    (sum, num) => (num > 0 ? round(sum + num) : sum),
    0
  );
  
      setColorTotal(totalColors);
      setonHandTotal(totalOnHand);      
      setreOrderTotal(totalreOrder);
      setpendingTotal(totalPending);
      setcalendarQtyTotal(totalCalendarQty);
      setcalendarBOTotal(totalCalendarBO);
      setsold30Total(totalSold30);
      setsold90Total(totalSold90);
      setsold365Total(totalSold365);      
      setavg_sold365Total(totalavg_sold365);
      setavg_lead_timeTotal(totalavg_lead_time)
      setmax_leadtimeTotal(totalmax_lead_time)
      setBO_lastRCVTotal(totalBO_lastRCV)
      setsuggestedQtyTotal(totalSuggestedQty)
      setoh_forecastTotal(totaloh_forecast)
      setfoSuggestedTotal(totalFoSuggested)
    };

    calculateTotals();
  }, [
    search,
    WDsearch2,
    selectedDatePicker,
    suggestedQty,
    amounts,
    FosuggestedQty,
    setColorTotal,
    setonHandTotal,
    setpendingTotal,
    setreOrderTotal,
    setcalendarQtyTotal,
    setcalendarBOTotal,
    setsold30Total,
    setsold90Total,
    setsold365Total,
    setavg_sold365Total,
    setavg_lead_timeTotal,
    setmax_leadtimeTotal,
    setBO_lastRCVTotal,
    setsuggestedQtyTotal,
    setoh_forecastTotal,
    setfoSuggestedTotal
  ]);

  return <div></div>;
};

export default Table3Total;

//total PO qty
// const totalItems7 = _.sumBy(
//   search.map((item) => _.sumBy(item.sixth, 'qtyord'))
// );
// const totalItems8 = _.sumBy(
//   search.map((item) => _.sumBy(item.fifth, 'qtyord'))
// );
// const totalItems9 = _.sumBy(
//   search.map((item) => _.sumBy(item.fourth, 'qtyord'))
// );
// const totalItems10 = _.sumBy(
//   search.map((item) => _.sumBy(item.third, 'qtyord'))
// );
// const totalItems11 = _.sumBy(
//   search.map((item) => _.sumBy(item.second, 'qtyord'))
// );
// const totalItems12 = _.sumBy(
//   search.map((item) => _.sumBy(item.first, 'qtyord'))
// );

//total POS_
// const filteredItems3 = mergeByKey.map((item) => item.qtyord);
// const totalItems3 = _.sum(filteredItems3);

// const totalSold60 = _.sumBy(
//   search.map((item) => _.sumBy(item.sold60, 'qtyshp'))
// );

 // const totalItemsFromRCVD = _.sumBy(
  //   selectedData.map((item) => _.sumBy(item.new, 'qtyshp'))
  // );