const mongoose  = require("mongoose");

const mongoURL = "mongodb://localhost:27017/Task_Manager";
const connectdb= async()=>{
    try{
        await mongoose.connect(mongoURL)
        console.log("db connected")
    }catch(err){
        console.log(err,"error")
    }
}


module.exports = connectdb