// define a `todoItem` element directive with an isolate scope
// which allows objects to be passed in through
// the `the-todo` attribute.
// It isn't tested, but you should also wire up the associated
// controller and templateUrl for a functioning app.

// NOTE: global todoItemDirective being used for ad-hoc testing

app.directive('todoItem', todoItemDirective = function () {

	return {
		restrict: 'E',
		templateUrl: '',
		scope: {
			theTodo: '='
		},
		controller: 'TodoItemCtrl'
	};

});
