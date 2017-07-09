var app = angular.module('myapp', ['ngRoute','matchControllers']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'matchlist.html',
    controller: 'ListController'
  }).
  when('/match/:yearId/:roundsId/:matchId', {
    templateUrl: 'matchdetails.html',
    controller: 'DetailsController'
  }).
  when('/team/:teamId', {
    templateUrl: 'teamdetails.html',
    controller: 'teamDetailsController'
  }).  
  
  otherwise({
template:'<h2>Page not found</h2>'});
}]);




