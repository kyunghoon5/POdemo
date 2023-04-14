

SELECT 
POTRANS.descrip as descrip,
POTRANS.itemkey2 as itemkey2
    ,AVG(DATEDIFF(day, POTRANS.purdate, POTRANS.recdate)) AS 'avg_lead_time'
	,max(DATEDIFF(day, POTRANS.purdate, POTRANS.recdate)) AS 'max_lead_time'
   
FROM BYT_LEG.dbo.POTRAN10C POTRANS
WHERE 
    POTRANS.reqdate >= DATEADD(year, -2, GETDATE())
    AND POTRANS.recdate IS NOT NULL and descrip='${req.query.descrip}'
GROUP BY  POTRANS.descrip, POTRANS.itemkey2
order by descrip asc