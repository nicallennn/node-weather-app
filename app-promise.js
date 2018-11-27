const yargs = require('yargs')
const axios = require('axios')

//create argv object using yargs
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true                               
    }
  })
  .help()
  .alias('help', 'h')
  .argv

//encode the address and get geocode url
const encodeAddress = encodeURIComponent(argv.address)
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=*** MAPS API KEY ***`

//use axios get method -> returns a call to weather api -> print data / catch error
axios.get(geocodeUrl).then((response) => {
  //if there are no results, throw a new Error
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find address!')      //if no address, throw error -> stored in 'message' prop of error
  }

  //get the lat and lng from response object from maps api -> form url for weather api call
  const lat = response.data.results[0].geometry.location.lat
  const lng = response.data.results[0].geometry.location.lng
  const weatherUrl = `https://api.darksky.net/forecast/*** DARKSKY API KEY ***/${lat},${lng}`

  //print the formatted address to console
  console.log(response.data.results[0].formatted_address)

  //return a call to the weather api
  return axios.get(weatherUrl)
}).then((response) => {
  //resolve promise -> if no results throw error
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to fetch weather')
  }

  //get the temperature from the response object
  const temperature = Math.round((response.data.currently.temperature - 32) * 5 / 9)
  const apparentTemperature = Math.round((response.data.currently.apparentTemperature - 32) * 5 / 9)

  //print the current weather information
  console.log(`It is currently ${temperature} degrees, it feels like ${apparentTemperature}.`)
}).catch((error) => {
  //print the error, based on the point it was thrown
  if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers!')
  } else {
    console.log(error.message)                          //display error message set above
  }
})



