const request = require('Request')
const geocodeAddress = (address) => {
  const encodeAddress = encodeURIComponent(address + 'uk  ')
  return new Promise((resolve, reject) => {
    //call request function, request does not support promises so must wrap in promise function.
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=AIzaSyAPLQS0hKzPuNJmcvt79lOpRjJFv8TdhZk`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google servers!')
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find address')
      } else if (body.status === 'OK') {
        const latLng = body.results[0].geometry.location
        resolve({
          address: body.results[0].formatted_address,
          latitude: latLng.lat,
          longitude: latLng.lng
        })
      }
    })
  })
}

//call function using the returned promise, if resolved -> print the location object, if rejected -> print the error msg
geocodeAddress('hr40rs').then((location) => {
  console.log(JSON.stringify(location, undefined, 2))
}, (errorMessage) => {
  console.log(`Error: ${errorMessage}`)
})


