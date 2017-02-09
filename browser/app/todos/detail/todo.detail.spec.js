'use strict';
/* globals module inject chai */
var expect = chai.expect;

describe('Todos detail', function () {

  /*------------------
      CONFIGURATION
  /------------------*/

  beforeEach(module('angularCheckpoint'));

  describe('controller `TodoDetailCtrl`', function(){

    var $scope, todo;
    beforeEach(inject(function ($rootScope, $controller) {
      // a new scope object we can manipulate directly
      $scope = $rootScope.$new();
      // a fake resolved `todo` (doesn't rely on your state resolve)
      todo = {};
      // instantiate the controller and pass in our test objects
      $controller('TodoDetailCtrl', {
        $scope: $scope,
        todo: todo
      });
    }));

    /*------------------
        TEST SPECS
    /------------------*/

    it('places an injected `todo` on the scope', function(){
      expect($scope.todo).to.equal(todo);
    });

  });

  /*------------------
      CONFIGURATION
  /------------------*/

  describe('state `todos.detail`', function () {

    var Todo, $state, $rootScope, $injector;
    beforeEach(inject(function ($q, _$state_, _$rootScope_, _$injector_) {
      $state = _$state_;
      $rootScope = _$rootScope_;
      $injector = _$injector_;
      // a fake Todo factory (doesn't rely on your Todo factory)
      // `getOne` method returns a promise for object with an `id`
      Todo = {
        getOne: chai.spy(function (id) {
          return $q.when({ id: id });
        })
      };
    }));

    /*------------------
        TEST SPECS
    /------------------*/

    it('url compiles correctly', function () {
      var randomId = Math.floor(Math.random() * 1e5);
      var url = $state.href('todos.detail', {id: randomId});
      expect(url).to.equal('/todos/' + randomId);
    });

    it('resolves with a specific `todo` from the `Todo` factory', function (done) {
      // check that `todos.detail` state resolve's `todo` property is set
      var todoDetailState = $state.get('todos.detail');
      var fn = todoDetailState.resolve.todo;
      expect(fn).to.be.a('function');
      // inject our test objects into the resolve function and capture return
      var uniqueId = {};
      var result = $injector.invoke(fn, null, {
        Todo: Todo,
        $stateParams: { id: uniqueId }
      });
      // check the `Todo` factory was used in the func to fetch a specific todo
      expect(Todo.getOne).to.have.been.called.once.with(uniqueId);
      // check that the results are being returned correctly
      result.then(function(todo){
        expect(todo).to.eql({ id: uniqueId });
      }).catch(done);
      // test framework stuff: makes settled $q promise call handler
      $rootScope.$digest();
      done();
    });

  });

});
