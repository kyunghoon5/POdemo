SELECT POTRANS.purno    AS 'PONO',
       POTRANS.vendno   AS 'VENNO',
       POTRANS.purdate  AS 'O_DATE',
       POTRANS.recdate  AS 'R_DATE',
       POTRANS.shpdate  AS 'SS_DATE',
       POTRANS.reqdate  AS 'EA_DATE',
       POTRANS.descrip  AS 'PROD_CODE',
       POTRANS.itemkey2 AS 'itemkey2',
       POTRANS.qtyord   AS 'ORDEREDa',
       POTRANS.qtyrec   AS 'SHIP_S1',
       POTRANS.cost     AS 'PRICE',
       POTRANS.extcost  AS 'AMOUNT',
       POTRANS.qtyord   AS 'ONQTY',
       POTRANS.qtyord   AS 'TRQTY30',
       POTRANS.qtyord   AS 'TRQTY90',
       POTRANS.qtyord   AS 'TRQTY',
       POTRANS.qtyord   AS 'INQTY',
       POTRANS.qtyord   AS 'UN_ORD',
       POTRANS.postat   AS 'CANCEL',
       POTRANS.invno    AS 'INVONO'
FROM  potran10c POTRANS
WHERE  ( POTRANS.descrip = '${req.query.descrip}' )
       AND POTRANS.reqdate BETWEEN Getdate() AND '${endDate}'
ORDER  BY POTRANS.purno DESC,
          POTRANS.descrip,
          POTRANS.itemkey2 ASC 