'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');
const eventRoutes2 = require('./routes/eventRoutes2');
const config2 = require('./config2');

const app1 = express();
//multiple servers
const app2 = express();

app1.use(express.json());
app1.use(cors());
app1.use(bodyParser.json());

app1.use('/api', eventRoutes.routes);

app1.listen(config.port, () => {
  console.log('app listening on url http://localhost:' + config.port);
});

app2.use(express.json());
app2.use(cors());
app2.use(bodyParser.json());

app2.use('/apii', eventRoutes2.routes2);
app2.listen(config2.port, () => {
  console.log('app listening on url http://localhost:' + config2.port);
});
