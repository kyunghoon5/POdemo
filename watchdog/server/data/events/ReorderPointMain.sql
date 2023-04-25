WITH BOTranTmp as (SELECT * FROM BOTran WHERE convert(date,invdte) >= Dateadd(day, -365, Getdate()))

SELECT

  a.vendno,
  A.descrip,  
  A.itemkey2,   
  A.qtyshp, 
  --avg excluded weekends and holidays
 ( a.qtyshp +ISNULL((SELECT SUM(qtybo) FROM BOTranTmp WHERE descrip = A.descrip and itemkey2= a.itemkey2), 0))/365 as avg_qtyshp,
  ISNULL((SELECT SUM(qtybo) FROM BOTranTmp WHERE descrip = A.descrip and itemkey2= a.itemkey2), 0) as qtybo

FROM 
  (
    SELECT	 
      (SELECT TOP 1 vendno FROM potran10c WHERE descrip = A.descrip AND itemkey2 = A.itemkey2) as vendno,
      A.itemkey2, 
      A.descrip,	  
      sum(A.qtyshp) as qtyshp,
(SELECT Min(cost)
                FROM   arinvt10
                WHERE  descrip = A.descrip and itemkey2= a.itemkey2) AS cost,
               (SELECT Min(price)
                FROM   arinvt10
                WHERE  descrip = A.descrip and  itemkey2 = a.itemkey2) AS price 
    FROM 
      artran10c A 
	
    WHERE convert(date,A.invdte) >= Dateadd(day, -365, Getdate())
      and A.descrip not in ('SHIP', 'CALENDAR', 'BROCHURE') 
      and A.itemkey2 not in ('_MANUAL_INVOICE') 
      --and A.class in ('RB')
      --Exclude RB
      and A.class not in ('AA', 'Z')	   and A.descrip='${req.query.descrip}'
	  
    GROUP BY      
      A.itemkey2, 
      A.descrip
	  
  ) A 
WHERE 
  qtyshp > 0
  AND cost <= price 
ORDER BY 
  descrip ASC