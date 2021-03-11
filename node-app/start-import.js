import {msg,name} from "./utils.js"
import validator from 'validator'


console.log(msg(name))
console.log(validator.isEmail("just@example.com"))
console.log(validator.isURL("http://angelearn.com"))
