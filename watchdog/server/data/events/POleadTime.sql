SELECT POTRANS.descrip                                      AS descrip,
       POTRANS.itemkey2                                     AS itemkey2,
       Avg(Datediff(day, POTRANS.purdate, POTRANS.recdate)) AS 'avg_lead_time',
       Max(Datediff(day, POTRANS.purdate, POTRANS.recdate)) AS 'max_lead_time'
FROM   potran10c POTRANS
WHERE  POTRANS.reqdate >= Dateadd(year, -2, Getdate())
       AND POTRANS.recdate IS NOT NULL
       AND descrip = '${req.query.descrip}'
GROUP  BY POTRANS.descrip,
          POTRANS.itemkey2
ORDER  BY descrip ASC 