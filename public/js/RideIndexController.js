angular
  .module('ridemap')
  .controller('RideIndexController', RideIndexController);

  RideIndexController.$inject = ['$http'];

  function RideIndexController($http){
    var vm = this;
    vm.map = {center: { latitude: 37.7246, longitude: -122.4434 }, zoom: 12 }
    vm.data
    vm.d_route
    $http({
      method: 'GET',
      url: '/data'
    }).then(function(json){
      console.log(json);
      vm.data = json;
      console.log("data!!: ", vm.data);
    });

    $http({
      method: 'GET',
      url: '/route'
    }).then(function(json){
      console.log(json);
      vm.d_route = json;
      console.log("route polyline: ", vm.d_route);
    });
  }
