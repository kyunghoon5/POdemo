SELECT A.percentile,
       A.descrip,
       a.qtyshp,
       a.start_dte
FROM   (SELECT Percent_rank()
                 OVER (
                   ORDER BY Sum(qtyshp) )   AS percentile,
               A.descrip,
               Sum(A.qtyshp)                AS qtyshp,
               (SELECT Min(recdate)
                FROM   potran10c
                WHERE  descrip = a.descrip) AS start_dte,
               (SELECT Min(cost)
                FROM   arinvt10
                WHERE  descrip = A.descrip) AS cost,
               (SELECT Min(price)
                FROM   arinvt10
                WHERE  descrip = A.descrip
                       AND price > 0)       AS price
        FROM   artran10c A
        WHERE  CONVERT(DATE, invdte) >= Dateadd(year, -1, Getdate())
               AND A.descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
               AND A.itemkey2 NOT IN ( '_MANUAL_INVOICE' )
               AND A.class IN ( 'RB' )
        --Exclude RB
        --and A.class not in ('RB', 'AA', 'Z') 
        GROUP  BY A.descrip) A
WHERE  A.qtyshp > 0
       AND cost <= price
       AND CONVERT(DATE, start_dte) BETWEEN Dateadd(year, -50, Getdate()) AND
                                            Dateadd(year, -1, Getdate())
       AND descrip = '${req.query.descrip}'
ORDER  BY qtyshp DESC 