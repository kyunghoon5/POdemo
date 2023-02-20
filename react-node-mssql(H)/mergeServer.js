var express = require('express');
var app = express();
const sql = require('mssql');

var cors = require('cors');
app.use(cors());

// Configuration for the two SQL servers
const configServer1 = require('./config');

const configServer2 = require('./config2');

// Define an endpoint for merging data from both servers
app.get('/mergeData', async (req, res) => {
  try {
    // Connect to both servers
    const pool1 = await sql.connect(configServer1);
    const pool2 = await sql.connect(configServer2);

    // Query the two servers for data
    const result1 = await pool1.request().query(`SELECT TOP (1000) [eventId]
      ,[eventTitle]
      ,[eventDescription]
      ,[startDate]
      ,[endDate]
      ,[avenue]
      ,[maxMembers]
  FROM [eventmanagement].[dbo].[events]
  `);
    const result2 = await pool2.request().query(`  SELECT TOP (1000) [eventId]
      ,[eventTitle]
      ,[eventDescription]
      ,[startDate]
      ,[endDate]
      ,[avenue]
      ,[maxMembers]
  FROM [eventmanagement2].[dbo].[events2]`);

    // Combine the two results into a single array
    const mergedResults = [...result1.recordset, ...result2.recordset];

    mergedResults.sort((a, b) => a.eventId - b.eventId);

    // Sort the merged results by ID
    if (req.query.maxMembers) {
      const eventId = parseInt(req.query.maxMembers);
      const result = mergedResults.filter((obj) => obj.maxMembers === eventId);

      if (result) {
        // Return the matching object to the client
        res.send(result);
      } else {
        // If no object with the specified ID is found, return a 404 error
        res.status(404).send('Object not found');
      }
    } else {
      // If no eventId query parameter is provided, return the merged results array
      res.json(mergedResults);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Start the server on port 3000
app.listen(8082, () => {
  console.log('Server listening on port 8082');
});
