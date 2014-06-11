var addthis_config = {"data_track_addressbar":true};

function slider() {
   $('#dress_filter').toggleClass('slide');
}

var demoApp = angular.module('demoApp', ['ngAnimate','directive.g+signin'])
	.controller('SimpleController', function ($scope) {
	    $scope.items_list = [
	                         {img: 'images/frontend/items/item1.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/frontend/items/item2.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/frontend/items/item3.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/frontend/items/item4.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/frontend/items/item5.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/frontend/items/item6.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/frontend/items/item7.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/frontend/items/item8.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/frontend/items/item1.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/frontend/items/item2.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/frontend/items/item3.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/frontend/items/item4.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/frontend/items/item5.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/frontend/items/item6.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/frontend/items/item7.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/frontend/items/item8.jpg', price:4000, short_desc:'Beautiful Dress', long_desc:'Red gown for 8-10yrs'}
	          ];
	    
	    $scope.templates = [{url: 'partial/carousel.html'}, 
	                        {url: 'partial/checkout.html'}, 
	                        {url: 'partial/login.html'},
	                        {url: 'partial/auth.html'}];
	    $scope.template = $scope.templates[0];

		$scope.no_items = 0;
		$scope.cost = 0;
		$scope.cart_items = [];
		$scope.partial_content = "partial/carousel.html";
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
		
		$scope.setPartialContent = function(index) {
			$scope.template = $scope.templates[index];
		};
		$scope.resetPartialContent = function() {
			$scope.template = $scope.templates[0];
		};		
	});

/*demoApp.config(function($routeProvider) {
	$routeProvider
		.when('/', 
			{
				controller: 'SimpleController',
				templateUrl: 'partial/cart.html',
			})
		.otherwise({ redirectTo: '/'});
});*/

demoApp.controller('ExampleCtrl', function ($scope) {
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
