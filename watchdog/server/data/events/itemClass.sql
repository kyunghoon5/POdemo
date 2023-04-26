SELECT distinct class,
descrip,
itemkey2
  FROM arinvt10
  where descrip='${req.query.descrip}'