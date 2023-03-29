'use strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  SQL_USER,
  SQL_PASSWORD,
  SQL_DATABASE,
  SQL_SERVER,
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === 'true';

assert(PORT, 'PORT is require');
assert(HOST, 'PORT is require');

module.exports = {
  server: SQL_SERVER,
  database: SQL_DATABASE,
  user: SQL_USER,
  password: SQL_PASSWORD,
  options: {
    encrypt: false,
    enableArithAbort: true,
    truestConnection: true,
  },
  requestTimeout: 300000,
};
