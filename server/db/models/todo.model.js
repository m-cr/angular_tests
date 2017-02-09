'use strict';

var db = require('../db');
var Sequelize = require('sequelize');

module.exports = db.define('todo', {
	complete: {
		type: Sequelize.STRING,
		defaultValue: false
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	description: {
		type: Sequelize.TEXT
	}
});
