
const createError = require('http-errors')
const  mongoose  = require('mongoose')

const Blog =require('../models/blog.model')


module.exports={
    
    getAllBlogs:async(req,res,next)=>{
        try {
            const results = await Blog.find({},{__v : 0})
         //   const results = await Blog.find({},{_id:0, title:1,description:1})
             //  const results = await Blog.find({title : messi},{})
            res.send(results)
            
        } catch (error) {
            console.log(error.message);
            
        }
      },
      findBlogById:async(req,res,next)=>{
        const id = req.params.id
        try {
            const blog = await Blog.findById(id)
            if(!blog){
            //   throw createError(404,"blog doesno exist..")
            throw createError.NotFound()
            }
            res.send(blog)
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                next(createError(400,"invalid blog id"))
                return;
            }
            next(error)
        }
     },
     createNewBlog:async(req,res,next)=>{
        try {
           const blog = new Blog(req.body)
           const result = await blog.save()
           res.send(result)
        } catch (error) {
            console.log(error.message);
            if(error.name === "validationError"){
                next(createError(422,error.message))
                return
            }
            next(error)
        }
        
       // const blog = new Blog({
       //     title : req.body.title,
       //     description : req.body.description
       // })
       // promises
       // blog.save()
       // .then(result=>{
       //     console.log(result);
       //     res.send(result)
       // }).catch(err=>{
       //     console.log(err.message);
       // })
    },
    updateBlogById:async(req,res,next)=>{
     
        try {
           const id =req.params.id 
           const updates = req.body
           const options = {new : true}
           const result = await Blog.findByIdAndUpdate(id,updates,options)
           if(!result){
               throw createError.NotFound()
           }
           res.send(result)
   
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                return next(createError(400,"invalid product id"))
            }
            next(error)
        }
     
   },
   deleteBlogById:async(req,res,next)=>{
    const id = req.params.id
    try {
        const result =await Blog.findByIdAndDelete(id)
        console.log(result);
        if(!result){
         //   throw createError(404,"blog doesno exist..")
         throw createError.NotFound()
         }
         res.send(result)
    } catch (error) {
        console.log(error.message);
        if(error instanceof mongoose.CastError){
         next(createError(400,"invalid blog id"))
         return;
     }
     next(error)
    }
 }

      

}