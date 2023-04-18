import React from 'react';

const Row3 = ({ InfoItemOb, watchDoginfo }) => {
  return (
    <tr className="row3">
      <InfoItemOb className="infoCol1" name="ORIGINAL:" />
      <td colSpan="3">
        <span
          className="original"
          style={{ float: 'left', paddingLeft: '3px' }}
        >
          {watchDoginfo.map((item) => item.Original)}
        </span>
        <span
          className="originalPo"
          style={{ float: 'right', paddingRight: '3px' }}
        ></span>
      </td>
    </tr>
  );
};

export default Row3;
