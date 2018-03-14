'use strict';
const geocode = require('./geocode');
const forecast = require('./forecast');
var os = require('os');

var express = require('express');
var bodyParser = require('body-parser');
var address;
const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/weatherDetails', (req,res) => {
  address = req.body.result.resolvedQuery;
  switch(req.body.result.action){
    case 'get.address':
    geocode.geoCode(address, (errorMessage, results) => {
          if (errorMessage){
            console.log(errorMessage);
          }else{
            console.log(`Weather forecast for Address: ${results.address}`);
            forecast.getForecast(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage){
              console.log(errorMessage);
            } else{
              //console.log(JSON.stringify(weatherResults, undefined, 2));
              return res.json({
                speech: "",
                messages: [
                        {
                          type: 0,
                          speech: `Current temperature is ${weatherResults.temperature}F, but it feels like ${weatherResults.apparentTemperature}F.` + os.EOL + 
                                  `Summary: ${weatherResults.summary}`,
                          platform: "skype"
                        }
                      ]
              });
              console.log(`Current temperature is ${weatherResults.temperature}F, but it feels like ${weatherResults.apparentTemperature}F.
    Summary: ${weatherResults.summary}`);
            }
            });
          }

    });
    break;
  }

});
app.listen(port, (req, res) => {
  console.log(`listening on ${port}...`);
});


// geocode.geoCode(argv.address, (errorMessage, results) => {
//       if (errorMessage){
//         console.log(errorMessage);
//       }else{
//         console.log(`Weather forecast for Address: ${results.address}`);
//         forecast.getForecast(results.latitude, results.longitude, (errorMessage, weatherResults) => {
//         if (errorMessage){
//           console.log(errorMessage);
//         } else{
//           //console.log(JSON.stringify(weatherResults, undefined, 2));
//           console.log(`Current temperature is ${weatherResults.temperature}F, but it feels like ${weatherResults.apparentTemperature}F.
// Summary: ${weatherResults.summary}`);
//         }
//         });
//       }
//
// });
