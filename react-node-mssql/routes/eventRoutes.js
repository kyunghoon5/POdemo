'use strict';

const express = require('express');
const eventControll = require('../controllers/eventController');
const router = express.Router();
const router2 = express.Router();


router.get('/events', eventControll.getAllEvents);
router.get('/event/:id', eventControll.getEvent);
router2.get('/eventss', (eventControll.getAllEvents));
router.post('/event', eventControll.addEvent);
router.put('/event/:id', eventControll.updatEvent);
router.delete('/event/:id', eventControll.deleteEvent);

module.exports = {
  routes: router,
  routes2: router2
};
