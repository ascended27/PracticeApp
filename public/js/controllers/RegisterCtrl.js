// public/js/controllers/RegisterCtrl.js

var registerModule = angular.module('RegisterCtrl',[]).controller('RegisterController', ['$scope', '$http', '$window', function($scope,$http,$window) {
    console.log("In Register Controller");

    $scope.userNameErr = false;
    $scope.fNameErr = false;
    $scope.lNameErr = false;
    $scope.passErr = false;
    $scope.confirmPassErr = false;



    $scope.submit = function (registerForm) {
        //Log the user info
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

            //Verify that the username is unique. If it is the create the user in the db.
            //TODO: ELSE
            $http.get('/api/usernames').then(function success(response){
                //Unique username flag
                var uniqueUsername = true;

                //Array of usernames returned by /api/usernames call
                var usernameArr = response.data;

                //Loop over the array of usernames and if any of them match then set uniqueUsername to false and break out.
                for(i = 0; i < usernameArr.length; i++ ){
                    if(usernameArr[i]===registerForm.username){
                        uniqueUsername = false;
                        break;
                    }
                }

                //If uniqueUsername is still true then add the user to the db.
                if(uniqueUsername){
                    $http.post('/api/register',registerForm).then(function success(){
                        $window.location.href='/login';
                    }, function failure(err){
                        console.log(err);
                    });
                }

                //Return a json object of status values.
                return {'passwordVerified':verified,'uniqueUsername':uniqueUsername};
            }, function error(err){
                send(err);
            });



    };

    $scope.verifyPassword = function (passwordOne, passwordTwo) {
       return passwordOne===passwordTwo;
    };

}]);
