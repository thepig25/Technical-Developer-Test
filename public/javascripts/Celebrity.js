/*exported app, UserCtrl*/
var app = angular.module('celebrityApp', ['angular.filter'])

.controller('CelebrityCtrl', function($scope, $http, $timeout) {
	$scope.user = [];
	$scope.loadUser = function() {
		$http({
				method: 'GET',
				url: 'data/celebrityRichList.json'
			})
			.success(function(data, status) {
				$scope.status = status;
				$scope.user = data;

				$scope.currencies = [{
					name: 'US Dollar',
					currencyCode:'$USD ',
					value: $scope.user.usDollarValue
				},
				{
					name: 'Euro',
					currencyCode:'€ ',
					value: $scope.user.euroValue
				},
				{
					name: 'Australian Dollar',
					currencyCode:'$AUD ',
					value: $scope.user.australianDollarValue
				}];

				$scope.fromCurrency = $scope.currencies[0];


			})
			.error(function(data, status) {
				$scope.data = data || 'Request failed';
				$scope.status = status;
			});
	};
	$scope.loadUser();
	$scope.orderProp = 'rank';

	$scope.calcCurrency = function(newCost) {
		return newCost / $scope.fromCurrency.value;
	};

});
