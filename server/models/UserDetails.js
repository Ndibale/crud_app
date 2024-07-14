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
    roles:[{
        type:String,
        default: "Employee"
    }],
        createdAt:{
            type:String,
            required:true
        },
        updatedAt:{
            type:String,
            required:true
        },
    active:{
        type:Boolean,
        default: true
    },
},{
    timestamps:true
})

module.exports = mongoose.model('User', userSchema);