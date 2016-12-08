// public/js/controllers/MainCtrl.js
angular.module('UserCtrl', ['UserService']).controller('UserController', ['userService', '$scope', function(userService, $scope) {
    console.log("In User Controller");

    $scope.tagline = 'Something Something pocket protector!';
    $scope.username = "";
    $scope.users = userService.getUsers();
    console.log("users: " + $scope.users    );

    userService.getOneUser("job").then(function(response){
        if(response.data){
            $scope.username = response.data.username;
            console.log(response)
        }
        else{
            console.log("Failed to retrieve username");
        }
    }, function FailureCallback(){
            console.log("Failed to retrieve username");
        }
    );


}]);
