'use strict';

/**
 * @ngdoc function
 * @name madHatterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the madHatterApp
 */
angular.module('madHatterApp')
  .controller('searchController', ['$scope', 'getContentService', '$log', function ($scope, getContentService, $log) {
	$scope.query = null;
	
	$scope.search = function () {
		if ($scope.query) {
			var promise = getContentService.getTracks($scope.query);

			var successCallback = function (result) {
				$log.debug(result);
				$scope.result = result;
			};

			var errorCallback = function (error) {
				$log.debug(error);
			};

			promise.then(successCallback, errorCallback);	
		}
	};

	$scope.trackChoosen = function (track) {
		$scope.choosenTrack = track;
		$log.debug($scope.choosenTrack);
	};
  }]);
