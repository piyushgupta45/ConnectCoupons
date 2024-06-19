const mongoose=require('mongoose')
const express=require('express')

const Coupon=new mongoose.Schema({
    email:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    code:{type:String,required:true},
    end_date:{type:String,required:true},
    category:{type:String,required:true},
    website:{type:String,required:true},
})
const model=mongoose.model('Coupons',Coupon)
module.exports=model