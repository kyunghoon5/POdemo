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
}) => {
  const handleButton = () => {
    setfilteredData([]);
    searchMainData();
    imageAPI();
    itemRecords();
    soldPercentageAPI();
    graphAllYearDataAPI();
    chartEachYearDataAPI();
    graphByItemF();
    graphByItemMonthF();
    watchDogAPI();
    newitemRecords();
    pieChartF();
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
