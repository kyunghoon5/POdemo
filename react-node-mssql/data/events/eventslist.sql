WITH BOTranTmp as (SELECT * FROM BOTran WHERE invdte >= dateadd(month,-12,getdate()))

SELECT PERCENT_RANK() over(order by d.totalprice) as percentile, D.class,D.descrip,D.onhand, d.qtyshp
,D.qtybo,d.price,d.totalprice
FROM(
SELECT  A.class, A.descrip
, (SELECT SUM(onhand) FROM arinvt10 WHERE descrip = A.descrip) as onhand
, A.qtyshp
, ISNULL((SELECT SUM(qtybo) FROM BOTranTmp WHERE descrip = A.descrip), 0) as qtybo
, bin1
, bin2
, bin3
, (SELECT avg(price) FROM arinvt10 WHERE descrip = A.descrip) as price
, (select convert(int,avg(price) * A.qtyshp) from arinvt10 where descrip = A.descrip) as totalprice
FROM
(
SELECT  A.class, A.descrip, sum(A.qtyshp) as qtyshp
, ISNULL(B.bin1, '') as bin1, ISNULL(B.bin2, '') as bin2, ISNULL(B.bin3, '') as bin3
FROM artran10c A
LEFT JOIN arinvt10Bin B on A.descrip = B.descrip
where invdte >= dateadd(month,-12,getdate())
and A.descrip not in ('SHIP', 'CALENDAR', 'BROCHURE') 
and A.itemkey2 not in ('_MANUAL_INVOICE')
--RB only
--and A.class in ('RB')
--Exclude RB 
and A.class not in ('AA', 'Z')
group by A.class, A.descrip, B.bin1, B.bin2, B.bin3
) A
WHERE A.qtyshp > 0
) D
ORDER BY totalprice desc
--1년치 판매량 * 아이템별 avg price