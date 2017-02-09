'use strict';
/* globals module inject chai ngEnterDirective */
var expect = chai.expect;

/*---------------
   EXTRA CREDIT
----------------*/
// to enable this extra credit, change `xdescribe` below
// to just `describe`.

describe('ng-enter directive', function () {
  // if you are curious how this is being used,
  // check out line 6 of todo.item.html

  beforeEach(module('angularCheckpoint'));

  var ddo;
  before(function () {
    // again, this is not the normal way to test a directive,
    // but we are using it for clarity's sake in the assessment.
    ddo = ngEnterDirective();
  });

  it('is an attribute directive', function () {
    expect(ddo.restrict).to.equal('A');
  });

  it('has isolate scope', function () {
    expect(ddo.scope).to.be.ok;
  });

  it('accepts its namesake parameter as an expression', function () {
    expect(ddo.scope).to.be.an('object');
    expect(ddo.scope.ngEnter).to.equal('&');
  });

  it('triggers expression evaluation upon "enter" keypress', function () {
    inject(function ($compile, $rootScope) {
      var scope = $rootScope.$new();
      scope.doSomething = chai.spy();
      var element = $compile('<div ng-enter="doSomething()"></div>')(scope);
      var keyPressEvent = angular.element.Event('keydown');
      // non-enter key
      keyPressEvent.which = 10;
      element.trigger(keyPressEvent);
      expect(scope.doSomething).not.to.have.been.called();
      // enter key
      keyPressEvent.which = 13;
      element.trigger(keyPressEvent);
      expect(scope.doSomething).to.have.been.called.once;
    });
  });

});
