import React, { useState, useEffect, Fragment } from 'react';
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import ColorTab from './ColorTab';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { zipWith } from 'lodash';

var _ = require('lodash');

export const SearchPage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
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
      .get(`${BASE_URL}searchAuto`)
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
  const onSearch = (record1) => {
    setRecord(record1); // set the input value to the clicked suggestion

    setfilteredDate([]);
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
  // const [selectedItem, setSelectedItem] = useState('');

  // const handleChange = (e) => {
  //   let value = e.target.value;
  //   setSelectedItem(value);
  // };

  // const test2 =
  //   selectedItem == 'POS_'
  //     ? search
  //         .flatMap((item) => [item].concat(item.first ?? []))
  //         .map((item) => item)
  //     : search.flatMap((item) =>
  //         item.first
  //           .filter(
  //             (item2) =>
  //               item2.purno && item2.purno.trim() === String(selectedItem)
  //           )
  //           .concat(
  //             item.second.filter(
  //               (item2) =>
  //                 item2.purno && item2.purno.trim() === String(selectedItem)
  //             )
  //           )
  //           .concat(
  //             item.third.filter(
  //               (item2) =>
  //                 item2.purno && item2.purno.trim() === String(selectedItem)
  //             )
  //           )
  //           .concat(
  //             item.fourth.filter(
  //               (item2) =>
  //                 item2.purno && item2.purno.trim() === String(selectedItem)
  //             )
  //           )
  //           .concat(
  //             item.fifth.filter(
  //               (item2) =>
  //                 item2.purno && item2.purno.trim() === String(selectedItem)
  //             )
  //           )
  //           .concat(
  //             item.sixth.filter(
  //               (item2) =>
  //                 item2.purno && item2.purno.trim() === String(selectedItem)
  //             )
  //           )
  //       );

  // const mergeByKey = search.map((itm) => ({
  //   ...test2.find((item) => item.itemkey2 === itm.itemkey2 && item),
  //   ...itm,
  // }));

  // console.log(test2);
  // console.log(search)

  //pos_ dropdown data list
  //console.log(selectedItem)

  //DataPick regarding option value
  // const [loadingDatapick, setLoadingDatapick] = useState(false);
  // const [selectedData, setSelectedData] = useState([]);

  // useEffect(() => {
  //   if (selectedItem.length === 0) {
  //     return;
  //   }

  //   const fetchData = async () => {
  //     const searchedRecord = record.toLowerCase();
  //     const curDate = new Date().toISOString().split('T')[0];
  //     const endDate = curDate;

  //     const startDate = test2.map(
  //       (item) => new Date(item.recdate).toISOString().split('T')[0]
  //     )[0];

  //     setLoadingDatapick(true);
  //     const response = await axios.get(
  //       `${BASE_URL}dataPick?descrip=${searchedRecord}&startDate=${startDate}&endDate=${endDate}`
  //     );
  //     setSelectedData(response.data);
  //     setLoadingDatapick(false);
  //   };

  //   fetchData();
  // }, [selectedItem]);

  //data from dataPick
  //console.log(selectedData);

  //select & option dropdown soldPercentage
  const [selectedSoldPercentage, setSelectedSoldPercentage] = useState([]);
  const [loadingsoldP, setloadingsoldP] = useState(false);

  const fetchData3 = () => {
    const searchedRecord = record.toLowerCase();
    setloadingsoldP(true);
    axios
      .get(`${BASE_URL}soldPercentage?descrip=${searchedRecord}`)

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
    // setSelectedItem([]);
    // setSelectedData([]);
    setSelectedSold([]);
    setValue2([]);
    WDsetSearch([]);
    setitemRank([]);
    setnewitemRank([]);
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
        `${BASE_URL}datePicker?descrip=${searchedRecord}&startDate=${startDate}&endDate=${endDate}`
      );
      setSelectedDatePicker(response.data);
      setloadingDatePicker(false);
    };
    fetchData2();
  }, [startDatePicker, endDatePicker, search]);

  //image handler
  const onClickImageHandler = () => {
    setImageClicked(`http://img.vanessahair.com/sales/${record}.jpg`);
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
      newitemRecords();
      pieChartF();
    }
  };

  const [loading, setLoading] = useState(false);

  const searchRecords = () => {
    const searchedRecord = record.toLowerCase();

    setLoading(true);
    axios
      .get(`${BASE_URL}mergeData?descrip=${searchedRecord}`)

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
        `${BASE_URL}WatchDog/WDInfo?search=${searchedRecord}&user=undefined/`
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
      .get(`${BASE_URL}WatchDog/ColorList?search=${searchedRecord}`)

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
      .get(`${BASE_URL}itemRank?descrip=${searchedRecord}`)

      .then((response) => {
        setitemRank(response.data);
        setitemLoading(false);
      });
  };

  const [newitemRank, setnewitemRank] = useState([]);
  const [newitemLoading, setnewitemLoading] = useState(false);

  const newitemRecords = async () => {
    const searchedRecord = record.toLowerCase();
    setnewitemLoading(true);
    await axios
      .get(`${BASE_URL}newItemRank?descrip=${searchedRecord}`)

      .then((response) => {
        setnewitemRank(response.data);
        setnewitemLoading(false);
      });
  };

  const [graphLoading, setGraphLoading] = useState(false);
  const [graphLine, setGraphLine] = useState([]);
  const graphLineF = async () => {
    const searchedRecord = record.toLowerCase();
    setGraphLoading(true);
    await axios
      .get(`${BASE_URL}graph?descrip=${searchedRecord}`)

      .then((response) => {
        setGraphLine(response.data);
        setGraphLoading(false);
      });
  };

  const lastyear = graphLine.map((item) => item.year).at(-1);
  const lastyear2 = graphLine.map((item) => item.year).at(-2);
  const lastyear3 = graphLine.map((item) => item.year).at(-3);
  const lastyear4 = graphLine.map((item) => item.year).at(-4);
  const lastyear5 = graphLine.map((item) => item.year).at(-5);
  const lastyear6 = graphLine.map((item) => item.year).at(-6);
  const lastyearSoldQty = graphLine.map((item) => item.qtyshp).at(-1);
  const lastyearSoldQty2 = graphLine.map((item) => item.qtyshp).at(-2);
  const lastyearSoldQty3 = graphLine.map((item) => item.qtyshp).at(-3);
  const lastyearSoldQty4 = graphLine.map((item) => item.qtyshp).at(-4);
  const lastyearSoldQty5 = graphLine.map((item) => item.qtyshp).at(-5);
  const lastyearSoldQty6 = graphLine.map((item) => item.qtyshp).at(-6);
  const lastyearSoldQty7 = graphLine.map((item) => item.qtyshp).at(-7);

  const lastyearRCVQty = graphLine.map((item) => item.qtyrec).at(-1);
  const lastyearRCVQty2 = graphLine.map((item) => item.qtyrec).at(-2);
  const lastyearRCVQty3 = graphLine.map((item) => item.qtyrec).at(-3);
  const lastyearRCVQty4 = graphLine.map((item) => item.qtyrec).at(-4);
  const lastyearRCVQty5 = graphLine.map((item) => item.qtyrec).at(-5);
  const lastyearRCVQty6 = graphLine.map((item) => item.qtyrec).at(-6);

  const YoY = (lastyearSoldQty / lastyearSoldQty2 - 1) * 100;
  const YoY2 = (lastyearSoldQty2 / lastyearSoldQty3 - 1) * 100;
  const YoY3 = (lastyearSoldQty3 / lastyearSoldQty4 - 1) * 100;
  const YoY4 = (lastyearSoldQty4 / lastyearSoldQty5 - 1) * 100;
  const YoY5 = (lastyearSoldQty5 / lastyearSoldQty6 - 1) * 100;
  const YoY6 = (lastyearSoldQty6 / lastyearSoldQty7 - 1) * 100;

  const [graphLineByMonth, setGraphLineByMonth] = useState([]);
  const graphLineByMonthF = async () => {
    const searchedRecord = record.toLowerCase();
    setGraphLoading(true);
    await axios
      .get(`${BASE_URL}graphbymonth?descrip=${searchedRecord}`)

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

  const monthData = [];
  monthNames.forEach((name, index) => {
    const dataItem = monthLine.find((item) => item.month === index + 1);
    monthData.push(
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
    (monthData.map((item) => item.qtyshp)[0] /
      PrvmonthData.map((item) => item.qtyshp)[0] -
      1) *
    100;
  const YoYEachMonth2 =
    (monthData.map((item) => item.qtyshp)[1] /
      PrvmonthData.map((item) => item.qtyshp)[1] -
      1) *
    100;
  const YoYEachMonth3 =
    (monthData.map((item) => item.qtyshp)[2] /
      PrvmonthData.map((item) => item.qtyshp)[2] -
      1) *
    100;
  const YoYEachMonth4 =
    (monthData.map((item) => item.qtyshp)[3] /
      PrvmonthData.map((item) => item.qtyshp)[3] -
      1) *
    100;
  const YoYEachMonth5 =
    (monthData.map((item) => item.qtyshp)[4] /
      PrvmonthData.map((item) => item.qtyshp)[4] -
      1) *
    100;
  const YoYEachMonth6 =
    (monthData.map((item) => item.qtyshp)[5] /
      PrvmonthData.map((item) => item.qtyshp)[5] -
      1) *
    100;
  const YoYEachMonth7 =
    (monthData.map((item) => item.qtyshp)[6] /
      PrvmonthData.map((item) => item.qtyshp)[6] -
      1) *
    100;
  const YoYEachMonth8 =
    (monthData.map((item) => item.qtyshp)[7] /
      PrvmonthData.map((item) => item.qtyshp)[7] -
      1) *
    100;
  const YoYEachMonth9 =
    (monthData.map((item) => item.qtyshp)[8] /
      PrvmonthData.map((item) => item.qtyshp)[8] -
      1) *
    100;
  const YoYEachMonth10 =
    (monthData.map((item) => item.qtyshp)[9] /
      PrvmonthData.map((item) => item.qtyshp)[9] -
      1) *
    100;
  const YoYEachMonth11 =
    (monthData.map((item) => item.qtyshp)[10] /
      PrvmonthData.map((item) => item.qtyshp)[10] -
      1) *
    100;
  const YoYEachMonth12 =
    (monthData.map((item) => item.qtyshp)[11] /
      PrvmonthData.map((item) => item.qtyshp)[11] -
      1) *
    100;

  //itemkey2
  const [graphLoading2, setGraphLoading2] = useState(false);
  const [graphByItem, setGraphByItem] = useState([]);
  const graphByItemF = async () => {
    const searchedRecord = record.toLowerCase();
    setGraphLoading2(true);

    await axios
      .get(`${BASE_URL}graphByItem?descrip=${searchedRecord}`)

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
      .get(`${BASE_URL}graphByItemMonth?descrip=${searchedRecord}`)

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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  // Get the maximum value from the data

  const [pieLoading, setpieLoading] = useState(false);
  const [pieChart, setpieChart] = useState([]);
  const pieChartF = async () => {
    const searchedRecord = record.toLowerCase();
    setpieLoading(true);
    await axios
      .get(`${BASE_URL}pieChart?descrip=${searchedRecord}`)

      .then((response) => {
        setpieChart(response.data);
        setpieLoading(false);
      });
  };

  // Get the maximum value from the data
  const maxVal = Math.max(...pieChart.map((data) => data.qtyshp));

  const [loadingfile, setLoadingfile] = useState(false);

  const handleDownload = () => {
    setLoadingfile(true);
    axios({
      url: `${BASE_URL}download`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'RB_Rank.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile(false);
    });
  };

  const [loadingfile2, setLoadingfile2] = useState(false);

  const handleDownload2 = () => {
    setLoadingfile2(true);
    axios({
      url: `${BASE_URL}downloadnonRB`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'nonRB_Rank.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile2(false);
    });
  };

  const [loadingfile3, setLoadingfile3] = useState(false);

  const handleDownload3 = () => {
    setLoadingfile3(true);
    axios({
      url: `${BASE_URL}downloadNewItem`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'newItem_Rank.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile3(false);
    });
  };

  const [loadingfile4, setLoadingfile4] = useState(false);

  const handleDownload4 = () => {
    setLoadingfile4(true);
    axios({
      url: `${BASE_URL}download1Q`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '1Q.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile4(false);
    });
  };
  const [loadingfile5, setLoadingfile5] = useState(false);

  const handleDownload5 = () => {
    setLoadingfile5(true);
    axios({
      url: `${BASE_URL}download2Q`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '2Q.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile5(false);
    });
  };
  const [loadingfile6, setLoadingfile6] = useState(false);

  const handleDownload6 = () => {
    setLoadingfile6(true);
    axios({
      url: `${BASE_URL}download3Q`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '3Q.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile6(false);
    });
  };
  const [loadingfile7, setLoadingfile7] = useState(false);

  const handleDownload7 = () => {
    setLoadingfile7(true);
    axios({
      url: `${BASE_URL}download4Q`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '4Q.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile7(false);
    });
  };

  const [loadingfile8, setLoadingfile8] = useState(false);

  const handleDownload8 = () => {
    setLoadingfile8(true);
    axios({
      url: `${BASE_URL}downloadCheck2021`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '2020-2021 change_rate.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile8(false);
    });
  };
  const [loadingfile9, setLoadingfile9] = useState(false);

  const handleDownload9 = () => {
    setLoadingfile9(true);
    axios({
      url: `${BASE_URL}downloadCheck2022`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '2021-2022 change_rate.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile9(false);
    });
  };

  const [loadingfile10, setLoadingfile10] = useState(false);

  const handleDownload10 = () => {
    setLoadingfile10(true);
    axios({
      url: `${BASE_URL}downloadXSHORT`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'XSHORT.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile10(false);
    });
  };

  const [loadingfile11, setLoadingfile11] = useState(false);

  const handleDownload11 = () => {
    setLoadingfile11(true);
    axios({
      url: `${BASE_URL}downloadSHORT`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'SHORT.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile11(false);
    });
  };

  const [loadingfile12, setLoadingfile12] = useState(false);

  const handleDownload12 = () => {
    setLoadingfile12(true);
    axios({
      url: `${BASE_URL}downloadMIDSHORT`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'MID_SHORT.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile12(false);
    });
  };

  const [loadingfile13, setLoadingfile13] = useState(false);

  const handleDownload13 = () => {
    setLoadingfile13(true);
    axios({
      url: `${BASE_URL}downloadMID`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'MID.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile13(false);
    });
  };

  const [loadingfile14, setLoadingfile14] = useState(false);

  const handleDownload14 = () => {
    setLoadingfile14(true);
    axios({
      url: `${BASE_URL}downloadMIDLONG`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'MID_LONG.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile14(false);
    });
  };

  const [loadingfile15, setLoadingfile15] = useState(false);

  const handleDownload15 = () => {
    setLoadingfile15(true);
    axios({
      url: `${BASE_URL}downloadLONG`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'LONG.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile15(false);
    });
  };

  const [loadingfile16, setLoadingfile16] = useState(false);

  const handleDownload16 = () => {
    setLoadingfile16(true);
    axios({
      url: `${BASE_URL}downloadXLONG`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'XLONG.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile16(false);
    });
  };

  const [loadingfile17, setLoadingfile17] = useState(false);

  const handleDownload17 = () => {
    setLoadingfile17(true);
    axios({
      url: `${BASE_URL}downloadItemReorderPoint`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ItemReorderPoint.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoadingfile17(false);
    });
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
  // const dateC = test2.map((item) => item.recdate)[0];
  // const date1 = new Date(dateC);
  const date2 = new Date();
  // const Difference_In_Time = date2.getTime() - date1.getTime();
  // const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  //Calculating the numbers of days between two dates for datepicker
  const date3 = endDatePicker;
  const date4 = startDatePicker;

  const Difference_In_Time2 = date4.getTime() - date3.getTime();
  const Difference_In_Days2 = Difference_In_Time2 / (1000 * 3600 * 24);

  //PRL
  const filteredItemsP = search.map((item) => item.mincost && item.maxcost);

  const filteredItemsPWithoutZero = filteredItemsP.filter(
    (value) => value !== null
  );

  const PRLmin = Math.min(...filteredItemsPWithoutZero);

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
  // const filteredItems3 = mergeByKey.map((item) => item.qtyord);
  // const totalItems3 = _.sum(filteredItems3);

  //total Sold30, 90 365
  const totalItems4 = _.sumBy(
    search.map((item) => _.sumBy(item.sold30, 'qtyshp'))
  );

  const totalSold60 = _.sumBy(
    search.map((item) => _.sumBy(item.sold60, 'qtyshp'))
  );

  const totalItems5 = _.sumBy(
    search.map((item) => _.sumBy(item.sold90, 'qtyshp'))
  );

  const totalItems6 = _.sumBy(
    search.map((item) => _.sumBy(item.sold365, 'qtyshp'))
  );

  //total PO qty
  // const totalItems7 = _.sumBy(
  //   search.map((item) => _.sumBy(item.sixth, 'qtyord'))
  // );
  // const totalItems8 = _.sumBy(
  //   search.map((item) => _.sumBy(item.fifth, 'qtyord'))
  // );
  // const totalItems9 = _.sumBy(
  //   search.map((item) => _.sumBy(item.fourth, 'qtyord'))
  // );
  // const totalItems10 = _.sumBy(
  //   search.map((item) => _.sumBy(item.third, 'qtyord'))
  // );
  // const totalItems11 = _.sumBy(
  //   search.map((item) => _.sumBy(item.second, 'qtyord'))
  // );
  // const totalItems12 = _.sumBy(
  //   search.map((item) => _.sumBy(item.first, 'qtyord'))
  // );

  const totalItems13 = _.sumBy(
    search.map((item) => _.sumBy(item.pendingDataO, 'pending'))
  );

  const totalItems14 = _.sumBy(
    search.map((item) => _.sumBy(item.reorderPointO, 'avg_qtyshp'))
  );

  const totalItems14Decimal = totalItems14.toFixed(2);

  const totalItems15 =
    _.sumBy(search.map((item) => _.sumBy(item.poLeadTimeO, 'avg_lead_time'))) /
    search.reduce((a, v) => (a = a + v.poLeadTimeO.length), 0);

  const totalItems16 =
    _.sumBy(search.map((item) => _.sumBy(item.poLeadTimeO, 'max_lead_time'))) /
    search.reduce((a, v) => (a = a + v.poLeadTimeO.length), 0);

  const totalItems17 = _.sumBy(
    search.map((item) => _.sumBy(item.bofromLastRcvO, 'qtybo'))
  );

  // const totalItemsFromRCVD = _.sumBy(
  //   selectedData.map((item) => _.sumBy(item.new, 'qtyshp'))
  // );

  const suggestedQtyavg_qty = search.map((item) =>
    item.reorderPointO.map((item) => Number(item.avg_qtyshp))
  );

  const suggestedQtyavg_lead = search.map((item) =>
    item.poLeadTimeO.map((item) => Number(item.avg_lead_time))
  );

  const suggestedBo = search.map((item) =>
    item.bofromLastRcvO.map((item) => Number(item.qtybo))
  );

  const suggestedQty = zipWith(
    suggestedQtyavg_qty,
    suggestedQtyavg_lead,
    suggestedBo,
    (qty, lead, bo) => qty * lead + bo
  ).reduce((acc, curr) => acc.concat(curr), []);

  const totalItems18 = _.sum(suggestedQty.map((value) => round(value)));

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
        `${BASE_URL}poForecast?descrip=${searchedRecord}&endDate=${endDate}`
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
  const FosuggestedQty = zipWith(
    suggestedQtyavg_qty,
    suggestedQtyavg_lead,
    suggestedBo,
    amounts,
    (qty, lead, bo, am) => qty * lead + bo - am
  ).reduce((acc, curr) => acc.concat(curr), []);
  const totalAmount19 = FosuggestedQty.reduce((sum, num) => sum + num, 0);

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
              <>
                <InfoItemOb className="infoCol1" name="ITEM:" />
              </>

              <td className="nameSection" colSpan="2">
                <>
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
                </>
                <>
                  {' '}
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
              <td className="btn1">
                <>
                  {' '}
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
                      newitemRecords();
                      pieChartF();
                    }}
                    className="btn1name"
                    id="submitBtn"
                    type="submit"
                  >
                    SUBMIT
                  </button>
                </>
              </td>
              <td colSpan="3" rowSpan="10" className="prodImg ">
                <span>
                  {
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <img
                      style={{ width: '250px', height: '320px' }}
                      src={imageClicked}
                      className="mainImage  "
                    />
                  }
                </span>
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
                <>
                  <div
                    style={{
                      position: 'absolute',
                      width: '70%',
                      height: '100%',
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
                                {monthLinePrv.some((entry) => entry.qtyshp) ? (
                                  <Line
                                    name={Number(value2) - 1}
                                    data={monthLinePrv}
                                    type="monotone"
                                    dataKey="qtyshp"
                                    strokeWidth={3}
                                    stroke="#8884d8"
                                  />
                                ) : null}
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

                  <div
                    style={{
                      position: 'absolute',

                      width: '30%',
                      height: '100%',

                      right: '1px',
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width={400} height={400}>
                        <Pie
                          data={pieChart}
                          dataKey="qtyshp"
                          nameKey="quarter"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          labelLine={false}
                          label={({
                            cx,
                            cy,
                            midAngle,
                            innerRadius,
                            outerRadius,
                            value,
                            index,
                            payload,
                          }) => {
                            const RADIAN = Math.PI / 180;
                            const radius =
                              25 + innerRadius + (outerRadius - innerRadius);
                            const x =
                              cx + radius * Math.cos(-midAngle * RADIAN);
                            const y =
                              cy + radius * Math.sin(-midAngle * RADIAN);
                            const percent = `${(
                              (value /
                                pieChart.reduce((a, b) => a + b.qtyshp, 0)) *
                              100
                            ).toFixed(0)}%`;
                            const quarter = payload.quarter;
                            return (
                              <text
                                x={x}
                                y={y}
                                fill={COLORS[index % COLORS.length]}
                                textAnchor={x > cx ? 'start' : 'end'}
                                dominantBaseline="central"
                              >
                                <tspan dx={x > cx ? -31 : 30} dy={3}>
                                  {quarter}Q({percent})
                                </tspan>
                              </text>
                            );
                          }}
                        >
                          {pieChart.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.qtyshp === maxVal
                                  ? '#FF0000'
                                  : COLORS[index % COLORS.length]
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'qtyshp']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </>
              </td>
            </tr>

            <tr className="row2">
              <>
                <InfoItemOb className="infoCol1" name="ITEM NO:" />
              </>

              <td colSpan="3" className="smpNo">
                {WDsearch.map((item) => item.Sample)}
              </td>
            </tr>

            <tr className="row3">
              <>
                <InfoItemOb className="infoCol1" name="ORIGINAL:" />
              </>

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
              <>
                <InfoItemOb className="infoCol1" name="TYPE:" />
              </>

              <td colSpan="3" className="smpDte">
                {search.map((item) => item.length_cat)[0]}
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
              <>
                <InfoItemOb className="infoCol1" name="LENGTH:" />
              </>
              <>
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
              </>
            </tr>

            <tr className="row7">
              <>
                <InfoItemOb className="infoCol1" name="FIBER:" />
              </>

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
              <>
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
              </>

              <td style={{ background: '#f0e68c' }}>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>{value2 === 'YEAR' ? 'YEAR' : 'MONTH'}</>
                      ) : (
                        <></>
                      )
                    ) : (
                      <>Loading...</>
                    )
                  ) : graphLoading === false ? (
                    <>YEAR</>
                  ) : (
                    <>Loading...</>
                  )
                ) : (
                  <>YEAR</>
                )}
              </td>

              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyear6
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.name)[0]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.name)[1]}
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
                    <>{lastyear6}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>

              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyear5
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.name)[2]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.name)[3]}
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
                    <>{lastyear5}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyear4
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.name)[4]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.name)[5]}
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
                    <>{lastyear4}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyear3
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.name)[6]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.name)[7]}
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
                    <>{lastyear3}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
              <td colSpan="0.5">
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyear2
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.name)[8]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.name)[9]}
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
                    <>{lastyear2}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyear
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.name)[10]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.name)[11]}
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
                    <>{lastyear}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
            </tr>

            <tr className="row8">
              <>
                <InfoItemOb className="infoCol1" name="DGN DTE:" />
              </>

              <td colSpan="3" className="dgnDte"></td>

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
                        item.soldPercentage.map((item) =>
                          item.soldtotal_percentage
                            ? item.soldtotal_percentagee
                            : 0
                        )
                      )[0]
                    }
                  >
                    All
                  </option>
                  <option
                    value={
                      selectedSoldPercentage.map((item) =>
                        item.soldPercentage.map((item) =>
                          item.sold7_percentage ? item.sold7_percentage : 0
                        )
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
                        item.soldPercentage.map((item) =>
                          item.sold60_percentage ? item.sold60_percentage : 0
                        )
                      )[0]
                    }
                  >
                    60
                  </option>
                  <option
                    value={
                      selectedSoldPercentage.map((item) =>
                        item.soldPercentage.map((item) =>
                          item.sold90_percentage ? item.sold90_percentage : 0
                        )
                      )[0]
                    }
                  >
                    90
                  </option>
                  <option
                    value={
                      selectedSoldPercentage.map((item) =>
                        item.soldPercentage.map((item) =>
                          item.sold6M_percentage ? item.sold6M_percentage : 0
                        )
                      )[0]
                    }
                  >
                    6M
                  </option>
                  <option
                    value={
                      selectedSoldPercentage.map((item) =>
                        item.soldPercentage.map((item) =>
                          item.sold365_percentage ? item.sold365_percentage : 0
                        )
                      )[0]
                    }
                  >
                    1Y
                  </option>
                </select>
              </td>
              <>
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
              </>

              <td style={{ background: '#f0e68c' }}>SOLD_QTY</td>

              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyearSoldQty6
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.qtyshp)[0]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.qtyshp)[1]}
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
                    <>{lastyearSoldQty6}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyearSoldQty5
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.qtyshp)[2]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.qtyshp)[3]}
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
                    <>{lastyearSoldQty5}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyearSoldQty4
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.qtyshp)[4]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.qtyshp)[5]}
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
                    <>{lastyearSoldQty4}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyearSoldQty3
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.qtyshp)[6]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.qtyshp)[7]}
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
                    <>{lastyearSoldQty3}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyearSoldQty2
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.qtyshp)[8]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.qtyshp)[9]}
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
                    <>{lastyearSoldQty2}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyearSoldQty
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.qtyshp)[10]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.qtyshp)[11]}
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
                    <>{lastyearSoldQty}</>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
            </tr>

            <tr className="row9">
              <>
                <InfoItemOb className="infoCol1" name="PO's 2" />
              </>

              <td colSpan="3">
                {WDsearch.map((item, idx) => (
                  <Fragment key={idx}>
                    <span className="pctn" style={{ float: 'left' }}>
                      P: {item.Pcs_ctn}
                    </span>
                    <span className="pctn" style={{ float: 'right' }}>
                      (L:{item.Front_lc_leng_l} X W:{item.Front_lc_leng_w} X
                      H:0)
                    </span>
                  </Fragment>
                ))}
              </td>
              <>
                {/* {test2.map((item) => item.reqdate)[0] == null ? (
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
              )} */}
              </>

              <td>SAMPLE:</td>
              <td>{WDsearch.map((item) => item.SampleShp)}</td>
              <td style={{ background: '#f0e68c' }}>YoY</td>

              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            <span
                              style={{ color: YoY6 >= 0 ? 'green' : 'red' }}
                            >
                              {YoY6.toFixed(2)}%
                            </span>
                          ) : (
                            <>
                              <span
                                style={{
                                  float: 'left',
                                  paddingLeft: '4px',
                                  color: YoYEachMonth >= 0 ? 'green' : 'red',
                                  fontSize: '10px',
                                }}
                              >
                                {YoYEachMonth.toFixed(1)}%
                              </span>
                              <span
                                style={{
                                  float: 'right',
                                  paddingRight: '4px',
                                  color: YoYEachMonth2 >= 0 ? 'green' : 'red',
                                  fontSize: '10px',
                                }}
                              >
                                {YoYEachMonth2.toFixed(1)}%
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
                    <span style={{ color: YoY6 >= 0 ? 'green' : 'red' }}>
                      {YoY6.toFixed(1)}%
                    </span>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            <span
                              style={{ color: YoY5 >= 0 ? 'green' : 'red' }}
                            >
                              {YoY5.toFixed(2)}%
                            </span>
                          ) : (
                            <>
                              <span
                                style={{
                                  float: 'left',
                                  paddingLeft: '4px',
                                  color: YoYEachMonth3 >= 0 ? 'green' : 'red',
                                  fontSize: '10px',
                                }}
                              >
                                {YoYEachMonth3.toFixed(1)}%
                              </span>
                              <span
                                style={{
                                  float: 'right',
                                  paddingRight: '4px',
                                  color: YoYEachMonth4 >= 0 ? 'green' : 'red',
                                  fontSize: '10px',
                                }}
                              >
                                {YoYEachMonth4.toFixed(1)}%
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
                    <span style={{ color: YoY5 >= 0 ? 'green' : 'red' }}>
                      {YoY5.toFixed(2)}%
                    </span>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            <span
                              style={{ color: YoY4 >= 0 ? 'green' : 'red' }}
                            >
                              {YoY4.toFixed(2)}%
                            </span>
                          ) : (
                            <>
                              <span
                                style={{
                                  float: 'left',
                                  paddingLeft: '4px',
                                  color: YoYEachMonth5 >= 0 ? 'green' : 'red',
                                  fontSize: '10px',
                                }}
                              >
                                {YoYEachMonth5.toFixed(1)}%
                              </span>
                              <span
                                style={{
                                  float: 'right',
                                  paddingRight: '4px',
                                  color: YoYEachMonth6 >= 0 ? 'green' : 'red',
                                  fontSize: '10px',
                                }}
                              >
                                {YoYEachMonth6.toFixed(1)}%
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
                    <span style={{ color: YoY4 >= 0 ? 'green' : 'red' }}>
                      {YoY4.toFixed(2)}%
                    </span>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            <span
                              style={{ color: YoY3 >= 0 ? 'green' : 'red' }}
                            >
                              {YoY3.toFixed(2)}%
                            </span>
                          ) : (
                            <>
                              <span
                                style={{
                                  float: 'left',
                                  paddingLeft: '4px',
                                  color: YoYEachMonth7 >= 0 ? 'green' : 'red',
                                  fontSize: '10px',
                                }}
                              >
                                {YoYEachMonth7.toFixed(1)}%
                              </span>
                              <span
                                style={{
                                  float: 'right',
                                  paddingRight: '4px',
                                  color: YoYEachMonth8 >= 0 ? 'green' : 'red',
                                  fontSize: '10px',
                                }}
                              >
                                {YoYEachMonth8.toFixed(1)}%
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
                    <span style={{ color: YoY3 >= 0 ? 'green' : 'red' }}>
                      {YoY3.toFixed(2)}%
                    </span>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            <span
                              style={{ color: YoY2 >= 0 ? 'green' : 'red' }}
                            >
                              {YoY2.toFixed(2)}%
                            </span>
                          ) : (
                            <>
                              <span
                                style={{
                                  float: 'left',
                                  paddingLeft: '4px',
                                  color: YoYEachMonth9 >= 0 ? 'green' : 'red',
                                  fontSize: '10px',
                                }}
                              >
                                {YoYEachMonth9.toFixed(1)}%
                              </span>
                              <span
                                style={{
                                  float: 'right',
                                  paddingRight: '4px',
                                  color: YoYEachMonth10 >= 0 ? 'green' : 'red',
                                  fontSize: '10px',
                                }}
                              >
                                {YoYEachMonth10.toFixed(1)}%
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
                    <span style={{ color: YoY2 >= 0 ? 'green' : 'red' }}>
                      {YoY2.toFixed(2)}%
                    </span>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            <span style={{ color: YoY >= 0 ? 'green' : 'red' }}>
                              {YoY.toFixed(2)}%
                            </span>
                          ) : (
                            <>
                              <span
                                style={{
                                  float: 'left',
                                  paddingLeft: '4px',
                                  color: YoYEachMonth11 >= 0 ? 'green' : 'red',
                                  fontSize: '10px',
                                }}
                              >
                                {YoYEachMonth11.toFixed(1)}%
                              </span>
                              <span
                                style={{
                                  float: 'right',
                                  paddingRight: '4px',
                                  color: YoYEachMonth12 >= 0 ? 'green' : 'red',
                                  fontSize: '10px',
                                }}
                              >
                                {YoYEachMonth12.toFixed(1)}%
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
                    <span style={{ color: YoY >= 0 ? 'green' : 'red' }}>
                      {YoY.toFixed(2)}%
                    </span>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                } */}
              </td>
            </tr>
            <tr className="row10">
              <>
                <InfoItemOb className="infoCol1" name="ST_DATE" />
              </>

              <td className="stDate" colSpan="3">
                {
                  search
                    .filter((item) => item.start_dte)

                    .map(
                      (item) =>
                        new Date(item.start_dte).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <>
                {/* {test2.map((item) => item.recdate)[0] == null ? (
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
              )} */}
              </>

              <td>REORD:</td>
              <td>{WDsearch.map((item) => item.ReordShp)}</td>
              <td style={{ background: '#f0e68c' }}>RCV_QTY</td>

              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyearRCVQty6
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.qtyrec)[0]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.qtyrec)[1]}
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
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyearRCVQty5
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.qtyrec)[2]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.qtyrec)[3]}
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
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyearRCVQty4
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.qtyrec)[4]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.qtyrec)[5]}
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
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyearRCVQty3
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.qtyrec)[6]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.qtyrec)[7]}
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
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyearRCVQty2
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.qtyrec)[8]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.qtyrec)[9]}
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
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
              <td>
                {search.length ? (
                  value2.length ? (
                    graphLoading === false ? (
                      value2.length ? (
                        <>
                          {value2 === 'YEAR' ? (
                            lastyearRCVQty
                          ) : (
                            <>
                              <span
                                style={{ float: 'left', paddingLeft: '4px' }}
                              >
                                {monthData.map((item) => item.qtyrec)[10]}
                              </span>
                              <span
                                style={{ float: 'right', paddingRight: '4px' }}
                              >
                                {monthData.map((item) => item.qtyrec)[11]}
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
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                } */}
              </td>
            </tr>

            <tr className="row11">
              <>
                {search.length > 0 ? (
                  <td className="PRL">
                    {PRLmin} - {PRLmax}
                  </td>
                ) : (
                  <td></td>
                )}
              </>

              <td colSpan="2" className="price">
                {
                  search
                    .filter((item) => typeof item.price === 'number')
                    .map((item, idx) => (
                      <Fragment key={idx}>PRICE: ${item.price}</Fragment>
                    ))[0]
                }
              </td>
              <>
                {/* {test2.map((item) => item.recdate)[0] == null ? (
                <td></td>
              ) : (
                <td>{Math.floor(Difference_In_Days)} days</td>
              )} */}
              </>

              <td>Class: {search.map((item) => item.class)[0]}</td>
              <>
                {/* {test2.map((item) => item.recdate)[0] == null ? (
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
              )} */}
              </>

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
              <td className="prv30">{past365c}</td>
              <td></td>

              <td>
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                } */}
              </td>
              <td>
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                } */}
              </td>
              <td>
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                } */}
              </td>
              <td>
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                } */}
              </td>
              <td className="prv30" style={{ background: '#f4a460' }}>
                FORECAST
              </td>
              <td>
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                } */}
              </td>
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

              <>
                {/* waiting & rcvd table  */}
                {/* {selectedItem.length > 0 ? (
                test2.map((item) => item.recdate)[0] == null ? (
                  <td style={{ color: 'red' }}>WAITING</td>
                ) : (
                  <td style={{ color: 'green' }}>RCVD</td>
                )
              ) : (
                <td></td>
              )} */}
              </>

              <td>
                Vend:{' '}
                {
                  search.map((item) =>
                    item.reorderPointO.map((item) => item.vendno)
                  )[0]
                }
              </td>
              <>
                {/* <td id="recDte" className="recDateSel_cal">
                {new Date().toISOString().split('T')[0]}
              </td> */}
              </>

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
                {new Date().toISOString().split('T')[0]}
              </td>

              <td></td>

              <td>
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                } */}
              </td>
              <td>
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                } */}
              </td>
              <td>
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                } */}
              </td>
              <td>
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                } */}
              </td>
              <td>
                {/* forecast datepicker */}
                <DatePicker
                  className="w-20 border-2 border-zinc-500 text-center"
                  minDate={new Date()}
                  maxDate={new Date().setDate(new Date().getDate() + 365)}
                  selected={forecastDatePicker}
                  onChange={(date) => setForecasteDatePicker(date)}
                />
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                } */}
              </td>
              <td>
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                } */}
              </td>
            </tr>
          </tbody>

          <tbody id="tb2" className="table2">
            <tr>
              <td>CLRS:{totalItems}</td>
              <td>OH</td>

              <td style={{ background: '#f4a460' }}>REORDER</td>
              <td>
                {/*POS initial && Warning error*/}
                {/* <div className="App">
                  <select
                    className="border border-zinc-500"
                    name="item-selected"
                    value={selectedItem}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    

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
                </div> */}
                PENDING
              </td>

              <td colSpan={2}>{Math.floor(Difference_In_Days2)} days</td>
              <td>SOLD30</td>
              <td>SOLD90</td>
              <td>SOLD365</td>
              <td style={{ fontSize: '12px' }}>AVG_SOLD(1Y)</td>
              <td>
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                } */}
                AVG_LEAD
              </td>
              <td>
                MAX_LEAD
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                } */}
              </td>
              <td>
                BO_lastRCV
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                } */}
              </td>
              <td>
                Suggested
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                } */}
              </td>
              <td>
                +{Difference_In_PostDayresult} days
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                } */}
              </td>
              <td>
                FoSuggested
                {/* {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                } */}
              </td>
            </tr>
          </tbody>

          {search.length > 0 ? (
            loading === false ? (
              <Fragment>
                <tbody id="tt" className="bottomSearch">
                  <>
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
                  </>

                  <td style={{ padding: '0' }}>
                    {search
                      .filter(
                        (item) =>
                          typeof item.onhand === 'number' ||
                          item.onhand === null
                      )
                      .map((item, idx) => (
                        <div key={idx}>{item.onhand}</div>
                      ))}
                    <div>{totalItems2}</div>
                  </td>
                  {/*  reorder */}
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

                  {/* {selectedItem.length > 0 ? (
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
                )} */}
                  <td style={{ padding: '0' }}>
                    {search.map((item, idx) =>
                      item.pendingDataO.length ? (
                        item.pendingDataO.map((item2, idx2) => (
                          <div key={idx2}>{item2.pending}</div>
                        ))
                      ) : (
                        <div key={idx}>0</div>
                      )
                    )}
                    <div>{totalItems13}</div>
                  </td>

                  {/*sold amount regarding RCVD date //loading && render table cell */}

                  {/* <td style={{ padding: '0' }}>
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
                </td> */}

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
                    {search.map((item, idx) =>
                      item.sold365.length ? (
                        item.sold365.map((item2, idx2) => (
                          <div key={idx2}>{item2.qtyshp}</div>
                        ))
                      ) : (
                        <div key={idx}>0</div>
                      )
                    )}
                    <div>{totalItems6}</div>
                  </td>

                  <td style={{ padding: '0' }}>
                    {search.map((item, idx) =>
                      item.reorderPointO.length ? (
                        item.reorderPointO.map((item2, idx2) => (
                          <div key={idx2}>{item2.avg_qtyshp.toFixed(2)}</div>
                        ))
                      ) : (
                        <div key={idx}>0</div>
                      )
                    )}
                    <div>{totalItems14Decimal}</div>
                  </td>
                  {/*column table with nested array */}
                  {/* <td style={{ padding: '0' }}>
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
                </td> */}
                  <td style={{ padding: '0' }}>
                    {search.map((item, idx) =>
                      item.poLeadTimeO.length ? (
                        item.poLeadTimeO.map((item2, idx2) => (
                          <div key={idx2}>{item2.avg_lead_time} days</div>
                        ))
                      ) : (
                        <div key={idx}>0 days</div>
                      )
                    )}
                    <div>{round(totalItems15)} days</div>
                  </td>
                  {/*column table with nested array */}
                  {/* <td style={{ padding: '0' }}>
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
                </td> */}
                  <td style={{ padding: '0' }}>
                    {search.map((item, idx) =>
                      item.poLeadTimeO.length ? (
                        item.poLeadTimeO.map((item2, idx2) => (
                          <div key={idx2}>{item2.max_lead_time} days</div>
                        ))
                      ) : (
                        <div key={idx}>0 days</div>
                      )
                    )}
                    <div>{round(totalItems16)} days</div>
                  </td>
                  {/*column table with nested array */}
                  <td style={{ padding: '0' }}>
                    {/* {search.map((item, idx) =>
                      item.fourth.length ? (
                        item.fourth.map((item2, idx2) => (
                          <div key={idx2}>{item2.qtyord}</div>
                        ))
                      ) : (
                        <div key={idx}></div>
                      )
                    )}
                    <div>{totalItems9}</div> */}
                    {search.map((item, idx) =>
                      item.bofromLastRcvO.length ? (
                        item.bofromLastRcvO.map((item2, idx2) => (
                          <div key={idx2}>{item2.qtybo}</div>
                        ))
                      ) : (
                        <div key={idx}>0</div>
                      )
                    )}
                    <div>{totalItems17}</div>
                  </td>
                  {/*column table with nested array */}
                  <td style={{ padding: '0' }}>
                    {/* {search.map((item, idx) =>
                      item.third.length ? (
                        item.third.map((item2, idx2) => (
                          <div key={idx2}>{item2.qtyord}</div>
                        ))
                      ) : (
                        <div key={idx}></div>
                      )
                    )}
                    <div>{totalItems10}</div> */}
                    {suggestedQty.map((value, index) => (
                      <div key={`qty-${index}`}>{round(value)}</div>
                    ))}
                    <div>{totalItems18}</div>
                  </td>
                  {/*column table with nested array */}
                  <td style={{ padding: '0' }}>
                    {/* forecast render */}
                    {amounts.map((num, idx) => (
                      <div
                        key={idx}
                        className={num < 0 ? 'negative-amount' : ''}
                      >
                        {round(num)}
                      </div>
                    ))}
                    <div>{totalAmount}</div>
                  </td>

                  {/*column table with nested array */}
                  <td style={{ padding: '0' }}>
                    {/* {search.map((item, idx) =>
                      item.first.length ? (
                        item.first.map((item2, idx2) => (
                          <div key={idx2} style={{ borderRightWidth: '1px' }}>
                            {item2.qtyord}
                          </div>
                        ))
                      ) : (
                        <div
                          key={idx}
                          style={{ borderRightWidth: '1px' }}
                        ></div>
                      )
                    )}
                    <div style={{ borderRightWidth: '1px' }}>
                      {totalItems12}
                    </div> */}
                    {FosuggestedQty.map((num, index) => (
                      <div
                        key={`qty-${index}`}
                        className={num < 0 ? 'negative-amount' : ''}
                        style={{ borderRightWidth: '1px' }}
                      >
                        {round(num)}
                      </div>
                    ))}
                    <div style={{ borderRightWidth: '1px' }}>
                      {round(totalAmount19)}
                    </div>
                  </td>
                </tbody>
              </Fragment>
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

      <>
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
      </>
    </div>
  );
};
