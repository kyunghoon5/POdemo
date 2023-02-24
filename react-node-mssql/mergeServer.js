//express
var express = require('express');
var app = express();
const sql = require('mssql');
let mssql = require('./mssql-connection-pooling');

var cors = require('cors');
app.use(cors());
var _ = require('lodash');

// Configuration for the two SQL servers
const configServer1 = require('./config');
const configServer2 = require('./config2');

// Define an endpoint for merging data from both servers
app.get('/mergeData', async (req, res) => {
  try {
    // Connect to both servers
    const sqlPool = await mssql.GetCreateIfNotExistPool(configServer1);
    let request1 = new sql.Request(sqlPool);

    // Query the two servers for data
    const result1 = await request1.query(`SELECT TOP (5) [bono]
      ,[custno]
      ,[invdte]
      ,[salesmn]
      ,[item] 
      
      ,[qtyshp]
      ,[qtybo]
      ,[price]
      ,[invno]
      ,[descrip]
  FROM [BYT_LEG_TEST].[dbo].[BOTran]
  `);

    const result11 = await request1.query(`SELECT top(5)   
      [descrip]      
      ,[price]   
	  ,[weight]
      ,[start_dte]
  FROM [BYT_LEG_TEST].[dbo].[arinvt10]`);

    // Connect to both servers
    const sqlPool2 = await mssql.GetCreateIfNotExistPool(configServer2);
    let request2 = new sql.Request(sqlPool2);

    // Query the two servers for data

    const result2 =
      await request2.query(`/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (5000) [vendno]
      ,[class]
      ,[descrip]
      ,[itemkey2]
      ,[base_dte]
      ,[last_sold_dte]
      ,[last_rcv_dte]
      ,[upd_date]
      ,[onhand]
      ,[sold30]
      ,[sold60]
      ,[sold90]
      ,[sold120]
      ,[sold180]
      ,[sold240]
      ,[sold365]
      ,[soldTotal]      
  FROM [BYT_LEG].[dbo].[arsold365]
  where descrip='${req.query.descrip}'`);

    //Seach value parsing into query
    const result21 = await request2.query(`select * 

from(SELECT  A.purno      
      ,A.itemkey2
      ,A.descrip 
      ,A.qtyord
      ,a.[qtyrec]
      ,a.[purdate]  
	  ,a.[shpdate]
	  ,a.[reqdate]
      ,a.[recdate]
	  ,DENSE_RANK() OVER (ORDER BY purdate desc) as portn
           
      
  FROM [BYT_LEG].[dbo].[potran10c] A
  where convert(date, a.purdate) between '01/01/2005' and '02/22/2023' and descrip='${req.query.descrip}' 
  
  ) b
  where portn in ('1')
  order by purdate desc, itemkey2 asc  
  `);

    const result22 = await request2.query(`select *

from(SELECT  A.purno      
      ,A.itemkey2
      ,A.descrip 
      ,A.qtyord
      ,a.[qtyrec]
      ,a.[purdate]  
	  ,a.[shpdate]
	  ,a.[reqdate]
      ,a.[recdate]
	  ,DENSE_RANK() OVER (ORDER BY purdate desc) as portn
           
      
  FROM [BYT_LEG].[dbo].[potran10c] A
  where convert(date, a.purdate) between '01/01/2005' and '02/22/2023' and descrip='${req.query.descrip}' 
  
  ) b
  where portn in ('2')
  order by purdate desc, itemkey2 asc`);

    const result23 = await request2.query(`select *

from(SELECT  A.purno      
      ,A.itemkey2
      ,A.descrip 
      ,A.qtyord
      ,a.[qtyrec]
      ,a.[purdate]  
	  ,a.[shpdate]
	  ,a.[reqdate]
      ,a.[recdate]
	  ,DENSE_RANK() OVER (ORDER BY purdate desc) as portn
           
      
  FROM [BYT_LEG].[dbo].[potran10c] A
  where convert(date, a.purdate) between '01/01/2005' and '02/22/2023' and descrip='${req.query.descrip}' 
  
  ) b
  where portn in ('3')
  order by purdate desc, itemkey2 asc`);

    const result24 = await request2.query(`select *

from(SELECT  A.purno      
      ,A.itemkey2
      ,A.descrip 
      ,A.qtyord
      ,a.[qtyrec]
      ,a.[purdate]  
	  ,a.[shpdate]
	  ,a.[reqdate]
      ,a.[recdate]
	  ,DENSE_RANK() OVER (ORDER BY purdate desc) as portn
           
      
  FROM [BYT_LEG].[dbo].[potran10c] A
  where convert(date, a.purdate) between '01/01/2005' and '02/22/2023' and descrip='${req.query.descrip}' 
  
  ) b
  where portn in ('4')
  order by purdate desc, itemkey2 asc`);

    const result25 = await request2.query(`select *

from(SELECT  A.purno      
      ,A.itemkey2
      ,A.descrip 
      ,A.qtyord
      ,a.[qtyrec]
      ,a.[purdate]  
	  ,a.[shpdate]
	  ,a.[reqdate]
      ,a.[recdate]
	  ,DENSE_RANK() OVER (ORDER BY purdate desc) as portn
           
      
  FROM [BYT_LEG].[dbo].[potran10c] A
  where convert(date, a.purdate) between '01/01/2005' and '02/22/2023' and descrip='${req.query.descrip}' 
  
  ) b
  where portn in ('5')
  order by purdate desc, itemkey2 asc`);

    const result26 = await request2.query(`select *

from(SELECT  A.purno      
      ,A.itemkey2
      ,A.descrip 
      ,A.qtyord
      ,a.[qtyrec]
      ,a.[purdate]  
	  ,a.[shpdate]
	  ,a.[reqdate]
      ,a.[recdate]
	  ,DENSE_RANK() OVER (ORDER BY purdate desc) as portn
           
      
  FROM [BYT_LEG].[dbo].[potran10c] A
  where convert(date, a.purdate) between '01/01/2005' and '02/22/2023' and descrip='${req.query.descrip}' 
  
  ) b
  where portn in ('6')
  order by purdate desc, itemkey2 asc`);

    // Combine the two results into a single array
    const mergedResults = [...result2.recordset];

    // for (var i = 0; i < result2.recordset.length; i++){
    //   console.log(result2.recordset[i].itemkey2)}

    //obj recursive merge + POorder
    const mergeArrays = (arr1, arr2, arr3, arr4, arr5, arr6, arr7) => {
      return arr1.map((obj) => {
        const numbers = arr2.filter((nums) => nums.itemkey2 === obj.itemkey2);
        const numbers2 = arr3.filter((item) => item.itemkey2 === obj.itemkey2);
        const numbers3 = arr4.filter((item) => item.itemkey2 === obj.itemkey2);
        const numbers4 = arr5.filter((item) => item.itemkey2 === obj.itemkey2);
        const numbers5 = arr6.filter((item) => item.itemkey2 === obj.itemkey2);
        const numbers6 = arr7.filter((item) => item.itemkey2 === obj.itemkey2);
        if (!numbers.length) {
          obj.first = numbers;
          obj.second = numbers2;
          obj.third = numbers3;
          obj.fourth = numbers4;
          obj.fifth = numbers5;
          obj.sixth = numbers6;
          return obj;
        }
        obj.first = numbers.map((num) => ({
          purno: num.purno,
          qtyord: num.qtyord,
          portn: num.portn,
          purdate: num.purdate,
          shpdate: num.shpdate,
          reqdate: num.reqdate,
          recdate: num.recdate,
        }));
        obj.second = numbers2.map((num) => ({
          purno: num.purno,
          qtyord: num.qtyord,
          portn: num.portn,
          purdate: num.purdate,
          shpdate: num.shpdate,
          reqdate: num.reqdate,
          recdate: num.recdate,
        }));
        obj.third = numbers3.map((num) => ({
          purno: num.purno,
          qtyord: num.qtyord,
          portn: num.portn,
          purdate: num.purdate,
          shpdate: num.shpdate,
          reqdate: num.reqdate,
          recdate: num.recdate,
        }));
        obj.fourth = numbers4.map((num) => ({
          purno: num.purno,
          qtyord: num.qtyord,
          portn: num.portn,
          purdate: num.purdate,
          shpdate: num.shpdate,
          reqdate: num.reqdate,
          recdate: num.recdate,
        }));
        obj.fifth = numbers5.map((num) => ({
          purno: num.purno,
          qtyord: num.qtyord,
          portn: num.portn,
          purdate: num.purdate,
          shpdate: num.shpdate,
          reqdate: num.reqdate,
          recdate: num.recdate,
        }));
        obj.sixth = numbers6.map((num) => ({
          purno: num.purno,
          qtyord: num.qtyord,
          portn: num.portn,
          purdate: num.purdate,
          shpdate: num.shpdate,
          reqdate: num.reqdate,
          recdate: num.recdate,
        }));
        return obj;
      });
    };

    const result = mergeArrays(
      result2.recordset,
      result21.recordset,
      result22.recordset,
      result23.recordset,
      result24.recordset,
      result25.recordset,
      result26.recordset
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
app.listen(8082, () => {
  console.log('Server listening on port 8082');
});
