'use strict';
const utils = require('../utils');
const config = require('../../config');
const config2 = require('../../config2');
const sql = require('mssql');

const getEvents = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('events');
    const eventsList = await pool.request().query(sqlQueries.itemInfo);
    return eventsList.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (eventId) => {
  try {
    let pool = await sql.connect(config.sql);
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

const getEvents2 = async () => {
  try {
    const pool = await sql.connect(config2.sql);
    const sqlQueries = await utils.loadSqlQueries('eventss');
    const eventsList = await pool.request().query(sqlQueries.itemInfo);
    return eventsList.recordset;
  } catch (error) {
    console.log(error.message);
  }
};



module.exports = { getEvents, getById, getEvents2 };
