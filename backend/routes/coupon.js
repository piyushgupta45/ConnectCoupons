const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const router=express.Router()
const Coupon=require('../models/coupon.model')
const User=require('../models/user.model')

 router.get('/getuser/:email/:category',async(req,res)=>{
  const ct=req.params.category
  console.log(ct)
  try{
          const usercoupons=await Coupon.find({email:req.params.email})
          let coupons=null
          if (ct !== 'all') {
              coupons = usercoupons.filter(
              coupon => coupon.category && coupon.category.toLowerCase().includes(ct.toLowerCase())
            );
          } else {
            coupons = usercoupons;
          }
          res.send(coupons)
          
  }
  catch(err)
  {
      console.log(err)
  }
})
router.get('/allusers',async(req,res)=>{
  try{
    const users=await User.find()
    res.json(users)
  }
  catch(err)
  {
    console.log(err)
  }
  
})
router.get('/get/:category', async (req, res) => {
  const ct = req.params.category;

  try {
    let coupons = null;
    
    const userCoupons = await Coupon.find();

    if (ct !== 'all') {
      coupons = userCoupons.filter(
        coupon => coupon.category && coupon.category.toLowerCase().includes(ct.toLowerCase())
      );
    } else {
      coupons = userCoupons;
    }

    res.json(coupons);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/post',async(req,res)=>{
  console.log('he')
  try{
    const coupon=await Coupon.create({
        email:req.body.email,
        title:req.body.title,
        code:req.body.code,
        description:req.body.description,
        end_date:req.body.end_date,
        category:req.body.category,
        website:req.body.website
    })
    res.json({status:'ok'})
  }
  catch(err)
  {
      console.log(err)
      res.json({status:'error'})
  }
})
router.delete('/delete/:id',async(req,res)=>{
  
    try{
          const id1=req.params.id;
          const del=await Coupon.deleteOne({_id:id1})
           if(del.acknowledged==true)
           res.send({status:'ok'})
           else
           res.send({status:'error'})
    }
    catch(err)
    {
        res.send({status:'error'})
    }
})
module.exports = router;