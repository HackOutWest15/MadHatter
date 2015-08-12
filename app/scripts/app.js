'use strict';

/**
 * @ngdoc overview
 * @name madHatterApp
 * @description
 * # madHatterApp
 *
 * Main module of the application.
 */
angular
  .module('madHatterApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $httpProvider, $sceDelegateProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'searchController'
      })
      .when('/link/:tag/:uri', {
        templateUrl: 'views/viewLink.html',
        controller: 'viewLinkController'
      })
      .otherwise({
        redirectTo: '/'
      });

      $sceDelegateProvider.resourceUrlWhitelist([
          'self',
          'https://p.scdn.co/mp3-preview/**'
        ]);

      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

  });
