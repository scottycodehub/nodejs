const { Timestamp } = require('bson')
const mgs = require('mongoose')
const validator = require('validator')

const taskSchema = new mgs.Schema({
    desc: { 
        type:String, 
        required:true, 
        trim:true
    },
    date: { 
        type: Date, 
        required:true,
        validate(value){
            if(!validator.isDate(value)) throw new Error('Not a valid date')
        }
    },
    complete: 
    {
        type: Boolean, 
        default: false
    },
    owner: {
        type:mgs.Schema.Types.ObjectId,
        trim:true,
        required: true,
        ref: 'User' //creae relation 

    }
}, {
    timestamps:true
}
)

const Task = mgs.model('Task',taskSchema)


module.exports = Task