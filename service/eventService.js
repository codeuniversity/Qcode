angular.module("p3").service("eventService", function($firebaseArray, $firebaseObject) {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDigiT3cpa-qZL8lFQWA5dqRD_Q8W5cDos",
        authDomain: "project14-3.firebaseapp.com",
        databaseURL: "https://project14-3.firebaseio.com",
        projectId: "project14-3",
        storageBucket: "project14-3.appspot.com",
        messagingSenderId: "976431007712"
    };
    
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    // firebase.initializeApp(config);
    var database = firebase.database();

    this.getAllEvents = function() {
        var ref = firebase.database().ref('/events');
        return $firebaseArray(ref);
    };
    
    this.getAllUsers = function() {
        var ref = firebase.database().ref('/users');
        // var countRef = ref.parent.child('childCount');
        // console.log(countRef)
        return $firebaseArray(ref);
    }

    this.getEvent = function(eventId) {
        var ref = firebase.database().ref('/events/' + eventId);
        return $firebaseObject(ref);

    };

    this.sendEventToFB = function(event_id, new_event){
        firebase.database().ref('/events/' + event_id ).set(new_event)
    }

    this.getEventTitle = function(eventId){
        var ref = firebase.database().ref('/events/' + eventId);
        return new Promise((resolve, reject) => {
            firebase.database().ref('/events/' + eventId).once('value').then(function(snapshot) {
                var event_data = (snapshot.val()) || 'UNDEFINED';
                resolve(event_data.title)
            });
    })}

    this.getEventUser = function(eventId){
        var ref = firebase.database().ref('/events/' + eventId);
        return new Promise((resolve, reject) => {
            firebase.database().ref('/events/' + eventId).once('value').then(function(snapshot) {
                var event_data = (snapshot.val()) || 'UNDEFINED';
                resolve(event_data.username)
            });
    })}

    this.getEventWithSortedQuestions = function(eventId){
        console.log("Getting event with sorted questions")
        var ref = firebase.database().ref('/events/' + eventId);
        var sorted_event = {};
        // var fb_ref = $firebaseObject(ref);
        return new Promise((resolve, reject) => {
            firebase.database().ref('/events/' + eventId).once('value').then(function(snapshot) {
                var event_qs = (snapshot.val()) || 'UNDEFINED';
                sorted_event["title"] = event_qs.title;
                sorted_event["username"] = event_qs.username;
                // console.log(event_qs.questions)
                // console.log(typeof event_qs.questions)
                //event_qs.question is a list of objects  
                if(!event_qs.questions){
                    // event_qs["questions"] = [];
                    resolve([])
                } else {
                    var object_list = event_qs.questions;
                    var sorted_questions_list = [];
                    for (i = 0; i < object_list.length; i++) { 
                        var obj_votes = object_list[i]['votes']
                        var obj_text = object_list[i]['text']
                        if(i === 0){
                            // first object
                            sorted_questions_list.unshift(object_list[i])
                        } else {
                            // console.log(sorted_questions_list[0]['votes'])
                            if(obj_votes >= sorted_questions_list[0]['votes']){
                                sorted_questions_list.unshift(object_list[i])
                                // console.log("Votes " + obj_votes + " > " + sorted_questions_list[0]['votes'])
                            // } else if(obj_votes == sorted_questions_list[0]['votes']){
                            //     sorted_questions_list.push(object_list[i])
                            } else {
                                sorted_questions_list.push(object_list[i])
                            }
                        }
                    };
                    sorted_event['questions'] = sorted_questions_list;
                    console.log(sorted_event)
                    // fb_ref.questions = sorted_questions_list
                    resolve(sorted_questions_list);
                }
                // var object_list = event_qs.questions;
                // var sorted_questions_list = [];
                // for (i = 0; i < object_list.length; i++) { 
                //     var obj_votes = object_list[i]['votes']
                //     var obj_text = object_list[i]['text']
                //     if(i === 0){
                //         // first object
                //         sorted_questions_list.unshift(object_list[i])
                //     } else {
                //         // console.log(sorted_questions_list[0]['votes'])
                //         if(obj_votes >= sorted_questions_list[0]['votes']){
                //             sorted_questions_list.unshift(object_list[i])
                //             // console.log("Votes " + obj_votes + " > " + sorted_questions_list[0]['votes'])
                //         // } else if(obj_votes == sorted_questions_list[0]['votes']){
                //         //     sorted_questions_list.push(object_list[i])
                //         } else {
                //             sorted_questions_list.push(object_list[i])
                //         }
                //     }
                // };
                // sorted_event['questions'] = sorted_questions_list;
                // console.log(sorted_event)
                // // fb_ref.questions = sorted_questions_list
                // resolve(sorted_questions_list);
              });
        })
        // firebase.database().ref('/events/' + eventId).once('value').then(function(snapshot) {
        //     var event_qs = (snapshot.val()) || 'UNDEFINED';
        //     sorted_event["title"] = event_qs.title;
        //     sorted_event["username"] = event_qs.username;
        //     // console.log(event_qs.questions)
        //     // console.log(typeof event_qs.questions)
        //     //event_qs.question is a list of objects  
        //     var object_list = event_qs.questions;
        //     var sorted_questions_list = [];
        //     for (i = 0; i < object_list.length; i++) { 
        //         var obj_votes = object_list[i]['votes']
        //         var obj_text = object_list[i]['text']
        //         if(i === 0){
        //             // first object
        //             sorted_questions_list.unshift(object_list[i])
        //         } else {
        //             // console.log(sorted_questions_list[0]['votes'])
        //             if(obj_votes >= sorted_questions_list[0]['votes']){
        //                 sorted_questions_list.unshift(object_list[i])
        //                 // console.log("Votes " + obj_votes + " > " + sorted_questions_list[0]['votes'])
        //             // } else if(obj_votes == sorted_questions_list[0]['votes']){
        //             //     sorted_questions_list.push(object_list[i])
        //             } else {
        //                 sorted_questions_list.push(object_list[i])
        //             }
        //         }
        //     };
        //     sorted_event['questions'] = sorted_questions_list;
        //     console.log(sorted_event)
        //     // fb_ref.questions = sorted_questions_list
        //     return sorted_questions_list;
        //   });
    };

    


});
