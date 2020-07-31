const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('blogs/index', { title: 'Blogs', blogs: result })
    })
    .catch((err) => {
      console.log('error in finding blogs', err)
    })
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body)
  blog.save()
    .then(result => res.redirect('/blogs'))
    .catch(err => console.log('error in adding blog', err))

}

const blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Blog' })
}

const blog_delete_post = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(result => {
      res.json({ redirect: '/blogs' })
    })
    .catch(err => console.log("error deleting blog", err))
}

const blog_details = (req, res) => {
  Blog.findById(req.params.id)
    .then(result => {
      res.render('blogs/details', { blog: result, title: "Blog Details" })
    })
    .catch(err => console.log("unable to find blog", err))
}

module.exports = {
  blog_index,
  blog_create_post,
  blog_create_get,
  blog_delete_post,
  blog_details,
}