const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required: [true, 'please add title']
    },
    description: {
        type: String
    },
    assigned_to: {
        type: String,
        required: [true, 'please enter the user']
    }, 
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Tasks',taskSchema);