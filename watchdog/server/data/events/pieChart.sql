SELECT A.descrip,
       Datepart(quarter, A.invdte) AS quarter,
       Sum(A.qtyshp)               AS qtyshp
FROM   artran10c A
       INNER JOIN (SELECT descrip
                   FROM   artran10c
                   WHERE  descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
                          AND itemkey2 NOT IN ( '_MANUAL_INVOICE' )
                          AND descrip = '${req.query.descrip}'
                   GROUP  BY descrip) B
               ON A.descrip = B.descrip
WHERE  CONVERT(DATE, A.invdte) BETWEEN (SELECT Min(recdate)
                                        FROM   potran10c
                                        WHERE  descrip = a.descrip) AND Getdate(
                                       )
       AND Year(A.invdte) <> Year(Getdate())
GROUP  BY A.descrip,
          Datepart(quarter, A.invdte)
HAVING Sum(A.qtyshp) > 1
ORDER  BY quarter DESC; 