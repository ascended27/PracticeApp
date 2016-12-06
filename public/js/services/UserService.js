// public/js/services/UserService.js

angular.module('UserService', []).service('userService', ['$http', function($http){

    this.getUsers = function(){
        var users = $http.get('/api/users').then(function success(response){
            console.log("Res.json: " + response.json);
            return response.json;
        }, function error(response){
            send(err);
        });
    };
}]);