angular.module('p3', ['ngRoute'])
.config(function($routeProvider){
        $routeProvider.
            when('/login', {
                templateUrl: 'login/login.html'
            }).
            when('/main-page', {
                templateUrl: 'main-page/main-page.html'
            }).
            when('/event/:eventId', {
                templateUrl: 'event/event.html'
            }).
            otherwise({
                redirectTo: '/main-page'
            });
});