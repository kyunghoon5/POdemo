SELECT	 distinct

a.vendno,
  a.class,
  A.descrip,
  a.qtyshp,
  a.start_dte
  
FROM

  (
    SELECT		
	     (SELECT TOP 1 vendno FROM potran10c WHERE descrip = A.descrip ) as vendno,
           a.class, 
      A.descrip,	  
      sum(A.qtyshp) as qtyshp			,
	   (select min(recdate) from potran10c where descrip = a.descrip) as start_dte,
	    (SELECT Min(cost)
                FROM   arinvt10
                WHERE  descrip = A.descrip ) AS cost,
               (SELECT Min(price)
                FROM   arinvt10
                WHERE  descrip = A.descrip and price >0 ) AS price 
    FROM 
      artran10c A 
    WHERE convert(date,invdte) >= Dateadd(year, -1, Getdate())
	
      and A.descrip not in ('SHIP', 'CALENDAR', 'BROCHURE') 
      and A.itemkey2 not in ('_MANUAL_INVOICE') 	  
      --and A.class in ('RB')
      --Exclude RB
     and A.class not in ( 'AA', 'Z') 
    group by
	
	a.class,
      A.descrip	  
  ) A 
  
 
  WHERE A.qtyshp > 0 and  cost <= price  and  CONVERT(date,start_dte) between Dateadd(year,-50, getDate()) and dateadd(year,-1,getdate())  
  ORDER BY qtyshp desc