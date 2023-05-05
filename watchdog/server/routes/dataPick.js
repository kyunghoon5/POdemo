const express = require('express');
var app = express();

const router = express.Router();

const sql = require('mssql');
let mssql = require('../mssql-connection-pooling');

var cors = require('cors');
app.use(cors());
var _ = require('lodash');

// Configuration for the two SQL servers
const configServer1 = require('../sqlServer1');
const configServer2 = require('../sqlServer2');
const utils = require('../data/utils');

router.get('/', async (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const loadQ = await utils.loadSqlQueries('events');
  // Connect to both servers
  // const sqlPool = await mssql.GetCreateIfNotExistPool(configServer1);
  // let request1 = new sql.Request(sqlPool);

  const sqlPool = await mssql.GetCreateIfNotExistPool(configServer1);

  let request1 = new sql.Request(sqlPool);
  const POdropdownData1Query = await loadQ.POdropdownData1.replace(
    '${req.query.descrip}',
    req.query.descrip
  );

  const result2 = await request1.query(POdropdownData1Query);

 const POdropdownData2Query = await loadQ.POdropdownData2.replace(
   /\${req\.query\.descrip}/g,
   req.query.descrip || ''
 )
   .replace(/\${startDate}/g, req.query.startDate || '')
   .replace(/\${endDate}/g, req.query.endDate || '');


  const result21 = await request1.query(POdropdownData2Query);
  const mergedResults = [...result2.recordset];

  const mergeArrays = (arr1, arr2) => {
    return arr1.map((obj) => {
      const numbers = arr2.filter((nums) => nums.itemkey2 === obj.itemkey2);

      if (!numbers.length) {
        obj.new = numbers;

        return obj;
      }
      obj.new = numbers.map((num) => ({
        qtyshp: num.qtyshp,
      }));

      return obj;
    });
  };

  const result = mergeArrays(result2.recordset, result21.recordset);

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
});

module.exports = router;
