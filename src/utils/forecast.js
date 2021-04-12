const request = require('request')


const forecast = (latitude,longtitude,callback) => {
    
    const mapboxUrl =  'https://api.darksky.net/forecast/4ac8179d590a05a8a89acb5b53318cca/' + latitude + ',' + longtitude ;

    request({url:mapboxUrl , json:true}, (error, {body}) => {
        if(error)
        {
            callback('Unable to connect to weather service',undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location',undefined)
        }
        else
        {
            callback(undefined,body.daily.data[0].summary + ' it is currently ' + body.currently.temperature + ' degrees out. There is ' +  body.currently.precipProbability + '% chance for rain.')

        }
    })
    
}

module.exports = forecast