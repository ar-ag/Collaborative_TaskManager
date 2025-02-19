const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'please enter user name']
    },
    email:{
        type:String,
        required:[true, 'please enter email'],
        unique:true
    },
    
}, {
    timestamps:true
})

module.exports = mongoose.model('User',userSchema);