const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.plugin(require('mongoose-unique-validator'));
mongoose.Promise = require('bluebird');

const router = require('./config/router');
const { dbURI, port } = require('./config/environment');
const app = express();

mongoose.connect(dbURI);

app.use(express.static(`${__dirname}/public`));

//5mb for photos
app.use(bodyParser.json({ limit: '5mb' }));
app.use('/api', router);

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;
