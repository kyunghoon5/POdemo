SELECT

  A.itemkey2, 
  A.descrip,  
  A.qtyshp  
FROM 
  (
    SELECT     
      A.itemkey2, 
      A.descrip,
	   (SELECT sum(onhand)
               FROM   arinvt10
               WHERE  itemkey2 = A.itemkey2 and descrip = A.descrip)            AS onhand,
	  
      sum(A.qtyshp) as qtyshp
      FROM 
      artran10c A 
    WHERE convert(date,invdte)between '${startDate}' AND '${endDate}'
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
  WHERE A.qtyshp > -1
ORDER BY 
  itemkey2 asc