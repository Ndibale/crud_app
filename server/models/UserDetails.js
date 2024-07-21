const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    roles:[{
        type:String,
        default: "Employee"
    }],
        createdAt:{
            type:String,
        },
        updatedAt:{
            type:String,
        },
    active:{
        type:Boolean,
        default: true
    },
},{
    timestamps:true
})

module.exports = mongoose.model('User', userSchema);