import React, {Fragment} from 'react'
import DatePicker from 'react-datepicker';
import useDate from '../../../utils/date/DateFile'

const Row11 = ({mainData, startDatePicker, setStartDatePicker }) => {
  const {getDate} = useDate()
  const past30c = getDate(30);
  const past90c = getDate(90);
  const past365c = getDate(365);


  //min & max cost
   const filteredItemsP = mainData.map((item) => item.mincost && item.maxcost);

   const filteredItemsPWithoutZero = filteredItemsP.filter(
     (value) => value !== null
   );

   const PRLmin = Math.min(...filteredItemsPWithoutZero);

   const PRLmax = Math.max(...filteredItemsP);
  return (
    <tr className="row11">
      {mainData.length > 0 ? (
        <td className="PRL">
          {PRLmin} - {PRLmax}
        </td>
      ) : (
        <td></td>
      )}

      <td colSpan="2" className="price">
        {
          mainData
            .filter((item) => typeof item.price === 'number')
            .map((item, idx) => (
              <Fragment key={idx}>PRICE: ${item.price}</Fragment>
            ))[0]
        }
      </td>
      <></>

      <td>Class: {mainData.map((item) => item.class)[0]}</td>
      <></>

      <td colSpan="2">
        <DatePicker
          className="border-2 border-zinc-500 text-center"
          selected={startDatePicker}
          onChange={(date) => setStartDatePicker(date)}
        />
      </td>

      <td className="prv30">{past30c}</td>
      <td className="prv30">{past90c}</td>
      <td className="prv30">{past365c}</td>
      <td></td>

      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td className="prv30" style={{ background: '#f4a460', fontSize: '10px' }}>
        OH_FORECAST
      </td>
      <td></td>
    </tr>
  );
}

export default Row11