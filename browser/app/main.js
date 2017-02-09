'use strict';

var app = angular.module('angularCheckpoint', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider, $httpProvider) {
  // remove '#' from urls
	$locationProvider.html5Mode(true);
  // invalid routes redirect to the root
	$urlRouterProvider.otherwise('/');
  // strip trailing slash off all $http requests (except for '/')
  var trailingSlash = /.\/$/;
  $httpProvider.interceptors.push(function(){
    return {
     request: function(config) {
      if (trailingSlash.test(config.url)) config.url = config.url.slice(0, -1);
      return config;
     }
    };
  });
});

// globals needed for the specs - don't delete!
var todoItemDirective = function () {};
var ngEnterDirective = function () {};

// these are simply defined here to reduce the number of
// initial errors in the specs when starting out
// you can ignore these if you wish
app.factory('Todo', function () { return {}; });
app.controller('TodoListCtrl', function () {});
app.controller('TodoItemCtrl', function () {});
app.directive('todoItem', function () { return {}; });
app.controller('TodoDetailCtrl', function () {});
app.controller('TodoEditCtrl', function () {});
app.directive('ngEnter', function () { return {}; });
