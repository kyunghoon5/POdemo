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