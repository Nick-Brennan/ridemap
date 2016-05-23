angular
  .module('ridemap')
  .controller('RideIndexController', RideIndexController);

  RideIndexController.$inject = ['$http'];

  function RideIndexController($http){
    var vm = this;
    vm.map = {center: { latitude: 37.78, longitude: -122.44 }, zoom: 13 }
    vm.data
    $http({
      method: 'GET',
      url: '/data'
    }).then(function(json){
      console.log(json);
      vm.data = json;
      console.log(vm.data);
    });
  }
