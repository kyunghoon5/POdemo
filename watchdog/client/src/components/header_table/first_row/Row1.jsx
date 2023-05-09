import '../../../styles/common.css';
import SearchButton from './SearchButton';
import MainImg from './MainImg';
import Graph from './Graph';
import PieGraph from './PieGraph';
import React, { useState, useEffect, useRef } from 'react';

const Row1 = ({
  mainData,
  record,
  setRecord,
  graphDropdownSelectedYear,
  graphLoading,
  graphAllYearData,
  monthLine,
  monthLinePrv,
  pieChart,
  COLORS,
  maxVal,
  searchMainData,
  itemRecords,
  soldPercentageAPI,
  graphAllYearDataAPI,
  chartEachYearDataAPI,
  graphByItemF,
  graphByItemMonthF,
  watchDogAPI,
  newitemRecords,
  pieChartF,
  suggest,
  imageAPI,
  mainImg,
  setSelectedSold,
  setGraphDropdownSelectedYear,
  setWatchDoginfo,
  setitemRank,
  setnewitemRank,
  newitemkey2ForecastAPI,
}) => {
  //searchSuggest
  const [filteredData, setfilteredData] = useState([]);
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setfilteredData([]);
      searchMainData(record);
      newitemkey2ForecastAPI(record);
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
      setGraphDropdownSelectedYear('YEAR');
    }
  };



const handleKeyDown = (event) => {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();
    const currentIndex = filteredData.findIndex(
      (item) => item.descrip === record
    );
    const nextIndex =
      (currentIndex +
        (event.key === 'ArrowDown' ? 1 : -1) +
        filteredData.length) %
      filteredData.length;
    setRecord(filteredData[nextIndex].descrip);

    
  }
};
  

  const reset = () => {
    setSelectedSold([]);
    setGraphDropdownSelectedYear([]);
    setWatchDoginfo([]);
    setitemRank([]);
    setnewitemRank([]);
  };
  const [pasted, setPasted] = useState(false);

  const handleInput = (e) => {
    const searchWord = e.target.value;
    if (!pasted) {
      setRecord(e.target.value);
      const newFilter = suggest.filter((value) => {
        return value.descrip.toLowerCase().startsWith(searchWord.toLowerCase());
      });

      if (searchWord === '') {
        setfilteredData([]);
      } else {
        setfilteredData(newFilter);
      }
    } else if (pasted) {
      setRecord(e.target.value.trim());
      const newFilter = suggest.filter((value) => {
        return value.descrip.toLowerCase().startsWith(searchWord.toLowerCase());
      });

      if (searchWord === '') {
        setfilteredData([]);
      } else {
        setfilteredData(newFilter);
      }
    }
    setPasted(false);
  };

  const handlePaste = () => {
    setPasted(true);
  };



   const dropdownRef = useRef(null);

   useEffect(() => {
     function handleClickOutside(event) {
       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setfilteredData([]);
       }
     }
     document.addEventListener('click', handleClickOutside);
     return () => {
       document.removeEventListener('click', handleClickOutside);
     };
   }, [dropdownRef]);

  return (
    <tr className="row1">
      <td className="infoCol1" style={{ textAlign: 'left' }}>
        ITEM:
      </td>
      <td className="nameSection" colSpan="2">
        <input
          className=" border border-zinc-500 "
          id="search"
          placeholder="Search item name here"
          type="text"
          value={record}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
        />
        <>
          {filteredData.length !== 0 && (
            <span className="dataResult absolute" ref={dropdownRef}>
              {filteredData.slice(0, 15).map((item, idx) => (
                <span
                  key={idx}
                  className="dropdown-row"
                  onClick={() => {
                    setRecord(item.descrip);
                    setfilteredData([]);
                    imageAPI(item.descrip);
                    searchMainData(item.descrip);
                    newitemkey2ForecastAPI(item.descrip);
                    itemRecords(item.descrip);
                    soldPercentageAPI(item.descrip);
                    graphAllYearDataAPI(item.descrip);
                    chartEachYearDataAPI(item.descrip);
                    graphByItemF(item.descrip);
                    graphByItemMonthF(item.descrip);
                    watchDogAPI(item.descrip);
                    newitemRecords(item.descrip);
                    pieChartF(item.descrip);
                    reset();
                    setGraphDropdownSelectedYear('YEAR');
                  }}
                >
                  {item.descrip}
                </span>
              ))}
            </span>
          )}
        </>
      </td>
      <SearchButton
        record={record}
        searchMainData={searchMainData}
        newitemkey2ForecastAPI={newitemkey2ForecastAPI}
        imageAPI={imageAPI}
        itemRecords={itemRecords}
        soldPercentageAPI={soldPercentageAPI}
        graphAllYearDataAPI={graphAllYearDataAPI}
        chartEachYearDataAPI={chartEachYearDataAPI}
        graphByItemF={graphByItemF}
        graphByItemMonthF={graphByItemMonthF}
        watchDogAPI={watchDogAPI}
        newitemRecords={newitemRecords}
        pieChartF={pieChartF}
        reset={reset}
        setfilteredData={setfilteredData}
        setGraphDropdownSelectedYear={setGraphDropdownSelectedYear}
      />
      <MainImg mainImg={mainImg} />
      <td
        colSpan="9"
        rowSpan="6"
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '200px',
        }}
      >
        <Graph
          mainData={mainData}
          graphDropdownSelectedYear={graphDropdownSelectedYear}
          graphLoading={graphLoading}
          graphAllYearData={graphAllYearData}
          monthLine={monthLine}
          monthLinePrv={monthLinePrv}
        />
        <PieGraph pieChart={pieChart} maxVal={maxVal} COLORS={COLORS} />
      </td>
    </tr>
  );
};

export default Row1;
