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

  const result2 = await request2.query(`WITH BOTranTmp as (
  SELECT 
    * 
  FROM 
    BOTran 
  WHERE invdte >= Dateadd(year, -100, Getdate())
) 
SELECT
	A.vendno,
  A.class, 
  A.itemkey2, 
  A.descrip,
  A.onhand,
  
  A.qtybo,
  A.cost,
  A.price,
  A.start_dte
  
  
FROM 
  (
    SELECT	
	(SELECT supplier
               FROM   arinvt10
               WHERE  itemkey2 = A.itemkey2 and descrip = A.descrip)            AS vendno,
      A.class, 
      A.itemkey2, 
      A.descrip,
	   (SELECT sum(onhand)
               FROM   arinvt10
               WHERE  itemkey2 = A.itemkey2 and descrip = A.descrip)            AS onhand,
	  
       
	  Isnull((SELECT Sum(qtybo)
                      FROM   Botrantmp
                      WHERE  itemkey2 = A.itemkey2 and descrip = A.descrip), 0) AS qtybo,
					  (SELECT MIN(price) FROM arinvt10 WHERE itemkey2 = A.itemkey2 and descrip = A.descrip) as price,
					  (SELECT cost FROM arinvt10 WHERE itemkey2 = A.itemkey2 and descrip = A.descrip) as cost,
					  (SELECT start_dte
               FROM   arinvt10
               WHERE  itemkey2 = A.itemkey2 and descrip = A.descrip)            AS start_dte
			   


    FROM 
      artran10c A 
    WHERE invdte >= Dateadd(year, -100, Getdate())
      and A.descrip not in ('SHIP', 'CALENDAR', 'BROCHURE') 
      and A.itemkey2 not in ('_MANUAL_INVOICE') 
      and A.descrip='${req.query.descrip}'
      --and A.class in ('RB')
      --Exclude RB
      --and A.class not in ('RB', 'AA', 'Z')
    group by 
      A.class, 
      A.itemkey2, 
      A.descrip
	  
  ) A 
  
ORDER BY 
  itemkey2 asc

`);

  const result21 = await request2.query(`WITH BOTranTmp as (
  SELECT 
    * 
  FROM 
    BOTran 
  WHERE invdte >= '${startDate}' AND invdte <= '${endDate}'
) 
SELECT
	A.vendno,
  A.class, 
  A.itemkey2, 
  A.descrip,
  A.onhand,
  A.qtyshp, 
  A.qtybo,
  A.cost,
  A.price,
  A.start_dte
  
  
FROM 
  (
    SELECT	
	(SELECT supplier
               FROM   arinvt10
               WHERE  itemkey2 = A.itemkey2 and descrip = A.descrip)            AS vendno,
      A.class, 
      A.itemkey2, 
      A.descrip,
	   (SELECT sum(onhand)
               FROM   arinvt10
               WHERE  itemkey2 = A.itemkey2 and descrip = A.descrip)            AS onhand,
	  
      sum(A.qtyshp) as qtyshp, 
	  Isnull((SELECT Sum(qtybo)
                      FROM   Botrantmp
                      WHERE  itemkey2 = A.itemkey2 and descrip = A.descrip), 0) AS qtybo,
					  (SELECT MIN(price) FROM arinvt10 WHERE itemkey2 = A.itemkey2 and descrip = A.descrip) as price,
					  (SELECT cost FROM arinvt10 WHERE itemkey2 = A.itemkey2 and descrip = A.descrip) as cost,
					  (SELECT start_dte
               FROM   arinvt10
               WHERE  itemkey2 = A.itemkey2 and descrip = A.descrip)            AS start_dte
			   


    FROM 
      artran10c A 
    WHERE invdte >= '${startDate}' AND invdte <= '${endDate}'
      and A.descrip not in ('SHIP', 'CALENDAR', 'BROCHURE') 
      and A.itemkey2 not in ('_MANUAL_INVOICE') 
      and A.descrip='${req.query.descrip}'
      --and A.class in ('RB')
      --Exclude RB
      --and A.class not in ('RB', 'AA', 'Z')
    group by 
      A.class, 
      A.itemkey2, 
      A.descrip
	  
  ) A 
  WHERE A.qtyshp > -1
ORDER BY 
  itemkey2 asc

`);
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
