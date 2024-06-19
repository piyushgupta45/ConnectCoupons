const express=require('express')
const mongoose=require('mongoose')
const app=express()
const cors=require('cors')
const url="mongodb+srv://piyushguptapg1704:piyush123@cluster0.n1akunn.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url)

app.use(express.json());
app.use(cors())
app.use('/',require('./routes/LoginRegister'))
app.use('/users',require('./routes/coupon'))
app.listen(5000,()=>{
    console.log('server started')
})