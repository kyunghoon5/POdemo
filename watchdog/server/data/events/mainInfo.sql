SELECT A.itemkey2,
       A.descrip,
       A.onhand,
       A.mincost,
       a.maxcost,
       A.price,
       A.start_dte,
       a.length_cat
FROM   (SELECT A.itemkey2,
               A.descrip,
               Isnull((SELECT Sum(onhand)
                       FROM   arinvt10
                       WHERE  itemkey2 = A.itemkey2
                              AND descrip = A.descrip), 0) AS onhand,
               (SELECT Min(recdate)
                FROM   potran10c
                WHERE  descrip = a.descrip)                AS start_dte,
               (SELECT Min(price)
                FROM   arinvt10
                WHERE  itemkey2 = A.itemkey2
                       AND descrip = A.descrip)            AS price,
               (SELECT Min(cost)
                FROM   arinvt10
                WHERE  itemkey2 = A.itemkey2
                       AND descrip = A.descrip)            AS mincost,
               (SELECT Max(cost)
                FROM   arinvt10
                WHERE  itemkey2 = A.itemkey2
                       AND descrip = A.descrip)            AS maxcost,
               (SELECT length_cat
                FROM   arinvt10_brand
                WHERE  descrip = a.descrip)                AS length_cat
        FROM   artran10c A
        WHERE  invdte >= Dateadd(year, -2, Getdate())
               AND A.descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
               AND A.itemkey2 NOT IN ( '_MANUAL_INVOICE' )
               AND A.descrip = '${req.query.descrip}'
               --and A.class in ('RB')
               --Exclude RB
               --and A.class not in ('RB', 'AA', 'Z')
               AND a.class IS NOT NULL
        GROUP  BY A.itemkey2,
                  A.descrip) A
ORDER  BY itemkey2 ASC 