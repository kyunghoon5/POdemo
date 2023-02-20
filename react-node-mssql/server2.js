var express = require('express');
var app = express();
var cors = require('cors');

const config = require('./config');
const config2 = require('./config2');

const utils = require('./data/utils');
const sql = require('mssql');
const eventData = require('./data/events');
const eventControll = require('./controllers/eventController');
const router = express.Router();
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');

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
      SELECT TOP (1) [vendno]
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

//search decscrip
const getById = async (eventId) => {
  try {
    let pool = await sql.connect(config2.sql);
    const sqlQueries = await utils.loadSqlQueries('events');
    const event = await pool
      .request()
      .input('descrip', sql.Char, eventId)
      .query(sqlQueries.eventbyId);
    return event.recordset;
  } catch (error) {
    return error.message;
  }
};

const getEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = await eventData.getById(eventId);
    res.send(event);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
router.get('/event/:id', eventControll.getEvent);

app.use(express.json());
app.use(bodyParser.json());
app.use('/api', eventRoutes.routes);

var server2 = app.listen((PORT = 8081), function () {
  console.log(`app listening on url http://localhost: ${PORT}`);
});
