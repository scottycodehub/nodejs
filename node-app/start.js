import {msg,name} from "./utils.js"
import validator from 'validator'
import chalk from 'chalk'

console.log(msg(name))
console.log(validator.isEmail("just@example.com"))
console.log(validator.isURL("http//angelearn.com"))
console.log(chalk.red.bold.inverse('Big Deal!'))