'use strict';

describe('angular-rrssb', function () {
  var scope, $compile, $rootScope, element;
  function createDirective(template) {
    var elm;

    elm = angular.element(template);
    angular.element(document.body).prepend(elm);
    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  beforeEach(module('ngSanitize', 'mvsouza.angular-rrssb'));
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  function ietherWays(describeF, config){
    describe('as an element', function(){ describeF("<rrssb "+config+"></rrssb>"); });
    describe('as an attribute', function(){ describeF("<div rrssb "+config+"></div>"); });
  }

  ietherWays(runTestsWithTemplate,"")
  function runTestsWithTemplate(template) {
    describe('when created', function () {

      it('contain root class', function () {
        element = createDirective(template);

        expect(element.hasClass('rrssb-buttons')).toBe(true);
      });
    });
  }
  ietherWays(runTestsWithTemplateContainingArrayWithFacebook,"ng-share-midias=\"['facebook']\"")
  function runTestsWithTemplateContainingArrayWithFacebook(template) {
    describe('when created', function () {
      it('contain just facebook link', function () {
        element = createDirective(template);
        expect(element.html()).toContain('https://www.facebook.com/');
        expect(element.html()).not.toContain('https://www.linkedin.com/');
        expect(element.html()).not.toContain('https://twitter.com/');
        expect(element.html()).not.toContain('https://www.tumbler.com/');
        expect(element.html()).not.toContain('mailto');
      });
    });
  }
  ietherWays(runTestsWithCustomUrls,"ng-custom-urls=\"{'googleplus':'http://plus.google.com','facebook':'http://facebook.com'}\" ng-share-midias=\"['facebook','googleplus','tumblr']\"")
  function runTestsWithCustomUrls(template) {
    describe('when created with custom urls', function () {
      it('should replace the default for the custom urls', function () {
        element = createDirective(template);
        expect(element.find('.rrssb-facebook').html()).toContain('http://facebook.com');
        expect(element.find('.rrssb-googleplus').html()).toContain('http://plus.google.com');
        expect(element.find('.rrssb-tumblr').html()).toContain('http://tumblr.com/share?');
        expect(element.html()).not.toContain('mailto');
      });
    });
  }
});