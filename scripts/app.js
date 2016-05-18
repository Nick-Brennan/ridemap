angular
  .module('ridemap', ['ngRoute', 'uiGmapgoogle-maps'])
  .config(config);

config.$inject = ['uiGmapGoogleMapApiProvider', '$routeProvider', '$locationProvider';]
function config (uiGmapGoogleMapApiProvider, $routeProvider, $locationProvider){

  $routeProvider
    .when('/', {
      templateUrl: 'templates/rides.html',
      controller: 'RideIndexController',
      controllerAs: 'rideIndexCtrl'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyAwtMDXCmDiBxw9iI-yQV1Qc_sGwcBVzZ0',
    libraries: 'weather,geometry,visualization'
  });
}
