SELECT A.descrip
FROM   (SELECT A.descrip
        FROM   artran10c A
        WHERE  CONVERT(DATE, invdte) >= Dateadd(year, -50, Getdate())
               AND A.descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
               AND A.itemkey2 NOT IN ( '_MANUAL_INVOICE' )
               AND A.descrip = '${req.query.descrip}'
        --and A.class in ('RB')
        --Exclude RB
        --and A.class not in ('RB', 'AA', 'Z')
        GROUP  BY A.descrip) A 