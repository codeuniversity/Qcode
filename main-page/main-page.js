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

    $scope.events = eventService.getAllEvents();

    $scope.addEvent = function(){  
        if(!$scope.newEventTitle){
            return false;
        }
        var newEvent = {       
            title: $scope.newEventTitle,
            username: $scope.user.displayName,            
            questions: []
        };

        $scope.events.$add(newEvent);

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