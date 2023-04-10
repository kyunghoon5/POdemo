SELECT
a.class,
  A.itemkey2, 
  A.descrip,
  A.onhand,
   A.mincost,
  a.maxcost,  
  A.price,
  A.start_dte
 ,a.length_cat  
FROM 
  (
    SELECT		
	a.class,
      A.itemkey2, 
      A.descrip,
	   (SELECT sum(onhand)
               FROM   arinvt10
               WHERE  itemkey2 = A.itemkey2 and descrip = A.descrip)            AS onhand,
			   (select min(recdate) from potran10c where descrip = a.descrip) as start_dte,
	  
      
	 
					  (SELECT MIN(price) FROM arinvt10 WHERE itemkey2 = A.itemkey2 and descrip = A.descrip) as price,
            (SELECT min(cost) FROM arinvt10 WHERE itemkey2 = A.itemkey2 and descrip = A.descrip) as mincost,
					   (SELECT max(cost) FROM arinvt10 WHERE itemkey2 = A.itemkey2 and descrip = A.descrip) as maxcost,
					 
					  (select length_cat from arinvt10_brand where descrip = a.descrip ) as length_cat
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
    a.class,
      A.itemkey2, 
      A.descrip
	  
  ) A 
  
ORDER BY 
  itemkey2 asc