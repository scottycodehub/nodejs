const fs = require('fs')

const square = (x) => {
    return x*x
}
const square2 = (x) => x*x
// const book = {
//     title: 'Test Json',
//     author: 'Scott Li'
// }

// jsonstr = JSON.stringify(book)
// parsedjson = JSON.parse(jsonstr)
// console.log(parsedjson)

// const databuf = fs.readFileSync('json-test.json')
// const json = JSON.parse(databuf.toString())
// console.log(json.title)

const eventobj = {
    name: "Scott's Wedding",
    guestList: ['Scott', 'Mike', "Jane", "Tiffany"],
    printGuestList(){
        console.log('Guest List for Wedding ' + this.name)
        this.guestList.forEach((guest) => {
            console.log(guest + ' will attend ' + this.name)
        })
    }
}
eventobj.printGuestList()
