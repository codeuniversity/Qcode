angular.module('p3')
.controller('eventPageController', function($scope, $location, $routeParams, eventService, userService){
    // var eventId = parseInt($routeParams.eventId);
    var eventId = $routeParams.eventId;
    // console.log($routeParams)

    $scope.newQuestion = '';
    $scope.event = eventService.getEvent(eventId);
    var question_count = 0;
    console.log($scope.event)
  
    
    $scope.addVote = function(q_text, curr_votes){
        var keep_going = true;
        // limit each user to 1 vote per question
        // get the curent user; name of the current user via currentUser.name
        // var currentUser = userService.getLoggedInUser();
        var currentUser = firebase.auth().currentUser;
        console.log(currentUser.votes)
        if($.inArray(q_text, currentUser.votes) == -1){
            currentUser.votes.push(q_text)
        } else {
            keep_going = false;
        }
        
        console.log(currentUser.votes)
        
        if(keep_going){
            // start add vote
            console.log(curr_votes)
            console.log("Adding a vote!")
            console.log(q_text)
            var new_votes = curr_votes + 1;
            // iterate through the questions until find the one with matching text
            for(q_id in $scope.event.questions){
                if(q_text == $scope.event.questions[q_id].text){
                    console.log("FOUND MATCH");
                    // already pushed to the app; need to push to firebase now
                    var updatedQuestion = {
                        "text": q_text,
                        "votes": new_votes
                    }
                    var updateEvent = {};
                    updateEvent["title"] = $scope.event.title;
                    updateEvent["username"] = $scope.event.username;
                    updateEvent["questions"] = $scope.event.questions;
                    updateEvent["questions"][q_id] = updatedQuestion;
                    console.log(updateEvent)
                    var sendToFB = angular.toJson(updateEvent.questions);
                    var finalSend = JSON.parse(sendToFB)
                    var new_dict = {};
                    for( item in finalSend){
                        console.log(item);
                        new_dict[item] = finalSend[item]
                    }
                }
                return new_votes;
            }
            else {
                alert("You have already voted for this item.")
                return curr_votes;
            }
        }

        $scope.addQuestion = function() {
            console.log("Adding a question!")
            if (!$scope.newQuestion) {
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
                if (key == "questions") {
                    console.log("Questions present")
                    var length = $scope.event[key].length
                    var count = 0,
                        i = length;
                    while (i--) {
                        if (typeof $scope.event[key][i] === "undefined") { count++; }
                    }
                    question_count = length - count;
                    var set_count = true;
                }
                else {
                    if (set_count == false) {
                        question_count = 0;
                    }

                }
            }
            console.log("Num existing qs: " + question_count)

            var questionId = question_count + 1;


            // console.log($scope.event)
            if (question_count - 1 == 0) {
                console.log("This is the 1st question")
            }
            if (typeof $scope.event.questions !== "undefined") {
                $scope.event.questions[questionId] = newQuestion;
                var updateEvent = {};
                updateEvent["title"] = $scope.event.title;
                updateEvent["username"] = $scope.event.username;
                updateEvent["questions"] = $scope.event.questions;
            }
            else {
                var updateEvent = {};
                updateEvent["title"] = $scope.event.title;
                updateEvent["username"] = $scope.event.username;
                $scope.event.questions = {};
                $scope.event.questions[questionId] = newQuestion;
                updateEvent["questions"] = $scope.event.questions;
            }



            // delete the haskey $$hashKey key
            // for(var i; i <= question_count; i++){
            //     var current_item = updateEvent.questions[i];

            //     // console.log(typeof current_item)
            //     if(typeof current_item == "object"){
            //         console.log("Hoora")
            //         console.log(current_item)
            //         // angular.toJson(current_item)
            //     }
            // }
            // updateEvent.questions[0]
            var sendToFB = angular.toJson(updateEvent.questions).replace("null,", "");
            // console.log(typeof sendToFB)
            var finalSend = JSON.parse(sendToFB)
            console.log(finalSend)
            var new_dict = {};
            for (item in finalSend) {
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
