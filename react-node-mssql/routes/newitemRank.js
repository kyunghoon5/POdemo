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

  const result2 = await request1.query(`
select
b.descrip,b.start_dte,b.percentile,b.total_qty_difference

from

(SELECT
A.descrip,
A.start_dte,
PERCENT_RANK() OVER (order by (SELECT  

SUM(query1.all_qtyshp - query2.total_qtyshp)
FROM
(SELECT
[custno],
descrip,
itemkey2,
SUM(qtyshp) AS all_qtyshp
FROM
[BYT_LEG].[dbo].[artran10c]
WHERE
descrip = A.descrip

AND descrip NOT IN ('SHIP', 'CALENDAR', 'BROCHURE')
AND itemkey2 NOT IN ('_MANUAL_INVOICE')
AND qtyshp > 0 
GROUP BY
[custno],
descrip,
itemkey2
HAVING
COUNT(custno) > 1) query1
JOIN
(SELECT
t.custno,
t.itemkey2,
t.descrip,
SUM(t.qtyshp) AS total_qtyshp
FROM
[BYT_LEG].[dbo].[artran10c] t
INNER JOIN (
SELECT
custno,
MIN(invdte) AS min_invdte
FROM
[BYT_LEG].[dbo].[artran10c]
WHERE
descrip = A.descrip
AND qtyshp > 0
GROUP BY
custno
HAVING
COUNT(custno) > 1
) t2 ON t.custno = t2.custno AND t.invdte = t2.min_invdte
WHERE
t.descrip = A.descrip 

GROUP BY
t.custno,
t.itemkey2,
t.descrip,
CONVERT(date, t.invdte)
HAVING
(
SELECT COUNT(*)
FROM [BYT_LEG].[dbo].[artran10c] t3
WHERE
t3.custno = t.custno
AND t3.itemkey2 = t.itemkey2
AND t3.descrip = t.descrip
AND CONVERT(date, t3.invdte) = CONVERT(date, t.invdte)
AND t3.qtyshp > 0

) < 2) query2
ON
query1.custno = query2.custno
AND query1.descrip = query2.descrip
AND query1.itemkey2 = query2.itemkey2
WHERE
query1.descrip = A.descrip

GROUP BY
query1.descrip) ) as percentile


,(SELECT  

SUM(query1.all_qtyshp - query2.total_qtyshp)
FROM
(SELECT
[custno],
descrip,
itemkey2,
SUM(qtyshp) AS all_qtyshp
FROM
[BYT_LEG].[dbo].[artran10c]
WHERE
descrip = A.descrip
AND descrip NOT IN ('SHIP', 'CALENDAR', 'BROCHURE')
AND itemkey2 NOT IN ('_MANUAL_INVOICE')
AND qtyshp > 0
GROUP BY
[custno],
descrip,
itemkey2
HAVING
COUNT(custno) > 1) query1
JOIN
(SELECT
t.custno,
t.itemkey2,
t.descrip,
SUM(t.qtyshp) AS total_qtyshp
FROM
[BYT_LEG].[dbo].[artran10c] t
INNER JOIN (
SELECT
custno,
MIN(invdte) AS min_invdte
FROM
[BYT_LEG].[dbo].[artran10c]
WHERE
descrip = A.descrip
AND qtyshp > 0
GROUP BY
custno
HAVING
COUNT(custno) > 1
) t2 ON t.custno = t2.custno AND t.invdte = t2.min_invdte
WHERE
t.descrip = A.descrip
GROUP BY
t.custno,
t.itemkey2,
t.descrip,
CONVERT(date, t.invdte)
HAVING
(
SELECT COUNT(*)
FROM [BYT_LEG].[dbo].[artran10c] t3
WHERE
t3.custno = t.custno
AND t3.itemkey2 = t.itemkey2
AND t3.descrip = t.descrip
AND CONVERT(date, t3.invdte) = CONVERT(date, t.invdte)
AND t3.qtyshp > 0
) < 2) query2
ON
query1.custno = query2.custno
AND query1.descrip = query2.descrip
AND query1.itemkey2 = query2.itemkey2
WHERE
query1.descrip = A.descrip
GROUP BY
query1.descrip) AS total_qty_difference
FROM
(
SELECT		
A.descrip,	
MIN(recdate) AS start_dte
FROM
artran10c A
INNER JOIN potran10c P ON A.descrip = P.descrip
WHERE

 A.descrip NOT IN ('SHIP', 'CALENDAR', 'BROCHURE')
AND A.itemkey2 NOT IN ('_MANUAL_INVOICE')

GROUP BY
A.descrip
HAVING MIN(p.recdate) >= DATEADD(year, -1, GETDATE())
) A
where a.start_dte is not null

) b

where descrip='${req.query.descrip}'

ORDER BY
start_dte desc


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
