angular.module('p3')
    .controller('eventPageController', function ($scope, $location, $routeParams, eventService, userService) {
        // var eventId = parseInt($routeParams.eventId);
        $scope.child = {}
        var eventId = $routeParams.eventId;
        // console.log($routeParams)
        // eventService.getEventWithSortedQuestions(eventId);

        $scope.newQuestion = '';
        $scope.event = eventService.getEvent(eventId);

        eventService.getEventTitle(eventId).then(function(res){
            $scope.event.title = res;
        })

        eventService.getEventUser(eventId).then(function(res){
            $scope.event.username = res;
        })

        eventService.getEventTitle(eventId).then(function(title){
            console.log("Got scope title")
            $scope.event.title = title;
            eventService.getEventUser(eventId).then(function(name){
                $scope.event.username = name;
                eventService.getEventWithSortedQuestions(eventId).then(function(questions){
                    var new_event = {
                        "title": $scope.event.title,
                        "username":  $scope.event.username,
                        "questions": questions
                    }  
                    // $scope.event.questions = questions;
                    console.log(new_event)
                    eventService.sendEventToFB(eventId, new_event)
                })
            })
        })



        // $scope.event.title = eventService.getEventTitle(eventId);
   
        // $scope.event.username = eventService.getEventUser(eventId);

        // $scope.event["questions"] = [];
        // $scope.event.questions["text"] = "";
        // // $scope.event.questions.text = "";
        // $scope.event.questions = [];
        // eventService.getEventWithSortedQuestions(eventId).then(function(questions){
        //     console.log("SORTED QUESTIONS",res)
        //     eventService.getEventTitle(eventId).then(function(title){
        //         $scope.event.title = title;
        //         eventService.getEventUser(eventId).then(function(username){
        //             $scope.event.username = username;
        //             var new_event = {
        //                 "title": $scope.event.title,
        //                 "username":  $scope.event.username,
        //                 "questions": questions
        //             }
        //             console.log(new_event)
        //             eventService.sendEventToFB(eventId, new_event)
        //         })
        //     })
        //     // console.log($scope.event.title)
        //     // var new_event = {
        //     //     "title": $scope.event.title,
        //     //     "username":  $scope.event.username,
        //     //     "questions": res
        //     // }
        //     // console.log(new_event)
        //     // var ref = firebase.database().ref('/events/' + eventId).child("questions");
        //     // ref.set(res);
        //     // idea: overwrite in FB
        //     // eventService.sendEventToFB(eventId, res)
        //     // $scope.event.questions = res;
        //     // console.log($scope.event.questions)
        //     // $scope.$apply()
        //     // if(!$scope.$$phase) $scope.$apply()
        // })
        var question_count = 0;
        console.log($scope.event)
        // if($scope.event){
        //     console.log("EXISTS")
        //     eventService.getEventWithSortedQuestions(eventId).then(function(res){
        //         console.log("GOT RESPONSE")
        //         var new_event = {
        //             "title": $scope.event.title,
        //             "username":  $scope.event.username,
        //             "questions": res
        //         }  
        //         console.log(new_event)
        //     })
        // }

        $scope.goBack = function(){
            $location.path('main-page');
            if(!$scope.$$phase) $scope.$apply()
        }


        $scope.addVote = function (q_text, curr_votes) {
            // $scope.event.title = eventService.getEventTitle(eventId);
            // $scope.event.username = eventService.getEventUser(eventId);
            var keep_going = true;
            // limit each user to 1 vote per question
            // get the curent user; name of the current user via currentUser.name
            var currentUser = userService.getLoggedInUser();
            // var currentUser = firebase.auth().currentUser;
            console.log(currentUser.votes)
            if ($.inArray(q_text, currentUser.votes) == -1) {
                currentUser.votes.push(q_text)
            } else {
                keep_going = false;
            }

            console.log(currentUser.votes)

            if (keep_going) {
                // start add vote
                console.log(curr_votes)
                console.log("Adding a vote!")
                console.log(q_text)
                var new_votes = curr_votes + 1;
                // iterate through the questions until find the one with matching text
                for (q_id in $scope.event.questions) {
                    if (q_text == $scope.event.questions[q_id].text) {
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
                        for (item in finalSend) {
                            console.log(item);
                            new_dict[item] = finalSend[item]
                        }
                        updateEvent.questions = new_dict;
                        firebase.database().ref('/events/' + eventId).set(updateEvent);
                        break;
                    }
                }
                return new_votes;
            } else {
                alert("You have already voted for this item.")
                return curr_votes;
            }
        }

        $scope.addQuestion = function () {
            // $scope.event.title = eventService.getEventTitle(eventId);
            // $scope.event.username = eventService.getEventUser(eventId);
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
                        if (typeof $scope.event[key][i] === "undefined") {
                            count++;
                        }
                    }
                    question_count = length - count;
                    var set_count = true;
                } else {
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
            } else {
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