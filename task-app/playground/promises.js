const promiseWork = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve([1,2,3])
    },100)
})

const add = (a,b) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(a+b)
        },1000)
    })
}
add(2,4).then((result) => {
    console.log(result)
    return add(result,6)
}).then((sum2) => {
    console.log(sum2)
}).catch((error) => {
    console.log(error)
})