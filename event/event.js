angular.module('p3')
.controller('eventPageController', function($scope, $location, $routeParams, eventService, userService){
    // var eventId = parseInt($routeParams.eventId);
    var eventId = $routeParams.eventId;
    // console.log($routeParams)

    $scope.newQuestion = '';
    $scope.event = eventService.getEvent(eventId);
    var question_count = 0;
    console.log($scope.event)

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
        var set_count = false;
        for (key in $scope.event) {
            if (!$scope.event.hasOwnProperty(key)) continue;
            console.log("KEY: " + key);
            // console.log($scope.event[key]);
            if(key == "questions"){
                // console.log($scope.event[key])
                console.log("Questions present")
                var length = $scope.event[key].length
                var count = 0, i = length;
                while (i--) {
                    if (typeof $scope.event[key][i] === "undefined") {count ++;}
                }
                // console.log(length)
                // console.log("empties: " + count)
                question_count = length - count;
                var set_count = true;
            } else {
                // console.log("Questions not found")
                if(set_count == false){
                    question_count = 0;
                }
                
            }
        }
        console.log("Num existing qs: " + question_count)
        
        var questionId = question_count + 1;

       
        // console.log($scope.event)
        if(question_count -1 == 0){
            console.log("This is the 1st question")
        }
        $scope.event.questions[questionId] = newQuestion;
        var updateEvent = {};
        updateEvent["title"] = $scope.event.title;
        updateEvent["username"] = $scope.event.username;
        updateEvent["questions"] = $scope.event.questions;
        
        // delete the haskey $$hashKey key
        for(var i; i <= question_count; i++){
            var current_item = updateEvent.questions[i];
          
            // console.log(typeof current_item)
            if(typeof current_item == "object"){
                console.log("Hoora")
                console.log(current_item)
                // angular.toJson(current_item)
            }
        }
        // updateEvent.questions[0]
        var sendToFB = angular.toJson(updateEvent.questions).replace("null,","");
        // console.log(typeof sendToFB)
        var finalSend = JSON.parse(sendToFB)
        console.log(finalSend)
        var new_dict = {};
        for( item in finalSend){
            console.log(item);
            new_dict[item] = finalSend[item]
        }
        console.log(new_dict)
        updateEvent.questions = new_dict;
        console.log(updateEvent)
       
        firebase.database().ref('/events/' + eventId).set(updateEvent)
        
    
        $scope.newQuestion = '';
    }
    
});