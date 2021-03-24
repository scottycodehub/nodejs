//CRUD using MongoDB
const {MongoClient, ObjectID} = require('mongodb')


const url = 'mongodb://127.0.0.1:27017'
const db = 'task'

const id = new ObjectID()
console.log(id.id)
MongoClient.connect(url,{ useUnifiedTopology: true },(error, client) => {
    if(error)
        return console.log("MongoDB connection has failed \n" + error)
    console.log("MongoDB connection is OK...")

    const taskdb = client.db(db)
        const result = taskdb.collection('user').deleteMany({
            name: 'Scott'
    })

    result.then((result) => {
        console.log(result.result)
    }).catch((error) => {
        console.log(error)
    })
    // taskdb.collection('task').insertMany([{
    //     desc: "Tiffany's Task",
    //     complete: false
    // },{
    //     desc: "Scott's Task",
    //     complete: true
    // }
    // ],(error,result) => {
    //     if(error)
    //             return console.log('unable to insert user')
    //      console.log(result.ops)
    // })

})