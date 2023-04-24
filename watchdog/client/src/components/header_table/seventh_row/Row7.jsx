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

  const numYears = graphAllYearData.length;
  const eachYears = [];
  for (let i = 1; i <= 6; i++) {
    const index = numYears - i;
    if (index >= 0) {
      eachYears.push(graphAllYearData[index].year);
    } else {
      eachYears.push(undefined);
    }
  }

  const renderData = () => {
    if (!mainData.length) {
      return (
        <>
          <td></td>
          <td></td>
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
          <td></td>
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




  const months = monthlyData.map((month) => month.name);
  const monthlyLabels = months.map((name, index) => (
    <td key={index}>
      <span style={{ float: index % 2 === 0 ? 'left' : 'right', paddingLeft: '4px' }}>{name}</span>
    </td>
  ));
    console.log(monthlyLabels);

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
      {mainData.length ? (
        graphDropdownSelectedYear.length ? (
          graphLoading === false ? (
            graphDropdownSelectedYear.length ? (
              <td>
                {graphDropdownSelectedYear === 'YEAR'
                  ? graphYearlyTotal
                  : graphMonthlyTotal}
              </td>
            ) : (
              <td></td>
            )
          ) : (
            <td>Loading...</td>
          )
        ) : graphLoading === false ? (
          <td>{graphYearlyTotal}</td>
        ) : (
          <td>Loading...</td>
        )
      ) : (
        <td></td>
      )}
      <td style={{ background: '#f0e68c' }}>
        {mainData.length ? (
          graphDropdownSelectedYear.length ? (
            graphLoading === false ? (
              graphDropdownSelectedYear.length ? (
                <>{graphDropdownSelectedYear === 'YEAR' ? 'YEAR' : 'MONTH'}</>
              ) : (
                <></>
              )
            ) : (
              <>Loading...</>
            )
          ) : graphLoading === false ? (
            <>YEAR</>
          ) : (
            <>Loading...</>
          )
        ) : (
          <>YEAR</>
        )}
      </td>
      <td>
        {mainData.length ? (
          graphDropdownSelectedYear.length ? (
            graphLoading === false ? (
              graphDropdownSelectedYear.length ? (
                <>
                  {graphDropdownSelectedYear === 'YEAR' ? (
                    eachYears[5]
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.name)[0]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.name)[1]}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          ) : graphLoading === false ? (
            <>{eachYears[5]}</>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </td>
      <td>
        {mainData.length ? (
          graphDropdownSelectedYear.length ? (
            graphLoading === false ? (
              graphDropdownSelectedYear.length ? (
                <>
                  {graphDropdownSelectedYear === 'YEAR' ? (
                    eachYears[4]
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.name)[2]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.name)[3]}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          ) : graphLoading === false ? (
            <>{eachYears[4]}</>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </td>
      <td>
        {mainData.length ? (
          graphDropdownSelectedYear.length ? (
            graphLoading === false ? (
              graphDropdownSelectedYear.length ? (
                <>
                  {graphDropdownSelectedYear === 'YEAR' ? (
                    eachYears[3]
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.name)[4]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.name)[5]}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          ) : graphLoading === false ? (
            <>{eachYears[3]}</>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </td>
      <td>
        {mainData.length ? (
          graphDropdownSelectedYear.length ? (
            graphLoading === false ? (
              graphDropdownSelectedYear.length ? (
                <>
                  {graphDropdownSelectedYear === 'YEAR' ? (
                    eachYears[2]
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.name)[6]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.name)[7]}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          ) : graphLoading === false ? (
            <>{eachYears[2]}</>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </td>
      <td colSpan="0.5">
        {mainData.length ? (
          graphDropdownSelectedYear.length ? (
            graphLoading === false ? (
              graphDropdownSelectedYear.length ? (
                <>
                  {graphDropdownSelectedYear === 'YEAR' ? (
                    eachYears[1]
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.name)[8]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.name)[9]}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          ) : graphLoading === false ? (
            <>{eachYears[1]}</>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </td>
      <td>
        {mainData.length ? (
          graphDropdownSelectedYear.length ? (
            graphLoading === false ? (
              graphDropdownSelectedYear.length ? (
                <>
                  {graphDropdownSelectedYear === 'YEAR' ? (
                    eachYears[0]
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.name)[10]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.name)[11]}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          ) : graphLoading === false ? (
            <>{eachYears[0]}</>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </td>
      <>{renderData()}</>
    </tr>
  );
};

export default Row7;
