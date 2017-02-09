// define a `TodoDetailCtrl` controller that places an injected
// `todo` (from a UI-Router state resolve) onto the scope.

app.controller('TodoDetailCtrl', function($scope, todo){
	$scope.todo = todo;
});