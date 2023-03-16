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
A.class,
A.descrip,
YEAR(A.invdte) AS year,
MONTH(A.invdte) AS month,
SUM(A.qtyshp) AS qtyshp
FROM
artran10c A
INNER JOIN (
SELECT
class,
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
class,
descrip
) B ON A.class = B.class AND A.descrip = B.descrip
WHERE
CONVERT(DATE, A.invdte) BETWEEN (select min(recdate) from potran10c where descrip = a.descrip) AND GETDATE()
GROUP BY
A.class,
A.descrip,
YEAR(A.invdte),
MONTH(A.invdte)
HAVING
SUM(A.qtyshp) > 0
ORDER BY
year DESC, month asc;

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
