'use strict';

/**
 * @ngdoc function
 * @name madHatterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the madHatterApp
 */
angular.module('madHatterApp')
  .controller('searchController', ['$scope', 'getContentService', '$log', '$timeout', function ($scope, getContentService, $log, $timeout) {
	$scope.query = null;
	$scope.images = [];
	$scope.linkToShare = false;
	$scope.tag = null;
	$scope.startSlideshow = false;
	var copyImages = [];
	var i = 0;
	
	var showSlideShow = function () {
		$scope.startSlideshow = true;

		$('body, html').animate({
			scrollTop: $('#show').offset().top
		}, 500);

		if(i < 6) {
			var pos = Math.floor((Math.random() * 20));
			$scope.imgSrc = $scope.images[pos].standard_resolution.url;
			i++;
			$timeout(showSlideShow, 5000);
		} else {
			$scope.url = 'localhost:9000/#/link/' + $scope.tagChoosen.name + '/' + $scope.choosenTrack.uri;
			$scope.linkToShare = true;
		}
	};

	var playTrack = function () {
		var elem = document.getElementById('theTrack');
		elem.play();
	};

	var fetchImages = function (tag) {
		var promise = getContentService.getImages(tag);
			
		var successCallback = function (result) {
			$log.debug(result);
			angular.forEach(result.data, function (obj) {
				$scope.images.push(obj.images);
				copyImages.push(obj.images);
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

	$scope.search = function () {
		if ($scope.query && $scope.query.length >= 3) {
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
	};

	$scope.pressedEnter = function ($event, searchFunction) {
		if ($event.keyCode === 13 && searchFunction === 'tracks') {
			$scope.search();
		} else if ($event.keyCode === 13 && searchFunction === 'tags') {
			$scope.searchTags();
		}
	};

	$scope.searchTags = function () {
		if ($scope.tag) {
			var promise = getContentService.getTags($scope.tag);

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

	$scope.tagChoosen = function (tag) {
		$scope.tagChoosen = tag;
		fetchImages(tag.name);
	};
  }]);
