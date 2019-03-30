// Instantiate a map and platform object:
const platform = new H.service.Platform({
  'app_id': 'oHheQK8c0IwdjMZnpAIB',
  'app_code': 'rRxmrNmyb-EHZ4nP5NwBNQ'
});
// Retrieve the target element for the map:
const targetElement = document.getElementById('mapContainer');

navigator.geolocation.getCurrentPosition(function(position) {
  console.log('jo');
});

navigator.geolocation.getCurrentPosition(function(position){
  const myPos = {lat: position.coords.latitude, lng: position.coords.longitude}
  return myPos;
});

////////////////////////

// Get default map types from the platform object:
const defaultLayers = platform.createDefaultLayers();

// Instantiate the map:

const map = new H.Map(
  document.getElementById('mapContainer'),
  defaultLayers.normal.map,
  {
  zoom: 14,
  center: {lat: -33.4583295, lng: -70.62761619999999}
  });

const mapEvent = new H.mapevents.MapEvents(map);
const mapBehavior = new H.mapevents.Behavior(mapEvent);
const ui = new H.ui.UI.createDefault(map, defaultLayers);

// ui.getControl('zoom').setEnabled(false);

// Create the parameters for the geocoding request:
var geocodingParams = {
    searchText: '200 S Mathilda Ave, Sunnyvale, CA'
  };

// Define a callback function to process the geocoding response:
var onResult = function(result) {
  var locations = result.Response.View[0].Result,
    position,
    marker;
  // Add a marker for each location found
  for (i = 0;  i < locations.length; i++) {
  position = {
    lat: locations[i].Location.DisplayPosition.Latitude,
    lng: locations[i].Location.DisplayPosition.Longitude
  };
  marker = new H.map.Marker(position);
  map.addObject(marker);
  }
};

// Get an instance of the geocoding service:
var geocoder = platform.getGeocodingService();

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
geocoder.geocode(geocodingParams, onResult, function(e) {
  alert(e);
});
/*
*/