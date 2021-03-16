const request = require('request')

//GeoAPI: addresss-Lat/Long 
const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/West%20Chester.json?limit=1&access_token=pk.eyJ1Ijoic2NvdHR5bWFwIiwiYSI6ImNrbWI5OXJ2MTAwb24ybm16ajQ3Y3B3dXEifQ.A7my0mshrU1Dzd4ijm21zw'

request({
    url:geoURL,
    json:true,
},
(error,response) => {
    if(!error) {
        if(response.body.features.length === 0){
            console.log("No location found")
        }else {
            const data = response.body
            latitude = data.features[0].center[1]
            longitude = data.features[0].center[0]
            console.log("latitude is " + latitude, " longitude is " + longitude)
        }

    }else{
        console.log(error)
    }

})


const apiURL = 'http://api.weatherstack.com/current?access_key=73c3f5fd049eecfe6134a1e050ce87a5&units=f&query=37.8267,-122.4233'

request({
    url:apiURL,
    json:true
},
(error,response) => {
    if(!error){
        if(response.body.error){
            console.log("We got an error!")
        }else{
            const data = response.body
            console.log(data.current.weather_descriptions[0] + ". It is currently " + data.current.temperature + "F degree. It feels like " + data.current.feelslike + " degree.")  
        }
        
    }else{            
        console.log(error)
    }

})
