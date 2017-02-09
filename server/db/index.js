'use strict';

var db = require('./db');
var chalk = require('chalk');

require('./models');

var syncedDbPromise = db.sync();

syncedDbPromise.then(function () {
  console.log(chalk.green('Sequelize models synced to PostgreSQL'));
});

module.exports = syncedDbPromise;
