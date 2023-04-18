import React, { Fragment } from 'react';

const Row9 = ({
  InfoItemOb,
  watchDoginfo,
  mainData,
  graphDropdownSelectedYear,
  graphLoading,
  YoYEachMonth,
  YoYEachMonth2,
  YoYEachMonth3,
  YoYEachMonth4,
  YoYEachMonth5,
  YoYEachMonth6,
  YoYEachMonth7,
  YoYEachMonth8,
  YoYEachMonth9,
  YoYEachMonth10,
  YoYEachMonth11,
  YoYEachMonth12,
  YoY6,
  YoY5,
  YoY4,
  YoY3,
  YoY2,
  YoY,
}) => {
  return (
    <tr className="row9">
      <InfoItemOb className="infoCol1" name="PO's 2" />
      <td colSpan="3">
        {watchDoginfo.map((item, idx) => (
          <Fragment key={idx}>
            <span className="pctn" style={{ float: 'left' }}>
              P: {item.Pcs_ctn}
            </span>
            <span className="pctn" style={{ float: 'right' }}>
              (L:{item.Front_lc_leng_l} X W:{item.Front_lc_leng_w} X H:0)
            </span>
          </Fragment>
        ))}
      </td>
      <td>SAMPLE:</td>
      <td>{watchDoginfo.map((item) => item.SampleShp)}</td>
      <td style={{ background: '#f0e68c' }}>YoY</td>
      <td>
        {mainData.length ? (
          graphDropdownSelectedYear.length ? (
            graphLoading === false ? (
              graphDropdownSelectedYear.length ? (
                <>
                  {graphDropdownSelectedYear === 'YEAR' ? (
                    <span style={{ color: YoY6 >= 0 ? 'green' : 'red' }}>
                      {YoY6.toFixed(2)}%
                    </span>
                  ) : (
                    <>
                      <span
                        style={{
                          float: 'left',
                          paddingLeft: '4px',
                          color: YoYEachMonth >= 0 ? 'green' : 'red',
                          fontSize: '10px',
                        }}
                      >
                        {YoYEachMonth.toFixed(1)}%
                      </span>
                      <span
                        style={{
                          float: 'right',
                          paddingRight: '4px',
                          color: YoYEachMonth2 >= 0 ? 'green' : 'red',
                          fontSize: '10px',
                        }}
                      >
                        {YoYEachMonth2.toFixed(1)}%
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
            <span style={{ color: YoY6 >= 0 ? 'green' : 'red' }}>
              {YoY6.toFixed(1)}%
            </span>
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
                    <span style={{ color: YoY5 >= 0 ? 'green' : 'red' }}>
                      {YoY5.toFixed(2)}%
                    </span>
                  ) : (
                    <>
                      <span
                        style={{
                          float: 'left',
                          paddingLeft: '4px',
                          color: YoYEachMonth3 >= 0 ? 'green' : 'red',
                          fontSize: '10px',
                        }}
                      >
                        {YoYEachMonth3.toFixed(1)}%
                      </span>
                      <span
                        style={{
                          float: 'right',
                          paddingRight: '4px',
                          color: YoYEachMonth4 >= 0 ? 'green' : 'red',
                          fontSize: '10px',
                        }}
                      >
                        {YoYEachMonth4.toFixed(1)}%
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
            <span style={{ color: YoY5 >= 0 ? 'green' : 'red' }}>
              {YoY5.toFixed(2)}%
            </span>
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
                    <span style={{ color: YoY4 >= 0 ? 'green' : 'red' }}>
                      {YoY4.toFixed(2)}%
                    </span>
                  ) : (
                    <>
                      <span
                        style={{
                          float: 'left',
                          paddingLeft: '4px',
                          color: YoYEachMonth5 >= 0 ? 'green' : 'red',
                          fontSize: '10px',
                        }}
                      >
                        {YoYEachMonth5.toFixed(1)}%
                      </span>
                      <span
                        style={{
                          float: 'right',
                          paddingRight: '4px',
                          color: YoYEachMonth6 >= 0 ? 'green' : 'red',
                          fontSize: '10px',
                        }}
                      >
                        {YoYEachMonth6.toFixed(1)}%
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
            <span style={{ color: YoY4 >= 0 ? 'green' : 'red' }}>
              {YoY4.toFixed(2)}%
            </span>
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
                    <span style={{ color: YoY3 >= 0 ? 'green' : 'red' }}>
                      {YoY3.toFixed(2)}%
                    </span>
                  ) : (
                    <>
                      <span
                        style={{
                          float: 'left',
                          paddingLeft: '4px',
                          color: YoYEachMonth7 >= 0 ? 'green' : 'red',
                          fontSize: '10px',
                        }}
                      >
                        {YoYEachMonth7.toFixed(1)}%
                      </span>
                      <span
                        style={{
                          float: 'right',
                          paddingRight: '4px',
                          color: YoYEachMonth8 >= 0 ? 'green' : 'red',
                          fontSize: '10px',
                        }}
                      >
                        {YoYEachMonth8.toFixed(1)}%
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
            <span style={{ color: YoY3 >= 0 ? 'green' : 'red' }}>
              {YoY3.toFixed(2)}%
            </span>
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
                    <span style={{ color: YoY2 >= 0 ? 'green' : 'red' }}>
                      {YoY2.toFixed(2)}%
                    </span>
                  ) : (
                    <>
                      <span
                        style={{
                          float: 'left',
                          paddingLeft: '4px',
                          color: YoYEachMonth9 >= 0 ? 'green' : 'red',
                          fontSize: '10px',
                        }}
                      >
                        {YoYEachMonth9.toFixed(1)}%
                      </span>
                      <span
                        style={{
                          float: 'right',
                          paddingRight: '4px',
                          color: YoYEachMonth10 >= 0 ? 'green' : 'red',
                          fontSize: '10px',
                        }}
                      >
                        {YoYEachMonth10.toFixed(1)}%
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
            <span style={{ color: YoY2 >= 0 ? 'green' : 'red' }}>
              {YoY2.toFixed(2)}%
            </span>
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
                    <span style={{ color: YoY >= 0 ? 'green' : 'red' }}>
                      {YoY.toFixed(2)}%
                    </span>
                  ) : (
                    <>
                      <span
                        style={{
                          float: 'left',
                          paddingLeft: '4px',
                          color: YoYEachMonth11 >= 0 ? 'green' : 'red',
                          fontSize: '10px',
                        }}
                      >
                        {YoYEachMonth11.toFixed(1)}%
                      </span>
                      <span
                        style={{
                          float: 'right',
                          paddingRight: '4px',
                          color: YoYEachMonth12 >= 0 ? 'green' : 'red',
                          fontSize: '10px',
                        }}
                      >
                        {YoYEachMonth12.toFixed(1)}%
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
            <span style={{ color: YoY >= 0 ? 'green' : 'red' }}>
              {YoY.toFixed(2)}%
            </span>
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

export default Row9;
