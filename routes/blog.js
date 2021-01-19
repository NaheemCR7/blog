const express = require('express')
const router = express.Router()
const BlogController = require('../controller/blog.controller')
const { findBlogById } = require('../controller/blog.controller')
const blogController = require('../controller/blog.controller')

 router.get('/',BlogController.getAllBlogs)

 router.post('/',BlogController.createNewBlog)

 router.get('/:id',BlogController.findBlogById)

 router.patch('/:id',BlogController.updateBlogById)
router.delete('/:id',blogController.deleteBlogById)

module.exports = router;