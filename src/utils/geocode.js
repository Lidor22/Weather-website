const request = require('request')


const geocode = (address,callback) => {

    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGlkb3JoYWRhciIsImEiOiJjazd0ZmVsczQwcDV6M25zZjlmcWNtMXByIn0.VUFxKMZBs1sgqSxajZiQYw&limit=1&language=en'
    request({url:geoUrl , json:true}, (error, {body}) => {
        if(error)
        {
            callback(error,undefined)
        }
        else if(body.features.length === 0 )
        {
            callback('Unable to find location. Try another search.',undefined)
        }
        else
        {
            callback(undefined,{
                latitude : body.features[0].center[1],
                longtitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode