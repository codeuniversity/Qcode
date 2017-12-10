angular.module('p3')
    .controller('loginPageController', function($scope, $routeParams, $location, eventService, userService) {
    //     $rootScope.$on('$routeChangeError', function () {
    //         console.log($routeChangeError)
    
    // });
    // $("#loading-text").text(" ")
    userService.printUser();
    
       console.log($routeParams)
        
       var user = firebase.auth().currentUser;
       console.log("START")
       console.log(user)
    //   if(user){
    //         // console.log(user.displayName)
    //         $location.path('main-page')
    //   }
        
        $scope.loginWithGoogle = function() {
            var provider = new firebase.auth.GoogleAuthProvider();
            if(user){
                console.log("Pressed login but user is already signed in")
               $location.path('main-page')
                // console.log("User is signed in")
            } else {
                 console.log("Need to sign in user")
                firebase.auth().signInWithRedirect(provider);
                $location.path('load');
            }
            
        };
        
            
        // NOTE: HAD TO ENABLE SET 3RD PARTY COOKIES IN CHROME
        firebase.auth().getRedirectResult().then(function(result) {
            
            // console.log(result)
            if (result.credential) {
                // $("#loading-text").text("Please wait...")
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                
            }
            // The signed-in user info.
            user = result.user;
            $scope.user.name = user.displayName
            var send_to_user = {
                "name": user.displayName,
                "email": user.email,
                "votes": []
            }
            userService.updateLoggedInUser(send_to_user);
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
        });

        firebase.auth().onAuthStateChanged(function(user) {
            // $("#loading-text").text("Please wait...")
            if (user) {
              // User is signed in.
                console.log(user)
                console.log(user.displayName, " is signed in")
                var send_to_user = {
                    "name": user.displayName,
                    "email": user.email,
                    "votes": []
                }
                userService.updateLoggedInUser(send_to_user);
                firebase.database().ref('/current/' ).set(send_to_user)
                // userService.printUser();
                console.log("---------")
                // $location.url('https://project14-3-ekhattar.c9users.io/#/main-page')
                $location.path('main-page');
                if(!$scope.$$phase) $scope.$apply()
                
                
                // $location.path('login').replace()
                
            } else {
                // $("#loading-text").text("Sign in failed.")
                // $location.path('login')
                //no user is signed in
            }
        });
        

    });
