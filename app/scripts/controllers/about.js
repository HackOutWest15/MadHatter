'use strict';

/**
 * @ngdoc function
 * @name madHatterApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the madHatterApp
 */
angular.module('madHatterApp')
  .controller('viewLinkController', ['$scope', 'getContentService', '$log', '$timeout', '$routeParams', function ($scope, getContentService, $log, $timeout, $routeParams) {
	$log.debug($routeParams.uri);

	$scope.images = [];
	var uri = $routeParams.uri.replace('spotify:track:', '');
	var i = 0;

	var showSlideShow = function () {
		if(i < 6) {
			var pos = Math.floor((Math.random() * 20));
			$scope.imgSrc = $scope.images[pos].standard_resolution.url;
			i++;
			$timeout(showSlideShow, 5000);
		}
	};

	var playTrack = function () {
		var elem = document.getElementById('theTrack');
		elem.play();
	};

	var fetchImages = function () {
		var promise = getContentService.getImages();
			
		var successCallback = function (result) {
			$log.debug(result);
			angular.forEach(result.data, function (obj) {
				$scope.images.push(obj.images);
			});

			showSlideShow();
			playTrack();
			$log.debug($scope.images);
		};

		var errorCallback = function (error) {
			$log.debug(error);
		};

		promise.then(successCallback, errorCallback);	
	};

	var search = function () {
		var promise = getContentService.getTrackFromUri(uri);

		var successCallback = function (result) {
			$log.debug(result);
			$scope.choosenTrack = result.preview_url;
			fetchImages();
		};

		var errorCallback = function (error) {
			$log.debug(error);
		};

		promise.then(successCallback, errorCallback);
	};

	if (uri) {
		search();
	}
  }]);
