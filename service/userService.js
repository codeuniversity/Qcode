angular.module('p3').service('userService', function(){
    var user = {
        name: 'tester',
        votes: []
    };

    this.getLoggedInUser = function(){
        return user;
    }

});