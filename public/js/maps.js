let platform = new H.service.Platform({
    'apikey': 'DzcDXIyqjVLCjsyG6mzlAwkL6qcEsu1ikbNIvM6Hx7Y'
  });

function landmarkGeocode() {
    let title = document.querySelector('h1').textContent;
    var geocoder = platform.getGeocodingService(),
      landmarkGeocodingParameters = {
        searchtext: title,
        jsonattributes : 1
      };
  
    geocoder.search(
      landmarkGeocodingParameters,
      showMap,
      (e) => console.log(e)
    );
};

function showMap(result) {
    var location = result.response.view[0].result[0].place.locations[0].displayPosition;
    // Obtain the default map types from the platform object:
    let defaultLayers = platform.createDefaultLayers();
    // Instantiate (and display) a map object:
    let map = new H.Map(
        document.querySelector('.map'),
        defaultLayers.vector.normal.map,
        {
        zoom: 15,
        center: { lat: location.latitude, lng: location.longitude }
    });
    let marker = new H.map.Marker({lat: location.latitude, lng: location.longitude});
    map.addObject(marker);
    let ui = H.ui.UI.createDefault(map, defaultLayers);
}

landmarkGeocode();