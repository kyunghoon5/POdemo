SELECT
	 
  A.itemkey2, 
  A.descrip,
  
  A.qtyshp 
  
  
FROM 
  (
    SELECT		
      
      A.itemkey2, 
      A.descrip,
	  
      sum(A.qtyshp) as qtyshp 
	 
			   


    FROM 
      artran10c A 
    WHERE convert(date,a.invdte) >= Dateadd(month, -3, Getdate())
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