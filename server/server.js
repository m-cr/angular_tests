'use strict';

var chalk = require('chalk');

var app = require('./app/app');
var startDb = require('./db');

function startServer () {
  var port = 8080;
  app.listen(port, function () {
    console.log(chalk.blue('Server awaiting orders on port', port, 'ma\'am/sir'));
  });
}

startDb
.then(startServer)
.catch(function (err) {
  console.log(chalk.red(err.stack));
  process.exit(1);
});
