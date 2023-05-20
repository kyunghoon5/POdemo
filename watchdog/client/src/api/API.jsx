import axios from 'axios';
import { useState, useEffect } from 'react';
import mainDataJS from './mainData.json';
import soldPercentageJS from './soldPercentage.json';
import watchdog1JS from './Watchdog1.json';
import watchdog2JS from './Watchdog2.json';
import fetch2JS from './fetchData2.json';
import itemRecordJS from './itemRecords.json';
import graphAllYearJS from './graphAllYearDataAPI.json';
import pieChartJS from './pieChartF.json';
import chartEachJS from './chartEachYearDataAPI.json';
import graphByJS from './graphByItemF.json';
import graphByMonJS from './graphByItemMonthF.json';
import selctFOPICKJS from './fetchData4.json';
import itemreJS from './itemDataAPI.json';
import alertjs from './itemAlertOldAPI.json';
import alert2js from './itemNewOrderAPI.json';
import alert3js from './itemFirstOrderAPI.json';
import alert4js from './itemoldOrderAPI.json'
import newitemket2FJS from './newitemkey2ForecastAPI.json'


const BASE_URL = import.meta.env.VITE_DB_URL;
const MAIN_IMG = import.meta.env.VITE_DB_IMG;

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

  const mockdata = mainDataJS;

  const searchMainData = (record) => {
    const searchedRecord = record.toLowerCase();
    setLoading(true);

    const filteredData = mockdata.filter((item) =>
      item.descrip.toLowerCase().includes(searchedRecord)
    );

    setMainData(filteredData);
    setLoading(false);
  };

  //image
const imageAPI = (record) => {
  const formattedRecord = record.toLowerCase(); // 레코드를 소문자로 변환합니다.
  setMainImg(`./${formattedRecord}.jpg`); // 상대 경로를 사용하여 이미지를 참조합니다.
};

  const mockdatasoldPercentageJS = soldPercentageJS;

  //select & option dropdown soldPercentage
  const soldPercentageAPI = (record) => {
    const searchedRecord = record.toLowerCase();
    setloadingsoldP(true);
    const filteredData = mockdatasoldPercentageJS.filter((item) =>
      item.descrip.toLowerCase().includes(searchedRecord)
    );

    setSelectedSoldPercentage(filteredData);
    setloadingsoldP(false);
  };

  const mockdatawatchDogAPI1JS = watchdog1JS;
  const mockdatawatchDogAPI2JS = watchdog2JS;
  //watchdogAPI
 const watchDogAPI = async (record) => {
   const searchedRecord = record.toLowerCase();

   const promises1 = new Promise((resolve) => {
     const filteredItems = mockdatawatchDogAPI1JS.filter((item) =>
       item.Product.toLowerCase().includes(searchedRecord)
     );
     resolve(filteredItems);
   });

   const promises2 = new Promise((resolve) => {
     const filteredItems = mockdatawatchDogAPI2JS.filter((item) =>
       item.ItemName.toLowerCase().includes(searchedRecord)
     );
     resolve(filteredItems);
   });

   const results = await Promise.all([promises1, promises2]);

   setWatchDoginfo(results[0]);
   setWatchDoginfo2(results[1]);
 };

  const mockfetch2JS = fetch2JS;
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
      const filteredData = mockfetch2JS.filter((item) =>
        item.descrip.toLowerCase().includes(searchedRecord)
      );

      setSelectedDatePicker(filteredData);
      setloadingDatePicker(false);
    };
    fetchData2();
  }, [startDatePicker, endDatePicker, mainData]);

  const mockitemRecordJS = itemRecordJS;
  //itemrank
  const itemRecords = async (record) => {
    const searchedRecord = record.toLowerCase();
    setitemLoading(true);
    const filteredData = mockitemRecordJS.filter((item) =>
      item.descrip.toLowerCase().includes(searchedRecord)
    );

    setitemRank(filteredData);
    setitemLoading(false);
  };
 

  const newitemRecords = async (record) => {
    const searchedRecord = record.toLowerCase();
    setnewitemLoading(true);
    const filteredData = mockitemRecordJS.filter((item) =>
      item.descrip.toLowerCase().includes(searchedRecord)
    );
        setnewitemRank(filteredData);
        setnewitemLoading(false);
      
  };

  const mockgraphAllYearJS = graphAllYearJS;
  const [graphLoading, setGraphLoading] = useState(false);
  const [graphAllYearData, setGraphAllYearData] = useState([]);
  const graphAllYearDataAPI = async (record) => {
    const searchedRecord = record.toLowerCase();
    setGraphLoading(true);
    const filteredData = mockgraphAllYearJS.filter((item) =>
      item.descrip.toLowerCase().includes(searchedRecord)
    );

    setGraphAllYearData(filteredData);
    setGraphLoading(false);
  };
  const mockchartEachJS = chartEachJS;
  const [chartbyEachYearData, setChartbyEachYearData] = useState([]);
  const chartEachYearDataAPI = async (record) => {
    const searchedRecord = record.toLowerCase();
    setGraphLoading(true);
    const filteredData = mockchartEachJS.filter((item) =>
      item.descrip.toLowerCase().includes(searchedRecord)
    );

    setChartbyEachYearData(filteredData);
    setGraphLoading(false);
  };

  const mockgraphByJS = graphByJS;
  //item by color graph
  const [graphLoading2, setGraphLoading2] = useState(false);
  const [graphByItem, setGraphByItem] = useState([]);
  const graphByItemF = async (record) => {
    const searchedRecord = record.toLowerCase();
    setGraphLoading2(true);
    const filteredData = mockgraphByJS.filter((item) =>
      item.descrip.toLowerCase().includes(searchedRecord)
    );
    setGraphByItem(filteredData);
    setGraphLoading2(false);
  };

  const mockgraphByMonJS = graphByMonJS;
  const [graphByItemMonth, setGraphByItemMonth] = useState([]);
  const graphByItemMonthF = async (record) => {
    const searchedRecord = record.toLowerCase();
    setGraphLoading2(true);
    const filteredData = mockgraphByMonJS.filter((item) =>
      item.descrip.toLowerCase().includes(searchedRecord)
    );
    setGraphByItemMonth(filteredData);
    setGraphLoading2(false);
  };

  const mockpieChartJS = pieChartJS;
  const pieChartF = async (record) => {
    const searchedRecord = record.toLowerCase();
    const filteredData = mockpieChartJS.filter((item) =>
      item.descrip.toLowerCase().includes(searchedRecord)
    );

    setpieChart(filteredData);
  };

  //forecast
  const [selforecastDatePicker, setselforecastDatePicker] = useState([]);
  const [ForecastloadingDatePicker, setForecastloadingDatePicker] = useState(
    []
  );
  const mockselctFOPICKJS = selctFOPICKJS;
  useEffect(() => {
    const fetchData4 = async () => {
      const searchedRecord = record.toLowerCase();
      const endDate = forecastDatePicker.toISOString().split('T')[0];
      setForecastloadingDatePicker(true);
      const filteredData = mockselctFOPICKJS.filter((item) =>
        item.descrip.toLowerCase().includes(searchedRecord)
      );
      setselforecastDatePicker(filteredData);
      setForecastloadingDatePicker(false);
    };
    fetchData4();
  }, [forecastDatePicker, mainData]);

  const mockitemreJS = itemreJS;
  const [suggest, setSuggest] = useState([]);
  const itemDataAPI = async () => {
    setSuggest(mockitemreJS);
  };

  useEffect(() => {
    itemDataAPI();
  }, []);

  const mockalertJS = alertjs;
  const [itemAlertOld, setItemAlertOld] = useState([]);

  const itemAlertOldAPI = async () => {
    setLoadingAlert(true);

    setItemAlertOld(mockalertJS);
    setLoadingAlert(false);
  };
  const [itemoldOrder, setItemOldOrder] = useState([]);
  const [loadingOldOrder, setLoadingOldOrder] = useState(false);
  const [loadedOldOrder, setLoadedOldOrder] = useState(false);

  const mockalect4JS =alert4js
  const itemoldOrderAPI = async () => {
    setLoadingOldOrder(true);
   
        setItemOldOrder(mockalect4JS);
        setLoadingOldOrder(false);
        setLoadedOldOrder(true);
      

    
  };
   const mockalect2JS = alert2js;
  const [itemNewOrder, setItemNewOrder] = useState([]);
  const [loadingNewOrder, setLoadingNewOrder] = useState(false);
  const [loadedNewOrder, setLoadedNewOrder] = useState(false);
  const itemNewOrderAPI = async () => {
    setLoadingNewOrder(true);
   
        setItemNewOrder(mockalect2JS);
        setLoadingNewOrder(false);
        setLoadedNewOrder(true);
      

  };
const mockalect3JS = alert3js;
  const [itemFirstOrder, setItemFirstOrder] = useState([]);
  const [loadingFirstOrder, setLoadingFirstOrder] = useState(false);
  const [loadedFirstOrder, setLoadedFirstOrder] = useState(false);
  const itemFirstOrderAPI = async () => {
    setLoadingFirstOrder(true);
  
     
        setItemFirstOrder(mockalect3JS);
        setLoadingFirstOrder(false);
        setLoadedFirstOrder(true);
      

     
  };

  useEffect(() => {
    itemAlertOldAPI();
  }, []);

  const mocknewitemket2FJS = newitemket2FJS;
  const [newitemkey2Forecast, setNewitemKey2Forecast] = useState([]);

  const newitemkey2ForecastAPI = async (record) => {
    const searchedRecord = record.toLowerCase();

   const filteredData = mocknewitemket2FJS.filter((item) =>
     item.descrip.toLowerCase().includes(searchedRecord)
   );
        setNewitemKey2Forecast(filteredData);
     
  };

  return {
    setNewitemKey2Forecast,
    newitemkey2Forecast,
    itemAlertOld,
    mainData,
    loading,
    searchMainData,
    newitemkey2ForecastAPI,
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
    ForecastloadingDatePicker,
    itemFirstOrderAPI,
    loadedFirstOrder,
    itemNewOrderAPI,
    loadedNewOrder,
    itemoldOrderAPI,
    loadedOldOrder,
  };
};

export default API;
