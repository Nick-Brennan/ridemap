angular
  .module('ridemap')
  .controller('RideIndexController', RideIndexController);

  RideIndexController.$inject = ['$http'];

  function RideIndexController($http){
    var vm = this;
    vm.center = [null, null];
    vm.map = {center: { latitude: vm.center[0] || 37.8361, longitude: vm.center[1] || -122.4789 }, zoom: 12 };
    vm.data;
    vm.d_route;
    vm.new_address = {};

    //retrieving uber ride data
    $http({
      method: 'GET',
      url: '/data'
    }).then(function(json){
      vm.data = json;
    });

    //hitting the google directions api
    $http({
      method: 'GET',
      url: '/route'
    }).then(function(json){
      var new_route_string = json.data.routes[0].overview_polyline.points;
      var new_route_array = decodePolyline(new_route_string);
      var temp_arr = [];
      new_route_array.forEach(function(arr){
        var temp_obj = {};
        temp_obj.latitude = arr[0];
        temp_obj.longitude = arr[1];

        temp_arr.push(temp_obj);
      });
      vm.d_route = temp_arr;
      vm.center = temp_arr[Math.floor(temp_arr.length / 2)];
      console.log("center : ", vm.center);
    });

    vm.test = function(){
      console.log('testing: ', vm.new_address);
      $http({
        method: 'POST',
        url: '/route',
        data: vm.new_address
      }).then(function(json){
        var new_route_string = json.data.routes[0].overview_polyline.points;
        var new_route_array = decodePolyline(new_route_string);
        var temp_arr = [];
        new_route_array.forEach(function(arr){
          var temp_obj = {};
          temp_obj.latitude = arr[0];
          temp_obj.longitude = arr[1];

          temp_arr.push(temp_obj);
        });
        vm.d_route = temp_arr;
        vm.center = temp_arr[Math.floor(temp_arr.length / 2)];
        vm.map = {center: { latitude: vm.center['latitude'], longitude: vm.center['longitude'] }, zoom: 12 };
        console.log("center : ", vm.center);
        vm.updateCost();
      });
      // $http.post('/route', JSON.stringify(vm.new_address)).then(function(){console.log('hit the post route')});
    };

    vm.updateCost = function(){
      console.log('getting new price from Uber');
      $http({
        method: 'POST',
        url: '/data',
        data: {'start': vm.d_route[0], 'end': vm.d_route[vm.d_route.length -1]}
      }).then(function(json){
        vm.data = json
      });
    }
  }


//polyline decryption function extracted from mapbox's polyline node package
  function decodePolyline(str, precision) {
    var index = 0,
        lat = 0,
        lng = 0,
        coordinates = [],
        shift = 0,
        result = 0,
        byte = null,
        latitude_change,
        longitude_change,
        factor = Math.pow(10, precision || 5);

    while (index < str.length) {

        byte = null;
        shift = 0;
        result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        shift = result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        lat += latitude_change;
        lng += longitude_change;

        coordinates.push([lat / factor, lng / factor]);
    }

    return coordinates;
}
