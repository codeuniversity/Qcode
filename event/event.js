angular.module('p3')
.controller('eventPageController', function($scope, $location, $routeParams, eventService, userService){
    var eventId = parseInt($routeParams.eventId);

    $scope.newQuestion = '';
    $scope.event = eventService.getEvent(eventId);

    $scope.addQuestion= function(){ 
        if(!$scope.newQuestion){
            return false;
        }       

        var currentUser = userService.getLoggedInUser();

        var newQuestion = {
            text: $scope.newQuestion,
            votes: 0
        };

        $scope.event.questions.push(newQuestion);
    
        $scope.newQuestion = '';
    }
    
});