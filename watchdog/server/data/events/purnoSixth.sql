select *

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
  where  descrip='${req.query.descrip}' 
  
  ) b
  where portn in ('6')
  order by purdate desc, itemkey2 asc