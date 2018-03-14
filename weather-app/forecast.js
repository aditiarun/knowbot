var request = require('request');
var getForecast = (lat, lng, callback) => {
request({
  url: `https://api.darksky.net/forecast/0c3fce4b7b335cfd8fb8fe252fe3c996/${lat},${lng}`,
  json: true
},(error, response, body) => {
  if(error){
    callback('Unable to connect to the server');
  } else if (response.statusCode === 400){
    callback('Cannot fetch weather details. Please try again');
  } else if (response.statusCode === 200){
    callback(undefined, {
      temperature: (body.currently.temperature),
      apparentTemperature: (body.currently.apparentTemperature),
      summary: (body.hourly.summary)
    })
}
});
};

module.exports.getForecast = getForecast;
