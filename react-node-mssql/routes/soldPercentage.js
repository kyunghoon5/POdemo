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
	
  A.itemkey2, 
  A.descrip  
  
  
FROM 
  (
    SELECT	

     
      A.itemkey2, 
      A.descrip

    FROM 
      artran10c A 
    WHERE convert(date,invdte) >= Dateadd(year, -50, Getdate())
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

  const result21 = await request2.query(`SELECT --D.rank,

D.descrip,

Round(( D.sold7 / ( D.onhand + sold7 ) ) * 100, 2)           AS 
sold7_percentage,
Round(( D.sold30 / ( D.onhand + sold30 ) ) * 100, 2)         AS
sold30_percentage,
Round(( D.sold60 / ( D.onhand + sold60 ) ) * 100, 2)         AS
sold60_percentage,
Round(( D.sold90 / ( D.onhand + sold90 ) ) * 100, 2)         AS
sold90_percentage,
Round(( D.sold120 / ( D.onhand + sold120 ) ) * 100, 2)       AS
sold6M_percentage,
Round(( D.sold365 / ( D.onhand + sold365 ) ) * 100, 2)       AS
sold365_percentage,
Round(( D.sold_total / ( D.onhand + sold_total ) ) * 100, 2) AS 
total_percentage
FROM   (SELECT --A.ranknum
       --AS
       --rank,
      
       A.descrip,
       A.sold365,
       (SELECT Sum(onhand)
        FROM   arinvt10
        WHERE  descrip = A.descrip)                                       AS
       onhand,
       /* (SELECT Isnull(Sum(qtyord), 0)
         FROM   potran10c
         WHERE  descrip = A.descrip
                AND qtyrec IN ( '0' ))
        AS
               PO,
       (SELECT Isnull(Sum(qtyrec), 0)
         FROM   potran10c
         WHERE  descrip = A.descrip
                AND qtyrec NOT IN ( '0' )
                AND convert(date,recdate) >= Dateadd(day, -365, Cast(Getdate() AS DATE
                                                   ))) AS
       total_rec,*/
       (SELECT Isnull(Sum(qtyshp), 0)
        FROM   artran10c
        WHERE  descrip = a.descrip
               AND convert(date,invdte) >= Dateadd(year, -50, Cast(Getdate() AS DATE))) AS
       sold_total
       ,
       (SELECT Isnull(Sum(qtyshp), 0)
        FROM   artran10c
        WHERE  descrip = a.descrip
               AND convert(date,invdte) >= Dateadd(month, -6, Cast(Getdate() AS DATE))) AS
       sold120,
       (SELECT Isnull(Sum(qtyshp), 0)
        FROM   artran10c
        WHERE  descrip = a.descrip
               AND convert(date,invdte) >= Dateadd(day, -90, Cast(Getdate() AS DATE)))  AS
       sold90,
       (SELECT Isnull(Sum(qtyshp), 0)
        FROM   artran10c
        WHERE  descrip = a.descrip
               AND convert(date,invdte) >= Dateadd(day, -60, Cast(Getdate() AS DATE)))  AS
       sold60,
       (SELECT Isnull(Sum(qtyshp), 0)
        FROM   artran10c
        WHERE  descrip = a.descrip
               AND convert(date,invdte) >= Dateadd(day, -30, Cast(Getdate() AS DATE)))  AS
       sold30,
       (SELECT Isnull(Sum(qtyshp), 0)
        FROM   artran10c
        WHERE  descrip = a.descrip
               AND convert(date,invdte) >= Dateadd(day, -7, Cast(Getdate() AS DATE)))   AS
       sold7
        FROM   (SELECT --Rank()
               --OVER (
               --ORDER BY Sum(A.qtyshp) DESC ) AS rankNum,
               
               A.descrip,
               Sum(A.qtyshp) AS sold365
                FROM   artran10c A
                WHERE  convert(date,invdte) >= Dateadd(day, -365, Cast(Getdate() AS DATE))
                       AND A.descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
                       AND A.itemkey2 NOT IN ( '_MANUAL_INVOICE' )
					   and descrip='${req.query.descrip}'
                --RB only
                --AND A.class IN ('RB')
                --Exclude RB
                --AND A.class NOT IN ('RB', 'AA', 'Z')
                GROUP  BY 
                          A.descrip)A
        WHERE  A.sold365 > 0)D 
WHERE  D.sold7 > 0
       AND D.sold30 > 0
       AND D.sold60 > 0
       AND D.sold120 > 0
       AND D.sold365 > 0
       AND D.sold_total > 0
	   
ORDER  BY sold365 DESC 

`);
  const mergedResults = [...result2.recordset];

  const mergeArrays = (arr1, arr2) => {
    return arr1.map((obj) => {
      const numbers = arr2.filter((nums) => nums.descrip === obj.descrip);

      if (!numbers.length) {
        obj.soldPercentage = numbers;

        return obj;
      }
      obj.soldPercentage = numbers.map((num) => ({
        descrip: num.descrip,
        sold7_percentage: num.sold7_percentage,
        sold30_percentage: num.sold30_percentage,
        sold60_percentage: num.sold60_percentage,
        sold90_percentage: num.sold90_percentage,
        sold6M_percentage: num.sold6M_percentage,
        sold365_percentage: num.sold365_percentage,
        soldtotal_percentage: num.total_percentage,
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
