const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new Schema({
   title:{
       type: String,
       required: true
   },
   description:{
       type:String,
       minlength:10,
       required:true
   }
}) 

const Blog =mongoose.model('blog',BlogSchema)
module.exports = Blog;