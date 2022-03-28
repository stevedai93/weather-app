const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3afc11e34e972a538a6414e905cfd10b&query=' + lat + ',' + lon  + '&units=f'

    request({ url, json: true}, (error,{body}) => {
        if (error){
            callback('cannot connect to api')
        } else if (body.error){
            callback('unable to find location')
        } else {
            // const data = JSON.parse(response.body)
            console.log('It\'s currently ' + body.current.temperature + ' degrees.')
            console.log('But it feels like ' + body.current.feelslike + ' degrees.')
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                weather_descriptions: body.current.weather_descriptions,
            })
        }
    
    })

}

module.exports = forecast