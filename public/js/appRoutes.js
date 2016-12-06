// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
    // nerds page that will use the NerdController
        .when('/user', {
            templateUrl: '../views/user.html',
            controller: 'UserController'
        })
        .otherwise({
            templateUrl: '../views/home.html',
            controller: 'MainController'
        });

    $locationProvider.html5Mode(true);

}]);
