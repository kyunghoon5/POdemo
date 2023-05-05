var express = require('express');
var app = express();
const sql = require('mssql');
let mssql = require('./mssql-connection-pooling');

var cors = require('cors');
app.use(cors());
var _ = require('lodash');

// Configuration for the two SQL servers
const configServer1 = require('./sqlServer1');
const configServer2 = require('./sqlServer2');
const dataPick = require('./routes/dataPick');
const datePicker = require('./routes/datePicker');
const itemRank = require('./routes/itemRank');
const soldPercentage = require('./routes/soldPercentage');
const graph = require('./routes/graph');
const graphByMonth = require('./routes/graphByMonth');

const graphbyitem = require('./routes/graphByitem');
const graphbyitemMonth = require('./routes/graphByitemMonth');
const poForecast = require('./routes/poForecast');
const searchSuggest = require('./routes/searchSuggest');
const newItemRank = require('./routes/newitemRank');
const pieChartQ = require('./routes/pieChartQuarter');
const itemAlertOld = require('./routes/itemAlertOld');
const itemOldOrder = require('./routes/oldItemControlPanel');
const itemNewOrder = require('./routes/newItemControlPanel')
const itemFirstOrder = require('./routes/firstItemControlPanel')
const newItemkey2Forecast = require('./routes/newItemkey2Forecast')

const dotenv = require('dotenv');
dotenv.config();
const { host_url3, host_url4 } = process.env;

//for 3rd API
const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = createProxyMiddleware({
  target: host_url3,
  changeOrigin: true,
});
const path = require('path');

app.get('/downloadItemReorderPoint', (req, res) => {
  const file = path.join(__dirname, '../../../Data/itemReorderList.xlsx');
  res.download(file);
});

app.use('/WatchDog', proxy);
app.use('/dataPick', dataPick);
app.use('/datePicker', datePicker);
app.use('/itemRank', itemRank);
app.use('/soldPercentage', soldPercentage);
app.use('/graph', graph);
app.use('/graphbymonth', graphByMonth);

app.use('/graphByItem', graphbyitem);
app.use('/graphByItemMonth', graphbyitemMonth);
app.use('/poForecast', poForecast);
app.use('/searchAuto', searchSuggest);
app.use('/newItemRank', newItemRank);
app.use('/pieChart', pieChartQ);
app.use('/itemAlertOld', itemAlertOld);
app.use('/itemOldOrder', itemOldOrder)
app.use('/itemNewOrder', itemNewOrder)
app.use('/itemFirstOrder',itemFirstOrder)
app.use('/newItemKey2Forecast', newItemkey2Forecast)

const utils = require('./data/utils');

// Define an endpoint for merging data from both servers
app.get('/mergeData', async (req, res) => {
  try {
    // Connect to both servers
    // const sqlPool = await mssql.GetCreateIfNotExistPool(configServer1);
    // let request1 = new sql.Request(sqlPool);

    // Query the two servers for data
    //   const result1 = await request1.query(`
    // `);

    //   const result11 = await request1.query(``);

    // Connect to both servers
    const sqlPool = await mssql.GetCreateIfNotExistPool(configServer1);
    let request1 = new sql.Request(sqlPool);
    const loadQ = await utils.loadSqlQueries('events');
    const mainInfoQuery = await loadQ.mainInfo.replace(
      '${req.query.descrip}',
      req.query.descrip
    );

    // Query the two servers for data
    //main query
    const result2 = await request1.query(mainInfoQuery);

    const sold30Query = await loadQ.sold30.replace(
      '${req.query.descrip}',
      req.query.descrip
    );
    const result2Sold30 = await request1.query(sold30Query);

    const sold60Query = await loadQ.sold60.replace(
      '${req.query.descrip}',
      req.query.descrip
    );
    const result2Sold60 = await request1.query(sold60Query);

    const sold90Query = await loadQ.sold90.replace(
      '${req.query.descrip}',
      req.query.descrip
    );
    const result2Sold90 = await request1.query(sold90Query);

    const sold365Query = await loadQ.sold365.replace(
      '${req.query.descrip}',
      req.query.descrip
    );
    const result2Sold365 = await request1.query(sold365Query);

    // rank non RB
    //Seach value parsing into query
    // const purnoFirstQuery = await loadQ.purnoFirst.replace(
    //   '${req.query.descrip}',
    //   req.query.descrip
    // );
    // const result21 = await request1.query(purnoFirstQuery);

    // //Seach value parsing into query
    // const purnoSecondQuery = await loadQ.purnoSecond.replace(
    //   '${req.query.descrip}',
    //   req.query.descrip
    // );
    // const result22 = await request1.query(purnoSecondQuery);

    // //Seach value parsing into query
    // const purnoThirdQuery = await loadQ.purnoThird.replace(
    //   '${req.query.descrip}',
    //   req.query.descrip
    // );
    // const result23 = await request1.query(purnoThirdQuery);

    // //Seach value parsing into query
    // const purnoFourthQuery = await loadQ.purnoFourth.replace(
    //   '${req.query.descrip}',
    //   req.query.descrip
    // );
    // const result24 = await request1.query(purnoFourthQuery);

    // //Seach value parsing into query
    // const purnoFifthQuery = await loadQ.purnoFifth.replace(
    //   '${req.query.descrip}',
    //   req.query.descrip
    // );
    // const result25 = await request1.query(purnoFifthQuery);

    // //Seach value parsing into query
    // const purnoSixthQuery = await loadQ.purnoSixth.replace(
    //   '${req.query.descrip}',
    //   req.query.descrip
    // );

    // const result26 = await request1.query(purnoSixthQuery);

    const reOrderPointMainQuery = await loadQ.ReorderPointMain.replace(
      '${req.query.descrip}',
      req.query.descrip
    );
    const reOrderPointMain = await request1.query(reOrderPointMainQuery);

    const poPendingDataQuery = await loadQ.POpendingData.replace(
      '${req.query.descrip}',
      req.query.descrip
    );

    const poPendingData = await request1.query(poPendingDataQuery);

    const poLeadTimeQuery = await loadQ.POleadTime.replace(
      '${req.query.descrip}',
      req.query.descrip
    );

    const poLeadTime = await request1.query(poLeadTimeQuery);

    const itemClassQuery = await loadQ.itemClass.replace(
      /\${req\.query\.descrip}/g,
      req.query.descrip || ''
    );

    const itemClassData = await request1.query(itemClassQuery);

    const firstOrderitemQuery = await loadQ.firstOrderItem.replace(
      '${req.query.descrip}',
      req.query.descrip
    );

    const firstOrderitemData = await request1.query(firstOrderitemQuery);



    
    const mergedResults = [...result2.recordset];

  
    const mergeArrays = (
      arr1,

      sold30,
      sold60,
      sold90,
      sold365,
      reorderPointO,
      pendingDataO,
      poLeadTimeO,
      itemClass,
      firstOrderitem,
      
    ) => {
      return arr1.map((obj) => {
        const numbers7 = sold30.filter(
          (item) => item.itemkey2 === obj.itemkey2
        );

        const numbers12 = sold90.filter(
          (item) => item.itemkey2 === obj.itemkey2
        );
        const numbers13 = sold365.filter(
          (item) => item.itemkey2 === obj.itemkey2
        );
        const numbers14 = sold60.filter(
          (item) => item.itemkey2 === obj.itemkey2
        );
        const numbers15 = reorderPointO.filter(
          (item) => item.itemkey2 === obj.itemkey2
        );
        const numbers16 = pendingDataO.filter(
          (item) => item.itemkey2 === obj.itemkey2
        );

        const numbers17 = poLeadTimeO.filter(
          (item) => item.itemkey2 === obj.itemkey2
        );

        const number18 = itemClass.filter(
          (item) => item.itemkey2 === obj.itemkey2
        );

        const number19 = firstOrderitem.filter(
          (item) => item.descrip === obj.descrip
        );
      


        if (!numbers7.length) {
          obj.sold30 = numbers7;
          obj.sold60 = numbers14;
          obj.sold90 = numbers12;
          obj.sold365 = numbers13;
          obj.reorderPointO = numbers15;
          obj.pendingDataO = numbers16;
          obj.poLeadTimeO = numbers17;
          obj.itemClass = number18;
          obj.firstOrderItem = number19;
   
          return obj;
        }

        obj.sold30 = numbers7.map((num) => ({
          qtyshp: num.qtyshp,
        }));
        obj.sold90 = numbers12.map((num) => ({
          qtyshp: num.qtyshp,
        }));
        obj.sold60 = numbers14.map((num) => ({ qtyshp: num.qtyshp }));
        obj.sold365 = numbers13.map((num) => ({
          qtyshp: num.qtyshp,
        }));

        obj.reorderPointO = numbers15.map((num) => ({
          itemkey2: num.itemkey2,
          vendno: num.vendno,
          qtyshp: num.qtyshp,
          avg_qtyshp: num.avg_qtyshp,
          qtybo: num.qtybo,
        }));

        obj.pendingDataO = numbers16.map((num) => ({
          itemkey2: num.itemkey2,
          pending: num.pending,
        }));

        obj.poLeadTimeO = numbers17.map((num) => ({
          itemkey2: num.itemkey2,
          avg_lead_time: num.avg_lead_time,
          max_lead_time: num.max_lead_time,
        }));

        obj.itemClass = number18.map((num) => ({
          descrip: num.descrip,
          class: num.class,
          vendno: num.vendno,
        }));

        obj.firstOrderItem = number19.map((num) => ({
          descrip: num.descrip,
          start_date: num.start_date,
        }));
     

        return obj;
      });
    };

    const result = mergeArrays(
      result2.recordset,
      result2Sold30.recordset,
      result2Sold60.recordset,
      result2Sold90.recordset,
      result2Sold365.recordset,
      reOrderPointMain.recordset,
      poPendingData.recordset,
      poLeadTime.recordset,
      itemClassData.recordset,
      firstOrderitemData.recordset,

    );

   

    if (req.query.descrip) {
      const descrips = req.query.descrip;
      const result = mergedResults.filter(
        (obj) => obj.descrip?.trim().toLowerCase() === descrips
      );

      if (result) {
        
        res.send(result);
      } else {
   
        res.status(404).send('Object not found');
      }
    } else {

      res.send(mergedResults);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Start the server on port 8082
app.listen(8082, host_url4,  () => {
  console.log('Server listening on port 8082');
});
