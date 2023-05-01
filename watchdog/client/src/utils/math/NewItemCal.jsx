import React from 'react';
import useDate from '../date/DateFile';
import { zipWith, add } from 'lodash';
import useMath from './Math';

const NewItemCal = (mainData, forecastDatePicker, sumReqForcast) => {
  const { date, formatDate } = useDate();
  const { round } = useMath();

  const startDateToTime = mainData
    .filter((item) => item.start_dte)
    .map((item) => new Date(item.start_dte).getTime())
    .sort((a, b) => a - b)[0];

  const gapTime = startDateToTime - date.getTime();
  const gapTimeCal = gapTime / (1000 * 3600 * 24);
  const gapTimeMath = Math.abs(Math.round(gapTimeCal));

  const NewItem_Qty_avg = mainData.map((item) =>
    item.newitemkeyForecast.map(
      (item) => (item.total_qty_difference + item.qtybo) / gapTimeMath
    )
  );

  //duplicated
  const suggestedQtyavg_lead = mainData.map((item) =>
    item.poLeadTimeO.map((item) => Number(item.avg_lead_time))
  );

  const suggestedOHForNewItem = zipWith(
    NewItem_Qty_avg,
    suggestedQtyavg_lead,
    (qty, lead) => qty * lead
  ).reduce((acc, curr) => acc.concat(curr), []);

  //OH_FORECAST for New Item
  const forecastDate = forecastDatePicker;
  const daysDifference = Math.round(
    (forecastDate - date.getTime()) / (1000 * 3600 * 24)
  );

  const monthsDifference = Math.round((daysDifference / 30) * 10) / 10;

  const onHandInventory = mainData.map((item) => Number(item.onhand));

  const onhnadWithRVG = zipWith(
    onHandInventory,
    sumReqForcast,
    (x, y) => x + y
  ).map((num) => round(num));

  const dayCal223 = mainData.map(
    (item) =>
      item.newitemkeyForecast.map(
        (item) => (item.total_qty_difference + item.qtybo) / gapTimeMath
      ) * daysDifference
  );

  const dayCal224 = mainData.map((item) =>
    item.newitemkeyForecast.map(
      (item) => (item.total_qty_difference + item.qtybo) / gapTimeMath
    )
  );

  const NewOH_ForecastLeft = zipWith(onhnadWithRVG, dayCal223, (x, y) =>
    round(x - y)
  );

  const NewOH_ForecastRight = zipWith(
    NewItem_Qty_avg,
    suggestedQtyavg_lead,
    NewOH_ForecastLeft,
    (qty, lead, am) => qty * lead - am
  ).reduce((acc, curr) => acc.concat(curr), []);

  //new Item Needed
  const eachItemNeededDate = mainData.map((item) =>
    item.poLeadTimeO.length
      ? item.poLeadTimeO.map((item2) =>
          new Date(formatDate(item2.avg_lead_time)).getTime()
        ) - date.getTime()
      : undefined
  );
  const Difference_In_PostDayresult2 = eachItemNeededDate.map((item) =>
    round(item / (1000 * 3600 * 24))
  );

  const multipliedData32 = zipWith(
    dayCal224,
    Difference_In_PostDayresult2,
    (arr1, arr2) => arr1 * arr2
  );

  const Difference_In_PostDecimalDayresult2 = eachItemNeededDate.map(
    (item) => Math.round((item / (1000 * 3600 * 24) / 30) * 10) / 10
  );

  const poPoendingData = mainData.map((item, idx) =>
    item.pendingDataO.length
      ? item.pendingDataO.map((item2) => item2.pending)
      : undefined
  );

  const onhnadWithRVG22 = zipWith(onHandInventory, poPoendingData, (x, y) =>
    round(add(x, y))
  );

  const NewNeededCal = zipWith(
    onhnadWithRVG22,
    multipliedData32,
    (arr1, arr2) => round(arr1 - arr2)
  );

  return {
    suggestedOHForNewItem,
    NewItem_Qty_avg,
    NewOH_ForecastLeft,
    NewOH_ForecastRight,
    NewNeededCal,
  };
};

export default NewItemCal;
