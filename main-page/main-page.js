angular.module('p3')
.controller('mainPageController', function($scope, $location, userService, eventService){

    // $scope.user = userService.getLoggedInUser();

    // $scope.user = firebase.auth().currentUser;
    userService.getFBCurrUser().then(function(res){
        console.log("CURRENT",res)
        $scope.user = res;
        // result is reached
        // var new_user_id = res + 1;
        // userService.sendUserToFB(new_user_id)
    })
    // userService.printUser()
    // push the current user to the userService
    // var send_to_user = {
    //     "name": $scope.user.displayName,
    //     "email": $scope.user.email,
    //     "votes": []
    // }
    // userService.updateLoggedInUser(send_to_user);
    userService.printUser();
    // $scope.user = userService.getLoggedInUser();
    userService.getUserCount().then(function(res){
        console.log("USER COUNT",res)
        // result is reached
        var new_user_id = res + 1;
        userService.sendUserToFB(new_user_id)
    })
            
    
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
    
    $scope.goToEvent = function(path_desired){
        console.log(path_desired)
        $location.path('#/event/' + path_desired)
        // if(!$scope.$$phase) $scope.$apply()
    }

    $scope.addEvent = function(){  
        if(!$scope.newEventTitle){
            return false;
        }
        var newEvent = {       
            title: $scope.newEventTitle,
            username: $scope.user.name,            
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