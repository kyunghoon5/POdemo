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
  const sqlPool = await mssql.GetCreateIfNotExistPool(configServer1);
  let request1 = new sql.Request(sqlPool);

  const sqlPool2 = await mssql.GetCreateIfNotExistPool(configServer2);
  let request2 = new sql.Request(sqlPool2);

  const itemRankAllDataQuery = await loadQ.itemRankAllData.replace(
    '${req.query.descrip}',
    req.query.descrip
  );

  const result2 = await request2.query(itemRankAllDataQuery);

  const itemRankNonRBQuery = await loadQ.itemRankNonRB.replace(
    '${req.query.descrip}',
    req.query.descrip
  );
  const resultRank = await request1.query(itemRankNonRBQuery);

   const itemRankRBQuery = await loadQ.itemRankRB.replace(
     '${req.query.descrip}',
     req.query.descrip
   );
  const resultRank2 = await request1.query(itemRankRBQuery);
  const mergedResults = [...result2.recordset];

  const mergeArrays = (arr1, ranknonRB, rankRB) => {
    return arr1.map((obj) => {
      const numbers = ranknonRB.filter((item) => item.descrip === obj.descrip);
      const numbers2 = rankRB.filter((item) => item.descrip === obj.descrip);

      if (!numbers.length) {
        obj.ranknonRB = numbers;
        obj.rankRB = numbers2;

        return obj;
      }
      obj.ranknonRB = numbers.map((num) => ({
        percentile: num.percentile,
        descrip: num.descrip,
        qtyshp: num.qtyshp,
      }));

      obj.rankRB = numbers2.map((num) => ({
        percentile: num.percentile,
        descrip: num.descrip,
        qtyshp: num.qtyshp,
      }));

      return obj;
    });
  };

  const result = mergeArrays(
    result2.recordset,
    resultRank.recordset,
    resultRank2.recordset
  );

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
