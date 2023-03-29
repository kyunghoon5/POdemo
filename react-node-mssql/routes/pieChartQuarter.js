const express = require('express');
var app = express();

const router = express.Router();

const sql = require('mssql');
let mssql = require('../mssql-connection-pooling');

var cors = require('cors');
app.use(cors());
var _ = require('lodash');

// Configuration for the two SQL servers
const configServer1 = require('../config');
const configServer2 = require('../config2');

router.get('/', async (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  // Connect to both servers
  const sqlPool = await mssql.GetCreateIfNotExistPool(configServer1);
  let request1 = new sql.Request(sqlPool);

  const sqlPool2 = await mssql.GetCreateIfNotExistPool(configServer2);
  let request2 = new sql.Request(sqlPool2);

  const result2 = await request2.query(`SELECT
A.descrip,
DATEPART(QUARTER, A.invdte) AS quarter,
SUM(A.qtyshp) AS qtyshp
FROM
artran10c A
INNER JOIN (
SELECT
descrip
FROM
artran10c
WHERE
descrip NOT IN ('SHIP', 'CALENDAR', 'BROCHURE')
AND itemkey2 NOT IN ('_MANUAL_INVOICE')
AND descrip='${req.query.descrip}' 
GROUP BY
descrip
) B ON A.descrip = B.descrip
WHERE
CONVERT(DATE, A.invdte) BETWEEN (
SELECT MIN(recdate)
FROM potran10c
WHERE descrip = a.descrip
) AND GETDATE()
AND YEAR(A.invdte) <> YEAR(GETDATE())
GROUP BY
A.descrip,
DATEPART(QUARTER, A.invdte)
HAVING
SUM(A.qtyshp) > 1
ORDER BY
quarter desc;

`);
  const mergedResults = [...result2.recordset];

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
