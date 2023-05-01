import React, { Fragment } from 'react';

import DatePicker from 'react-datepicker';
import useDate from '../../../utils/date/DateFile';
const Row12 = ({
  mainData,
  itemRank,
  endDatePicker,
  forecastDatePicker,

  newitemRank,
  newitemLoading,
  setForecasteDatePicker,
  itemLoading,
  setEndDatePicker,
}) => {
  const { getDate } = useDate();
  const past365c = getDate(365);

  const newOrOld = () => {
    if (mainData.length === 0) {
      return;
    }
    const result =
      mainData
        .filter((item) => item.start_dte)
        .map(
          (item) => new Date(item.start_dte).toISOString().split('T')[0]
        )[0] < past365c ? (
        'OLD'
      ) : mainData.some((item) =>
          item.firstOrderItem.some((value) => value !== 0)
        ) ? (
        'First Order'
      ) : (
        'NEW'
      );
    return result;
  };
  

  const itemRankLoaded = itemRank
    .flatMap((item) => [item].concat(item.ranknonRB ?? []))
    .filter((item) => item.percentile);
  const itemRankRBLoaded = itemRank
    .flatMap((item) => [item].concat(item.rankRB ?? []))
    .filter((item) => item.percentile);

  const newitemRankLoaded = newitemRank;
 
  const isLoading = itemLoading || newitemLoading;

  let result;

  if (!isLoading) {
    if (
      itemRankLoaded.some((item) => item.percentile >= 0.98) ||
      itemRankRBLoaded.some((item) => item.percentile >= 0.98) ||
      newitemRankLoaded.some((item) => item.percentile >= 0.98)
    ) {
      result = (
        <td style={{ background: '#90ee90', fontWeight: 'bold' }}>A+</td>
      );
    } else if (
      itemRankLoaded.some((item) => item.percentile >= 0.93) ||
      itemRankRBLoaded.some((item) => item.percentile >= 0.93) ||
      newitemRankLoaded.some((item) => item.percentile >= 0.93)
    ) {
      result = <td style={{ background: '#90ee90', fontWeight: 'bold' }}>A</td>;
    } else if (
      itemRankLoaded.some((item) => item.percentile >= 0.9) ||
      itemRankRBLoaded.some((item) => item.percentile >= 0.9) ||
      newitemRankLoaded.some((item) => item.percentile >= 0.9)
    ) {
      result = (
        <td style={{ background: '#90ee90', fontWeight: 'bold' }}>A-</td>
      );
    } else if (
      itemRankLoaded.some((item) => item.percentile >= 0.87) ||
      itemRankRBLoaded.some((item) => item.percentile >= 0.87) ||
      newitemRankLoaded.some((item) => item.percentile >= 0.87)
    ) {
      result = (
        <td style={{ background: '#87cefa', fontWeight: 'bold' }}>B+</td>
      );
    } else if (
      itemRankLoaded.some((item) => item.percentile >= 0.83) ||
      itemRankRBLoaded.some((item) => item.percentile >= 0.83) ||
      newitemRankLoaded.some((item) => item.percentile >= 0.83)
    ) {
      result = <td style={{ background: '#87cefa', fontWeight: 'bold' }}>B</td>;
    } else if (
      itemRankLoaded.some((item) => item.percentile >= 0.8) ||
      itemRankRBLoaded.some((item) => item.percentile >= 0.8) ||
      newitemRankLoaded.some((item) => item.percentile >= 0.8)
    ) {
      result = (
        <td style={{ background: '#87cefa', fontWeight: 'bold' }}>B-</td>
      );
    } else if (
      itemRankLoaded.some((item) => item.percentile >= 0.77) ||
      itemRankRBLoaded.some((item) => item.percentile >= 0.77) ||
      newitemRankLoaded.some((item) => item.percentile >= 0.77)
    ) {
      result = (
        <td style={{ background: '#ffa500', fontWeight: 'bold' }}>C+</td>
      );
    } else if (
      itemRankLoaded.some((item) => item.percentile >= 0.73) ||
      itemRankRBLoaded.some((item) => item.percentile >= 0.73) ||
      newitemRankLoaded.some((item) => item.percentile >= 0.73)
    ) {
      result = <td style={{ background: '#ffa500', fontWeight: 'bold' }}>C</td>;
    } else if (
      itemRankLoaded.some((item) => item.percentile >= 0.7) ||
      itemRankRBLoaded.some((item) => item.percentile >= 0.7) ||
      newitemRankLoaded.some((item) => item.percentile >= 0.7)
    ) {
      result = (
        <td style={{ background: '#ffa500', fontWeight: 'bold' }}>C-</td>
      );
    } else if (
      itemRankLoaded.some((item) => item.percentile >= 0.67) ||
      itemRankRBLoaded.some((item) => item.percentile >= 0.67) ||
      newitemRankLoaded.some((item) => item.percentile >= 0.67)
    ) {
      result = (
        <td style={{ background: '#ff4500', fontWeight: 'bold' }}>D+</td>
      );
    } else if (
      itemRankLoaded.some((item) => item.percentile >= 0.63) ||
      itemRankRBLoaded.some((item) => item.percentile >= 0.63) ||
      newitemRankLoaded.some((item) => item.percentile >= 0.63)
    ) {
      result = <td style={{ background: '#ff4500', fontWeight: 'bold' }}>D</td>;
    } else if (
      itemRankLoaded.some((item) => item.percentile >= 0.6) ||
      itemRankRBLoaded.some((item) => item.percentile >= 0.6) ||
      newitemRankLoaded.some((item) => item.percentile >= 0.6)
    ) {
      result = (
        <td style={{ background: '#ff4500', fontWeight: 'bold' }}>D-</td>
      );
    } else if (
      itemRankLoaded.some((item) => item.percentile < 0.6 >= 0) ||
      itemRankRBLoaded.some((item) => item.percentile < 0.6 >= 0) ||
      newitemRankLoaded.some((item) => item.percentile < 0.6 >= 0)
    ) {
      result = <td style={{ background: '#c0c0c0', fontWeight: 'bold' }}>F</td>;
    }  else {
      result = (
        <td style={{ background: '#f5f5dc', fontWeight: 'bold' }}>Sale</td>
      );
    }
  } else {
    result = <td>Loading...</td>;
  }

  return (
    <tr className="row12">
      <td className="newOrOld ">{newOrOld()}</td>
      <td>GRADE</td>
      {mainData.length ? result : <td></td>}

      <td>
        Vend:{' '}
        {mainData.map((item) => item.itemClass.map((item) => item.vendno))[0]}
      </td>
      <td colSpan="2">
        <DatePicker
          className="border-2 border-zinc-500 text-center text-"
          selected={endDatePicker}
          maxDate={new Date()}
          onChange={(date) => setEndDatePicker(date)}
        />
      </td>
      <td className="prv30">{new Date().toISOString().split('T')[0]}</td>
      <td className="prv90">{new Date().toISOString().split('T')[0]}</td>
      <td className="prv365">{new Date().toISOString().split('T')[0]}</td>
      <td></td>
      <td></td>
      <td></td>
      <td colSpan={2}>
        <DatePicker
          className="border-2 border-zinc-500 text-center text-"
          minDate={new Date()}
          maxDate={new Date().setDate(new Date().getDate() + 365)}
          selected={forecastDatePicker}
          onChange={(date) => setForecasteDatePicker(date)}
        />
      </td>

      <td></td>

      <td></td>
    </tr>
  );
};

export default Row12;
