import React from 'react';

const Row8 = ({
  InfoItemOb,
  selectedSold,
  soldPercentageHandler,
  selectedSoldPercentage,
  mainData,
  loadingsoldP,
  graphDropdownSelectedYear,
  graphLoading,
  graphAllYearData,
  monthlyData,
}) => {
  const lastyearSoldQty = graphAllYearData.map((item) => item.qtyshp).at(-1);
  const lastyearSoldQty2 = graphAllYearData.map((item) => item.qtyshp).at(-2);
  const lastyearSoldQty3 = graphAllYearData.map((item) => item.qtyshp).at(-3);
  const lastyearSoldQty4 = graphAllYearData.map((item) => item.qtyshp).at(-4);
  const lastyearSoldQty5 = graphAllYearData.map((item) => item.qtyshp).at(-5);
  const lastyearSoldQty6 = graphAllYearData.map((item) => item.qtyshp).at(-6);
 

  return (
    <tr className="row8">
      <InfoItemOb className="infoCol1" name="DGN DTE:" />
      <td colSpan="3" className="dgnDte"></td>
      <td style={{ textAlign: 'center' }}>
        SOLD
        {/* <select
          className="border border-zinc-500"
          value={selectedSold}
          onChange={soldPercentageHandler}
        >
          {[
            { value: 'All', key: 'soldtotal_percentage' },
            { value: '7', key: 'sold7_percentage' },
            { value: '30', key: 'sold30_percentage' },
            { value: '60', key: 'sold60_percentage' },
            { value: '90', key: 'sold90_percentage' },
            { value: '6M', key: 'sold6M_percentage' },
            { value: '1Y', key: 'sold365_percentage' },
          ].map(({ value, key }) => (
            <option
              key={key}
              value={selectedSoldPercentage
                .map((item) => item.soldPercentage[0][key] || 0)
                .toString()}
            >
              {value}
            </option>
          ))}
        </select> */}
      </td>

      <>
        {mainData.length ? (
          selectedSold.length ? (
            loadingsoldP === false ? (
              selectedSold.length ? (
                <td>{Math.floor(selectedSold)} %</td>
              ) : (
                <td></td>
              )
            ) : (
              <td>Loading...</td>
            )
          ) : loadingsoldP === false ? (
            <td>
              {Math.floor(
                selectedSoldPercentage.map((item) =>
                  item.soldPercentage.map((item) => item.soldtotal_percentage)
                )[0]
              )}
              %
            </td>
          ) : (
            <td>Loading...</td>
          )
        ) : (
          <td></td>
        )}
      </>
      <td style={{ background: '#f0e68c' }}>SOLD_QTY</td>
      <td>
        {mainData.length ? (
          graphDropdownSelectedYear.length ? (
            graphLoading === false ? (
              graphDropdownSelectedYear.length ? (
                <>
                  {graphDropdownSelectedYear === 'YEAR' ? (
                    lastyearSoldQty6
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[0] !== null &&
                        monthlyData.map((item) => item.qtyshp)[0] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyshp)[0] !== 0
                          ? monthlyData.map((item) => item.qtyshp)[0]
                          : undefined}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[1] !== null &&
                        monthlyData.map((item) => item.qtyshp)[1] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyshp)[1] !== 0
                          ? monthlyData.map((item) => item.qtyshp)[1]
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
            <>{lastyearSoldQty6}</>
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
                    lastyearSoldQty5
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[2] !== null &&
                        monthlyData.map((item) => item.qtyshp)[2] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyshp)[2] !== 0
                          ? monthlyData.map((item) => item.qtyshp)[2]
                          : undefined}
                      </span>

                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[3] !== null &&
                        monthlyData.map((item) => item.qtyshp)[3] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyshp)[3] !== 0
                          ? monthlyData.map((item) => item.qtyshp)[3]
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
            <>{lastyearSoldQty5}</>
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
                    lastyearSoldQty4
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[4] !== null &&
                        monthlyData.map((item) => item.qtyshp)[4] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyshp)[4] !== 0
                          ? monthlyData.map((item) => item.qtyshp)[4]
                          : undefined}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[5] !== null &&
                        monthlyData.map((item) => item.qtyshp)[5] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyshp)[5] !== 0
                          ? monthlyData.map((item) => item.qtyshp)[5]
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
            <>{lastyearSoldQty4}</>
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
                    lastyearSoldQty3
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[6] !== null &&
                        monthlyData.map((item) => item.qtyshp)[6] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyshp)[6] !== 0
                          ? monthlyData.map((item) => item.qtyshp)[6]
                          : undefined}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[7] !== null &&
                        monthlyData.map((item) => item.qtyshp)[7] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyshp)[7] !== 0
                          ? monthlyData.map((item) => item.qtyshp)[7]
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
            <>{lastyearSoldQty3}</>
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
                    lastyearSoldQty2
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[8] !== null &&
                        monthlyData.map((item) => item.qtyshp)[8] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyshp)[8] !== 0
                          ? monthlyData.map((item) => item.qtyshp)[8]
                          : undefined}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[9] !== null &&
                        monthlyData.map((item) => item.qtyshp)[9] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyshp)[9] !== 0
                          ? monthlyData.map((item) => item.qtyshp)[9]
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
            <>{lastyearSoldQty2}</>
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
                    lastyearSoldQty
                  ) : (
                    <>
                      <span style={{ float: 'left', paddingLeft: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[10] !== null &&
                        monthlyData.map((item) => item.qtyshp)[10] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyshp)[10] !== 0
                          ? monthlyData.map((item) => item.qtyshp)[10]
                          : undefined}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[11] !== null &&
                        monthlyData.map((item) => item.qtyshp)[11] !==
                          undefined &&
                        monthlyData.map((item) => item.qtyshp)[11] !== 0
                          ? monthlyData.map((item) => item.qtyshp)[11]
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
            <>{lastyearSoldQty}</>
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

export default Row8;
