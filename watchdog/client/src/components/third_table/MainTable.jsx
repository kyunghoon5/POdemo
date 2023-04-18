import React from 'react';
import BlankPage from './BlankPage';

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
  max_leadtimeTotal,
  BO_lastRCVTotal,
  suggestedQty,
  suggestedQtyTotal,
  amounts,
  oh_forecastTotal,
  FosuggestedQty,
  foSuggestedTotal,
  result2,
  eachItemClick
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
          <td style={{ padding: '0' }}>
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
          </td>
          <td style={{ padding: '0' }}>
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
          </td>

          <td style={{ padding: '0' }}>
            {mainData.map((item, idx) =>
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

          <td style={{ padding: '0' }}>
            {mainData.map((item, idx) =>
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
            {mainData.map((item, idx) =>
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
