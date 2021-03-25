const mgs = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../db/task')
const secretkey = "myauthenticationkey"

const userSchema = new mgs.Schema({
    name: { 
        type:String, 
        required: true, 
        trim: true
    },
    email: { 
        type:String, 
        unique: true, 
        trim: true, 
        lowercase: true, 
        required: true,validate(value){
        if(!validator.isEmail(value))
           throw new Error('Email is not a valid!')
        }
    },
    password: {
        type:String, 
        trim:true,
        required:true,
        minLength:8,
        validate(value){
            if(value.toLowerCase().includes('password')) throw new Error('Not a strong password (cannot contains word password)!')
        }
    },
    age: {
        type: Number, 
        default: 0, 
        validate(value){
            if(value < 0) throw new Error('Age must be a positive number')
        }
    },
    //list of token object
    tokens: [{
        token: {
            type:String,
            required:true
        }
    }]
    
},{
    timestamps:true
})
//this is to set a vitual relationship between Task and User so if we know the user and trying to 
//get the value of task, we can refer to user.tasks, the localfield identifies the id used  for Task model's foreign key
//the foreignfield is the field in Task model where it use to link to the local field
userSchema.virtual('tasks',{
    ref:'Task',
    localField: '_id',
    foreignField: 'owner'
})
userSchema.methods.generateAuthenticateToken = async function() {
    const user = this
    const token = jwt.sign({_id:user._id.toString()},secretkey,{expiresIn:'30 days'})
    user.tokens = user.tokens.concat( {token:token})
    await user.save()
    return token
}

userSchema.methods.toJSON =  function() {
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens
    console.log(userObject)
    return userObject
}

userSchema.statics.findByCredentials = async (username,password) =>{
    const user = await User.findOne({email:username})
    
    if(user === null || !user){
        throw new Error("Unable to login")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

//
//without middleware: req=>run route
//
//with middleware: req=>functions=>run route
//

//hash password
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        
        const hashedPassword = await bcrypt.hash(user.password,8)
        console.log(hashedPassword)
        user.password = hashedPassword
    }

    next()
})
userSchema.pre('remove', async function(next) {
    const user = this
    Task.deleteMany({owner: user._id})
    next()
})
const User = mgs.model('User',userSchema)

module.exports = User