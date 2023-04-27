import React, { useState } from 'react';
import { zipWith, sumBy, add } from 'lodash';
import '../styles/common.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'semantic-ui-css/semantic.min.css';
import Row1 from './header_table/first_row/Row1';
import Row2 from './header_table/second_row/Row2';
import Row3 from './header_table/third_row/Row3';
import Row4 from './header_table/fourth_row/Row4';
import Row5 from './header_table/fifth_row/Row5';
import Row6 from './header_table/sixth_row/Row6';
import Row7 from './header_table/seventh_row/Row7';
import Row8 from './header_table/eighth_row/Row8';
import Row9 from './header_table/nineth_row/Row9';
import Row10 from './header_table/tenth_row/Row10';
import Row11 from './header_table/eleventh_row/Row11';
import Row12 from './header_table/twelfth_row/Row12';
import ColorTab from './body_table/ColorTab';
import MainTable from './body_table/MainTable';
import Table3Total from './body_table/Total';
import useDate from '../utils/date/DateFile';
import useAPIData from '../api/API';
import useMath from '../utils/math/Math';
import SubTable from './body_table/SubTable';
import Alert_Table from './alert_table/Alert_Table';

const Watchdog = () => {
  const [startDatePicker, setStartDatePicker] = useState(new Date());
  const [endDatePicker, setEndDatePicker] = useState(new Date());
  const [forecastDatePicker, setForecasteDatePicker] = useState(new Date());
  const {
    mainData,
    loading,
    searchMainData,
    mainImg,
    imageAPI,
    selectedSoldPercentage,
    loadingsoldP,
    soldPercentageAPI,
    watchDoginfo,
    watchDogAPI,
    watchDoginfo2,
    setWatchDoginfo,
    selectedDatePicker,
    loadingDatePicker,
    itemRank,
    itemLoading,
    itemRecords,
    setitemRank,
    newitemRank,
    newitemLoading,
    newitemRecords,
    setnewitemRank,
    graphLoading,
    graphAllYearData,
    graphAllYearDataAPI,
    chartbyEachYearData,
    chartEachYearDataAPI,
    graphLoading2,
    graphByItem,
    graphByItemF,
    graphByItemMonth,
    graphByItemMonthF,
    pieChart,
    pieChartF,
    selforecastDatePicker,
    handleDownload17,
    suggest,
    setMainImg,
    record,
    setRecord,
  } = useAPIData(startDatePicker, endDatePicker, forecastDatePicker);
  const { date, formatDate } = useDate();
  const { round } = useMath();


  // toggle Color Tab
  const [isOpen, setIsOpen] = useState(false);

  //searchSuggest
  const [filteredData, setfilteredData] = useState([]);

  const [selectedSold, setSelectedSold] = useState('');
  const soldPercentageHandler = (e) => {
    const soldPercentageDropdownValue = e.target.value;
    setSelectedSold(soldPercentageDropdownValue);
  };

  const lastyearSoldQty = graphAllYearData.map((item) => item.qtyshp).at(-1);
  const lastyearSoldQty2 = graphAllYearData.map((item) => item.qtyshp).at(-2);
  const lastyearSoldQty3 = graphAllYearData.map((item) => item.qtyshp).at(-3);
  const lastyearSoldQty4 = graphAllYearData.map((item) => item.qtyshp).at(-4);
  const lastyearSoldQty5 = graphAllYearData.map((item) => item.qtyshp).at(-5);
  const lastyearSoldQty6 = graphAllYearData.map((item) => item.qtyshp).at(-6);
  const lastyearSoldQty7 = graphAllYearData.map((item) => item.qtyshp).at(-7);

  const lastyearRCVQty = graphAllYearData.map((item) => item.qtyrec).at(-1);
  const lastyearRCVQty2 = graphAllYearData.map((item) => item.qtyrec).at(-2);
  const lastyearRCVQty3 = graphAllYearData.map((item) => item.qtyrec).at(-3);
  const lastyearRCVQty4 = graphAllYearData.map((item) => item.qtyrec).at(-4);
  const lastyearRCVQty5 = graphAllYearData.map((item) => item.qtyrec).at(-5);
  const lastyearRCVQty6 = graphAllYearData.map((item) => item.qtyrec).at(-6);

  const YoY = (lastyearSoldQty / lastyearSoldQty2 - 1) * 100;
  const YoY2 = (lastyearSoldQty2 / lastyearSoldQty3 - 1) * 100;
  const YoY3 = (lastyearSoldQty3 / lastyearSoldQty4 - 1) * 100;
  const YoY4 = (lastyearSoldQty4 / lastyearSoldQty5 - 1) * 100;
  const YoY5 = (lastyearSoldQty5 / lastyearSoldQty6 - 1) * 100;
  const YoY6 = (lastyearSoldQty6 / lastyearSoldQty7 - 1) * 100;

  const [graphDropdownSelectedYear, setGraphDropdownSelectedYear] =
    useState('');

  const monthLine = chartbyEachYearData.filter(
    (item) => item.year === Number(graphDropdownSelectedYear)
  );

  const monthLinePrv = chartbyEachYearData.filter(
    (item) => item.year === Number(graphDropdownSelectedYear) - 1
  );

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const monthlyData = [];
  monthNames.forEach((name, index) => {
    const dataItem = monthLine.find((item) => item.month === index + 1);
    monthlyData.push(
      dataItem
        ? { name, qtyshp: dataItem.qtyshp, qtyrec: dataItem.qtyrec }
        : { name, qtyshp: 0, qtyrec: 0 }
    );
  });

  const PrvmonthData = [];
  monthNames.forEach((name, index) => {
    const dataItem = monthLinePrv.find((item) => item.month === index + 1);
    PrvmonthData.push(
      dataItem
        ? { name, qtyshp: dataItem.qtyshp, qtyrec: dataItem.qtyrec }
        : { name, qtyshp: 0, qtyrec: 0 }
    );
  });

  const YoYEachMonth =
    (monthlyData.map((item) => item.qtyshp)[0] /
      PrvmonthData.map((item) => item.qtyshp)[0] -
      1) *
    100;
  const YoYEachMonth2 =
    (monthlyData.map((item) => item.qtyshp)[1] /
      PrvmonthData.map((item) => item.qtyshp)[1] -
      1) *
    100;
  const YoYEachMonth3 =
    (monthlyData.map((item) => item.qtyshp)[2] /
      PrvmonthData.map((item) => item.qtyshp)[2] -
      1) *
    100;
  const YoYEachMonth4 =
    (monthlyData.map((item) => item.qtyshp)[3] /
      PrvmonthData.map((item) => item.qtyshp)[3] -
      1) *
    100;
  const YoYEachMonth5 =
    (monthlyData.map((item) => item.qtyshp)[4] /
      PrvmonthData.map((item) => item.qtyshp)[4] -
      1) *
    100;
  const YoYEachMonth6 =
    (monthlyData.map((item) => item.qtyshp)[5] /
      PrvmonthData.map((item) => item.qtyshp)[5] -
      1) *
    100;
  const YoYEachMonth7 =
    (monthlyData.map((item) => item.qtyshp)[6] /
      PrvmonthData.map((item) => item.qtyshp)[6] -
      1) *
    100;
  const YoYEachMonth8 =
    (monthlyData.map((item) => item.qtyshp)[7] /
      PrvmonthData.map((item) => item.qtyshp)[7] -
      1) *
    100;
  const YoYEachMonth9 =
    (monthlyData.map((item) => item.qtyshp)[8] /
      PrvmonthData.map((item) => item.qtyshp)[8] -
      1) *
    100;
  const YoYEachMonth10 =
    (monthlyData.map((item) => item.qtyshp)[9] /
      PrvmonthData.map((item) => item.qtyshp)[9] -
      1) *
    100;
  const YoYEachMonth11 =
    (monthlyData.map((item) => item.qtyshp)[10] /
      PrvmonthData.map((item) => item.qtyshp)[10] -
      1) *
    100;
  const YoYEachMonth12 =
    (monthlyData.map((item) => item.qtyshp)[11] /
      PrvmonthData.map((item) => item.qtyshp)[11] -
      1) *
    100;

  const [eachItemGraph, setEachItemGraph] = useState([]);
  const [eachItemGraphMonth, setEachItemGraphMonth] = useState([]);
  const eachItemClick = (clickedItem) => {
    setIsOpen(true);
    const filteredGraph = graphByItem.filter(
      (item) => item.itemkey2 === clickedItem
    );
    setEachItemGraph(filteredGraph);

    const filteredGraphMonth = graphByItemMonth.filter(
      (item) => item.itemkey2 === clickedItem
    );
    setEachItemGraphMonth(filteredGraphMonth);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  // Get the maximum value from the data

  // Get the maximum value from the data
  const maxVal = Math.max(...pieChart.map((data) => data.qtyshp));

  //className & table-text
  const InfoItemOb = (props) => {
    return (
      <td className={props.className} style={{ textAlign: 'left' }}>
        {props.name}
      </td>
    );
  };

  //REORDER DATA

  const result2 = mainData.map((item) =>
    watchDoginfo2.find((item2) => item2.Color.trim() === item.itemkey2.trim())
  );
  //Calculating the numbers of days between two dates for datepicker
  const Difference_In_Time2 =
    startDatePicker.getTime() - endDatePicker.getTime();
  const Difference_In_Days2 = Difference_In_Time2 / (1000 * 3600 * 24);

  //total
  const [colorTotal, setColorTotal] = useState(0);
  const [onHandTotal, setonHandTotal] = useState(0);
  const [reOrderTotal, setreOrderTotal] = useState(0);
  const [pendingTotal, setpendingTotal] = useState(0);
  const [calendarQtyTotal, setcalendarQtyTotal] = useState(0);
  const [calendarBOTotal, setcalendarBOTotal] = useState(0);
  const [sold30Total, setsold30Total] = useState(0);
  const [sold90Total, setsold90Total] = useState(0);
  const [sold365Total, setsold365Total] = useState(0);
  const [avg_sold365Total, setavg_sold365Total] = useState(0);
  const [avg_lead_timeTotal, setavg_lead_timeTotal] = useState(0);
  const [totalNewItemKeyForecast, setTotalNewItemKeyForecast] = useState(0);

  const suggestedQtyavg_qty = mainData.map((item) =>
    item.reorderPointO.map((item) => Number(item.avg_qtyshp))
  );
  const suggestedQtyavg_lead = mainData.map((item) =>
    item.poLeadTimeO.map((item) => Number(item.avg_lead_time))
  );

  const suggestedQty = zipWith(
    suggestedQtyavg_qty,
    suggestedQtyavg_lead,
    (qty, lead) => qty * lead
  ).reduce((acc, curr) => acc.concat(curr), []);

  const [suggestedQtyTotal, setsuggestedQtyTotal] = useState(0);

  const sumReqForcast = selforecastDatePicker.map((item) =>
    sumBy(item.poForecast, 'ORDEREDa')
  );

  const eachItemNeededDate = mainData.map((item) =>
    item.poLeadTimeO.length
      ? item.poLeadTimeO.map((item2) =>
          new Date(formatDate(item2.avg_lead_time)).getTime()
        ) - date.getTime()
      : undefined
  );

  const Difference_In_PostDayresult2 = eachItemNeededDate.map((item) =>
    round(item / (1000 * 3600 * 24))
  );

  const Difference_In_PostDecimalDayresult2 = eachItemNeededDate.map(
    (item) => Math.round((item / (1000 * 3600 * 24) / 30) * 10) / 10
  );

  const onhandCal2 = mainData.map((item) => Number(item.onhand));

  const dayCal2 = mainData.map((item) =>
    item.sold30.map((item) => Number(item.qtyshp / 30))
  );

  const multipliedData = zipWith(
    dayCal2,
    Difference_In_PostDayresult2,
    (arr1, arr2) => arr1.map((elem) => elem * arr2)
  );

  const poPoendingData = mainData.map((item, idx) =>
    item.pendingDataO.length
      ? item.pendingDataO.map((item2) => item2.pending)
      : undefined
  );

  const onhnadWithRVG2 = zipWith(onhandCal2, poPoendingData, (x, y) =>
    round(add(x, y))
  );

  const Cal302 = mainData.map((item) =>
    item.sold30.map((item) => Number(item.qtyshp))
  );

  const multipliedData2 = zipWith(
    Cal302,
    Difference_In_PostDecimalDayresult2,
    (arr1, arr2) => arr1.map((elem) => elem * arr2)
  );

  const Cal602 = mainData.map((item) =>
    item.sold60.map((item) => Number(item.qtyshp / 2))
  );

  const multipliedData3 = zipWith(
    Cal602,
    Difference_In_PostDecimalDayresult2,
    (arr1, arr2) => arr1.map((elem) => elem * arr2)
  );

  const Cal902 = mainData.map((item) =>
    item.sold90.map((item) => Number(item.qtyshp / 3))
  );
  const multipliedData4 = zipWith(
    Cal902,
    Difference_In_PostDecimalDayresult2,
    (arr1, arr2) => arr1.map((elem) => elem * arr2)
  );

  const Cal3652 = mainData.map((item) =>
    item.sold365.map((item) => Number(item.qtyshp / 12))
  );

  const multipliedData5 = zipWith(
    Cal3652,
    Difference_In_PostDecimalDayresult2,
    (arr1, arr2) => arr1.map((elem) => elem * arr2)
  );

  const amounts2 =
    Difference_In_PostDecimalDayresult2 <= 1
      ? zipWith(onhnadWithRVG2, multipliedData, (arr1, arr2) =>
          arr2.map((elem) => round(arr1 - elem))
        )
      : Difference_In_PostDecimalDayresult2 <= 1
      ? zipWith(onhnadWithRVG2, multipliedData2, (arr1, arr2) =>
          arr2.map((elem) => round(arr1 - elem))
        )
      : Difference_In_PostDecimalDayresult2 > 1 &&
        Difference_In_PostDecimalDayresult2 <= 2
      ? zipWith(onhnadWithRVG2, multipliedData3, (arr1, arr2) =>
          arr2.map((elem) => round(arr1 - elem))
        )
      : Difference_In_PostDecimalDayresult2 > 2 &&
        Difference_In_PostDecimalDayresult2 < 3
      ? zipWith(onhnadWithRVG2, multipliedData4, (arr1, arr2) =>
          arr2.map((elem) => round(arr1 - elem))
        )
      : zipWith(onhnadWithRVG2, multipliedData5, (arr1, arr2) =>
          arr2.map((elem) => round(arr1 - elem))
        );

  const [neededTotal, set_NeededTotal] = useState(0);

  const postDay = forecastDatePicker;
  const Difference_In_PostDay = postDay.getTime() - date.getTime();

  const Difference_In_PostDayresult = round(
    Difference_In_PostDay / (1000 * 3600 * 24)
  );

  const Difference_In_PostDecimalDayresult =
    Math.round((Difference_In_PostDayresult / 30) * 10) / 10;

  const onhandCal = mainData.map((item) => Number(item.onhand));

  const dayCal = mainData.map((item) =>
    item.sold30.map(
      (item) => Number(item.qtyshp / 30) * Difference_In_PostDayresult
    )
  );

  const onhnadWithRVG = zipWith(onhandCal, sumReqForcast, (x, y) => x + y).map(
    (num) => round(num)
  );

  const Cal30 = mainData.map((item) =>
    item.sold30.map(
      (item) => Number(item.qtyshp) * Difference_In_PostDecimalDayresult
    )
  );

  const Cal60 = mainData.map((item) =>
    item.sold60.map(
      (item) => Number(item.qtyshp / 2) * Difference_In_PostDecimalDayresult
    )
  );

  const Cal90 = mainData.map((item) =>
    item.sold90.map(
      (item) => Number(item.qtyshp / 3) * Difference_In_PostDecimalDayresult
    )
  );

  const Cal365 = mainData.map((item) =>
    item.sold365.map(
      (item) => Number(item.qtyshp / 12) * Difference_In_PostDecimalDayresult
    )
  );

  const amounts =
    Difference_In_PostDecimalDayresult <= 1
      ? zipWith(onhnadWithRVG, dayCal, (x, y) => round(x - y))
      : Difference_In_PostDecimalDayresult <= 1
      ? zipWith(onhnadWithRVG, Cal30, (x, y) => round(x - y))
      : Difference_In_PostDecimalDayresult > 1 &&
        Difference_In_PostDecimalDayresult <= 2
      ? zipWith(onhnadWithRVG, Cal60, (x, y) => round(x - y))
      : Difference_In_PostDecimalDayresult > 2 &&
        Difference_In_PostDecimalDayresult < 3
      ? zipWith(onhnadWithRVG, Cal90, (x, y) => round(x - y))
      : zipWith(onhnadWithRVG, Cal365, (x, y) => round(x - y));

      
  const [oh_forecastTotal, setoh_forecastTotal] = useState(0);

  const FosuggestedQty = zipWith(
    suggestedQtyavg_qty,
    suggestedQtyavg_lead,
    amounts,
    (qty, lead, am) => qty * lead - am
  ).reduce((acc, curr) => acc.concat(curr), []);

  const [foSuggestedTotal, setfoSuggestedTotal] = useState(0);
  //new or old item

  return (
    <div className="search flex w-full p-4">
      <Table3Total
        mainData={mainData}
        watchDoginfo2={watchDoginfo2}
        selectedDatePicker={selectedDatePicker}
        suggestedQty={suggestedQty}
        amounts={amounts}
        amounts2={amounts2}
        set_NeededTotal={set_NeededTotal}
        FosuggestedQty={FosuggestedQty}
        setColorTotal={setColorTotal}
        setonHandTotal={setonHandTotal}
        setreOrderTotal={setreOrderTotal}
        setcalendarQtyTotal={setcalendarQtyTotal}
        setcalendarBOTotal={setcalendarBOTotal}
        setsold30Total={setsold30Total}
        setsold90Total={setsold90Total}
        setsold365Total={setsold365Total}
        setpendingTotal={setpendingTotal}
        setavg_sold365Total={setavg_sold365Total}
        setavg_lead_timeTotal={setavg_lead_timeTotal}
        setsuggestedQtyTotal={setsuggestedQtyTotal}
        setoh_forecastTotal={setoh_forecastTotal}
        setfoSuggestedTotal={setfoSuggestedTotal}
        setTotalNewItemKeyForecast={setTotalNewItemKeyForecast}
      />
      <div>
        <table id="tb1" className="table1">
          <tbody>
            <Row1
              mainData={mainData}
              setMainImg={setMainImg}
              record={record}
              setRecord={setRecord}
              filteredData={filteredData}
              mainImg={mainImg}
              graphDropdownSelectedYear={graphDropdownSelectedYear}
              graphLoading={graphLoading}
              graphAllYearData={graphAllYearData}
              monthLine={monthLine}
              monthLinePrv={monthLinePrv}
              pieChart={pieChart}
              COLORS={COLORS}
              maxVal={maxVal}
              setfilteredData={setfilteredData}
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
              suggest={suggest}
              setSelectedSold={setSelectedSold}
              setGraphDropdownSelectedYear={setGraphDropdownSelectedYear}
              setWatchDoginfo={setWatchDoginfo}
              setitemRank={setitemRank}
              setnewitemRank={setnewitemRank}
            />
            <Row2 InfoItemOb={InfoItemOb} watchDoginfo={watchDoginfo} />
            <Row3 InfoItemOb={InfoItemOb} watchDoginfo={watchDoginfo} />
            <Row4 InfoItemOb={InfoItemOb} mainData={mainData} />
            <Row5 InfoItemOb={InfoItemOb} watchDoginfo={watchDoginfo} />
            <Row6 InfoItemOb={InfoItemOb} watchDoginfo={watchDoginfo} />
            <Row7
              InfoItemOb={InfoItemOb}
              watchDoginfo={watchDoginfo}
              setGraphDropdownSelectedYear={setGraphDropdownSelectedYear}
              graphDropdownSelectedYear={graphDropdownSelectedYear}
              graphAllYearData={graphAllYearData}
              mainData={mainData}
              graphLoading={graphLoading}
              monthLine={monthLine}
              monthlyData={monthlyData}
            />

            <Row8
              InfoItemOb={InfoItemOb}
              selectedSold={selectedSold}
              soldPercentageHandler={soldPercentageHandler}
              selectedSoldPercentage={selectedSoldPercentage}
              mainData={mainData}
              loadingsoldP={loadingsoldP}
              graphDropdownSelectedYear={graphDropdownSelectedYear}
              graphLoading={graphLoading}
              monthlyData={monthlyData}
              graphAllYearData={graphAllYearData}
            />

            <Row9
              InfoItemOb={InfoItemOb}
              watchDoginfo={watchDoginfo}
              mainData={mainData}
              graphDropdownSelectedYear={graphDropdownSelectedYear}
              graphLoading={graphLoading}
              YoYEachMonth={YoYEachMonth}
              YoYEachMonth2={YoYEachMonth2}
              YoYEachMonth3={YoYEachMonth3}
              YoYEachMonth4={YoYEachMonth4}
              YoYEachMonth5={YoYEachMonth5}
              YoYEachMonth6={YoYEachMonth6}
              YoYEachMonth7={YoYEachMonth7}
              YoYEachMonth8={YoYEachMonth8}
              YoYEachMonth9={YoYEachMonth9}
              YoYEachMonth10={YoYEachMonth10}
              YoYEachMonth11={YoYEachMonth11}
              YoYEachMonth12={YoYEachMonth12}
              YoY6={YoY6}
              YoY5={YoY5}
              YoY4={YoY4}
              YoY3={YoY3}
              YoY2={YoY2}
              YoY={YoY}
            />

            <Row10
              InfoItemOb={InfoItemOb}
              mainData={mainData}
              watchDoginfo={watchDoginfo}
              graphDropdownSelectedYear={graphDropdownSelectedYear}
              graphLoading={graphLoading}
              monthlyData={monthlyData}
              lastyearRCVQty6={lastyearRCVQty6}
              lastyearRCVQty5={lastyearRCVQty5}
              lastyearRCVQty4={lastyearRCVQty4}
              lastyearRCVQty3={lastyearRCVQty3}
              lastyearRCVQty2={lastyearRCVQty2}
              lastyearRCVQty={lastyearRCVQty}
            />

            <Row11
              mainData={mainData}
              startDatePicker={startDatePicker}
              setStartDatePicker={setStartDatePicker}
            />

            <Row12
              mainData={mainData}
              itemRank={itemRank}
              endDatePicker={endDatePicker}
              forecastDatePicker={forecastDatePicker}
              newitemRank={newitemRank}
              newitemLoading={newitemLoading}
              setForecasteDatePicker={setForecasteDatePicker}
              itemLoading={itemLoading}
              setEndDatePicker={setEndDatePicker}
            />
          </tbody>

          <SubTable
            colorTotal={colorTotal}
            Difference_In_Days2={Difference_In_Days2}
            Difference_In_PostDayresult={Difference_In_PostDayresult}
            mainData={mainData}
          />

          <MainTable
            loading={loading}
            searchLength={mainData.length}
            mainData={mainData}
            onHandTotal={onHandTotal}
            reOrderTotal={reOrderTotal}
            pendingTotal={pendingTotal}
            selectedDatePicker={selectedDatePicker}
            loadingDatePicker={loadingDatePicker}
            calendarQtyTotal={calendarQtyTotal}
            calendarBOTotal={calendarBOTotal}
            sold30Total={sold30Total}
            sold90Total={sold90Total}
            sold365Total={sold365Total}
            avg_sold365Total={avg_sold365Total}
            avg_lead_timeTotal={avg_lead_timeTotal}
            suggestedQty={suggestedQty}
            suggestedQtyTotal={suggestedQtyTotal}
            amounts={amounts}
            amounts2={amounts2}
            oh_forecastTotal={oh_forecastTotal}
            FosuggestedQty={FosuggestedQty}
            foSuggestedTotal={foSuggestedTotal}
            result2={result2}
            eachItemClick={eachItemClick}
            neededTotal={neededTotal}
            totalNewItemKeyForecast={totalNewItemKeyForecast}
          />
        </table>
      </div>
      {isOpen && (
        <div className=" absolute top-0 z-50 ">
          <ColorTab
            eachItemGraph={eachItemGraph}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            eachItemGraphMonth={eachItemGraphMonth}
            graphLoading2={graphLoading2}
            mainData={mainData}
          />
        </div>
      )}
      <div className="pl-10 ">
        <Alert_Table />
        {/* <TreeViewDownload handleDownload17={handleDownload17} /> */}
      </div>
    </div>
  );
};

export default Watchdog;
