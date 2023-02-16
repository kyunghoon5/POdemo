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
      SELECT TOP (5000) [vendno]
      ,[class]
      ,[descrip]
      ,[itemkey2]
      ,[base_dte]
      ,[last_sold_dte]
      ,[last_rcv_dte]
      ,[upd_date]
      ,[onhand]
      ,[sold30]
      ,[sold60]
      ,[sold90]
      ,[sold120]
      ,[sold180]
      ,[sold240]
      ,[sold365]
      ,[soldTotal]
      ,[start_dte]
  FROM [BYT_LEG].[dbo].[arsold365]`,
      function (err, recordset) {
        if (err) console.log(err);

        // send records as a response
        res.send(recordset);
      }
    );
  });
});

var server2 = app.listen((PORT=8081), function () {
  console.log(`app listening on url http://localhost: ${PORT}`);
});
