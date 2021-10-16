const fetch = require('node-fetch');
// Retrieve routing from curLat,Lon and desLat,Lon

exports.routing = async (req, res) => {
    var returnData;
    var routingLine;
  
   
    await fetch(
        "https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624848475da112574d1eb33f2348aff842e8&start=" +
            req.params.curLong +
            "," +
            req.params.curLat +
            "&end=" +
            req.params.desLong +
            "," +
            req.params.desLat
      )
        .then((response) => response.json())
        .then((data) => {
            returnData = data;
        
        });

        routingLine = [
            {
              type: "LineString",
              coordinates: returnData.features[0].geometry.coordinates,
              distance:    returnData.features[0].properties.segments[0]
            }, 
          ];

        res.send(routingLine);
};

exports.search = async (req, res) => {

    var returnData;
    var uri = 'https://nominatim.openstreetmap.org/search?q=' +
    req.params.keyword +
    '&format=json&polygon_geojson=1&addressdetails=1';
    var resn = encodeURI(uri); 
   
    await fetch(
       resn
      )
        .then((response) => response.json())
        .then((data) => {
            returnData = data;
        
        });

    

        res.send(returnData);
};