import React, { useEffect, useState } from 'react';
import { sum, sumBy } from 'lodash';
import useMath from '../../utils/math/Round';

//test to pass function to useState hook
const Total = ({
  mainData,
  watchDoginfo2,
  selectedDatePicker,
  suggestedQty,
  oldOH_Forecast_Left,
  oldNeededCal,
  oldOH_Forecast_Right,
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
  set_New_NeededTotal,

  set_NeededTotal,
  setTotalNewItem_365_Sold,
  setTotalNewItem_AVG_SOLD,
  setTotalNew_SuggestedOH,
  setNew_oh_forecastTotal,
  NewOH_ForecastLeft,
  NewNeededCal,
  newitemkey2Forecast,
  NewItem_Qty_avg,
  suggestedOHForNewItem,
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

      const totalAVG_SOLD =
        sumBy(mainData.map((item) => sumBy(item.reorderPointO, 'avg_qtyshp'))) /
        mainData.reduce((a, v) => (a = a + v.reorderPointO.length), 0);

      const totalavg_lead_time =
        sumBy(
          mainData.map((item) => sumBy(item.poLeadTimeO, 'avg_lead_time'))
        ) / mainData.reduce((a, v) => (a = a + v.poLeadTimeO.length), 0);

      const totalSuggestedQty = sum(suggestedQty.map((value) => round(value)));

      const totaloh_forecast = oldOH_Forecast_Left.reduce(
        (sum, num) => (num > 0 ? round(sum + num) : sum),
        0
      );

      const totalNewoh_forecast = NewOH_ForecastLeft.reduce(
        (sum, num) => (num > 0 ? round(sum + num) : sum),
        0
      );

      const total_Needed = oldNeededCal.reduce((sum, arr) => {
        const arrSum = arr.reduce(
          (arrSum, num) => arrSum + (num < 0 ? num : 0),
          0
        );
        return sum + arrSum;
      }, 0);
      const total_New_Needed = NewNeededCal.reduce((sum, num) => {
        const arrSum = sum + (num < 0 ? num : 0);
        return arrSum;
      }, 0);

      const totalNew365 = sumBy(
        newitemkey2Forecast.map((item) =>
          sumBy(item.newitemkeyForecast, 'total_qty_difference')
        )
      );

      const nonZeroItems = NewItem_Qty_avg.filter(
        (item) => item.reduce((a, v) => a + v, 0) !== 0
      );
      const lengthOfNonZeroItems = nonZeroItems.length;

      const totalNew_AVG_SOLD = (
        sum(NewItem_Qty_avg.map((item) => sumBy(item))) / lengthOfNonZeroItems
      ).toFixed(2);

      const totalNew_SuggestedOH = sum(
        suggestedOHForNewItem.map((item) => round(item))
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
      setavg_sold365Total(totalAVG_SOLD);
      setavg_lead_timeTotal(totalavg_lead_time);

      setsuggestedQtyTotal(totalSuggestedQty);
      setoh_forecastTotal(totaloh_forecast);

      set_NeededTotal(total_Needed);

      setTotalNewItem_365_Sold(totalNew365);
      setTotalNewItem_AVG_SOLD(totalNew_AVG_SOLD);
      setTotalNew_SuggestedOH(totalNew_SuggestedOH);
      setNew_oh_forecastTotal(totalNewoh_forecast);
      set_New_NeededTotal(total_New_Needed);
    };

    calculateTotals();
  }, [
    mainData,
    watchDoginfo2,
    selectedDatePicker,
    suggestedQty,
    oldOH_Forecast_Left,
    oldOH_Forecast_Right,
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

    set_NeededTotal,
    setTotalNewItem_365_Sold,
    setTotalNewItem_AVG_SOLD,
    setTotalNew_SuggestedOH,
    setNew_oh_forecastTotal,
    set_New_NeededTotal,
  ]);

  return;
};

export default Total;
