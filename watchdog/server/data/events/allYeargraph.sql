SELECT A.descrip,
       Year(A.invdte)                              AS year,
       Sum(A.qtyshp)                               AS qtyshp,
       (SELECT Sum(qtyrec)
        FROM   potran10c
        WHERE  descrip = a.descrip
               AND Year(recdate) = Year(a.invdte)) AS qtyrec
FROM   artran10c A
       INNER JOIN (SELECT descrip
                   FROM   artran10c
                   WHERE  descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
                          AND itemkey2 NOT IN ( '_MANUAL_INVOICE' )
                          AND descrip = '${req.query.descrip}'
                   --RB only
                   --AND class IN ('RB')
                   --Exclude RB
                   --AND class NOT IN ('RB', 'AA', 'Z')
                   GROUP  BY descrip) B
               ON A.descrip = B.descrip
WHERE  CONVERT(DATE, A.invdte) BETWEEN (SELECT Min(recdate)
                                        FROM   potran10c
                                        WHERE  descrip = a.descrip) AND Getdate(
                                       )
GROUP  BY A.descrip,
          Year(A.invdte)
HAVING Sum(A.qtyshp) > -1
ORDER  BY year ASC; 