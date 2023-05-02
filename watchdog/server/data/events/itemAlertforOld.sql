-- WITH BOTranTmp as (SELECT * FROM BOTran WHERE convert(date,invdte) >= Dateadd(day, -365, Getdate()))

-- select
-- b.vendno,
-- b.descrip,

-- b.suggested -(b.onhand+ b.pending) as needed

-- from

-- (SELECT

--   a.vendno,
--   A.descrip,  

--   a.start_date,
--   onhand,
--   isnull(qtyord,0) as pending, 

--   A.qtyshp,
--   ( a.qtyshp +ISNULL((SELECT SUM(qtybo) FROM BOTranTmp WHERE descrip = A.descrip ), 0))/365 as avg_qtyshp,
--   ISNULL((SELECT SUM(qtybo) FROM BOTranTmp WHERE descrip = A.descrip ), 0) as qtybo ,

--   --avg excluded weekends and holidays

 
--   isnull(avg_lead_time,0)  as avg_lead_time,

--   (( a.qtyshp +ISNULL((SELECT SUM(qtybo) FROM BOTranTmp WHERE descrip = A.descrip ), 0))/365) * isnull(avg_lead_time,0)
--   as suggested

  
  


-- FROM 
--   (
--     SELECT	 
--       (SELECT TOP 1 vendno FROM potran10c WHERE descrip = A.descrip ) as vendno,
-- 	  (SELECT SUM(onhand) FROM arinvt10 WHERE descrip = A.descrip) as onhand,
	   

	  
-- (SELECT sum(qtyord) as qtyord FROM potran10c
-- where recdate is null and reqdate >= getdate() - 120 and descrip = a.descrip  ) as qtyord, 

-- (SELECT AVG(DATEDIFF(day, purdate, recdate)) from potran10c where reqdate >=DateADD(year, -2, getdate())
-- and recdate is not null and descrip = a.descrip ) as avg_lead_time,
-- (select MIN(recdate) from potran10c where descrip = a.descrip ) as start_date,


	  
	 
   
--       A.descrip,	  
--       sum(A.qtyshp) as qtyshp,

-- (SELECT Min(cost)
--                 FROM   arinvt10
--                 WHERE  descrip = A.descrip) AS cost,
--                (SELECT Min(price)
--                 FROM   arinvt10
--                 WHERE  descrip = A.descrip) AS price 
			
--     FROM 
--       artran10c A 

	
--     WHERE convert(date,A.invdte) >= Dateadd(day, -365, Getdate())
--       and A.descrip not in ('SHIP', 'CALENDAR', 'BROCHURE') 
-- 	  and A.itemkey2 not in ('_MANUAL_INVOICE')
 
--       --and A.class in ('RB')
--       --Exclude RB
--       and A.class not in ('AA', 'Z')	  
	  
--     GROUP BY      
    
--       A.descrip
	  
--   ) A 
-- WHERE 
--   qtyshp > 0
--   AND cost <= price ) b
--   where 
--   (b.pending + b.onhand) < b.suggested  and convert(date,start_date) <= Dateadd(day, -365, Getdate())
-- ORDER BY 
--   needed desc

WITH BOTranTmp as (SELECT * FROM BOTran WHERE convert(date,invdte) >= Dateadd(day, -365, Getdate()))
select 
c.vendno,
c.descrip,
convert(int,Round(sum(c.needed),0)) as needed
from
(select
b.vendno,
b.descrip,
b.itemkey2,
b.start_date,
b.onhand,
b.pending,
b.qtybo,
b.avg_qtyshp,
b.avg_lead_time,
b.suggested,
b.suggested -(b.onhand+ b.pending) as needed

from

(SELECT

  a.vendno,
  A.descrip,  
  A.itemkey2,
  a.start_date,
  onhand,
  isnull(qtyord,0) as pending, 

  A.qtyshp,
  ( a.qtyshp +ISNULL((SELECT SUM(qtybo) FROM BOTranTmp WHERE descrip = A.descrip and itemkey2= a.itemkey2), 0))/365 as avg_qtyshp,
  ISNULL((SELECT SUM(qtybo) FROM BOTranTmp WHERE descrip = A.descrip and itemkey2= a.itemkey2), 0) as qtybo ,

  --avg excluded weekends and holidays

 
  isnull(avg_lead_time,0)  as avg_lead_time,

  (( a.qtyshp +ISNULL((SELECT SUM(qtybo) FROM BOTranTmp WHERE descrip = A.descrip and itemkey2= a.itemkey2), 0))/365) * isnull(avg_lead_time,0)
  as suggested

  
  


FROM 
  (
    SELECT	 
      (SELECT TOP 1 vendno FROM potran10c WHERE descrip = A.descrip AND itemkey2 = A.itemkey2) as vendno,
	  (SELECT SUM(onhand) FROM arinvt10 WHERE descrip = A.descrip and itemkey2 = a.itemkey2) as onhand,
	   

	  
(SELECT sum(qtyord) as qtyord FROM potran10c
where recdate is null and reqdate >= getdate() - 120 and descrip = a.descrip and itemkey2 = a.itemkey2 ) as qtyord, 

(SELECT AVG(DATEDIFF(day, purdate, recdate)) from potran10c where reqdate >=DateADD(year, -2, getdate())
and recdate is not null and descrip = a.descrip and itemkey2 = a.itemkey2) as avg_lead_time,
(select MIN(recdate) from potran10c where descrip = a.descrip and itemkey2 = a.itemkey2) as start_date,


	  
	 
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
      and A.class not in ('AA', 'Z')	  
	  
    GROUP BY      
      A.itemkey2, 
      A.descrip
	  
  ) A 
WHERE 
  qtyshp > 0
  AND cost <= price ) b
  where 
  (b.pending + b.onhand) < b.suggested  and convert(date,start_date) <= Dateadd(day, -365, Getdate()))c
  where c.needed >1
  group by
  c.vendno,c.descrip
  
ORDER BY 
  needed desc