var request = require('request');


var geoCode = (address, callback) => {
var vilasam = encodeURIComponent(address);
request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${vilasam}`,
  //url: 'http://cricapi.com/api/matches?apikey=RsbR58EX4XaGNtzQ2cDpS5Tsf8i1',
  json: true
},(error, response, body) => {
  //console.log(JSON.stringify(response, undefined, 2));
  if(error){
    callback('Could not connect to the server. Please try again!');
  } else if (body.status === 'ZERO_RESULTS') {
    callback('Address not found. Please type a valid address');
  } else if (body.status ==='OK'){
    callback(undefined, {
    address: body.results[0].formatted_address,
    latitude: body.results[0].geometry.location.lat,
    longitude: body.results[0].geometry.location.lng
  })
}
})
};
module.exports = {
  geoCode
};
