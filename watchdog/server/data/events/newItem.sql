
  SELECT  
    [descrip],
    MIN(recdate) AS start_date
FROM [BYT_LEG_TEST].[dbo].[potran10c]
GROUP BY descrip
HAVING MAX(recdate)=MIN(recdate)