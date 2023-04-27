

SELECT
A.descrip,
a.itemkey2,
A.start_dte
,(SELECT  

SUM(query1.all_qtyshp - query2.total_qtyshp)
FROM
(SELECT
[custno],
descrip,
itemkey2,
sum(qtyshp) AS all_qtyshp
FROM
[BYT_LEG].[dbo].[artran10c]
WHERE
descrip = A.descrip
AND descrip NOT IN ('SHIP', 'CALENDAR', 'BROCHURE')
AND itemkey2 NOT IN ('_MANUAL_INVOICE')
AND qtyshp > 0
GROUP BY
[custno],
descrip,
itemkey2
HAVING
COUNT(custno) > 1) query1
JOIN
(SELECT
t.custno,
t.itemkey2,
t.descrip,
sum(t.qtyshp) AS total_qtyshp
FROM
[BYT_LEG].[dbo].[artran10c] t
INNER JOIN (
SELECT
custno,
MIN(invdte) AS min_invdte
FROM
[BYT_LEG].[dbo].[artran10c]
WHERE
descrip = A.descrip
AND qtyshp > 0
GROUP BY
custno
HAVING
COUNT(custno) > 1
) t2 ON t.custno = t2.custno AND t.invdte = t2.min_invdte
WHERE
t.descrip = A.descrip
GROUP BY
t.custno,
t.itemkey2,
t.descrip,
CONVERT(date, t.invdte)
HAVING
(
SELECT COUNT(*)
FROM [BYT_LEG].[dbo].[artran10c] t3
WHERE
t3.custno = t.custno
AND t3.itemkey2 = t.itemkey2
AND t3.descrip = t.descrip
AND CONVERT(date, t3.invdte) = CONVERT(date, t.invdte)
AND t3.qtyshp > 0
) < 2) query2
ON
query1.custno = query2.custno
AND query1.descrip = query2.descrip
AND query1.itemkey2 = query2.itemkey2
WHERE
query1.descrip = A.descrip and query1.itemkey2 = a.itemkey2
GROUP BY
query1.descrip) AS total_qty_difference
FROM
(
SELECT		
A.descrip,	
a.itemkey2,
MIN(recdate) AS start_dte
FROM
artran10c A
INNER JOIN potran10c P ON A.descrip = P.descrip and a.itemkey2 = p.itemkey2
WHERE

 A.descrip NOT IN ('SHIP', 'CALENDAR', 'BROCHURE')
AND A.itemkey2 NOT IN ('_MANUAL_INVOICE')
and a.descrip='${req.query.descrip}' 
GROUP BY
A.descrip,
a.itemkey2
HAVING MIN(p.recdate) >= DATEADD(year, -1, GETDATE())
) A


