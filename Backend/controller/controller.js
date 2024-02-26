const TaskModel = require('../Model/userSchema')

const gettingData=async(req,res)=>{
            try{
                const getData=await TaskModel.find({})
                res.json({getData})
            }
            catch(err){
                console.log(err)
                res.send('something went wrong')
            }
}

const sendingData= async(req,res)=>{
    const user=TaskModel(req.body)
    console.log(user,'eeeeeeeeeee')
    user.save()
    res.send(user)
}

module.exports={gettingData,  sendingData}