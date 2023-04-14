SELECT
A.descrip,
DATEPART(QUARTER, A.invdte) AS quarter,
SUM(A.qtyshp) AS qtyshp
FROM
artran10c A
INNER JOIN (
SELECT
descrip
FROM
artran10c
WHERE
descrip NOT IN ('SHIP', 'CALENDAR', 'BROCHURE')
AND itemkey2 NOT IN ('_MANUAL_INVOICE')
AND descrip='${req.query.descrip}' 
GROUP BY
descrip
) B ON A.descrip = B.descrip
WHERE
CONVERT(DATE, A.invdte) BETWEEN (
SELECT MIN(recdate)
FROM potran10c
WHERE descrip = a.descrip
) AND GETDATE()
AND YEAR(A.invdte) <> YEAR(GETDATE())
GROUP BY
A.descrip,
DATEPART(QUARTER, A.invdte)
HAVING
SUM(A.qtyshp) > 1
ORDER BY
quarter desc;