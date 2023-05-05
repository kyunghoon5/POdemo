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

  const defaultItem1Query = await loadQ.defaultItem.replace(
    '${req.query.descrip}',
    req.query.descrip
  );
  const result2 = await request1.query(defaultItem1Query);

  const newItemkey2ForecastQuery = await loadQ.newItemkey2Forecast.replace(
    '${req.query.descrip}',
    req.query.descrip
  );
  const result21 = await request1.query(newItemkey2ForecastQuery);
  const mergedResults = [...result2.recordset];

  const mergeArrays = (arr1, arr2) => {
    return arr1.map((obj) => {
      const numbers = arr2.filter((nums) => nums.itemkey2 === obj.itemkey2);

      if (!numbers.length) {
        obj.newitemkeyForecast = numbers;

        return obj;
      }
      obj.newitemkeyForecast = numbers.map((num) => ({
        descrip: num.descrip,
        itemkey2: num.itemkey2,
        start_dte: num.start_dte,
        qtybo: num.qtybo,
        total_qty_difference: num.total_qty_difference,
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
