/****************** Angular ********************/

var ffApp = angular.module('ffApp', ['ngAnimate', 'ngRoute'])
	.controller('SimpleController', function ($scope, $location) {
	    $scope.items_list = [
	                         {img: 'images/assets/owl1.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl2.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl3.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl4.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl5.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl6.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl7.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl8.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl1.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl2.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl3.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl4.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl5.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl6.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl7.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl8.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'}
	          ];
	    
		$scope.no_items = 0;
		$scope.cost = 0;
		$scope.cart_items = [];
		$scope.addItem = function(item) {
			$scope.cart_items.push(item);
			$scope.cost = 0;
			$scope.no_items = 0;
			for (var i = 0; i <= $scope.cart_items.length; i++) {
				$scope.cost += $scope.cart_items[i].price;
				$scope.no_items += 1;
			}
		};  	
		$scope.deleteItem = function(index) {
			$scope.cost = $scope.cost - $scope.cart_items[index].price;
			$scope.cart_items.splice(index, 1);
			$scope.no_items -= 1;
		};
		
		$scope.selected_item = $scope.items_list[0];
		$scope.selectItem = function(item) {
			$scope.selected_item = item;
		};
	});

ffApp.config(function($routeProvider) {
	$routeProvider
		.when('/', 
			{
				controllerAs: 'SimpleController',
				templateUrl: 'partial/landing-page.html',
			})
		.when('/browse', 
			{
				controllerAs: 'SimpleController',
				templateUrl: 'partial/filter-and-browse.html',
			})
		.when('/order', 
			{
				controllerAs: 'SimpleController',
				templateUrl: 'partial/item-order.html',
			})

		.otherwise({ redirectTo: '/'});
});


/*ffApp.controller('ExampleCtrl', function ($scope) {
        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
          // User successfully authorized the G+ App!
          alert(authResult);
          console.log('Signed in!');
        });
        $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
          // User has not authorized the G+ App!
          console.log('Not signed into Google Plus.');
        });
});
**********************************************/

