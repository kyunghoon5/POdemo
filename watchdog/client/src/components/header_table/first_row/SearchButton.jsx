import React from 'react';

const SearchButton = ({
  searchMainData,
  imageAPI,
  itemRecords,
  soldPercentageAPI,
  graphAllYearDataAPI,
  chartEachYearDataAPI,
  graphByItemF,
  graphByItemMonthF,
  watchDogAPI,
  newitemRecords,
  pieChartF,
  reset,
  setfilteredData,
  record,
}) => {
  const handleButton = () => {
    setfilteredData([]);
    searchMainData(record);
    imageAPI(record);
    itemRecords(record);
    soldPercentageAPI(record);
    graphAllYearDataAPI(record);
    chartEachYearDataAPI(record);
    graphByItemF(record);
    graphByItemMonthF(record);
    watchDogAPI(record);
    newitemRecords(record);
    pieChartF(record);
    reset();
  };

  return (
    <td className="btn1">
      <button
        onClick={() => {
          handleButton();
        }}
        className="btn1name"
      >
        SUBMIT
      </button>
    </td>
  );
};

export default SearchButton;
