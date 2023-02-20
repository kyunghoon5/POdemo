var express = require('express');
var app = express();
var cors = require('cors');

const config2 = require('./config2');

app.use(cors());
app.get('/', function (req, res) {
  var sql = require('mssql');

  //config for your database

  // connect to your database
  sql.connect(config2, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    // query to the database and get the records
    request.query(
      `
        SELECT TOP (1000) [eventId]
      ,[eventTitle]
      ,[eventDescription]
      ,[startDate]
      ,[endDate]
      ,[avenue]
      ,[maxMembers]
  FROM [eventmanagement2].[dbo].[events2]`,
      function (err, recordset) {
        if (err) console.log(err);

        // send records as a response
        res.send(recordset);
      }
    );
  });
});

var server2 = app.listen((PORT = 8081), function () {
  console.log(`app listening on url http://localhost: ${PORT}`);
});
