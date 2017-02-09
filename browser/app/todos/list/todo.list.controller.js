// define a `TodoListCtrl` controller that places injected
// `todos` (from a UI-Router state resolve) on the scope.
// It should have a scope method `setCategory` that changes
// `$scope.filterByCompleted` to certain values; a method
// `isActiveCategory` that confirms the current category;
// and a method `addTodo` that saves `$scope.toAdd` to the backend,
// then goes to that new todo's edit state. (If you are confused about
// where `$scope.toAdd` is coming from, check out the `todo.list.html`.)

app.controller('TodoListCtrl', function($scope, todos, Todo, $state){
	$scope.todos = todos;
	
	var map = {
		all: '',
		completed: true,
		active: false,
	};

	var select;

	$scope.setCategory = function(str){
		$scope.filterByCompleted = map[str];
		select = str;
	};

	$scope.isActiveCategory = function(str){
		if(select === str){
			return true;
		}
		return false;
	};

	$scope.addTodo = function(todo){
		return Todo.add(todo)
		.then(function(todo){
			$state.go('todos.edit', {id: todo.id});
		});
	};
});