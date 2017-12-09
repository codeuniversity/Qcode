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
    
    this.getAuthInstance = function(){
         var provider = new firebase.auth.GoogleAuthProvider();
         return provider;
    }
    

    this.getAllEvents = function() {
        var ref = firebase.database().ref('/events');
        return $firebaseArray(ref);
    };

    this.getEvent = function(eventId) {
        var ref = firebase.database().ref('/events/' + eventId);
        return $firebaseObject(ref);
    };
});
