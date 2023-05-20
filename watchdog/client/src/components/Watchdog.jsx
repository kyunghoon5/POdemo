import React, { useState, useRef } from 'react';
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
import Total from './body_table/Total';
import useDate from '../utils/date/DateFile';
import useAPIData from '../api/API';
import useMath from '../utils/math/Round';
import SubTable from './body_table/SubTable';
import Alert_Table from './alert_table/Alert_Table';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../redux/testcomp';
import useNewItemCal from '../utils/math/NewItemCal';
import useOldItemCal from '../utils/math/OldItemCal';

const Watchdog = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const { date, formatDate } = useDate();

  const [startDatePicker, setStartDatePicker] = useState(
    new Date(new Date().setHours(-1440, 0, 0, 0))
  );
  const [endDatePicker, setEndDatePicker] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [forecastDatePicker, setForecasteDatePicker] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );

  const {
    newitemkey2ForecastAPI,
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
    suggest,
    setMainImg,
    record,
    setRecord,
    itemAlertOld,
    loadingAlert,
    itemFirstOrder,
    itemNewOrder,
    itemoldOrder,
    loadingOldOrder,
    loadingNewOrder,
    loadingFirstOrder,
    newitemkey2Forecast,
    ForecastloadingDatePicker,
    itemFirstOrderAPI,
    loadedFirstOrder,
    itemNewOrderAPI,
    loadedNewOrder,
    itemoldOrderAPI,
    loadedOldOrder,
  } = useAPIData(startDatePicker, endDatePicker, forecastDatePicker);

  const { round } = useMath();

  // toggle Color Tab
  const [isOpen, setIsOpen] = useState(false);

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

  //   const YoYEachMonth = [];
  // for (let i = 0; i < 12; i++) {
  // YoYEachMonth.push(
  // (monthlyData[i].qtyshp / PrvmonthData[i].qtyshp - 1) * 100
  // );

  const prevMonthQtyShp = PrvmonthData.map((item) => item.qtyshp)[0];

  const YoYEachMonth = prevMonthQtyShp
    ? (monthlyData.map((item) => item.qtyshp)[0] == 0
        ? undefined
        : monthlyData.map((item) => item.qtyshp)[0] / prevMonthQtyShp - 1) * 100
    : 0;

  const prevMonthQtyShp2 = PrvmonthData.map((item) => item.qtyshp)[1];

  const YoYEachMonth2 = prevMonthQtyShp2
    ? (monthlyData.map((item) => item.qtyshp)[1] == 0
        ? undefined
        : monthlyData.map((item) => item.qtyshp)[1] / prevMonthQtyShp2 - 1) *
      100
    : 0;
  const prevMonthQtyShp3 = PrvmonthData.map((item) => item.qtyshp)[2];

  const YoYEachMonth3 = prevMonthQtyShp3
    ? (monthlyData.map((item) => item.qtyshp)[2] == 0
        ? undefined
        : monthlyData.map((item) => item.qtyshp)[2] / prevMonthQtyShp3 - 1) *
      100
    : 0;
  const prevMonthQtyShp4 = PrvmonthData.map((item) => item.qtyshp)[3];

  const YoYEachMonth4 = prevMonthQtyShp4
    ? (monthlyData.map((item) => item.qtyshp)[3] == 0
        ? undefined
        : monthlyData.map((item) => item.qtyshp)[3] / prevMonthQtyShp4 - 1) *
      100
    : 0;

  const prevMonthQtyShp5 = PrvmonthData.map((item) => item.qtyshp)[4];

  const YoYEachMonth5 = prevMonthQtyShp5
    ? (monthlyData.map((item) => item.qtyshp)[4] == 0
        ? undefined
        : monthlyData.map((item) => item.qtyshp)[4] / prevMonthQtyShp5 - 1) *
      100
    : 0;
  const prevMonthQtyShp6 = PrvmonthData.map((item) => item.qtyshp)[5];

  const YoYEachMonth6 = prevMonthQtyShp6
    ? (monthlyData.map((item) => item.qtyshp)[5] == 0
        ? undefined
        : monthlyData.map((item) => item.qtyshp)[5] / prevMonthQtyShp6 - 1) *
      100
    : 0;

  const prevMonthQtyShp7 = PrvmonthData.map((item) => item.qtyshp)[6];

  const YoYEachMonth7 = prevMonthQtyShp7
    ? (monthlyData.map((item) => item.qtyshp)[6] == 0
        ? undefined
        : monthlyData.map((item) => item.qtyshp)[6] / prevMonthQtyShp7 - 1) *
      100
    : 0;

  const prevMonthQtyShp8 = PrvmonthData.map((item) => item.qtyshp)[7];

  const YoYEachMonth8 = prevMonthQtyShp8
    ? (monthlyData.map((item) => item.qtyshp)[7] == 0
        ? undefined
        : monthlyData.map((item) => item.qtyshp)[7] / prevMonthQtyShp8 - 1) *
      100
    : 0;

  const prevMonthQtyShp9 = PrvmonthData.map((item) => item.qtyshp)[8];

  const YoYEachMonth9 = prevMonthQtyShp9
    ? (monthlyData.map((item) => item.qtyshp)[8] == 0
        ? undefined
        : monthlyData.map((item) => item.qtyshp)[8] / prevMonthQtyShp9 - 1) *
      100
    : 0;

  const prevMonthQtyShp10 = PrvmonthData.map((item) => item.qtyshp)[9];

  const YoYEachMonth10 = prevMonthQtyShp10
    ? (monthlyData.map((item) => item.qtyshp)[9] == 0
        ? undefined
        : monthlyData.map((item) => item.qtyshp)[9] / prevMonthQtyShp10 - 1) *
      100
    : 0;

  const prevMonthQtyShp11 = PrvmonthData.map((item) => item.qtyshp)[10];

  const YoYEachMonth11 = prevMonthQtyShp11
    ? (monthlyData.map((item) => item.qtyshp)[10] == 0
        ? undefined
        : monthlyData.map((item) => item.qtyshp)[10] / prevMonthQtyShp11 - 1) *
      100
    : 0;

  const prevMonthQtyShp12 = PrvmonthData.map((item) => item.qtyshp)[11];

  const YoYEachMonth12 = prevMonthQtyShp12
    ? (monthlyData.map((item) => item.qtyshp)[11] == 0
        ? undefined
        : monthlyData.map((item) => item.qtyshp)[11] / prevMonthQtyShp12 - 1) *
      100
    : 0;

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

  //WATCHDOG REORDER DATA

  const result2 = mainData.map((item) =>
    watchDoginfo2.find((item2) => item2.Color.trim() === item.itemkey2.trim())
  );
  //Calculating the numbers of days between two dates for datepicker
  const Difference_In_Time2 =
    startDatePicker.getTime() - endDatePicker.getTime();
  const Difference_In_Days2 = Difference_In_Time2 / (1000 * 3600 * 24);

  //total props vs state test
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
  const [totalNewItem_365_Sold, setTotalNewItem_365_Sold] = useState(0);
  const [totalNewItem_AVG_SOLD, setTotalNewItem_AVG_SOLD] = useState(0);
  const [totalNew_SuggestedOH, setTotalNew_SuggestedOH] = useState(0);

  const [isOpenM, setIsOpenM] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const suggestedQtyavg_qty = mainData.map((item) =>
    item.reorderPointO.map((item) => Number(item.avg_qtyshp))
  );
  const suggestedQtyavg_lead = isOpenM
    ? mainData.map((item) => item.poLeadTimeO.map((item) => Number(inputValue)))
    : mainData.map((item) =>
        item.poLeadTimeO.map((item) => item.avg_lead_time)
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

  const [neededTotal, set_NeededTotal] = useState(0);
  const [NewneededTotal, set_New_NeededTotal] = useState(0);

  //OldItem All Cal
  const {
    oldOH_Forecast_Left,
    oldOH_Forecast_Right,
    daysDifference,
    oldNeededCal,
  } = useOldItemCal(
    mainData,
    forecastDatePicker,
    sumReqForcast,
    suggestedQtyavg_qty,
    suggestedQtyavg_lead,
    isOpenM,
    inputValue
  );

  //NewItem All Cal
  const {
    suggestedOHForNewItem,
    NewItem_Qty_avg,
    NewOH_ForecastLeft,
    NewNeededCal,   
    NewOH_ForecastRight,
  } = useNewItemCal(
    mainData,
    forecastDatePicker,
    sumReqForcast,
    newitemkey2Forecast,
    suggestedQtyavg_lead,
    isOpenM,
    inputValue
  );


  const [oh_forecastTotal, setoh_forecastTotal] = useState(0);
  const [new_oh_forecastTotal, setNew_oh_forecastTotal] = useState(0);

  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const Props = {
    NewneededTotal,
    set_New_NeededTotal,
    NewNeededCal,
    NewOH_ForecastRight,
    mainData,
    watchDoginfo2,
    selectedDatePicker,
    suggestedQty,
    oldOH_Forecast_Left,
    oldNeededCal,
    NewOH_ForecastLeft,
    set_NeededTotal,
    oldOH_Forecast_Right,
    setColorTotal,
    setonHandTotal,
    setreOrderTotal,
    setcalendarQtyTotal,
    setcalendarBOTotal,
    setsold30Total,
    setsold90Total,
    setsold365Total,
    setpendingTotal,
    setavg_sold365Total,
    setavg_lead_timeTotal,
    setsuggestedQtyTotal,
    setoh_forecastTotal,
    setNew_oh_forecastTotal,
    new_oh_forecastTotal,
    setTotalNewItem_365_Sold,
    setTotalNewItem_AVG_SOLD,
    setTotalNew_SuggestedOH,
    totalNewItem_AVG_SOLD,
    setMainImg,
    record,
    setRecord,
    mainImg,
    graphDropdownSelectedYear,
    graphLoading,
    graphAllYearData,
    monthLine,
    monthLinePrv,
    pieChart,
    COLORS,
    maxVal,
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
    suggest,
    setSelectedSold,
    setWatchDoginfo,
    setitemRank,
    setnewitemRank,
    InfoItemOb,
    watchDoginfo,
    setGraphDropdownSelectedYear,
    monthlyData,
    selectedSold,
    soldPercentageHandler,
    selectedSoldPercentage,
    loadingsoldP,
    YoYEachMonth,
    YoYEachMonth2,
    YoYEachMonth3,
    YoYEachMonth4,
    YoYEachMonth5,
    YoYEachMonth6,
    YoYEachMonth7,
    YoYEachMonth8,
    YoYEachMonth9,
    YoYEachMonth10,
    YoYEachMonth11,
    YoYEachMonth12,
    YoY6,
    YoY5,
    YoY4,
    YoY3,
    YoY2,
    YoY,
    lastyearRCVQty6,
    lastyearRCVQty5,
    lastyearRCVQty4,
    lastyearRCVQty3,
    lastyearRCVQty2,
    lastyearRCVQty,
    startDatePicker,
    setStartDatePicker,
    itemRank,
    endDatePicker,
    forecastDatePicker,
    newitemRank,
    newitemLoading,
    setForecasteDatePicker,
    itemLoading,
    setEndDatePicker,
    colorTotal,
    Difference_In_Days2,

    loading,
    onHandTotal,
    reOrderTotal,
    pendingTotal,
    loadingDatePicker,
    calendarQtyTotal,
    calendarBOTotal,
    sold30Total,
    sold90Total,
    sold365Total,
    avg_sold365Total,
    avg_lead_timeTotal,
    suggestedQtyTotal,
    oh_forecastTotal,
    result2,
    eachItemClick,
    neededTotal,
    totalNewItem_365_Sold,
    totalNew_SuggestedOH,
    itemAlertOld,
    loadingAlert,
    itemFirstOrder,
    itemNewOrder,
    itemoldOrder,
    loadingOldOrder,
    loadingNewOrder,
    loadingFirstOrder,
    newitemkey2Forecast,
    newitemkey2ForecastAPI,
    NewItem_Qty_avg,
    suggestedOHForNewItem,
    ForecastloadingDatePicker,
    selforecastDatePicker,
    itemFirstOrderAPI,
    loadedFirstOrder,
    itemNewOrderAPI,
    loadedNewOrder,
    itemoldOrderAPI,
    loadedOldOrder,
    setIsOpenM,
    isOpenM,
    inputRef,
    handleInputChange,
    inputValue,
    setInputValue,
    daysDifference,
  };

  return (
    <div className="flex w-full p-4 overflow-scroll" >
      <Total {...Props} />

      <div id={'section-to-print'}>
        <table id="tb1" className="table1">
          <tbody>
            <Row1 {...Props} />
            <Row2 InfoItemOb={InfoItemOb} watchDoginfo={watchDoginfo} />
            <Row3 InfoItemOb={InfoItemOb} watchDoginfo={watchDoginfo} />
            <Row4 InfoItemOb={InfoItemOb} mainData={mainData} />
            <Row5 InfoItemOb={InfoItemOb} watchDoginfo={watchDoginfo} />
            <Row6 InfoItemOb={InfoItemOb} watchDoginfo={watchDoginfo} />
            <Row7 {...Props} />
            <Row8 {...Props} />
            <Row9 {...Props} />
            <Row10 {...Props} />
            <Row11 {...Props} />
            <Row12 {...Props} />
          </tbody>

          <SubTable {...Props} />

          <MainTable {...Props} searchLength={mainData.length} />
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
        {/* <button onClick={printTable}>Print</button> */}
        <Alert_Table {...Props} />
        {/* <TreeViewDownload handleDownload17={handleDownload17} /> */}
      </div>
    </div>
  );
};

export default Watchdog;
