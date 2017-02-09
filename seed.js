'use strict';

var chance = require('chance')(123),
	_ = require('lodash'),
	Promise = require('bluebird');

var db = require('./server/db/db.js');
var Todo = require('./server/db/models').Todo;

var numTodos = 10;

function randTodo () {
	return Todo.build({
		complete: chance.bool(),
		title: chance.word(),
		description: chance.paragraph()
	});
}

function generateAll () {
	return _.times(numTodos, randTodo);
}

function seed () {
	var todos = generateAll();
	return Promise.map(todos, function (todo) {
		return todo.save();
	});
}

db.sync({force: true})
.then(function () {
	return seed();
})
.then(function () {
	console.log('Seeding successful');
})
.catch(function (err) {
	console.error('Error while seeding');
	console.error(err.stack);
})
.then(function () {
	db.close(); // uses promises but does not return a promise
	return null; // silence Bluebird warning re: non-returned promise in handler
});
