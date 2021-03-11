console.log("utils.js")

const name = 'Mark Loff'

const add = function(x,y){
    return x+y
}

const msg = function(){
    return "Your message: xxx"
}
module.exports = {
    sum: function(a,b) {
        return a+b
    },
    multiply: function(a,b) {
        return a*b
    }
    ,
    msg
};
