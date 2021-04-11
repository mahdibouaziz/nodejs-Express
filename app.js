//require express that return a function
const express = require("express");
const path = require("path");
var morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { response } = require("express");

//invoke the function to create an instance of an express app
const app = express();
const port = 3000;

//connect to mongodb
const dbURI =
  "mongodb+srv://mahdi:Infoleader040100@nodetuts.ygfga.mongodb.net/node-tuto?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
    // listening to the server
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch((err) => console.log(err));

//register view engines
app.set("view engine", "ejs");

//Example of middleware
/* app.use((req, res, next) => {
  console.log("-------------------------");
   console.log("New request is made: ");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method", req.method); 

  next();
});
 */

//default middleware for static file by express
app.use(express.static("public"));
app.use(morgan("dev"));

//mongoose and mongo routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "title",
    snippet: "snippet test",
    body: "body test",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

//GET methods
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];

  const context = {
    title: "Mahdi",
    blogs,
  };
  //res.sendFile(path.join(__dirname, "views", "index.html"));
  res.render("index", context);
});

app.get("/about", (req, res) => {
  //res.sendFile(path.join(__dirname, "views", "about.html"));
  res.render("about");
});

app.get("/blogs/create", (req, res) => {
  res.render("create");
});

//redirects
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

//if we don't have routes
app.use((req, res) => {
  res.status(404).render("404");
});
