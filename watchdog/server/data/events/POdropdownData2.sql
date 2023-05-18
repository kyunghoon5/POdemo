SELECT A.itemkey2,
       A.descrip,
       A.qtyshp
FROM   (SELECT A.itemkey2,
               A.descrip,
               (SELECT Sum(onhand)
                FROM   arinvt10
                WHERE  itemkey2 = A.itemkey2
                       AND descrip = A.descrip) AS onhand,
               Sum(A.qtyshp)                    AS qtyshp
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
WHERE  A.qtyshp > -1
ORDER  BY itemkey2 ASC 