import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import '../styles/common.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'semantic-ui-css/semantic.min.css';
import ColorTab from './ColorTab';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { zipWith, sumBy } from 'lodash';
import Table3Total from './math/Table3Total';
import Row1 from './first_table/Row1';
import MainTable from './third_table/MainTable';
import Row2 from './first_table/Row2';
import Row3 from './first_table/Row3';
import Row4 from './first_table/Row4';
import Row5 from './first_table/Row5';
import Row6 from './first_table/Row6';
import Row7 from './first_table/Row7';
import Row8 from './first_table/Row8';
import Row9 from './first_table/Row9';
import useAPIData from '../apis/API';

const BASE_URL = import.meta.env.VITE_DB_URL;

const SearchPage = () => {
  const [record, setRecord] = useState('');
  const [startDatePicker, setStartDatePicker] = useState(new Date());
  const [endDatePicker, setEndDatePicker] = useState(new Date());
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
    handleDownload17,
    pieChart,
    pieChartF,
  } = useAPIData(record, startDatePicker, endDatePicker);

  const round = (num) => (isNaN(num) ? 0 : Math.round(num));

  const [forecastDatePicker, setForecasteDatePicker] = useState(new Date());

  // toggle Color Tab
  const [isOpen, setIsOpen] = useState(false);

  //searchSuggest
  const [suggest, setSuggest] = useState([]);
  const [filteredData, setfilteredDate] = useState([]);

  //DATE buttonSearch console
  const getDate = (day) => {
    const date = new Date();
    date.setDate(date.getDate() - day);
    return date.toISOString().split('T')[0];
  };
  const date = new Date();
  const past30c = getDate(30);
  const past90c = getDate(90);
  const past365c = getDate(365);

  const [selectedSold, setSelectedSold] = useState('');
  const soldPercentageHandler = (e) => {
    const soldPercentageDropdownValue = e.target.value;
    setSelectedSold(soldPercentageDropdownValue);
  };

  //dropdownlist list reset
  const reset = () => {
    setSelectedSold([]);
    setGraphDropdownSelectedYear([]);
    setWatchDoginfo([]);
    setitemRank([]);
    setnewitemRank([]);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleButton();
    }
  };

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
  const date3 = endDatePicker;
  const date4 = startDatePicker;

  const Difference_In_Time2 = date4.getTime() - date3.getTime();
  const Difference_In_Days2 = Difference_In_Time2 / (1000 * 3600 * 24);

  //PRL
  const filteredItemsP = mainData.map((item) => item.mincost && item.maxcost);

  const filteredItemsPWithoutZero = filteredItemsP.filter(
    (value) => value !== null
  );

  const PRLmin = Math.min(...filteredItemsPWithoutZero);

  const PRLmax = Math.max(...filteredItemsP);

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
  const [max_leadtimeTotal, setmax_leadtimeTotal] = useState(0);
  const [BO_lastRCVTotal, setBO_lastRCVTotal] = useState(0);

  const suggestedQtyavg_qty = mainData.map((item) =>
    item.reorderPointO.map((item) => Number(item.avg_qtyshp))
  );
  const suggestedQtyavg_lead = mainData.map((item) =>
    item.poLeadTimeO.map((item) => Number(item.avg_lead_time))
  );
  const suggestedBo = mainData.map((item) =>
    item.bofromLastRcvO.map((item) => Number(item.qtybo))
  );

  const suggestedQty = zipWith(
    suggestedQtyavg_qty,
    suggestedQtyavg_lead,
    suggestedBo,
    (qty, lead, bo) => qty * lead + bo
  ).reduce((acc, curr) => acc.concat(curr), []);

  const [suggestedQtyTotal, setsuggestedQtyTotal] = useState(0);

  //forecast
  const [selforecastDatePicker, setselforecastDatePicker] = useState([]);

  useEffect(() => {
    const fetchData4 = async () => {
      if (mainData.length === 0) {
        return;
      }

      const searchedRecord = record.toLowerCase();
      const endDate = forecastDatePicker.toISOString().split('T')[0];

      const response = await axios.get(
        `${BASE_URL}poForecast?descrip=${searchedRecord}&endDate=${endDate}`
      );
      setselforecastDatePicker(response.data);
    };
    fetchData4();
  }, [forecastDatePicker, mainData]);

  const sumReqForcast = selforecastDatePicker.map((item) =>
    sumBy(item.poForecast, 'ORDEREDa')
  );

  const postDay = forecastDatePicker;
  const Difference_In_PostDay = postDay.getTime() - date.getTime();

  const Difference_In_PostDayresult = round(
    Difference_In_PostDay / (1000 * 3600 * 24)
  );

  const Difference_In_PostDecimalDayresult =
    Math.round((Difference_In_PostDayresult / 30) * 100) / 100;

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
    suggestedBo,
    amounts,
    (qty, lead, bo, am) => qty * lead + bo - am
  ).reduce((acc, curr) => acc.concat(curr), []);

  const [foSuggestedTotal, setfoSuggestedTotal] = useState(0);
  //new or old item
  const newOrOld = () => {
    if (mainData.length === 0) {
      return;
    }
    if (
      mainData
        .filter((item) => item.start_dte)

        .map(
          (item) => new Date(item.start_dte).toISOString().split('T')[0]
        )[0] > past365c
    ) {
      return 'NEW';
    } else {
      return 'OLD';
    }
  };

  return (
    <div className="search flex w-full p-4">
      <Table3Total
        mainData={mainData}
        watchDoginfo2={watchDoginfo2}
        selectedDatePicker={selectedDatePicker}
        suggestedQty={suggestedQty}
        amounts={amounts}
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
        setmax_leadtimeTotal={setmax_leadtimeTotal}
        setBO_lastRCVTotal={setBO_lastRCVTotal}
        setsuggestedQtyTotal={setsuggestedQtyTotal}
        setoh_forecastTotal={setoh_forecastTotal}
        setfoSuggestedTotal={setfoSuggestedTotal}
      />
      <div>
        <table id="tb1" className="table1">
          <tbody>
            <Row1
              record={record}
              setRecord={setRecord}
              suggest={suggest}
              setSuggest={setSuggest}
              filteredData={filteredData}
              handleKeyPress={handleKeyPress}
              mainImg={mainImg}
              graphDropdownSelectedYear={graphDropdownSelectedYear}
              graphLoading={graphLoading}
              graphAllYearData={graphAllYearData}
              monthLine={monthLine}
              monthLinePrv={monthLinePrv}
              pieChart={pieChart}
              COLORS={COLORS}
              maxVal={maxVal}
              setfilteredDate={setfilteredDate}
              handleButton={handleButton}
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

            <tr className="row10">
              <InfoItemOb className="infoCol1" name="ST_DATE" />

              <td className="stDate" colSpan="3">
                {
                  mainData
                    .filter((item) => item.start_dte)

                    .map(
                      (item) =>
                        new Date(item.start_dte).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <></>

              <td>REORD:</td>
              <td>{watchDoginfo.map((item) => item.ReordShp)}</td>
              <td style={{ background: '#f0e68c' }}>RCV_QTY</td>

              <td>
                {mainData.length ? (
                  graphDropdownSelectedYear.length ? (
                    graphLoading === false ? (
                      graphDropdownSelectedYear.length ? (
                        <>
                          {graphDropdownSelectedYear === 'YEAR' ? (
                            lastyearRCVQty6
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthlyData.map((item) => item.qtyrec)[0]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthlyData.map((item) => item.qtyrec)[1]}
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )
                  ) : graphLoading === false ? (
                    <>{lastyearRCVQty6}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </td>
              <td>
                {mainData.length ? (
                  graphDropdownSelectedYear.length ? (
                    graphLoading === false ? (
                      graphDropdownSelectedYear.length ? (
                        <>
                          {graphDropdownSelectedYear === 'YEAR' ? (
                            lastyearRCVQty5
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthlyData.map((item) => item.qtyrec)[2]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthlyData.map((item) => item.qtyrec)[3]}
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )
                  ) : graphLoading === false ? (
                    <>{lastyearRCVQty5}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </td>
              <td>
                {mainData.length ? (
                  graphDropdownSelectedYear.length ? (
                    graphLoading === false ? (
                      graphDropdownSelectedYear.length ? (
                        <>
                          {graphDropdownSelectedYear === 'YEAR' ? (
                            lastyearRCVQty4
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthlyData.map((item) => item.qtyrec)[4]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthlyData.map((item) => item.qtyrec)[5]}
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )
                  ) : graphLoading === false ? (
                    <>{lastyearRCVQty4}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </td>
              <td>
                {mainData.length ? (
                  graphDropdownSelectedYear.length ? (
                    graphLoading === false ? (
                      graphDropdownSelectedYear.length ? (
                        <>
                          {graphDropdownSelectedYear === 'YEAR' ? (
                            lastyearRCVQty3
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthlyData.map((item) => item.qtyrec)[6]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthlyData.map((item) => item.qtyrec)[7]}
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )
                  ) : graphLoading === false ? (
                    <>{lastyearRCVQty3}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </td>
              <td>
                {mainData.length ? (
                  graphDropdownSelectedYear.length ? (
                    graphLoading === false ? (
                      graphDropdownSelectedYear.length ? (
                        <>
                          {graphDropdownSelectedYear === 'YEAR' ? (
                            lastyearRCVQty2
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthlyData.map((item) => item.qtyrec)[8]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthlyData.map((item) => item.qtyrec)[9]}
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )
                  ) : graphLoading === false ? (
                    <>{lastyearRCVQty2}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </td>
              <td>
                {mainData.length ? (
                  graphDropdownSelectedYear.length ? (
                    graphLoading === false ? (
                      graphDropdownSelectedYear.length ? (
                        <>
                          {graphDropdownSelectedYear === 'YEAR' ? (
                            lastyearRCVQty
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthlyData.map((item) => item.qtyrec)[10]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthlyData.map((item) => item.qtyrec)[11]}
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )
                  ) : graphLoading === false ? (
                    <>{lastyearRCVQty}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </td>
            </tr>

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
              <td
                className="prv30"
                style={{ background: '#f4a460', fontSize: '10px' }}
              >
                OH_FORECAST
              </td>
              <td></td>
            </tr>

            <tr className="row12">
              <td className="newOrOld">{newOrOld()}</td>

              <td>GRADE</td>
              <>
                {itemRank.length ? (
                  itemLoading === false || newitemLoading === false ? (
                    itemRank
                      .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                      .filter((item) => item.percentile)
                      .map((item) => item.percentile * 100)[0] > 98 ||
                    itemRank
                      .flatMap((item) => [item].concat(item.rankRB ?? []))
                      .filter((item) => item.percentile)
                      .map((item) => item.percentile * 100)[0] > 98 ||
                    newitemRank
                      .flatMap((item) => [item].concat(item.descrip ?? []))
                      .filter((item) => item.percentile)
                      .map((item) => item.percentile * 100)[0] > 98 ? (
                      <td style={{ background: '#90ee90', fontWeight: 'bold' }}>
                        A+
                      </td>
                    ) : itemRank
                        .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 93 ||
                      itemRank
                        .flatMap((item) => [item].concat(item.rankRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 93 ||
                      newitemRank
                        .flatMap((item) => [item].concat(item.descrip ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 93 ? (
                      <td style={{ background: '#90ee90', fontWeight: 'bold' }}>
                        A
                      </td>
                    ) : itemRank
                        .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 90 ||
                      itemRank
                        .flatMap((item) => [item].concat(item.rankRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 90 ||
                      newitemRank
                        .flatMap((item) => [item].concat(item.descrip ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 90 ? (
                      <td style={{ background: '#90ee90', fontWeight: 'bold' }}>
                        A-
                      </td>
                    ) : itemRank
                        .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 87 ||
                      itemRank
                        .flatMap((item) => [item].concat(item.rankRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 87 ||
                      newitemRank
                        .flatMap((item) => [item].concat(item.descrip ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 87 ? (
                      <td style={{ background: '#87cefa', fontWeight: 'bold' }}>
                        B+
                      </td>
                    ) : itemRank
                        .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 83 ||
                      itemRank
                        .flatMap((item) => [item].concat(item.rankRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 83 ||
                      newitemRank
                        .flatMap((item) => [item].concat(item.descrip ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 83 ? (
                      <td style={{ background: '#87cefa', fontWeight: 'bold' }}>
                        B
                      </td>
                    ) : itemRank
                        .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 80 ||
                      itemRank
                        .flatMap((item) => [item].concat(item.rankRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 80 ||
                      newitemRank
                        .flatMap((item) => [item].concat(item.descrip ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 80 ? (
                      <td style={{ background: '#87cefa', fontWeight: 'bold' }}>
                        B-
                      </td>
                    ) : itemRank
                        .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 77 ||
                      itemRank
                        .flatMap((item) => [item].concat(item.rankRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 77 ||
                      newitemRank
                        .flatMap((item) => [item].concat(item.descrip ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 77 ? (
                      <td style={{ background: '#ffa500', fontWeight: 'bold' }}>
                        C+
                      </td>
                    ) : itemRank
                        .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 73 ||
                      itemRank
                        .flatMap((item) => [item].concat(item.rankRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 73 ||
                      newitemRank
                        .flatMap((item) => [item].concat(item.descrip ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 73 ? (
                      <td style={{ background: '#ffa500', fontWeight: 'bold' }}>
                        C
                      </td>
                    ) : itemRank
                        .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 70 ||
                      itemRank
                        .flatMap((item) => [item].concat(item.rankRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 70 ||
                      newitemRank
                        .flatMap((item) => [item].concat(item.descrip ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 70 ? (
                      <td style={{ background: '#ffa500', fontWeight: 'bold' }}>
                        C-
                      </td>
                    ) : itemRank
                        .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 67 ||
                      itemRank
                        .flatMap((item) => [item].concat(item.rankRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 67 ||
                      newitemRank
                        .flatMap((item) => [item].concat(item.descrip ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 67 ? (
                      <td style={{ background: '#ff4500', fontWeight: 'bold' }}>
                        D+
                      </td>
                    ) : itemRank
                        .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 63 ||
                      itemRank
                        .flatMap((item) => [item].concat(item.rankRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 63 ||
                      newitemRank
                        .flatMap((item) => [item].concat(item.descrip ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 63 ? (
                      <td style={{ background: '#ff4500', fontWeight: 'bold' }}>
                        D
                      </td>
                    ) : itemRank
                        .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 60 ||
                      itemRank
                        .flatMap((item) => [item].concat(item.rankRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 60 ||
                      newitemRank
                        .flatMap((item) => [item].concat(item.descrip ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] > 60 ? (
                      <td style={{ background: '#ff4500', fontWeight: 'bold' }}>
                        D-
                      </td>
                    ) : itemRank
                        .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] <= 60 ||
                      itemRank
                        .flatMap((item) => [item].concat(item.rankRB ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] <= 60 ||
                      newitemRank
                        .flatMap((item) => [item].concat(item.descrip ?? []))
                        .filter((item) => item.percentile)
                        .map((item) => item.percentile * 100)[0] <= 60 ? (
                      <td style={{ background: '#c0c0c0', fontWeight: 'bold' }}>
                        F
                      </td>
                    ) : (
                      <>Loading...</>
                    )
                  ) : (
                    <>Loading...</>
                  )
                ) : itemLoading === false || newitemLoading === false ? (
                  <td></td>
                ) : (
                  <>Loading...</>
                )}
              </>

              <></>

              <td>
                Vend:{' '}
                {
                  mainData.map((item) =>
                    item.reorderPointO.map((item) => item.vendno)
                  )[0]
                }
              </td>
              <></>

              <td colSpan="2">
                <DatePicker
                  className="border-2 border-zinc-500 text-center text-"
                  selected={endDatePicker}
                  onChange={(date) => setEndDatePicker(date)}
                />
              </td>
              <td className="prv30">
                {new Date().toISOString().split('T')[0]}
              </td>
              <td className="prv90">
                {new Date().toISOString().split('T')[0]}
              </td>
              <td className="prv365">
                {new Date().toISOString().split('T')[0]}
              </td>

              <td></td>

              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {/* forecast datepicker */}
                <DatePicker
                  className="w-20 border-2 border-zinc-500 text-center text-sm"
                  minDate={new Date()}
                  maxDate={new Date().setDate(new Date().getDate() + 365)}
                  selected={forecastDatePicker}
                  onChange={(date) => setForecasteDatePicker(date)}
                />
              </td>
              <td></td>
            </tr>
          </tbody>

          <tbody id="tb2" className="table2">
            <tr>
              <td>CLRS:{colorTotal}</td>
              <td>OH</td>

              <td style={{ background: '#f4a460' }}>REORDER</td>
              <td>PENDING</td>

              <td colSpan={2}>{Math.floor(Difference_In_Days2)} days</td>
              <td>SOLD30</td>
              <td>SOLD90</td>
              <td>SOLD365</td>
              <td style={{ fontSize: '12px' }}>AVG_SOLD(1Y)</td>
              <td>AVG_LEAD</td>
              <td>MAX_LEAD</td>
              <td>BO_lastRCV</td>
              <td>Suggested</td>
              <td>+{Difference_In_PostDayresult} days</td>
              <td>FoSuggested</td>
            </tr>
          </tbody>

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
            max_leadtimeTotal={max_leadtimeTotal}
            BO_lastRCVTotal={BO_lastRCVTotal}
            suggestedQty={suggestedQty}
            suggestedQtyTotal={suggestedQtyTotal}
            amounts={amounts}
            oh_forecastTotal={oh_forecastTotal}
            FosuggestedQty={FosuggestedQty}
            foSuggestedTotal={foSuggestedTotal}
            result2={result2}
            eachItemClick={eachItemClick}
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

      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="1" label="ItemReorderAlert">
          <TreeItem
            nodeId="2"
            label="ItemReorderList.xlsx"
            onClick={handleDownload17}
          />
        </TreeItem>
      </TreeView>
    </div>
  );
};

export default SearchPage;
