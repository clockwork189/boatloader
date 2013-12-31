'use strict';

//Setting up route
angular.module('boatloader').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/dashboard/:userId', {
            templateUrl: 'views/dashboard.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
            // templateUrl: 'index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('boatloader').config(function($locationProvider) {
    $locationProvider.hashPrefix('!');
});
angular.module('boatloader').run(function($rootScope) {
    $rootScope.$on('$viewContentLoaded', function () {
        $(document).foundation();
    });
});