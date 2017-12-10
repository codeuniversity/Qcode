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

    
    this.getEventSortedByQuestions = function(eventId){
        var ref = firebase.database().ref('/events/' + eventId).child('questions');
        var vote_order = [0]
        var sorted_questions = {};
        ref.once('value', function(snapshot) {
            snapshot.forEach(function(qSnapshot) {
                var count = vote_order.length
                vote_order.sort(function(a, b){return a-b});
                var votes = qSnapshot.val().votes;
                var text = qSnapshot.val().text;
                // vote_order.push(votes)
                for(v in vote_order){
                    if(votes > v){
                        sorted_questions[count] = [votes, text]
                        break;
                    }
                }
                vote_order.push(votes)
                console.log(vote_order)
                // sorted_questions.unshift((votes,qSnapshot.val().text ))
                console.log(votes, text)
                // var daBlog = blogs['efg'];
            });
        console.log(sorted_questions)
        });
        return $firebaseObject(ref);
         };

});
