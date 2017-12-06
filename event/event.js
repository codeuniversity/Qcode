angular.module('p3')
.controller('eventPageController', function($scope, $location, $routeParams, eventService, userService){
    // var eventId = parseInt($routeParams.eventId);
    var eventId = $routeParams.eventId;
    // console.log($routeParams)

    $scope.newQuestion = '';
    $scope.event = eventService.getEvent(eventId);
    var question_count;
    if($scope.event.questions){
        question_count = $scope.event.questions.length;
    } else {
        question_count = 0;
        $scope.event.questions = {};
    }
    

    $scope.addQuestion= function(){ 
        if(!$scope.newQuestion){
            return false;
        }       

        var currentUser = userService.getLoggedInUser();

        var newQuestion = {
            text: $scope.newQuestion,
            votes: 0
        };
        
        console.log($scope.event)
        var questionId = question_count + 1;
        var questionObj = {};
        questionObj[questionId] = newQuestion;

        $scope.event.questions =questionObj;
        var updateEvent = {};
        updateEvent["title"] = $scope.event.title;
        updateEvent["username"] = $scope.event.username;
        updateEvent["questions"] = $scope.event.questions;

       
        console.log($scope.event)
        // $scope.event.questions.push(newQuestion);
        firebase.database().ref('/events/' + eventId).set(updateEvent)
    
        $scope.newQuestion = '';
    }
    
});