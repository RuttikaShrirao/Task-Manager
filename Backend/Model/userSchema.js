
const mongoose  = require("mongoose");
const taskSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        required:true,
        default:false
    },
    // taskOwner:{
    //     type:String,
    //     required:true,
    // },
    deuDate:{
        type:String,
        required:true,
        // default:Date.now()
    }
});

const TaskModel = mongoose.model('Task',taskSchema)

module.exports = TaskModel