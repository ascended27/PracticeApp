// public/js/controllers/LoginCtrl.js
angular.module('LoginCtrl', []).controller('LoginController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    console.log("In Login Controller");

    $scope.loginVerified = -1;

    $scope.submit = function (login) {

        $http.post('/api/login',login).then(function (response) {
            try {
                var result = response.data;
                if (result === 'success') {
                    console.log("Logged in");
                    $scope.loginVerified = 1;
                    //TODO: make a cookie and put a jsonwebtoken in it.
                    $window.location.href='/index'
                } else {
                    console.log("Failed to log in");
                    $scope.loginVerified = 0;
                    //TODO: display a warning
                }
            } catch(e){
                console.log("Error logging in" , e)
            }
        })

    };

    $scope.verifyLogin = function(){
        if($scope.loginVerified == 0){
            return false;
        }
        else
            return true;
    };

    $scope.register = function () {
        $window.location.href = '/register';
    };
}]);
