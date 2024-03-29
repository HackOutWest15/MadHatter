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

		getImages: function (tag) {
			var deferred = $q.defer();

			$http.get('https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=34279e8c355346c4ba43b36aa4a9a34b').success(function(response) {
				deferred.resolve(response);
			}).error(function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		},

		getTrackFromUri: function (uri) {
			var deferred = $q.defer();

			$http.get('https://api.spotify.com/v1/tracks/'+uri).success(function(response) {
				deferred.resolve(response);
			}).error(function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		},

		getTags: function (tag) {
			var deferred = $q.defer();

			$http.get('https://api.instagram.com/v1/tags/search?q=' + tag + '&client_id=34279e8c355346c4ba43b36aa4a9a34b').success(function(response) {
				deferred.resolve(response);
			}).error(function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}
	};
  }]);
