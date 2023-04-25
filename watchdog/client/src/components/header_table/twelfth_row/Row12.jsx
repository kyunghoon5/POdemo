import React from 'react';

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
    if (
      mainData
        .filter((item) => item.start_dte)
        .map(
          (item) => new Date(item.start_dte).toISOString().split('T')[0]
        )[0] > past365c
    ) {
      return 'NEW';
    } else {
      return 'OLD';
    }
  };

  return (
    <tr className="row12">
      <td className="newOrOld">{newOrOld()}</td>
      <td>GRADE</td>
      {itemRank.length ? (
        itemLoading === false || newitemLoading === false ? (
          itemRank
            .flatMap((item) => [item].concat(item.ranknonRB ?? []))
            .filter((item) => item.percentile)
            .map((item) => item.percentile * 100)[0] > 98 ||
          itemRank
            .flatMap((item) => [item].concat(item.rankRB ?? []))
            .filter((item) => item.percentile)
            .map((item) => item.percentile * 100)[0] > 98 ||
          newitemRank
            .flatMap((item) => [item].concat(item.descrip ?? []))
            .filter((item) => item.percentile)
            .map((item) => item.percentile * 100)[0] > 98 ? (
            <td style={{ background: '#90ee90', fontWeight: 'bold' }}>A+</td>
          ) : itemRank
              .flatMap((item) => [item].concat(item.ranknonRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 93 ||
            itemRank
              .flatMap((item) => [item].concat(item.rankRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 93 ||
            newitemRank
              .flatMap((item) => [item].concat(item.descrip ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 93 ? (
            <td style={{ background: '#90ee90', fontWeight: 'bold' }}>A</td>
          ) : itemRank
              .flatMap((item) => [item].concat(item.ranknonRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 90 ||
            itemRank
              .flatMap((item) => [item].concat(item.rankRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 90 ||
            newitemRank
              .flatMap((item) => [item].concat(item.descrip ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 90 ? (
            <td style={{ background: '#90ee90', fontWeight: 'bold' }}>A-</td>
          ) : itemRank
              .flatMap((item) => [item].concat(item.ranknonRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 87 ||
            itemRank
              .flatMap((item) => [item].concat(item.rankRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 87 ||
            newitemRank
              .flatMap((item) => [item].concat(item.descrip ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 87 ? (
            <td style={{ background: '#87cefa', fontWeight: 'bold' }}>B+</td>
          ) : itemRank
              .flatMap((item) => [item].concat(item.ranknonRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 83 ||
            itemRank
              .flatMap((item) => [item].concat(item.rankRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 83 ||
            newitemRank
              .flatMap((item) => [item].concat(item.descrip ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 83 ? (
            <td style={{ background: '#87cefa', fontWeight: 'bold' }}>B</td>
          ) : itemRank
              .flatMap((item) => [item].concat(item.ranknonRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 80 ||
            itemRank
              .flatMap((item) => [item].concat(item.rankRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 80 ||
            newitemRank
              .flatMap((item) => [item].concat(item.descrip ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 80 ? (
            <td style={{ background: '#87cefa', fontWeight: 'bold' }}>B-</td>
          ) : itemRank
              .flatMap((item) => [item].concat(item.ranknonRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 77 ||
            itemRank
              .flatMap((item) => [item].concat(item.rankRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 77 ||
            newitemRank
              .flatMap((item) => [item].concat(item.descrip ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 77 ? (
            <td style={{ background: '#ffa500', fontWeight: 'bold' }}>C+</td>
          ) : itemRank
              .flatMap((item) => [item].concat(item.ranknonRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 73 ||
            itemRank
              .flatMap((item) => [item].concat(item.rankRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 73 ||
            newitemRank
              .flatMap((item) => [item].concat(item.descrip ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 73 ? (
            <td style={{ background: '#ffa500', fontWeight: 'bold' }}>C</td>
          ) : itemRank
              .flatMap((item) => [item].concat(item.ranknonRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 70 ||
            itemRank
              .flatMap((item) => [item].concat(item.rankRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 70 ||
            newitemRank
              .flatMap((item) => [item].concat(item.descrip ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 70 ? (
            <td style={{ background: '#ffa500', fontWeight: 'bold' }}>C-</td>
          ) : itemRank
              .flatMap((item) => [item].concat(item.ranknonRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 67 ||
            itemRank
              .flatMap((item) => [item].concat(item.rankRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 67 ||
            newitemRank
              .flatMap((item) => [item].concat(item.descrip ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 67 ? (
            <td style={{ background: '#ff4500', fontWeight: 'bold' }}>D+</td>
          ) : itemRank
              .flatMap((item) => [item].concat(item.ranknonRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 63 ||
            itemRank
              .flatMap((item) => [item].concat(item.rankRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 63 ||
            newitemRank
              .flatMap((item) => [item].concat(item.descrip ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 63 ? (
            <td style={{ background: '#ff4500', fontWeight: 'bold' }}>D</td>
          ) : itemRank
              .flatMap((item) => [item].concat(item.ranknonRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 60 ||
            itemRank
              .flatMap((item) => [item].concat(item.rankRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 60 ||
            newitemRank
              .flatMap((item) => [item].concat(item.descrip ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] > 60 ? (
            <td style={{ background: '#ff4500', fontWeight: 'bold' }}>D-</td>
          ) : itemRank
              .flatMap((item) => [item].concat(item.ranknonRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] <= 60 ||
            itemRank
              .flatMap((item) => [item].concat(item.rankRB ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] <= 60 ||
            newitemRank
              .flatMap((item) => [item].concat(item.descrip ?? []))
              .filter((item) => item.percentile)
              .map((item) => item.percentile * 100)[0] <= 60 ? (
            <td style={{ background: '#c0c0c0', fontWeight: 'bold' }}>F</td>
          ) : (
            <td>Loading...</td>
          )
        ) : (
          <td>Loading...</td>
        )
      ) : itemLoading === false || newitemLoading === false ? (
        <td></td>
      ) : (
        <td>Loading...</td>
      )}
      <td>
        Vend:{' '}
        {
          mainData.map((item) =>
            item.reorderPointO.map((item) => item.vendno)
          )[0]
        }
      </td>
      <td colSpan="2">
        <DatePicker
          className="border-2 border-zinc-500 text-center text-"
          selected={endDatePicker}
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
