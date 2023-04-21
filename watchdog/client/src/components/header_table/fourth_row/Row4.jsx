import React from 'react';

const Row4 = ({ InfoItemOb, mainData }) => {
  return (
    <tr className="row4">
      <InfoItemOb className="infoCol1" name="TYPE:" />
      <td colSpan="3" className="smpDte">
        {mainData.map((item) => item.length_cat)[0]}
      </td>
    </tr>
  );
};

export default Row4;
