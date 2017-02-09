'use strict';
/* globals module inject chai todoItemDirective */
var expect = chai.expect;

describe('Todo item', function () {

  /*------------------
      CONFIGURATION
  /------------------*/

  beforeEach(module('angularCheckpoint'));

  describe('directive `todoItem`', function () {

    var ddo;
    before(function () {
      // for future reference, this is not the correct way to
      // unit test an Angular directive, but in the interest of
      // assessment clarity we are using this strategy.
      ddo = todoItemDirective();
    });

    /*------------------
        TEST SPECS
    /------------------*/

    it('is an element directive', function () {
      expect(ddo.restrict).to.equal('E');
    });

    it('has isolate scope', function () {
      expect(ddo.scope).to.be.an('object');
    });

    it('accepts a model parameter `theTodo`', function () {
      expect(ddo.scope.theTodo).to.equal('=');
    });

  });

  /*------------------
      CONFIGURATION
  /------------------*/

  describe('controller `TodoItemCtrl', function () {

    var Todo, $scope, $state;
    beforeEach(inject(function ($controller, $rootScope, _$state_, $q) {
      // a new scope object we can manipulate directly
      $scope = $rootScope.$new();
      // a fake `Todo` factory (doesn't rely on your `Todo` factory)
      // `destroy` method returns a promise for successful destruction
      Todo = {
        destroy: chai.spy(function (id) {
          return $q.when(id + ' destroyed');
        })
      };
      // replace `$state.go` with a func that sets a `_mockUrl` property
      $state = _$state_;
      $state.go = function () {
        $state._mockUrl = $state.href.apply($state, arguments);
      };
      // instantiate the controller and inject our test objects
      $controller('TodoItemCtrl', {
        $scope: $scope,
        Todo: Todo,
        $state: $state
      });
    }));

    /*------------------
        TEST SPECS
    /------------------*/

    describe('`.toggleComplete` scope method', function () {

      it("toggles the todo's `.complete` field", function () {
        // if you are curious how this is being used,
        // check out line 6 of todo.item.html
        $scope.theTodo = { complete: false };
        $scope.toggleComplete();
        expect($scope.theTodo.complete).to.equal(true);
        $scope.toggleComplete();
        expect($scope.theTodo.complete).to.equal(false);
      });

    });

    describe('`.removeTodo` scope method', function () {

      it('uses the `Todo` factory', function () {
        // if you are curious how this is being used,
        // check out line 8 of todo.item.html
        var uniqueId = {};
        $scope.theTodo = { id: uniqueId };
        $scope.removeTodo();
        expect(Todo.destroy).to.have.been.called.once.with(uniqueId);
      });

      it('after removal, goes to the `todos` state', function () {
        $scope.theTodo = { id: 'abc123' };
        $scope.removeTodo();
        // don't transition yet; the `destroy` promise hasn't settled!
        expect($state._mockUrl).not.to.equal('/todos');
        // use `$state.go` to make this work.
        // We modified `$state.go` to change `$state._mockUrl`
        // instead of actually transitioning to a new state.
        $scope.$digest(); // makes settled $q promise call handler
        expect($state._mockUrl).to.equal('/todos');
      });

    });

  });

});
