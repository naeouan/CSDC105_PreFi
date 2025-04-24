const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('blogs/index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('blogs/details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      res.status(404).render('404', { title: 'Blog not found' });
    });
};

const blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Create a New Blog' });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(() => res.redirect('/blogs'))
    .catch((err) => console.log(err));
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(() => res.json({ redirect: '/blogs' }))
    .catch((err) => console.log(err));
};

const blog_edit_get = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('blogs/edit', { blog: result, title: 'Edit Blog' });
    })
    .catch((err) => {
      res.status(404).render('404', { title: 'Blog not found' });
    });
};

const blog_edit_post = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/blogs/${id}`))
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_edit_get,
  blog_edit_post
};