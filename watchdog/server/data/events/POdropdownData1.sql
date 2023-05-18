SELECT A.itemkey2,
       A.descrip
FROM   (SELECT A.itemkey2,
               A.descrip
        FROM   artran10c A
        WHERE  invdte >= Dateadd(year, -2, Getdate())
               AND A.descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
               AND A.itemkey2 NOT IN ( '_MANUAL_INVOICE' )
               AND A.descrip = '${req.query.descrip}'
        --and A.class in ('RB')
        --Exclude RB
        --and A.class not in ('RB', 'AA', 'Z')
        GROUP  BY A.itemkey2,
                  A.descrip) A
ORDER  BY itemkey2 ASC 