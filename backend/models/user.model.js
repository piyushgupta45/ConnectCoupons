const mongoose=require('mongoose')
const express=require('express')


const User=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
})
const model=mongoose.model('UserData',User)
module.exports=model
