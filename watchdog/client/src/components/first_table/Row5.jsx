import React from 'react';

const Row5 = ({ InfoItemOb, watchDoginfo }) => {
  return (
    <tr className="row5">
      <InfoItemOb className="infoCol1" name="WEIGHT:" />
      <td colSpan="3">
        <span
          className="weight"
          style={{
            float: 'left',
            textAlign: 'center',
            paddingLeft: '3px',
          }}
        >
          {watchDoginfo.map((item) => item.Weight)}
        </span>
        <span
          className="weight_po"
          style={{
            float: 'right',
            textAlign: 'center',
            paddingRight: '3px',
          }}
        ></span>
      </td>
    </tr>
  );
};

export default Row5;
