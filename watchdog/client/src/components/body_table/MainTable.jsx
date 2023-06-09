import React, { Fragment } from 'react';
import BlankPage from './BlankPage';
import useMath from '../../utils/math/Round';
import useDate from '../../utils/date/DateFile';

const MainTable = ({
  loading,
  searchLength,
  mainData,
  onHandTotal,
  reOrderTotal,
  pendingTotal,
  selectedDatePicker,
  loadingDatePicker,
  calendarQtyTotal,
  calendarBOTotal,
  sold30Total,
  sold90Total,
  sold365Total,
  avg_sold365Total,
  avg_lead_timeTotal,
  suggestedQty,
  suggestedQtyTotal,
  oldOH_Forecast_Left,
  oldNeededCal,
  oh_forecastTotal,
  oldOH_Forecast_Right, 
  result2,
  eachItemClick,
  neededTotal,
  totalNewItem_365_Sold,
  totalNewItem_AVG_SOLD,
  totalNew_SuggestedOH,
  NewOH_ForecastLeft,
  new_oh_forecastTotal,
  NewOH_ForecastRight,
  NewNeededCal,
  NewneededTotal,
  newitemkey2Forecast,
  suggestedOHForNewItem,
  NewItem_Qty_avg,
  ForecastloadingDatePicker,
  selforecastDatePicker,
  isOpenM,
  inputValue,
}) => {
  const { round } = useMath();
  const { daysToDate, getDate } = useDate();

  const past365c = getDate(365);

  const change365_to_New =
    mainData
      .filter((item) => item.start_dte)
      .map((item) => new Date(item.start_dte).toISOString().split('T')[0])[0] >
    past365c ? (
      <>
        {newitemkey2Forecast.map((item, idx) =>
          item.newitemkeyForecast.length === 0 ? (
            <div key={idx}>0</div>
          ) : (
            item.newitemkeyForecast.map((item2, idx2) =>
              item2.total_qty_difference === null ? (
                <div key={idx2}>0</div>
              ) : (
                <div key={idx2}>{item2.total_qty_difference}</div>
              )
            )
          )
        )}
        <div>{totalNewItem_365_Sold}</div>
      </>
    ) : (
      <>
        {mainData.map((item, idx) =>
          item.sold365.length ? (
            item.sold365.map((item2, idx2) => (
              <div key={idx2}>{item2.qtyshp}</div>
            ))
          ) : (
            <div key={idx}>0</div>
          )
        )}
        <div>{sold365Total}</div>
      </>
    );

  const changeAVG_SOLDNew =
    mainData
      .filter((item) => item.start_dte)
      .map((item) => new Date(item.start_dte).toISOString().split('T')[0])[0] >
    past365c ? (
      <>
        {NewItem_Qty_avg.map((item, idx) => (
          <div key={idx}>{Number(item).toFixed(2)}</div>
        ))}

        <div>{totalNewItem_AVG_SOLD}</div>
      </>
    ) : (
      <>
        {mainData.map((item, idx) =>
          item.reorderPointO.length ? (
            item.reorderPointO.map((item2, idx2) => (
              <div key={idx2}>{item2.avg_qtyshp.toFixed(2)}</div>
            ))
          ) : (
            <div key={idx}>0</div>
          )
        )}
        <div>{avg_sold365Total.toFixed(2)}</div>
      </>
    );

  const changeSuggestedOH =
    mainData
      .filter((item) => item.start_dte)
      .map((item) => new Date(item.start_dte).toISOString().split('T')[0])[0] >
    past365c ? (
      <>
        {suggestedOHForNewItem.map((item, idx) => (
          <div key={idx}>{round(item)}</div>
        ))}
        <div>{totalNew_SuggestedOH}</div>
      </>
    ) : (
      <>
        {suggestedQty.map((value, index) => (
          <div key={`qty-${index}`}>{round(value)}</div>
        ))}
        <div>{suggestedQtyTotal}</div>
      </>
    );

  const changeOH_ForecastNew =
    mainData
      .filter((item) => item.start_dte)
      .map((item) => new Date(item.start_dte).toISOString().split('T')[0])[0] >
    past365c ? (
      <>
        {suggestedQty.every((value) => value === 0) ? (
          <>
            {NewOH_ForecastLeft.map((num, idx) => (
              <div key={idx}>0</div>
            ))}
            <div>0</div>
          </>
        ) : (
          <>
            {NewOH_ForecastLeft.map((num, idx2) => (
              <div key={idx2} className={num < 0 ? 'needed-amount' : ''}>
                {round(num)}
              </div>
            ))}
            <div>{new_oh_forecastTotal}</div>
          </>
        )}
      </>
    ) : (
      <>
        {suggestedQty.every((value) => value === 0) ? (
          <>
            {oldOH_Forecast_Left.map((num, idx) => (
              <div key={idx}>0</div>
            ))}
            <div>0</div>
          </>
        ) : (
          <>
            {selforecastDatePicker.length
              ? ForecastloadingDatePicker === false
                ? oldOH_Forecast_Left.map((num, idx2) => (
                    <div key={idx2} className={num < 0 ? 'needed-amount' : ''}>
                      {round(num)}
                    </div>
                  ))
                : mainData.map((item, idx) => <div key={idx}>Loading...</div>)
              : ForecastloadingDatePicker === false
              ? mainData.map((item, idx) => <div key={idx}>{item.purno}</div>)
              : mainData.map((item, idx) => <div key={idx}>Loading</div>)}

            <div>{oh_forecastTotal}</div>
          </>
        )}
      </>
    );

  const changeOH_Forecast_OorN =
    mainData
      .filter((item) => item.start_dte)
      .map((item) => new Date(item.start_dte).toISOString().split('T')[0])[0] >
    past365c ? (
      <>
        {suggestedQty.every((value) => value === 0) ? (
          <>
            {NewOH_ForecastRight.map((num, index) => (
              <div key={index}>0</div>
            ))}
            <div></div>
          </>
        ) : (
          <>
            {NewOH_ForecastRight.map((num, index2) => (
              <Fragment key={index2}>
                <span style={{ float: 'left', fontSize: '11px' }}>
                  {num < 0 ? 'overstock' : num === 0 ? '' : 'needed'}
                </span>
                <div
                  key={`qty-${index2}`}
                  className={
                    num < 0
                      ? 'overstock-amount'
                      : num === 0
                      ? ''
                      : 'needed-amount'
                  }
                >
                  {round(num)}
                </div>
              </Fragment>
            ))}
            <div></div>
          </>
        )}
      </>
    ) : (
      <>
        {suggestedQty.every((value) => value === 0) ? (
          <>
            {oldOH_Forecast_Right.map((num, index) => (
              <div key={index}>0</div>
            ))}
            <div></div>
          </>
        ) : (
          <>
            {selforecastDatePicker.length
              ? ForecastloadingDatePicker === false
                ? oldOH_Forecast_Right.map((num, index2) => (
                    <Fragment key={index2}>
                      <span style={{ float: 'left', fontSize: '11px' }}>
                        {num < 0 ? 'overstock' : num === 0 ? '' : 'needed'}
                      </span>
                      <div
                        key={`qty-${index2}`}
                        className={
                          num < 0
                            ? 'overstock-amount'
                            : num === 0
                            ? ''
                            : 'needed-amount'
                        }
                      >
                        {round(num)}
                      </div>
                    </Fragment>
                  ))
                : mainData.map((item, idx) => <div key={idx}>Loading...</div>)
              : ForecastloadingDatePicker === false}
            <div></div>
          </>
        )}
      </>
    );

  const changeNew_Needed =
    mainData
      .filter((item) => item.start_dte)
      .map((item) => new Date(item.start_dte).toISOString().split('T')[0])[0] >
    past365c ? (
      <>
        {suggestedQty.every((value) => value === 0) ? (
          <>
            {NewNeededCal.map((num, idx) => (
              <div key={idx}>0</div>
            ))}
            <div>0</div>
          </>
        ) : (
          <>
            {NewNeededCal.map((num, idx2) => (
              <div key={idx2} className={num < 0 ? 'needed-amount' : ''}>
                {num < 0 ? Math.abs(num) : undefined}
              </div>
            ))}

            <div className={oh_forecastTotal < 0 ? '' : 'needed-amount'}>
              {Math.abs(NewneededTotal)}
            </div>
          </>
        )}
      </>
    ) : (
      <>
        {suggestedQty.every((value) => value === 0) ? (
          <>
            {oldNeededCal.map((num, idx) => (
              <div key={idx}>0</div>
            ))}
            <div>0</div>
          </>
        ) : (
          <>
            {oldNeededCal.map((num, idx2) => (
              <div key={idx2} className={num < 0 ? 'needed-amount' : ''}>
                {num < 0 ? Math.abs(num) : undefined}
              </div>
            ))}

            <div className={oh_forecastTotal < 0 ? '' : 'needed-amount'}>
              {Math.abs(neededTotal)}
            </div>
          </>
        )}
      </>
    );

  const daystoDateM = daysToDate(Number(inputValue));

  if (loading) {
    return (
      <tbody>
        <tr>
          <td>Loading...</td>
        </tr>
      </tbody>
    );
  } else if (searchLength === 0) {
    return <BlankPage />;
  } else {
    return (
      <tbody id="tt" className="table3">
        <tr>
          <td style={{ padding: '0' }}>
            {mainData
              .filter((item) => item.itemkey2)
              .map((item, idx) => (
                <div
                  className="pointername"
                  key={idx}
                  style={{ textAlign: 'left', color: 'blue' }}
                  onClick={() => eachItemClick(item.itemkey2)}
                >
                  {item.itemkey2}
                </div>
              ))}
            <div style={{ textAlign: 'left' }}>TOTAL</div>
          </td>
          <td style={{ padding: '0' }}>
            {mainData
              .filter(
                (item) =>
                  typeof item.onhand === 'number' || item.onhand === null
              )
              .map((item, idx) => (
                <div key={idx}>{item.onhand}</div>
              ))}
            <div>{onHandTotal}</div>
          </td>
          {/*  reorder */}
          <td style={{ padding: '0' }}>
            {result2.map((item, idx) =>
              item === undefined ? (
                <div key={idx}>0</div>
              ) : (
                <div key={idx}>{item.WMA}</div>
              )
            )}
            <div>{reOrderTotal}</div>
          </td>
          <td style={{ padding: '0' }}>
            {mainData.map((item, idx) =>
              item.pendingDataO.length ? (
                item.pendingDataO.map((item2, idx2) => (
                  <div key={idx2}>{item2.pending}</div>
                ))
              ) : (
                <div key={idx}>0</div>
              )
            )}
            <div>{pendingTotal}</div>
          </td>
          <td style={{ padding: '0' }}>
            {selectedDatePicker.length
              ? loadingDatePicker === false
                ? selectedDatePicker.map((item, idx) =>
                    item.datepicker.length ? (
                      item.datepicker.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyshp}</div>
                      ))
                    ) : (
                      <div key={idx}>0</div>
                    )
                  )
                : mainData.map((item, idx) => <div key={idx}>Loading...</div>)
              : loadingDatePicker === false
              ? mainData.map((item, idx) => <div key={idx}>{item.purno}</div>)
              : mainData.map((item, idx) => <div key={idx}>Loading</div>)}
            <div>{calendarQtyTotal}</div>
          </td>
          <td style={{ padding: '0' }}>
            {selectedDatePicker.length
              ? loadingDatePicker === false
                ? selectedDatePicker.map((item, idx) =>
                    item.datepicker.length ? (
                      item.datepicker.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtybo}</div>
                      ))
                    ) : (
                      <div key={idx}>0</div>
                    )
                  )
                : mainData.map((item, idx) => <div key={idx}>Loading...</div>)
              : loadingDatePicker === false
              ? mainData.map((item, idx) => <div key={idx}>{item.purno}</div>)
              : mainData.map((item, idx) => <div key={idx}>Loading</div>)}
            <div>{calendarBOTotal}</div>
          </td>
          {/*column table with nested array */}
          <td style={{ padding: '0' }}>
            {mainData.map((item, idx) =>
              item.sold30.length ? (
                item.sold30.map((item2, idx2) => (
                  <div key={idx2}>{item2.qtyshp}</div>
                ))
              ) : (
                <div key={idx}>0</div>
              )
            )}
            <div>{sold30Total}</div>
          </td>
          <td style={{ padding: '0' }}>
            {mainData.map((item, idx) =>
              item.sold90.length ? (
                item.sold90.map((item2, idx2) => (
                  <div key={idx2}>{item2.qtyshp}</div>
                ))
              ) : (
                <div key={idx}>0</div>
              )
            )}
            <div>{sold90Total}</div>
          </td>
          <td style={{ padding: '0' }}>{change365_to_New}</td>
          {/* 23 */}
          <td style={{ padding: '0' }}>{changeAVG_SOLDNew}</td>
          {isOpenM ? (
            <td style={{ padding: '0' }}>
              {mainData.map((item, idx) =>
                item.poLeadTimeO.length ? (
                  item.poLeadTimeO.map((item2, idx2) => (
                    <div key={idx2}>{inputValue} days</div>
                  ))
                ) : (
                  <div key={idx}>0 day</div>
                )
              )}
              <div></div>
            </td>
          ) : (
            <td style={{ padding: '0' }}>
              {mainData.map((item, idx) =>
                item.poLeadTimeO.length ? (
                  item.poLeadTimeO.map((item2, idx2) => (
                    <div key={idx2}>{item2.avg_lead_time} days</div>
                  ))
                ) : (
                  <div key={idx}>0 day</div>
                )
              )}
              <div>{round(avg_lead_timeTotal)} days</div>
            </td>
          )}
          <td style={{ padding: '0' }}>{changeSuggestedOH}</td>
          <td style={{ padding: '0' }}>{changeOH_ForecastNew}</td>
          <td style={{ padding: '0' }}>{changeOH_Forecast_OorN}</td>
          {/*column table with nested array */}
          {isOpenM ? (
            <td style={{ padding: '0' }}>
              {mainData.map((item, idx) =>
                item.poLeadTimeO.length ? (
                  item.poLeadTimeO.map((item2, idx2) => (
                    <div key={idx2}>{daystoDateM}</div>
                  ))
                ) : (
                  <div key={idx}>{undefined}</div>
                )
              )}
              <div></div>
            </td>
          ) : (
            <td style={{ padding: '0' }}>
              {mainData.map((item, idx) =>
                item.poLeadTimeO.length ? (
                  item.poLeadTimeO.map((item2, idx2) => (
                    <div key={idx2}>{daysToDate(item2.avg_lead_time)}</div>
                  ))
                ) : (
                  <div key={idx}>{undefined}</div>
                )
              )}
              <div></div>
            </td>
          )}
          {/*column table with nested array */}
          <td style={{ padding: '0' }}>{changeNew_Needed}</td>
        </tr>
      </tbody>
    );
  }
};

export default MainTable;
