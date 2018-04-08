const path = require("path");
const imageToAscii = require("image-to-ascii");

imageToAscii(path.join(process.cwd(), "src/images/favicon.png"), function( err, converted ) {
  console.log(err || converted.replace(/\n/g, "\n\" * "));
});
