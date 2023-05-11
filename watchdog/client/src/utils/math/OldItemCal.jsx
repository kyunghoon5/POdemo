import React from 'react';
import useDate from '../date/DateFile';
import { zipWith, add } from 'lodash';
import useMath from './Round';

const OldItemCal = (
  mainData,
  forecastDatePicker,
  sumReqForcast,
  suggestedQtyavg_qty,
  suggestedQtyavg_lead,
  isOpenM,
  inputValue
) => {
  const { date, formatDate } = useDate();
  const { round } = useMath();

  const forecastDate = forecastDatePicker;
  const daysDifference = Math.round(
    (forecastDate.getTime() - date.getTime()) / (1000 * 3600 * 24)
  );

  const onHandInventory = mainData.map((item) => Number(item.onhand));

  const dayCal = mainData.map((item) =>
    item.sold30.map((item) => Number(item.qtyshp / 30) * daysDifference)
  );

  const onhnadWithRVG = zipWith(
    onHandInventory,
    sumReqForcast,
    (x, y) => x + y
  ).map((num) => round(num));

  const QtyBackOrder = mainData.map((item) =>
    item.reorderPointO.map((item) => Number(item.qtybo))
  );

  const Cal30 = mainData.map((item) =>
    item.sold30.map((item) => Number(item.qtyshp / 30) * daysDifference)
  );

  const Cal60 = mainData.map((item) =>
    item.sold60.map((item) => Number(item.qtyshp / 60) * daysDifference)
  );

  const Cal90 = mainData.map((item) =>
    item.sold90.map((item) => Number(item.qtyshp / 90) * daysDifference)
  );

  const Cal365f = mainData.map((item) =>
    item.sold365.map((item) => Number(item.qtyshp))
  );
  const Cal365 = zipWith(Cal365f, QtyBackOrder, (a, b) =>
    zipWith(a, b, (c, d) => {
      return ((c + d) / 365) * daysDifference;
    })
  );

  const oldOH_Forecast_Left =
    daysDifference <= 30
      ? zipWith(onhnadWithRVG, dayCal, (x, y) => round(x - y))
      : daysDifference <= 30
      ? zipWith(onhnadWithRVG, Cal30, (x, y) => round(x - y))
      : daysDifference > 30 && daysDifference <= 60
      ? zipWith(onhnadWithRVG, Cal60, (x, y) => round(x - y))
      : daysDifference > 60 && daysDifference < 90
      ? zipWith(onhnadWithRVG, Cal90, (x, y) => round(x - y))
      : zipWith(onhnadWithRVG, Cal365, (x, y) => round(x - y));

  const oldOH_Forecast_Right = zipWith(
    suggestedQtyavg_qty,
    suggestedQtyavg_lead,
    oldOH_Forecast_Left,
    (qty, lead, am) => qty * lead - am
  ).reduce((acc, curr) => acc.concat(curr), []);

  //Old NeededCal
  const eachItemNeededDate = isOpenM
    ? mainData.map((item) =>
        item.poLeadTimeO.length
          ? item.poLeadTimeO.map((item2) =>
              new Date(formatDate(Number(inputValue))).getTime()
            ) - date.getTime()
          : undefined
      )
    : mainData.map((item) =>
        item.poLeadTimeO.length
          ? item.poLeadTimeO.map((item2) =>
              new Date(formatDate(item2.avg_lead_time)).getTime()
            ) - date.getTime()
          : undefined
      );

  const Difference_In_PostDayresult2 = eachItemNeededDate.map((item) =>
    round(item / (1000 * 3600 * 24))
  );

  const onhandCal2 = mainData.map((item) => Number(item.onhand));

  const dayCal2 = mainData.map((item) =>
    item.sold30.map((item) => Number(item.qtyshp / 30))
  );

  const multipliedData = zipWith(
    dayCal2,
    Difference_In_PostDayresult2,
    (arr1, arr2) => arr1.map((elem) => elem * arr2)
  );

  const poPoendingData = mainData.map((item, idx) =>
    item.pendingDataO.length
      ? item.pendingDataO.map((item2) => item2.pending)
      : undefined
  );

  const onhnadWithRVG2 = zipWith(onhandCal2, poPoendingData, (x, y) =>
    round(add(x, y))
  );

  const Cal302 = mainData.map((item) =>
    item.sold30.map((item) => Number(item.qtyshp / 30))
  );

  const multipliedData2 = zipWith(
    Cal302,
    Difference_In_PostDayresult2,
    (arr1, arr2) => arr1.map((elem) => elem * arr2)
  );

  const Cal602 = mainData.map((item) =>
    item.sold60.map((item) => Number(item.qtyshp / 60))
  );

  const multipliedData3 = zipWith(
    Cal602,
    Difference_In_PostDayresult2,
    (arr1, arr2) => arr1.map((elem) => elem * arr2)
  );

  const Cal902 = mainData.map((item) =>
    item.sold90.map((item) => Number(item.qtyshp / 90))
  );
  const multipliedData4 = zipWith(
    Cal902,
    Difference_In_PostDayresult2,
    (arr1, arr2) => arr1.map((elem) => elem * arr2)
  );

  const Cal3652f = mainData.map((item) =>
    item.sold365.map((item) => Number(item.qtyshp))
  );
  const Cal3652 = zipWith(Cal3652f, QtyBackOrder, (a, b) =>
    zipWith(a, b, (c, d) => {
      return (c + d) / 365;
    })
  );

  const multipliedData5 = zipWith(
    Cal3652,
    Difference_In_PostDayresult2,
    (arr1, arr2) => arr1.map((elem) => elem * arr2)
  );

  const oldNeededCal =
    Difference_In_PostDayresult2 <= 30
      ? zipWith(onhnadWithRVG2, multipliedData, (arr1, arr2) =>
          arr2.map((elem) => round(arr1 - elem))
        )
      : Difference_In_PostDayresult2 <= 30
      ? zipWith(onhnadWithRVG2, multipliedData2, (arr1, arr2) =>
          arr2.map((elem) => round(arr1 - elem))
        )
      : Difference_In_PostDayresult2 > 30 && Difference_In_PostDayresult2 <= 60
      ? zipWith(onhnadWithRVG2, multipliedData3, (arr1, arr2) =>
          arr2.map((elem) => round(arr1 - elem))
        )
      : Difference_In_PostDayresult2 > 60 && Difference_In_PostDayresult2 < 90
      ? zipWith(onhnadWithRVG2, multipliedData4, (arr1, arr2) =>
          arr2.map((elem) => round(arr1 - elem))
        )
      : zipWith(onhnadWithRVG2, multipliedData5, (arr1, arr2) =>
          arr2.map((elem) => round(arr1 - elem))
        );
  return {
    oldOH_Forecast_Left,
    oldOH_Forecast_Right,
    oldNeededCal,
    daysDifference,
  };
};

export default OldItemCal;
