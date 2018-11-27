const yargs = require('yargs')
const geocode = require('./geocode/geocode.js')
const weather = require('./weather/weather.js')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true                                  //yargs -> always parse as a string
    }
  })
  .help()
  .alias('help', 'h')
  .argv

//call geocodeAddress function
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage)
  } else {
    console.log(JSON.stringify(results.address, undefined, 2))

    //call getWeather function
    weather.getWeather(results.latitude, results.longitude, (errorMessage, results) => {
      if (errorMessage) {
        console.log(errorMessage)
      } else {
        console.log(JSON.stringify(results, undefined, 2))
      }
    })
  }
})



