
import '../../../styles/common.css';
import SearchButton from './SearchButton';
import MainImg from './MainImg';
import Graph from './Graph';
import PieGraph from './PieGraph';


const Row1 = ({
  record,
  setRecord,
  filteredData,
  handleKeyPress,
  setfilteredDate,
  graphDropdownSelectedYear,
  graphLoading,
  graphAllYearData,
  monthLine,
  monthLinePrv,
  pieChart,
  COLORS,
  maxVal,
  mainImg,
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
  suggest,
 }) => {


  const onSearch = (record1) => {
    setRecord(record1); // set the input value to the clicked suggestion
    setfilteredDate([]);
  };

  const handleitemDataFilter = (e) => {
    const searchWord = e.target.value;
    setRecord(searchWord);
    const newFilter = suggest.filter((value) => {
      return value.descrip.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setfilteredDate([]);
    } else {
      setfilteredDate(newFilter);
    }
  };
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
          onChange={handleitemDataFilter}
          autoComplete="off"
          onKeyPress={handleKeyPress}
        />
        <>
          {filteredData.length !== 0 && (
            <span className="dataResult absolute">
              {filteredData.slice(0, 15).map((item, idx) => (
                <span
                  key={idx}
                  className="dropdown-row"
                  onClick={() => {
                    onSearch(item.descrip);
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
        searchMainData={searchMainData}
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
