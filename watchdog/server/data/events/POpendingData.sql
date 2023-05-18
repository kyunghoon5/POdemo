WITH podata
     AS (SELECT Rtrim(descrip) AS descrip,
                itemkey2,
                Sum(qtyord)    AS qtyord
         FROM   potran10c
         WHERE  recdate IS NULL
                AND reqdate >= Getdate() - 120
         GROUP  BY descrip,
                   itemkey2),
     arinvt
     AS (SELECT descrip,
                itemkey2,
                Sum(onhand) AS onhand
         FROM   arinvt10
         WHERE  class NOT IN ( 'AA', 'Z' )
                AND descrip NOT IN ( '' )
                AND onhand > -1
                AND descrip = '${req.query.descrip}'
         GROUP  BY descrip,
                   itemkey2)
SELECT A.descrip,
       a.itemkey2,
       A.onhand,
       Isnull(B.qtyord, 0) AS pending
FROM   arinvt A
       LEFT JOIN podata B
              ON A.descrip = B.descrip
                 AND a.itemkey2 = b.itemkey2
ORDER  BY itemkey2 ASC 