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

  const result2 = await request2.query(`
SELECT
	
  A.itemkey2, 
  A.descrip  
  
  
FROM 
  (
    SELECT	

     
      A.itemkey2, 
      A.descrip

    FROM 
      artran10c A 
    WHERE invdte >= Dateadd(year, -50, Getdate())
      and A.descrip not in ('SHIP', 'CALENDAR', 'BROCHURE') 
      and A.itemkey2 not in ('_MANUAL_INVOICE') 
      and A.descrip='${req.query.descrip}'
      --and A.class in ('RB')
      --Exclude RB
      --and A.class not in ('RB', 'AA', 'Z')
    group by 
       
      A.itemkey2, 
      A.descrip
	  
  ) A  
ORDER BY 
  itemkey2 asc

`);

  const result21 = await request2.query(`
SELECT POTRANS.purno AS 'PONO'
,POTRANS.vendno AS 'VENNO'
,POTRANS.purdate AS 'O_DATE'
,POTRANS.recdate AS 'R_DATE'
,POTRANS.shpdate AS 'SS_DATE'
,POTRANS.reqdate AS 'EA_DATE'
,POTRANS.descrip AS 'PROD_CODE', POTRANS.itemkey2 AS 'itemkey2'
,POTRANS.qtyord AS 'ORDEREDa'
,POTRANS.qtyrec AS 'SHIP_S1'
,POTRANS.cost AS 'PRICE'
,POTRANS.extcost AS 'AMOUNT'
,POTRANS.qtyord AS 'ONQTY'
,POTRANS.qtyord AS 'TRQTY30'
,POTRANS.qtyord AS 'TRQTY90'
,POTRANS.qtyord AS 'TRQTY'
,POTRANS.qtyord AS 'INQTY'
,POTRANS.qtyord AS 'UN_ORD'
,POTRANS.postat AS 'CANCEL', POTRANS.invno AS 'INVONO'
FROM BYT_LEG.dbo.POTRAN10C POTRANS
WHERE (POTRANS.descrip='${req.query.descrip}')  and POTRANS.reqdate between getDate() and '${endDate}'

ORDER BY POTRANS.purno DESC, POTRANS.descrip, POTRANS.itemkey2 asc

`);
  const mergedResults = [...result2.recordset];

  const mergeArrays = (arr1, arr2) => {
    return arr1.map((obj) => {
      const numbers = arr2.filter((nums) => nums.itemkey2 === obj.itemkey2);

      if (!numbers.length) {
        obj.poForecast = numbers;

        return obj;
      }
      obj.poForecast = numbers.map((num) => ({
        ORDEREDa: num.ORDEREDa,
        SS_DATE: num.SS_DATE,
        EA_DATE: num.EA_DATE,
        R_DATE: num.R_DATE,
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
