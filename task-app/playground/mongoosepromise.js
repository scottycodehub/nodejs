require('./db/mongoose')
const User = require('./db/user')
const Task = require('./db/task')
// User.findByIdAndUpdate('6057d22ee1e61361601fbbba',{
//     age: 32
// }).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 10})
// }).then((userscount) => {
//     console.log(userscount)
// }).catch((error) => {

// })

// Task.findByIdAndDelete('605542d24f95db41b0ceb6e4').then((task) => {
//     console.log(task)
//     return Task.countDocuments({complete:false})
// }).then((count) => {
//     console.log(count)
// }).catch((error) => {
//     console.log(error)
// })

const updateAgeAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('6057d22ee1e61361601fbbba',20).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})

const deleteTaskAndCount = async (id,status) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({complete:status})
    return count
}

deleteTaskAndCount('60590ef72a91cb54f0fe57c1',true).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})