// define a `TodoEditCtrl` controller that places an injected
// `todo` (from a UI-Router state resolve) on the scope.
// It should have a scope method `keepChanges` that updates
// the current todo in the backend and then goes to the
// current todo's detail state.


app.controller('TodoEditCtrl', function($scope, todo, Todo, $state){
	$scope.todo = todo;
	$scope.keepChanges = function(){
		return Todo.update($scope.todo.id, $scope.todo)
		.then(function(todo){
			return $state.go('todos.detail', {id: todo.id});
		});
	};
});