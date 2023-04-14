WITH BOTranTmp as (
  SELECT 
    * 
  FROM 
    BOTran 
  WHERE convert(date,invdte)between '${startDate}' AND '${endDate}'
) 
SELECT
	
  A.itemkey2, 
  A.descrip,

  A.qtyshp, 
  A.qtybo
 
 
  
  
FROM 
  (
    SELECT	
	
    
      A.itemkey2, 
      A.descrip,
	  
	  
      sum(A.qtyshp) as qtyshp, 
	  Isnull((SELECT Sum(qtybo)
                      FROM   Botrantmp
                      WHERE  itemkey2 = A.itemkey2 and descrip = A.descrip), 0) AS qtybo
					  
					 
              
			   


    FROM 
      artran10c A 
    WHERE convert(date,invdte)between '${startDate}' AND  '${endDate}'
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