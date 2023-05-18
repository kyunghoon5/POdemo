SELECT [descrip],
       Min(recdate) AS start_date
FROM   potran10c
WHERE  descrip = '${req.query.descrip}'
GROUP  BY descrip
HAVING Max(reqdate) = Min(reqdate)
ORDER  BY start_date DESC 