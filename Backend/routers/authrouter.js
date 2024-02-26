const express = require("express");
const router = express.Router();
const authModel = require('../Model/authSchema')


router.post('/api/registration',async(req,res,next)=>{
    try {
        const user=authModel(req.body)
    console.log(user,"kkkkkkkkkk")

    user.save()
    res.send(user)
    } catch (error) {
       console.log(error, "gffffffffffff") 
    }
    
})
router.post('/api/login')

module.exports=router