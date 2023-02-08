UPDATE [dbo].[events]
SET [eventTitle]=@eventTitle,
    [eventDescription]=@eventDescription,
    [startDate]=@startDate,
    [endDate]=@endDate,
    [avenue]=@avenue,
    [maxMemeber]=@maxMemeber
WHERE [eventId]=@eventId

SELECT [eventId]
      ,[eventTitle]
      ,[eventDescription]
      ,[startDate]
      ,[endDate]
      ,[avenue]
      ,[maxMemeber]
  FROM [dbo].[events]
  WHERE [eventId]=@eventId