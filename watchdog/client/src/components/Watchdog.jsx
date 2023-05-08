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
import useMath from '../utils/math/Math';
import SubTable from './body_table/SubTable';
import Alert_Table from './alert_table/Alert_Table';

const Watchdog = () => {
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
    handleDownload17,
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
  } = useAPIData(startDatePicker, endDatePicker, forecastDatePicker);

  const { round } = useMath();


  // toggle Color Tab
  const [isOpen, setIsOpen] = useState(false);

  const printableRef = useRef(null);

  function printTable() {
    const table = document.getElementById('tb1');
    const win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write(
      '<style>table {width: 100%; border-collapse: collapse;} td, th {border: 1px solid black; padding: 5px;} </style>'
    );
    win.document.write('</head><body>');

    win.document.write(table.outerHTML);
    win.document.write('</body></html>');

    win.print();
    win.close();
  }
 

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
  const [totalNewItem_365_Sold, setTotalNewItem_365_Sold] = useState(0);
  const [totalNewItem_AVG_SOLD, setTotalNewItem_AVG_SOLD] = useState(0);
  const [totalNew_SuggestedOH, setTotalNew_SuggestedOH] = useState(0);

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
  

  const onhandCal2 = mainData.map((item) => Number(item.onhand));
  const QtyBackOrder = mainData.map((item) =>
    item.reorderPointO.map((item) => Number(item.qtybo))
  );

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
    item.sold30.map((item) => Number(item.qtyshp / 30))
  );

  const multipliedData2 = zipWith(
    Cal302,
    Difference_In_PostDayresult2,
    (arr1, arr2) => arr1.map((elem) => elem * arr2)
  );

  const Cal602 = mainData.map((item) =>
    item.sold60.map((item) => Number(item.qtyshp / 60))
  );

  const multipliedData3 = zipWith(
    Cal602,
    Difference_In_PostDayresult2,
    (arr1, arr2) => arr1.map((elem) => elem * arr2)
  );

  const Cal902 = mainData.map((item) =>
    item.sold90.map((item) => Number(item.qtyshp / 90))
  );
  const multipliedData4 = zipWith(
    Cal902,
    Difference_In_PostDayresult2,
    (arr1, arr2) => arr1.map((elem) => elem * arr2)
  );

  const Cal3652f = mainData.map((item) =>
    item.sold365.map((item) => Number(item.qtyshp))
  );
  const Cal3652 = zipWith(Cal3652f, QtyBackOrder, (a, b) =>
    zipWith(a, b, (c, d) => {
      return (c + d) / 365;
    })
  );

  const multipliedData5 = zipWith(
    Cal3652,
    Difference_In_PostDayresult2,
    (arr1, arr2) => arr1.map((elem) => elem * arr2)
  );

  const oldNeededCal =
    Difference_In_PostDayresult2 <= 30
      ? zipWith(onhnadWithRVG2, multipliedData, (arr1, arr2) =>
          arr2.map((elem) => round(arr1 - elem))
        )
      : Difference_In_PostDayresult2 <= 30
      ? zipWith(onhnadWithRVG2, multipliedData2, (arr1, arr2) =>
          arr2.map((elem) => round(arr1 - elem))
        )
      : Difference_In_PostDayresult2 > 30 && Difference_In_PostDayresult2 <= 60
      ? zipWith(onhnadWithRVG2, multipliedData3, (arr1, arr2) =>
          arr2.map((elem) => round(arr1 - elem))
        )
      : Difference_In_PostDayresult2 > 60 && Difference_In_PostDayresult2 < 90
      ? zipWith(onhnadWithRVG2, multipliedData4, (arr1, arr2) =>
          arr2.map((elem) => round(arr1 - elem))
        )
      : zipWith(onhnadWithRVG2, multipliedData5, (arr1, arr2) =>
          arr2.map((elem) => round(arr1 - elem))
        );

  const [neededTotal, set_NeededTotal] = useState(0);
  const [NewneededTotal, set_New_NeededTotal] = useState(0);

  const forecastDate = forecastDatePicker;

  const daysDifference = Math.round(
    (forecastDate.getTime() - date.getTime()) / (1000 * 3600 * 24)
  );

  const onHandInventory = mainData.map((item) => Number(item.onhand));
  

  const dayCal = mainData.map((item) =>
    item.sold30.map((item) => Number(item.qtyshp / 30) * daysDifference)
  );

  const onhnadWithRVG = zipWith(
    onHandInventory,
    sumReqForcast,
    (x, y) => x + y
  ).map((num) => round(num));

  const Cal30 = mainData.map((item) =>
    item.sold30.map((item) => Number(item.qtyshp / 30) * daysDifference)
  );

  const Cal60 = mainData.map((item) =>
    item.sold60.map((item) => Number(item.qtyshp / 60) * daysDifference)
  );

  const Cal90 = mainData.map((item) =>
    item.sold90.map((item) => Number(item.qtyshp / 90) * daysDifference)
  );

  const Cal365f = mainData.map((item) =>
    item.sold365.map((item) => Number(item.qtyshp))
  );
  const Cal365 = zipWith(Cal365f, QtyBackOrder, (a, b) =>
    zipWith(a, b, (c, d) => {
      return ((c + d) / 365) * daysDifference;
    })
  );

  const oldOH_Forecast_Left =
    daysDifference <= 30
      ? zipWith(onhnadWithRVG, dayCal, (x, y) => round(x - y))
      : daysDifference <= 30
      ? zipWith(onhnadWithRVG, Cal30, (x, y) => round(x - y))
      : daysDifference > 30 && daysDifference <= 60
      ? zipWith(onhnadWithRVG, Cal60, (x, y) => round(x - y))
      : daysDifference > 60 && daysDifference < 90
      ? zipWith(onhnadWithRVG, Cal90, (x, y) => round(x - y))
      : zipWith(onhnadWithRVG, Cal365, (x, y) => round(x - y));
  
   
        
  //huu
  const startDateToTime = mainData
    .filter((item) => item.start_dte)
    .map((item) => new Date(item.start_dte).getTime())
    .sort((a, b) => a - b)[0];

  const gapTime = startDateToTime - date.getTime();
  const gapTimeCal = gapTime / (1000 * 3600 * 24);
  const gapTimeMath = Math.abs(Math.round(gapTimeCal));

  const NewItem_Qty_avg = newitemkey2Forecast.map((item) =>
    item.newitemkeyForecast.map(
      (item) => (item.total_qty_difference + item.qtybo) / gapTimeMath
    )
  );


  //duplicated
  const suggestedQtyavg_lead2 = mainData.map((item) =>
    item.poLeadTimeO.map((item) => Number(item.avg_lead_time))
  );

  const suggestedOHForNewItem = zipWith(
    NewItem_Qty_avg,
    suggestedQtyavg_lead2,
    (qty, lead) => qty * lead
  ).reduce((acc, curr) => acc.concat(curr), []);

  //OH_FORECAST for New Item
  const forecastDate2 = forecastDatePicker;
  const daysDifference2 = Math.round(
    (forecastDate2 - date.getTime()) / (1000 * 3600 * 24)
  );

  const onHandInventory2 = mainData.map((item) => Number(item.onhand));

  const onhnadWithRVG3 = zipWith(
    onHandInventory2,
    sumReqForcast,
    (x, y) => x + y
  ).map((num) => round(num));

  const dayCal223 = newitemkey2Forecast.map(
    (item) =>
      item.newitemkeyForecast.map(
        (item) => (item.total_qty_difference + item.qtybo) / gapTimeMath
      ) * daysDifference
  );

  const dayCal224 = newitemkey2Forecast.map((item) =>
    item.newitemkeyForecast.map(
      (item) => (item.total_qty_difference + item.qtybo) / gapTimeMath
    )
  );

  const NewOH_ForecastLeft = zipWith(onhnadWithRVG3, dayCal223, (x, y) =>
    round(x - y)
  );
 

  const NewOH_ForecastRight = zipWith(
    NewItem_Qty_avg,
    suggestedQtyavg_lead2,
    NewOH_ForecastLeft,
    (qty, lead, am) => qty * lead - am
  ).reduce((acc, curr) => acc.concat(curr), []);

  //new Item Needed
  const eachItemNeededDate2 = mainData.map((item) =>
    item.poLeadTimeO.length
      ? item.poLeadTimeO.map((item2) =>
          new Date(formatDate(item2.avg_lead_time)).getTime()
        ) - date.getTime()
      : undefined
  );
  const Difference_In_PostDayresult3 = eachItemNeededDate2.map((item) =>
    round(item / (1000 * 3600 * 24))
  );

  const multipliedData32 = zipWith(
    dayCal224,
    Difference_In_PostDayresult3,
    (arr1, arr2) => arr1 * arr2
  );

  const Difference_In_PostDecimalDayresult2 = eachItemNeededDate2.map(
    (item) => Math.round((item / (1000 * 3600 * 24) / 30) * 10) / 10
  );

  const poPoendingData2 = mainData.map((item, idx) =>
    item.pendingDataO.length
      ? item.pendingDataO.map((item2) => item2.pending)
      : undefined
  );

  const onhnadWithRVG22 = zipWith(onHandInventory2, poPoendingData2, (x, y) =>
    round(add(x, y))
  );

  const NewNeededCal = zipWith(
    onhnadWithRVG22,
    multipliedData32,
    (arr1, arr2) => round(arr1 - arr2)
  );

  const [oh_forecastTotal, setoh_forecastTotal] = useState(0);
  const [new_oh_forecastTotal, setNew_oh_forecastTotal] = useState(0);

  const FosuggestedQty = zipWith(
    suggestedQtyavg_qty,
    suggestedQtyavg_lead,
    oldOH_Forecast_Left,
    (qty, lead, am) => qty * lead - am
  ).reduce((acc, curr) => acc.concat(curr), []);

  
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
    FosuggestedQty,
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
    filteredData,
    mainImg,
    graphDropdownSelectedYear,
    graphLoading,
    graphAllYearData,
    monthLine,
    monthLinePrv,
    pieChart,
    COLORS,
    maxVal,
    setfilteredData,
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
    daysDifference,
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
  };

  return (
    <div className="search flex w-full p-4">
      <Total {...Props} />

      <div ref={printableRef}>
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
