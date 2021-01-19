const express = require('express')
const mongoose = require('mongoose')
const createError = require('http-errors')
const dotenv = require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/RestAPI',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
.then(()=>{
    console.log('Mongodb connected');
})

app.all('/test',(req,res)=>{
    // console.log(req.query);
    // res.send(req.query)
    // console.log(req.params);
    // res.send(req.params)
    console.log(req.body);
    res.send(req.body)
})

const BlogRouter = require('./routes/blog')

app.use('/blog',BlogRouter)

app.use((req,res,next)=>{
//   const err =new Error('not found')
//   err.status = 404
//   next(err)
next(createError(404,"not found"))
})
 
//error handler
app.use((err,req,res,next)=>{
res.status(err.status || 500)
res.send({
    error:{
        status:err.status || 500,
        message:err.message
    }     
})
})

const PORT = process.env.PORT || 3000


app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})