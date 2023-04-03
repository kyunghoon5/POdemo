SELECT

A.descrip,
a.itemkey2,
YEAR(A.invdte) AS year,
MONTH(A.invdte) AS month,
SUM(A.qtyshp) AS qtyshp,
 (SELECT SUM(qtyrec) FROM potran10c WHERE descrip=a.descrip and itemkey2=a.itemkey2 and year(recdate)=year(a.invdte) and month(recdate)=month(a.invdte)) as qtyrec
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
--RB only
--AND class IN ('RB')
--Exclude RB
--AND class NOT IN ('RB', 'AA', 'Z')
GROUP BY

descrip
) B ON  A.descrip = B.descrip
WHERE
CONVERT(DATE, A.invdte) BETWEEN (select min(recdate) from potran10c where descrip=a.descrip and itemkey2 = a.itemkey2) AND GETDATE()
GROUP BY

A.descrip,
a.itemkey2,
YEAR(A.invdte),
MONTH(A.invdte)
HAVING
SUM(A.qtyshp) > -1
ORDER BY
year asc, month asc, itemkey2 asc