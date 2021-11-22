const fetch = require('node-fetch')
weatherstackkey = process.env.WEATHERSTACK_APIKEY;

const forecast = (latitude, longitude, callback) => {   
    const url = 'http://api.weatherstack.com/current?access_key=' + weatherstackkey + '&units=f&query=' + latitude + ',' + longitude;
    fetch(url)
    .then(response => response.json())
    .then(body =>{
        //console.dir(body, {depth: null});
        if (!body.current) {
            callback('Unable to find the location', undefined);
        } else {
            callback(undefined, "It is currently " + body.current.weather_descriptions[0] + ". The temperature is " + body.current.temperature + "F");            
        }
    })
    .catch(error =>{
        //console.log("we had this error: ", error);
        callback('Unable to connect to the weather service.', undefined);
       
    })
}

module.exports = forecast