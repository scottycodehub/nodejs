const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

//set up hds view engine and views
app.set('view engine', 'hbs')
app.set("views", path.join(__dirname,'templates/views'))
hbs.registerPartials(path.join(__dirname,'templates/partials'))

//set up public static directory
app.use(express.static(path.join(__dirname,'public')))

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
    name:"Scott"
  })
})

app.get('/about', function (req, res) {
  res.render('about', {
    title:'About Me',
    name:"Scott"
  })
})

app.get('/report', function (req, res) {
  res.send('Weather Report')
})

app.get('/help/*', function (req, res) {
  res.render('nohelp', {
    title:'About Me',
    name:"Scott"
  })
})

app.get('*', function (req, res) {
  res.render('404', {
    title:'About Me',
    name:"Scott"
  })
})
app.listen(3000,() =>{
  console.log("Web server started on port " + 3000)
})