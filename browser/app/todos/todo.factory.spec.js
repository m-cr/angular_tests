'use strict';
/* globals module inject chai */
var expect = chai.expect;

// randomization to prevent hard-coding

function randomNum (upperBound) {
  return Math.floor(Math.random() * upperBound);
}

function makeFakeTodo () {
  return {
    id: 'xyz' + randomNum(1000),
    title: 'Thing' + randomNum(1000)
  };
}

function makeFakeTodos () {
  var fakeTodos = new Array(randomNum(8) + 3);
  for (var i = 0; i < fakeTodos.length; i++) fakeTodos[i] = makeFakeTodo();
  return fakeTodos;
}

// tests proper

describe('`Todo` factory', function () {

  /*------------------
      CONFIGURATION
  /------------------*/

  // load our Angular application from scratch
  beforeEach(module('angularCheckpoint'));

  // the `Todo` factory will be loaded before each test
  // $httpBackend lets us "stub" $http responses
  // fakeResTodo is a modified copy of fakeReqTodo (a randomized todo object)
  var Todo, $httpBackend, fakeReqTodo, fakeResTodo;
  beforeEach(inject(function ($injector) {
    Todo = $injector.get('Todo');
    $httpBackend = $injector.get('$httpBackend');
    fakeReqTodo = makeFakeTodo();
    fakeResTodo = {
      id: fakeReqTodo.id,
      title: fakeReqTodo.title,
      modification: randomNum(1000)
    };
  }));
  // checks that $httpBackend received and handled all expected calls
  afterEach(function(){
    try {
      $httpBackend.verifyNoOutstandingExpectation(false);
      $httpBackend.verifyNoOutstandingRequest();
    } catch (err) {
      this.test.error(err);
    }
  });

  /*------------------
      TEST SPECS
  /------------------*/

  it('`.getOne` fetches a backend todo by id', function (done) {
    $httpBackend
      .expect('GET', '/api/todos/' + fakeReqTodo.id)
      .respond(200, fakeResTodo);
    Todo.getOne(fakeReqTodo.id)
      .then(function (todo) {
        expect(todo).to.deep.equal(fakeResTodo);
      })
      .catch(done);
    $httpBackend.flush();
    done();
  });

  it('`.getAll` fetches all backend todos', function (done) {
    var fakeTodos = makeFakeTodos();
    $httpBackend
      .expect('GET', '/api/todos')
      .respond(200, fakeTodos);
    Todo.getAll()
      .then(function (todos) {
        expect(todos).to.deep.equal(fakeTodos);
      })
      .catch(done);
    $httpBackend.flush();
    done();
  });

  it('`.destroy` deletes an existing backend todo', function (done) {
    $httpBackend
      .expect('DELETE', '/api/todos/' + fakeReqTodo.id)
      .respond(204);
    Todo.destroy(fakeReqTodo.id)
      .catch(done);
    $httpBackend.flush();
    done();
  });

  it('`.add` creates a new backend todo', function (done) {
    $httpBackend
      .expect('POST', '/api/todos', fakeReqTodo)
      .respond(201, fakeResTodo);
    Todo.add(fakeReqTodo)
      .then(function (todo) {
        expect(todo).to.deep.equal(fakeResTodo);
      })
      .catch(done);
    $httpBackend.flush();
    done();
  });

  it('`.update` updates an existing backend todo', function (done) {
    var dueValue = randomNum(777);
    fakeResTodo.due = dueValue;
    $httpBackend
      .expect('PUT', '/api/todos/' + fakeReqTodo.id, {due: dueValue})
      .respond(200, fakeResTodo);
    Todo.update(fakeReqTodo.id, {due: dueValue})
      .then(function (todo) {
        expect(todo).to.deep.equal(fakeResTodo);
      })
      .catch(done);
    $httpBackend.flush();
    done();
  });

  /*------------------
      EXTRA CREDIT
  /------------------*/

  // NOTE: this extra credit section is a bit tricky and is intended
  // as an extra challenge AFTER you have already completed the rest
  // of the assessment. If you want to try it, change `xdescribe` to
  // `describe`.

  describe('cached todo list', function () {

    var cachedTodos;
    beforeEach(function (done) {
      $httpBackend
        .when('GET', '/api/todos')
        .respond(200, makeFakeTodos());
      Todo.getAll()
        .then(function (all) {
          cachedTodos = all;
        })
        .catch(done);
      $httpBackend.flush();
      done();
    });

    it('addition adds to cache', function (done) {
      var fakeReqTodo = makeFakeTodo();
      var fakeResTodo = makeFakeTodo();
      $httpBackend
        .when('POST', '/api/todos', fakeReqTodo)
        .respond(201, fakeResTodo);
      Todo.add(fakeReqTodo)
        .catch(done);
      $httpBackend.flush();
      expect(cachedTodos[cachedTodos.length-1]).to.deep.equal(fakeResTodo);
      done();
    });

    it('destruction deletes from cache', function (done) {
      var doomedTodo = cachedTodos[randomNum(cachedTodos.length)];
      var cacheMinusDoomedTodo = cachedTodos.filter(function(todo){
        return todo !== doomedTodo;
      });
      $httpBackend
        .when('DELETE', '/api/todos/' + doomedTodo.id)
        .respond(204);
      Todo.destroy(doomedTodo.id)
        .catch(done);
      $httpBackend.flush();
      expect(cachedTodos).to.deep.equal(cacheMinusDoomedTodo);
      done();
    });

  });

});
