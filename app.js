angular.module('p3', ['ngRoute', 'firebase'])
// .constant('fb'), {
//  url: 'https://project14-3.firebaseio.com'
// }
.config(function($routeProvider){
        $routeProvider.
            when('/login', {
                templateUrl: 'login/login.html'
            }).
            when('/load', {
                templateUrl: 'login/loading.html'
            }).
            when('/main-page', {
                templateUrl: 'main-page/main-page.html'
            }).
            when('/main', {
                templateUrl: 'main-page/main-page.html'
            }).
            when('/event/:eventId', {
                templateUrl: 'event/event.html'
            }).
            otherwise({
                redirectTo: '/login'
            });
});