// TODO: Organize globals
var map;
var service;
var infowindow;
var numResults = 5;
var lat = 0;
var lng = 0;
var addr;

// TODO: get info from form and then replace example
function getClosestLocations() {
  //var this_js_script = $('script[src*=index.html]'); // or better regexp to get the file name..
  // var my_var_1 = this_js_script.attr('data-my_var_1');
  //import { lat } from "./index.html";
  // import { window.lat, window.lng, window.addr } from "./index.html";
  createMap();
  var pType = check(); // have if/else assigning pType or separate function
  // var numResults = ...
  const loc = new google.maps.LatLng(lat, lng);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: loc,
    zoom: 10,
  });
  service = new google.maps.places.PlacesService(map);
  var req = {
    location: loc,
    radius: "1000000",
    type: [pType],
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
  var loc = new google.maps.LatLng(0, 0);
  map = new google.maps.Map(document.getElementById("map"), {
    center: loc,
    zoom: 10,
  });
  const request = {
    query: "San Francisco",
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

function setCoord(coord, num) {
  if (coord == "lat") {
    lat = num;
  } else {
    lng = num;
  }
}

function setAddress(address) {
  addr = address;
}

/* async function getValues() {
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
} */
/*
function initialize() {
  var address = document.getElementById('location');
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
    document.getElementById("lat").innerHTML = place.geometry.location.lat(); //printing
    lat = place.geometry.location.lat();
    document.getElementById("long").innerHTML = place.geometry.location.lng();//printing
    lng = place.geometry.location.lng();
  });
}*/

//google.maps.event.addDomListener(window, "load", initialize);

// Returns the closest supported keyword related to the type
//Next closest Alternatives: "doctor", "drugstore", "pharmacy"
function check() {
  if (document.getElementById("clinic").checked) {
    return "hospital";
  } else if (document.getElementById("help").checked) {
    return "police";
  } else {
    return "lodging";
  }
}

/*
    <div id="lat"></div>
    <div id="long"></div>
    */
