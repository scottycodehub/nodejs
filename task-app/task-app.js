const express = require('express')
const userRoute = require('./router/users')
const taskRoute = require('./router/tasks')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.use(userRoute)
app.use(taskRoute)

app.listen(port,() =>{
    console.log("Web server started on port " + port)
})

