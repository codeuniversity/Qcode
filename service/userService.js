angular.module('p3').service('userService', function(){
    var user = {
        name: 'tester',
        email: 'undefined',
        votes: []
    };

    this.getLoggedInUser = function(){
        return user;
    }

    this.updateLoggedInUser = function(new_user){
        user = new_user;
    }

    this.printUser = function(){
        console.log(user)
    }

    this.getExistingUsers = function(){
        firebase.database().ref('/users/').once('value').then(function(snapshot) {
            var users = (snapshot.val()) || 'UNDEFINED';
            return users;
          });
    };

    var user_count = 0;

    this.getUserCount = function(){
        var num_users;
        return new Promise((resolve, reject) => {
            firebase.database().ref('/users/').once('value').then(function(snapshot) {
                var users = (snapshot.val()) || 'UNDEFINED';
                num_users = Object.keys(users).length
                console.log("# Existing users: ",num_users);
                user_count = num_users;
                resolve(num_users)
              });
        })
    }

    this.getFBCurrUser = function(){
        return new Promise((resolve, reject) => {
            firebase.database().ref('/current/').once('value').then(function(snapshot) {
                var current = (snapshot.val()) || 'UNDEFINED';
                // num_users = Object.keys(users).length
                // console.log("# Existing users: ",num_users);
                // user_count = num_users;
                resolve(current)
              });
        })
    }

     this.getUserAlt =  function (){
         return new Promise((resolve, reject) => {
            let alt_user = firebase.auth().currentUser;
            console.log(alt_user)
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                  // User is signed in.
                  console.log("testing    ", user.email)
                  resolve(user)
                } else {
                  reject("UNDEFINED")
                }
              });
         })
    }

    this.getNewId = function(){
        return user_count + 1;
    }

    this.sendUserToFB = function(uid){
        firebase.database().ref('/users/' + uid ).set(user)
    }

});