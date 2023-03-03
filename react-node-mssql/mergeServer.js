//express
var express = require('express');
var app = express();
const sql = require('mssql');
let mssql = require('./mssql-connection-pooling');

var cors = require('cors');
app.use(cors());
var _ = require('lodash');

// Configuration for the two SQL servers
const configServer1 = require('./config');
const configServer2 = require('./config2');

// Define an endpoint for merging data from both servers
app.get('/mergeData', async (req, res) => {
  try {
    // Connect to both servers
    const sqlPool = await mssql.GetCreateIfNotExistPool(configServer1);
    let request1 = new sql.Request(sqlPool);

    // Query the two servers for data
    const result1 = await request1.query(`SELECT TOP (5) [bono]
      ,[custno]
      ,[invdte]
      ,[salesmn]
      ,[item] 
      
      ,[qtyshp]
      ,[qtybo]
      ,[price]
      ,[invno]
      ,[descrip]
  FROM [BYT_LEG_TEST].[dbo].[BOTran]
  `);

    const result11 = await request1.query(`SELECT top(5)   
      [descrip]      
      ,[price]   
	  ,[weight]
      ,[start_dte]
  FROM [BYT_LEG_TEST].[dbo].[arinvt10]`);

    // Connect to both servers
    const sqlPool2 = await mssql.GetCreateIfNotExistPool(configServer2);
    let request2 = new sql.Request(sqlPool2);

    // Query the two servers for data
    //main query
    const result2 = await request2.query(`WITH BOTranTmp as (
  SELECT 
    * 
  FROM 
    BOTran 
  WHERE invdte >= Dateadd(day, -365, Getdate())
) 
SELECT
	A.vendno,
  A.class, 
  A.itemkey2, 
  A.descrip,
  A.onhand,
  A.qtyshp, 
  A.qtybo,
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
					  (SELECT start_dte
               FROM   arinvt10
               WHERE  itemkey2 = A.itemkey2 and descrip = A.descrip)            AS start_dte
			   


    FROM 
      artran10c A 
    WHERE invdte >= Dateadd(day, -365, Getdate())
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

    const result2Sold30 = await request2.query(`WITH BOTranTmp as (
  SELECT 
    * 
  FROM 
    BOTran 
  WHERE invdte >= Dateadd(day, -30, Getdate())
) 
SELECT
	 
  A.itemkey2, 
  A.descrip,
  
  A.qtyshp 
  
  
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
					  (SELECT start_dte
               FROM   arinvt10
               WHERE  itemkey2 = A.itemkey2 and descrip = A.descrip)            AS start_dte
			   


    FROM 
      artran10c A 
    WHERE invdte >= Dateadd(day, -30, Getdate())
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

    //Seach value parsing into query
    const result21 = await request2.query(`select * 

from(SELECT  A.purno      
      ,A.itemkey2
      ,A.descrip 
      ,A.qtyord
      ,a.[qtyrec]
      ,a.[purdate]  
	  ,a.[shpdate]
	  ,a.[reqdate]
      ,a.[recdate]
      ,a.[invno]
	  ,DENSE_RANK() OVER (ORDER BY reqdate desc) as portn
           
      
  FROM [BYT_LEG].[dbo].[potran10c] A
  where convert(date, a.purdate) between '01/01/2005' and '02/22/2023' and descrip='${req.query.descrip}' 
  
  ) b
  where portn in ('1')
  order by purdate desc, itemkey2 asc  
  `);

    const result22 = await request2.query(`select *

from(SELECT  A.purno      
      ,A.itemkey2
      ,A.descrip 
      ,A.qtyord
      ,a.[qtyrec]
      ,a.[purdate]  
	  ,a.[shpdate]
	  ,a.[reqdate]
      ,a.[recdate]
      ,a.[invno]
	  ,DENSE_RANK() OVER (ORDER BY reqdate desc) as portn
           
      
  FROM [BYT_LEG].[dbo].[potran10c] A
  where convert(date, a.purdate) between '01/01/2005' and '02/22/2023' and descrip='${req.query.descrip}' 
  
  ) b
  where portn in ('2')
  order by purdate desc, itemkey2 asc`);

    const result23 = await request2.query(`select *

from(SELECT  A.purno      
      ,A.itemkey2
      ,A.descrip 
      ,A.qtyord
      ,a.[qtyrec]
      ,a.[purdate]  
	  ,a.[shpdate]
	  ,a.[reqdate]
      ,a.[recdate]
      ,a.[invno]
	  ,DENSE_RANK() OVER (ORDER BY reqdate desc) as portn
           
      
  FROM [BYT_LEG].[dbo].[potran10c] A
  where convert(date, a.purdate) between '01/01/2005' and '02/22/2023' and descrip='${req.query.descrip}' 
  
  ) b
  where portn in ('3')
  order by purdate desc, itemkey2 asc`);

    const result24 = await request2.query(`select *

from(SELECT  A.purno      
      ,A.itemkey2
      ,A.descrip 
      ,A.qtyord
      ,a.[qtyrec]
      ,a.[purdate]  
	  ,a.[shpdate]
	  ,a.[reqdate]
      ,a.[recdate]
      ,a.[invno]
	  ,DENSE_RANK() OVER (ORDER BY reqdate desc) as portn
           
      
  FROM [BYT_LEG].[dbo].[potran10c] A
  where convert(date, a.purdate) between '01/01/2005' and '02/22/2023' and descrip='${req.query.descrip}' 
  
  ) b
  where portn in ('4')
  order by purdate desc, itemkey2 asc`);

    const result25 = await request2.query(`select *

from(SELECT  A.purno      
      ,A.itemkey2
      ,A.descrip 
      ,A.qtyord
      ,a.[qtyrec]
      ,a.[purdate]  
	  ,a.[shpdate]
	  ,a.[reqdate]
      ,a.[recdate]
      ,a.[invno]
	  ,DENSE_RANK() OVER (ORDER BY reqdate desc) as portn
           
      
  FROM [BYT_LEG].[dbo].[potran10c] A
  where convert(date, a.purdate) between '01/01/2005' and '02/22/2023' and descrip='${req.query.descrip}' 
  
  ) b
  where portn in ('5')
  order by purdate desc, itemkey2 asc`);

    const result26 = await request2.query(`select *

from(SELECT  A.purno      
      ,A.itemkey2
      ,A.descrip 
      ,A.qtyord
      ,a.[qtyrec]
      ,a.[purdate]  
	  ,a.[shpdate]
	  ,a.[reqdate]
      ,a.[recdate]
      ,a.[invno]
	  ,DENSE_RANK() OVER (ORDER BY reqdate desc) as portn
           
      
  FROM [BYT_LEG].[dbo].[potran10c] A
  where convert(date, a.purdate) between '01/01/2005' and '02/22/2023' and descrip='${req.query.descrip}' 
  
  ) b
  where portn in ('6')
  order by purdate desc, itemkey2 asc`);

    //po reorder total
    const result27 = await request2.query(`SELECT 
     
      [itemkey2]
      ,[descrip]
      
      ,sum([qtyord]) as total
     
      
    
  FROM [BYT_LEG].[dbo].[potran10c]

  where descrip='${req.query.descrip}'  and purdate >= Dateadd(day, -365, Getdate())
  group by descrip,itemkey2`);

    // Combine the two results into a single array
    const mergedResults = [...result2.recordset];

    // for (var i = 0; i < result2.recordset.length; i++){
    //   console.log(result2.recordset[i].itemkey2)}

    //obj recursive merge + POorder
    const mergeArrays = (
      arr1,
      arr2,
      arr3,
      arr4,
      arr5,
      arr6,
      arr7,
      sold30,
      poreorder
    ) => {
      return arr1.map((obj) => {
        const numbers = arr2.filter((nums) => nums.itemkey2 === obj.itemkey2);
        const numbers2 = arr3.filter((item) => item.itemkey2 === obj.itemkey2);
        const numbers3 = arr4.filter((item) => item.itemkey2 === obj.itemkey2);
        const numbers4 = arr5.filter((item) => item.itemkey2 === obj.itemkey2);
        const numbers5 = arr6.filter((item) => item.itemkey2 === obj.itemkey2);
        const numbers6 = arr7.filter((item) => item.itemkey2 === obj.itemkey2);
        const numbers7 = sold30.filter(
          (item) => item.itemkey2 === obj.itemkey2
        );
        const numbers8 = poreorder.filter(
          (item) => item.itemkey2 === obj.itemkey2
        );
        if (!numbers.length) {
          obj.first = numbers;
          obj.second = numbers2;
          obj.third = numbers3;
          obj.fourth = numbers4;
          obj.fifth = numbers5;
          obj.sixth = numbers6;
          obj.sold30 = numbers7;
          obj.poreorder = numbers8;
          return obj;
        }
        obj.first = numbers.map((num) => ({
          purno: num.purno,
          qtyord: num.qtyord,
          portn: num.portn,
          purdate: num.purdate,
          shpdate: num.shpdate,
          reqdate: num.reqdate,
          recdate: num.recdate,
          invno: num.invno,
        }));
        obj.second = numbers2.map((num) => ({
          purno: num.purno,
          qtyord: num.qtyord,
          portn: num.portn,
          purdate: num.purdate,
          shpdate: num.shpdate,
          reqdate: num.reqdate,
          recdate: num.recdate,
          invno: num.invno,
        }));
        obj.third = numbers3.map((num) => ({
          purno: num.purno,
          qtyord: num.qtyord,
          portn: num.portn,
          purdate: num.purdate,
          shpdate: num.shpdate,
          reqdate: num.reqdate,
          recdate: num.recdate,
          invno: num.invno,
        }));
        obj.fourth = numbers4.map((num) => ({
          purno: num.purno,
          qtyord: num.qtyord,
          portn: num.portn,
          purdate: num.purdate,
          shpdate: num.shpdate,
          reqdate: num.reqdate,
          recdate: num.recdate,
          invno: num.invno,
        }));
        obj.fifth = numbers5.map((num) => ({
          purno: num.purno,
          qtyord: num.qtyord,
          portn: num.portn,
          purdate: num.purdate,
          shpdate: num.shpdate,
          reqdate: num.reqdate,
          recdate: num.recdate,
          invno: num.invno,
        }));
        obj.sixth = numbers6.map((num) => ({
          purno: num.purno,
          qtyord: num.qtyord,
          portn: num.portn,
          purdate: num.purdate,
          shpdate: num.shpdate,
          reqdate: num.reqdate,
          recdate: num.recdate,
          invno: num.invno,
        }));

        obj.sold30 = numbers7.map((num) => ({
          qtyshp: num.qtyshp,
        }));

        obj.poreorder = numbers8.map((num) => ({ total: num.total }));
        return obj;
      });
    };

    const result = mergeArrays(
      result2.recordset,
      result21.recordset,
      result22.recordset,
      result23.recordset,
      result24.recordset,
      result25.recordset,
      result26.recordset,
      result2Sold30.recordset,
      result27.recordset
    );
    //console.log(result);
    // Sort the merged results by ID

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
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


// Start the server on port 3000
app.listen(8082, () => {
  console.log('Server listening on port 8082');
});
