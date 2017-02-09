'use strict';

var router = require('express').Router();
var _ = require('lodash');

var Todo = require('../../db/models').Todo;
var HttpError = require('../../utils/HttpError');

router.param('id', function (req, res, next, id) {
	Todo.findById(id)
	.then(function (todo) {
		if (todo) {
			req.todo = todo;
			next();
			return null; // silence Bluebird warning re: non-returned promise in next
		} else {
			throw HttpError(404);
		}
	})
	.catch(next);
});

router.get('/', function (req, res, next) {
	Todo.findAll()
	.then(function (todos) {
		res.json(todos);
	})
	.catch(next);
});

router.get('/:id', function (req, res, next) {
	res.json(req.todo);
});

router.post('/', function (req, res, next) {
	Todo.create(req.body)
	.then(function (todo) {
		res.status(201).json(todo);
	})
	.catch(next);
});

router.put('/:id', function (req, res, next) {
	delete req.body.id;
	_.extend(req.todo, req.body);
	req.todo.save()
	.then(function (updatedTodo) {
		res.json(updatedTodo);
	})
	.catch(next);
});

router.delete('/:id', function (req, res, next) {
	req.todo.destroy()
	.then(function () {
		res.status(204).end();
	})
	.catch(next);
});

module.exports = router;