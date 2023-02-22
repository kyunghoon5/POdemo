var express = require('express');
var app = express();
const sql = require('mssql');
let mssql = require('./mssql-connection-pooling');

var cors = require('cors');
app.use(cors());

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
    const result1 = await request1.query(`SELECT TOP (2) [bono]
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

    const result11 = await request1.query(`SELECT top(2)   
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
SELECT TOP (2) [vendno]
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
  FROM [BYT_LEG].[dbo].[arsold365]`);

    const result21 = await request2.query(`SELECT  [purno]      
      ,[item]      
      ,[itemkey2]
      ,[descrip]         
      ,[qtyord]
      ,[qtyrec]
      ,[purdate]      
      ,[recdate]
      ,[reqdate]            
      ,[shpdate]
      ,[invno]      
  FROM [BYT_LEG].[dbo].[potran10c]`);

    // Combine the two results into a single array
    const mergedResults = [
      ...result2.recordset,
      ...result1.recordset,
      ...result11.recordset,
      ...result21.recordset,
    ];

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
