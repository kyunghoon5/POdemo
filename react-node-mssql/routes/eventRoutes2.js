'use strict';

const express = require('express');
const eventControll = require('../controllers/eventController');

const router2 = express.Router();


router2.get('/eventss', eventControll.getAllEvents);


module.exports = {  
  routes2: router2,
};
