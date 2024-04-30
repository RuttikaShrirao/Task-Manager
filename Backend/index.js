const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const TaskModel = require('./Model/userSchema')
const connectdb =require('./database')
const task_route=require('./routers/router')
const reponseFormat =require('./utils')
const authrouter = require('./routers/authrouter')
const authModel = require('./Model/authSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// secrete key
const SECRET_KEY="taskmanagerapi"


// registration

app.post('/api/registration', async(req,res)=>{
  const {username, password}= req.body
  try {
    if(((username).length==0) || ((req.body.password).length==0)){
      reponseFormat(res, status_code = 400, msg = "Please fill Details..");
    }
    else{
      const isuserExist = await authModel.findOne({username:username})
  
      if(isuserExist != null){  
          reponseFormat(res, status_code = 400, msg = "you are already registered..");
        }else{
          const salt = await bcrypt.genSalt(5)
          let newpassword =  password.toString();
          const hashedPassword=  await bcrypt.hash(newpassword,salt)
          try{
            const user = await authModel.create({username:username, password:hashedPassword})
            console.log(username,hashedPassword)
            user.save()
            reponseFormat(res, status_code = 200, msg = "you are registered..");
          }
            catch (userCreationError) {
            reponseFormat(res, status_code = 500, msg = userCreationError);
          }
        }
      }
    
  } catch (error) {
     console.log(error, "gffffffffffff") 
     reponseFormat(null, status_code = 500, msg = error)
  }

})


// login
app.post('/api/login',async(req,res)=>{
  const {username, password}= req.body
  try {
    if(((username).length==0) || ((req.body.password).length==0)){
      reponseFormat(res, status_code = 400, msg = "Please fill Details..");
    }
    else{
      const isuserExist = await authModel.findOne({username:username})
      if(isuserExist != null){  

        let newpassword = password.toString();
        const matchPassword= await bcrypt.compare(newpassword,isuserExist.password)
        if(matchPassword){
           const token=jwt.sign({username:isuserExist.username,id:isuserExist._id}, SECRET_KEY)
          res.send({status_code:200,msg:'you are logged in', token:token})
        }
        }else{
          reponseFormat(res, status_code = 400, msg = "user doesn't exist..");
        }
      }
    
  } catch (error) {
     console.log(error, "gffffffffffff") 
     reponseFormat(null, status_code = 500, msg = error)
    }
    
  })
  
  function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
  // create  entry in table
  app.post("/create-task",async(req,res)=>{
    const {title, description, deuDate} = req.body

    try{
      // const {id} = parseJwt(req.headers.token)
      // console.log(id,"==========")
      const user= await TaskModel({title:title,
                                  description:description,
                                // taskOwner: id,
                                deuDate:deuDate})


      console.log(user, "user---")
      user.save()
      res.send({status_code:200,msg:'data inserted..'})
    } catch(err){
      console.log(err)
      reponseFormat(res, status_code = 500, msg = err.msg)
      
    }
})

// get data in table
app.use('/',task_route)

// delete entry in table
app.delete('/delete/:id', (req, res)=>{
  let delid = req.params.id
  console.log(delid)
    TaskModel.deleteOne({_id: delid})
   .then(function (models) {
     reponseFormat(res, status_code = 200, msg = "you are deleted..")
    console.log(models,"jashdbjashhj");
  })
  .catch(function (err) {
    console.log(err);
  });
  
})



connectdb().then(()=>{
    app.listen(5000, () => {
        console.log(`server is running`);
      });                                                                                                                                                                                                                                                                                                                                              
})
