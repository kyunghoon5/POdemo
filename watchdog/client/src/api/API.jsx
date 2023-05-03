import axios from 'axios';
import { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_DB_URL;

const API = (startDatePicker, endDatePicker, forecastDatePicker) => {
  const [record, setRecord] = useState('');
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAlert, setLoadingAlert] = useState(false);
  const [mainImg, setMainImg] = useState();
  const [selectedSoldPercentage, setSelectedSoldPercentage] = useState([]);
  const [loadingsoldP, setloadingsoldP] = useState(false);
  const [watchDoginfo, setWatchDoginfo] = useState([]);
  const [watchDoginfo2, setWatchDoginfo2] = useState([]);
  const [selectedDatePicker, setSelectedDatePicker] = useState([]);
  const [loadingDatePicker, setloadingDatePicker] = useState(false);
  const [itemRank, setitemRank] = useState([]);
  const [itemLoading, setitemLoading] = useState(false);
  const [newitemRank, setnewitemRank] = useState([]);
  const [newitemLoading, setnewitemLoading] = useState(false);
  const [pieChart, setpieChart] = useState([]);

  const searchMainData = (record) => {
    const searchedRecord = record.toLowerCase();
    setLoading(true);
    axios
      .get(`${BASE_URL}mergeData?descrip=${searchedRecord}`)
      .then((response) => {
        setMainData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  //image
  const imageAPI = (record) => {
    setMainImg(`http://img.vanessahair.com/sales/${record}.jpg`);
  };

  //select & option dropdown soldPercentage
  const soldPercentageAPI = (record) => {
    const searchedRecord = record.toLowerCase();
    setloadingsoldP(true);
    axios
      .get(`${BASE_URL}soldPercentage?descrip=${searchedRecord}`)

      .then((response) => {
        setSelectedSoldPercentage(response.data);
        setloadingsoldP(false);
      });
  };

  //watchdogAPI
  const watchDogAPI = async (record) => {
    const searchedRecord = record.toLowerCase();
    const promises = [
      await axios.get(
        `${BASE_URL}WatchDog/WDInfo?search=${searchedRecord}&user=undefined/`
      ),
      axios.get(`${BASE_URL}WatchDog/ColorList?search=${searchedRecord}`),
    ];
    Promise.all(promises)
      .then(([wdInfoResponse, colorListResponse]) => {
        setWatchDoginfo(wdInfoResponse.data);
        setWatchDoginfo2(colorListResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //datepicker between two dates
  useEffect(() => {
    const fetchData2 = async () => {
      if (mainData.length === 0) {
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
  }, [startDatePicker, endDatePicker, mainData]);

  //itemrank
  const itemRecords = async (record) => {
    const searchedRecord = record.toLowerCase();
    setitemLoading(true);
    await axios
      .get(`${BASE_URL}itemRank?descrip=${searchedRecord}`)

      .then((response) => {
        setitemRank(response.data);
        setitemLoading(false);
      });
  };

  const newitemRecords = async (record) => {
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
  const [graphAllYearData, setGraphAllYearData] = useState([]);
  const graphAllYearDataAPI = async (record) => {
    const searchedRecord = record.toLowerCase();
    setGraphLoading(true);
    await axios
      .get(`${BASE_URL}graph?descrip=${searchedRecord}`)

      .then((response) => {
        setGraphAllYearData(response.data);
        setGraphLoading(false);
      });
  };

  const [chartbyEachYearData, setChartbyEachYearData] = useState([]);
  const chartEachYearDataAPI = async (record) => {
    const searchedRecord = record.toLowerCase();
    setGraphLoading(true);
    await axios
      .get(`${BASE_URL}graphbymonth?descrip=${searchedRecord}`)

      .then((response) => {
        setChartbyEachYearData(response.data);
        setGraphLoading(false);
      });
  };

  //item by color graph
  const [graphLoading2, setGraphLoading2] = useState(false);
  const [graphByItem, setGraphByItem] = useState([]);
  const graphByItemF = async (record) => {
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
  const graphByItemMonthF = async (record) => {
    const searchedRecord = record.toLowerCase();
    setGraphLoading2(true);
    await axios
      .get(`${BASE_URL}graphByItemMonth?descrip=${searchedRecord}`)

      .then((response) => {
        setGraphByItemMonth(response.data);
        setGraphLoading2(false);
      });
  };

  const pieChartF = async (record) => {
    const searchedRecord = record.toLowerCase();
    await axios
      .get(`${BASE_URL}pieChart?descrip=${searchedRecord}`)
      .then((response) => {
        setpieChart(response.data);
      });
  };

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

  const [suggest, setSuggest] = useState([]);
  const itemDataAPI = async () => {
    return await axios
      .get(`${BASE_URL}searchAuto`)
      .then((response) => setSuggest(response.data))
      
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    itemDataAPI();
  }, []);

  const handleDownload17 = () => {
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
    });
  };

  const [itemAlertOld, setItemAlertOld] = useState([]);

  const itemAlertOldAPI = async () => {
    setLoadingAlert(true);
    return await axios
      .get(`${BASE_URL}itemAlertOld`)
      .then((response) => {setItemAlertOld(response.data)
      setLoadingAlert(false);})
      
      .catch((err) => console.log(err));
      
  };
  const [itemoldOrder, setItemOldOrder] = useState([]);
    const [loadingOldOrder, setLoadingOldOrder] = useState(false);

  const itemoldOrderAPI = async () => {
   setLoadingOldOrder(true)
    return await axios
      .get(`${BASE_URL}itemOldOrder`)
      .then((response) => {
        setItemOldOrder(response.data);
       setLoadingOldOrder(false)
      })

      .catch((err) => console.log(err));
  };
   const [itemNewOrder, setItemNewOrder] = useState([]);
const [loadingNewOrder, setLoadingNewOrder] = useState(false);
   const itemNewOrderAPI = async () => {
    setLoadingNewOrder(true)
     return await axios
       .get(`${BASE_URL}itemNewOrder`)
       .then((response) => {
         setItemNewOrder(response.data);
      setLoadingNewOrder(false)
       })

       .catch((err) => console.log(err));
   };
    
     const [itemFirstOrder, setItemFirstOrder] = useState([]);
const [loadingFirstOrder, setLoadingFirstOrder] = useState(false);
     const itemFirstOrderAPI = async () => {
     setLoadingFirstOrder(true)
       return await axios
         .get(`${BASE_URL}itemFirstOrder`)
         .then((response) => {
           setItemFirstOrder(response.data);
         setLoadingFirstOrder(false)
         })

         .catch((err) => console.log(err));
     };

     
  useEffect(() => {
    itemAlertOldAPI();
    itemoldOrderAPI();
    itemNewOrderAPI();
    itemFirstOrderAPI();
  }, []);
  

  return {
    itemAlertOld,
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
    setGraphLoading,
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
    selforecastDatePicker,
    suggest,
    setSuggest,
    record,
    setRecord,
    loadingAlert,
    itemFirstOrder,
    itemNewOrder,
    itemoldOrder,
    loadingOldOrder,
    loadingNewOrder,
    loadingFirstOrder,
  };
};

export default API;
