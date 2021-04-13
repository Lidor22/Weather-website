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
            //console.log(body.daily)
            const weeklyForcast = [];
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            body.daily.data.forEach(element => {
                //convert the date
                var unixTime = element.time;
                var date = new Date(unixTime*1000);
                var dayInWeek = days[date.getDay()];
                //push the data into array
                weeklyForcast.push({
                    forecast : dayInWeek + ' - ' + element.summary
                })
            });

            callback(undefined,body.daily.data[0].summary + ' it is currently ' + body.currently.temperature + ' degrees out. There is ' +  body.currently.precipProbability + '% chance for rain. The estimated highest temprature for today is ' + body.daily.data[0].apparentTemperatureHigh +  ' and lowest is ' + body.daily.data[0].apparentTemperatureLow  + '.' , weeklyForcast);
        }
    })
    
}

module.exports = forecast