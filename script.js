// TODO: Organize globals
var map;
var service;
var infowindow;
var numResults = 5;
var latitude;
var longtitude;

// TODO: get info from form and then replace example
function getClosestLocations() {
  createMap();
  // var lat = ...
  // var lng = ...
  // var pType = ...
  // var numResults = ...
  const berkeley = new google.maps.LatLng(37.8719, -122.2585);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: berkeley,
    zoom: 10,
  });
  service = new google.maps.places.PlacesService(map);
  var req = {
    location: berkeley,
    radius: "500",
    type: ["restaurant"],
  };
  service.nearbySearch(req, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    results.sort();
    for (var i = 0; i < numResults; i++) {
      createMarker(results[i]); // marks each location on the map
    }
  }
}

function createMap() {
  infowindow = new google.maps.InfoWindow();
  const berkeley = new google.maps.LatLng(37.8719, -122.2585);
  map = new google.maps.Map(document.getElementById("map"), {
    center: berkeley,
    zoom: 10,
  });
  const request = {
    query: "UC Berkeley College of Engineering",
    fields: ["name", "geometry"],
  };
  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name);
    infowindow.open(map);
  });
}

async function getValues() {
  await $.getJSON(
    "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=hospitals+in+San%20Francisco&key=AIzaSyCDnuASiiznCjGvpzXijsnA9iaSLZyO2Ow"
  ),
    function (data) {
      var possibleLocations = data["results"];
      for (
        var locationIndex = 0;
        locationIndex < possibleLocations.length;
        locationIndex++
      ) {
        // processing and giving data to getClosestLocations()
        console.log(possibleLocations[locationIndex]["geometry"]);
      }
    };
}

getValues();

function initialize() {
  var address = document.getElementById('locat');
  var autocomplete = new google.maps.places.Autocomplete(address);
  autocomplete.setTypes(["geocode"]);
  google.maps.event.addListener(autocomplete, "place_changed", function () {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    var address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          "",
      ].join(" ");
    }
    document.getElementById("lat").innerHTML = place.geometry.location.lat();
    latitude = place.geometry.location.lat();
    document.getElementById("long").innerHTML = place.geometry.location.lng();
    longtitude = place.geometry.location.lng();
  });
}

google.maps.event.addDomListener(window, "load", initialize);

/*
    </script>
    </head>
    <body>
<input id="location"
        placeholder="Enter a location">
<div id="lat"></div>
<div id="long"></div>
*/
