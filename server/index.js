const express = require('express');
const cors=require('cors');
const mongoose = require('mongoose');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');

//models
const User=require('./models/User.model');
const { authorization } = require('./Auth');

//mongodb connection
mongoose.connect(`mongodb+srv://<user>:<password>@cluster0.dkzn4.mongodb.net/UserDatabase?retryWrites=true&w=majority`,()=>console.log(`mongodb connected`))


const app = express();

app.use(cors())

app.use(express.json())

app.get('/',(req, res) => {
    res.send(`hellow`)
})

app.post('/signup',async(req, res) => {
    console.log(req.body);
    const{name,email,password} = req.body
    try {
        const hashPwd=await bcrypt.hash(password,5)
        console.log(hashPwd);
        const creataedUser = await User.create({name,email,password:hashPwd})
    res.json(creataedUser)
    } catch (error) {
        res.json({status:`error`,message:`user already exists`})
        console.log(error);
    }
    
})

app.post(`/login`,async(req, res) => {
  const{email,password} = req.body
  const user= await User.findOne({email})
  if (!user) {
      res.json({status:`error`,message:`user not found`})
  }else{
      if (await bcrypt.compare(password,user.password)) {
          //create a jwt and send to the client
         const token= jwt.sign({name:user.name,email:user.email},`secretKey`)

          res.json({status:`ok`,message:`logged in`,token})

      }else{
          res.json({status:`error`,message:`pls check the password`})
      }
  }
})

app.get(`/quote`,authorization,async(req, res) =>{
    const user=await User.findOne({email:req.user.email})
    console.log(user,`inside the quote`);
    res.json(user.quote)
})

app.post(`/quote`,authorization,async(req, res)=>{
    console.log(req.body);
    const updated=await User.updateOne({email:req.user.email},{$set:{quote:req.body.quote}})
    res.json(updated)
})

app.listen(4000)