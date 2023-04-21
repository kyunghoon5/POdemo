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
        <select
          className="border border-zinc-500"
          value={selectedSold}
          onChange={(e) => {
            soldPercentageHandler(e);
          }}
        >
          <option
            value={
              selectedSoldPercentage.map((item) =>
                item.soldPercentage.map((item) =>
                  item.soldtotal_percentage ? item.soldtotal_percentagee : 0
                )
              )[0]
            }
          >
            All
          </option>
          <option
            value={
              selectedSoldPercentage.map((item) =>
                item.soldPercentage.map((item) =>
                  item.sold7_percentage ? item.sold7_percentage : 0
                )
              )[0]
            }
          >
            7
          </option>
          <option
            value={
              selectedSoldPercentage.map((item) =>
                item.soldPercentage.map((item) => item.sold30_percentage)
              )[0]
            }
          >
            30
          </option>
          <option
            value={
              selectedSoldPercentage.map((item) =>
                item.soldPercentage.map((item) =>
                  item.sold60_percentage ? item.sold60_percentage : 0
                )
              )[0]
            }
          >
            60
          </option>
          <option
            value={
              selectedSoldPercentage.map((item) =>
                item.soldPercentage.map((item) =>
                  item.sold90_percentage ? item.sold90_percentage : 0
                )
              )[0]
            }
          >
            90
          </option>
          <option
            value={
              selectedSoldPercentage.map((item) =>
                item.soldPercentage.map((item) =>
                  item.sold6M_percentage ? item.sold6M_percentage : 0
                )
              )[0]
            }
          >
            6M
          </option>
          <option
            value={
              selectedSoldPercentage.map((item) =>
                item.soldPercentage.map((item) =>
                  item.sold365_percentage ? item.sold365_percentage : 0
                )
              )[0]
            }
          >
            1Y
          </option>
        </select>
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
                        {monthlyData.map((item) => item.qtyshp)[0]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[1]}
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
                        {monthlyData.map((item) => item.qtyshp)[2]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[3]}
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
                        {monthlyData.map((item) => item.qtyshp)[4]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[5]}
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
                        {monthlyData.map((item) => item.qtyshp)[6]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[7]}
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
                        {monthlyData.map((item) => item.qtyshp)[8]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[9]}
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
                        {monthlyData.map((item) => item.qtyshp)[10]}
                      </span>
                      <span style={{ float: 'right', paddingRight: '4px' }}>
                        {monthlyData.map((item) => item.qtyshp)[11]}
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
