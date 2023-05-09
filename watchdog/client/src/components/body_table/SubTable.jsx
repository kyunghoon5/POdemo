import React, { useState } from 'react';
import useDate from '../../utils/date/DateFile';


const SubTable = ({
  colorTotal,
  Difference_In_Days2,
  daysDifference,
  mainData,
  setIsOpenM,
  isOpenM,
  inputRef,
}) => {
  const { getDate } = useDate();
  const past365c = getDate(365);

  const changeForNew =
    mainData
      .filter((item) => item.start_dte)
      .map((item) => new Date(item.start_dte).toISOString().split('T')[0])[0] >
    past365c ? (
      <td>SOLDNEW</td>
    ) : (
      <td>SOLD365</td>
    );
      const handleButtonClick = () => {
        setIsOpenM(!isOpenM);
        
      };

  return (
    <tbody id="tb2" className="table2">
      <tr>
        <td>CLRS:{colorTotal}</td>
        <td>OH</td>
        <td style={{ background: '#f4a460' }}>REORDER</td>
        <td>PENDING</td>
        <td colSpan={2}>{Math.floor(Difference_In_Days2)} days</td>
        <td>SOLD30</td>
        <td>SOLD90</td>
        {changeForNew}

        <td>AVG_SOLD</td>
        <td className="  text-xs">
          AVG_LEAD{' '}
          <button
            onClick={handleButtonClick}
            className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white  px-1 border border-blue-500 hover:border-transparent rounded"
          >
            M
          </button>
        
        </td>

        <td>Suggested</td>
        <td colSpan={2}>+{daysDifference} days</td>

        <td>OrderToday</td>
        <td>Needed</td>
      </tr>
    </tbody>
  );
};

export default SubTable;
