'use strict';

/**
 * @ngdoc service
 * @name madHatterApp.getContentService
 * @description
 * # getContentService
 * Service in the madHatterApp.
 */
angular.module('madHatterApp')
  .service('getContentService', ['$q', '$http', function($q, $http) {
	return {
		getTracks: function (query) {
			var deferred = $q.defer();

			$http.get('https://api.spotify.com/v1/search?q='+query+'&type=track').success(function(response) {
				deferred.resolve(response);
			}).error(function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		},

		getImages: function () {
			var deferred = $q.defer();

			$http.get('https://api.instagram.com/v1/tags/wowgbg/media/recent').success(function(response) {
				deferred.resolve(response);
			}).error(function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}
	};
  }]);
