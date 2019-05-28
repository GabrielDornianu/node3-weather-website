const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/27e40613120b3fbfdc519b60ea3d2b42/${latitude},${longitude}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather url')
        } else if (body.error) {
            callback('Unable to find weather. Try another search')
        } else {
            callback('', `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out and ${body.currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = forecast
