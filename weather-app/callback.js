// const add = (x,y,callback) => {
//     setTimeout(()=>{
//         total = x+y
//         callback(total)
//     },2000)
// }

// add(1,4,(sum) => {
//     console.log(sum)
// })

const name = 'Scott'
const age = 50

const user = {
    name,
    age,
    location:'West Chester',

}
console.log(user)

//get rid of properties in object
const product = {
    label: "Red color",
    price: 2.5,
    stock: 300,
    salePrice: undefined,
    rating: 4.3
}

const {label:productLabel,stock,rating=5} = product
console.log(rating)

const tranx = (type,{label,stock,rating}) => {
    console.log(type,label,rating)
}

tranx('order',product)