angular.module('p3')
.controller('loginPageController', function($scope, $location){
    $scope.loginWithGoogle = function(){
        $location.path('main-page')
    }

});