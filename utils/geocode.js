const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoiZ2FicmllbGRvcm5pYW51IiwiYSI6ImNqdnk2azJjZjAzcjc0M21udGF4NHJyaDAifQ.7ZKucfm9Ppu3qYM6bokmng`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location url')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search')
        } else {
            callback('', {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
