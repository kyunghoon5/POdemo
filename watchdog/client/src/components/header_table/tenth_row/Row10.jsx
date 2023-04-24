import React from 'react'

const Row10 = ({
  InfoItemOb,
  mainData,
  watchDoginfo,
  graphDropdownSelectedYear,
  graphLoading,
  monthlyData,
  lastyearRCVQty6,
  lastyearRCVQty5,
  lastyearRCVQty4,
  lastyearRCVQty3,
  lastyearRCVQty2,
  lastyearRCVQty,
}) => {
  return (
    <tr className="row10">
      <InfoItemOb className="infoCol1" name="ST_DATE" />
      <td className="stDate" colSpan="3">
        {
          mainData
            .filter((item) => item.start_dte)

            .map(
              (item) => new Date(item.start_dte).toISOString().split('T')[0]
            )[0]
        }
      </td>
      <></>

      <td>REORD:</td>
      <td>{watchDoginfo.map((item) => item.ReordShp)}</td>
      <td style={{ background: '#f0e68c' }}>RCV_QTY</td>

      <td>
        {mainData.length ? (
          graphDropdownSelectedYear.length ? (
            graphLoading === false ? (
              graphDropdownSelectedYear.length ? (
                <>
                  {graphDropdownSelectedYear === 'YEAR' ? (
                    lastyearRCVQty6
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[0]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[1]}
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
            <>{lastyearRCVQty6}</>
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
                    lastyearRCVQty5
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[2]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[3]}
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
            <>{lastyearRCVQty5}</>
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
                    lastyearRCVQty4
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[4]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[5]}
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
            <>{lastyearRCVQty4}</>
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
                    lastyearRCVQty3
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[6]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[7]}
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
            <>{lastyearRCVQty3}</>
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
                    lastyearRCVQty2
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[8]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[9]}
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
            <>{lastyearRCVQty2}</>
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
                    lastyearRCVQty
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[10]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[11]}
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
            <>{lastyearRCVQty}</>
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

export default Row10