WITH botrantmp
     AS (SELECT *
         FROM   botran
         WHERE  CONVERT(DATE, invdte) >= Dateadd(day, -365, Getdate()))
SELECT a.vendno,
       A.descrip,
       A.itemkey2,
       A.qtyshp,
       --avg excluded weekends and holidays
       ( a.qtyshp
         + Isnull((SELECT Sum(qtybo) FROM botrantmp WHERE descrip = A.descrip
         AND
         itemkey2= a.itemkey2), 0) ) / 365           AS avg_qtyshp,
       Isnull((SELECT Sum(qtybo)
               FROM   botrantmp
               WHERE  descrip = A.descrip
                      AND itemkey2 = a.itemkey2), 0) AS qtybo
FROM   (SELECT (SELECT TOP 1 vendno
                FROM   potran10c
                WHERE  descrip = A.descrip
                       AND itemkey2 = A.itemkey2) AS vendno,
               A.itemkey2,
               A.descrip,
               Sum(A.qtyshp)                      AS qtyshp,
               (SELECT Min(cost)
                FROM   arinvt10
                WHERE  descrip = A.descrip
                       AND itemkey2 = a.itemkey2) AS cost,
               (SELECT Min(price)
                FROM   arinvt10
                WHERE  descrip = A.descrip
                       AND itemkey2 = a.itemkey2) AS price
        FROM   artran10c A
        WHERE  CONVERT(DATE, A.invdte) >= Dateadd(day, -365, Getdate())
               AND A.descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
               AND A.itemkey2 NOT IN ( '_MANUAL_INVOICE' )
               --and A.class in ('RB')
               --Exclude RB
               AND A.class NOT IN ( 'AA', 'Z' )
               AND A.descrip = '${req.query.descrip}'
        GROUP  BY A.itemkey2,
                  A.descrip) A
WHERE  qtyshp > 0
       AND cost <= price
ORDER  BY descrip ASC 