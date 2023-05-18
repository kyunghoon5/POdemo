SELECT DISTINCT class,
                (SELECT TOP 1 vendno
                 FROM   potran10c
                 WHERE  descrip = '${req.query.descrip}') AS vendno,
                descrip,
                itemkey2
FROM   arinvt10
WHERE  descrip = '${req.query.descrip}' 