
const request = require('request')

const getWeather = (lat, lng, callback) => {
  const temperature = request({
    url: `https://api.darksky.net/forecast/*** DARKSKY API KEY ***/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 400) {
      callback('Unable to connect to Darksky servers!')
    } else if (response.statusCode === 200) {
      callback(undefined, {
        summary: body.currently.summary,
        temperature: Math.round((body.currently.temperature - 32) * 5 / 9, 2),
        apparentTemperature: Math.round((body.currently.apparentTemperature - 32) * 5 / 9)
      })
    }
  })
}

module.exports.getWeather = getWeather
