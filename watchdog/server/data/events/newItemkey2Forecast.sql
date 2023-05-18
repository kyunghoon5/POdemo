WITH botrantmp
     AS (SELECT *
         FROM   botran
         WHERE  CONVERT(DATE, invdte) >= Dateadd(day, -365, Getdate()))
SELECT A.descrip,
       a.itemkey2,
       A.start_dte,
       ( Isnull((SELECT Sum(qtybo)
                 FROM   botrantmp
                 WHERE  descrip = A.descrip
                        AND itemkey2 = a.itemkey2), 0) ) AS qtybo,
       (SELECT Sum(query1.all_qtyshp - query2.total_qtyshp)
        FROM   (SELECT [custno],
                       descrip,
                       itemkey2,
                       Sum(qtyshp) AS all_qtyshp
                FROM   artran10c
                WHERE  descrip = A.descrip
                       AND descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
                       AND itemkey2 NOT IN ( '_MANUAL_INVOICE' )
                       AND qtyshp > 0
                GROUP  BY [custno],
                          descrip,
                          itemkey2
                HAVING Count(custno) > 1) query1
               JOIN (SELECT t.custno,
                            t.itemkey2,
                            t.descrip,
                            Sum(t.qtyshp) AS total_qtyshp
                     FROM  artran10c t
                            INNER JOIN (SELECT custno,
                                               Min(invdte) AS min_invdte
                                        FROM   artran10c
                                        WHERE  descrip = A.descrip
                                               AND qtyshp > 0
                                        GROUP  BY custno
                                        HAVING Count(custno) > 1) t2
                                    ON t.custno = t2.custno
                                       AND t.invdte = t2.min_invdte
                     WHERE  t.descrip = A.descrip
                     GROUP  BY t.custno,
                               t.itemkey2,
                               t.descrip,
                               CONVERT(DATE, t.invdte)
                     HAVING (SELECT Count(*)
                             FROM   artran10c t3
                             WHERE  t3.custno = t.custno
                                    AND t3.itemkey2 = t.itemkey2
                                    AND t3.descrip = t.descrip
                                    AND CONVERT(DATE, t3.invdte) =
                                        CONVERT(DATE, t.invdte)
                                    AND t3.qtyshp > 0) < 2) query2
                 ON query1.custno = query2.custno
                    AND query1.descrip = query2.descrip
                    AND query1.itemkey2 = query2.itemkey2
        WHERE  query1.descrip = A.descrip
               AND query1.itemkey2 = a.itemkey2
        GROUP  BY query1.descrip)                        AS total_qty_difference
FROM   (SELECT A.descrip,
               a.itemkey2,
               Min(recdate) AS start_dte
        FROM   artran10c A
               INNER JOIN potran10c P
                       ON A.descrip = P.descrip
                          AND a.itemkey2 = p.itemkey2
        WHERE  A.descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
               AND A.itemkey2 NOT IN ( '_MANUAL_INVOICE' )
               AND a.descrip = '${req.query.descrip}'
        GROUP  BY A.descrip,
                  a.itemkey2
        HAVING Min(p.recdate) >= Dateadd(year, -1, Getdate())) A 