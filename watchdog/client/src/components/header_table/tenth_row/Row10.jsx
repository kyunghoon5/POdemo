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
                        {monthlyData.map((item) => item.qtyrec)[0] !== null &&
                        monthlyData.map((item) => item.qtyrec)[0] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyrec)[0] !== 0
                          ? monthlyData.map((item) => item.qtyrec)[0]
                          : undefined}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[1] !== null &&
                        monthlyData.map((item) => item.qtyrec)[1] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyrec)[1] !== 0
                          ? monthlyData.map((item) => item.qtyrec)[1]
                          : undefined}
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
                        {monthlyData.map((item) => item.qtyrec)[2] !== null &&
                        monthlyData.map((item) => item.qtyrec)[2] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyrec)[2] !== 0
                          ? monthlyData.map((item) => item.qtyrec)[2]
                          : undefined}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[3] !== null &&
                        monthlyData.map((item) => item.qtyrec)[3] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyrec)[3] !== 0
                          ? monthlyData.map((item) => item.qtyrec)[3]
                          : undefined}
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
                        {monthlyData.map((item) => item.qtyrec)[4] !== null &&
                        monthlyData.map((item) => item.qtyrec)[4] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyrec)[4] !== 0
                          ? monthlyData.map((item) => item.qtyrec)[4]
                          : undefined}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[5] !== null &&
                        monthlyData.map((item) => item.qtyrec)[5] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyrec)[5] !== 0
                          ? monthlyData.map((item) => item.qtyrec)[5]
                          : undefined}
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
                        {monthlyData.map((item) => item.qtyrec)[6] !== null &&
                        monthlyData.map((item) => item.qtyrec)[6] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyrec)[6] !== 0
                          ? monthlyData.map((item) => item.qtyrec)[6]
                          : undefined}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[7] !== null &&
                        monthlyData.map((item) => item.qtyrec)[7] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyrec)[7] !== 0
                          ? monthlyData.map((item) => item.qtyrec)[7]
                          : undefined}
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
                        {monthlyData.map((item) => item.qtyrec)[8] !== null &&
                        monthlyData.map((item) => item.qtyrec)[8] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyrec)[8] !== 0
                          ? monthlyData.map((item) => item.qtyrec)[8]
                          : undefined}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[9] !== null &&
                        monthlyData.map((item) => item.qtyrec)[9] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyrec)[9] !== 0
                          ? monthlyData.map((item) => item.qtyrec)[9]
                          : undefined}
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
                        {monthlyData.map((item) => item.qtyrec)[10] !== null &&
                        monthlyData.map((item) => item.qtyrec)[10] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyrec)[10] !== 0
                          ? monthlyData.map((item) => item.qtyrec)[10]
                          : undefined}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyrec)[11] !== null &&
                        monthlyData.map((item) => item.qtyrec)[11] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyrec)[11] !== 0
                          ? monthlyData.map((item) => item.qtyrec)[11]
                          : undefined}
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