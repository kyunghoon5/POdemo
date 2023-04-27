
  SELECT  
    [descrip],
    MIN(recdate) AS start_date

FROM potran10c
where descrip='${req.query.descrip}'
GROUP BY descrip

HAVING MAX(recdate)=MIN(recdate)

order by start_date desc