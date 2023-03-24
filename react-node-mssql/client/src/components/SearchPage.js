import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tableAll.css';
import BlankPage from './BlankPage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'semantic-ui-css/semantic.min.css';

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from 'recharts';
import ColorTab from './ColorTab';

var _ = require('lodash');
// or less ideally

export const SearchPage = () => {
  const [search, setSearch] = useState([]);
  const [record, setRecord] = useState([]);
  const [imageClicked, setImageClicked] = useState();
  const [startDatePicker, setStartDatePicker] = useState(new Date());
  const [endDatePicker, setEndDatePicker] = useState(new Date());
  const [forecastDatePicker, setForecasteDatePicker] = useState(new Date());
  const round = (num) => (isNaN(num) ? 0 : Math.round(num));

  // toggle Color Tab
  const [isOpen, setIsOpen] = useState(false);

  //searchSuggest

  const [suggest, setSuggest] = useState([]);
  const itemData = async () => {
    return await axios
      .get('http://192.168.16.220:8082/searchAuto')
      .then((response) => setSuggest(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    itemData();
  }, []);

  const [filteredData, setfilteredDate] = useState([]);
  const handleFilter = (e) => {
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

  const onSearch =  (record1) => {
    setRecord(record1); // set the input value to the clicked suggestion
    setfilteredDate([]);   

  onClickImageHandler(record1);
  };

  

  

  



  //DATE buttonSearch console
  const date = new Date();
  const curDate = date.toISOString().split('T')[0];
  const past30 = new Date();
  past30.setDate(past30.getDate() - 30);
  const past30c = past30.toISOString().split('T')[0];
  const past90 = new Date();
  past90.setDate(past90.getDate() - 90);
  const past90c = past90.toISOString().split('T')[0];
  const past365 = new Date();
  past365.setDate(past365.getDate() - 365);
  const past365c = past365.toISOString().split('T')[0];

  //POS select String to Array
  const [selectedItem, setSelectedItem] = useState('');

  const handleChange = (e) => {
    let value = e.target.value;
    setSelectedItem(value);
  };

  const test2 =
    selectedItem == 'POS_'
      ? search
          .flatMap((item) => [item].concat(item.first ?? []))
          .map((item) => item)
      : search.flatMap((item) =>
          item.first
            .filter(
              (item2) =>
                item2.purno && item2.purno.trim() === String(selectedItem)
            )
            .concat(
              item.second.filter(
                (item2) =>
                  item2.purno && item2.purno.trim() === String(selectedItem)
              )
            )
            .concat(
              item.third.filter(
                (item2) =>
                  item2.purno && item2.purno.trim() === String(selectedItem)
              )
            )
            .concat(
              item.fourth.filter(
                (item2) =>
                  item2.purno && item2.purno.trim() === String(selectedItem)
              )
            )
            .concat(
              item.fifth.filter(
                (item2) =>
                  item2.purno && item2.purno.trim() === String(selectedItem)
              )
            )
            .concat(
              item.sixth.filter(
                (item2) =>
                  item2.purno && item2.purno.trim() === String(selectedItem)
              )
            )
        );

  const mergeByKey = search.map((itm) => ({
    ...test2.find((item) => item.itemkey2 === itm.itemkey2 && item),
    ...itm,
  }));

  // console.log(test2);
  // console.log(search)

  //pos_ dropdown data list
  //console.log(selectedItem)

  //DataPick regarding option value
  const [loadingDatapick, setLoadingDatapick] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    if (selectedItem.length === 0) {
      return;
    }

    const fetchData = async () => {
      const searchedRecord = record.toLowerCase();
      const curDate = new Date().toISOString().split('T')[0];
      const endDate = curDate;

      const startDate = test2.map(
        (item) => new Date(item.recdate).toISOString().split('T')[0]
      )[0];

      setLoadingDatapick(true);
      const response = await axios.get(
        `http://192.168.16.220:8082/dataPick?descrip=${searchedRecord}&startDate=${startDate}&endDate=${endDate}`
      );
      setSelectedData(response.data);
      setLoadingDatapick(false);
    };

    fetchData();
  }, [selectedItem]);

  //data from dataPick
  //console.log(selectedData);

  //select & option dropdown soldPercentage
  const [selectedSoldPercentage, setSelectedSoldPercentage] = useState([]);
  const [loadingsoldP, setloadingsoldP] = useState(false);

  const fetchData3 = async () => {
    const searchedRecord = record.toLowerCase();
    setloadingsoldP(true);
    await axios
      .get(
        `http://192.168.16.220:8082/soldPercentage?descrip=${searchedRecord}`
      )

      .then((response) => {
        setSelectedSoldPercentage(response.data);
        setloadingsoldP(false);
      });
  };

  const [selectedSold, setSelectedSold] = useState('');

  const soldPercentageHandler = (e) => {
    const value = e.target.value;
    setSelectedSold(value);
  };

  //dropdownlist list reset
  const reset = () => {
    setSelectedItem([]);
    setSelectedData([]);
    setSelectedSold([]);
    setValue2([]);
    WDsetSearch([]);
  };

  //all data
  //console.log(search);

  //datepicker between two dates
  const [selectedDatePicker, setSelectedDatePicker] = useState([]);
  const [loadingDatePicker, setloadingDatePicker] = useState(false);
  useEffect(() => {
    const fetchData2 = async () => {
      if (search.length === 0) {
        return;
      }

      const searchedRecord = record.toLowerCase();
      const endDate = endDatePicker.toISOString().split('T')[0];

      const startDate = startDatePicker.toISOString().split('T')[0];

      setloadingDatePicker(true);
      const response = await axios.get(
        `http://192.168.16.220:8082/datePicker?descrip=${searchedRecord}&startDate=${startDate}&endDate=${endDate}`
      );
      setSelectedDatePicker(response.data);
      setloadingDatePicker(false);
    };
    fetchData2();
  }, [startDatePicker, endDatePicker, search]);

  //image handler
  const onClickImageHandler = (record1) => {
    setImageClicked(`http://img.vanessahair.com/sales/${record1}.jpg`);
  };

  // const [productData, setProductData] = useState([]);
  //   const itemData = async () => {
  //     return await axios
  //       .get('http://localhost:8082/mergeData')
  //       .then((response) => setProductData(response.data))
  //       .catch((err) => console.log(err));
  //   };

  //    useEffect(() => {
  //      itemData();
  //    }, [productData]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const record1 = onSearch(record1);
      

      searchRecords();
      onClickImageHandler(record1);
      reset();
      itemRecords();
      fetchData3();
      graphLineF();
      graphLineByMonthF();
      graphByItemF();
      graphByItemMonthF();
      WDsearchRecords();
      WDsearchRecords2();
      setfilteredDate([]);
      
    }
  };

  const [loading, setLoading] = useState(false);

  const searchRecords = () => {
    const searchedRecord = record.toLowerCase();

    setLoading(true);
    axios
      .get(`http://192.168.16.220:8082/mergeData?descrip=${searchedRecord}`)

      .then((response) => {
        setSearch(response.data);
        setLoading(false);
      });
  };

  const [WDloading, WDsetLoading] = useState(false);
  const [WDsearch, WDsetSearch] = useState([]);
  const WDsearchRecords = () => {
    const searchedRecord = record.toLowerCase();

    WDsetLoading(true);
    axios
      .get(
        `http://192.168.16.220:8082/WatchDog/WDInfo?search=${searchedRecord}&user=undefined/`
      )

      .then((response) => {
        WDsetSearch(response.data);
        WDsetLoading(false);
      });
  };

  const [WDloading2, WDsetLoading2] = useState(false);
  const [WDsearch2, WDsetSearch2] = useState([]);
  const WDsearchRecords2 = () => {
    const searchedRecord = record.toLowerCase();

    WDsetLoading2(true);
    axios
      .get(
        `http://192.168.16.220:8082/WatchDog/ColorList?search=${searchedRecord}`
      )

      .then((response) => {
        WDsetSearch2(response.data);
        WDsetLoading2(false);
      });
  };

  //itemrank
  const [itemRank, setitemRank] = useState([]);
  const [itemLoading, setitemLoading] = useState(false);

  const itemRecords = async () => {
    const searchedRecord = record.toLowerCase();
    setitemLoading(true);
    await axios
      .get(`http://192.168.16.220:8082/itemRank?descrip=${searchedRecord}`)

      .then((response) => {
        setitemRank(response.data);
        setitemLoading(false);
      });
  };

  const [graphLoading, setGraphLoading] = useState(false);
  const [graphLine, setGraphLine] = useState([]);
  const graphLineF = async () => {
    const searchedRecord = record.toLowerCase();
    setGraphLoading(true);
    await axios
      .get(`http://192.168.16.220:8082/graph?descrip=${searchedRecord}`)

      .then((response) => {
        setGraphLine(response.data);
        setGraphLoading(false);
      });
  };

  const [graphLineByMonth, setGraphLineByMonth] = useState([]);
  const graphLineByMonthF = async () => {
    const searchedRecord = record.toLowerCase();
    setGraphLoading(true);
    await axios
      .get(`http://192.168.16.220:8082/graphbymonth?descrip=${searchedRecord}`)

      .then((response) => {
        setGraphLineByMonth(response.data);
        setGraphLoading(false);
      });
  };

  const [value2, setValue2] = useState('');
  const handleChangeGraphByMonth = (e) => {
    const selectedMonth = e.target.value;
    setValue2(selectedMonth); // update the value of value2
  };

  const monthLine = graphLineByMonth.filter(
    (item) => item.year === Number(value2)
  );
  const monthLinePrv = graphLineByMonth.filter(
    (item) => item.year === Number(value2) - 1
  );

  //itemkey2
  const [graphLoading2, setGraphLoading2] = useState(false);
  const [graphByItem, setGraphByItem] = useState([]);
  const graphByItemF = async () => {
    const searchedRecord = record.toLowerCase();
    setGraphLoading2(true);

    await axios
      .get(`http://192.168.16.220:8082/graphByItem?descrip=${searchedRecord}`)

      .then((response) => {
        setGraphByItem(response.data);
        setGraphLoading2(false);
      });
  };
  const [graphByItemMonth, setGraphByItemMonth] = useState([]);
  const graphByItemMonthF = async () => {
    const searchedRecord = record.toLowerCase();
    setGraphLoading2(true);
    await axios
      .get(
        `http://192.168.16.220:8082/graphByItemMonth?descrip=${searchedRecord}`
      )

      .then((response) => {
        setGraphByItemMonth(response.data);
        setGraphLoading2(false);
      });
  };

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

  //className & table-text
  const InfoItemOb = (props) => {
    return (
      <td className={props.className} style={{ textAlign: 'left' }}>
        {props.name}
      </td>
    );
  };

  //REORDER DATA
  const result2 = search.map((item) =>
    WDsearch2.find((item2) => item2.Color.trim() === item.itemkey2.trim())
  );

  //Calculating the numbers of days between two dates
  const dateC = test2.map((item) => item.recdate)[0];
  const date1 = new Date(dateC);
  const date2 = new Date();
  const Difference_In_Time = date2.getTime() - date1.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  //Calculating the numbers of days between two dates for datepicker
  const date3 = endDatePicker;
  const date4 = startDatePicker;

  const Difference_In_Time2 = date4.getTime() - date3.getTime();
  const Difference_In_Days2 = Difference_In_Time2 / (1000 * 3600 * 24);

  //PRL
  const filteredItemsP = search.map((item) => item.cost);
  const PRLmin = Math.min(...filteredItemsP);
  const PRLmax = Math.max(...filteredItemsP);

  //total CLRS
  const filteredItems = search.filter((item) => item.itemkey2);
  const totalItems = filteredItems.length;

  //total REORDER
  const totalItems1 = _.sum(
    result2.map((item) => (item === undefined ? 0 : item.WMA))
  );

  //total OH
  const filteredItems2 = search.map((item) => item.onhand);
  const totalItems2 = _.sum(filteredItems2);

  //total POS_
  const filteredItems3 = mergeByKey.map((item) => item.qtyord);
  const totalItems3 = _.sum(filteredItems3);

  //total Sold30, 90 365
  const totalItems4 = _.sumBy(
    search.map((item) => _.sumBy(item.sold30, 'qtyshp'))
  );

  const totalItems5 = _.sumBy(
    search.map((item) => _.sumBy(item.sold90, 'qtyshp'))
  );

  const totalItems6 = _.sumBy(
    search.map((item) => _.sumBy(item.sold365, 'qtyshp'))
  );

  //total PO qty
  const totalItems7 = _.sumBy(
    search.map((item) => _.sumBy(item.sixth, 'qtyord'))
  );
  const totalItems8 = _.sumBy(
    search.map((item) => _.sumBy(item.fifth, 'qtyord'))
  );
  const totalItems9 = _.sumBy(
    search.map((item) => _.sumBy(item.fourth, 'qtyord'))
  );
  const totalItems10 = _.sumBy(
    search.map((item) => _.sumBy(item.third, 'qtyord'))
  );
  const totalItems11 = _.sumBy(
    search.map((item) => _.sumBy(item.second, 'qtyord'))
  );
  const totalItems12 = _.sumBy(
    search.map((item) => _.sumBy(item.first, 'qtyord'))
  );

  const totalItemsFromRCVD = _.sumBy(
    selectedData.map((item) => _.sumBy(item.new, 'qtyshp'))
  );

  const totalDatePickerqty = _.sumBy(
    selectedDatePicker.map((item) => _.sumBy(item.datepicker, 'qtyshp'))
  );

  const totalDatePickerbo = _.sumBy(
    selectedDatePicker.map((item) => _.sumBy(item.datepicker, 'qtybo'))
  );

  const graphYearlyTotal = _.sum(graphLine.map((item) => item.qtyshp));

  const graphMonthlyTotal = _.sum(monthLine.map((item) => item.qtyshp));

  //forecast
  const [selforecastDatePicker, setselforecastDatePicker] = useState([]);
  const [forecastLodingDatePicker, setforecastLodingDatePicker] =
    useState(false);
  useEffect(() => {
    const fetchData4 = async () => {
      if (search.length === 0) {
        return;
      }

      const searchedRecord = record.toLowerCase();
      const endDate = forecastDatePicker.toISOString().split('T')[0];

      setforecastLodingDatePicker(true);
      const response = await axios.get(
        `http://192.168.16.220:8082/poForecast?descrip=${searchedRecord}&endDate=${endDate}`
      );
      setselforecastDatePicker(response.data);
      setforecastLodingDatePicker(false);
    };
    fetchData4();
  }, [forecastDatePicker, search]);

  const sumReqForcast = selforecastDatePicker.map((item) =>
    _.sumBy(item.poForecast, 'ORDEREDa')
  );

  const postDay = forecastDatePicker;
  const Difference_In_PostDay = postDay.getTime() - date.getTime();

  const Difference_In_PostDayresult = round(
    Difference_In_PostDay / (1000 * 3600 * 24)
  );

  const Difference_In_PostDecimalDayresult =
    Math.round((Difference_In_PostDayresult / 30) * 100) / 100;

  const onhandCal = search.map((item) => Number(item.onhand));

  const dayCal = search.map((item) =>
    item.sold30.map(
      (item) => Number(item.qtyshp / 30) * Difference_In_PostDayresult
    )
  );
  const onhnadWithRVG = _.zipWith(
    onhandCal,
    sumReqForcast,
    (x, y) => x + y
  ).map((num) => round(num));

  const Cal30 = search.map((item) =>
    item.sold30.map(
      (item) => Number(item.qtyshp) * Difference_In_PostDecimalDayresult
    )
  );

  const Cal60 = search.map((item) =>
    item.sold60.map(
      (item) => Number(item.qtyshp / 2) * Difference_In_PostDecimalDayresult
    )
  );
  const Cal90 = search.map((item) =>
    item.sold90.map(
      (item) => Number(item.qtyshp / 3) * Difference_In_PostDecimalDayresult
    )
  );

  const Cal365 = search.map((item) =>
    item.sold365.map(
      (item) => Number(item.qtyshp / 12) * Difference_In_PostDecimalDayresult
    )
  );

  const amounts =
    Difference_In_PostDecimalDayresult <= 1
      ? _.zipWith(onhnadWithRVG, dayCal, (x, y) => round(x - y))
      : Difference_In_PostDecimalDayresult <= 1
      ? _.zipWith(onhnadWithRVG, Cal30, (x, y) => round(x - y))
      : Difference_In_PostDecimalDayresult > 1 &&
        Difference_In_PostDecimalDayresult <= 2
      ? _.zipWith(onhnadWithRVG, Cal60, (x, y) => round(x - y))
      : Difference_In_PostDecimalDayresult > 2 &&
        Difference_In_PostDecimalDayresult < 3
      ? _.zipWith(onhnadWithRVG, Cal90, (x, y) => round(x - y))
      : _.zipWith(onhnadWithRVG, Cal365, (x, y) => round(x - y));

  const totalAmount = amounts.reduce((sum, num) => sum + num, 0);

  //new or old item
  const newOrOld = () => {
    if (search.length === 0) {
      return;
    }
    if (
      search
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
      <div>
        <table id="tb1" className="table1">
          <tbody>
            <tr className="row1">
              <InfoItemOb className="infoCol1" name="ITEM:" />
              <td className="nameSection" colSpan="2">
                <input
                  className=" border border-zinc-500 "
                  id="search"
                  placeholder="Search item name here"
                  type="text"
                  value={record}
                  onChange={handleFilter}
                  autoComplete="off"
                  onKeyPress={handleKeyPress}
                />
                {filteredData.length != 0 && (
                  <div className="dataResult absolute">
                    {filteredData.slice(0, 15).map((item, idx) => (
                      <div
                        key={idx}
                        className="dropdown-row"
                        onClick={() => {onSearch(item.descrip);
                          
                          
                          
                        }}
                      >
                        {item.descrip}
                        
                      </div>
                    ))}
                  </div>
                )}
              </td>

              <td className="btn1">
                <button
                
                  onClick={() => {
                    searchRecords();
                    onClickImageHandler();
                    reset();
                    itemRecords();
                    fetchData3();
                    graphLineF();
                    graphLineByMonthF();
                    graphByItemF();
                    graphByItemMonthF();
                    WDsearchRecords();
                    WDsearchRecords2();
                    setfilteredDate([]);
                  }}
                  className="btn1name"
                  id="submitBtn"
                  type="submit"
                >
                  SUBMIT
                </button>
              </td>
              <td
                colSpan="3"
                rowSpan="10"
                className="prodImg "
                style={{ width: '250px' }}
              >
                <div>{<img src={imageClicked} className="mainImage  " />}</div>
              </td>
              <td
                colSpan="9"
                rowSpan="6"
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '200px',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                  }}
                >
                  {value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        value2 === 'YEAR' ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                              width={500}
                              height={300}
                              data={graphLine}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar
                                name="PO rec"
                                data={graphLine}
                                barSize={4}
                                fill="#ffb366"
                                dataKey="qtyrec"
                              />

                              <Line
                                type="monotone"
                                dataKey="qtyshp"
                                strokeWidth={3}
                                stroke="#82ca9d"
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                              data={monthLine}
                              width={500}
                              height={300}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis
                                dataKey="month"
                                allowDuplicatedCategory={false}
                              />
                              <YAxis />

                              <Tooltip />
                              <Legend />
                              <Bar
                                name="PO rec"
                                data={monthLine}
                                barSize={4}
                                fill="#ffb366"
                                dataKey="qtyrec"
                              />

                              <Line
                                name={Number(value2)}
                                data={monthLine}
                                type="monotone"
                                dataKey="qtyshp"
                                strokeWidth={3}
                                stroke="#82ca9d"
                              />
                              <Line
                                name={Number(value2) - 1}
                                data={monthLinePrv}
                                type="monotone"
                                dataKey="qtyshp"
                                strokeWidth={3}
                                stroke="#8884d8"
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                        )
                      ) : (
                        <td></td>
                      )
                    ) : (
                      <td>Loading...</td>
                    )
                  ) : graphLoading === false ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        width={500}
                        height={300}
                        data={graphLine}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          name="PO rec"
                          data={graphLine}
                          barSize={4}
                          fill="#ffb366"
                          dataKey="qtyrec"
                        />

                        <Line
                          type="monotone"
                          dataKey="qtyshp"
                          strokeWidth={3}
                          stroke="#82ca9d"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  ) : (
                    <>Loading...</>
                  )}
                </div>
              </td>
            </tr>

            <tr className="row2">
              <InfoItemOb className="infoCol1" name="ITEM NO:" />
              <td colSpan="3" className="smpNo">
                {WDsearch.map((item) => item.Sample)}
              </td>
            </tr>

            <tr className="row3">
              <InfoItemOb className="infoCol1" name="ORIGINAL:" />
              <td colSpan="3">
                <span
                  className="original"
                  style={{ float: 'left', paddingLeft: '3px' }}
                >
                  {WDsearch.map((item) => item.Original)}
                </span>
                <span
                  className="originalPo"
                  style={{ float: 'right', paddingRight: '3px' }}
                ></span>
              </td>
            </tr>
            <tr className="row4">
              <InfoItemOb className="infoCol1" name="SMP TYPE:" />
              <td colSpan="3" className="smpDte">
                {WDsearch.map((item) => item.sample_type)}
              </td>
            </tr>
            <tr className="row5">
              <InfoItemOb className="infoCol1" name="WEIGHT:" />
              <td colSpan="3">
                <span
                  className="weight"
                  style={{
                    float: 'left',
                    textAlign: 'center',
                    paddingLeft: '3px',
                  }}
                >
                  {WDsearch.map((item) => item.Weight)}
                </span>

                <span
                  className="weight_po"
                  style={{
                    float: 'right',
                    textAlign: 'center',
                    paddingRight: '3px',
                  }}
                ></span>
              </td>
            </tr>
            <tr className="row6">
              <InfoItemOb className="infoCol1" name="LENGTH:" />
              {WDsearch.map((item, idx) => (
                <td key={idx} colSpan="3">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span className="length">{item.Length}</span>
                    <span>
                      <span style={{ marginBottom: '0px' }}></span>
                      <span className="fl">
                        F : {item.Front_lc_leng_w} X {item.Front_lc_leng_l}
                      </span>
                    </span>
                    <span style={{ paddingRight: '3px' }}>
                      <span style={{ marginBottom: '0px' }}></span>
                      <span className="pl">
                        P : {item.Part_lc_leng_w} X {item.Part_lc_leng_l}
                      </span>
                    </span>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="row7">
              <InfoItemOb className="infoCol1" name="FIBER:" />
              <td colSpan="3">
                <span
                  className="fiber"
                  style={{
                    float: 'left',
                    verticalAlign: 'middle',
                    paddingLeft: '3px',
                  }}
                >
                  {WDsearch.map((item) => item.Fiber)}
                </span>
                <span
                  className="fiberPo"
                  style={{
                    float: 'right',
                    verticalAlign: 'middle',
                    paddingRight: '3px',
                  }}
                ></span>
              </td>

              <td>
                GRAPH
                <select
                  className=" border border-zinc-500 "
                  value={value2}
                  onChange={(e) => {
                    handleChangeGraphByMonth(e);
                  }}
                >
                  <option>YEAR</option>
                  {graphLine.map((item2, idx) => (
                    <option key={idx}>{item2.year}</option>
                  ))}
                </select>
              </td>
              {search.length ? (
                value2.length ? (
                  graphLoading === false ? (
                    value2.length ? (
                      <td>
                        {value2 === 'YEAR'
                          ? graphYearlyTotal
                          : graphMonthlyTotal}
                      </td>
                    ) : (
                      <td></td>
                    )
                  ) : (
                    <td>Loading...</td>
                  )
                ) : graphLoading === false ? (
                  <td>{graphYearlyTotal}</td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td></td>
              )}

              <td style={{ background: '#f0e68c' }}>PUR_date</td>

              {/*purchased date*/}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>

              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
            </tr>

            <tr className="row8">
              <InfoItemOb className="infoCol1" name="DGN DTE:" />
              <td colSpan="3" className="dgnDte"></td>
              {/*Sold percentage */}
              <td style={{ textAlign: 'center' }}>
                SOLD
                <select
                  className="border border-zinc-500"
                  value={selectedSold}
                  onChange={(e) => {
                    soldPercentageHandler(e);
                  }}
                >
                  <option
                    value={
                      selectedSoldPercentage.map((item) =>
                        item.soldPercentage.map(
                          (item) => item.soldtotal_percentage
                        )
                      )[0]
                    }
                  >
                    All
                  </option>
                  <option
                    value={
                      selectedSoldPercentage.map((item) =>
                        item.soldPercentage.map((item) => item.sold7_percentage)
                      )[0]
                    }
                  >
                    7
                  </option>
                  <option
                    value={
                      selectedSoldPercentage.map((item) =>
                        item.soldPercentage.map(
                          (item) => item.sold30_percentage
                        )
                      )[0]
                    }
                  >
                    30
                  </option>
                  <option
                    value={
                      selectedSoldPercentage.map((item) =>
                        item.soldPercentage.map(
                          (item) => item.sold60_percentage
                        )
                      )[0]
                    }
                  >
                    60
                  </option>
                  <option
                    value={
                      selectedSoldPercentage.map((item) =>
                        item.soldPercentage.map(
                          (item) => item.sold90_percentage
                        )
                      )[0]
                    }
                  >
                    90
                  </option>
                  <option
                    value={
                      selectedSoldPercentage.map((item) =>
                        item.soldPercentage.map(
                          (item) => item.sold6M_percentage
                        )
                      )[0]
                    }
                  >
                    6M
                  </option>
                  <option
                    value={
                      selectedSoldPercentage.map((item) =>
                        item.soldPercentage.map(
                          (item) => item.sold365_percentage
                        )
                      )[0]
                    }
                  >
                    1Y
                  </option>
                </select>
              </td>
              {search.length ? (
                selectedSold.length ? (
                  loadingsoldP === false ? (
                    selectedSold.length ? (
                      <td>{Math.floor(selectedSold)} %</td>
                    ) : (
                      <td></td>
                    )
                  ) : (
                    <td>Loading...</td>
                  )
                ) : loadingsoldP === false ? (
                  <td>
                    {Math.floor(
                      selectedSoldPercentage.map((item) =>
                        item.soldPercentage.map(
                          (item) => item.soldtotal_percentage
                        )
                      )[0]
                    )}
                    %
                  </td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td></td>
              )}

              <td style={{ background: '#f0e68c' }}>SHP_date</td>
              {/*shipping date*/}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
            </tr>

            <tr className="row9">
              <InfoItemOb className="infoCol1" name="PO's 2" />

              <td colSpan="2">
                {WDsearch.map((item, idx) => (
                  <div key={idx}>
                    <span className="pctn" style={{ float: 'left' }}>
                      P: {item.Pcs_ctn}
                    </span>
                    <span className="pctn" style={{ float: 'right' }}>
                      (L:{item.Front_lc_leng_l} X W:{item.Front_lc_leng_w} X
                      H:0)
                    </span>
                  </div>
                ))}
              </td>
              {test2.map((item) => item.reqdate)[0] == null ? (
                <td></td>
              ) : (
                <td>
                  {
                    test2.map(
                      (item) =>
                        new Date(item.reqdate).toISOString().split('T')[0]
                    )[0]
                  }
                </td>
              )}
              <td>SAMPLE:</td>
              <td>{WDsearch.map((item) => item.SampleShp)}</td>
              <td style={{ background: '#f0e68c' }}>EXP_date</td>
              {/*expected rec date*/}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
            </tr>
            <tr className="row10">
              <InfoItemOb className="infoCol1" name="ST_DATE" />
              <td className="stDate" colSpan="2">
                {
                  search
                    .filter((item) => item.start_dte)

                    .map(
                      (item) =>
                        new Date(item.start_dte).toISOString().split('T')[0]
                    )[0]
                }
              </td>

              {test2.map((item) => item.recdate)[0] == null ? (
                <td></td>
              ) : (
                <td>
                  {
                    test2.map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                  }
                </td>
              )}
              <td>REORD:</td>
              <td>{WDsearch.map((item) => item.ReordShp)}</td>
              <td style={{ background: '#f0e68c' }}>RCV_date</td>

              {/*Actual rec date*/}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
            </tr>

            <tr className="row11">
              {search.length > 0 ? (
                <td className="PRL">
                  {PRLmin} - {PRLmax}
                </td>
              ) : (
                <td></td>
              )}

              <td colSpan="2" className="price">
                {
                  search
                    .filter((item) => typeof item.price === 'number')
                    .map((item, idx) => (
                      <div key={idx}>PRICE: ${item.price}</div>
                    ))[0]
                }
              </td>

              {test2.map((item) => item.recdate)[0] == null ? (
                <td></td>
              ) : (
                <td>{Math.floor(Difference_In_Days)} days</td>
              )}

              {test2.map((item) => item.recdate)[0] == null ? (
                <td></td>
              ) : (
                <td>
                  {
                    test2.map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                  }{' '}
                </td>
              )}

              <td colSpan="2">
                <DatePicker
                  className="border-2 border-zinc-500 text-center"
                  showIcon
                  selected={startDatePicker}
                  onChange={(date) => setStartDatePicker(date)}
                />
              </td>

              <td className="prv30">{past30c}</td>
              <td className="prv30">{past90c}</td>
              <td className="prv30" style={{ background: '#f4a460' }}>
                FORECAST
              </td>
              {/*purno No*/}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
            </tr>

            <tr className="row12">
              <td className="newOrOld">{newOrOld()}</td>
              {/* grading https://www.wane.com/news/sacs-approves-new-grading-scale/*/}
              <td>GRADE</td>
              {itemRank.length ? (
                itemLoading === false ? (
                  itemRank
                    .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                    .filter((item) => item.percentile)
                    .map((item) => item.percentile * 100)[0] > 98 ||
                  itemRank
                    .flatMap((item) => [item].concat(item.rankRB ?? []))
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
                      .map((item) => item.percentile * 100)[0] > 60 ? (
                    <td style={{ background: '#ff4500', fontWeight: 'bold' }}>
                      D-
                    </td>
                  ) : (
                    <td style={{ background: '#c0c0c0', fontWeight: 'bold' }}>
                      F
                    </td>
                  )
                ) : (
                  <>Loading...</>
                )
              ) : itemLoading === false ? (
                <td></td>
              ) : (
                <>Loading...</>
              )}

              {/* waiting & rcvd table  */}
              {selectedItem.length > 0 ? (
                test2.map((item) => item.recdate)[0] == null ? (
                  <td style={{ color: 'red' }}>WAITING</td>
                ) : (
                  <td style={{ color: 'green' }}>RCVD</td>
                )
              ) : (
                <td></td>
              )}

              <td id="recDte" className="recDateSel_cal">
                {new Date().toISOString().split('T')[0]}
              </td>
              <td colSpan="2">
                <DatePicker
                  className="border-2 border-zinc-500 text-center"
                  showIcon
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
                {/* {new Date().toISOString().split('T')[0]} */}
                {/* forecast datepicker */}
                <DatePicker
                  className="w-20 border-2 border-zinc-500 text-center"
                  minDate={new Date()}
                  maxDate={new Date().setDate(new Date().getDate() + 365)}
                  selected={forecastDatePicker}
                  onChange={(date) => setForecasteDatePicker(date)}
                />
              </td>
              {/*invoice No */}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
            </tr>
          </tbody>

          <tbody id="tb2" className="table2">
            <tr>
              <td>CLRS:{totalItems}</td>
              <td>OH</td>
              {/*PO reorder */}
              <td style={{ background: '#f4a460' }}>REORDER</td>
              <td>
                <div className="App">
                  <select
                    className="border border-zinc-500"
                    name="item-selected"
                    value={selectedItem}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    {/*POS initial && Warning error*/}

                    <option>POS_</option>

                    <option>
                      {
                        search
                          .flatMap((item) => [item].concat(item.first ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option>
                      {
                        search
                          .flatMap((item) => [item].concat(item.second ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option>
                      {
                        search
                          .flatMap((item) => [item].concat(item.third ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option>
                      {
                        search
                          .flatMap((item) => [item].concat(item.fourth ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option>
                      {
                        search
                          .flatMap((item) => [item].concat(item.fifth ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option>
                      {
                        search
                          .flatMap((item) => [item].concat(item.sixth ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>
                  </select>
                </div>
              </td>

              <td>SOLD</td>
              <td colSpan={2}>{Math.floor(Difference_In_Days2)} days</td>
              <td>SOLD30</td>
              <td>SOLD90</td>
              <td>+{Difference_In_PostDayresult} days</td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
            </tr>
          </tbody>

          {/* body table3 */}
          {search.length > 0 ? (
            loading === false ? (
              <tbody id="tt" className="bottomSearch">
                <td style={{ padding: '0' }}>
                  {search
                    .filter((item) => item.itemkey2)
                    .map((item, idx) => (
                      <div
                        className="pointername"
                        key={idx}
                        style={{ textAlign: 'left', color: 'blue' }}
                        onClick={() => eachItemClick(item.itemkey2)}
                      >
                        {item.itemkey2}
                      </div>
                    ))}

                  <div style={{ textAlign: 'left' }}>TOTAL</div>
                </td>

                <td style={{ padding: '0' }}>
                  {search
                    .filter(
                      (item) =>
                        typeof item.onhand === 'number' || item.onhand === null
                    )
                    .map((item, idx) => (
                      <div key={idx}>{item.onhand}</div>
                    ))}
                  <div>{totalItems2}</div>
                </td>
                {/* needs reorder */}
                <td style={{ padding: '0' }}>
                  {result2.map((item, idx) =>
                    item === undefined ? (
                      <div key={idx}>0</div>
                    ) : (
                      <div key={idx}>{item.WMA}</div>
                    )
                  )}
                  <div>{totalItems1}</div>
                </td>

                {selectedItem.length > 0 ? (
                  <td style={{ padding: '0' }}>
                    {mergeByKey.map((item, idx) => (
                      <div key={idx}>{item.qtyord}</div>
                    ))}
                    <div>{totalItems3}</div>
                  </td>
                ) : (
                  <td style={{ padding: '0' }}>
                    {search.map((item, idx) =>
                      item.first.length ? (
                        item.first.map((item2, idx2) => (
                          <div key={idx2}>{item2.qtyord}</div>
                        ))
                      ) : (
                        <div key={idx}></div>
                      )
                    )}

                    <div>{totalItems12}</div>
                  </td>
                )}

                {/*sold amount regarding RCVD date //loading && render table cell */}

                <td style={{ padding: '0' }}>
                  {test2.length
                    ? loadingDatapick === false
                      ? test2.map((item) => item.recdate)[0] == null
                        ? search.map((item, idx) => (
                            <div key={idx}>{item.purno}</div>
                          ))
                        : selectedData.map((item, idx) =>
                            item.new.length ? (
                              item.new.map((item, idx2) => (
                                <div key={idx2}>{item.qtyshp}</div>
                              ))
                            ) : (
                              <div key={idx}></div>
                            )
                          )
                      : search.map((item, idx) => (
                          <div key={idx}>Loading...</div>
                        ))
                    : loadingDatapick === false
                    ? search.map((item, idx) => (
                        <div key={idx}>{item.purno}</div>
                      ))
                    : search.map((item, idx) => <div key={idx}>Loading</div>)}
                  <div>{totalItemsFromRCVD}</div>
                </td>

                <td style={{ padding: '0' }}>
                  {selectedDatePicker.length
                    ? loadingDatePicker === false
                      ? selectedDatePicker.map((item, idx) =>
                          item.datepicker.length ? (
                            item.datepicker.map((item2, idx2) => (
                              <div key={idx2}>{item2.qtyshp}</div>
                            ))
                          ) : (
                            <div key={idx}>0</div>
                          )
                        )
                      : search.map((item, idx) => (
                          <div key={idx}>Loading...</div>
                        ))
                    : loadingDatePicker === false
                    ? search.map((item, idx) => (
                        <div key={idx}>{item.purno}</div>
                      ))
                    : search.map((item, idx) => <div key={idx}>Loading</div>)}
                  <div>{totalDatePickerqty}</div>
                </td>

                <td style={{ padding: '0' }}>
                  {selectedDatePicker.length
                    ? loadingDatePicker === false
                      ? selectedDatePicker.map((item, idx) =>
                          item.datepicker.length ? (
                            item.datepicker.map((item2, idx2) => (
                              <div key={idx2}>{item2.qtybo}</div>
                            ))
                          ) : (
                            <div key={idx}>0</div>
                          )
                        )
                      : search.map((item, idx) => (
                          <div key={idx}>Loading...</div>
                        ))
                    : loadingDatePicker === false
                    ? search.map((item, idx) => (
                        <div key={idx}>{item.purno}</div>
                      ))
                    : search.map((item, idx) => <div key={idx}>Loading</div>)}
                  <div>{totalDatePickerbo}</div>
                </td>

                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.sold30.length ? (
                      item.sold30.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyshp}</div>
                      ))
                    ) : (
                      <div key={idx}>0</div>
                    )
                  )}
                  <div>{totalItems4}</div>
                </td>

                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.sold90.length ? (
                      item.sold90.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyshp}</div>
                      ))
                    ) : (
                      <div key={idx}>0</div>
                    )
                  )}
                  <div>{totalItems5}</div>
                </td>

                <td style={{ padding: '0' }}>
                  {/* forecast render */}
                  {amounts.map((num, idx) => (
                    <div key={idx} className={num < 0 ? 'negative-amount' : ''}>
                      {round(num)}
                    </div>
                  ))}
                  <div>{totalAmount}</div>
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.sixth.length ? (
                      item.sixth.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems7}</div>
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.fifth.length ? (
                      item.fifth.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems8}</div>
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.fourth.length ? (
                      item.fourth.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems9}</div>
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.third.length ? (
                      item.third.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems10}</div>
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.second.length ? (
                      item.second.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems11}</div>
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.first.length ? (
                      item.first.map((item2, idx2) => (
                        <div key={idx2} style={{ borderRightWidth: '1px' }}>
                          {item2.qtyord}
                        </div>
                      ))
                    ) : (
                      <div key={idx} style={{ borderRightWidth: '1px' }}></div>
                    )
                  )}
                  <div style={{ borderRightWidth: '1px' }}>{totalItems12}</div>
                </td>
              </tbody>
            ) : (
              <>Loading...</>
            )
          ) : loading === false ? (
            <>
              <BlankPage />
            </>
          ) : (
            <>Loading...</>
          )}
        </table>
      </div>
      {isOpen && (
        <div className=" absolute top-0 z-50 ">
          <ColorTab
            eachItemGraph={eachItemGraph}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            graphLine={graphLine}
            eachItemGraphMonth={eachItemGraphMonth}
            graphLoading2={graphLoading2}
            search={search}
          />
        </div>
      )}
    </div>
  );
};
