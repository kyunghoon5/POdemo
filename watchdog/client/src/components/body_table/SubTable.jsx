import React from 'react'

const SubTable = ({
  colorTotal,
  Difference_In_Days2,
  Difference_In_PostDayresult,
}) => {
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
        <td>SOLD365</td>
        <td style={{ fontSize: '12px' }}>AVG_SOLD(1Y)</td>
        <td>AVG_LEAD</td>

        <td>SuggestedOH</td>
        <td colSpan={2}>+{Difference_In_PostDayresult-1} days</td>
        
        <td>OrderToday</td>
        <td>Needed</td>
      </tr>
    </tbody>
  );
};

export default SubTable
