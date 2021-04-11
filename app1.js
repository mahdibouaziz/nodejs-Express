const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Blog = require("./models/blog1");
//used in POST request to get elements

const app = express();
const port = 3000;

//register the view engine
app.set("view engine", "ejs");
//create the public folder for our css and images
app.use(express.static(path.join(__dirname, "public")));

//config for POST request
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

//connect to mongodb data base
const dbURI =
  "mongodb+srv://user1:test1234@nodetuts.ygfga.mongodb.net/node-tuto?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("connected to the mongoDB");
  app.listen(port, () => console.log(`app listening on port ${port}!`));
});

//Basic routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      console.log(result);
      res.render("index", { blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST request to create a blog
app.post("/blogs", (req, res) => {
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
});

app.get("/blogs/create", (req, res) => {
  res.render("create");
});

//Get a specific blog by id
app.get("/blogs/:id", (req, res) => {
  //res.send(req.params.id);
  Blog.findById(req.params.id)
    .then((result) => {
      res.render("details", { blog: result });
    })
    .catch((err) => console.log(err));
});

app.delete("/blogs/:id", (req, res) => {
  //console.log(req.params.id);
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      //res.redirect("/blogs");  //we cant use it because it's an ajax request
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

app.get("/about", (req, res) => {
  res.render("about");
});

//404 error page
app.use((req, res) => {
  res.status(404).render("404");
});

/* -----------------------------------TESTING----------------------------------- */

/* 
//Testing if the database work
app.get("/add-blog", (req, res) => {
  //creating a blog object
  const blog = new Blog({
    title: "This is a title",
    snippet: "This is a snippet",
    body: "This is a body",
  });
  //saving to the data base
  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
//Testing getting all elements from the data base
app.get("/get-blogs", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
//Testing gettting a special blog
app.get("/single-blog", (req, res) => {
  Blog.findById("6072e4a8ec440f362c90e8bf")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
}); 
*/

/* -----------------------------------END OF TESTING----------------------------------- */
