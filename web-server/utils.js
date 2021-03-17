const request = require('request')

const reportweather = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=73c3f5fd049eecfe6134a1e050ce87a5&units=f&query=' + latitude + ',' + longitude
    request({
        url,
        json:true
    },
    (error,response) => {
        if(!error){
            if(response.body.error){
                callback(response.body.error)
            }else{
                const data = response.body
                callback(undefined, data)
            }
            
        }else{            
            callback(error)
        }
    
    })
}


//GeoAPI: addresss-Lat/Long 



const geocode = (location,callback) => {
    if(location.length === 0)
        return callback("Location must be provided!")
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) +'.json?limit=1&access_token=pk.eyJ1Ijoic2NvdHR5bWFwIiwiYSI6ImNrbWI5OXJ2MTAwb24ybm16ajQ3Y3B3dXEifQ.A7my0mshrU1Dzd4ijm21zw'
    request({
        url,
        json:true,
    },
    (error,{body}) => {
        if(!error) {
            if(!body.features || body.features.length === 0){
                callback("No location found! Try to search again!")
            }else {
                if(body.features[0].center == undefined){
                    callback("No geo location found for " + location)
                }else{
                    latitude = body.features[0].center[1]
                    longitude = body.features[0].center[0]
                    location = body.features[0].place_name
                    const geodata = {latitude,longitude,location}
                    callback(undefined,geodata)
                }
            }
    
        }else{
            callback(error)
        }
    
    })
}

module.exports =  {
    geocode:geocode,
    reportweather:reportweather,
}