import React, { useEffect, useState } from 'react';
import { sum, sumBy } from 'lodash';
import useMath from '../../utils/math/Math';
//test to pass function to useState hook
const Total = ({
  mainData,
  watchDoginfo2,
  selectedDatePicker,
  suggestedQty,
  amounts,
  amounts2,
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

  setsuggestedQtyTotal,
  setoh_forecastTotal,
  setfoSuggestedTotal,
  set_NeededTotal,
  setTotalNewItemKeyForecast,
}) => {
  const { round } = useMath();
  useEffect(() => {
    const calculateTotals = () => {
      const totalColorsFilter = mainData.filter((item) => item.itemkey2);
      const totalColors = totalColorsFilter.length;

      const totalOnHandfilter = mainData.map((item) => item.onhand);
      const totalOnHand = sum(totalOnHandfilter);

      //REORDER DATA
      const totalreOrderfilter = mainData.map((item) =>
        watchDoginfo2.find(
          (item2) => item2.Color.trim() === item.itemkey2.trim()
        )
      );
      const totalreOrder = sum(
        totalreOrderfilter.map((item) => (item === undefined ? 0 : item.WMA))
      );

      const totalPending = sumBy(
        mainData.map((item) => sumBy(item.pendingDataO, 'pending'))
      );

      const totalCalendarQty = sumBy(
        selectedDatePicker.map((item) => sumBy(item.datepicker, 'qtyshp'))
      );
      const totalCalendarBO = sumBy(
        selectedDatePicker.map((item) => sumBy(item.datepicker, 'qtybo'))
      );

      const totalSold30 = sumBy(
        mainData.map((item) => sumBy(item.sold30, 'qtyshp'))
      );

      const totalSold90 = sumBy(
        mainData.map((item) => sumBy(item.sold90, 'qtyshp'))
      );

      const totalSold365 = sumBy(
        mainData.map((item) => sumBy(item.sold365, 'qtyshp'))
      );

      const totalavg_lead_time =
        sumBy(
          mainData.map((item) => sumBy(item.poLeadTimeO, 'avg_lead_time'))
        ) / mainData.reduce((a, v) => (a = a + v.poLeadTimeO.length), 0);

      const totalavg_sold365 =
        sumBy(mainData.map((item) => sumBy(item.reorderPointO, 'avg_qtyshp'))) /
        mainData.reduce((a, v) => (a = a + v.reorderPointO.length), 0);

      const totalSuggestedQty = sum(suggestedQty.map((value) => round(value)));

      const totaloh_forecast = amounts.reduce(
        (sum, num) => (num > 0 ? round(sum + num) : sum),
        0
      );

      const total_Needed = amounts2.reduce((sum, arr) => {
        const arrSum = arr.reduce(
          (arrSum, num) => arrSum + (num < 0 ? num : 0),
          0
        );
        return sum + arrSum;
      }, 0);

      const totalFoSuggested = FosuggestedQty.reduce(
        (sum, num) => (num > 0 ? round(sum + num) : sum),
        0
      );

      const totalNewItemKy = sumBy(
        mainData.map((item) =>
          sumBy(item.newitemkeyForecast, 'total_qty_difference')
        )
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
      setavg_lead_timeTotal(totalavg_lead_time);

      setsuggestedQtyTotal(totalSuggestedQty);
      setoh_forecastTotal(totaloh_forecast);
      setfoSuggestedTotal(totalFoSuggested);
      set_NeededTotal(total_Needed);

      setTotalNewItemKeyForecast(totalNewItemKy);
    };

    calculateTotals();
  }, [
    mainData,
    watchDoginfo2,
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

    setsuggestedQtyTotal,
    setoh_forecastTotal,
    setfoSuggestedTotal,
    set_NeededTotal,
    setTotalNewItemKeyForecast,
  ]);

  return <div></div>;
};

export default Total;
