const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1Ijoicm1vbW9rbyIsImEiOiJjbDE3aWJoMGcwOWV0M2NyaWNoc21rODRwIn0.F6O1Fe4TKzwRWbZx6vPgyw&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('cannot connect to api')
        } else if (body.features.length === 0) {
            callback('unable to find location')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                lontidude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode