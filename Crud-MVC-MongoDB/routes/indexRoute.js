const express = require('express');

const routes = express.Router();

routes.use('/crud', require('../routes/crudRoute'));

module.exports = routes;