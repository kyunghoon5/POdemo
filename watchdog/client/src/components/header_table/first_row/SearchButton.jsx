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
  setGraphDropdownSelectedYear,
  newitemkey2ForecastAPI,
  fetchData4,
}) => {
  const handleButton = () => {
    setfilteredData([]);
    searchMainData(record);
    newitemkey2ForecastAPI(record);
    imageAPI('./item1');
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
    setGraphDropdownSelectedYear('YEAR');
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
