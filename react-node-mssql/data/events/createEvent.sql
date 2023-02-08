INSERT INTO [dbo].[events]
    (
        [eventTitle],
        [eventDescription],
        [startDate],
        [endDate],
        [avenue],
        [maxMemeber]
    )
VALUES 
    (
        @eventTitle,
        @eventDescription,
        @startDate,
        @endDate,
        @avenue,
        @maxMemeber
    )

SELECT SCOPE_IDENTITY() AS eventId