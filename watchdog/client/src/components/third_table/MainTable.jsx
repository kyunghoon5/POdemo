import React from 'react';
import BlankPage from './BlankPage';

const MainTable = ({
  loading,
  searchLength,
  search,
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
  max_leadtimeTotal,
  BO_lastRCVTotal,
  suggestedQty,
  suggestedQtyTotal,
  amounts,
  oh_forecastTotal,
  FosuggestedQty,
  foSuggestedTotal,
  result2,
}) => {
  const round = (num) => (isNaN(num) ? 0 : Math.round(num));
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
            {search
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
            {search
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
          {/* {selectedItem.length > 0 ? (
                  <td style={{ padding: '0' }}>
                    {mergeByKey.map((item, idx) => (
                      <div key={idx}>{item.qtyord}</div>
                    ))}
                    <div>{totalItems3}</div>
                  </td>
                ) : (
                  <td style={{ padding: '0' }}>
                    {search.map((item, idx) =>
                      item.first.length ? (
                        item.first.map((item2, idx2) => (
                          <div key={idx2}>{item2.qtyord}</div>
                        ))
                      ) : (
                        <div key={idx}></div>
                      )
                    )}

                    <div>{totalItems12}</div>
                  </td>
                )} */}
          <td style={{ padding: '0' }}>
            {search.map((item, idx) =>
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
          {/*sold amount regarding RCVD date //loading && render table cell */}
          {/* <td style={{ padding: '0' }}>
                  {test2.length
                    ? loadingDatapick === false
                      ? test2.map((item) => item.recdate)[0] == null
                        ? search.map((item, idx) => (
                            <div key={idx}>{item.purno}</div>
                          ))
                        : selectedData.map((item, idx) =>
                            item.new.length ? (
                              item.new.map((item, idx2) => (
                                <div key={idx2}>{item.qtyshp}</div>
                              ))
                            ) : (
                              <div key={idx}></div>
                            )
                          )
                      : search.map((item, idx) => (
                          <div key={idx}>Loading...</div>
                        ))
                    : loadingDatapick === false
                    ? search.map((item, idx) => (
                        <div key={idx}>{item.purno}</div>
                      ))
                    : search.map((item, idx) => <div key={idx}>Loading</div>)}
                  <div>{totalItemsFromRCVD}</div>
                </td> */}
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
                : search.map((item, idx) => <div key={idx}>Loading...</div>)
              : loadingDatePicker === false
              ? search.map((item, idx) => <div key={idx}>{item.purno}</div>)
              : search.map((item, idx) => <div key={idx}>Loading</div>)}
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
                : search.map((item, idx) => <div key={idx}>Loading...</div>)
              : loadingDatePicker === false
              ? search.map((item, idx) => <div key={idx}>{item.purno}</div>)
              : search.map((item, idx) => <div key={idx}>Loading</div>)}
            <div>{calendarBOTotal}</div>
          </td>
          {/*column table with nested array */}
          <td style={{ padding: '0' }}>
            {search.map((item, idx) =>
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
            {search.map((item, idx) =>
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
          <td style={{ padding: '0' }}>
            {search.map((item, idx) =>
              item.sold365.length ? (
                item.sold365.map((item2, idx2) => (
                  <div key={idx2}>{item2.qtyshp}</div>
                ))
              ) : (
                <div key={idx}>0</div>
              )
            )}
            <div>{sold365Total}</div>
          </td>
          <td style={{ padding: '0' }}>
            {search.map((item, idx) =>
              item.reorderPointO.length ? (
                item.reorderPointO.map((item2, idx2) => (
                  <div key={idx2}>{item2.avg_qtyshp.toFixed(2)}</div>
                ))
              ) : (
                <div key={idx}>0</div>
              )
            )}
            <div>{avg_sold365Total.toFixed(2)}</div>
          </td>
          {/*column table with nested array */}
          {/* <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.sixth.length ? (
                      item.sixth.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems7}</div>
                </td> */}
          <td style={{ padding: '0' }}>
            {search.map((item, idx) =>
              item.poLeadTimeO.length ? (
                item.poLeadTimeO.map((item2, idx2) => (
                  <div key={idx2}>{item2.avg_lead_time} days</div>
                ))
              ) : (
                <div key={idx}>0 days</div>
              )
            )}
            <div>{round(avg_lead_timeTotal)} days</div>
          </td>
          {/*column table with nested array */}
          {/* <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.fifth.length ? (
                      item.fifth.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems8}</div>
                </td> */}
          <td style={{ padding: '0' }}>
            {search.map((item, idx) =>
              item.poLeadTimeO.length ? (
                item.poLeadTimeO.map((item2, idx2) => (
                  <div key={idx2}>{item2.max_lead_time} days</div>
                ))
              ) : (
                <div key={idx}>0 days</div>
              )
            )}
            <div>{round(max_leadtimeTotal)} days</div>
          </td>
          {/*column table with nested array */}
          <td style={{ padding: '0' }}>
            {/* {search.map((item, idx) =>
                      item.fourth.length ? (
                        item.fourth.map((item2, idx2) => (
                          <div key={idx2}>{item2.qtyord}</div>
                        ))
                      ) : (
                        <div key={idx}></div>
                      )
                    )}
                    <div>{totalItems9}</div> */}
            {search.map((item, idx) =>
              item.bofromLastRcvO.length ? (
                item.bofromLastRcvO.map((item2, idx2) => (
                  <div key={idx2}>{item2.qtybo}</div>
                ))
              ) : (
                <div key={idx}>0</div>
              )
            )}
            <div>{BO_lastRCVTotal}</div>
          </td>
          {/*column table with nested array */}
          <td style={{ padding: '0' }}>
            {/* {search.map((item, idx) =>
                      item.third.length ? (
                        item.third.map((item2, idx2) => (
                          <div key={idx2}>{item2.qtyord}</div>
                        ))
                      ) : (
                        <div key={idx}></div>
                      )
                    )}
                    <div>{totalItems10}</div> */}
            {suggestedQty.map((value, index) => (
              <div key={`qty-${index}`}>{round(value)}</div>
            ))}
            <div>{suggestedQtyTotal}</div>
          </td>
          {/*column table with nested array */}
          <td style={{ padding: '0' }}>
            {/* forecast render */}
            {amounts.map((num, idx) => (
              <div key={idx} className={num < 0 ? 'negative-amount' : ''}>
                {round(num)}
              </div>
            ))}
            <div>{oh_forecastTotal}</div>
          </td>
          {/*column table with nested array */}
          <td style={{ padding: '0' }}>
            {/* {search.map((item, idx) =>
                      item.first.length ? (
                        item.first.map((item2, idx2) => (
                          <div key={idx2} style={{ borderRightWidth: '1px' }}>
                            {item2.qtyord}
                          </div>
                        ))
                      ) : (
                        <div
                          key={idx}
                          style={{ borderRightWidth: '1px' }}
                        ></div>
                      )
                    )}
                    <div style={{ borderRightWidth: '1px' }}>
                      {totalItems12}
                    </div> */}
            {FosuggestedQty.map((num, index) => (
              <div
                key={`qty-${index}`}
                className={num < 0 ? 'negative-amount' : ''}
              >
                {round(num)}
              </div>
            ))}
            <div>{round(foSuggestedTotal)}</div>
          </td>
        </tr>
      </tbody>
    );
  }
};

export default MainTable;
