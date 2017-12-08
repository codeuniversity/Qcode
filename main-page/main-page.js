angular.module('p3')
.controller('mainPageController', function($scope, $location, userService, eventService){

    $scope.user = userService.getLoggedInUser();

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
        $location.path('login');
    }

});