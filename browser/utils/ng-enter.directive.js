//-------------
// EXTRA CREDIT
// change `xdescribe` -> `describe` to attempt
//-------------

// define an `ngEnter` attribute directive with an isolate scope
// that can access an *expression* defined on the ng-enter attribute.
// when the user hits the `enter` key in this directive,
// the expression should be evaluated (run).

// if you are curious how this is being used,
// check out line 6 of todo.item.html.

// `ngEnterDirective` is a global used for testing purposes.
// you would not normally use this kind of syntax, just an inline function.

app.directive('ngEnter', ngEnterDirective = function () {

  return {
  		restrict: 'A',
  		scope: {
  			ngEnter: '&'
  		},
  		link: function(scope, element, attrs){
  			element.on('keydown', function(e){
  				if(e.which == '13'){
	  				scope.ngEnter();
  				}
  				else{return};
  			});
  		}
  };
});
