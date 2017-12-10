angular.module('p3')
.controller('mainPageController', function($scope, $location, userService, eventService){

    // $scope.user = userService.getLoggedInUser();
    $scope.user = firebase.auth().currentUser;
    var send_to_user = {
        "name": $scope.user.displayName,
        "email": $scope.user.email,
        "votes": []
    }
    
    // eventService.getAllUsers()
    
    firebase.database().ref('/users/').set(send_to_user)
    
    $scope.newEventTitle = '';
    
    var original_events = eventService.getAllEvents();
    var sorted_events;
    console.log(original_events)
   original_events.$loaded().then(function() {
       var new_list = [];
       angular.forEach(original_events, function(value,key){
        //   new_list.push({ id: key, data: value})
        new_list[key] = value;
       })
       console.log(new_list.reverse())
       console.log(eventService.getAllEvents())
       sorted_events = new_list.sort()
       $scope.events = sorted_events
       return sorted_events
    });
    

    $scope.addEvent = function(){  
        if(!$scope.newEventTitle){
            return false;
        }
        var newEvent = {       
            title: $scope.newEventTitle,
            username: $scope.user.displayName,            
            questions: []
        };
 
        firebase.database().ref('/events/').push(newEvent)
        // update $scope.events
        console.log(eventService.getAllEvents());
        window.location.reload()

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