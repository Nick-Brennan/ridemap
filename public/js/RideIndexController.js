angular
  .module('ridemap')
  .controller('RideIndexController', RideIndexController);

  RideIndexController.$inject = ['$http'];

  function RideIndexController($http){
    var vm = this;
    vm.map = {center: { latitude: 37.8361, longitude: -122.4789 }, zoom: 12 }
    vm.data
    vm.d_route

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
    });
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
