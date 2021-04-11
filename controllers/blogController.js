const Blog = require("../models/blog1");

const blogIndex = (req, res) => {
  Blog.find()
    .then((result) => {
      console.log(result);
      res.render("index", { blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blogDetails = (req, res) => {
  //res.send(req.params.id);
  Blog.findById(req.params.id)
    .then((result) => {
      res.render("details", { blog: result });
    })
    .catch((err) => console.log(err));
};

const blogCreatePost = (req, res) => {
  //get the POST data from the form
  const title = req.body.title;
  const snippet = req.body.snippet;
  const body = req.body.body;

  //creating a blog object
  const blog = new Blog({
    title,
    snippet,
    body,
  });

  //saving the blog to the database
  blog
    .save()
    .then((result) => {
      //res.send(result);
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
};

const blogCreateGet = (req, res) => {
  res.render("create");
};

const blogDelete = (req, res) => {
  //console.log(req.params.id);
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      //res.redirect("/blogs");  //we cant use it because it's an ajax request
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  blogIndex,
  blogDetails,
  blogCreatePost,
  blogCreateGet,
  blogDelete,
};
