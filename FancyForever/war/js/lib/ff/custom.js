/****************** Angular ********************/

var ffApp = angular.module('ffApp', ['ngAnimate', 'ngRoute', 'mgcrea.ngStrap', 'ngCookies'])
	.controller('SimpleController', function ($scope, $http, $route, $cookieStore) {
		$scope.items_list = [];
	    /*$scope.items_list = [
	                         {img: 'images/assets/owl1.jpg', price:4000, short_desc:'Denim Jeans', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl2.jpg', price:4000, short_desc:'T-Shirt', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl3.jpg', price:4000, short_desc:'Salwar', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl4.jpg', price:4000, short_desc:'Kurta', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl5.jpg', price:4000, short_desc:'Skirt', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl6.jpg', price:4000, short_desc:'Trouser', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl7.jpg', price:4000, short_desc:'Shirt', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl8.jpg', price:4000, short_desc:'Denim Jeans', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl1.jpg', price:4000, short_desc:'T-Shirt', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl2.jpg', price:4000, short_desc:'Salwar', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl3.jpg', price:4000, short_desc:'Kurta', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl4.jpg', price:4000, short_desc:'Skirt', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl5.jpg', price:4000, short_desc:'Trouser', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl6.jpg', price:4000, short_desc:'Shirt', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl7.jpg', price:4000, short_desc:'Long Top', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl8.jpg', price:4000, short_desc:'Long Top', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl1.jpg', price:4000, short_desc:'T-Shirt', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl2.jpg', price:4000, short_desc:'Salwar', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl3.jpg', price:4000, short_desc:'Kurta', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl4.jpg', price:4000, short_desc:'Skirt', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl5.jpg', price:4000, short_desc:'Trouser', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl6.jpg', price:4000, short_desc:'Shirt', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl7.jpg', price:4000, short_desc:'Long Top', long_desc:'Red gown for 8-10yrs'},
	                         {img: 'images/assets/owl8.jpg', price:4000, short_desc:'Long Top', long_desc:'Red gown for 8-10yrs'}
	          ];*/
	 
		$http({method: 'GET', url: '/_items/all'}).
	    success(function(data, status, headers, config) {
	    	for (var i in data) {
	    		var ji = {price: 4000};
	    		for (var key in data[i]) {
	    			var k = (key === 'primaryImg') 
	    					? 'img' 
	    					: (key === 'description') 
	    						? 'long_desc' 
	    						: (key === 'name') ? 'short_desc' : key;
    				ji[k] = data[i][key];
	    		}
	    		$scope.items_list.push(ji);
	    	}
	    }).
	    error(function(data, status, headers, config) {
	    	alert("Service call failed" + status + headers);
	    });
	    
	    /*** Date pickers **/
	    $scope.today = new Date();
	    $scope.delivery_date = undefined;
	    $scope.return_date = undefined;

	    /** Cart keeping **/
		$scope.no_items = 0;
		$scope.cost = 0;
		$scope.cart_items = [];
		if ($cookieStore.get('ci')) {
			$scope.cart_items = $cookieStore.get('ci');
			$scope.no_items = $scope.cart_items.length;
			for (j = 0; j <= $scope.no_items - 1; j++) {
				$scope.cost += $scope.cart_items[j].price;
			}
		}
				
		$scope.addItem = function(item) {
			$scope.cart_items.push(item);
			$cookieStore.put('ci', $scope.cart_items);
			$scope.cost = 0;
			$scope.no_items = 0;
			for (var i = 0; i <= $scope.cart_items.length - 1; i++) {
				$scope.cost += $scope.cart_items[i].price;
				$scope.no_items += 1;
			}
		};  	
		$scope.deleteItem = function(index) {
			$scope.cost = $scope.cost - $scope.cart_items[index].price;
			$scope.cart_items.splice(index, 1);
			$scope.no_items -= 1;
			$cookieStore.put('ci', $scope.cart_items);
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
		.when('/checkout', 
			{
				controllerAs: 'SimpleController',
				templateUrl: 'partial/checkout.html',
			})

		.otherwise({ redirectTo: '/'});
});

ffApp.directive('myowlcarousel', function() {
	return {
		restrict: 'A',
		link : function(scope, ele, attr) {
			scope.$watch(attr.list, function(){
				$(ele).owlCarousel({
				    pagination : false,
		    		navigation : false,
		    		slideSpeed : 300,
					paginationSpeed : 400,
					autoPlay: false,
                    itemsCustom : [
                                   [0, 1],
                                   [450, 2],
                                   [700, 3],
                                   [1000, 4],
                                   ],
                });
			});
		}
	}
});

ffApp.directive('ngElevateZoom', function() {
	  return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
	      element.attr('data-zoom-image',attrs.zoomImage);
	      $(element).elevateZoom();
	    }
	  };
	});

ffApp.directive('lazy', function($timeout) {
    return {
      restrict: 'C',
      link: function (scope, elm) {
        $timeout(function() {
          $(elm).lazyload({
            effect: 'fadeIn',
            effectspeed: 500,
            'skip_invisible': false
          });
        }, 0);
      }
    };
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

