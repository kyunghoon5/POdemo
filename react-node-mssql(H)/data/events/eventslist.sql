WITH Botrantmp
     AS (SELECT *
         FROM   Botran
         WHERE  invdte >= Dateadd(day, -365, Getdate()))
SELECT Percent_rank()
         OVER(
           ORDER BY (D.netprice)) AS Percentile,
       D.class,
       D.descrip,
       D.onhand,
       D.qtyshp,
       D.qtybo,
       D.price,
       D.totalprice,
       D.cost,
       D.origin,
       D.netprice
FROM  (SELECT A.class,
              A.descrip,
              (SELECT Sum(onhand)
               FROM   arinvt10
               WHERE  descrip = A.descrip)            AS onhand,
              A.qtyshp,
              Isnull((SELECT Sum(qtybo)
                      FROM   Botrantmp
                      WHERE  descrip = A.descrip), 0) AS qtybo,
              bin1,
              bin2,
              bin3,
              (SELECT Avg(price)
               FROM   arinvt10
               WHERE  descrip = A.descrip)            AS price,
              (SELECT CONVERT(INT, Avg(price) * A.qtyshp)
               FROM   arinvt10
               WHERE  descrip = A.descrip)            AS totalprice,
              (SELECT Avg(cost)
               FROM   arinvt10
               WHERE  descrip = A.descrip)            AS cost,
              (SELECT Avg(cost) * qtyshp
               FROM   arinvt10
               WHERE  descrip = A.descrip)            AS origin,
              (SELECT CONVERT(INT, Avg(price) * A.qtyshp) - CONVERT(INT,
                                                            Avg(cost) * qtyshp)
               FROM   arinvt10
               WHERE  descrip = a.descrip)            AS netprice
       FROM   (SELECT A.class,
                      A.descrip,
                      Sum(A.qtyshp)      AS qtyshp,
                      Isnull(B.bin1, '') AS bin1,
                      Isnull(B.bin2, '') AS bin2,
                      Isnull(B.bin3, '') AS bin3
               FROM   artran10c A
                      LEFT JOIN arinvt10bin B
                             ON A.descrip = B.descrip
               WHERE  invdte >= Dateadd(day, -365, Getdate())
                      AND A.descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
                      AND A.itemkey2 NOT IN ( '_MANUAL_INVOICE' )
                      --RB only
                      --and A.class in ('RB')
                      --Exclude RB
                      AND A.class NOT IN ( 'AA', 'Z' )
               GROUP  BY A.class,
                         A.descrip,
                         B.bin1,
                         B.bin2,
                         B.bin3) A
       WHERE  A.qtyshp > 0) D
ORDER  BY netprice DESC
--1년치 판매량 * 아이템별 avg price


