WITH podata as (
SELECT rtrim(descrip) as descrip,itemkey2, sum(qtyord) as qtyord FROM potran10c
where recdate is null and reqdate >= getdate() - 120
GROUP BY descrip,itemkey2
),
arinvt as (
SELECT descrip,itemkey2, SUM(onhand) as onhand FROM arinvt10
WHERE class not in ('AA', 'Z') and descrip not in ('') and onhand > -1 and descrip='${req.query.descrip}'
GROUP BY descrip,itemkey2
)
SELECT A.descrip,a.itemkey2, A.onhand, ISNULL(B.qtyord, 0) as pending
FROM arinvt A
LEFT JOIN podata B on A.descrip = B.descrip and a.itemkey2=b.itemkey2
order by itemkey2 asc