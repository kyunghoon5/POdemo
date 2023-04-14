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