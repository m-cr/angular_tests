'use strict';

var Sequelize = require('sequelize');
var chalk = require('chalk');

var DB_URL = 'postgres://localhost/checkpoint_angular';

console.log(chalk.yellow('Opening connection to PostgreSQL'));

module.exports = new Sequelize(DB_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false // `pg-native` omitted in checkpoint for simpler cross-platform
});
