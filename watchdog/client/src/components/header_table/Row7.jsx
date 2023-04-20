import React from 'react'
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
    setGraphDropdownSelectedYear(graphDropdownValue); // update the value of graphDropdownSelectedYear
  };

   const graphYearlyTotal = sum(graphAllYearData.map((item) => item.qtyshp));
   const graphMonthlyTotal = sum(monthLine.map((item) => item.qtyshp));

    const lastyear = graphAllYearData.map((item) => item.year).at(-1);
    const lastyear2 = graphAllYearData.map((item) => item.year).at(-2);
    const lastyear3 = graphAllYearData.map((item) => item.year).at(-3);
    const lastyear4 = graphAllYearData.map((item) => item.year).at(-4);
    const lastyear5 = graphAllYearData.map((item) => item.year).at(-5);
    const lastyear6 = graphAllYearData.map((item) => item.year).at(-6);
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
                    lastyear6
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
            <>{lastyear6}</>
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
                    lastyear5
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
            <>{lastyear5}</>
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
                    lastyear4
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
            <>{lastyear4}</>
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
                    lastyear3
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
            <>{lastyear3}</>
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
                    lastyear2
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
            <>{lastyear2}</>
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
                    lastyear
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
            <>{lastyear}</>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </td>
    </tr>
  );
};

export default Row7