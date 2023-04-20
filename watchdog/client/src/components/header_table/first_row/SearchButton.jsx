import React from 'react';
import useAPIData from '../../../api/API'

const SearchButton = () => {

  const {
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
  } = useAPIData();


const handleButton = () => {
  searchMainData();
  imageAPI();
  itemRecords();
  soldPercentageAPI();
  graphAllYearDataAPI();
  chartEachYearDataAPI();
  graphByItemF();
  graphByItemMonthF();
  watchDogAPI();
  setfilteredDate([]);
  newitemRecords();
  pieChartF();
  reset();
};

  return (
    <button
      onClick={() => {
        handleButton();
      }}
      className="btn1name"
    >
      SUBMIT
    </button>
  );
};

export default SearchButton;
