angular.module('p3')
    .controller('loginPageController', function($scope, $location, eventService) {
        $scope.loginWithGoogle = function() {
            // var database = firebase.database();
            // alert("LOGIN")
            var provider = eventService.getAuthInstance()
            firebase.auth().signInWithRedirect(provider);
           
            firebase.auth().getRedirectResult().then(function(result) {
                if (result.credential) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // ...
                }
                // The signed-in user info.
                var user = result.user;
                firebaseAuth().onAuthStateChanged(user => {
                    if(user){
                         console.log("User signed in: ", JSON.stringify(user));
                    }
                })
                var credential = provider.credential(user.getAuthResponse().token)
                firebase.auth().signInWithCredential(credential)
                // console.log(user)
                 $location.path('main-page')
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
           
        }

    });
