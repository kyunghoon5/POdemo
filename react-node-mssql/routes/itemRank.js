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
	
  
  A.descrip  
  
  
FROM 
  (
    SELECT	

     
     
      A.descrip

    FROM 
      artran10c A 
    WHERE convert(date,invdte) >= Dateadd(year, -50, Getdate())
      and A.descrip not in ('SHIP', 'CALENDAR', 'BROCHURE') 
      
      and A.descrip='${req.query.descrip}'
      --and A.class in ('RB')
      --Exclude RB
      --and A.class not in ('RB', 'AA', 'Z')
    group by 
       
       
      A.descrip
	  
  ) A  


`);

  const resultRank = await request1.query(`

SELECT	 

 A.percentile,
  
  A.descrip,
  a.qtyshp,
  a.start_dte
  
FROM

  (
    SELECT		
		PERCENT_RANK() OVER (order by sum(qtyshp) ) as percentile,	  
            
      A.descrip,	  
      sum(A.qtyshp) as qtyshp			,
	   (select min(recdate) from potran10c where descrip = a.descrip) as start_dte
    FROM 
      artran10c A 
    WHERE convert(date,invdte) >= Dateadd(year, -1, Getdate())
	
      and A.descrip not in ('SHIP', 'CALENDAR', 'BROCHURE') 
      and A.itemkey2 not in ('_MANUAL_INVOICE') 	  
      --and A.class in ('RB')
      --Exclude RB
     and A.class not in ('RB', 'AA', 'Z') 
    group by
	
	
      A.descrip	  
  ) A 
 
  WHERE A.qtyshp > 0 and CONVERT(date,start_dte) between Dateadd(year,-50, getDate()) and dateadd(year,-1,getdate())  and descrip='${req.query.descrip}'
  ORDER BY qtyshp desc


`);

  const resultRank2 = await request1.query(`
SELECT	 

 A.percentile,
  
  A.descrip,
  a.qtyshp,
  a.start_dte
  
FROM

  (
    SELECT		
		PERCENT_RANK() OVER (order by sum(qtyshp) ) as percentile,	  
            
      A.descrip,	  
      sum(A.qtyshp) as qtyshp			,
	   (select min(recdate) from potran10c where descrip = a.descrip) as start_dte
    FROM 
      artran10c A 
    WHERE convert(date,invdte) >= Dateadd(year, -1, Getdate())
	
      and A.descrip not in ('SHIP', 'CALENDAR', 'BROCHURE') 
      and A.itemkey2 not in ('_MANUAL_INVOICE') 	  
      and A.class in ('RB')
      --Exclude RB
     --and A.class not in ('RB', 'AA', 'Z') 
    group by
	
	
      A.descrip	  
  ) A 
 
  WHERE A.qtyshp > 0 and CONVERT(date,start_dte) between Dateadd(year,-50, getDate()) and dateadd(year,-1,getdate())  and descrip='${req.query.descrip}'
  ORDER BY qtyshp desc
`);
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
