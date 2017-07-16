'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const index = require('./routes/index');

const server = express();
server.use(express.static(path.join(__dirname, 'public')));
server.use((req, res, next) => {
  next();
});

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.engine('html', require('ejs').renderFile);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use('/', index);

const port = 3000;
server.listen(port, () => {
  console.log('server is listening on port ' + port);
});