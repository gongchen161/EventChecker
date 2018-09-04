var app = angular.module('app',['ngRoute', 'firebase']);

app.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
    if (error == 'AUTH_REQUIRED') {
      $rootScope.message = "Please log in";
      $location.path('/login');
    }
  });
}]);


app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/checkin/:uid/:eid', {
      templateUrl: 'views/checkin.html',
      controller: 'CheckInController'
    }).
    when('/checkin/:uid/:eid/checkinlist', {
      templateUrl: 'views/checkinlist.html',
      controller: 'CheckInController'
    }).
    when('/event', {
      templateUrl: 'views/event.html',
      controller: 'EventController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);
