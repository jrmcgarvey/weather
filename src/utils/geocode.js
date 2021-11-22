const fetch = require('node-fetch')
mapboxkey = process.env.MAPBOX_APIKEY;

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + mapboxkey + '&limit=1';
    fetch(url)
    .then(response => response.json())
    .then(body =>{
        //console.dir(body,{depth: null});
        if ((!body.features) || (body.features.length === 0)) {
            callback('Unable to find the location. Try another search.', undefined);
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
    .catch(error => callback('Unable to connect to the geocoding service.', undefined));
}

module.exports = geocode