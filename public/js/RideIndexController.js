angular
  .module('ridemap')
  .controller('RideIndexController', RideIndexController);

  RideIndexController.$inject = ['$http'];

  function RideIndexController($http){
    var vm = this;
    vm.map = {center: { latitude: 37.78, longitude: -122.44 }, zoom: 4 }
  }
