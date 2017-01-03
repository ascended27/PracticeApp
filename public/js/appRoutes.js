// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
    // nerds page that will use the NerdController
        .when('/friends', {
            templateUrl: '../views/friends.html',
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
        .when('/about',{
            templateUrl: '../views/about.html',
            controller: 'AboutController'
        })
        .when('/stats',{
            templateUrl: '../views/stats.html',
            controller: 'StatsController'
        })
        .when('/history',{
            templateUrl: '../views/history.html',
            controller: 'HistoryController'
        })
        .when('/locations',{
            templateUrl: '../views/locations.html',
            controller: 'LocationController'
        })
        .otherwise({
            templateUrl: '../views/home.html',
            controller: 'MainController'
        });

    $locationProvider.html5Mode(true);

}]);
