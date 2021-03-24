const mgs = require('mongoose')
const validator = require('validator')

const url = 'mongodb://127.0.0.1:27017/task'
mgs.connect(url,{useUnifiedTopology: true,useCreateIndex: true,useNewUrlParser: true,useFindAndModify:false})



