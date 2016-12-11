// public/js/controllers/LoginCtrl.js
angular.module('LoginCtrl',[]).controller('LoginController', ['$scope', '$window', function($scope, $window) {
    console.log("In Login Controller");

    $scope.submit = function(login){
        console.log(login);

        console.log("Username: " + login.username);
        console.log("Password: " + login.password);
    };

    $scope.register = function () {
        $window.location.href='/register';
    };
}]);
