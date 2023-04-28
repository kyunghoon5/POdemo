import React from 'react';
import { sum } from 'lodash';
const Row7 = ({
  InfoItemOb,
  watchDoginfo,
  setGraphDropdownSelectedYear,
  graphDropdownSelectedYear,
  graphAllYearData,
  mainData,
  graphLoading,
  monthLine,
  monthlyData,
}) => {
  const graphDropdownHandler = (e) => {
    const graphDropdownValue = e.target.value;
    setGraphDropdownSelectedYear(graphDropdownValue);
    // update the value of graphDropdownSelectedYear
  };

  const graphYearlyTotal = sum(graphAllYearData.map((item) => item.qtyshp));
  const graphMonthlyTotal = sum(monthLine.map((item) => item.qtyshp));

  const renderData = () => {
    if (!mainData.length) {
      return (
        <>
          <td></td>
          <td style={{ background: '#f0e68c' }}>YEAR</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </>
      );
    }

    if (graphLoading) {
      return (
        <>
          <td></td>
          <td style={{ background: '#f0e68c' }}>YEAR</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </>
      );
    }

    const selectedYear = mainData.length ? (
      graphDropdownSelectedYear === 'YEAR'
    ) : (
      <></>
    );

    const total = selectedYear ? graphYearlyTotal : graphMonthlyTotal;
    const label = selectedYear ? 'YEAR' : 'MONTH';

    const numYears = graphAllYearData.length;
    const years = [];
    for (let i = 1; i <= 6; i++) {
      const index = numYears - i;
      if (index >= 0) {
        years.push(graphAllYearData[index].year);
      } else {
        years.push(undefined);
      }
    }
    const yearLabels = years
      .reverse()
      .map((year, i) => <td key={i}>{year}</td>);


    
    const monthlyLabels = (
      <>
        {[0, 2, 4, 6, 8, 10].map((index) => (
          <td key={index}>
            <span style={{ float: 'left', paddingLeft: '4px' }}>
              {monthlyData[index].name}
            </span>
            <span style={{ float: 'right', paddingRight: '4px' }}>
              {monthlyData[index + 1].name}
            </span>
          </td>
        ))}
      </>
    );

    return (
      <>
        <td>{total}</td>
        <td style={{ background: '#f0e68c' }}>{label}</td>
        {selectedYear ? yearLabels : monthlyLabels}
      </>
    );
  };

  return (
    <tr className="row7">
      <InfoItemOb className="infoCol1" name="FIBER:" />
      <td colSpan="3">
        <span
          className="fiber"
          style={{
            float: 'left',
            verticalAlign: 'middle',
            paddingLeft: '3px',
          }}
        >
          {watchDoginfo.map((item) => item.Fiber)}
        </span>
        <span
          className="fiberPo"
          style={{
            float: 'right',
            verticalAlign: 'middle',
            paddingRight: '3px',
          }}
        ></span>
      </td>
      <td>
        GRAPH
        <select
          className=" border border-zinc-500 "
          value={graphDropdownSelectedYear}
          onChange={(e) => {
            graphDropdownHandler(e);
          }}
        >
          <option>YEAR</option>
          {graphAllYearData.map((item2, idx) => (
            <option key={idx}>{item2.year}</option>
          ))}
        </select>
      </td>
      <>{renderData()}</>
    </tr>
  );
};

export default Row7;
