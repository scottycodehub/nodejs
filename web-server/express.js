const path = require('path')
const express = require('express')
const hbs = require('hbs')
const tools = require('./utils.js')
const app = express()

const port = process.env.PORT || 3000
//set up hds view engine and views
app.set('view engine', 'hbs')
app.set("views", path.join(__dirname,'templates/views'))
hbs.registerPartials(path.join(__dirname,'templates/partials'))

//set up public static directory
app.use(express.static(path.join(__dirname,'public')))

const company = "Weather Guru Inc."
//app default routes
app.get('', function (req, res) {
  res.render('index', {
    title:'Weather App',
    name:"Scott"
  })
})

app.get('/help', function (req, res) {
  res.render('help', {
    title:'Help Page',
    content: 'This help me to do nodejs',
    name:company
  })
})

app.get('/about', function (req, res) {
  res.render('about', {
    title:'About Me',
    name: company
  })
})

app.get('/report', function (req, res) {
  console.log(req.query)
  if(req.query.city !== undefined){
    tools.geocode(req.query.city,(error,{location,latitude,longitude} = {}) => {
      if(error){
       return res.send({
          error
        })
      }
      tools.reportweather(latitude,longitude, (error,response) => {
          if(error){
               console.log("Error",error)
               return res.send(error)
          }
          else{
            res.send({
              title:'Weather Report',
              query:req.query.city,
              name:company,
              city: location,
              description: response.current.weather_descriptions[0],
              temperature: response.current.temperature,
              feelslike: response.current.feelslike,
              longitude,
              latitude,
              windspeed: response.current.wind_speed,
              humidity:response.current.humidity
          })
            // res.render('weather', {
            //   title:'Weather Report',
            //   query:req.query.city,
            //   name:company,
            //   city: location,
            //   description: response.current.weather_descriptions[0],
            //   temperature: response.current.temperature,
            //   feelslike: response.current.feelslike,
            //   longitude,
            //   latitude
            // })
          }
             
      })
  })

  }else{
    res.send({
      error: "Not search target provided!"
    })
  }

})

app.get('/help/*', function (req, res) {
  res.render('nohelp', {
    title:'About Me',
    name:company
  })
})

app.get('*', function (req, res) {
  res.render('404', {
    title:'About Me',
    name:"Scott"
  })
})
app.listen(port,() =>{
  console.log("Web server started on port " + port)
})