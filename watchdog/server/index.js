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

// app.get('/download', (req, res) => {
//   const file = path.join(__dirname, '../../Data/RB Rank.xlsx');
//   res.download(file);
// });
// app.get('/downloadnonRB', (req, res) => {
//   const file = path.join(__dirname, '../../Data/nonRB Rank.xlsx');
//   res.download(file);
// });
// app.get('/downloadNewItem', (req, res) => {
//   const file = path.join(__dirname, '../../Data/newItem Rank.xlsx');
//   res.download(file);
// });
// app.get('/download1Q', (req, res) => {
//   const file = path.join(__dirname, '../../Data/1Q.xlsx');
//   res.download(file);
// });
// app.get('/download2Q', (req, res) => {
//   const file = path.join(__dirname, '../../Data/2Q.xlsx');
//   res.download(file);
// });
// app.get('/download3Q', (req, res) => {
//   const file = path.join(__dirname, '../../Data/3Q.xlsx');
//   res.download(file);
// });
// app.get('/download4Q', (req, res) => {
//   const file = path.join(__dirname, '../../Data/4Q.xlsx');
//   res.download(file);
// });
// app.get('/downloadCheck2021', (req, res) => {
//   const file = path.join(__dirname, '../../Data/2020-2021 change_rate.xlsx');
//   res.download(file);
// });

// app.get('/downloadCheck2022', (req, res) => {
//   const file = path.join(__dirname, '../../Data/2021-2022 change_rate.xlsx');
//   res.download(file);
// });
// app.get('/downloadXSHORT', (req, res) => {
//   const file = path.join(__dirname, '../../Data/size rank/XSHORT.xlsx');
//   res.download(file);
// });
// app.get('/downloadSHORT', (req, res) => {
//   const file = path.join(__dirname, '../../Data/size rank/SHORT.xlsx');
//   res.download(file);
// });
// app.get('/downloadMIDSHORT', (req, res) => {
//   const file = path.join(__dirname, '../../Data/size rank/MID_SHORT.xlsx');
//   res.download(file);
// });
// app.get('/downloadMID', (req, res) => {
//   const file = path.join(__dirname, '../../Data/size rank/MID.xlsx');
//   res.download(file);
// });
// app.get('/downloadMIDLONG', (req, res) => {
//   const file = path.join(__dirname, '../../Data/size rank/MID_LONG.xlsx');
//   res.download(file);
// });
// app.get('/downloadLONG', (req, res) => {
//   const file = path.join(__dirname, '../../Data/size rank/LONG.xlsx');
//   res.download(file);
// });
// app.get('/downloadXLONG', (req, res) => {
//   const file = path.join(__dirname, '../../Data/size rank/XLONG.xlsx');
//   res.download(file);
// });

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
const utils = require('./data/utils');

// Define an endpoint for merging data from both servers
app.get('/mergeData', async (req, res) => {
  try {
    // Connect to both servers
    const sqlPool = await mssql.GetCreateIfNotExistPool(configServer1);
    // let request1 = new sql.Request(sqlPool);

    // Query the two servers for data
    //   const result1 = await request1.query(`
    // `);

    //   const result11 = await request1.query(``);

    // Connect to both servers
    const sqlPool2 = await mssql.GetCreateIfNotExistPool(configServer2);
    let request2 = new sql.Request(sqlPool2);
    const loadQ = await utils.loadSqlQueries('events');
    const mainInfoQuery = await loadQ.mainInfo.replace(
      '${req.query.descrip}',
      req.query.descrip
    );

    // Query the two servers for data
    //main query
    const result2 = await request2.query(mainInfoQuery);

    const sold30Query = await loadQ.sold30.replace(
      '${req.query.descrip}',
      req.query.descrip
    );
    const result2Sold30 = await request2.query(sold30Query);

    const sold60Query = await loadQ.sold60.replace(
      '${req.query.descrip}',
      req.query.descrip
    );
    const result2Sold60 = await request2.query(sold60Query);

    const sold90Query = await loadQ.sold90.replace(
      '${req.query.descrip}',
      req.query.descrip
    );
    const result2Sold90 = await request2.query(sold90Query);

    const sold365Query = await loadQ.sold365.replace(
      '${req.query.descrip}',
      req.query.descrip
    );
    const result2Sold365 = await request2.query(sold365Query);

    // rank non RB
    //Seach value parsing into query
    // const purnoFirstQuery = await loadQ.purnoFirst.replace(
    //   '${req.query.descrip}',
    //   req.query.descrip
    // );
    // const result21 = await request2.query(purnoFirstQuery);

    // //Seach value parsing into query
    // const purnoSecondQuery = await loadQ.purnoSecond.replace(
    //   '${req.query.descrip}',
    //   req.query.descrip
    // );
    // const result22 = await request2.query(purnoSecondQuery);

    // //Seach value parsing into query
    // const purnoThirdQuery = await loadQ.purnoThird.replace(
    //   '${req.query.descrip}',
    //   req.query.descrip
    // );
    // const result23 = await request2.query(purnoThirdQuery);

    // //Seach value parsing into query
    // const purnoFourthQuery = await loadQ.purnoFourth.replace(
    //   '${req.query.descrip}',
    //   req.query.descrip
    // );
    // const result24 = await request2.query(purnoFourthQuery);

    // //Seach value parsing into query
    // const purnoFifthQuery = await loadQ.purnoFifth.replace(
    //   '${req.query.descrip}',
    //   req.query.descrip
    // );
    // const result25 = await request2.query(purnoFifthQuery);

    // //Seach value parsing into query
    // const purnoSixthQuery = await loadQ.purnoSixth.replace(
    //   '${req.query.descrip}',
    //   req.query.descrip
    // );

    // const result26 = await request2.query(purnoSixthQuery);

    const reOrderPointMainQuery = await loadQ.ReorderPointMain.replace(
      '${req.query.descrip}',
      req.query.descrip
    );
    const reOrderPointMain = await request2.query(reOrderPointMainQuery);

    const poPendingDataQuery = await loadQ.POpendingData.replace(
      '${req.query.descrip}',
      req.query.descrip
    );

    const poPendingData = await request2.query(poPendingDataQuery);

    const poLeadTimeQuery = await loadQ.POleadTime.replace(
      '${req.query.descrip}',
      req.query.descrip
    );

    const poLeadTime = await request2.query(poLeadTimeQuery);

    const itemClassQuery = await loadQ.itemClass.replace(
      '${req.query.descrip}',
      req.query.descrip
    );

    const itemClassData = await request2.query(itemClassQuery);

    // Combine the two results into a single array
    const mergedResults = [...result2.recordset];

    // for (var i = 0; i < result2.recordset.length; i++){
    //   console.log(result2.recordset[i].itemkey2)}

    //obj recursive merge + POorder
    const mergeArrays = (
      arr1,
      // arr2,
      // arr3,
      // arr4,
      // arr5,
      // arr6,
      // arr7,
      sold30,
      sold60,
      sold90,
      sold365,
      reorderPointO,
      pendingDataO,
      poLeadTimeO,
      itemClass
    ) => {
      return arr1.map((obj) => {
        // const numbers = arr2.filter((nums) => nums.itemkey2 === obj.itemkey2);
        // const numbers2 = arr3.filter((item) => item.itemkey2 === obj.itemkey2);
        // const numbers3 = arr4.filter((item) => item.itemkey2 === obj.itemkey2);
        // const numbers4 = arr5.filter((item) => item.itemkey2 === obj.itemkey2);
        // const numbers5 = arr6.filter((item) => item.itemkey2 === obj.itemkey2);
        // const numbers6 = arr7.filter((item) => item.itemkey2 === obj.itemkey2);
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

        if (!numbers7.length) {
          // obj.first = numbers;
          // obj.second = numbers2;
          // obj.third = numbers3;
          // obj.fourth = numbers4;
          // obj.fifth = numbers5;
          // obj.sixth = numbers6;
          obj.sold30 = numbers7;
          obj.sold60 = numbers14;
          obj.sold90 = numbers12;
          obj.sold365 = numbers13;
          obj.reorderPointO = numbers15;
          obj.pendingDataO = numbers16;
          obj.poLeadTimeO = numbers17;
          obj.itemClass = number18;

          return obj;
        }
        // obj.first = numbers.map((num) => ({
        //   itemkey2: num.itemkey2,
        //   purno: num.purno,
        //   qtyord: num.qtyord,
        //   portn: num.portn,
        //   purdate: num.purdate,
        //   shpdate: num.shpdate,
        //   reqdate: num.reqdate,
        //   recdate: num.recdate,
        //   invno: num.invno,
        // }));
        // obj.second = numbers2.map((num) => ({
        //   itemkey2: num.itemkey2,
        //   purno: num.purno,
        //   qtyord: num.qtyord,
        //   portn: num.portn,
        //   purdate: num.purdate,
        //   shpdate: num.shpdate,
        //   reqdate: num.reqdate,
        //   recdate: num.recdate,
        //   invno: num.invno,
        // }));
        // obj.third = numbers3.map((num) => ({
        //   itemkey2: num.itemkey2,
        //   purno: num.purno,
        //   qtyord: num.qtyord,
        //   portn: num.portn,
        //   purdate: num.purdate,
        //   shpdate: num.shpdate,
        //   reqdate: num.reqdate,
        //   recdate: num.recdate,
        //   invno: num.invno,
        // }));
        // obj.fourth = numbers4.map((num) => ({
        //   itemkey2: num.itemkey2,
        //   purno: num.purno,
        //   qtyord: num.qtyord,
        //   portn: num.portn,
        //   purdate: num.purdate,
        //   shpdate: num.shpdate,
        //   reqdate: num.reqdate,
        //   recdate: num.recdate,
        //   invno: num.invno,
        // }));
        // obj.fifth = numbers5.map((num) => ({
        //   itemkey2: num.itemkey2,
        //   purno: num.purno,
        //   qtyord: num.qtyord,
        //   portn: num.portn,
        //   purdate: num.purdate,
        //   shpdate: num.shpdate,
        //   reqdate: num.reqdate,
        //   recdate: num.recdate,
        //   invno: num.invno,
        // }));
        // obj.sixth = numbers6.map((num) => ({
        //   itemkey2: num.itemkey2,
        //   purno: num.purno,
        //   qtyord: num.qtyord,
        //   portn: num.portn,
        //   purdate: num.purdate,
        //   shpdate: num.shpdate,
        //   reqdate: num.reqdate,
        //   recdate: num.recdate,
        //   invno: num.invno,
        // }));

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
          qtybo: num.qtyshp,
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
        }));

        return obj;
      });
    };

    const result = mergeArrays(
      result2.recordset,
      // result21.recordset,
      // result22.recordset,
      // result23.recordset,
      // result24.recordset,
      // result25.recordset,
      // result26.recordset,
      result2Sold30.recordset,
      result2Sold60.recordset,
      result2Sold90.recordset,
      result2Sold365.recordset,
      reOrderPointMain.recordset,
      poPendingData.recordset,
      poLeadTime.recordset,
      itemClassData.recordset
    );
    //console.log(result);
    // Sort the merged results by ID

    if (req.query.descrip) {
      const descrips = req.query.descrip;
      const result = mergedResults.filter(
        (obj) => obj.descrip?.trim().toLowerCase() === descrips
      );

      if (result) {
        // Return the matching object to the client
        res.send(result);
      } else {
        // If no object with the specified ID is found, return a 404 error
        res.status(404).send('Object not found');
      }
    } else {
      // If no eventId query parameter is provided, return the merged results array
      res.send(mergedResults);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Start the server on port 3000
app.listen(8082, host_url4, () => {
  console.log('Server listening on port 8082');
});
