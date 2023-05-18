SELECT --D.rank,
D.descrip,
Round(( D.sold7 / NULLIF(D.onhand + D.sold7, 0) ) * 100, 2)         AS
sold7_percentage,
Round(( D.sold30 / NULLIF(D.onhand + D.sold30, 0) ) * 100, 2)       AS
sold30_percentage,
Round(( D.sold60 / NULLIF(D.onhand + D.sold60, 0) ) * 100, 2)       AS
sold60_percentage,
Round(( D.sold90 / NULLIF(D.onhand + D.sold90, 0) ) * 100, 2)       AS
sold90_percentage,
Round(( D.sold120 / NULLIF(D.onhand + D.sold120, 0) ) * 100, 2)     AS
sold6M_percentage,
Round(( D.sold365 / NULLIF(D.onhand + D.sold365, 0) ) * 100, 2)     AS
sold365_percentage,
Round(( D.sold_total / NULLIF(D.onhand + sold_total, 0) ) * 100, 2) AS
total_percentage
FROM   (SELECT --A.ranknum
       --AS
       --rank,
       A.descrip,
       (SELECT Sum(onhand)
        FROM   arinvt10
        WHERE  descrip = A.descrip) AS onhand,
       /* (SELECT Isnull(Sum(qtyord), 0)
         FROM   potran10c
         WHERE  descrip = A.descrip
                AND qtyrec IN ( '0' ))
        AS
               PO,
       (SELECT Isnull(Sum(qtyrec), 0)
         FROM   potran10c
         WHERE  descrip = A.descrip
                AND qtyrec NOT IN ( '0' )
                AND convert(date,recdate) >= Dateadd(year, -1, Cast(Getdate() AS DATE
                                                   ))) AS
       total_rec,*/
       (SELECT Isnull(Sum(qtyshp), 0)
        FROM   artran10c
        WHERE  descrip = a.descrip
               AND CONVERT(DATE, invdte) >= Dateadd(year, -50, Cast(
                                            Getdate() AS DATE))
       )                            AS sold_total,
       (SELECT Isnull(Sum(qtyshp), 0)
        FROM   artran10c
        WHERE  descrip = a.descrip
               AND CONVERT(DATE, invdte) >= Dateadd(year, -1, Cast(
                                            Getdate() AS DATE)))
                                    AS sold365,
       (SELECT Isnull(Sum(qtyshp), 0)
        FROM   artran10c
        WHERE  descrip = a.descrip
               AND CONVERT(DATE, invdte) >= Dateadd(month, -6, Cast(
                                            Getdate() AS DATE))
       )                            AS sold120,
       (SELECT Isnull(Sum(qtyshp), 0)
        FROM   artran10c
        WHERE  descrip = a.descrip
               AND CONVERT(DATE, invdte) >= Dateadd(month, -3, Cast(
                                            Getdate() AS DATE))
       )                            AS sold90,
       (SELECT Isnull(Sum(qtyshp), 0)
        FROM   artran10c
        WHERE  descrip = a.descrip
               AND CONVERT(DATE, invdte) >= Dateadd(month, -2, Cast(
                                            Getdate() AS DATE))
       )                            AS sold60,
       (SELECT Isnull(Sum(qtyshp), 0)
        FROM   artran10c
        WHERE  descrip = a.descrip
               AND CONVERT(DATE, invdte) >= Dateadd(day, -31, Cast(
                                            Getdate() AS DATE)))
                                    AS sold30,
       (SELECT Isnull(Sum(qtyshp), 0)
        FROM   artran10c
        WHERE  descrip = a.descrip
               AND CONVERT(DATE, invdte) >= Dateadd(day, -8, Cast(
                                            Getdate() AS DATE)))
                                    AS sold7
        FROM   (SELECT --Rank()
               --OVER (
               --ORDER BY Sum(A.qtyshp) DESC ) AS rankNum,
               A.descrip
                FROM   artran10c a
                WHERE  A.descrip NOT IN ( 'SHIP', 'CALENDAR', 'BROCHURE' )
                       AND A.itemkey2 NOT IN ( '_MANUAL_INVOICE' )
                       AND descrip = '${req.query.descrip}'
                --RB only
                --AND A.class IN ('RB')
                --Exclude RB
                --AND A.class NOT IN ('RB', 'AA', 'Z')
                GROUP  BY A.descrip)A)D 