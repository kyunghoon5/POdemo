SELECT *
FROM  (SELECT A.purno,
              A.itemkey2,
              A.descrip,
              A.qtyord,
              a.[qtyrec],
              a.[purdate],
              a.[shpdate],
              a.[reqdate],
              a.[recdate],
              a.[invno],
              Dense_rank()
                OVER (
                  ORDER BY reqdate DESC) AS portn
       FROM  potran10c A
       WHERE  descrip = '${req.query.descrip}') b
WHERE  portn IN ( '2' )
ORDER  BY purdate DESC,
          itemkey2 ASC 