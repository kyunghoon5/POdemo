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