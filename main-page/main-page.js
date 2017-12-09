angular.module('p3')
.controller('mainPageController', function($scope, $location, userService, eventService){

    $scope.user = userService.getLoggedInUser();

    $scope.newEventTitle = '';

    $scope.events = eventService.getAllEvents();

    $scope.addEvent = function(){  
        if(!$scope.newEventTitle){
            return false;
        }
        var newEvent = {       
            title: $scope.newEventTitle,
            username: $scope.user.name,            
            questions: []
        };

        $scope.events.$add(newEvent);

        $scope.newEventTitle = '';
    }

    $scope.logout = function(){  
        firebase.auth().signOut().then(function() {
              // Sign-out successful.
            }).catch(function(error) {
              // An error happened.
            });
        $location.path('login');
    }

});