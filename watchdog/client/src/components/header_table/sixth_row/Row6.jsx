import React from 'react';

const Row6 = ({ InfoItemOb, watchDoginfo }) => {

  return (
    <tr className="row6">
      <InfoItemOb className="infoCol1" name="LENGTH:" />
      {watchDoginfo.map((item, idx) => (
        <td key={idx} colSpan="3">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span className="length">{item.Length}</span>
            <span>
              <span style={{ marginBottom: '0px' }}></span>
              <span className="fl">
                F : {item.Front_lc_leng_w} X {item.Front_lc_leng_l}
              </span>
            </span>
            <span style={{ paddingRight: '3px' }}>
              <span style={{ marginBottom: '0px' }}></span>
              <span className="pl">
                P : {item.Part_lc_leng_w} X {item.Part_lc_leng_l}
              </span>
            </span>
          </div>
        </td>
      ))}
    </tr>
  );
};

export default Row6;
