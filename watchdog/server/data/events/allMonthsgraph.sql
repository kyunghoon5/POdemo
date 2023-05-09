WITH Months AS (
  SELECT 1 AS month, 'January' AS month_name
  UNION SELECT 2, 'February'
  UNION SELECT 3, 'March'
  UNION SELECT 4, 'April'
  UNION SELECT 5, 'May'
  UNION SELECT 6, 'June'
  UNION SELECT 7, 'July'
  UNION SELECT 8, 'August'
  UNION SELECT 9, 'September'
  UNION SELECT 10, 'October'
  UNION SELECT 11, 'November'
  UNION SELECT 12, 'December'
)
SELECT
  B.descrip,
  YEAR(A.invdte) AS year,
  Months.month,  
  COALESCE(SUM(A.qtyshp), 0) AS qtyshp,
  COALESCE((SELECT SUM(qtyrec) FROM potran10c WHERE descrip=B.descrip AND YEAR(recdate)=YEAR(A.invdte) AND MONTH(recdate)=Months.month), 0) as qtyrec
FROM
  Months
  CROSS JOIN (
    SELECT DISTINCT
      descrip
    FROM
      artran10c
    WHERE
      descrip NOT IN ('SHIP', 'CALENDAR', 'BROCHURE')
      AND itemkey2 NOT IN ('_MANUAL_INVOICE')
   AND descrip='${req.query.descrip}'
      --RB only
      --AND class IN ('RB')
      --Exclude RB
      --AND class NOT IN ('RB', 'AA', 'Z')
	  
  ) B
  LEFT JOIN artran10c A ON B.descrip = A.descrip AND MONTH(A.invdte) = Months.month AND CONVERT(DATE, A.invdte) BETWEEN (SELECT MIN(recdate) FROM potran10c WHERE descrip = A.descrip) AND GETDATE()
GROUP BY
  B.descrip,
  YEAR(A.invdte),
  Months.month

HAVING
  SUM(A.qtyshp) > -1 OR COALESCE((SELECT SUM(qtyrec) FROM potran10c WHERE descrip=B.descrip AND YEAR(recdate)=YEAR(A.invdte) AND MONTH(recdate)=Months.month), 0) >= 0
ORDER BY
  B.descrip ASC,
  year DESC,
  Months.month ASC