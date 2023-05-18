WITH botrantmp
     AS (SELECT *
         FROM   botran
         WHERE  CONVERT(DATE, invdte) >= Dateadd(day, -365, Getdate()))
SELECT c.vendno,
       c.descrip,
       CONVERT(INT, Round(Sum(c.needed), 0)) AS needed
FROM   (SELECT b.vendno,
               b.descrip,
               --b.itemkey2,
               --b.start_date,
               --b.onhand,
               --b.pending,
               --b.qtybo,
               --b.avg_qtyshp,
               --b.avg_lead_time,
               --b.suggested,
               b.suggested - ( b.onhand + b.pending ) AS needed
        FROM   (SELECT a.vendno,
                       A.descrip,
                       --A.itemkey2,
                       a.start_date,
                       onhand,
                       Isnull(qtyord, 0)
                       AS
                               pending,
                       --A.qtyshp,
                       --( a.qtyshp +ISNULL((SELECT SUM(qtybo) FROM BOTranTmp WHERE descrip = A.descrip and itemkey2= a.itemkey2), 0))/365 as avg_qtyshp,
                       --ISNULL((SELECT SUM(qtybo) FROM BOTranTmp WHERE descrip = A.descrip and itemkey2= a.itemkey2), 0) as qtybo ,
                       --avg excluded weekends and holidays
                       --isnull(avg_lead_time,0)  as avg_lead_time,
                       ( ( a.qtyshp
                           + Isnull((SELECT Sum(qtybo) FROM botrantmp WHERE
                           descrip =
                           A.descrip
                           AND
                             itemkey2= a.itemkey2), 0) ) / 365 ) *
                       120 AS
                       suggested
                FROM   (SELECT (SELECT TOP 1 vendno
                                FROM   potran10c
                                WHERE  descrip = A.descrip
                                       AND itemkey2 = A.itemkey2) AS vendno,
                               (SELECT Sum(onhand)
                                FROM   arinvt10
                                WHERE  descrip = A.descrip
                                       AND itemkey2 = a.itemkey2) AS onhand,
                               (SELECT Sum(qtyord) AS qtyord
                                FROM   potran10c
                                WHERE  recdate IS NULL
                                       AND reqdate >= Getdate() - 120
                                       AND descrip = a.descrip
                                       AND itemkey2 = a.itemkey2) AS qtyord,
                              -- (SELECT Avg(Datediff(day, purdate, recdate))
                             --   FROM   potran10c
                               -- WHERE  reqdate >= Dateadd(year, -2, Getdate())
                              --         AND recdate IS NOT NULL
                               --        AND descrip = a.descrip
                               --        AND itemkey2 = a.itemkey2) AS
                              -- avg_lead_time,
                               (SELECT Min(recdate)
                                FROM   potran10c
                                WHERE  descrip = a.descrip
                                       AND itemkey2 = a.itemkey2) AS start_date,
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
                        WHERE  CONVERT(DATE, A.invdte) >=
                               Dateadd(day, -365, Getdate())
                               AND A.descrip NOT IN ( 'SHIP', 'CALENDAR',
                                                      'BROCHURE' )
                               AND A.itemkey2 NOT IN ( '_MANUAL_INVOICE' )
                               --and A.class in ('RB')
                               --Exclude RB
                               AND A.class NOT IN ( 'AA', 'Z' )
                        GROUP  BY A.itemkey2,
                                  A.descrip) A
                WHERE  qtyshp > 0
                       AND cost <= price) b
        WHERE  ( b.pending + b.onhand ) < b.suggested
               AND CONVERT(DATE, start_date) <= Dateadd(day, -365, Getdate()))c
WHERE  c.needed > 1
GROUP  BY c.vendno,
          c.descrip
ORDER  BY needed DESC 