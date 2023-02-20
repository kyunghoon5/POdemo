var express = require('express');
var app = express();
var cors = require('cors');

const config = require('./config');

app.use(cors());
app.get('/', function (req, res) {
  var sql = require('mssql');

  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    // query to the database and get the records
    request.query(
      `
    /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [eventId]
      ,[eventTitle]
      ,[eventDescription]
      ,[startDate]
      ,[endDate]
      ,[avenue]
      ,[maxMembers]
  FROM [eventmanagement].[dbo].[events]
  
  `,
      function (err, recordset) {
        if (err) console.log(err);

        // send records as a response
        res.send(recordset);
      }
    );
  });
});

var server2 = app.listen((PORT = 8080), function () {
  console.log(`app listening on url http://localhost: ${PORT}`);
});
