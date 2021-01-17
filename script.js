// TODO: Organize globals
var map;
var service;
var infowindow;

// add in parameters at the end - use preset examples as of now
function getClosestLocations() {
    createMap();
    const berkeley = new google.maps.LatLng(37.8719, -122.2585);
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
      center: berkeley,
      zoom: 10,
    });
    service = new google.maps.places.PlacesService(map);
    var req = {
      location: berkeley,
      radius: '500',
      type: ['hospital']
    }
    service.nearbySearch(req, callback);
}

/*function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
} */

function createMap() {
    infowindow = new google.maps.InfoWindow();
    const berkeley = new google.maps.LatLng(37.8719, -122.2585);
    map = new google.maps.Map(document.getElementById("map"), {
      center: berkeley,
      zoom: 10,
    });
    const request = {
      query: "UC Berkeley College of Engineering",
      fields: ["name"],
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

