// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
    // nerds page that will use the NerdController
        .when('/user', {
            templateUrl: '../views/user.html',
            controller: 'UserController'
        })
        .when('/login', {
            templateUrl: '../views/login.html',
            controller: 'LoginController'
        })
        .when('/register',{
            templateUrl: '../views/register.html',
            controller: 'RegisterController'
        })
        .otherwise({
            templateUrl: '../views/home.html',
            controller: 'MainController'
        });

    $locationProvider.html5Mode(true);

}]);
