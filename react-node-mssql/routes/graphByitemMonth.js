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
a.itemkey2,
YEAR(A.invdte) AS year,
MONTH(A.invdte) AS month,
SUM(A.qtyshp) AS qtyshp,
 (SELECT SUM(qtyrec) FROM potran10c WHERE descrip=a.descrip and itemkey2=a.itemkey2 and year(recdate)=year(a.invdte) and month(recdate)=month(a.invdte)) as qtyrec
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
--RB only
--AND class IN ('RB')
--Exclude RB
--AND class NOT IN ('RB', 'AA', 'Z')
GROUP BY

descrip
) B ON  A.descrip = B.descrip
WHERE
CONVERT(DATE, A.invdte) BETWEEN (select min(recdate) from potran10c where descrip=a.descrip and itemkey2 = a.itemkey2) AND GETDATE()
GROUP BY

A.descrip,
a.itemkey2,
YEAR(A.invdte),
MONTH(A.invdte)
HAVING
SUM(A.qtyshp) > -1
ORDER BY
year asc, month asc, itemkey2 asc

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
