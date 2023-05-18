SELECT A.descrip,
       a.itemkey2,
       (SELECT Max(recdate)
        FROM   potran10c
        WHERE  descrip = a.descrip) AS last_rec,
       a.qtybo
FROM   (SELECT A.class,
               A.descrip,
               a.itemkey2,
               (SELECT Sum(qtybo)
                FROM   botran
                WHERE  descrip = A.descrip
                       AND itemkey2 = a.itemkey2
                       AND CONVERT(DATE, invdte) BETWEEN
                           (SELECT Max(recdate)
                            FROM   potran10c
                            WHERE
                           descrip = a.descrip
                           AND
                                                         itemkey2 = a.itemkey2)
                           AND
                                                         Getdate
                                                         ()) AS qtybo
        FROM   artran10c A
        WHERE  CONVERT(DATE, invdte) BETWEEN (SELECT Max(recdate)
                                              FROM   potran10c
                                              WHERE  descrip = a.descrip
                                                     AND itemkey2 = a.itemkey2)
                                             AND
                                             Getdate()
               AND A.descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
               AND A.itemkey2 NOT IN ( '_MANUAL_INVOICE' )
               AND A.descrip = '${req.query.descrip}'
               --RB only
               --and A.class in ('RB')
               --Exclude RB
               AND A.class NOT IN ( 'AA', 'Z' )
        GROUP  BY A.class,
                  A.descrip,
                  a.itemkey2) A
WHERE  a.qtybo IS NOT NULL
ORDER  BY itemkey2 DESC 