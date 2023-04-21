import React from 'react';

const Row2 = ({ InfoItemOb, watchDoginfo }) => {
  return (
    <tr className="row2">
      <InfoItemOb className="infoCol1" name="ITEM NO:" />
      <td colSpan="3" className="smpNo">
        {watchDoginfo.map((item) => item.Sample)}
      </td>
    </tr>
  );
};

export default Row2;
