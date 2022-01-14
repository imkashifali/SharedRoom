const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const User = require('../models/user')

//Register User Route
router.post('/register',async(req,res)=>{
    
    //same result of two line but its totally up to u..
    // const newRegistration = new User(req.body)
    const newRegistration = new User({name: req.body.name,email: req.body.email,password: req.body.password})

    
    try {
        const Register = await newRegistration.save()
        res.send('NewUser Register Successfully')
    } catch (error) {
        return res.status(400).json({error})
    }
})

//Login User Route
router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    try {
        const loginUser = await User.findOne({email:email, password:password})
        if(loginUser){
            
            const temp = {
                name:loginUser.name,
                email:loginUser.email,
                isAdmin:loginUser.isAdmin,
                _id:loginUser._id
            }
            res.send(temp)
        }else{
            return res.status(400).json({message:'Login Failed'})

        }
    } catch (error) {
        return res.status(400).json({error})

    }
})

//Get All Users
router.get("/getAllUsers", async (req, res) => {
    try {
      const user = await User.find({});
      res.send(user)
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });

module.exports=router