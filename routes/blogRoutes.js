const express = require("express");
const {
  blogIndex,
  blogDetails,
  blogCreatePost,
  blogCreateGet,
  blogDelete,
} = require("../controllers/blogController");

const router = express.Router();

router.get("/blogs", blogIndex);
router.post("/blogs", blogCreatePost);
router.get("/blogs/create", blogCreateGet);
router.get("/blogs/:id", blogDetails);
router.delete("/blogs/:id", blogDelete);

module.exports = router;

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
