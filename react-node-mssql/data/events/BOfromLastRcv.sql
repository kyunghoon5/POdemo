SELECT    A.descrip, 
a.itemkey2,

(select max(recdate) from potran10c where descrip = a.descrip ) as last_rec, a.qtybo
FROM
(
SELECT  A.class, A.descrip,a.itemkey2,  (SELECT SUM(qtybo) FROM BOTran WHERE descrip = A.descrip and itemkey2 =a.itemkey2 and convert(date, invdte) between 
(select max(recdate) from potran10c where descrip = a.descrip and itemkey2 =a.itemkey2) and GETDATE())  as qtybo

FROM artran10c A

where
convert(date, invdte)  between (select max(recdate) from potran10c where descrip = a.descrip and itemkey2 =a.itemkey2) and getdate()
and A.descrip not in ('SHIP', 'CALENDAR', 'BROCHURE') and A.itemkey2 not in ('_MANUAL_INVOICE') and A.descrip='${req.query.descrip}'
--RB only
--and A.class in ('RB')
--Exclude RB
and A.class not in ( 'AA', 'Z') 
group by A.class, A.descrip,a.itemkey2
) A
WHERE  a.qtybo is not null
ORDER BY itemkey2 desc