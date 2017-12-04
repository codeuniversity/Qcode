angular.module('p3').service('userService', function(){
    var user = {
        name: 'tester'
    };

    this.getLoggedInUser = function(){
        return user;
    }

});