// public/js/controllers/RegisterCtrl.js

var registerModule = angular.module('RegisterCtrl',[]).controller('RegisterController', ['$scope', function($scope) {
    console.log("In Register Controller");

    $scope.userNameErr = false;
    $scope.fNameErr = false;
    $scope.lNameErr = false;
    $scope.passErr = false;
    $scope.confirmPassErr = false;



    $scope.submit = function (registerForm) {
            try {
                console.log(registerForm);
                console.log("Username: " + registerForm.username);
                console.log("Password: " + registerForm.password);
                console.log("First Name: " + registerForm.fName);
                console.log("Last Name: " + registerForm.lName);
                var verified = $scope.verifyPassword(registerForm.password, registerForm.confirmPassword);
                console.log("Verified: " + verified);
            }catch(e){
                console.log("ERROR: " + e.message);
            }


    };

    $scope.verifyPassword = function (passwordOne, passwordTwo) {
       return passwordOne===passwordTwo;
    };

}]);
