WITH months
     AS (SELECT 1         AS month,
                'January' AS month_name
         UNION
         SELECT 2,
                'February'
         UNION
         SELECT 3,
                'March'
         UNION
         SELECT 4,
                'April'
         UNION
         SELECT 5,
                'May'
         UNION
         SELECT 6,
                'June'
         UNION
         SELECT 7,
                'July'
         UNION
         SELECT 8,
                'August'
         UNION
         SELECT 9,
                'September'
         UNION
         SELECT 10,
                'October'
         UNION
         SELECT 11,
                'November'
         UNION
         SELECT 12,
                'December')
SELECT B.descrip,
       Year(A.invdte)                                          AS year,
       months.month,
       COALESCE(Sum(A.qtyshp), 0)                              AS qtyshp,
       COALESCE((SELECT Sum(qtyrec)
                 FROM   potran10c
                 WHERE  descrip = B.descrip
                        AND Year(recdate) = Year(A.invdte)
                        AND Month(recdate) = months.month), 0) AS qtyrec
FROM   months
       CROSS JOIN (SELECT DISTINCT descrip
                   FROM   artran10c
                   WHERE  descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
                          AND itemkey2 NOT IN ( '_MANUAL_INVOICE' )
                          AND descrip = '${req.query.descrip}'
                  --RB only
                  --AND class IN ('RB')
                  --Exclude RB
                  --AND class NOT IN ('RB', 'AA', 'Z')
                  ) B
       LEFT JOIN artran10c A
              ON B.descrip = A.descrip
                 AND Month(A.invdte) = months.month
                 AND CONVERT(DATE, A.invdte) BETWEEN
                     (SELECT Min(recdate)
                      FROM   potran10c
                      WHERE  descrip = A.descrip) AND
                     Getdate()
GROUP  BY B.descrip,
          Year(A.invdte),
          months.month
HAVING Sum(A.qtyshp) > -1
        OR COALESCE((SELECT Sum(qtyrec)
                     FROM   potran10c
                     WHERE  descrip = B.descrip
                            AND Year(recdate) = Year(A.invdte)
                            AND Month(recdate) = months.month), 0) >= 0
ORDER  BY B.descrip ASC,
          year DESC,
          months.month ASC 