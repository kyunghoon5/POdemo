WITH botrantmp
     AS (SELECT *
         FROM   botran
         WHERE  CONVERT(DATE, invdte)BETWEEN '${startDate}' AND '${endDate}')
SELECT A.itemkey2,
       A.descrip,
       A.qtyshp,
       A.qtybo
FROM   (SELECT A.itemkey2,
               A.descrip,
               Sum(A.qtyshp)                               AS qtyshp,
               Isnull((SELECT Sum(qtybo)
                       FROM   botrantmp
                       WHERE  itemkey2 = A.itemkey2
                              AND descrip = A.descrip), 0) AS qtybo
        FROM   artran10c A
        WHERE  CONVERT(DATE, invdte)BETWEEN '${startDate}' AND '${endDate}'
               AND A.descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
               AND A.itemkey2 NOT IN ( '_MANUAL_INVOICE' )
               AND A.descrip = '${req.query.descrip}'
        --and A.class in ('RB')
        --Exclude RB
        --and A.class not in ('RB', 'AA', 'Z')
        GROUP  BY A.itemkey2,
                  A.descrip) A
ORDER  BY itemkey2 ASC 