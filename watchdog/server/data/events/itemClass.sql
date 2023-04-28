SELECT distinct class,
  (SELECT TOP 1 vendno FROM potran10c WHERE descrip ='${req.query.descrip}') as vendno,
descrip,
itemkey2
  FROM arinvt10
  where descrip='${req.query.descrip}'