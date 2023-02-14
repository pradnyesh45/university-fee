var express = require("express");
var app = express();
var fs = require("fs");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  fs.readFile(__dirname + "/" + "data.json", "utf8", function (err, data) {
    res.end(data);
  });
});

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server Running", host, port);
});