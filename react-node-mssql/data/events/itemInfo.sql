/****** Script for SelectTopNRows command from SSMS  ******/
SELECT  top 3600 [descrip]
	  ,[cost]
    ,[itemkey2]
	  ,[weight]
    ,[start_dte]
  FROM [BYT_LEG_TEST].[dbo].[arinvt10]
  