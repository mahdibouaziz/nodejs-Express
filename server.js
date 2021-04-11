const http = require("http");
const fs = require("fs");
const _ = require("lodash");

//function that will be called every thime we have a request
const server = http.createServer((req, res) => {
  //console.log(req.method, req.url);

  const num = _.random(0, 20);
  console.log(num);

  let path = "./views";
  if (req.url === "/about") {
    path += `/about.html`;
    res.statusCode = 200;
  } else if (req.url === "/") {
    path += `/index.html`;
    res.statusCode = 200;
  } else if (req.url === "/about-me") {
    res.statusCode = 301;
    res.setHeader("Location", "/about");
    res.end();
  } else {
    path += `/404.html`;
    res.statusCode = 404;
  }
  console.log(path);

  //response object
  //set the content type
  res.setHeader("Content-Type", "text/html");
  //link to the html page
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.write(data);
    }
    res.end();
  });
});

// the callback function fires when we start listenning
server.listen(3000, "localhost", () => {
  console.log("listenning for requests in port 3000");
});
