const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

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

app.get("/about", (req, res) => {
  res.render("about");
});

//Blog routes
app.use(blogRoutes);

//404 error page
app.use((req, res) => {
  res.status(404).render("404");
});
