// public/js/controllers/UserCtrl.js
angular.module('UserCtrl', ['UserService']).controller('UserController', ['userService', '$scope', function(userService, $scope) {
    console.log("In User Controller");

    var UserService = userService;

    $scope.tagline = 'Something Something pocket protector!';

    $scope.users = UserService.getUsers();
}]);
