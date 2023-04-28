import React from 'react'
import useDate from '../../utils/date/DateFile'

const SubTable = ({
  colorTotal,
  Difference_In_Days2,
  daysDifference,
  mainData
}) => {
   const { getDate } = useDate();
   const past365c = getDate(365);

   const changeForNew =  mainData
          .filter((item) => item.start_dte)
          .map(
            (item) => new Date(item.start_dte).toISOString().split('T')[0]
          )[0] > past365c ? (
          <td >SOLDNEW</td>
        ) : (
          <td>SOLD365</td>
        )

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

        <td style={{ fontSize: '12px' }}>AVG_SOLD(1Y)</td>
        <td>AVG_LEAD</td>

        <td>SuggestedOH</td>
        <td colSpan={2}>+{daysDifference} days</td>

        <td>OrderToday</td>
        <td>Needed</td>
      </tr>
    </tbody>
  );
};

export default SubTable
