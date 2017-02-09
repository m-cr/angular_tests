// define a `Todo` factory that uses AJAX calls to
// read and write from the backend Todo models. The methods
// should all return promises for the *data* of the server responses.

'use strict';

app.factory('Todo', function($http){

	var Todo = {};

	var cachedTodos = [];

	Todo.getOne = function(id){
		return $http.get('/api/todos/' + id)
		.then(function(todo){
			return todo.data;
		});
	};

	Todo.getAll = function(){
		return $http.get('/api/todos')
		.then(function(todos){
			angular.copy(todos.data, cachedTodos);
			return cachedTodos;
		});
	};

	Todo.destroy = function(id){
		var doomedTodo = cachedTodos.filter(function(todo){
			return todo.id === id;
		})[0];
		var idx = cachedTodos.indexOf(doomedTodo);
		cachedTodos.splice(idx, 1);

		return $http.delete('/api/todos/' + id)
		.then(function(response){
			return;
		});
	};

	Todo.add = function(todo){
		return $http.post('/api/todos/', todo)
		.then(function(response){
			cachedTodos.push(response.data);
			return response.data;
		});
	};

	Todo.update = function(id, data){
		return $http.put('/api/todos/' + id, data)
		.then(function(response){
			return response.data;
		});
	};

	return Todo;

});