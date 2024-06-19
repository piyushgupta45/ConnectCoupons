const express=require('express')
const mongoose=require('mongoose')
const cors = require('cors');
const router = express.Router()
const User=require('../models/user.model')
const jwt=require('jsonwebtoken')

router.post('/register',async(req,res)=>{
    
    try{
        const userfind=await User.findOne(
            {
                email:req.body.email,
                password:req.body.password
            })
            if(userfind)
            {
                throw("duplicate")
            }
            else
            {
    const user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
            }
    res.json({status:'ok'})
    }
    catch(err)
    {
        res.json({status:'error',error:'duplicate email'})
    }
})
router.post('/login',async(req,res)=>{
    try{
    const user=await User.findOne(
        {
            email:req.body.email,
            password:req.body.password
        }
    )
    
    if(user)
    {
        const token=jwt.sign({
        email:user.email
        },'secret123')
        res.json({status:'ok',user:token})
    }
    else
    {
        res.json({status:'error',user:false})
    }
    }
    catch(err)
    {
        res.json({status:'error',error:'duplicate email'})
    }
})

module.exports = router;