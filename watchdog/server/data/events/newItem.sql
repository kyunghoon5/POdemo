
  SELECT  
    [descrip],
    MIN(recdate) AS start_date
FROM potran10c
GROUP BY descrip
HAVING MAX(recdate)=MIN(recdate)