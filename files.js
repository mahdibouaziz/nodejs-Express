const fs = require("fs");

//reading files
/*fs.readFile("./docs/blog1.txt", (err, data) => {
  if (err) {
    console.log(err.toString());
  }
  console.log(data.toString());
});

console.log("me first");*/

//Writing files
/*ch = "mahdi222";
fs.writeFile("./docs/blog2.txt", ch, (err) => {
  if (err) {
    console.log(err);
  }
});*/

//Directories
fs.mkdir("./test", (err) => {
  console.log("directory Created");
});

//Streams
const readStream = fs.createReadStream();
