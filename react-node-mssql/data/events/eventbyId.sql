SELECT [eventId]
    ,[eventTitle]
    ,[eventDescription]
    ,[startDate]
    ,[endDate]
    ,[avenue]
    ,[maxMemeber]
FROM [dbo].[events]
WHERE [eventId]=@eventId