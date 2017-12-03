angular.module('p3')
.controller('mainPageController', function($scope, $location, userService, eventService){

    $scope.user = userService.getLoggedInUser();

    $scope.neweventTitle = '';

    $scope.threads = eventService.getAllEvents();

    $scope.addEvent = function(){  
        if(!$scope.newEventTitle){
            return false;
        }
        var newThread = {       
            title: $scope.newEventTitle,
            username: $scope.user.name,            
            questions: []
        };

        $scope.events.push(newEvent);

        $scope.newEventTitle = '';
    }

    $scope.logout = function(){        
        $location.path('login');
    }

});