const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.plugin(require('mongoose-unique-validator'));
mongoose.Promise = require('bluebird');

const router = require('./config/router');
const errorHandler = require('./lib/errorHandler');
const { dbURI, port } = require('./config/environment');
const app = express();

mongoose.connect(dbURI);

app.use(express.static(`${__dirname}/public`));

//5mb for photos
app.use(bodyParser.json({ limit: '5mb' }));
app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;
