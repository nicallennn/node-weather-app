const request = require('request')

const geocodeAddress = (address, callback) => {

  const encodeAddress = encodeURIComponent(address + 'uk  ')
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=AIzaSyAPLQS0hKzPuNJmcvt79lOpRjJFv8TdhZk`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers!')
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find address')
    } else if (body.status === 'OK') {
      const latLng = body.results[0].geometry.location
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: latLng.lat,
        longitude: latLng.lng

      })
    }
  })
}

//export functions
module.exports.geocodeAddress = geocodeAddress
