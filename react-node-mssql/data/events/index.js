'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getEvents = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('events');
    const eventsList = await pool.request().query(sqlQueries.eventslist);

    return eventsList.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getEvents };
